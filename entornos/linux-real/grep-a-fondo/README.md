# Entorno · grep a fondo

Lab: [grep a fondo: filtrar, contar, contexto y patrones](https://securitylabs.valentorassa.com/labs/linux-real/grep-a-fondo/)

## Qué trae

- Debian 13 slim. Trabajás como `vt`, sin sudo.
- `~/lab-grep`: los mismos logs de juguete del lab, ya armados.
  `logs/app.log` (10 líneas) y `logs/worker.log` (6 líneas) tienen DEBUG,
  INFO, WARN y ERROR; `notas.txt` dice ERROR pero no es un log, para
  practicar `--include`.

## Cómo correrlo

```bash
podman build -t osl/grep-a-fondo -f entornos/linux-real/grep-a-fondo/Containerfile entornos
podman run --rm -it --name osl-grep-a-fondo --hostname labs osl/grep-a-fondo
```

## Qué revisa `lab-check`

- `~/evidencia/evidencia-grep.txt` incluye un `grep -c`, un grep con contexto
  (`-B`, `-A` o `-C`) y un `grep -o`.
- El reto: la salida muestra cuántas líneas ERROR o WARN tiene cada `.log` y
  cuántas veces aparece el usuario que más se repite en esas líneas.

## Límites

- Los logs son siempre los mismos y son cortos a propósito: sirven para
  comprobar cada salida a ojo, no para practicar sobre volumen.
- `lab-check` busca los comandos escritos en la evidencia: si guardás solo
  las salidas, no puede saber qué opciones usaste.
