# Entorno · find a fondo

Lab: [find a fondo: tamaño, fecha, lógica y acciones](https://securitylabs.valentorassa.com/labs/linux-real/find-a-fondo/)

## Qué trae

- Debian 13 slim, con GNU find y coreutils. Trabajás como `vt`, sin sudo.
- `~/lab-find`: la misma carpeta de práctica del lab, ya armada. `logs/` con
  dos `.log`, `notas/` con `tareas.txt` y un `vacio.txt` de 0 bytes, `viejo/`
  con `grande.bin` (2 MB) y `respaldo.txt`, los dos con fecha de hace 30 días,
  y el enlace `enlace-tareas -> notas/tareas.txt`.
- Sirve también en macOS: el árbol usa `touch -d` y `head -c 2M`, que son de
  GNU, y acá ya corrieron.

## Cómo correrlo

```bash
podman build -t osl/find-a-fondo -f entornos/linux-real/find-a-fondo/Containerfile entornos
podman run --rm -it --name osl-find-a-fondo --hostname labs osl/find-a-fondo
```

## Qué revisa `lab-check`

- `~/evidencia/evidencia-find.txt` incluye un `find` por tamaño (`-size`), uno
  por fecha (`-mtime` o `-newer`) y uno por tipo (`-type`).
- El reto: un solo `find` con `-size` y `-mtime` que termina en
  `-exec ls -lh`, y su salida muestra `viejo/grande.bin` con 2.0M.

## Límites

- `~/lab-find` se arma al arrancar el contenedor, no al construir la imagen:
  las fechas son relativas a cuando lo abrís, y `-mtime -1` encuentra los
  archivos de `logs/` y `notas/` como dice la página. Si dejás un contenedor
  abierto más de un día, abrí uno nuevo.
- `lab-check` busca los comandos escritos en la evidencia: si guardás solo
  las salidas, no puede saber qué opciones usaste.
