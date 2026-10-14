# shellcheck shell=bash
# Los mensajes muestran ~/python-80 tal como lo escribe el alumno.
# shellcheck disable=SC2088
source /usr/local/lib/osl/lab-check.sh

paso "Capabilities de tu shell y de root (~/evidencia/caps.txt)"
chequear "existe caps.txt" "grep Cap /proc/\$\$/status > ~/evidencia/caps.txt" hay_evidencia caps.txt
chequear "tiene las líneas Cap de /proc" "las cinco líneas empiezan con Cap: CapInh, CapPrm, CapEff, CapBnd y CapAmb" evidencia_menciona caps.txt "CapEff:"
chequear "tiene la máscara de root decodificada" "capsh --decode=<la CapEff de sudo> >> ~/evidencia/caps.txt" evidencia_menciona caps.txt "cap_dac_override"

paso "Root sin cap_dac_override (~/evidencia/sin-dac-override.txt)"
chequear "existe sin-dac-override.txt" "sudo capsh --drop=cap_dac_override,cap_dac_read_search -- -c 'id -u; cat /tmp/nota-vt' > ~/evidencia/sin-dac-override.txt 2>&1" hay_evidencia sin-dac-override.txt
chequear "root no pudo leer la nota (Permission denied)" "la nota tiene que ser de vt con 600; sin cap_dac_override root le aplica los bits de otros" evidencia_menciona sin-dac-override.txt "Permission denied"

paso "Una sola capability en un binario (~/python-80 y ~/evidencia/python-80.txt)"
caps_python=$(getcap "$HOME/python-80" 2>/dev/null)
if [ "${caps_python##* }" = "cap_net_bind_service=ep" ]; then
  ok "~/python-80 tiene cap_net_bind_service=ep y ninguna otra"
else
  falta "~/python-80 tiene cap_net_bind_service=ep y ninguna otra (getcap dice: ${caps_python:-nada})" "sudo setcap cap_net_bind_service=+ep ~/python-80"
fi
chequear "existe python-80.txt" "getcap ~/python-80 y la respuesta del servidor, en ~/evidencia/python-80.txt" hay_evidencia python-80.txt
chequear "registra el getcap" "getcap ~/python-80 >> ~/evidencia/python-80.txt" evidencia_menciona python-80.txt "cap_net_bind_service"
chequear "registra la respuesta 200 del puerto 80" "con el servidor corriendo, guardá lo que imprime urlopen(\"http://127.0.0.1/\").status" grep -qw 200 "$EVIDENCIA/python-80.txt"

paso "El root de un user namespace (~/evidencia/userns.txt)"
chequear "existe userns.txt" "unshare -r grep CapEff /proc/self/status, el uid_map y el intento con /etc/shadow, en ~/evidencia/userns.txt" hay_evidencia userns.txt
chequear "muestra el uid_map (0 adentro es 1000 afuera)" "unshare -r cat /proc/self/uid_map" grep -qE '^ *0 +1000 +1$' "$EVIDENCIA/userns.txt"
chequear "muestra lo que su root no pudo hacer (Permission denied)" "unshare -r cat /etc/shadow 2>&1" evidencia_menciona userns.txt "Permission denied"

paso "Writeup (~/evidencia/writeup.md)"
palabras=$(wc -w < "$EVIDENCIA/writeup.md" 2>/dev/null || echo 0)
if [ "${palabras:-0}" -ge 20 ]; then
  ok "writeup.md tiene $palabras palabras"
else
  falta "writeup.md necesita al menos 20 palabras (tiene ${palabras:-0})" "tres líneas: qué es root para el kernel y qué le darías a un servicio que escucha en el 443"
fi

cierre
