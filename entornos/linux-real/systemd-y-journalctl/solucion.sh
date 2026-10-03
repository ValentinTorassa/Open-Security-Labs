# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
{
  systemctl status notas-api.service --no-pager
  echo '$ journalctl -u notas-api -b --no-pager'
  journalctl -u notas-api -b --no-pager | tail -n 5
  echo '$ journalctl -u reportes -b --no-pager'
  journalctl -u reportes -b --no-pager | tail -n 5
  echo "notas-api: 203/EXEC, ExecStart apunta a notas-api-v2, que no existe."
  echo "reportes: 1/FAILURE, a /etc/reportes.conf le falta la clave puerto."
} > ~/evidencia/diagnostico.txt 2>&1
sudo sed -i 's#/usr/local/bin/notas-api-v2#/usr/local/bin/notas-api#' /etc/systemd/system/notas-api.service
echo 'puerto=9100' | sudo tee -a /etc/reportes.conf >/dev/null
sudo systemctl daemon-reload
sudo systemctl restart notas-api.service reportes.service
sleep 2
