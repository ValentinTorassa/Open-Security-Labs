# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
cd "$HOME/sqli" || exit 1
TRAMPA="' OR '1'='1"

paso "buscar_seguro.py"
normal=$(python3 buscar_seguro.py ana@example.com 2>&1 | grep -c "example.com")
trampa=$(python3 buscar_seguro.py "$TRAMPA" 2>&1 | grep -c "example.com")
if [ "$normal" -eq 1 ]; then
  ok "con ana@example.com devuelve un usuario"
else
  falta "con ana@example.com devuelve $normal filas; se espera 1" "el email normal tiene que seguir funcionando"
fi
if [ "$trampa" -eq 0 ]; then
  ok "con el input de juguete no devuelve nada"
else
  falta "con el input de juguete devuelve $trampa filas" "el input tiene que viajar como dato: execute(sql, (email,)) con ? en el SQL"
fi
parametrizado() {
  # La línea del SELECT tiene el ? y no arma el string con +, f-strings ni %.
  grep -E 'SELECT.*\?' buscar_seguro.py >/dev/null &&
    ! grep -E 'SELECT' buscar_seguro.py | grep -qE '\+|\{email\}|%'
}
chequear "el SQL usa un parámetro (?) y no arma el string con el email" "sacá el + email + del string SQL" parametrizado

paso "El script vulnerable sigue mostrando el bug"
todos=$(python3 buscar_vulnerable.py "$TRAMPA" 2>&1 | grep -c "example.com")
chequear "buscar_vulnerable.py devuelve todos con el input de juguete" "no lo arregles: es la referencia de lo que no hay que hacer" test "$todos" -eq 5

paso "Writeup (~/evidencia/sqli.md)"
chequear "existe ~/evidencia/sqli.md" "tabla source → sink → impacto → mitigación" hay_evidencia sqli.md
for palabra in source sink mitigación; do
  chequear "nombra el $palabra" "seguí la tabla del lab" evidencia_menciona sqli.md "$palabra"
done

cierre
