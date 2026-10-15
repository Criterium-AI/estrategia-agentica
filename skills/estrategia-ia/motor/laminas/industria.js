/**
 * Sección 1 · Empresa e industria (5 láminas):
 * empresa · fuerzas · mapa de valor · casos de la industria · matriz de casos.
 */
const C = require("../comunes");
const { B, P } = C;

const EYEBROW = "La empresa y su industria";
const X0 = B.MARGIN_L;
const XF = B.SLIDE_W - B.MARGIN_R;
const ANCHO = XF - X0;

// ── 3. La empresa en una lámina ─────────────────────────────────────
function empresa(pres, D, ctx) {
  const E = D.empresa;
  const slide = C.marco(pres, ctx, { titulo: E.titulo, eyebrow: EYEBROW, fuente: E.fuente });
  const wL = 7.35;

  C.texto(slide, E.descripcion, { x: X0, y: 1.8, w: wL, h: 1.05, max: 13, min: 10.5, color: B.BODY, negritaColor: B.NAVY });

  // Modelo de negocio en 2 × 2
  const gw = (wL - 0.15) / 2, gh = 1.22, gy = 2.98;
  E.modelo.slice(0, 4).forEach((m, i) => {
    const x = X0 + (i % 2) * (gw + 0.15);
    const y = gy + Math.floor(i / 2) * (gh + 0.12);
    C.caja(slide, { x, y, w: gw, h: gh, fill: B.WHITE, line: B.BORDER });
    C.etiqueta(slide, m.label, { x: x + 0.18, y: y + 0.12, w: gw - 0.36 });
    C.texto(slide, m.texto, { x: x + 0.18, y: y + 0.38, w: gw - 0.36, h: gh - 0.48, max: 11, min: 9, color: B.BODY });
  });

  const yP = gy + 2 * gh + 0.24 + 0.02;
  C.caja(slide, { x: X0, y: yP, w: wL, h: 6.68 - yP, fill: B.OFF_WHITE, line: B.BORDER });
  C.etiqueta(slide, "Posición", { x: X0 + 0.22, y: yP + 0.1, w: 3, color: B.TEAL_DARK });
  C.texto(slide, E.posicion, { x: X0 + 0.22, y: yP + 0.34, w: wL - 0.44, h: 6.68 - yP - 0.4, max: 12, min: 9.5, color: B.BODY, negritaColor: B.NAVY });

  // Cifras clave
  const xR = X0 + wL + 0.35, wR = XF - xR;
  const n = Math.min(E.datos.length, 4);
  const hT = (6.68 - 1.8 - (n - 1) * 0.12) / n;
  E.datos.slice(0, 4).forEach((d, i) => {
    const y = 1.8 + i * (hT + 0.12);
    C.caja(slide, { x: xR, y, w: wR, h: hT, fill: i === 0 ? B.TEAL_50 : B.OFF_WHITE, line: i === 0 ? B.TEAL_200 : B.BORDER });
    C.texto(slide, d.valor, { x: xR + 0.22, y: y + 0.1, w: wR - 0.44, h: hT * 0.5, max: 30, min: 20, fuente: B.FONT_HEADING, bold: true, color: i === 0 ? B.TEAL_DARK : B.NAVY, valign: "middle" });
    C.texto(slide, d.etiqueta, { x: xR + 0.22, y: y + hT * 0.52, w: wR - 0.44, h: hT * 0.3, max: 11, min: 9, color: B.BODY });
    if (d.fuente) C.texto(slide, d.fuente, { x: xR + 0.22, y: y + hT * 0.8, w: wR - 0.44, h: hT * 0.18, max: 8, min: 7, color: B.MUTED, italic: true });
  });
}

// ── 4. Fuerzas de la industria ──────────────────────────────────────
function fuerzas(pres, D, ctx) {
  const F = D.fuerzas;
  const slide = C.marco(pres, ctx, { titulo: F.titulo, eyebrow: EYEBROW, fuente: F.fuente });
  const cols = [3.0, 3.55, 1.95, ANCHO - 3.0 - 3.55 - 1.95];
  const cab = ["Fuerza", "Qué dice el dato", "Pega en", `Qué implica para ${D.meta.empresa_corta}`];
  const yH = 1.8;
  let x = X0;
  cab.forEach((c, i) => { C.etiqueta(slide, c, { x: x + 0.05, y: yH, w: cols[i] - 0.1 }); x += cols[i]; });
  C.linea(slide, { x: X0, y: yH + 0.28, w: ANCHO, color: B.NAVY, ancho: 1 });

  const filas = F.fuerzas.slice(0, 5);
  const y0 = yH + 0.36, hF = (6.68 - y0) / filas.length;
  filas.forEach((f, i) => {
    const y = y0 + i * hF;
    const spot = !!f.destacada;
    if (spot) C.caja(slide, { x: X0, y: y + 0.02, w: ANCHO, h: hF - 0.04, fill: B.TEAL_50, line: B.TEAL_50 });
    let cx = X0;
    C.icono(slide, f.icono || "activity", spot ? "teal" : "navy", { x: cx + 0.08, y: y + 0.14, s: 0.28 });
    C.texto(slide, f.nombre, { x: cx + 0.46, y: y + 0.1, w: cols[0] - 0.56, h: hF - 0.2, max: 12, min: 9.5, bold: true, color: B.NAVY });
    cx += cols[0];
    C.texto(slide, f.dato, { x: cx + 0.05, y: y + 0.1, w: cols[1] - 0.2, h: hF - 0.2, max: 10.5, min: 8.5, color: B.BODY, negritaColor: B.NAVY });
    cx += cols[1];
    C.palancaChip(slide, f.palanca, { x: cx + 0.05, y: y + 0.12, spot });
    cx += cols[2];
    C.texto(slide, f.implicacion, { x: cx + 0.05, y: y + 0.1, w: cols[3] - 0.1, h: hF - 0.2, max: 10.5, min: 8.5, color: B.BODY });
    if (i < filas.length - 1) C.linea(slide, { x: X0, y: y + hF, w: ANCHO, color: B.BORDER });
  });
}

// ── 5. Mapa de valor por subfunción ─────────────────────────────────
function mapaValor(pres, D, ctx) {
  const M = D.mapa_valor;
  const slide = C.marco(pres, ctx, { titulo: M.titulo, eyebrow: EYEBROW, fuente: M.fuente });
  const wSub = 3.05, wCel = 1.62, wNota = ANCHO - wSub - wCel * 3;
  const yH = 1.8, hH = 0.34;
  const cab = ["Subfunción", "Ventas", "Margen", "Capital de trabajo", "Dónde se pierde valor hoy"];
  const xs = [X0, X0 + wSub, X0 + wSub + wCel, X0 + wSub + wCel * 2, X0 + wSub + wCel * 3];
  const ws = [wSub, wCel, wCel, wCel, wNota];
  cab.forEach((c, i) => C.etiqueta(slide, c, { x: xs[i] + 0.06, y: yH, w: ws[i] - 0.12, h: hH, align: i >= 1 && i <= 3 ? "center" : "left", espaciado: i >= 1 && i <= 3 ? 1 : undefined }));
  C.linea(slide, { x: X0, y: yH + hH, w: ANCHO, color: B.NAVY, ancho: 1 });

  const NIVEL = [
    { t: "", fill: B.WHITE, color: B.MUTED },
    { t: "Bajo", fill: B.TEAL_50, color: B.BODY },
    { t: "Medio", fill: B.TEAL_200, color: B.NAVY },
    { t: "Alto", fill: B.TEAL_400, color: B.NAVY },
  ];
  const filas = M.subfunciones.slice(0, 8);
  const y0 = yH + hH + 0.06, hF = Math.min(0.62, (6.3 - y0) / filas.length);
  filas.forEach((s, i) => {
    const y = y0 + i * hF;
    const ids = (s.agentes || []).slice(0, 2);
    C.texto(slide, s.nombre, { x: X0 + 0.06, y: y + 0.04, w: wSub - 0.14 - ids.length * 0.5, h: hF - 0.08, max: 11, min: 9, bold: true, color: B.NAVY, valign: "middle" });
    ids.forEach((id, k) => {
      C.chip(slide, id, { x: X0 + wSub - 0.56 - k * 0.5, y: y + (hF - 0.24) / 2, h: 0.24, w: 0.44, size: 8, fill: B.NAVY, color: B.WHITE, bold: true });
    });
    ["ventas", "margen", "capital"].forEach((k, j) => {
      const n = Math.max(0, Math.min(3, s[k] || 0));
      const nv = NIVEL[n];
      C.caja(slide, { x: xs[j + 1] + 0.04, y: y + 0.04, w: wCel - 0.08, h: hF - 0.08, fill: nv.fill, line: n ? nv.fill : B.BORDER });
      if (nv.t) slide.addText(nv.t, { x: xs[j + 1], y, w: wCel, h: hF, fontFace: B.FONT_BODY, fontSize: 9.5, bold: n === 3, color: nv.color, align: "center", valign: "middle", margin: 0 });
    });
    C.texto(slide, s.nota, { x: xs[4] + 0.12, y: y + 0.04, w: wNota - 0.16, h: hF - 0.08, max: 10, min: 8, color: B.BODY, valign: "middle" });
  });
  const yL = y0 + filas.length * hF + 0.12;
  C.texto(slide, `Intensidad: qué tanto pesa cada subfunción en cada resultado (bajo · medio · alto). **A1–A5**: dónde actúa cada uno de los cinco sistemas agénticos propuestos.`, {
    x: X0, y: yL, w: ANCHO, h: 0.3, max: 9, min: 8, color: B.MUTED, negritaColor: B.NAVY,
  });
}

// ── 6. Casos de la industria ────────────────────────────────────────
function casosIndustria(pres, D, ctx) {
  const K = D.casos_industria;
  const slide = C.marco(pres, ctx, { titulo: K.titulo, eyebrow: EYEBROW, fuente: K.fuente });
  const casos = K.casos.slice(0, 6);
  const porFila = casos.length <= 4 ? 2 : 3;
  const filas = Math.ceil(casos.length / porFila);
  const gap = 0.18;
  const w = (ANCHO - gap * (porFila - 1)) / porFila;
  const h = (6.68 - 1.8 - gap * (filas - 1)) / filas;
  const hQ = h - 0.38 - 0.4 - 0.62 - 0.3;
  const ptTit = C.ptComun(casos.map((c) => c.empresa), { w: w - 0.4, h: 0.36, max: 14, min: 10.5, fuente: "Georgia", bold: true });
  const ptQue = C.ptComun(casos.map((c) => c.que_hace), { w: w - 0.4, h: hQ, max: 10.5, min: 8.5 });
  const ptRes = C.ptComun(casos.map((c) => c.resultado), { w: w - 0.66, h: 0.56, max: 10.5, min: 8.5, bold: true });
  casos.forEach((c, i) => {
    const x = X0 + (i % porFila) * (w + gap);
    const y = 1.8 + Math.floor(i / porFila) * (h + gap);
    const spot = !!c.destacado;
    C.caja(slide, { x, y, w, h, fill: spot ? B.TEAL_50 : B.WHITE, line: spot ? B.TEAL_200 : B.BORDER });
    C.etiqueta(slide, c.subfuncion, { x: x + 0.2, y: y + 0.14, w: w - 0.4, color: spot ? B.TEAL_DARK : B.MUTED });
    C.texto(slide, c.empresa, { x: x + 0.2, y: y + 0.38, w: w - 0.4, h: 0.36, max: ptTit, min: ptTit, fuente: B.FONT_HEADING, bold: true, color: B.NAVY });
    C.texto(slide, c.que_hace, { x: x + 0.2, y: y + 0.78, w: w - 0.4, h: hQ, max: ptQue, min: ptQue, color: B.BODY });
    const yR = y + 0.78 + hQ + 0.04;
    C.linea(slide, { x: x + 0.2, y: yR, w: w - 0.4, color: B.BORDER });
    C.icono(slide, "trending-up", spot ? "teal" : "navy", { x: x + 0.2, y: yR + 0.1, s: 0.2 });
    C.texto(slide, c.resultado, { x: x + 0.46, y: yR + 0.06, w: w - 0.66, h: 0.56, max: ptRes, min: ptRes, bold: true, color: B.NAVY });
    C.texto(slide, `${c.fecha} · ${c.tipo_fuente}`, { x: x + 0.2, y: y + h - 0.3, w: w - 0.4, h: 0.22, max: 8, min: 7, color: B.MUTED, italic: true });
  });
}

// ── 7. Matriz de casos: impacto × madurez ───────────────────────────
function matrizCasos(pres, D, ctx) {
  const M = D.matriz_casos;
  const slide = C.marco(pres, ctx, { titulo: M.titulo, eyebrow: EYEBROW, fuente: M.fuente });
  const ax = X0 + 0.45, ay = 1.85, aw = 7.2, ah = 4.45;

  // Cuadrantes
  C.caja(slide, { x: ax + aw / 2, y: ay, w: aw / 2, h: ah / 2, fill: B.OFF_WHITE, line: B.OFF_WHITE });
  C.linea(slide, { x: ax, y: ay + ah, w: aw, color: B.NAVY, ancho: 1 });
  C.linea(slide, { x: ax, y: ay, h: ah, color: B.NAVY, ancho: 1 });
  C.linea(slide, { x: ax + aw / 2, y: ay, h: ah, color: B.BORDER, dash: "dash" });
  C.linea(slide, { x: ax, y: ay + ah / 2, w: aw, color: B.BORDER, dash: "dash" });
  const q = [
    ["Apuestas por probar", ax + 0.1, ay + 0.08],
    ["Arrancar aquí", ax + aw / 2 + 0.1, ay + 0.08],
    ["Observar", ax + 0.1, ay + ah / 2 + 0.08],
    ["Mejoras de paso", ax + aw / 2 + 0.1, ay + ah / 2 + 0.08],
  ];
  q.forEach(([t, x, y]) => C.etiqueta(slide, t, { x, y, w: 3, color: B.MUTED_LIGHT, size: 8 }));
  slide.addText("Madurez en la industria  →", { x: ax, y: ay + ah + 0.04, w: aw, h: 0.24, fontFace: B.FONT_BODY, fontSize: 9, color: B.MUTED, align: "right", margin: 0 });
  // Etiqueta del eje vertical: la rotación es sobre el centro de la caja
  const largoEje = 2.6;
  slide.addText("Impacto potencial  →", {
    x: ax - 0.32 - largoEje / 2, y: ay + ah / 2 - 0.12, w: largoEje, h: 0.24,
    fontFace: B.FONT_BODY, fontSize: 9, color: B.MUTED, align: "center", valign: "middle", margin: 0, rotate: 270,
  });

  // Puntos fijos; cada etiqueta busca un lugar libre (derecha, izquierda, abajo, arriba)
  const casos = M.casos.slice(0, 10).map((c) => ({
    c,
    px: ax + ((Math.max(1, Math.min(5, c.madurez)) - 0.5) / 5) * aw,
    py: ay + ah - ((Math.max(1, Math.min(5, c.impacto)) - 0.5) / 5) * ah,
  }));
  // separa puntos idénticos
  casos.forEach((a, i) => casos.slice(0, i).forEach((b) => {
    if (Math.abs(a.px - b.px) < 0.05 && Math.abs(a.py - b.py) < 0.05) a.px += 0.28;
  }));
  const ocupado = casos.map((k) => ({ x: k.px - 0.12, y: k.py - 0.12, w: 0.24, h: 0.24 }));
  const choca = (r) => ocupado.some((o) => r.x < o.x + o.w && r.x + r.w > o.x && r.y < o.y + o.h && r.y + r.h > o.y);
  const dentro = (r) => r.x >= ax + 0.02 && r.x + r.w <= ax + aw - 0.02 && r.y >= ay + 0.28 && r.y + r.h <= ay + ah - 0.02;
  casos.forEach(({ c, px, py }) => {
    const spot = !!c.es_prioridad;
    slide.addShape("ellipse", {
      x: px - 0.1, y: py - 0.1, w: 0.2, h: 0.2,
      fill: { color: spot ? B.TEAL : B.GHOST }, line: { color: spot ? B.TEAL_DARK : B.BORDER_DARK, width: 0.75 },
    });
    const lw = Math.min(2.3, C.anchoChip(c.nombre, 9, 0.02, spot));
    const opciones = [
      { x: px + 0.15, y: py - 0.12, w: lw, h: 0.24, align: "left" },
      { x: px - 0.15 - lw, y: py - 0.12, w: lw, h: 0.24, align: "right" },
      { x: px - lw / 2, y: py + 0.13, w: lw, h: 0.24, align: "center" },
      { x: px - lw / 2, y: py - 0.37, w: lw, h: 0.24, align: "center" },
    ];
    const r = opciones.find((o) => dentro(o) && !choca(o)) || opciones.find(dentro) || opciones[0];
    ocupado.push(r);
    slide.addText(c.nombre, {
      x: r.x, y: r.y, w: r.w, h: r.h, fontFace: B.FONT_BODY, fontSize: 9,
      bold: spot, color: spot ? B.NAVY : B.MUTED, align: r.align, valign: "middle", margin: 0,
    });
  });

  // Lectura
  const xR = ax + aw + 0.45, wR = XF - xR;
  C.etiqueta(slide, "Cómo leerla", { x: xR, y: 1.85, w: wR });
  C.linea(slide, { x: xR, y: 2.12, w: wR, color: B.NAVY, ancho: 1 });
  let y = 2.25;
  const hB = (5.35 - y) / Math.max(1, M.lectura.length);
  M.lectura.slice(0, 3).forEach((l, i) => {
    C.insignia(slide, i + 1, { x: xR, y: y + 0.02, s: 0.28, size: 10, fill: B.NAVY });
    C.texto(slide, l, { x: xR + 0.4, y, w: wR - 0.4, h: hB - 0.1, max: 10.5, min: 8.5, color: B.BODY, negritaColor: B.NAVY });
    y += hB;
  });
  // Leyenda
  const yL = 5.6;
  slide.addShape("ellipse", { x: xR, y: yL + 0.04, w: 0.18, h: 0.18, fill: { color: B.TEAL }, line: { color: B.TEAL_DARK, width: 0.75 } });
  slide.addText(`Se convierte en uno de los cinco sistemas para ${D.meta.empresa_corta}`, { x: xR + 0.28, y: yL, w: wR - 0.28, h: 0.26, fontFace: B.FONT_BODY, fontSize: 9, color: B.BODY, valign: "middle", margin: 0 });
  slide.addShape("ellipse", { x: xR, y: yL + 0.38, w: 0.18, h: 0.18, fill: { color: B.GHOST }, line: { color: B.BORDER_DARK, width: 0.75 } });
  slide.addText("Caso de la industria, fuera de la prioridad actual", { x: xR + 0.28, y: yL + 0.34, w: wR - 0.28, h: 0.26, fontFace: B.FONT_BODY, fontSize: 9, color: B.BODY, valign: "middle", margin: 0 });
}

module.exports = { empresa, fuerzas, mapaValor, casosIndustria, matrizCasos };
