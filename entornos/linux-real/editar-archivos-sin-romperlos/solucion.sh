# Solución de referencia para el smoke. Probá primero el lab sin leerla.
set -e
mkdir -p ~/evidencia
cd ~/lab-editar
cp -p app.conf app.conf.bak
vi -es app.conf <<'VIM'
%s@log=/tmp/app.log@log=/tmp/app2.log@
wq
VIM
# Con diferencias, diff sale 1; un error real (2) no es un resultado válido.
estado=0
diff app.conf.bak app.conf > ~/evidencia/editar.diff || estado=$?
test "$estado" -eq 1
cat > ~/evidencia/writeup.md <<'TEXTO'
Cambié log=/tmp/app.log por log=/tmp/app2.log con vi. Conservé el respaldo
original y comprobé con diff que puerto y modo no cambiaron.
TEXTO
