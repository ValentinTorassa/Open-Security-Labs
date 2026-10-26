# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
E=evidencia-persistencia.txt
REPO="$HOME/persistencia"

# El estado final del repo. Solo leen: nunca disparan core.fsmonitor ni tocan
# el trabajo del alumno (git config --get no refresca el índice).
sin_hook_sessionstart() { ! grep -rqs 'SessionStart' "$REPO/.claude" 2>/dev/null; }
sin_task_folderopen() { ! grep -rqs 'folderOpen' "$REPO/.vscode" 2>/dev/null; }
fsmonitor_vacio() {
  local v
  v=$(git -C "$REPO" config --local --get core.fsmonitor 2>/dev/null) || return 0
  [ -z "$v" ]
}

paso "Evidencia en ~/evidencia/$E"
chequear "existe ~/evidencia/$E" "guardá comandos y salidas: comando >> ~/evidencia/$E" hay_evidencia "$E"
chequear "encontraste el hook en .claude/settings.json" "un find/grep que liste los archivos plantados del repo" grep -qE '\.claude/settings\.json' "$EVIDENCIA/$E"
chequear "encontraste la task en .vscode/tasks.json" "el mismo find que lista settings.json lista tasks.json" grep -qE '\.vscode/tasks\.json' "$EVIDENCIA/$E"
chequear "encontraste core.fsmonitor en el git config" "git config --local --get core.fsmonitor lo muestra" grep -qE 'core\.fsmonitor|sh +\.ci/payload\.sh' "$EVIDENCIA/$E"
chequear "la marca muestra que core.fsmonitor corrió solo" "un git status normal dispara el payload: mirá .ci/PWNED-marker.txt" grep -qE 'payload corrio' "$EVIDENCIA/$E"
chequear "con core.fsmonitor=false git no ejecuta nada" "git -c core.fsmonitor=false status y mostrá que no dejó marca" grep -qE 'core\.fsmonitor=false' "$EVIDENCIA/$E"

paso "El reto"
chequear "un solo comando encuentra las dos tasks folderOpen" "sumá una segunda task folderOpen (cuarto punto) y contalas: grep -rc folderOpen .vscode da .vscode/tasks.json:2" grep -qF '.vscode/tasks.json:2' "$EVIDENCIA/$E"

paso "Estado final del repo"
chequear "sin hooks en .claude/settings.json" "sacá el hook SessionStart (o la carpeta .claude entera)" sin_hook_sessionstart
chequear "sin tasks folderOpen en .vscode/tasks.json" "sacá las tasks folderOpen (o la carpeta .vscode entera)" sin_task_folderopen
chequear "git config --get core.fsmonitor quedó vacío" "git config --local --unset core.fsmonitor" fsmonitor_vacio

cierre
