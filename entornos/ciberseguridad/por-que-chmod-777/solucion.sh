# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/app || exit 1
find . -perm -o=w
chmod 600 .env
chmod 755 deploy.sh
chmod 644 config.json data/reporte.csv
chmod 750 uploads logs
cat > ~/evidencia/777.md <<'EOT'
- .env: 600. Es un secreto: solo el dueño lo lee.
- deploy.sh: 755. Lo ejecuta un cron como root; si otro lo puede escribir, corre su código como root.
- config.json: 644. Es un dato, no un programa: nadie necesita ejecutarlo ni escribirlo salvo el dueño.
- uploads: 750. La app escribe acá; el resto del sistema no tiene por qué.
- logs: 750. Igual que uploads: si el servicio corre con otro usuario, cambiaría el dueño con chown.
- data/reporte.csv: 644. Lo escribe solo el dueño.
EOT
