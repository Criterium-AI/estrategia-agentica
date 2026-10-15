/**
 * Encuentra pptxgenjs sin importar cómo se instaló el plugin.
 *
 * Orden de búsqueda:
 *   1. node_modules en la raíz del plugin (Claude Code lo instala solo al instalar el plugin)
 *   2. node_modules en ${CLAUDE_PLUGIN_DATA} (lo instala motor/preflight.sh si faltó el 1)
 *   3. instalación global de npm
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

// Carpeta de respaldo donde preflight.sh instala dependencias si hace falta
const RESPALDO = path.join(os.homedir(), ".criterium-estrategia-ia");

function candidatos() {
  const lista = [
    path.join(__dirname, "..", "..", "..", "node_modules"),
    process.env.CLAUDE_PLUGIN_DATA ? path.join(process.env.CLAUDE_PLUGIN_DATA, "node_modules") : null,
    path.join(RESPALDO, "node_modules"),
  ];
  try {
    lista.push(execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim());
  } catch (e) {
    // sin npm global: se ignora
  }
  return lista.filter(Boolean);
}

function cargarPptx() {
  for (const dir of candidatos()) {
    const ruta = path.join(dir, "pptxgenjs");
    if (fs.existsSync(path.join(ruta, "package.json"))) return require(ruta);
  }
  throw new Error(
    "No encontré la librería pptxgenjs. Corre:  bash \"" +
      path.join(__dirname, "preflight.sh") +
      "\"  y vuelve a intentar."
  );
}

module.exports = { cargarPptx, candidatos, RESPALDO };
