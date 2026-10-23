# Entorno · Editar archivos en la terminal sin romperlos

Lab: [Editar archivos](https://securitylabs.valentorassa.com/labs/linux-real/editar-archivos-sin-romperlos/)

## Qué trae

- Debian 13 slim con `nano`, `vi` (vim-tiny) y `diff`.
- El usuario `vt` (UID 1000), sin sudo, y `~/lab-editar/app.conf` con los
  cuatro renglones de juguete de la lección. El respaldo lo hacés vos.
- No necesita red, puertos publicados, volúmenes del host ni capabilities extra.

## Cómo correrlo

```bash
podman build -t osl/editar-archivos-sin-romperlos -f entornos/linux-real/editar-archivos-sin-romperlos/Containerfile entornos
podman run --rm -it --name osl-editar-archivos-sin-romperlos --hostname labs osl/editar-archivos-sin-romperlos
```

El contexto de build es `entornos/`. Docker también sirve cambiando el nombre
del comando. Seguí la lección: backup, nano, diff, restauración y reto con vi.

## Qué revisa `lab-check`

- `app.conf.bak` coincide con el archivo original de la imagen.
- En `app.conf` solo cambió la ruta del log a `/tmp/app2.log`, conserva dueño
  y permisos 644, y no quedaron las ediciones intermedias de nano o del puerto.
- `~/evidencia/editar.diff` coincide con el diff actual entre respaldo y archivo.
- `~/evidencia/writeup.md` nombra el cambio, el editor y la comprobación.

El resultado queda en `~/evidencia/lab-check.txt`. Exportá la carpeta antes de
salir: `npm run lab:check -- linux-real/editar-archivos-sin-romperlos`.

## Límites

El check solo lee tus archivos. No puede saber si usaste realmente el editor
declarado ni si hiciste el respaldo antes de editar: eso queda de tu lado.
No valida configuraciones reales ni enseña a modificar archivos del sistema.

## Verificar el entorno

```bash
npm run lab:check
npm run lab:env -- smoke linux-real/editar-archivos-sin-romperlos
```

El smoke exige que falle recién creado y pase con la solución de referencia.
