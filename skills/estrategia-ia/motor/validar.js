#!/usr/bin/env node
/**
 * Verificador de estrategia.json ANTES de construir el deck.
 *
 * Uso:  node validar.js <ruta/estrategia.json>
 *
 * Revisa cuatro cosas y termina con "TODO CUADRA" (código 0) o con la lista de
 * FALLAS (código 1). Los avisos no detienen, pero conviene atenderlos.
 *   1. Estructura: campos obligatorios, cantidades y valores permitidos.
 *   2. Coherencia: 5 agentes, ids, arranque, olas, firma humana, límites.
 *   3. Redacción: tics de IA prohibidos y cero cifras de dinero en impacto.
 *   4. Acomodo: arma el deck en memoria y reporta textos que no caben.
 */
const fs = require("fs");
const path = require("path");

const ruta = process.argv[2];
if (!ruta) {
  console.error("Uso: node validar.js <estrategia.json>");
  process.exit(1);
}

let D;
try {
  D = JSON.parse(fs.readFileSync(ruta, "utf8"));
} catch (e) {
  console.log(`FALLA: no pude leer ${ruta} como JSON (${e.message})`);
  process.exit(1);
}

const fallas = [];
const avisos = [];
const falla = (m) => fallas.push(m);
const aviso = (m) => avisos.push(m);

const PALANCAS = ["ventas", "margen", "capital"];
const MAGNITUDES = ["grande", "mediano", "chico"];
const CAPACIDADES = ["agente", "generativa", "modelo", "humana"];
const NIVELES = ["N1", "N2", "N3"];
const ORIGENES = ["empresa", "calculado", "industria"];
const TIPOS_OTRA = ["automatizacion", "analitica", "proceso"];

// ── utilidades ──────────────────────────────────────────────────────
function obtener(obj, ruta) {
  return ruta.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function texto(rutaCampo, { max, min = 1, obj = D, etiqueta } = {}) {
  const v = obtener(obj, rutaCampo);
  const nombre = etiqueta || rutaCampo;
  if (typeof v !== "string" || v.trim().length < min) {
    falla(`${nombre}: falta o está vacío`);
    return "";
  }
  const largo = v.replace(/\*\*/g, "").length;
  if (max && largo > max) falla(`${nombre}: ${largo} caracteres (máximo ${max})`);
  return v;
}
function lista(rutaCampo, { min, max, obj = D, etiqueta } = {}) {
  const v = obtener(obj, rutaCampo);
  const nombre = etiqueta || rutaCampo;
  if (!Array.isArray(v)) { falla(`${nombre}: debe ser una lista`); return []; }
  if (min != null && v.length < min) falla(`${nombre}: tiene ${v.length}, mínimo ${min}`);
  if (max != null && v.length > max) falla(`${nombre}: tiene ${v.length}, máximo ${max}`);
  return v;
}
function enumera(valor, permitidos, nombre) {
  if (!permitidos.includes(valor)) falla(`${nombre}: "${valor}" no es válido (usa ${permitidos.join(" | ")})`);
}

// ── 1. Estructura ───────────────────────────────────────────────────
const TIT = 135; // títulos de acción: dos líneas máximo (el acomodo en memoria es el filtro final)
texto("meta.empresa", { max: 60 });
texto("meta.empresa_corta", { max: 22 });
texto("meta.fecha", { max: 20 });
texto("portada.titulo", { max: 80 });
texto("portada.subtitulo", { max: 70 });

texto("resumen.titulo", { max: TIT });
["situacion", "complicacion", "resolucion"].forEach((k) => texto(`resumen.${k}`, { max: 300 }));
texto("resumen.porque_arranque", { max: 150 });

texto("empresa.titulo", { max: TIT });
texto("empresa.descripcion", { max: 330 });
lista("empresa.modelo", { min: 4, max: 4 }).forEach((m, i) => {
  texto("label", { obj: m, max: 18, etiqueta: `empresa.modelo[${i}].label` });
  texto("texto", { obj: m, max: 125, etiqueta: `empresa.modelo[${i}].texto` });
});
lista("empresa.datos", { min: 3, max: 4 }).forEach((d, i) => {
  texto("valor", { obj: d, max: 12, etiqueta: `empresa.datos[${i}].valor` });
  texto("etiqueta", { obj: d, max: 45, etiqueta: `empresa.datos[${i}].etiqueta` });
  texto("fuente", { obj: d, max: 60, etiqueta: `empresa.datos[${i}].fuente` });
});
texto("empresa.posicion", { max: 220 });
texto("empresa.fuente", { max: 190 });

texto("fuerzas.titulo", { max: TIT });
lista("fuerzas.fuerzas", { min: 4, max: 5 }).forEach((f, i) => {
  const n = `fuerzas.fuerzas[${i}]`;
  texto("nombre", { obj: f, max: 55, etiqueta: `${n}.nombre` });
  texto("dato", { obj: f, max: 130, etiqueta: `${n}.dato` });
  texto("implicacion", { obj: f, max: 140, etiqueta: `${n}.implicacion` });
  enumera(f.palanca, PALANCAS, `${n}.palanca`);
});
texto("fuerzas.fuente", { max: 190 });

texto("mapa_valor.titulo", { max: TIT });
lista("mapa_valor.subfunciones", { min: 6, max: 8 }).forEach((s, i) => {
  const n = `mapa_valor.subfunciones[${i}]`;
  texto("nombre", { obj: s, max: 34, etiqueta: `${n}.nombre` });
  texto("nota", { obj: s, max: 100, etiqueta: `${n}.nota` });
  PALANCAS.forEach((p) => {
    if (![0, 1, 2, 3].includes(s[p])) falla(`${n}.${p}: debe ser 0, 1, 2 o 3`);
  });
});
texto("mapa_valor.fuente", { max: 190 });

texto("casos_industria.titulo", { max: TIT });
lista("casos_industria.casos", { min: 4, max: 6 }).forEach((c, i) => {
  const n = `casos_industria.casos[${i}]`;
  texto("empresa", { obj: c, max: 45, etiqueta: `${n}.empresa` });
  texto("subfuncion", { obj: c, max: 28, etiqueta: `${n}.subfuncion` });
  texto("que_hace", { obj: c, max: 160, etiqueta: `${n}.que_hace` });
  texto("resultado", { obj: c, max: 80, etiqueta: `${n}.resultado` });
  texto("fecha", { obj: c, max: 14, etiqueta: `${n}.fecha` });
  texto("tipo_fuente", { obj: c, max: 40, etiqueta: `${n}.tipo_fuente` });
});
texto("casos_industria.fuente", { max: 190 });

texto("matriz_casos.titulo", { max: TIT });
lista("matriz_casos.casos", { min: 6, max: 10 }).forEach((c, i) => {
  const n = `matriz_casos.casos[${i}]`;
  texto("nombre", { obj: c, max: 30, etiqueta: `${n}.nombre` });
  ["impacto", "madurez"].forEach((k) => {
    if (!(c[k] >= 1 && c[k] <= 5)) falla(`${n}.${k}: debe ir de 1 a 5`);
  });
});
lista("matriz_casos.lectura", { min: 3, max: 3 }).forEach((l, i) => {
  if (typeof l !== "string" || l.replace(/\*\*/g, "").length > 150) falla(`matriz_casos.lectura[${i}]: vacío o más de 150 caracteres`);
});

texto("diagnostico.titulo", { max: TIT });
lista("diagnostico.dolores", { min: 5, max: 5 }).forEach((d, i) => {
  const n = `diagnostico.dolores[${i}]`;
  texto("dolor", { obj: d, max: 75, etiqueta: `${n}.dolor` });
  texto("cita", { obj: d, max: 165, etiqueta: `${n}.cita` });
  enumera(d.palanca, PALANCAS, `${n}.palanca`);
  enumera(d.estado, ["confirmada", "hipotesis"], `${n}.estado`);
  if (d.cita_textual != null && typeof d.cita_textual !== "boolean") falla(`${n}.cita_textual: debe ser true o false`);
});
lista("diagnostico.otras_palancas", { min: 0, max: 3 }).forEach((o, i) => {
  const n = `diagnostico.otras_palancas[${i}]`;
  texto("dolor", { obj: o, max: 80, etiqueta: `${n}.dolor` });
  texto("por_que", { obj: o, max: 130, etiqueta: `${n}.por_que` });
  enumera(o.tipo, TIPOS_OTRA, `${n}.tipo`);
});
texto("que_es.ejemplo", { max: 330 });
texto("cinco_agentes.titulo", { max: TIT });

// ── Agentes ─────────────────────────────────────────────────────────
const agentes = lista("agentes", { min: 5, max: 5 });
const ids = agentes.map((a) => a.id);
if (new Set(ids).size !== ids.length) falla("agentes: hay ids repetidos");
agentes.forEach((a, i) => {
  const n = `agentes[${i}] (${a.id || "?"})`;
  texto("id", { obj: a, max: 3, etiqueta: `${n}.id` });
  texto("nombre", { obj: a, max: 36, etiqueta: `${n}.nombre` });
  texto("nombre_corto", { obj: a, max: 16, etiqueta: `${n}.nombre_corto` });
  texto("meta", { obj: a, max: 110, etiqueta: `${n}.meta` });
  texto("dolor", { obj: a, max: 90, etiqueta: `${n}.dolor` });
  texto("por_que", { obj: a, max: 150, etiqueta: `${n}.por_que` });
  texto("magnitud_razon", { obj: a, max: 160, etiqueta: `${n}.magnitud_razon` });
  enumera(a.palanca, PALANCAS, `${n}.palanca`);
  (a.palancas_secundarias || []).forEach((p) => enumera(p, PALANCAS, `${n}.palancas_secundarias`));
  enumera(a.magnitud, MAGNITUDES, `${n}.magnitud`);
  enumera(a.estado, ["confirmada", "hipotesis"], `${n}.estado`);
  lista("kpis", { obj: a, min: 3, max: 4, etiqueta: `${n}.kpis` }).forEach((k, j) => {
    if (typeof k !== "string" || k.length > 48) falla(`${n}.kpis[${j}]: vacío o más de 48 caracteres`);
  });
  enumera(a.impacto && a.impacto.origen, ORIGENES, `${n}.impacto.origen`);
  texto("impacto.formula", { obj: a, max: 120, etiqueta: `${n}.impacto.formula` });

  // a. ¿Cómo trabaja?
  const T = a.trabaja || {};
  texto("titulo", { obj: T, max: TIT, etiqueta: `${n}.trabaja.titulo` });
  texto("sintoma", { obj: T, max: 150, etiqueta: `${n}.trabaja.sintoma` });
  texto("causa", { obj: T, max: 170, etiqueta: `${n}.trabaja.causa` });
  texto("hoy", { obj: T, max: 130, etiqueta: `${n}.trabaja.hoy` });
  texto("con_agente", { obj: T, max: 120, etiqueta: `${n}.trabaja.con_agente` });
  lista("gente", { obj: T, min: 2, max: 3, etiqueta: `${n}.trabaja.gente` }).forEach((g, j) => {
    texto("rol", { obj: g, max: 26, etiqueta: `${n}.trabaja.gente[${j}].rol` });
    texto("hace", { obj: g, max: 85, etiqueta: `${n}.trabaja.gente[${j}].hace` });
  });
  ["revisa", "diagnostica", "actua", "reporta"].forEach((v) => texto(`verbos.${v}`, { obj: T, max: 62, etiqueta: `${n}.trabaja.verbos.${v}` }));
  lista("ia_clasica", { obj: T, min: 0, max: 4, etiqueta: `${n}.trabaja.ia_clasica` }).forEach((x, j) => {
    if (typeof x !== "string" || x.length > 40) falla(`${n}.trabaja.ia_clasica[${j}]: vacío o más de 40 caracteres`);
  });
  if ((T.ia_clasica || []).length) texto("recomienda", { obj: T, max: 60, etiqueta: `${n}.trabaja.recomienda` });
  lista("limites", { obj: T, min: 2, max: 4, etiqueta: `${n}.trabaja.limites` }).forEach((x, j) => {
    if (typeof x !== "string" || x.length > 44) falla(`${n}.trabaja.limites[${j}]: vacío o más de 44 caracteres`);
  });
  texto("escala_a", { obj: T, max: 60, etiqueta: `${n}.trabaja.escala_a` });

  // b. ¿Cómo funciona?
  const F = a.funciona || {};
  texto("titulo", { obj: F, max: TIT, etiqueta: `${n}.funciona.titulo` });
  texto("escena", { obj: F, max: 42, etiqueta: `${n}.funciona.escena` });
  const pasos = lista("pasos", { obj: F, min: 5, max: 6, etiqueta: `${n}.funciona.pasos` });
  pasos.forEach((p, j) => {
    texto("accion", { obj: p, max: 34, etiqueta: `${n}.funciona.pasos[${j}].accion` });
    texto("detalle", { obj: p, max: 82, etiqueta: `${n}.funciona.pasos[${j}].detalle` });
    enumera(p.capacidad, CAPACIDADES, `${n}.funciona.pasos[${j}].capacidad`);
  });
  if (!pasos.some((p) => p.capacidad === "humana")) falla(`${n}.funciona.pasos: falta el paso donde decide una persona (capacidad "humana")`);
  if (!pasos.some((p) => p.capacidad === "agente")) falla(`${n}.funciona.pasos: ningún paso lo ejecuta el agente`);
  texto("recibe_quien", { obj: F, max: 28, etiqueta: `${n}.funciona.recibe_quien` });
  texto("resultado", { obj: F, max: 160, etiqueta: `${n}.funciona.resultado` });
  texto("firma.quien", { obj: F, max: 30, etiqueta: `${n}.funciona.firma.quien` });
  texto("firma.que", { obj: F, max: 150, etiqueta: `${n}.funciona.firma.que` });

  // c. ¿Cómo se construye?
  const K = a.construye || {};
  texto("titulo", { obj: K, max: TIT, etiqueta: `${n}.construye.titulo` });
  const chipsMax = (campo, min, max, largo) => lista(campo, { obj: K, min, max, etiqueta: `${n}.construye.${campo}` }).forEach((x, j) => {
    if (typeof x !== "string" || x.length > largo) falla(`${n}.construye.${campo}[${j}]: vacío o más de ${largo} caracteres`);
  });
  chipsMax("canales", 1, 4, 24);
  chipsMax("personas", 1, 3, 22);
  chipsMax("herramientas", 2, 5, 26);
  chipsMax("cerebro", 3, 6, 28);
  const sis = lista("sistemas", { obj: K, min: 2, max: 5, etiqueta: `${n}.construye.sistemas` });
  sis.forEach((s, j) => {
    texto("nombre", { obj: s, max: 24, etiqueta: `${n}.construye.sistemas[${j}].nombre` });
    enumera(s.acceso, ["lee", "escribe", "lee y escribe"], `${n}.construye.sistemas[${j}].acceso`);
  });
  if (!sis.some((s) => /escribe/.test(s.acceso || ""))) falla(`${n}.construye.sistemas: el agente no escribe en ningún sistema; sin escritura no es agente`);
  const aut = lista("autonomia", { obj: K, min: 3, max: 4, etiqueta: `${n}.construye.autonomia` });
  aut.forEach((x, j) => {
    texto("accion", { obj: x, max: 48, etiqueta: `${n}.construye.autonomia[${j}].accion` });
    enumera(x.nivel, NIVELES, `${n}.construye.autonomia[${j}].nivel`);
  });
  if (!aut.some((x) => x.nivel === "N1")) falla(`${n}.construye.autonomia: ninguna acción N1; un agente que no hace nada solo no es agente`);
  if (!aut.some((x) => x.nivel !== "N1")) falla(`${n}.construye.autonomia: todo es N1; falta lo que aprueba o nunca hace`);
  lista("prerrequisitos", { obj: K, min: 2, max: 3, etiqueta: `${n}.construye.prerrequisitos` }).forEach((x, j) => {
    if (typeof x !== "string" || x.length > 60) falla(`${n}.construye.prerrequisitos[${j}]: vacío o más de 60 caracteres`);
  });
  lista("ruta", { obj: K, min: 3, max: 3, etiqueta: `${n}.construye.ruta` }).forEach((r, j) => {
    texto("fase", { obj: r, max: 30, etiqueta: `${n}.construye.ruta[${j}].fase` });
    texto("semanas", { obj: r, max: 24, etiqueta: `${n}.construye.ruta[${j}].semanas` });
    texto("entregable", { obj: r, max: 75, etiqueta: `${n}.construye.ruta[${j}].entregable` });
  });
});

// ── 2. Coherencia ───────────────────────────────────────────────────
if (!ids.includes(D.arranque)) falla(`arranque: "${D.arranque}" no es el id de ningún agente`);
(D.diagnostico?.dolores || []).forEach((d, i) => {
  if (!ids.includes(d.agente)) falla(`diagnostico.dolores[${i}].agente: "${d.agente}" no es el id de ningún agente`);
});
const enOlas = new Set();
lista("olas.olas", { min: 2, max: 3 }).forEach((o, i) => {
  const n = `olas.olas[${i}]`;
  texto("nombre", { obj: o, max: 12, etiqueta: `${n}.nombre` });
  texto("por_que", { obj: o, max: 120, etiqueta: `${n}.por_que` });
  if (!(o.fin > o.inicio && o.inicio >= 0)) falla(`${n}: inicio y fin no cuadran`);
  (o.agentes || []).forEach((id) => {
    if (!ids.includes(id)) falla(`${n}.agentes: "${id}" no existe`);
    enOlas.add(id);
  });
  (o.hitos || []).forEach((h, j) => {
    if (!(h.mes >= o.inicio && h.mes <= Math.max(o.fin, 18))) aviso(`${n}.hitos[${j}]: el mes queda fuera de la ola`);
    if ((h.texto || "").length > 32) falla(`${n}.hitos[${j}].texto: más de 32 caracteres`);
  });
});
ids.forEach((id) => { if (!enOlas.has(id)) falla(`olas: el agente ${id} no aparece en ninguna ola`); });
const olaArranque = (D.olas?.olas || []).find((o) => (o.agentes || []).includes(D.arranque));
if (olaArranque && olaArranque.inicio !== 0) falla("olas: el agente de arranque debe estar en la ola que empieza en el mes 0");
texto("olas.titulo", { max: TIT });
lista("olas.prerrequisitos", { min: 3, max: 3 }).forEach((p, i) => {
  texto("titulo", { obj: p, max: 30, etiqueta: `olas.prerrequisitos[${i}].titulo` });
  texto("texto", { obj: p, max: 110, etiqueta: `olas.prerrequisitos[${i}].texto` });
});
texto("olas.regla", { max: 170 });
texto("impacto.titulo", { max: TIT });
texto("impacto.lectura", { max: 240 });
texto("siguientes.titulo", { max: TIT });
lista("siguientes.pasos", { min: 3, max: 5 }).forEach((p, i) => {
  texto("cuando", { obj: p, max: 16, etiqueta: `siguientes.pasos[${i}].cuando` });
  texto("que", { obj: p, max: 120, etiqueta: `siguientes.pasos[${i}].que` });
  texto("quien", { obj: p, max: 45, etiqueta: `siguientes.pasos[${i}].quien` });
});
texto("siguientes.necesita", { max: 260 });
const hipotesis = agentes.filter((a) => a.estado === "hipotesis").length;
if (hipotesis > 2) aviso(`${hipotesis} de 5 agentes son hipótesis por validar; el deck se sentirá poco "de ellos"`);
if (agentes.every((a) => a.palanca === agentes[0].palanca)) aviso("los cinco agentes mueven la misma palanca; revisa si el portafolio está balanceado");

// ── 3. Redacción ────────────────────────────────────────────────────
const textos = [];
(function recorrer(v, ruta) {
  if (typeof v === "string") textos.push({ ruta, v });
  else if (Array.isArray(v)) v.forEach((x, i) => recorrer(x, `${ruta}[${i}]`));
  else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => recorrer(x, ruta ? `${ruta}.${k}` : k));
})(D, "");

const PROHIBIDO = [
  [/—/, "raya larga (usa dos puntos, punto o ·)"],
  [/\bno es\b[^.;:]{2,45}, es\b/i, "antítesis «no es X, es Y»"],
  [/\bno solo\b[^.]{2,60}\bsino\b/i, "antítesis «no solo… sino»"],
  [/\bno se trata de\b|\bno basta\b|\bvale más que\b|\bel verdadero\b|\blo realmente\b/i, "comparativo o retórica forzada"],
  [/\b(sinergias?|vanguardia|de última generación|desbloquear|potenciar|apalancar|revolucionari|disruptiv|holístic|hoy más que nunca|pieza clave|siguiente nivel|robust[oa]s?)\b/i, "muletilla de IA"],
  [/\b(cabe destacar|vale la pena señalar|es importante destacar|en un entorno cada vez)\b/i, "muletilla de IA"],
];
textos.forEach(({ ruta: r, v }) => {
  if (r.endsWith(".cita")) return; // las citas textuales se respetan
  PROHIBIDO.forEach(([re, motivo]) => { if (re.test(v)) falla(`${r}: ${motivo} → "${v.slice(0, 70)}…"`); });
});
// Cero cifras de dinero en lo que habla de impacto y de los agentes
const DINERO = /(\$\s?\d|\d\s?(mdp|mmdp)\b|millones de pesos|mil millones|\bMXN\b|\bUSD\b|\bdólares\b)/i;
textos.forEach(({ ruta: r, v }) => {
  const zona = /^(agentes|impacto|cinco_agentes|olas|siguientes|resumen)/.test(r);
  if (zona && DINERO.test(v)) falla(`${r}: cifra de dinero en impacto o agentes (la regla es magnitud sin pesos) → "${v.slice(0, 70)}…"`);
});

// ── 4. Acomodo: arma el deck en memoria ─────────────────────────────
if (!fallas.length) {
  try {
    const { armar } = require("./construir-deck");
    const { alertas } = require("./comunes");
    const { ctx } = armar(D);
    if (ctx.pagina < 26 || ctx.pagina > 30) falla(`el deck tiene ${ctx.pagina} láminas (debe tener entre 26 y 30)`);
    alertas.forEach((a) => falla(`lámina ${a.lamina}: el texto no cabe ni al tamaño mínimo, acórtalo → "${a.texto}…"`));
  } catch (e) {
    falla(`no se pudo armar el deck en memoria: ${e.message}`);
  }
}

// ── Resultado ───────────────────────────────────────────────────────
avisos.forEach((a) => console.log("aviso:", a));
if (fallas.length) {
  fallas.forEach((f) => console.log("FALLA:", f));
  console.log(`\n${fallas.length} falla(s). Corrige estrategia.json y vuelve a validar.`);
  process.exit(1);
}
console.log(`TODO CUADRA · ${path.basename(ruta)} listo para construir`);
