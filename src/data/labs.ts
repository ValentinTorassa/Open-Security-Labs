import type { CollectionEntry } from "astro:content";
import { paths } from "./paths";

// Orden canónico de labs: ruta → order → minutos → id.
// El desempate final por id hace el orden total y determinístico: sin él,
// los empates dependen del orden de enumeración del loader y el HTML
// generado cambia entre builds idénticos.
const pathOrder = new Map(paths.map((p) => [p.slug, p.order]));

export function sortLabs(
  labs: CollectionEntry<"labs">[],
): CollectionEntry<"labs">[] {
  return [...labs].sort(
    (a, b) =>
      (pathOrder.get(a.data.path) ?? 99) - (pathOrder.get(b.data.path) ?? 99) ||
      a.data.order - b.data.order ||
      a.data.estimatedMinutes - b.data.estimatedMinutes ||
      a.id.localeCompare(b.id),
  );
}

// Lugar de un lab dentro de su ruta, en el orden de sortLabs: posición,
// total y los labs vecinos. Alimenta la navegación anterior/siguiente.
export function routeNeighbors(
  labs: CollectionEntry<"labs">[],
  lab: CollectionEntry<"labs">,
) {
  const inRoute = sortLabs(labs.filter((l) => l.data.path === lab.data.path));
  const index = inRoute.findIndex((l) => l.id === lab.id);
  return {
    position: index + 1,
    total: inRoute.length,
    prev: index > 0 ? inRoute[index - 1] : undefined,
    next: index >= 0 ? inRoute[index + 1] : undefined,
  };
}

// Fecha de frontmatter como YYYY-MM-DD (published/updated vienen como Date).
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
