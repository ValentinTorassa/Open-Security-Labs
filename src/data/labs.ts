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
