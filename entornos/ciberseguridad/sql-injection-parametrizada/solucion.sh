# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/sqli || exit 1
python3 - <<'PY'
import pathlib
p = pathlib.Path("buscar_seguro.py")
t = p.read_text()
t = t.replace(
    '''sql = "SELECT id, email, plan FROM users WHERE email = '" + email + "'"
for fila in db.execute(sql):''',
    '''sql = "SELECT id, email, plan FROM users WHERE email = ?"
for fila in db.execute(sql, (email,)):''',
)
p.write_text(t)
PY
{
  echo "source: argumento email (sys.argv[1])"
  echo "sink malo: string SQL concatenado en buscar_vulnerable.py"
  echo "impacto: el input cambia la lógica del WHERE y devuelve todos los usuarios"
  echo "mitigación: parámetro del driver (?) en buscar_seguro.py"
  echo
  echo "vulnerable con el input de juguete: $(python3 buscar_vulnerable.py "' OR '1'='1" | grep -c example.com) filas"
  echo "seguro con el input de juguete: $(python3 buscar_seguro.py "' OR '1'='1" | grep -c example.com) filas"
} > ~/evidencia/sqli.md
