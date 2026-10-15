#!/usr/bin/env bash
# Convierte el deck a PDF para revisarlo lámina por lámina.
# Uso: bash revisar-visual.sh "<deck.pptx>"
# Imprime la ruta del PDF, o SIN_LIBREOFFICE (código 3) si no hay cómo convertir.
set -u
DECK="${1:?Uso: bash revisar-visual.sh <deck.pptx>}"
SOFFICE="$(command -v soffice || true)"
[ -z "$SOFFICE" ] && [ -x "/Applications/LibreOffice.app/Contents/MacOS/soffice" ] && SOFFICE="/Applications/LibreOffice.app/Contents/MacOS/soffice"
if [ -z "$SOFFICE" ]; then
  echo "SIN_LIBREOFFICE"
  exit 3
fi
DIR="$(cd "$(dirname "$DECK")" && pwd)/revision"
mkdir -p "$DIR"
"$SOFFICE" --headless --convert-to pdf --outdir "$DIR" "$DECK" >/dev/null 2>&1
PDF="$DIR/$(basename "${DECK%.*}").pdf"
if [ -f "$PDF" ]; then
  echo "$PDF"
else
  echo "ERROR_CONVERSION"
  exit 4
fi
