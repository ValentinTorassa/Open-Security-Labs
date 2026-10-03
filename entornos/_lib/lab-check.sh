# shellcheck shell=bash
# Funciones comunes de los check.sh. Cada entorno lo instala en
# /usr/local/lib/osl/lab-check.sh y su check.sh lo carga con `source`.
#
#   chequear "qué se espera" "pista si falla" comando [args...]
#   ok "texto" / falta "texto" "pista"   para chequeos armados a mano
#   cierre                               resumen y código de salida
#
# Un check nunca modifica el estado del alumno: solo lee.

EVIDENCIA="${EVIDENCIA:-$HOME/evidencia}"
OSL_OK=0
OSL_FALTA=0

paso() { printf '\n%s\n' "$*"; }

ok() {
  OSL_OK=$((OSL_OK + 1))
  printf '  [ok]    %s\n' "$1"
}

falta() {
  OSL_FALTA=$((OSL_FALTA + 1))
  printf '  [falta] %s\n' "$1"
  if [ -n "${2:-}" ]; then printf '          pista: %s\n' "$2"; fi
}

chequear() {
  local que=$1 pista=$2
  shift 2
  if "$@" >/dev/null 2>&1; then ok "$que"; else falta "$que" "$pista"; fi
}

# Archivo de evidencia con contenido (no vacío).
hay_evidencia() { [ -s "$EVIDENCIA/$1" ]; }

# El archivo de evidencia contiene el texto (sin distinguir mayúsculas).
evidencia_menciona() { grep -qiF -- "$2" "$EVIDENCIA/$1" 2>/dev/null; }

cierre() {
  local total=$((OSL_OK + OSL_FALTA))
  printf '\n%s de %s chequeos ok.\n' "$OSL_OK" "$total"
  if [ "$OSL_FALTA" -eq 0 ]; then
    printf 'Listo. Tu evidencia quedó en %s.\n' "$EVIDENCIA"
    return 0
  fi
  printf 'Todavía falta algo: seguí las pistas y volvé a correr lab-check.\n'
  return 1
}
