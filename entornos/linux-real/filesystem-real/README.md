# Entorno · Filesystem real

Lab: [Filesystem real: /etc, /var/log y /proc sin memorizar](https://securitylabs.valentorassa.com/labs/linux-real/filesystem-real/)

## Qué trae

- Debian 13 slim con `less` y `procps`. Trabajás como `vt` (UID 1000), sin sudo.
- `notas-api`, un servicio de juguete con su binario en
  `/usr/local/bin/notas-api`, su config en `/etc/notas-api/config.ini` y su log
  en `/var/log/notas-api/app.log`. No escucha en la red: escribe un latido cada
  20 segundos para que tengas algo vivo que mirar en `/proc`.

## Cómo correrlo

Desde la raíz del repo:

```bash
podman build -t osl/filesystem-real -f entornos/linux-real/filesystem-real/Containerfile entornos
podman run --rm -it --name osl-filesystem-real --hostname labs osl/filesystem-real
```

O, con Node instalado, `npm run lab:env -- run linux-real/filesystem-real`.

## Qué revisa `lab-check`

- `~/evidencia/recorrido.md` existe y nombra al menos 8 rutas del sistema.
- Nombra el binario, la config y el log de `notas-api`, y su PID real.
- La config de `notas-api` sigue intacta: el lab es de solo lectura.

## Límites

- `/proc` muestra solo los procesos del contenedor, y `df -h` muestra el
  filesystem de la imagen, no tus discos. Para el mapa del lab alcanza; para
  mirar tu propio sistema, repetí los comandos afuera.
- `/proc/<PID>/exe` de `notas-api` apunta a `bash`, no al script: es un script
  y el ejecutable real es su intérprete. Vale la pena anotarlo.
