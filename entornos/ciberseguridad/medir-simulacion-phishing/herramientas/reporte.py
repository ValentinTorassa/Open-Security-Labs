"""Reporte agregado de una simulación de phishing medida con PhantomLog.

  python3 reporte.py <carpeta-de-datos> [--k 5]

La carpeta tiene logs.csv y links.csv de PhantomLog y un areas.csv
(user_id,area). El reporte no lista personas, a propósito: no tiene una opción
para hacerlo. Las áreas con menos de k personas no se muestran, porque un
porcentaje sobre tres personas señala a alguien.
"""
import argparse
import csv
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

from filtros import motivo_automatico


def leer_csv(ruta):
    with open(ruta, newline="") as f:
        return list(csv.DictReader(f))


def fecha(texto):
    return datetime.strptime(texto, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("datos", type=Path)
    parser.add_argument("--k", type=int, default=5, help="mínimo de personas por área")
    args = parser.parse_args()

    links = {r["unique_id"]: r["user_id"] for r in leer_csv(args.datos / "links.csv")}
    areas = {r["user_id"]: r["area"] for r in leer_csv(args.datos / "areas.csv")}
    clics = [
        {**r, "timestamp": fecha(r["timestamp"]), "method": r.get("method") or "GET"}
        for r in leer_csv(args.datos / "logs.csv")
    ]

    desconocidos = 0
    descartes = Counter()
    personas_con_clic = set()
    for clic in clics:
        persona = links.get(clic["id"])
        if persona is None:
            desconocidos += 1
            continue
        motivo = motivo_automatico(clic, clics)
        if motivo:
            descartes[motivo] += 1
        else:
            personas_con_clic.add(persona)

    total = len(links)
    por_area = defaultdict(lambda: [0, 0])
    for persona in links.values():
        area = areas.get(persona, "sin área")
        por_area[area][1] += 1
        if persona in personas_con_clic:
            por_area[area][0] += 1

    def pct(a, b):
        return f"{100 * a / b:.1f}%" if b else "n/d"

    print(f"Links enviados: {total}")
    print(f"Clics registrados: {len(clics)}")
    detalle = " · ".join(f"{m}: {n}" for m, n in sorted(descartes.items()))
    print(f"  descartados como automáticos: {sum(descartes.values())}" + (f" ({detalle})" if detalle else ""))
    print(f"  con id desconocido: {desconocidos}")
    print(f"Personas que hicieron clic: {len(personas_con_clic)} de {total} ({pct(len(personas_con_clic), total)})")
    print(f"Por área (solo grupos de {args.k} o más):")
    ocultas = 0
    for area, (con_clic, personas) in sorted(por_area.items()):
        if personas < args.k:
            ocultas += 1
            continue
        print(f"  {area:<12} {con_clic} de {personas} ({pct(con_clic, personas)})")
    if ocultas:
        print(f"  ({ocultas} área(s) con menos de {args.k} personas no se muestran)")
    print("Este reporte no lista personas: es agregado a propósito.")


if __name__ == "__main__":
    sys.exit(main())
