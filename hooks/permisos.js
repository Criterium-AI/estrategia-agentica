#!/usr/bin/env node
/**
 * Permisos acotados del agente de estrategia.
 *
 * Solo actúa si en la carpeta de trabajo hay una estrategia en curso:
 * `.estrategia-ia/sesion.json` con fase distinta de "entregado" y con menos de
 * 4 horas. En ese caso aprueba, sin preguntar:
 *   - búsquedas y lecturas en internet (WebSearch, WebFetch);
 *   - leer o escribir dentro de la carpeta "Estrategia IA - …" o `.estrategia-ia/`;
 *   - leer los archivos del propio plugin;
 *   - correr los scripts del motor del deck, y crear o abrir la carpeta de la estrategia.
 * Para todo lo demás no responde nada y Claude Code pide permiso como siempre.
 */
const fs = require("fs");
const path = require("path");

const CUATRO_HORAS = 4 * 60 * 60 * 1000;

function salir() { process.exit(0); }
function aprobar(motivo) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow", permissionDecisionReason: motivo },
  }));
  process.exit(0);
}

let entrada = "";
process.stdin.on("data", (c) => (entrada += c));
process.stdin.on("end", () => {
  let e;
  try { e = JSON.parse(entrada); } catch { return salir(); }
  const cwd = e.cwd || process.cwd();

  // ¿Hay una estrategia en curso en esta carpeta?
  const marcador = path.join(cwd, ".estrategia-ia", "sesion.json");
  let sesion;
  try {
    sesion = JSON.parse(fs.readFileSync(marcador, "utf8"));
    const edad = Date.now() - fs.statSync(marcador).mtimeMs;
    if (sesion.fase === "entregado" || edad > CUATRO_HORAS) return salir();
  } catch { return salir(); }

  const herramienta = e.tool_name;
  const datos = e.tool_input || {};
  const raizPlugin = process.env.CLAUDE_PLUGIN_ROOT ? path.resolve(process.env.CLAUDE_PLUGIN_ROOT) : null;

  if (herramienta === "WebSearch" || herramienta === "WebFetch") {
    return aprobar("Investigación de la estrategia en curso");
  }

  const dentroDeEstrategia = (ruta) => {
    if (!ruta) return false;
    const abs = path.resolve(cwd, ruta);
    const rel = path.relative(cwd, abs);
    if (rel.startsWith("..") || path.isAbsolute(rel)) return false;
    const primero = rel.split(path.sep)[0];
    return primero.startsWith("Estrategia IA - ") || primero === ".estrategia-ia";
  };

  if (herramienta === "Write" || herramienta === "Edit") {
    return dentroDeEstrategia(datos.file_path) ? aprobar("Archivo de la estrategia en curso") : salir();
  }
  if (herramienta === "Read") {
    const ruta = datos.file_path ? path.resolve(cwd, datos.file_path) : "";
    if (dentroDeEstrategia(datos.file_path)) return aprobar("Archivo de la estrategia en curso");
    if (raizPlugin && ruta.startsWith(raizPlugin + path.sep)) return aprobar("Archivo del agente");
    return salir();
  }
  if (herramienta === "Bash") {
    const cmd = String(datos.command || "").trim();
    if (/[;&|`<>]|\$\(/.test(cmd)) return salir(); // nada encadenado ni redirigido
    if (raizPlugin) {
      const motor = path.join(raizPlugin, "skills", "estrategia-ia", "motor");
      const esc = motor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const reMotor = new RegExp(`^(bash|node) "?${esc}/(preflight\\.sh|validar\\.js|construir-deck\\.js|revisar-visual\\.sh)"?( .*)?$`);
      if (reMotor.test(cmd)) return aprobar("Motor del deck de la estrategia");
    }
    if (/^(mkdir -p|open) "(\.\/)?Estrategia IA - [^"\/]+"$/.test(cmd)) return aprobar("Carpeta de la estrategia");
    return salir();
  }
  return salir();
});
