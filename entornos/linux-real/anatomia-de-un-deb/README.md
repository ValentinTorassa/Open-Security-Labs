# Entorno · Anatomía de un .deb

Lab: [Anatomía de un .deb](https://securitylabs.valentorassa.com/labs/linux-real/anatomia-de-un-deb/)

## Qué trae

- Debian 13 slim con `binutils` (para `ar`), `less` y las dependencias de
  Ragnaros (`python3`, `python3-pil`, `python3-yaml`, `libusb-1.0-0`,
  `fonts-dejavu-core`), así `dpkg -i` instala sin red. Trabajás como `vt`.
- `~/ragnaros_0.1.0-1_all.deb`, el paquete de la release
  [v0.1.0 de VT-Ragnaros](https://github.com/ValentinTorassa/VT-Ragnaros/releases/tag/v0.1.0).
  El `Containerfile` lo baja con `ADD --checksum=sha256:...`: si el archivo no
  coincide con ese hash, la imagen no se construye.
- `sudo` sin contraseña para `vt`. Es parte del lab: instalar un paquete corre
  sus scripts como root, y eso es lo que se mira. En el contenedor no hay udev
  ni `update-initramfs`, así que el `postinst` los saltea.

## Cómo correrlo

```bash
podman build -t osl/anatomia-de-un-deb -f entornos/linux-real/anatomia-de-un-deb/Containerfile entornos
podman run --rm -it --name osl-anatomia-de-un-deb --hostname labs osl/anatomia-de-un-deb
```

El build necesita red para bajar el paquete de GitHub. `ADD --checksum` lo
entienden las versiones actuales de Podman (probado con 5.4) y de Docker con
BuildKit.

## Qué revisa `lab-check`

- `~/evidencia/ar.txt` lista `control.tar` y `data.tar`.
- `~/evidencia/control.txt` tiene `Depends:` y los scripts del paquete.
- `~/evidencia/udev.txt` tiene la regla de udev del deck y la opción de
  `usbhid`.
- `~/evidencia/postinst.txt` es el `postinst` del paquete.
- `~/evidencia/verify.txt` muestra la regla modificada (`??5`).
- `ragnaros` está instalado y `dpkg --verify` no marca ningún archivo
  cambiado (las líneas `missing` de la documentación no cuentan: la imagen
  slim no la instala).
- `~/evidencia/writeup.md` tiene al menos 20 palabras.

## Límites

- No hay deck USB: el paquete se instala, pero `ragnarosd` no tiene con qué
  hablar. El lab es sobre el paquete, no sobre el driver.
