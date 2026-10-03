"""Genera los datos sintéticos de la campaña del lab (datos/).

Determinístico: siempre produce los mismos archivos. Ninguna persona, IP ni
organización es real: los ids son seudónimos y las IP salen de los rangos de
documentación (RFC 5737).

  python3 generar_datos.py ../datos
"""
import csv
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

ENVIO = datetime(2026, 10, 1, 10, 0, 0, tzinfo=timezone.utc)
AREAS = [("ventas", 15), ("soporte", 12), ("finanzas", 9), ("direccion", 4)]

CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
FIREFOX = "Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0"
ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36"
EDGE = CHROME + " Edg/129.0.0.0"


def persona(n):
    return f"persona-{n:02d}"


def link_id(n):
    return str(uuid.uuid5(uuid.NAMESPACE_URL, f"osl-simulacion-phishing/{persona(n)}"))


def main(destino):
    destino.mkdir(parents=True, exist_ok=True)
    personas, areas = [], []
    n = 1
    for area, cantidad in AREAS:
        for _ in range(cantidad):
            personas.append(n)
            areas.append((persona(n), area))
            n += 1

    clics = []

    def clic(segundos, n_persona, ip, ua, metodo="GET", id_crudo=None):
        momento = ENVIO + timedelta(seconds=segundos)
        clics.append([
            momento.strftime("%Y-%m-%dT%H:%M:%SZ"),
            id_crudo if id_crudo else link_id(n_persona),
            ip, ua, metodo,
        ])

    # Gateway de correo que "detona" los links antes de entregarlos: 22 ids en
    # ocho segundos, desde una IP, con user-agent de navegador.
    for i, p in enumerate(range(1, 23)):
        clic(4 + i * 0.35, p, "198.51.100.20", CHROME)
    # Otro escáner que solo pide HEAD.
    for p in range(23, 28):
        clic(3, p, "198.51.100.21", "Mozilla/5.0", "HEAD")
    # Previsualizaciones: alguien pegó su link en Slack para preguntar si era
    # phishing (bien hecho), otro lo mandó por Telegram, y seguridad lo probó
    # con curl.
    clic(20 * 60, 5, "203.0.113.40", "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)")
    clic(62 * 60, 31, "203.0.113.41", "TelegramBot (like TwitterBot)")
    clic(90, 12, "192.0.2.200", "curl/8.5.0")
    # Personas: nueve, una de ellas hace clic dos veces.
    humanos = [
        (14 * 60, 3, "192.0.2.10", CHROME),
        (15 * 60, 3, "192.0.2.10", CHROME),
        (42 * 60, 8, "192.0.2.11", IPHONE),
        (185 * 60, 11, "192.0.2.10", EDGE),
        (31 * 60, 16, "192.0.2.30", FIREFOX),
        (107 * 60, 19, "192.0.2.31", ANDROID),
        (320 * 60, 24, "192.0.2.30", CHROME),
        (9 * 60, 29, "192.0.2.50", EDGE),
        (404 * 60, 33, "192.0.2.51", IPHONE),
        (132 * 60, 38, "192.0.2.70", CHROME),
    ]
    for segundos, p, ip, ua in humanos:
        clic(segundos, p, ip, ua)
    # Visitas sin un id de la campaña.
    clic(250 * 60, 0, "192.0.2.99", FIREFOX, id_crudo="unknown")
    clic(251 * 60, 0, "192.0.2.99", FIREFOX, id_crudo="test")

    clics.sort(key=lambda fila: fila[0])
    with open(destino / "logs.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["timestamp", "id", "ip", "user_agent", "method"])
        w.writerows(clics)
    with open(destino / "links.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["unique_id", "user_id"])
        w.writerows((link_id(p), persona(p)) for p in personas)
    with open(destino / "areas.csv", "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["user_id", "area"])
        w.writerows(areas)


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "datos"))
