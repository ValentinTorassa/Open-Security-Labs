# Entorno · Permisos en octal

Lab: [Permisos en octal: leer 644 sin pensar](https://securitylabs.valentorassa.com/labs/linux-real/permisos-en-octal/)

## Qué trae

- Debian 13 slim. Trabajás como `vt`, sin sudo.
- `~/archivos`: ocho archivos y carpetas con modos distintos (`644`, `600`,
  `755`, `700`, `640`, `444`, `750` y `664`).

## Cómo correrlo

```bash
podman build -t osl/permisos-en-octal -f entornos/linux-real/permisos-en-octal/Containerfile entornos
podman run --rm -it --name osl-permisos-en-octal --hostname labs osl/permisos-en-octal
```

## Qué revisa `lab-check`

- `~/evidencia/prediccion.txt` tiene al menos cinco líneas con el formato
  `644 notas.txt`.
- Cada predicción coincide con `stat -c '%a'` del archivo.
- `clave.env` sigue en `600`: el lab es de lectura.

## Límites

- `lab-check` no puede saber si predijiste antes o después de mirar `stat`.
  Eso queda de tu lado.
