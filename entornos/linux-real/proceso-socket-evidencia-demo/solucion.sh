# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
fila() {
  ss -tanpH | grep "\"$1\"" | while read -r estado _ _ local remoto procs; do
    pid=$(grep -o 'pid=[0-9]*' <<<"$procs" | cut -d= -f2)
    echo "| $1 | $pid | $local | $remoto | $estado |"
  done
}
{
  echo "| proceso | PID | local | remoto | estado |"
  echo "| --- | --- | --- | --- | --- |"
  fila web-server
  fila database
  fila browser
  echo
  echo "Hipótesis 1: el browser es un cliente local del web-server."
  echo "Hipótesis 2: database espera clientes que todavía no llegaron."
  echo "Límite 1: un estado de socket no muestra el contenido del tráfico."
  echo "Límite 2: escuchar en 127.0.0.1 no prueba nada sobre otras máquinas."
} > ~/evidencia/tabla.md
