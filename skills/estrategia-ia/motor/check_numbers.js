/**
 * Criterium Deck Composer — deterministic number verifier.
 *
 * This is a RIGOR utility, not a template: it checks arithmetic, it never touches
 * layout. Run it before finishing a deck to confirm every figure reconciles —
 * the "check the numbers twice" gate. Use as a module or from the CLI.
 *
 *   const V = require("./check_numbers");
 *   V.verify([
 *     { type: "sum",   parts: [241, 84, 58], total: 383, label: "waterfall to alcanzable" },
 *     { type: "pct",   parts: [62, 23, 15], label: "channel mix closes to 100" },
 *     { type: "delta", from: 241, to: 462, statedPct: 91.7, label: "recovery uplift" },
 *     { type: "share", part: 142, whole: 220, statedPct: 64, label: "two levers capture 64%" },
 *   ]);
 *
 * CLI:  node check_numbers.js '[{"type":"sum","parts":[30,45,25],"total":100}]'
 *
 * Every check returns pass/fail with the computed vs. stated value, so a failure
 * tells you exactly which figure on which slide is wrong.
 */

function approx(a, b, tol) { return Math.abs(a - b) <= tol; }

function checkOne(c) {
  const label = c.label || c.type;
  let computed, stated, ok, detail;
  const tol = c.tol != null ? c.tol : 0.5;

  switch (c.type) {
    case "sum": // parts must sum to total
      computed = c.parts.reduce((a, b) => a + b, 0);
      stated = c.total;
      ok = approx(computed, stated, tol);
      detail = `parts sum to ${computed}, stated total ${stated}`;
      break;
    case "pct": // a set of percentages must close to 100
      computed = c.parts.reduce((a, b) => a + b, 0);
      stated = c.expected != null ? c.expected : 100;
      ok = approx(computed, stated, c.tol != null ? c.tol : 1.0);
      detail = `percentages sum to ${computed}, expected ${stated}`;
      break;
    case "share": { // part/whole must equal statedPct
      computed = (c.part / c.whole) * 100;
      stated = c.statedPct;
      ok = approx(computed, stated, c.tol != null ? c.tol : 1.0);
      detail = `${c.part}/${c.whole} = ${computed.toFixed(1)}%, stated ${stated}%`;
      break;
    }
    case "delta": { // change from->to must equal statedPct (or statedAbs)
      if (c.statedPct != null) {
        computed = ((c.to - c.from) / Math.abs(c.from)) * 100;
        stated = c.statedPct;
        ok = approx(computed, stated, c.tol != null ? c.tol : 1.0);
        detail = `change ${c.from}→${c.to} = ${computed.toFixed(1)}%, stated ${stated}%`;
      } else {
        computed = c.to - c.from;
        stated = c.statedAbs;
        ok = approx(computed, stated, tol);
        detail = `change ${c.from}→${c.to} = ${computed}, stated ${stated}`;
      }
      break;
    }
    case "equal": // a computed figure must equal a stated one
      computed = c.computed; stated = c.stated;
      ok = approx(computed, stated, tol);
      detail = `computed ${computed}, stated ${stated}`;
      break;
    default:
      return { label, ok: false, detail: `unknown check type "${c.type}"` };
  }
  return { label, ok, detail };
}

function verify(checks) {
  const results = checks.map(checkOne);
  const failures = results.filter(r => !r.ok);
  results.forEach(r => console.log(`${r.ok ? "✓" : "✗ FAIL"}  ${r.label} — ${r.detail}`));
  if (failures.length === 0) console.log(`\nAll ${results.length} number checks passed.`);
  else console.log(`\n${failures.length} of ${results.length} checks FAILED — fix before shipping.`);
  return { passed: failures.length === 0, results, failures };
}

module.exports = { verify, checkOne };

if (require.main === module) {
  const arg = process.argv[2];
  if (!arg) { console.error('Usage: node check_numbers.js \'[{"type":"sum","parts":[...],"total":N}]\''); process.exit(1); }
  const { passed } = verify(JSON.parse(arg));
  process.exit(passed ? 0 : 1);
}
