# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
D=diagnostico.txt

paso "Los servicios"
chequear "notas-api.service está active (running)" "systemctl status notas-api: mirá el código de salida y el path de ExecStart" systemctl is-active --quiet notas-api.service
chequear "reportes.service está active (running)" "journalctl -u reportes -b --no-pager dice qué le falta" systemctl is-active --quiet reportes.service
chequear "metricas.service sigue deshabilitado (no hacía falta tocarlo)" "este no estaba roto: estaba disabled" sh -c '! systemctl is-enabled --quiet metricas.service'
chequear "no quedó un roto.service del ejemplo" "si lo creaste: sudo systemctl stop roto.service, borrá /etc/systemd/system/roto.service y sudo systemctl daemon-reload" test ! -e /etc/systemd/system/roto.service

paso "Diagnóstico en ~/evidencia/$D"
chequear "existe ~/evidencia/$D" "systemctl status notas-api --no-pager >> ~/evidencia/$D" hay_evidencia "$D"
chequear "muestra el código de notas-api (203/EXEC)" "pegá el status de cuando fallaba" evidencia_menciona "$D" "203/EXEC"
chequear "incluye el journalctl que usaste (journalctl -u ...)" "anotá el comando, no solo la salida" evidencia_menciona "$D" "journalctl -u"
chequear "anota la causa de reportes (la clave puerto)" "leé el mensaje de reportes en el journal" evidencia_menciona "$D" "puerto"

cierre
