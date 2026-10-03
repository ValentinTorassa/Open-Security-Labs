"""Reglas para separar clics de personas de clics automáticos.

Ninguna regla es perfecta. Por eso el reporte dice cuántos clics descartó y
por qué, en vez de esconderlos.

Cada clic es un dict con: timestamp (datetime), id, ip, user_agent, method.
"""
import re
from datetime import timedelta

# Previsualizadores de links y clientes automáticos con user-agent honesto.
BOTS = re.compile(
    r"bot|crawler|spider|preview|slack|discord|telegram|whatsapp|"
    r"facebookexternalhit|python-requests|curl/|wget/|go-http-client|headless",
    re.IGNORECASE,
)


def motivo_automatico(clic, todos):
    """El motivo si el clic parece automático, o None si parece de una persona."""
    if clic["method"] == "HEAD":
        return "HEAD"
    if BOTS.search(clic["user_agent"]):
        return "user-agent de bot"
    if es_rafaga(clic, todos):
        return "ráfaga"
    return None


def es_rafaga(clic, todos, ventana=timedelta(seconds=10), minimo=3):
    """Un gateway de correo abre los links de muchos destinatarios en segundos,
    desde la misma IP y con un user-agent que parece un navegador. Una persona
    abre el suyo.

    TODO (el lab): devolvé True si desde la misma IP que `clic` hubo clics a
    `minimo` o más ids distintos en los `ventana` segundos anteriores o
    posteriores a la hora de `clic`. Mientras devuelva False, el reporte cuenta
    al gateway como si fueran personas.
    """
    return False
