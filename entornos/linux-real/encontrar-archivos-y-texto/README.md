# Entorno · Encontrar archivos y texto

Lab: [Encontrar archivos y texto: Find y Grep](https://securitylabs.valentorassa.com/labs/linux-real/encontrar-archivos-y-texto/)

## Qué trae

- Debian 13 slim. Trabajás como `vt`, sin sudo.
- `~/servidor`: una copia de juguete de un servidor, con configuración y
  cientos de líneas de log repartidas en carpetas por día. Una sola línea
  explica por qué se cayó el worker la madrugada del 1/10, y no está escrita
  en mayúsculas.

## Cómo correrlo

```bash
podman build -t osl/encontrar-archivos-y-texto -f entornos/linux-real/encontrar-archivos-y-texto/Containerfile entornos
podman run --rm -it --name osl-encontrar-archivos-y-texto --hostname labs osl/encontrar-archivos-y-texto
```

## Qué revisa `lab-check`

- `~/evidencia/evidencia.txt` incluye al menos un `find` y un `grep`.
- Nombra el archivo culpable y la causa de la caída.
- Hay un archivo tuyo con la palabra `BUSCARME` y la evidencia muestra que lo
  buscaste.

## Límites

- El árbol es siempre el mismo: sirve para practicar, no para competir.
