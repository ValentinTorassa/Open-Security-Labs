# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
APP="$HOME/app"

paso "Nada escribible por cualquiera en ~/app"
abiertos=$(find "$APP" -perm -o=w 2>/dev/null | sed "s#^$APP/##")
if [ -z "$abiertos" ]; then
  ok "find . -perm -o=w no encuentra nada"
else
  falta "todavía son escribibles por otros: $(echo $abiertos)" "chmod o-w <archivo>, o el modo mínimo que corresponda"
fi

paso "El permiso mínimo para cada cosa"
modo() { stat -c '%a' "$APP/$1" 2>/dev/null; }
chequear ".env es solo tuyo (600 o 400)" "un secreto: solo el dueño lee" sh -c "case $(modo .env) in 600|400) exit 0;; *) exit 1;; esac"
deploy=$(modo deploy.sh)
if [ -x "$APP/deploy.sh" ] && [ $((8#${deploy:-777} & 8#022)) -eq 0 ]; then
  ok "deploy.sh se puede ejecutar y solo vos lo podés escribir ($deploy)"
else
  falta "deploy.sh tiene que seguir siendo ejecutable y escribible solo por vos (hoy ${deploy:-?})" "755 o 700: si otro lo puede reescribir, el cron de root corre su código"
fi
chequear "config.json no es ejecutable" "es un archivo de datos: 644 o 640" sh -c "[ ! -x '$APP/config.json' ]"
for d in uploads logs; do
  chequear "$d/ sigue siendo una carpeta que podés usar" "una carpeta necesita x para entrar: 755, 750 o 700" test -x "$APP/$d" -a -w "$APP/$d"
done

paso "Justificación (~/evidencia/777.md)"
chequear "existe ~/evidencia/777.md" "una línea por archivo: permiso elegido y por qué" hay_evidencia 777.md
nombrados=0
for f in .env deploy.sh config.json uploads logs reporte.csv; do
  evidencia_menciona 777.md "$f" && nombrados=$((nombrados + 1))
done
if [ "$nombrados" -ge 6 ]; then
  ok "justificás los seis que estaban abiertos"
else
  falta "justificás $nombrados de los seis que estaban abiertos" "find te los listó al principio: .env, deploy.sh, config.json, uploads, logs y data/reporte.csv"
fi

cierre
