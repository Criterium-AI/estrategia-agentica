#!/usr/bin/env bash
# Revisa que la computadora pueda construir el PowerPoint.
# Salida: líneas "OK ...", "AVISO ..." o "FALTA ...". Código 0 si se puede construir.
set -u
MOTOR="$(cd "$(dirname "$0")" && pwd)"
RESPALDO="${CLAUDE_PLUGIN_DATA:-$HOME/.criterium-estrategia-ia}"

# 1. Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "FALTA node: esta computadora no tiene Node.js."
  echo "  Cómo instalarlo (5 minutos, una sola vez):"
  echo "  1. Abre https://nodejs.org y descarga la versión LTS (botón verde)."
  echo "  2. Abre el instalador y acepta los pasos."
  echo "  3. Cierra y vuelve a abrir Claude Code, y corre otra vez el comando."
  exit 2
fi
VERSION="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$VERSION" -lt 18 ]; then
  echo "FALTA node: la versión instalada es $(node -v); se necesita 18 o más reciente (nodejs.org, versión LTS)."
  exit 2
fi
echo "OK node $(node -v)"

# 2. Librería pptxgenjs (se instala sola con el plugin; si no, aquí)
if ! node -e "require('$MOTOR/cargar-pptx').cargarPptx()" >/dev/null 2>&1; then
  if ! command -v npm >/dev/null 2>&1; then
    echo "FALTA npm: viene con Node.js; reinstala Node desde https://nodejs.org (versión LTS)."
    exit 2
  fi
  echo "AVISO instalando la librería de PowerPoint (una sola vez, ~10 segundos)..."
  mkdir -p "$RESPALDO"
  if ! npm install --prefix "$RESPALDO" --no-audit --no-fund pptxgenjs@4.0.1 >/dev/null 2>&1; then
    echo "FALTA pptxgenjs: no se pudo instalar (¿sin internet?). Revisa la conexión y vuelve a intentar."
    exit 2
  fi
  CLAUDE_PLUGIN_DATA="$RESPALDO" node -e "require('$MOTOR/cargar-pptx').cargarPptx()" >/dev/null 2>&1 || {
    echo "FALTA pptxgenjs: se instaló pero no se pudo cargar."
    exit 2
  }
fi
echo "OK librería de PowerPoint"

# 3. LibreOffice (opcional): permite revisar visualmente cada lámina
SOFFICE="$(command -v soffice || true)"
[ -z "$SOFFICE" ] && [ -x "/Applications/LibreOffice.app/Contents/MacOS/soffice" ] && SOFFICE="/Applications/LibreOffice.app/Contents/MacOS/soffice"
if [ -n "$SOFFICE" ]; then
  echo "OK revisión visual disponible (LibreOffice)"
else
  echo "AVISO sin LibreOffice: el deck se construye igual; la revisión visual lámina por lámina no estará disponible."
fi
exit 0
