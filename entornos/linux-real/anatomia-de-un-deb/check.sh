# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh

paso "Un archivo ar (~/evidencia/ar.txt)"
chequear "existe ar.txt" "ar t ~/ragnaros_0.1.0-1_all.deb > ~/evidencia/ar.txt" hay_evidencia ar.txt
chequear "lista control.tar y data.tar" "un .deb tiene debian-binary, control.tar.* y data.tar.*" sh -c "grep -q '^control\.tar' '$EVIDENCIA/ar.txt' && grep -q '^data\.tar' '$EVIDENCIA/ar.txt'"

paso "La ficha (~/evidencia/control.txt)"
chequear "existe control.txt" "dpkg-deb -I ~/ragnaros_0.1.0-1_all.deb > ~/evidencia/control.txt" hay_evidencia control.txt
chequear "tiene Depends y los scripts del paquete" "dpkg-deb -I muestra el control y la lista de scripts (postinst, prerm, postrm)" sh -c "grep -q 'Depends:' '$EVIDENCIA/control.txt' && grep -q 'postinst' '$EVIDENCIA/control.txt'"

paso "udev y modprobe.d sin instalar (~/evidencia/udev.txt)"
chequear "existe udev.txt" "dpkg-deb --fsys-tarfile ... | tar -xO ./usr/lib/udev/rules.d/70-ragnaros.rules > ~/evidencia/udev.txt" hay_evidencia udev.txt
chequear "tiene la regla de udev del deck" "la línea con ATTR{idVendor}==\"0200\" y TAG+=\"uaccess\"" evidencia_menciona udev.txt 'ATTR{idVendor}=="0200"'
chequear "tiene la opción de usbhid" "sumale ./usr/lib/modprobe.d/ragnaros-usbhid.conf con >>" evidencia_menciona udev.txt "quirks=0x0200:0x3001"

paso "El postinst (~/evidencia/postinst.txt)"
chequear "existe postinst.txt" "dpkg-deb -e ~/ragnaros_0.1.0-1_all.deb control y copiá control/postinst" hay_evidencia postinst.txt
chequear "es el postinst del paquete" "el script que corre después de copiar los archivos" evidencia_menciona postinst.txt "update-initramfs"

paso "dpkg --verify (~/evidencia/verify.txt)"
chequear "existe verify.txt" "dpkg --verify ragnaros > ~/evidencia/verify.txt, con la regla modificada" hay_evidencia verify.txt
chequear "muestra la regla modificada (??5)" "cambiá MODE en /usr/lib/udev/rules.d/70-ragnaros.rules y corré dpkg --verify ragnaros" grep -qE '\?\?5.*70-ragnaros\.rules' "$EVIDENCIA/verify.txt"

paso "El paquete instalado y sano"
estado=$(dpkg-query -W -f='${Status}' ragnaros 2>/dev/null)
if [ "$estado" = "install ok installed" ]; then
  ok "ragnaros está instalado (install ok installed)"
else
  falta "ragnaros está instalado (dpkg dice: ${estado:-no instalado})" "sudo dpkg -i ~/ragnaros_0.1.0-1_all.deb"
fi
cambiados=$(dpkg --verify ragnaros 2>/dev/null | grep -v '^missing')
if [ "$estado" = "install ok installed" ] && [ -z "$cambiados" ]; then
  ok "ningún archivo instalado difiere del paquete"
else
  falta "ningún archivo instalado difiere del paquete" "reinstalá el .deb para devolver la regla a como vino, y corré dpkg --verify ragnaros"
fi

paso "Writeup (~/evidencia/writeup.md)"
palabras=$(wc -w < "$EVIDENCIA/writeup.md" 2>/dev/null || echo 0)
if [ "${palabras:-0}" -ge 20 ]; then
  ok "writeup.md tiene $palabras palabras"
else
  falta "writeup.md necesita al menos 20 palabras (tiene ${palabras:-0})" "tres líneas: qué mirarías antes de instalar un .deb que no viene de tu distro"
fi

cierre
