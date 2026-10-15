/**
 * Sección 3 · Impacto y ruta (3 láminas): impacto sobre ventas, margen y
 * capital de trabajo (sin cifras de dinero) · por dónde empezar · siguientes pasos.
 */
const C = require("../comunes");
const { B, P } = C;

const EYEBROW = "Impacto y ruta";
const X0 = B.MARGIN_L;
const XF = B.SLIDE_W - B.MARGIN_R;
const ANCHO = XF - X0;

const ORIGEN = {
  empresa: "dicho por la empresa",
  calculado: "calculado de sus respuestas",
  industria: "referencia de industria",
};

/** Línea entre dos puntos (pptxgenjs necesita caja positiva + flipV). */
function conector(slide, x1, y1, x2, y2, color, ancho) {
  slide.addShape("line", {
    x: x1, y: Math.min(y1, y2), w: x2 - x1, h: Math.abs(y2 - y1) || 0.001,
    line: { color, width: ancho || 1 }, flipV: y2 < y1,
  });
}

// ── 26. Impacto ─────────────────────────────────────────────────────
function impacto(pres, D, ctx) {
  const I = D.impacto;
  const slide = C.marco(pres, ctx, { titulo: I.titulo, eyebrow: EYEBROW, fuente: I.fuente });
  const xA = X0, wA = 3.45, xK = 4.3, wK = 4.6, xRz = 9.4, wRz = XF - 9.4;
  C.etiqueta(slide, "Sistema agéntico", { x: xA, y: 1.78, w: wA });
  C.etiqueta(slide, "KPI que mueve · cómo calcularlo con sus datos", { x: xK, y: 1.78, w: wK, espaciado: 1 });
  C.etiqueta(slide, "Resultado", { x: xRz, y: 1.78, w: wRz });

  const y0 = 2.06, hF = 0.74, gap = 0.08;
  const centros = {};
  D.agentes.forEach((a, i) => {
    const y = y0 + i * (hF + gap);
    const spot = a.id === D.arranque;
    C.caja(slide, { x: xA, y, w: wA, h: hF, fill: spot ? B.TEAL_50 : B.WHITE, line: spot ? B.TEAL_200 : B.BORDER });
    C.insignia(slide, i + 1, { x: xA + 0.12, y: y + 0.12, s: 0.28, size: 10, fill: spot ? B.TEAL : B.NAVY });
    C.texto(slide, a.nombre, { x: xA + 0.5, y: y + 0.07, w: wA - 0.6, h: 0.3, max: 10.5, min: 8.5, bold: true, color: B.NAVY });
    C.magnitud(slide, a.magnitud, { x: xA + 0.5, y: y + 0.4, spot, wTexto: 0.8 });
    slide.addText(ORIGEN[a.impacto?.origen] || "", { x: xA + 1.75, y: y + 0.4, w: wA - 1.85, h: 0.26, fontFace: B.FONT_BODY, fontSize: 7.5, italic: true, color: B.MUTED, align: "right", valign: "middle", margin: 0 });

    C.caja(slide, { x: xK, y, w: wK, h: hF, fill: B.WHITE, line: B.BORDER });
    C.texto(slide, a.kpis[0], { x: xK + 0.14, y: y + 0.05, w: wK - 0.28, h: 0.28, max: 10.5, min: 8.5, bold: true, color: B.NAVY });
    C.texto(slide, a.impacto?.formula || "", { x: xK + 0.14, y: y + 0.32, w: wK - 0.28, h: hF - 0.36, max: 9, min: 7.5, color: B.BODY });
    conector(slide, xA + wA, y + hF / 2, xK, y + hF / 2, spot ? B.TEAL : B.BORDER_DARK, spot ? 1.5 : 0.75);
    centros[a.id] = y + hF / 2;
  });

  // Resultados
  const res = ["ventas", "margen", "capital"];
  const hTot = 5 * hF + 4 * gap;
  const hR = (hTot - 2 * 0.16) / 3;
  res.forEach((r, k) => {
    const y = y0 + k * (hR + 0.16);
    const lista = D.agentes.filter((a) => a.palanca === r || (a.palancas_secundarias || []).includes(r));
    const spot = lista.some((a) => a.id === D.arranque && a.palanca === r);
    C.caja(slide, { x: xRz, y, w: wRz, h: hR, fill: spot ? B.TEAL_50 : B.OFF_WHITE, line: spot ? B.TEAL_200 : B.BORDER });
    const p = C.PALANCAS[r];
    C.icono(slide, p.icono, spot ? "teal" : "navy", { x: xRz + 0.16, y: y + 0.14, s: 0.26 });
    C.texto(slide, p.etiqueta, { x: xRz + 0.5, y: y + 0.1, w: wRz - 0.6, h: 0.34, max: 13, min: 10, fuente: B.FONT_HEADING, bold: true, color: B.NAVY });
    const nombres = lista.map((a) => a.nombre_corto).join(" · ");
    C.texto(slide, lista.length ? `**${lista.length} ${lista.length === 1 ? "sistema" : "sistemas"}:** ${nombres}` : "Ningún sistema propuesto lo mueve de forma directa", {
      x: xRz + 0.16, y: y + 0.48, w: wRz - 0.32, h: hR - 0.54, max: 9.5, min: 8, color: B.BODY, negritaColor: B.NAVY,
    });
    lista.forEach((a) => {
      const principal = a.palanca === r;
      conector(slide, xK + wK, centros[a.id], xRz, y + hR / 2, a.id === D.arranque && principal ? B.TEAL : B.BORDER_DARK, a.id === D.arranque && principal ? 1.5 : 0.6);
    });
  });

  const yL = y0 + hTot + 0.1;
  C.texto(slide, I.lectura, { x: X0, y: yL, w: ANCHO, h: 6.72 - yL, max: 10, min: 8.5, color: B.BODY, negritaColor: B.NAVY });
}

// ── 27. Por dónde empezar ───────────────────────────────────────────
function olas(pres, D, ctx) {
  const O = D.olas;
  const slide = C.marco(pres, ctx, { titulo: O.titulo, eyebrow: EYEBROW, fuente: O.fuente });
  const wTxt = 3.75, xT = X0 + wTxt + 0.25, wT = XF - xT;
  const mesesMax = Math.max(12, ...O.olas.map((o) => o.fin));
  const escala = wT / mesesMax;

  // Eje de meses
  const yEje = 1.8;
  C.etiqueta(slide, "Meses", { x: X0, y: yEje, w: wTxt });
  for (let m = 0; m <= mesesMax; m += mesesMax > 12 ? 3 : 2) {
    slide.addText(String(m), { x: xT + m * escala - 0.2, y: yEje, w: 0.4, h: 0.22, fontFace: B.FONT_BODY, fontSize: 8.5, color: B.MUTED, align: "center", margin: 0 });
    C.linea(slide, { x: xT + m * escala, y: yEje + 0.26, h: 2.9, color: B.DIVIDER });
  }
  C.linea(slide, { x: X0, y: yEje + 0.26, w: ANCHO, color: B.NAVY, ancho: 1 });

  const lista = O.olas.slice(0, 3);
  const hO = 2.85 / lista.length;
  lista.forEach((o, k) => {
    const y = yEje + 0.34 + k * hO;
    const conArranque = o.agentes.includes(D.arranque);
    const nombres = o.agentes.map((id) => (D.agentes.find((a) => a.id === id) || {}).nombre_corto).filter(Boolean).join(" · ");
    C.texto(slide, `**${o.nombre}** · ${nombres}`, { x: X0, y: y + 0.02, w: wTxt, h: 0.32, max: 10.5, min: 8.5, color: B.BODY, negritaColor: conArranque ? B.TEAL_DARK : B.NAVY });
    C.texto(slide, o.por_que, { x: X0, y: y + 0.34, w: wTxt, h: hO - 0.42, max: 9, min: 7.5, color: B.BODY });
    const bx = xT + o.inicio * escala, bw = Math.max(0.3, (o.fin - o.inicio) * escala);
    C.caja(slide, { x: bx, y: y + 0.12, w: bw, h: 0.36, fill: conArranque ? B.TEAL : B.NAVY, line: conArranque ? B.TEAL : B.NAVY, redondeo: 0.05 });
    slide.addText(`${o.inicio}–${o.fin} meses`, { x: bx, y: y + 0.12, w: bw, h: 0.36, fontFace: B.FONT_BODY, fontSize: 8.5, bold: true, color: B.WHITE, align: "center", valign: "middle", margin: 0 });
    (o.hitos || []).slice(0, 2).forEach((h) => {
      const hx = xT + h.mes * escala;
      slide.addShape("ellipse", { x: hx - 0.06, y: y + 0.58, w: 0.12, h: 0.12, fill: { color: B.WARNING_FG }, line: { color: B.WARNING_FG, width: 0 } });
      slide.addText(h.texto, { x: hx + 0.1, y: y + 0.52, w: 2.6, h: 0.24, fontFace: B.FONT_BODY, fontSize: 8, color: B.WARNING_FG, margin: 0, valign: "middle" });
    });
  });

  // Prerrequisitos
  const yPr = 5.08;
  const pre = O.prerrequisitos.slice(0, 3);
  const wP = (ANCHO - 0.3) / pre.length;
  const iconos = ["database", "settings", "file-text"];
  pre.forEach((p, k) => {
    const x = X0 + k * (wP + 0.15);
    C.icono(slide, p.icono || iconos[k], "navy", { x, y: yPr + 0.02, s: 0.24 });
    C.texto(slide, p.titulo, { x: x + 0.34, y: yPr, w: wP - 0.34, h: 0.28, max: 10.5, min: 9, bold: true, color: B.NAVY });
    C.texto(slide, p.texto, { x: x + 0.34, y: yPr + 0.28, w: wP - 0.34, h: 0.62, max: 9, min: 7.5, color: B.BODY });
  });
  P.addCallout(slide, { x: X0, y: 6.02, w: ANCHO, h: 0.68, label: "Regla para escalar", text: O.regla, spotlight: true });
}

// ── 28. Siguientes pasos (cierre oscuro) ────────────────────────────
function siguientes(pres, D, ctx) {
  const S = D.siguientes;
  const slide = C.marco(pres, ctx, { titulo: S.titulo, eyebrow: "Siguientes pasos", oscuro: true });
  const pasos = S.pasos.slice(0, 5);
  const gap = 0.16;
  const w = (ANCHO - gap * (pasos.length - 1)) / pasos.length;
  const y = 2.05, h = 2.75;
  const ptQue = C.ptComun(pasos.map((p) => p.que), { w: w - 0.36, h: h - 1.2, max: 14, min: 10 });
  C.linea(slide, { x: X0, y: y - 0.14, w: ANCHO, color: B.TEAL_ON_DARK, ancho: 1 });
  pasos.forEach((p, k) => {
    const x = X0 + k * (w + gap);
    C.caja(slide, { x, y, w, h, fill: B.NAVY_SOFT, line: B.NAVY_SOFT });
    C.insignia(slide, k + 1, { x: x + 0.18, y: y + 0.18, s: 0.3, size: 11, fill: k === 0 ? B.TEAL : B.NAVY, line: k === 0 ? B.TEAL : B.MUTED });
    C.etiqueta(slide, p.cuando, { x: x + 0.6, y: y + 0.22, w: w - 0.78, color: B.TEAL_ON_DARK });
    C.texto(slide, p.que, { x: x + 0.18, y: y + 0.66, w: w - 0.36, h: h - 1.3, max: ptQue, min: ptQue, color: B.WHITE });
    C.linea(slide, { x: x + 0.18, y: y + h - 0.6, w: w - 0.36, color: B.MUTED });
    C.texto(slide, p.quien, { x: x + 0.18, y: y + h - 0.52, w: w - 0.36, h: 0.42, max: 10, min: 8, color: B.MUTED_LIGHT });
  });
  C.texto(slide, S.necesita, { x: X0, y: y + h + 0.35, w: ANCHO, h: 1.0, max: 15, min: 11, color: B.WHITE, negritaColor: B.TEAL_ON_DARK });
}

module.exports = { impacto, olas, siguientes };
