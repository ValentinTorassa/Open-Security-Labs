# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia ~/reto
echo "BUSCARME está acá" > ~/reto/escondido.txt
cd ~/servidor || exit 1
{
  echo '$ find . -name "*.log" | wc -l'
  find . -name "*.log" | wc -l
  echo '$ grep -rni "error" var/log/worker'
  grep -rni "error" var/log/worker
  echo "Culpable: var/log/worker/2026-10-01/worker-3.log. Causa: certificado expirado para db.lab.test."
  cd ~ || exit 1
  echo '$ find ~ -name "escondido.txt"'
  find ~ -name "escondido.txt"
  echo '$ grep "BUSCARME" ~/reto/escondido.txt'
  grep "BUSCARME" ~/reto/escondido.txt
} > ~/evidencia/evidencia.txt
