/**
 * Sección 2 · apertura (3 láminas): lo que escuchamos · qué es un sistema
 * agéntico · los cinco sistemas y por qué.
 */
const C = require("../comunes");
const { B, P } = C;

const EYEBROW = "Sistemas agénticos";
const X0 = B.MARGIN_L;
const XF = B.SLIDE_W - B.MARGIN_R;
const ANCHO = XF - X0;

const TIPO_OTRA = {
  automatizacion: "Automatización",
  analitica: "Analítica",
  proceso: "Cambio de proceso",
};

// ── 8. Lo que escuchamos ────────────────────────────────────────────
function diagnostico(pres, D, ctx) {
  const G = D.diagnostico;
  const slide = C.marco(pres, ctx, { titulo: G.titulo, eyebrow: EYEBROW, fuente: G.fuente });
  const wL = 8.25;
  const cols = [0.5, wL - 0.5 - 1.95, 1.95];
  C.etiqueta(slide, "Lo que escuchamos", { x: X0 + cols[0], y: 1.8, w: cols[1] });
  C.etiqueta(slide, "Resultado que mueve", { x: X0 + cols[0] + cols[1] + 0.05, y: 1.8, w: cols[2], espaciado: 1 });
  C.linea(slide, { x: X0, y: 2.08, w: wL, color: B.NAVY, ancho: 1 });

  const dolores = G.dolores.slice(0, 5);
  const y0 = 2.14, hF = (6.68 - y0) / dolores.length;
  dolores.forEach((d, i) => {
    const y = y0 + i * hF;
    const ag = D.agentes.find((a) => a.id === d.agente);
    const arranque = d.agente === D.arranque;
    C.insignia(slide, i + 1, { x: X0 + 0.04, y: y + 0.12, s: 0.32, fill: arranque ? B.TEAL : B.NAVY });
    C.texto(slide, d.dolor, { x: X0 + cols[0], y: y + 0.07, w: cols[1] - 0.15, h: 0.32, max: 11.5, min: 9.5, bold: true, color: B.NAVY });
    const citaTxt = d.cita_textual === false ? `Confirmó: ${d.cita}` : `«${d.cita}»`;
    C.texto(slide, citaTxt, { x: X0 + cols[0], y: y + 0.38, w: cols[1] - 0.15, h: hF - 0.46, max: 10, min: 8.5, italic: true, color: B.BODY });
    const xP = X0 + cols[0] + cols[1] + 0.05;
    C.palancaChip(slide, d.palanca, { x: xP, y: y + 0.1, spot: arranque });
    const origen = d.estado === "hipotesis" ? "Hipótesis por validar" : "Confirmado en la conversación";
    slide.addText(origen + (ag ? `  ·  ${ag.id}` : ""), {
      x: xP, y: y + 0.44, w: cols[2], h: 0.22, fontFace: B.FONT_BODY, fontSize: 8, color: B.MUTED, margin: 0, valign: "middle",
    });
    if (i < dolores.length - 1) C.linea(slide, { x: X0, y: y + hF, w: wL, color: B.BORDER });
  });

  // Otras palancas (dolores reales que no requieren un agente)
  const xR = X0 + wL + 0.35, wR = XF - xR, yR = 1.8, hR = 6.68 - yR;
  C.caja(slide, { x: xR, y: yR, w: wR, h: hR, fill: B.OFF_WHITE, line: B.BORDER });
  const otras = (G.otras_palancas || []).slice(0, 3);
  let yy = yR + 0.14;
  if (otras.length) {
    C.etiqueta(slide, "Otras palancas", { x: xR + 0.2, y: yy, w: wR - 0.4 });
    C.texto(slide, "Dolores reales que se resuelven mejor sin un agente.", { x: xR + 0.2, y: yy + 0.24, w: wR - 0.4, h: 0.24, max: 9.5, min: 8, color: B.MUTED });
    yy += 0.6;
    const hO = otras.length === 3 ? 1.3 : 1.2;
    otras.forEach((o) => {
      C.linea(slide, { x: xR + 0.2, y: yy - 0.04, w: wR - 0.4, color: B.BORDER });
      C.chip(slide, TIPO_OTRA[o.tipo] || o.tipo, { x: xR + 0.2, y: yy + 0.06, h: 0.24, size: 8, fill: B.WHITE, line: B.BORDER_DARK, color: B.NAVY, bold: true });
      C.texto(slide, o.dolor, { x: xR + 0.2, y: yy + 0.34, w: wR - 0.4, h: 0.36, max: 10, min: 8.5, bold: true, color: B.NAVY });
      C.texto(slide, o.por_que, { x: xR + 0.2, y: yy + 0.7, w: wR - 0.4, h: hO - 0.76, max: 9, min: 7.5, color: B.BODY });
      yy += hO;
    });
    yy += 0.04;
  }
  // El filtro: seis señales de forma de agente (solo si hay espacio)
  if (otras.length >= 3) return;
  C.linea(slide, { x: xR + 0.2, y: yy - 0.02, w: wR - 0.4, color: B.BORDER });
  C.etiqueta(slide, "Cómo se filtró", { x: xR + 0.2, y: yy + 0.06, w: wR - 0.4 });
  const senales = [
    "Resultado verificable",
    "Pasos que varían por caso",
    "Dos o más sistemas",
    "Correos, PDFs o mensajes",
    "Juicio con excepciones",
    "Revisar cuesta menos",
  ];
  const yS = yy + 0.34, wS = (wR - 0.4) / 2, hS = 0.26;
  senales.forEach((t, i) => {
    const x = xR + 0.2 + (i % 2) * wS, y = yS + Math.floor(i / 2) * hS;
    C.icono(slide, "check", "navy", { x, y: y + 0.05, s: 0.15 });
    C.texto(slide, t, { x: x + 0.2, y, w: wS - 0.22, h: hS, max: 8.5, min: 7.5, color: B.BODY, valign: "middle" });
  });
  C.texto(slide, "Con cuatro de las seis señales, el dolor tiene forma de agente.", {
    x: xR + 0.2, y: yS + 3 * hS + 0.06, w: wR - 0.4, h: 0.36, max: 8.5, min: 7.5, color: B.MUTED, italic: true,
  });
}

// ── 9. Qué es (y qué no es) un sistema agéntico ─────────────────────
function queEsAgentico(pres, D, ctx) {
  const Q = D.que_es || {};
  const titulo = Q.titulo || "Un sistema agéntico recibe una meta y la cumple en varios pasos, dentro de límites escritos y con una persona en la excepción";
  const slide = C.marco(pres, ctx, { titulo, eyebrow: EYEBROW, fuente: "Criterios de sistemas agénticos CRITERIUM (2026) · con base en Anthropic, Building effective agents (2024) y OpenAI, A practical guide to building agents (2025)" });

  const pruebas = [
    ["target", "Recibe una meta", "Un resultado a lograr, como cobrar una factura en plazo."],
    ["layers", "Ejecuta varios pasos en dos o más sistemas", "ERP, correo, WhatsApp, portal del cliente o del banco."],
    ["file-text", "Trabaja con información desordenada", "Correos, PDFs, fotos, listas en Excel y conversaciones."],
    ["shield", "Actúa dentro de límites escritos", "Montos, plazos y acciones permitidas, sin pedir permiso cada vez."],
    ["users", "Escala solo la excepción", "Una persona decide lo que sale de regla, con la evidencia armada."],
  ];
  const wL = 5.75;
  C.etiqueta(slide, "Las cinco pruebas", { x: X0, y: 1.8, w: wL });
  C.linea(slide, { x: X0, y: 2.08, w: wL, color: B.NAVY, ancho: 1 });
  const hP = (5.55 - 2.16) / pruebas.length;
  const ptD = C.ptComun(pruebas.map((p) => p[2]), { w: wL - 0.5, h: hP - 0.34, max: 10.5, min: 8.5 });
  pruebas.forEach(([ic, t, d], i) => {
    const y = 2.16 + i * hP;
    C.icono(slide, ic, "navy", { x: X0 + 0.02, y: y + 0.08, s: 0.3 });
    C.texto(slide, t, { x: X0 + 0.48, y: y + 0.04, w: wL - 0.5, h: 0.28, max: 11.5, min: 10, bold: true, color: B.NAVY });
    C.texto(slide, d, { x: X0 + 0.48, y: y + 0.3, w: wL - 0.5, h: hP - 0.34, max: ptD, min: ptD, color: B.BODY });
  });

  // Comparación: modelo clásico vs sistema agéntico
  const xR = X0 + wL + 0.4, wR = XF - xR;
  const c0 = 1.75, c1 = (wR - c0) / 2;
  const filas = [
    ["Recibe", "Datos", "Una meta y sus límites"],
    ["Entrega", "Una recomendación", "El trabajo hecho y verificado"],
    ["Quién ejecuta", "Una persona, después", "El agente, dentro de sus límites"],
    ["Cuándo entra una persona", "En cada paso", "En la excepción, con el caso armado"],
    ["Cómo se obtiene", "Se compra si no existe", "Se diseña sobre el proceso de la empresa"],
  ];
  const yH = 1.8, hH = 0.5;
  C.caja(slide, { x: xR + c0 + c1, y: yH, w: c1, h: hH + filas.length * 0.56 + 0.04, fill: B.TEAL_50, line: B.TEAL_200 });
  C.texto(slide, "Modelo clásico\n(pronóstico, optimizador, reporte)", { x: xR + c0 + 0.1, y: yH + 0.02, w: c1 - 0.2, h: hH, max: 10, min: 8.5, bold: true, color: B.MUTED, valign: "middle" });
  C.texto(slide, "Sistema agéntico", { x: xR + c0 + c1 + 0.12, y: yH + 0.02, w: c1 - 0.24, h: hH, max: 11.5, min: 10, bold: true, color: B.TEAL_DARK, valign: "middle" });
  C.linea(slide, { x: xR, y: yH + hH, w: wR, color: B.NAVY, ancho: 1 });
  filas.forEach(([k, a, b], i) => {
    const y = yH + hH + 0.02 + i * 0.56;
    C.texto(slide, k, { x: xR, y, w: c0 - 0.1, h: 0.54, max: 9.5, min: 8.5, bold: true, color: B.NAVY, valign: "middle" });
    C.texto(slide, a, { x: xR + c0 + 0.1, y, w: c1 - 0.2, h: 0.54, max: 10, min: 8.5, color: B.MUTED, valign: "middle" });
    C.texto(slide, b, { x: xR + c0 + c1 + 0.12, y, w: c1 - 0.24, h: 0.54, max: 10, min: 8.5, bold: true, color: B.NAVY, valign: "middle" });
    if (i < filas.length - 1) C.linea(slide, { x: xR, y: y + 0.56, w: wR, color: B.BORDER });
  });

  // Ejemplo en la empresa
  const yE = 5.72;
  C.caja(slide, { x: X0, y: yE, w: ANCHO, h: 6.7 - yE, fill: B.OFF_WHITE, line: B.BORDER });
  C.etiqueta(slide, `En ${D.meta.empresa_corta}`, { x: X0 + 0.22, y: yE + 0.1, w: 4, color: B.TEAL_DARK });
  C.texto(slide, Q.ejemplo || "", { x: X0 + 0.22, y: yE + 0.34, w: ANCHO - 0.44, h: 6.7 - yE - 0.4, max: 11, min: 9, color: B.BODY, negritaColor: B.NAVY });
}

// ── 10. Los cinco sistemas agénticos y por qué ──────────────────────
function cincoAgentes(pres, D, ctx) {
  const K = D.cinco_agentes;
  const slide = C.marco(pres, ctx, { titulo: K.titulo, eyebrow: EYEBROW, fuente: K.fuente });
  const cols = [0.55, 3.55, 4.05, 1.75, 1.43, 1.0];
  const cab = ["", "Sistema agéntico y su meta", "Por qué este", "Mueve", "KPI principal", "Magnitud"];
  const yH = 1.8, hH = 0.34;
  C.caja(slide, { x: X0, y: yH, w: ANCHO, h: hH, fill: B.TABLE_HEADER_BG, line: B.TABLE_HEADER_BG });
  let x = X0;
  cab.forEach((c, i) => {
    slide.addText(c, { x: x + 0.08, y: yH, w: cols[i] - 0.12, h: hH, fontFace: B.FONT_BODY, fontSize: 9, bold: true, color: B.WHITE, valign: "middle", margin: 0 });
    x += cols[i];
  });
  const y0 = yH + hH, hF = (6.38 - y0) / 5;
  D.agentes.forEach((a, i) => {
    const y = y0 + i * hF;
    const arranque = a.id === D.arranque;
    if (arranque) C.caja(slide, { x: X0, y, w: ANCHO, h: hF, fill: B.TEAL_50, line: B.TEAL_50 });
    C.linea(slide, { x: X0, y: y + hF, w: ANCHO, color: B.BORDER });
    let cx = X0;
    C.insignia(slide, i + 1, { x: cx + 0.1, y: y + (hF - 0.34) / 2, s: 0.34, fill: arranque ? B.TEAL : B.NAVY });
    cx += cols[0];
    C.texto(slide, a.nombre, { x: cx + 0.04, y: y + 0.08, w: cols[1] - 0.16, h: 0.3, max: 11.5, min: 9.5, bold: true, color: B.NAVY });
    C.texto(slide, a.meta, { x: cx + 0.04, y: y + 0.36, w: cols[1] - 0.16, h: hF - 0.42, max: 9.5, min: 8, color: B.BODY });
    cx += cols[1];
    C.texto(slide, a.por_que, { x: cx + 0.04, y: y + 0.08, w: cols[2] - 0.16, h: hF - 0.16, max: 10, min: 8, color: B.BODY, negritaColor: B.NAVY, valign: "middle" });
    cx += cols[2];
    C.palancaChip(slide, a.palanca, { x: cx + 0.04, y: y + (hF - 0.28) / 2, spot: arranque });
    cx += cols[3];
    C.texto(slide, a.kpis[0], { x: cx + 0.04, y: y + 0.08, w: cols[4] - 0.1, h: hF - 0.16, max: 9.5, min: 8, color: B.BODY, valign: "middle" });
    cx += cols[4];
    C.magnitud(slide, a.magnitud, { x: cx + 0.06, y: y + (hF - 0.26) / 2, spot: arranque, wTexto: 0.6 });
  });
  C.texto(slide, "Magnitud. **Grande:** más de 3 personas de tiempo completo, más de 5% de pedidos afectados o más de 15 días de caja. **Mediano:** 1 a 3 personas, 1 a 5% de pedidos o 5 a 15 días. **Chico:** por debajo. Sombreado: arranque recomendado en 90 días.", {
    x: X0, y: 6.42, w: ANCHO, h: 0.38, max: 8.5, min: 7.5, color: B.MUTED, negritaColor: B.NAVY,
  });
}

module.exports = { diagnostico, queEsAgentico, cincoAgentes };
