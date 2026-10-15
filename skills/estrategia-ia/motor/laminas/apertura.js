/**
 * Láminas de apertura: portada y resumen ejecutivo.
 */
const path = require("path");
const fs = require("fs");
const C = require("../comunes");
const { B, P } = C;

// ── 1. Portada ──────────────────────────────────────────────────────
function portada(pres, D, ctx) {
  const slide = pres.addSlide();
  const hero = path.join(C.ASSETS, "hero_bg.jpg");
  slide.background = fs.existsSync(hero) ? { path: hero } : { color: B.NAVY };
  slide.addShape("rect", {
    x: 0, y: 3.85, w: B.SLIDE_W, h: 3.65,
    fill: { color: "000000", transparency: 50 }, line: { color: "000000", width: 0 },
  });
  P.addLogo(slide, C.ASSETS, "white");

  C.etiqueta(slide, D.meta.empresa, { x: B.MARGIN_L, y: 4.25, w: 11, h: 0.3, color: B.TEAL_ON_DARK, size: B.SIZE_LABEL });
  const titulo = D.portada.titulo;
  const { pt } = C.ajustar(titulo, { w: 11, h: 1.45, max: B.SIZE_DECK_TITLE, min: 28, fuente: "Georgia", negrita: true, interlineado: 1.1 });
  slide.addText(titulo, {
    x: B.MARGIN_L, y: 4.62, w: 11, h: 1.45, fontFace: B.FONT_HEADING, fontSize: pt, bold: true,
    color: B.WHITE, valign: "top", margin: 0, fit: "none",
  });
  slide.addText(D.portada.subtitulo || "Estrategia de sistemas agénticos", {
    x: B.MARGIN_L, y: 6.2, w: 9.2, h: 0.4, fontFace: B.FONT_BODY, fontSize: 16,
    color: B.WHITE, valign: "top", margin: 0, transparency: 10,
  });
  slide.addText("Preparado con la metodología CRITERIUM", {
    x: B.MARGIN_L, y: 6.62, w: 9.2, h: 0.3, fontFace: B.FONT_BODY, fontSize: 11,
    color: B.MUTED_LIGHT, valign: "top", margin: 0,
  });
  slide.addText("CONFIDENCIAL", {
    x: B.SLIDE_W - 3.5, y: 6.95, w: 3, h: 0.2, fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER, bold: true,
    color: B.WHITE, charSpacing: B.CHAR_SPACING_LABEL, align: "right", valign: "middle", margin: 0,
  });
  slide.addText(D.meta.fecha, {
    x: B.SLIDE_W - 3.5, y: 7.15, w: 3, h: 0.2, fontFace: B.FONT_BODY, fontSize: B.SIZE_FOOTER,
    color: B.WHITE, align: "right", valign: "middle", margin: 0, transparency: 25,
  });
  ctx.pagina += 1;
}

// ── 2. Resumen ejecutivo ────────────────────────────────────────────
function resumen(pres, D, ctx) {
  const R = D.resumen;
  const slide = C.marco(pres, ctx, { titulo: R.titulo, eyebrow: "Resumen ejecutivo", fuente: R.fuente });

  // Columna izquierda: situación · complicación · resolución
  const bloques = [
    ["Situación", R.situacion],
    ["Complicación", R.complicacion],
    ["Resolución", R.resolucion],
  ];
  const xL = B.MARGIN_L, wL = 4.85, y0 = 1.8, hB = 1.6;
  bloques.forEach(([lab, txt], i) => {
    const y = y0 + i * hB;
    C.etiqueta(slide, lab, { x: xL, y, w: wL, color: i === 2 ? B.TEAL_DARK : B.MUTED });
    C.texto(slide, txt, { x: xL, y: y + 0.26, w: wL, h: hB - 0.36, max: 12, min: 9.5, color: B.BODY, negritaColor: B.NAVY });
    if (i < 2) C.linea(slide, { x: xL, y: y + hB - 0.06, w: wL, color: B.BORDER });
  });

  // Columna derecha: los cinco sistemas agénticos
  const xR = 5.75, wR = B.SLIDE_W - B.MARGIN_R - xR;
  const cols = [
    { k: "n", w: 0.5 },
    { k: "agente", w: wR - 0.5 - 1.75 - 1.05 },
    { k: "palanca", w: 1.75 },
    { k: "magnitud", w: 1.05 },
  ];
  const yH = 1.8, hH = 0.32;
  C.caja(slide, { x: xR, y: yH, w: wR, h: hH, fill: B.TABLE_HEADER_BG, line: B.TABLE_HEADER_BG });
  const cab = ["", "Sistema agéntico y su meta", "Resultado que mueve", "Magnitud"];
  let cx = xR;
  cols.forEach((c, i) => {
    slide.addText(cab[i], { x: cx + 0.08, y: yH, w: c.w - 0.1, h: hH, fontFace: B.FONT_BODY, fontSize: 9, bold: true, color: B.WHITE, valign: "middle", margin: 0 });
    cx += c.w;
  });
  const hF = 0.8;
  D.agentes.forEach((a, i) => {
    const y = yH + hH + i * hF;
    const arranque = a.id === D.arranque;
    if (arranque) C.caja(slide, { x: xR, y, w: wR, h: hF, fill: B.TEAL_50, line: B.TEAL_50 });
    C.linea(slide, { x: xR, y: y + hF, w: wR, color: B.BORDER });
    C.insignia(slide, i + 1, { x: xR + 0.09, y: y + (hF - 0.32) / 2, fill: arranque ? B.TEAL : B.NAVY });
    const xA = xR + cols[0].w;
    C.texto(slide, a.nombre, { x: xA, y: y + 0.08, w: cols[1].w - 0.1, h: 0.28, max: 11, min: 9.5, bold: true, color: B.NAVY });
    C.texto(slide, a.meta, { x: xA, y: y + 0.34, w: cols[1].w - 0.1, h: hF - 0.4, max: 9.5, min: 8, color: B.BODY });
    C.palancaChip(slide, a.palanca, { x: xA + cols[1].w + 0.02, y: y + (hF - 0.28) / 2, spot: arranque });
    C.magnitud(slide, a.magnitud, { x: xA + cols[1].w + cols[2].w + 0.08, y: y + (hF - 0.26) / 2, spot: arranque });
  });
  const yNota = yH + hH + 5 * hF + 0.08;
  const ag = D.agentes.find((a) => a.id === D.arranque);
  if (ag) {
    C.texto(slide, `**Arranque recomendado en 90 días:** ${ag.nombre}. ${R.porque_arranque || ""}`.trim(), {
      x: xR, y: yNota, w: wR, h: 6.72 - yNota, max: 10, min: 8.5, color: B.BODY, negritaColor: B.TEAL_DARK,
    });
  }
}

module.exports = { portada, resumen };
