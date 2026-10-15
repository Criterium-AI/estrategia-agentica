#!/usr/bin/env node
/**
 * Arma el PowerPoint de estrategia agéntica a partir de estrategia.json.
 *
 * Uso:
 *   node construir-deck.js <ruta/estrategia.json> [ruta/salida.pptx]
 *
 * Correr SIEMPRE validar.js antes: este script asume datos válidos.
 */
const fs = require("fs");
const path = require("path");
const { cargarPptx } = require("./cargar-pptx");
const apertura = require("./laminas/apertura");
const industria = require("./laminas/industria");
const diagnostico = require("./laminas/diagnostico");
const agente = require("./laminas/agente");
const cierre = require("./laminas/cierre");

function nombreArchivo(D) {
  const limpio = String(D.meta.empresa).replace(/[\\/:*?"<>|]/g, "").trim();
  return `${limpio} - Estrategia de sistemas agénticos.pptx`;
}

/** Arma todas las láminas en memoria. Devuelve la presentación y el contexto. */
function armar(D) {
  const pptxgen = cargarPptx();
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "CRITERIUM";
  pres.company = "CRITERIUM";
  pres.title = `${D.meta.empresa} · Estrategia de sistemas agénticos`;

  const ctx = { pagina: 0, total: 28, cliente: D.meta.empresa_corta || D.meta.empresa };

  // Apertura
  apertura.portada(pres, D, ctx);
  apertura.resumen(pres, D, ctx);
  // Sección 1 · Empresa e industria
  industria.empresa(pres, D, ctx);
  industria.fuerzas(pres, D, ctx);
  industria.mapaValor(pres, D, ctx);
  industria.casosIndustria(pres, D, ctx);
  industria.matrizCasos(pres, D, ctx);
  // Sección 2 · Sistemas agénticos
  diagnostico.diagnostico(pres, D, ctx);
  diagnostico.queEsAgentico(pres, D, ctx);
  diagnostico.cincoAgentes(pres, D, ctx);
  D.agentes.forEach((a, i) => {
    agente.trabaja(pres, D, ctx, a, i);
    agente.funciona(pres, D, ctx, a, i);
    agente.construye(pres, D, ctx, a, i);
  });
  // Sección 3 · Impacto y ruta
  cierre.impacto(pres, D, ctx);
  cierre.olas(pres, D, ctx);
  cierre.siguientes(pres, D, ctx);
  return { pres, ctx };
}

async function construir(rutaDatos, rutaSalida) {
  const D = JSON.parse(fs.readFileSync(rutaDatos, "utf8"));
  const { pres, ctx } = armar(D);
  const { alertas } = require("./comunes");
  alertas.forEach((a) => console.warn(`aviso · lámina ${a.lamina}: texto no cupo completo → "${a.texto}…"`));
  const salida = rutaSalida || path.join(path.dirname(path.resolve(rutaDatos)), nombreArchivo(D));
  await pres.writeFile({ fileName: salida });
  return { salida, laminas: ctx.pagina };
}

if (require.main === module) {
  const [, , datos, salida] = process.argv;
  if (!datos) {
    console.error("Uso: node construir-deck.js <estrategia.json> [salida.pptx]");
    process.exit(1);
  }
  construir(datos, salida)
    .then(({ salida: s, laminas }) => console.log(`LISTO · ${laminas} láminas · ${s}`))
    .catch((e) => {
      console.error("ERROR al construir el deck:", e.message);
      process.exit(1);
    });
}

module.exports = { armar, construir, nombreArchivo };
