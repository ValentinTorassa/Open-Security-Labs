# Entorno · Medir una simulación de phishing

Lab: [Medir una simulación de phishing sin vigilar a nadie](https://securitylabs.valentorassa.com/labs/ciberseguridad/medir-simulacion-phishing/)

## Qué trae

- Python 3.13 slim con `curl`.
- **PhantomLog** en `/opt/phantomlog`, corriendo con gunicorn en el puerto 5000. Arranca con `TRUSTED_PROXIES=0`: no confía en `X-Forwarded-For`.
  Panel en <http://127.0.0.1:5000>, usuario `admin`, contraseña falsa
  `osl-lab-de-juguete` (solo existe en esta imagen).
- Un proxy reverso de juguete en `127.0.0.1:8081` que agrega
  `X-Forwarded-For`, como nginx o un balanceador.
- `phantomlog-ctl start|stop|restart [--proxies N]|estado` para reiniciar
  PhantomLog con otro `TRUSTED_PROXIES`.
- En `~/phishing`: los datos sintéticos de una campaña (`datos/`), el reporte
  agregado (`reporte.py`), las reglas de filtrado (`filtros.py`, con la regla
  de ráfagas para completar) y la plantilla de autorización (`plantillas/`).

## Cómo correrlo

```bash
podman build -t osl/medir-simulacion-phishing -f entornos/ciberseguridad/medir-simulacion-phishing/Containerfile entornos
podman run --rm -it --name osl-medir-simulacion-phishing --hostname labs -p 127.0.0.1:5000:5000 osl/medir-simulacion-phishing
```

El build corre los tests de PhantomLog: si fallan, no hay imagen.

## De dónde sale PhantomLog

`phantomlog/` es una copia de
[ValentinTorassa/PhantomLog](https://github.com/ValentinTorassa/PhantomLog)
en el commit `d93d22d`, del mismo autor, con estos cambios para el lab:

| Cambio                                                                     | Por qué                                                                                                               |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `TRUSTED_PROXIES` activa `ProxyFix` (por defecto, 0)                       | Para ver el problema de `remote_addr` detrás de un proxy y su arreglo, sin confiar en headers que cualquiera escribe. |
| El log guarda el método HTTP (columna `method`)                            | Muchos escáneres piden `HEAD`; sin el método no los podés separar.                                                    |
| Las fechas van en UTC e ISO 8601                                           | Para comparar contra la hora de envío sin adivinar la zona horaria del servidor.                                      |
| El panel usa ids seudónimos de ejemplo y copia el link desde un `data-url` | El ejemplo ya no sugiere nombres reales, y el link no se interpola dentro de JavaScript.                              |
| Tests nuevos para el método, la fecha y `ProxyFix`                         | Los cambios quedan cubiertos como el resto.                                                                           |

Adentro de este repo, la copia queda bajo la licencia Apache-2.0 del
proyecto.

`datos/` lo genera `herramientas/generar_datos.py` y es siempre igual: 40
personas seudónimas en cuatro áreas, un gateway que abre 22 links en ocho
segundos, un escáner que pide `HEAD`, tres previsualizaciones o pruebas con
User-Agent honesto, diez clics de nueve personas y dos visitas sin id de la
campaña. Las IP salen de los rangos de documentación (RFC 5737).

## Qué revisa `lab-check`

- `~/evidencia/autorizacion.md` existe y no le queda ningún `<completar>`.
- `python3 reporte.py datos` da 9 de 40 (22.5%): la regla de ráfagas de
  `filtros.py` funciona.
- `~/evidencia/reporte.txt` es ese reporte y no nombra personas ni ids.
- El log en vivo tiene un clic con la IP del proxy, uno con una IP de origen
  `127.0.0.x` y uno con un `X-Forwarded-For` falso `203.0.113.x`, y existe
  `~/evidencia/proxy.md`.
- `~/evidencia/writeup.md` tiene al menos 40 palabras.

## Límites

- Las reglas de filtrado son heurísticas y están calibradas para estos datos.
  En una campaña real hay que revisarlas contra el gateway y los chats que
  use la organización.
- Para poder publicar el panel en tu `127.0.0.1:5000`, PhantomLog escucha en
  todas las interfaces del contenedor. Por eso el `X-Forwarded-For` falso
  funciona directo contra el 5000: es justo el error del lab.
