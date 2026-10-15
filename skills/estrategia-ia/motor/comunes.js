/**
 * Piezas comunes a todas las láminas: el marco de marca (logo, título de acción,
 * etiqueta de sección, pie y fuente) y los elementos repetidos (chips, íconos,
 * medidor de magnitud, palancas). Todo sale de brand.js y primitives.js del
 * Criterium Deck Composer; aquí no se inventan colores ni tamaños.
 */
const path = require("path");
const fs = require("fs");
const B = require("./brand");
const P = require("./primitives");
const { ajustar, runs, lineasEstimadas, quitarMarcas } = require("./texto");

const ASSETS = path.join(__dirname, "..", "assets");

// Textos que no cupieron ni al tamaño mínimo. validar.js los reporta como falla.
const alertas = [];
let laminaActual = 0;
function registrarLamina(n) { laminaActual = n; }

// ── Vocabulario fijo ────────────────────────────────────────────────
const PALANCAS = {
  ventas: { etiqueta: "Ventas", icono: "trending-up" },
  margen: { etiqueta: "Margen", icono: "percent" },
  capital: { etiqueta: "Capital de trabajo", icono: "repeat" },
};

const CAPACIDADES = {
  agente: { etiqueta: "agente", fill: B.TEAL, color: B.WHITE, line: B.TEAL },
  generativa: { etiqueta: "IA generativa", fill: B.WHITE, color: B.NAVY, line: B.BORDER_DARK },
  modelo: { etiqueta: "modelo clásico", fill: B.DIVIDER, color: B.MUTED, line: B.DIVIDER },
  humana: { etiqueta: "persona", fill: B.WHITE, color: B.WARNING_FG, line: B.WARNING_FG },
};

const MAGNITUD = { grande: 3, mediano: 2, chico: 1 };

// ── Texto ───────────────────────────────────────────────────────────
/**
 * Texto que se ajusta a su caja. Acepta **negritas**.
 * o: { x, y, w, h, max, min, bold, color, fuente, align, valign, italic, espaciado }
 */
function texto(slide, t, o) {
  const fuente = o.fuente || B.FONT_BODY;
  const { pt, desborda } = ajustar(t, {
    w: o.w, h: o.h, max: o.max || B.SIZE_BODY, min: o.min || Math.min(8, o.max || B.SIZE_BODY),
    fuente, negrita: !!o.bold, interlineado: o.interlineado || 1.18,
  });
  if (desborda && String(t || "").trim()) alertas.push({ lamina: laminaActual, texto: quitarMarcas(t).slice(0, 80) });
  const base = {
    fontFace: fuente, fontSize: pt, color: o.color || B.BODY, bold: !!o.bold, italic: !!o.italic,
  };
  slide.addText(runs(t, base, o.negritaColor ? { color: o.negritaColor } : {}), {
    x: o.x, y: o.y, w: o.w, h: o.h,
    align: o.align || "left", valign: o.valign || "top", margin: o.margen != null ? o.margen : 0.04,
    lineSpacingMultiple: o.lineSpacingMultiple || 1.0,
    charSpacing: o.espaciado || 0,
    fit: "none",
  });
  return pt;
}

/** Etiqueta en mayúsculas pequeñas (eyebrow). */
function etiqueta(slide, t, o) {
  slide.addText(String(t).toUpperCase(), {
    x: o.x, y: o.y, w: o.w, h: o.h || 0.22,
    fontFace: B.FONT_BODY, fontSize: o.size || B.SIZE_LABEL - 1, bold: true,
    color: o.color || B.MUTED, charSpacing: o.espaciado != null ? o.espaciado : B.CHAR_SPACING_LABEL,
    align: o.align || "left", valign: o.valign || "middle", margin: 0,
  });
}

/**
 * Tamaño común para elementos paralelos (títulos de tarjetas, filas de una
 * tabla): el mayor tamaño con el que caben TODOS. Así no hay tarjetas con
 * letra de distinto tamaño.
 */
function ptComun(textos, o) {
  let pt = o.max;
  for (const t of textos) {
    const r = ajustar(t, { w: o.w, h: o.h, max: o.max, min: o.min, fuente: o.fuente || "Arial", negrita: !!o.bold, interlineado: o.interlineado || 1.18 });
    pt = Math.min(pt, r.pt);
  }
  return pt;
}

// ── Formas ──────────────────────────────────────────────────────────
function caja(slide, o) {
  slide.addShape(o.redondeo ? "roundRect" : "rect", {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fill: { color: o.fill || B.WHITE },
    line: { color: o.line || o.fill || B.BORDER, width: o.lineW != null ? o.lineW : 0.75, dashType: o.dash || "solid" },
    rectRadius: o.redondeo ? Math.min(o.redondeo, o.h / 2) : undefined,
  });
}

function linea(slide, o) {
  slide.addShape("line", {
    x: o.x, y: o.y, w: o.w || 0, h: o.h || 0,
    line: {
      color: o.color || B.BORDER_DARK, width: o.ancho || 0.75, dashType: o.dash || "solid",
      endArrowType: o.flecha ? "triangle" : undefined,
    },
    flipV: !!o.flipV,
  });
}

function icono(slide, nombre, variante, o) {
  const archivo = path.join(ASSETS, "icons", `${nombre}__${variante}.png`);
  if (!fs.existsSync(archivo)) return;
  slide.addImage({ path: archivo, x: o.x, y: o.y, w: o.s, h: o.s });
}

/** Ancho estimado de un chip para un texto dado. */
function anchoChip(t, size = 9, pad = 0.12, negrita = false) {
  const em = negrita ? 0.56 : 0.52;
  return quitarMarcas(t).length * ((em * size) / 72) + pad * 2;
}

/** Chip redondeado con texto. Devuelve el ancho usado. */
function chip(slide, t, o) {
  const size = o.size || 9;
  const w = o.w || anchoChip(t, size, o.pad || 0.12, !!o.bold);
  const h = o.h || 0.26;
  caja(slide, { x: o.x, y: o.y, w, h, fill: o.fill || B.DIVIDER, line: o.line || o.fill || B.DIVIDER, redondeo: h / 2 });
  slide.addText(String(t), {
    x: o.x, y: o.y, w, h, fontFace: B.FONT_BODY, fontSize: size, bold: !!o.bold,
    color: o.color || B.BODY, align: "center", valign: "middle", margin: 0,
  });
  return w;
}

/**
 * Fila de chips que salta de renglón cuando no cabe. Devuelve la `y` final.
 * items: string[] | {texto, fill, color, line, bold}[]
 */
function chips(slide, items, o) {
  const gap = o.gap || 0.08;
  const h = o.h || 0.26;
  let x = o.x, y = o.y, filas = 1;
  for (const it of items) {
    const item = typeof it === "string" ? { texto: it } : it;
    const w = Math.min(anchoChip(item.texto, o.size || 9, 0.12, !!item.bold), o.w);
    if (x + w > o.x + o.w + 0.001) { x = o.x; y += h + gap; filas += 1; }
    chip(slide, item.texto, Object.assign({}, o, item, { x, y, w, h }));
    x += w + gap;
  }
  if (o.maxFilas && filas > o.maxFilas) {
    alertas.push({ lamina: laminaActual, texto: `fila de etiquetas no cabe en ${o.maxFilas} renglón(es): ${items.map((i) => (typeof i === "string" ? i : i.texto)).join(", ")}` });
  }
  return y + h;
}

/** Chip de palanca (ventas / margen / capital de trabajo) con su ícono. */
function palancaChip(slide, palanca, o) {
  const p = PALANCAS[palanca] || { etiqueta: palanca, icono: "target" };
  const h = o.h || 0.28;
  const w = o.w || anchoChip(p.etiqueta, 9, 0.12) + 0.26;
  const spot = !!o.spot;
  caja(slide, { x: o.x, y: o.y, w, h, fill: spot ? B.TEAL_50 : B.DIVIDER, line: spot ? B.TEAL_200 : B.DIVIDER, redondeo: h / 2 });
  icono(slide, p.icono, spot ? "teal" : "navy", { x: o.x + 0.1, y: o.y + (h - 0.16) / 2, s: 0.16 });
  slide.addText(p.etiqueta, {
    x: o.x + 0.3, y: o.y, w: w - 0.36, h, fontFace: B.FONT_BODY, fontSize: 9, bold: true,
    color: B.NAVY, align: "left", valign: "middle", margin: 0,
  });
  return w;
}

/** Medidor de magnitud: tres barras de altura creciente + la palabra. */
function magnitud(slide, nivel, o) {
  const n = MAGNITUD[nivel] || 0;
  const bw = 0.07, gap = 0.04, base = o.y + 0.24;
  for (let i = 0; i < 3; i++) {
    const bh = 0.09 + i * 0.06;
    caja(slide, {
      x: o.x + i * (bw + gap), y: base - bh, w: bw, h: bh,
      fill: i < n ? (o.spot ? B.TEAL : B.NAVY) : B.BORDER, line: i < n ? (o.spot ? B.TEAL : B.NAVY) : B.BORDER, lineW: 0,
    });
  }
  if (o.conTexto !== false) {
    slide.addText(nivel ? nivel.charAt(0).toUpperCase() + nivel.slice(1) : "s/d", {
      x: o.x + 0.36, y: o.y, w: o.wTexto || 0.9, h: 0.26, fontFace: B.FONT_BODY, fontSize: 9,
      color: B.BODY, valign: "middle", margin: 0,
    });
  }
}

/** Chip de capacidad: agente / IA generativa / modelo clásico / persona. */
function capacidadChip(slide, cap, o) {
  const c = CAPACIDADES[cap] || CAPACIDADES.modelo;
  return chip(slide, c.etiqueta, { x: o.x, y: o.y, w: o.w, h: o.h || 0.24, size: 8, fill: c.fill, color: c.color, line: c.line, bold: cap === "agente" });
}

/** Círculo con número o letra. */
function insignia(slide, t, o) {
  const s = o.s || 0.32;
  slide.addShape("ellipse", {
    x: o.x, y: o.y, w: s, h: s,
    fill: { color: o.fill || B.NAVY }, line: { color: o.line || o.fill || B.NAVY, width: 0.75 },
  });
  slide.addText(String(t), {
    x: o.x, y: o.y, w: s, h: s, fontFace: B.FONT_HEADING, fontSize: o.size || 12, bold: true,
    color: o.color || B.WHITE, align: "center", valign: "middle", margin: 0,
  });
}

// ── Marco de la lámina ──────────────────────────────────────────────
/**
 * Crea una lámina de contenido con todo el marco de marca.
 * o: { titulo, eyebrow, subtitulo, fuente, oscuro }
 */
function marco(pres, ctx, o) {
  const slide = pres.addSlide();
  const oscuro = !!o.oscuro;
  slide.background = { color: oscuro ? B.NAVY : B.WHITE };
  P.addLogo(slide, ASSETS, oscuro ? "white" : "gray");
  if (o.eyebrow) {
    etiqueta(slide, o.eyebrow, { x: B.TITLE_X, y: 0.16, w: B.TITLE_W, h: 0.22, color: oscuro ? B.TEAL_ON_DARK : B.MUTED });
  }
  // Título de acción: Georgia 22 pt, se reduce hasta 18 pt si hace falta para quedar en 2 líneas.
  const { pt, desborda } = ajustar(o.titulo, { w: B.TITLE_W, h: B.TITLE_H, max: B.SIZE_ACTION_TITLE, min: 18, fuente: "Georgia", negrita: true, interlineado: 1.12 });
  if (desborda) alertas.push({ lamina: ctx.pagina + 1, texto: "TÍTULO: " + String(o.titulo).slice(0, 80) });
  slide.addText(o.titulo, {
    x: B.TITLE_X, y: B.TITLE_Y, w: B.TITLE_W, h: B.TITLE_H,
    fontFace: B.FONT_HEADING, fontSize: pt, bold: true,
    color: oscuro ? B.WHITE : B.BODY, valign: "top", margin: 0, fit: "none",
  });
  if (o.subtitulo) {
    slide.addText(o.subtitulo, {
      x: B.TITLE_X, y: B.SUBTITLE_Y, w: B.TITLE_W, h: B.SUBTITLE_H,
      fontFace: B.FONT_BODY, fontSize: B.SIZE_SUBTITLE, italic: true,
      color: oscuro ? B.MUTED_LIGHT : B.MUTED, valign: "top", margin: 0,
    });
  }
  ctx.pagina += 1;
  registrarLamina(ctx.pagina);
  P.addFooter(slide, { client: ctx.cliente, page: ctx.pagina, total: ctx.total, dark: oscuro });
  if (o.fuente) P.addSourceLine(slide, o.fuente, { dark: oscuro });
  return slide;
}

module.exports = {
  alertas, registrarLamina,
  B, P, ASSETS, PALANCAS, CAPACIDADES, MAGNITUD,
  texto, etiqueta, ptComun, caja, linea, icono, chip, chips, anchoChip,
  palancaChip, magnitud, capacidadChip, insignia, marco,
  ajustar, runs, lineasEstimadas,
};
