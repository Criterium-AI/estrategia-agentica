/**
 * Las tres láminas de cada sistema agéntico (se repiten 5 veces, mismo marco):
 *   a. ¿Cómo trabaja?   la gente · el agente (meta + 4 verbos) · IA clásica · límites
 *   b. ¿Cómo funciona?  un día del agente paso a paso · firma humana · KPI que mueve
 *   c. ¿Cómo se construye?  arquitectura en capas · autonomía por acción · ruta
 * Patrón tomado de las láminas "¿Cómo trabaja?" / "¿Cómo funciona?" del keynote
 * de retail de CRITERIUM, llevado a PowerPoint con el sistema del Deck Composer.
 */
const C = require("../comunes");
const { B } = C;

const X0 = B.MARGIN_L;
const XF = B.SLIDE_W - B.MARGIN_R;

function eyebrow(a, i, parte) {
  return `Sistema agéntico ${i + 1} de 5 · ${a.nombre_corto} · ${parte}`;
}

// ── a. ¿Cómo trabaja? ───────────────────────────────────────────────
function trabaja(pres, D, ctx, a, i) {
  const T = a.trabaja;
  const slide = C.marco(pres, ctx, { titulo: T.titulo, eyebrow: eyebrow(a, i, "¿Cómo trabaja?"), fuente: T.fuente || "Escenario ilustrativo construido con la conversación con la empresa y la investigación de industria" });

  // Columna izquierda: síntoma · causa · hoy vs con el agente
  const wL = 3.4;
  C.etiqueta(slide, "Síntoma", { x: X0, y: 1.8, w: wL, color: B.DANGER_FG });
  C.texto(slide, T.sintoma, { x: X0, y: 2.04, w: wL, h: 0.98, max: 11.5, min: 8.5, color: B.BODY });
  C.etiqueta(slide, "Causa", { x: X0, y: 3.08, w: wL, color: B.NAVY });
  C.texto(slide, T.causa, { x: X0, y: 3.32, w: wL, h: 0.98, max: 11, min: 8.5, color: B.BODY });
  const yC = 4.42, hC = 6.68 - yC;
  C.caja(slide, { x: X0, y: yC, w: wL, h: hC, fill: B.OFF_WHITE, line: B.BORDER });
  C.etiqueta(slide, "Hoy", { x: X0 + 0.16, y: yC + 0.1, w: wL - 0.32 });
  C.texto(slide, T.hoy, { x: X0 + 0.16, y: yC + 0.32, w: wL - 0.32, h: hC / 2 - 0.4, max: 10, min: 8.5, color: B.BODY });
  C.linea(slide, { x: X0 + 0.16, y: yC + hC / 2, w: wL - 0.32, color: B.BORDER });
  C.etiqueta(slide, "Con el agente", { x: X0 + 0.16, y: yC + hC / 2 + 0.08, w: wL - 0.32, color: B.TEAL_DARK });
  C.texto(slide, T.con_agente, { x: X0 + 0.16, y: yC + hC / 2 + 0.3, w: wL - 0.32, h: hC / 2 - 0.38, max: 10, min: 8.5, bold: true, color: B.NAVY });

  // Columna derecha: tres capas
  const xR = X0 + wL + 0.35, wR = XF - xR;

  // 1. La gente
  const yG = 1.8, hG = 1.08;
  C.caja(slide, { x: xR, y: yG, w: wR, h: hG, fill: B.WHITE, line: B.BORDER });
  C.etiqueta(slide, "La gente", { x: xR + 0.18, y: yG + 0.08, w: 2 });
  const gente = T.gente.slice(0, 3);
  const wGc = (wR - 0.36) / gente.length;
  gente.forEach((g, k) => {
    const x = xR + 0.18 + k * wGc;
    C.icono(slide, "user", "navy", { x, y: yG + 0.36, s: 0.2 });
    C.texto(slide, g.rol, { x: x + 0.26, y: yG + 0.31, w: wGc - 0.36, h: 0.28, max: 10.5, min: 9, bold: true, color: B.NAVY });
    C.texto(slide, g.hace, { x, y: yG + 0.6, w: wGc - 0.15, h: hG - 0.66, max: 9.5, min: 8, color: B.BODY });
  });
  C.texto(slide, "↑  escala solo la excepción, con el caso armado", { x: xR + 0.18, y: yG + hG + 0.02, w: wR - 0.36, h: 0.24, max: 9, min: 8, color: B.TEAL_DARK, bold: true });

  // 2. El agente
  const yA = yG + hG + 0.28, hA = 1.72;
  C.caja(slide, { x: xR, y: yA, w: wR, h: hA, fill: B.NAVY, line: B.NAVY });
  C.texto(slide, a.nombre, { x: xR + 0.2, y: yA + 0.1, w: 3.2, h: 0.3, max: 12, min: 10, bold: true, color: B.WHITE, fuente: B.FONT_HEADING });
  C.texto(slide, `**Meta ·** ${a.meta}`, { x: xR + 0.2, y: yA + 0.4, w: wR - 0.4, h: 0.3, max: 10, min: 8.5, color: B.WHITE, negritaColor: B.TEAL_ON_DARK });
  const verbos = [["Revisa", T.verbos.revisa], ["Diagnostica", T.verbos.diagnostica], ["Actúa", T.verbos.actua], ["Reporta", T.verbos.reporta]];
  const wV = (wR - 0.4) / 4;
  verbos.forEach(([v, d], k) => {
    const x = xR + 0.2 + k * wV;
    C.linea(slide, { x, y: yA + 0.78, w: wV - 0.15, color: B.MUTED, ancho: 0.75 });
    slide.addText(`${k + 1}  ${v}`, { x, y: yA + 0.82, w: wV - 0.15, h: 0.26, fontFace: B.FONT_BODY, fontSize: 10.5, bold: true, color: B.TEAL_ON_DARK, margin: 0, valign: "middle" });
    C.texto(slide, d, { x, y: yA + 1.08, w: wV - 0.15, h: hA - 1.14, max: 9.5, min: 8, color: B.WHITE });
  });
  const tieneModelo = (T.ia_clasica || []).length > 0;
  C.texto(slide, tieneModelo ? `↑  usa lo que el modelo clásico recomienda: ${T.recomienda || "qué, cuánto y cuándo"}` : "↑  lee y escribe directo en los sistemas de la empresa", {
    x: xR + 0.18, y: yA + hA + 0.02, w: wR - 0.36, h: 0.24, max: 9, min: 8, color: B.MUTED, bold: true,
  });

  // 3. IA clásica
  const yI = yA + hA + 0.28, hI = 0.66;
  C.caja(slide, { x: xR, y: yI, w: wR, h: hI, fill: B.OFF_WHITE, line: B.BORDER });
  C.etiqueta(slide, "Sigue siendo IA clásica · se compra si no existe", { x: xR + 0.18, y: yI + 0.06, w: wR - 0.36 });
  if (tieneModelo) {
    C.chips(slide, T.ia_clasica.slice(0, 4), { x: xR + 0.18, y: yI + 0.32, w: wR - 0.36, h: 0.25, size: 8.5, fill: B.WHITE, line: B.BORDER, color: B.BODY, maxFilas: 1 });
  } else {
    C.texto(slide, "Ningún modelo clásico que comprar: el agente trabaja sobre el correo, los documentos y el sistema administrativo.", { x: xR + 0.18, y: yI + 0.3, w: wR - 0.36, h: 0.3, max: 9.5, min: 8, color: B.BODY });
  }

  // Límites escritos
  const yLm = yI + hI + 0.12, hLm = 6.68 - yLm;
  C.etiqueta(slide, "Límites escritos", { x: xR, y: yLm, w: 2.5 });
  const yEnd = C.chips(slide, T.limites.slice(0, 4), { x: xR, y: yLm + 0.26, w: wR - 2.65, h: 0.26, size: 8.5, fill: B.WHITE, line: B.BORDER_DARK, color: B.BODY, maxFilas: 2 });
  C.texto(slide, `**Escala a:** ${T.escala_a}`, { x: XF - 2.55, y: yLm + 0.22, w: 2.55, h: Math.max(0.5, hLm - 0.26), max: 9.5, min: 8, color: B.BODY, negritaColor: B.WARNING_FG });
  void yEnd;
}

// ── b. ¿Cómo funciona? ──────────────────────────────────────────────
function funciona(pres, D, ctx, a, i) {
  const F = a.funciona;
  const slide = C.marco(pres, ctx, { titulo: F.titulo, eyebrow: eyebrow(a, i, "¿Cómo funciona?"), fuente: "Demostración conceptual: pasos, horarios y cifras ilustrativos del funcionamiento esperado" });

  // Consola
  const wC = 7.85, yC = 1.8, hC = 6.68 - yC;
  C.caja(slide, { x: X0, y: yC, w: wC, h: hC, fill: B.WHITE, line: B.BORDER });
  C.caja(slide, { x: X0, y: yC, w: wC, h: 0.44, fill: B.OFF_WHITE, line: B.BORDER });
  slide.addShape("ellipse", { x: X0 + 0.18, y: yC + 0.17, w: 0.1, h: 0.1, fill: { color: B.TEAL }, line: { color: B.TEAL, width: 0 } });
  C.texto(slide, `**${a.nombre}**  ·  ${F.escena}`, { x: X0 + 0.36, y: yC + 0.06, w: wC - 2.6, h: 0.32, max: 10.5, min: 8.5, color: B.MUTED, negritaColor: B.NAVY, valign: "middle" });
  C.chip(slide, "demostración conceptual", { x: X0 + wC - 1.95, y: yC + 0.1, w: 1.8, h: 0.24, size: 8, fill: B.WHITE, line: B.BORDER_DARK, color: B.MUTED });

  const pasos = F.pasos.slice(0, 6);
  const yP0 = yC + 0.56, hRail = 0.62;
  const hP = (hC - 0.56 - hRail - 0.06) / pasos.length;
  pasos.forEach((p, k) => {
    const y = yP0 + k * hP;
    C.insignia(slide, k + 1, { x: X0 + 0.18, y: y + 0.06, s: 0.28, size: 10, fill: p.capacidad === "humana" ? B.WHITE : B.NAVY, line: p.capacidad === "humana" ? B.WARNING_FG : B.NAVY, color: p.capacidad === "humana" ? B.WARNING_FG : B.WHITE });
    C.texto(slide, p.accion, { x: X0 + 0.6, y: y + 0.03, w: wC - 2.25, h: 0.28, max: 10.5, min: 9, bold: true, color: B.NAVY });
    C.texto(slide, `✓ ${p.detalle}`, { x: X0 + 0.6, y: y + 0.3, w: wC - 2.25, h: hP - 0.34, max: 9, min: 7.5, color: B.MUTED });
    C.capacidadChip(slide, p.capacidad, { x: X0 + wC - 1.5, y: y + 0.07, w: 1.32 });
    if (k < pasos.length - 1) C.linea(slide, { x: X0 + 0.6, y: y + hP - 0.02, w: wC - 0.78, color: B.DIVIDER });
  });
  // Riel de estados
  const yRail = yC + hC - hRail + 0.04;
  const estados = ["recibido", "diagnosticado", "ejecutado", "verificado", "cerrado"];
  const wE = (wC - 0.6) / (estados.length - 1);
  C.linea(slide, { x: X0 + 0.3, y: yRail + 0.16, w: wC - 0.6, color: B.TEAL, ancho: 1.5 });
  estados.forEach((e, k) => {
    const x = X0 + 0.3 + k * wE;
    slide.addShape("ellipse", { x: x - 0.07, y: yRail + 0.09, w: 0.14, h: 0.14, fill: { color: B.TEAL }, line: { color: B.TEAL, width: 0 } });
    slide.addText(e, { x: x - 0.7, y: yRail + 0.26, w: 1.4, h: 0.22, fontFace: B.FONT_BODY, fontSize: 8, color: B.MUTED, align: "center", margin: 0 });
  });

  // Columna derecha
  const xR = X0 + wC + 0.3, wR = XF - xR;
  // Lo que recibe la persona
  const yRc = 1.8, hRc = 1.5;
  C.caja(slide, { x: xR, y: yRc, w: wR, h: hRc, fill: B.OFF_WHITE, line: B.BORDER });
  C.etiqueta(slide, `Lo que recibe ${F.recibe_quien || "el equipo"}`, { x: xR + 0.18, y: yRc + 0.1, w: wR - 0.36, espaciado: 1 });
  C.texto(slide, F.resultado, { x: xR + 0.18, y: yRc + 0.36, w: wR - 0.36, h: hRc - 0.44, max: 12, min: 9, color: B.BODY, negritaColor: B.NAVY });
  // Firma humana
  const yF = yRc + hRc + 0.14, hF = 1.3;
  C.caja(slide, { x: xR, y: yF, w: wR, h: hF, fill: B.WHITE, line: B.WARNING_FG });
  C.icono(slide, "shield", "navy", { x: xR + 0.18, y: yF + 0.12, s: 0.22 });
  C.etiqueta(slide, "Requiere firma de una persona", { x: xR + 0.48, y: yF + 0.12, w: wR - 0.66, color: B.WARNING_FG });
  C.texto(slide, `**${F.firma.quien}:** ${F.firma.que}`, { x: xR + 0.18, y: yF + 0.42, w: wR - 0.36, h: hF - 0.5, max: 10, min: 8.5, color: B.BODY, negritaColor: B.NAVY });
  // KPI que mueve
  const yK = yF + hF + 0.14, hK = 6.68 - yK;
  C.caja(slide, { x: xR, y: yK, w: wR, h: hK, fill: B.TEAL_50, line: B.TEAL_200 });
  C.etiqueta(slide, "KPI que mueve", { x: xR + 0.18, y: yK + 0.1, w: wR - 0.36, color: B.TEAL_DARK });
  const kpis = a.kpis.slice(0, 4);
  const hk = (hK - 0.85) / kpis.length;
  kpis.forEach((k, j) => {
    const y = yK + 0.38 + j * hk;
    C.icono(slide, "check", "teal", { x: xR + 0.18, y: y + 0.03, s: 0.18 });
    C.texto(slide, k, { x: xR + 0.44, y, w: wR - 0.62, h: hk, max: 10, min: 8.5, color: B.NAVY, bold: j === 0 });
  });
  const yM = yK + hK - 0.42;
  C.palancaChip(slide, a.palanca, { x: xR + 0.18, y: yM, spot: true });
  C.magnitud(slide, a.magnitud, { x: XF - 1.2, y: yM + 0.01, spot: true, wTexto: 0.75 });
}

// ── c. ¿Cómo se construye? ──────────────────────────────────────────
function construye(pres, D, ctx, a, i) {
  const K = a.construye;
  const slide = C.marco(pres, ctx, { titulo: K.titulo, eyebrow: eyebrow(a, i, "¿Cómo se construye?"), fuente: K.fuente || "Arquitectura de referencia CRITERIUM para sistemas agénticos · los sistemas de registro de la empresa no se reemplazan" });

  const wL = 7.75, wLab = 1.62, xC = X0 + wLab, wCont = wL - wLab;
  const capas = [
    { lab: "Personas y canales", sub: "dónde se pide y se entrega", h: 0.66 },
    { lab: "Sistema agéntico", sub: "uno por proceso", h: 0.66 },
    { lab: "Controles", sub: "", h: 0.42 },
    { lab: "Herramientas", sub: "conectores y modelos", h: 0.66 },
    { lab: "Cerebro contextual", sub: "contexto común de la operación", h: 0.98 },
    { lab: "Sistemas de registro", sub: "no se reemplazan", h: 0.86 },
  ];
  const gap = (6.68 - 1.8 - capas.reduce((s, c) => s + c.h, 0)) / (capas.length - 1);
  let y = 1.8;
  const ys = [];
  capas.forEach((c) => { ys.push(y); y += c.h + gap; });
  // conectores verticales detrás de las capas
  C.linea(slide, { x: xC + wCont / 2, y: ys[0] + capas[0].h, h: ys[5] - ys[0] - capas[0].h, color: B.BORDER_DARK, dash: "dash" });

  capas.forEach((c, k) => {
    C.texto(slide, c.lab, { x: X0, y: ys[k] + 0.02, w: wLab - 0.1, h: 0.26, max: 10, min: 8.5, bold: true, color: k === 1 ? B.TEAL_DARK : B.NAVY });
    if (c.sub) C.texto(slide, c.sub, { x: X0, y: ys[k] + 0.26, w: wLab - 0.1, h: 0.36, max: 8.5, min: 7.5, color: B.MUTED });
  });
  // 1. Personas y canales
  C.caja(slide, { x: xC, y: ys[0], w: wCont, h: capas[0].h, fill: B.WHITE, line: B.BORDER });
  const canales = K.canales.map((t) => ({ texto: t, fill: B.DIVIDER, color: B.NAVY })).concat(K.personas.map((t) => ({ texto: t, fill: B.WHITE, line: B.BORDER_DARK, color: B.BODY })));
  C.chips(slide, canales.slice(0, 7), { x: xC + 0.14, y: ys[0] + 0.18, w: wCont - 0.28, h: 0.28, size: 8.5, maxFilas: 1 });
  // 2. Sistema agéntico
  C.caja(slide, { x: xC, y: ys[1], w: wCont, h: capas[1].h, fill: B.TEAL_50, line: B.TEAL_200 });
  C.caja(slide, { x: xC + 0.14, y: ys[1] + 0.13, w: 2.6, h: 0.4, fill: B.TEAL, line: B.TEAL, redondeo: 0.06 });
  C.texto(slide, a.nombre, { x: xC + 0.16, y: ys[1] + 0.13, w: 2.56, h: 0.4, max: 10, min: 8, bold: true, color: B.WHITE, align: "center", valign: "middle" });
  // Los otros agentes, en un solo renglón: los que caben y "+N" con el resto
  const otros = D.agentes.filter((o) => o.id !== a.id).map((o) => o.nombre_corto);
  const anchoDisp = wCont - 3.0;
  const visibles = [];
  let usado = 0;
  otros.forEach((t, k) => {
    const w = C.anchoChip(t, 8) + 0.08;
    const resto = otros.length - k - 1;
    const reserva = resto > 0 ? C.anchoChip(`+${resto}`, 8) + 0.08 : 0;
    if (visibles.length === k && usado + w + reserva <= anchoDisp) { visibles.push(t); usado += w; }
  });
  const chipsOtros = visibles.map((t) => ({ texto: t, fill: B.WHITE, line: B.TEAL_200, color: B.MUTED }));
  if (visibles.length < otros.length) chipsOtros.push({ texto: `+${otros.length - visibles.length}`, fill: B.WHITE, line: B.TEAL_200, color: B.MUTED });
  C.chips(slide, chipsOtros, { x: xC + 2.88, y: ys[1] + 0.19, w: anchoDisp, h: 0.28, size: 8, maxFilas: 1 });
  // 3. Controles
  C.caja(slide, { x: xC, y: ys[2], w: wCont, h: capas[2].h, fill: B.WHITE, line: B.WARNING_FG, dash: "dash" });
  slide.addText("permisos  ·  límites escritos  ·  bitácora de cada acción  ·  evaluaciones  ·  salida a una persona", {
    x: xC, y: ys[2], w: wCont, h: capas[2].h, fontFace: B.FONT_BODY, fontSize: 9, color: B.WARNING_FG, align: "center", valign: "middle", margin: 0,
  });
  // 4. Herramientas
  C.caja(slide, { x: xC, y: ys[3], w: wCont, h: capas[3].h, fill: B.WHITE, line: B.BORDER });
  C.chips(slide, K.herramientas.slice(0, 5), { x: xC + 0.14, y: ys[3] + 0.18, w: wCont - 0.28, h: 0.28, size: 8.5, fill: B.DIVIDER, color: B.NAVY, maxFilas: 1 });
  // 5. Cerebro contextual
  C.caja(slide, { x: xC, y: ys[4], w: wCont, h: capas[4].h, fill: B.NAVY, line: B.NAVY });
  C.texto(slide, "Lo que el agente necesita saber de la operación, en un solo lugar:", { x: xC + 0.16, y: ys[4] + 0.08, w: wCont - 0.32, h: 0.26, max: 9, min: 8, color: B.MUTED_LIGHT });
  C.chips(slide, K.cerebro.slice(0, 7), { x: xC + 0.16, y: ys[4] + 0.38, w: wCont - 0.32, h: 0.26, size: 8.5, fill: B.NAVY_SOFT, line: B.NAVY_SOFT, color: B.WHITE, maxFilas: 2 });
  // 6. Sistemas de registro
  C.caja(slide, { x: xC, y: ys[5], w: wCont, h: capas[5].h, fill: B.WHITE, line: B.BORDER });
  const sis = K.sistemas.slice(0, 5);
  const wS = (wCont - 0.28 - (sis.length - 1) * 0.1) / sis.length;
  sis.forEach((s, k) => {
    const x = xC + 0.14 + k * (wS + 0.1);
    C.caja(slide, { x, y: ys[5] + 0.12, w: wS, h: capas[5].h - 0.24, fill: B.OFF_WHITE, line: B.BORDER });
    C.texto(slide, s.nombre, { x: x + 0.04, y: ys[5] + 0.13, w: wS - 0.08, h: 0.38, max: 9, min: 7.5, bold: true, color: B.NAVY, align: "center", valign: "middle" });
    slide.addText(s.acceso, { x: x + 0.04, y: ys[5] + 0.5, w: wS - 0.08, h: 0.2, fontFace: B.FONT_BODY, fontSize: 7.5, color: s.acceso.includes("escribe") ? B.TEAL_DARK : B.MUTED, bold: s.acceso.includes("escribe"), align: "center", margin: 0 });
  });

  // Columna derecha
  const xR = X0 + wL + 0.35, wR = XF - xR;
  // Autonomía por acción
  C.etiqueta(slide, "Autonomía por acción", { x: xR, y: 1.8, w: wR });
  C.linea(slide, { x: xR, y: 2.06, w: wR, color: B.NAVY, ancho: 1 });
  const NIV = {
    N1: { fill: B.NAVY, color: B.WHITE, line: B.NAVY },
    N2: { fill: B.WHITE, color: B.NAVY, line: B.NAVY },
    N3: { fill: B.DIVIDER, color: B.MUTED, line: B.DIVIDER },
  };
  const acciones = K.autonomia.slice(0, 4);
  const hAc = 0.38;
  const ptAc = C.ptComun(acciones.map((ac) => ac.accion), { w: wR - 0.62, h: hAc - 0.04, max: 9.5, min: 8 });
  acciones.forEach((ac, k) => {
    const yy = 2.1 + k * hAc;
    C.texto(slide, ac.accion, { x: xR, y: yy, w: wR - 0.62, h: hAc - 0.04, max: ptAc, min: ptAc, color: B.BODY, valign: "middle" });
    const n = NIV[ac.nivel] || NIV.N2;
    C.chip(slide, ac.nivel, { x: XF - 0.5, y: yy + (hAc - 0.24) / 2, w: 0.5, h: 0.24, size: 8.5, bold: true, fill: n.fill, color: n.color, line: n.line });
    C.linea(slide, { x: xR, y: yy + hAc, w: wR, color: B.BORDER });
  });
  const yLey = 2.1 + acciones.length * hAc + 0.05;
  C.texto(slide, "**N1** lo hace solo y queda en bitácora · **N2** lo propone y una persona aprueba · **N3** nunca lo hace", { x: xR, y: yLey, w: wR, h: 0.34, max: 8.5, min: 7.5, color: B.MUTED, negritaColor: B.NAVY });

  // Ruta
  const yRu = yLey + 0.44;
  C.etiqueta(slide, "Ruta", { x: xR, y: yRu, w: wR });
  C.linea(slide, { x: xR, y: yRu + 0.26, w: wR, color: B.NAVY, ancho: 1 });
  const ruta = K.ruta.slice(0, 3);
  const hRu = 0.48;
  ruta.forEach((r, k) => {
    const yy = yRu + 0.32 + k * hRu;
    C.insignia(slide, k + 1, { x: xR, y: yy + 0.03, s: 0.24, size: 9, fill: k === 1 ? B.TEAL : B.NAVY });
    C.texto(slide, `**${r.fase}** · ${r.semanas}`, { x: xR + 0.34, y: yy, w: wR - 0.34, h: 0.22, max: 9, min: 8, color: B.MUTED, negritaColor: B.NAVY });
    C.texto(slide, r.entregable, { x: xR + 0.34, y: yy + 0.21, w: wR - 0.34, h: hRu - 0.22, max: 8.5, min: 7.5, color: B.BODY });
  });

  // Antes de arrancar
  const yPr = yRu + 0.32 + ruta.length * hRu + 0.06;
  const hPr = 6.68 - yPr;
  C.caja(slide, { x: xR, y: yPr, w: wR, h: hPr, fill: B.OFF_WHITE, line: B.BORDER });
  C.etiqueta(slide, "Antes de arrancar", { x: xR + 0.14, y: yPr + 0.04, w: wR - 0.28, h: 0.2, size: 8 });
  const pre = K.prerrequisitos.slice(0, 3);
  C.texto(slide, pre.map((t) => "·  " + t).join("\n"), { x: xR + 0.14, y: yPr + 0.22, w: wR - 0.28, h: hPr - 0.24, max: 9, min: 7.5, color: B.BODY, interlineado: 1.08, margen: 0.02 });
}

module.exports = { trabaja, funciona, construye };
