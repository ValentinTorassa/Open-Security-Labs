# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
E=evidencia.txt

paso "Evidencia en ~/evidencia/$E"
chequear "existe ~/evidencia/$E" "guardá comandos y salidas: comando >> ~/evidencia/$E" hay_evidencia "$E"
chequear "incluye un comando find" "find ~/servidor -name \"*.log\" te lista los logs" grep -qE '(^|[^[:alnum:]])find ' "$EVIDENCIA/$E"
chequear "incluye un comando grep" "grep -r busca adentro de los archivos" grep -qE '(^|[^[:alnum:]])grep ' "$EVIDENCIA/$E"

paso "La caída del worker"
chequear "nombra el archivo culpable (worker-3.log del 2026-10-01)" "grep -rli 'error' ~/servidor/var/log/worker" grep -qE '2026-10-01/worker-3\.log' "$EVIDENCIA/$E"
chequear "anota la causa (certificado expirado)" "leé la línea completa que encontraste" evidencia_menciona "$E" "certificado expirado"

paso "El reto BUSCARME"
propio=$(grep -rlF --exclude-dir=evidencia BUSCARME "$HOME" 2>/dev/null | grep -v '^/home/vt/\.' | head -n 1)
if [ -n "$propio" ]; then
  ok "hay un archivo tuyo con BUSCARME (${propio#"$HOME"/})"
else
  falta "no encontré un archivo con la palabra BUSCARME en tu home" "mkdir -p ~/reto && echo BUSCARME > ~/reto/escondido.txt"
fi
chequear "la evidencia muestra que lo buscaste" "guardá el find y el grep del reto en ~/evidencia/$E" evidencia_menciona "$E" BUSCARME

cierre
