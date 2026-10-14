# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~ || exit 1
deb=ragnaros_0.1.0-1_all.deb

ar t "$deb" > evidencia/ar.txt
dpkg-deb -I "$deb" > evidencia/control.txt
{
  dpkg-deb --fsys-tarfile "$deb" | tar -xO ./usr/lib/udev/rules.d/70-ragnaros.rules
  dpkg-deb --fsys-tarfile "$deb" | tar -xO ./usr/lib/modprobe.d/ragnaros-usbhid.conf
} > evidencia/udev.txt
dpkg-deb -e "$deb" control
cp control/postinst evidencia/postinst.txt

sudo dpkg -i "$deb" >/dev/null
sudo sed -i 's/MODE="0660"/MODE="0666"/' /usr/lib/udev/rules.d/70-ragnaros.rules
dpkg --verify ragnaros > evidencia/verify.txt
sudo dpkg -i "$deb" >/dev/null

cat > evidencia/writeup.md <<'EOT'
Antes de instalar un .deb ajeno leo su postinst y su preinst, porque corren como root sin preguntar.
Miro con dpkg -c qué rutas trae data.tar y con dpkg-deb -I sus dependencias.
Después de instalar, dpkg --verify me dice si alguien cambió un archivo del paquete.
EOT
