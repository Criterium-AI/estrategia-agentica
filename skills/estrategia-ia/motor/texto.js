/**
 * Ajuste de texto: estima cuántas líneas ocupa un texto en una caja y baja el
 * tamaño de letra lo necesario para que quepa. Es una estimación conservadora
 * (ancho promedio de carácter por fuente); junto con los presupuestos de
 * caracteres de validar.js evita desbordes aunque no haya LibreOffice para mirar.
 */

// Ancho promedio de un carácter, como fracción del tamaño de la fuente (em).
const ANCHO_EM = {
  "Arial": 0.50,
  "Arial-bold": 0.55,
  "Georgia": 0.52,
  "Georgia-bold": 0.57,
};

function quitarMarcas(t) {
  return String(t || "").replace(/\*\*/g, "");
}

/** Líneas estimadas de `texto` en una caja de ancho `w` pulgadas a `pt` puntos. */
function lineasEstimadas(texto, w, pt, fuente = "Arial", negrita = false) {
  const em = ANCHO_EM[fuente + (negrita ? "-bold" : "")] || 0.55;
  const anchoChar = (em * pt) / 72;
  const porLinea = Math.max(1, Math.floor(w / anchoChar));
  let total = 0;
  for (const parrafo of quitarMarcas(texto).split("\n")) {
    const palabras = parrafo.split(/\s+/).filter(Boolean);
    if (!palabras.length) { total += 1; continue; }
    let lineas = 1, usado = 0;
    for (const p of palabras) {
      const largo = p.length;
      if (usado === 0) usado = largo;
      else if (usado + 1 + largo <= porLinea) usado += 1 + largo;
      else { lineas += 1; usado = largo; }
      while (usado > porLinea) { lineas += 1; usado -= porLinea; }
    }
    total += lineas;
  }
  return total;
}

/**
 * Devuelve el tamaño de letra (pt) más grande entre `max` y `min` con el que
 * el texto cabe en la caja w × h. Si no cabe ni al mínimo, devuelve `min`
 * y marca `desborda`.
 */
function ajustar(texto, { w, h, max, min, fuente = "Arial", negrita = false, interlineado = 1.18, margen = 0.04 }) {
  const ancho = w - margen * 2;
  const alto = h - margen * 2;
  for (let pt = max; pt >= min; pt -= 0.5) {
    const lineas = lineasEstimadas(texto, ancho, pt, fuente, negrita);
    if (lineas * ((pt * interlineado) / 72) <= alto) return { pt, desborda: false, lineas };
  }
  return { pt: min, desborda: true, lineas: lineasEstimadas(texto, ancho, min, fuente, negrita) };
}

/**
 * Convierte "texto con **negritas**" en runs de pptxgenjs.
 * `base` son las opciones comunes (fuente, tamaño, color).
 */
function runs(texto, base = {}, negritaExtra = {}) {
  const partes = String(texto || "").split(/(\*\*[^*]+\*\*)/g).filter((s) => s !== "");
  return partes.map((p) => {
    const esNegrita = p.startsWith("**") && p.endsWith("**");
    return {
      text: esNegrita ? p.slice(2, -2) : p,
      options: Object.assign({}, base, esNegrita ? Object.assign({ bold: true }, negritaExtra) : {}),
    };
  });
}

module.exports = { ajustar, lineasEstimadas, runs, quitarMarcas };
