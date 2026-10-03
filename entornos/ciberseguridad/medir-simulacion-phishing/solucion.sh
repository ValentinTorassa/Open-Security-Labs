# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/phishing || exit 1

sed -e 's/Organización: <completar>/Organización: Ejemplo SA (ficticia)/' \
  -e 's/Quién autoriza (cargo): <completar>/Quién autoriza (cargo): dirección de seguridad, por escrito/' \
  -e 's/<completar>/definido en el plan de la campaña y firmado antes de empezar/' \
  plantillas/autorizacion.md > ~/evidencia/autorizacion.md

python3 - <<'PY'
import pathlib
p = pathlib.Path("filtros.py")
t = p.read_text()
t = t.replace('''    al gateway como si fueran personas.
    """
    return False''', '''    al gateway como si fueran personas.
    """
    vecinos = {
        otro["id"]
        for otro in todos
        if otro["ip"] == clic["ip"]
        and abs(otro["timestamp"] - clic["timestamp"]) <= ventana
    }
    return len(vecinos) >= minimo''')
p.write_text(t)
PY
python3 reporte.py datos > ~/evidencia/reporte.txt

curl -s -o /dev/null --interface 127.0.0.2 'http://127.0.0.1:8081/log?id=prueba-sin-proxyfix'
phantomlog-ctl restart --proxies 1 >/dev/null
curl -s -o /dev/null --interface 127.0.0.3 'http://127.0.0.1:8081/log?id=prueba-con-proxyfix'
curl -s -o /dev/null -H 'X-Forwarded-For: 203.0.113.66' 'http://127.0.0.1:5000/log?id=prueba-falsificada'
{
  echo "Sin ProxyFix, el clic que pasó por el proxy quedó con 127.0.0.1, la IP del proxy."
  echo "Con TRUSTED_PROXIES=1 quedó la IP de origen. Un X-Forwarded-For falso directo al 5000 también."
  tail -n 3 ~/phantomlog-datos/logs.csv
} > ~/evidencia/proxy.md

cat > ~/evidencia/writeup.md <<'EOT'
Para la tasa de clics no hace falta la IP: alcanza con saber qué id seudónimo hizo clic y si el
clic parece automático. La IP sirvió para detectar el gateway y para entender el problema del
proxy, pero se puede guardar truncada o descartarse al cerrar la campaña. Guardaría solo el
reporte agregado y borraría logs.csv y links.csv cuando termina el período acordado.
EOT
