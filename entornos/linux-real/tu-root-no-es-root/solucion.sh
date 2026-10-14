# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/evidencia || exit 1

{
  grep Cap /proc/$$/status
  sudo grep CapEff /proc/self/status
  capsh --decode="$(sudo grep CapEff /proc/self/status | cut -f2)"
} > caps.txt

echo "nota de vt" > /tmp/nota-vt
chmod 600 /tmp/nota-vt
# La evidencia la escribe vt; sudo solo corre capsh.
# shellcheck disable=SC2024
sudo capsh --drop=cap_dac_override,cap_dac_read_search -- -c 'id -u; cat /tmp/nota-vt' > sin-dac-override.txt 2>&1

cp "$(readlink -f "$(command -v python3)")" ~/python-80
sudo setcap cap_net_bind_service=+ep ~/python-80
getcap ~/python-80 > python-80.txt
~/python-80 -m http.server 80 --bind 127.0.0.1 >/dev/null 2>&1 &
servidor=$!
sleep 1
grep CapEff /proc/$servidor/status >> python-80.txt
python3 -c 'import urllib.request; print(urllib.request.urlopen("http://127.0.0.1/").status)' >> python-80.txt
kill $servidor

{
  unshare -r grep CapEff /proc/self/status
  unshare -r cat /proc/self/uid_map
  unshare -r bash -c 'id; cat /etc/shadow; date -s 2030-01-01' 2>&1
} > userns.txt

cat > writeup.md <<'EOT'
Para el kernel, root es el UID 0 más un paquete de capabilities: sin cap_dac_override no lee un archivo 600 ajeno.
El root de un user namespace tiene las 41, pero solo sobre lo que ese namespace posee.
A un servicio que escucha en el 443 le doy cap_net_bind_service y nada más, con AmbientCapabilities o setcap.
EOT
