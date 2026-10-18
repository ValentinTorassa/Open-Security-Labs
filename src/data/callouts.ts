// Tipos de Callout y su etiqueta visible. La usan Callout.astro y la versión
// en markdown de cada lab, así las dos dicen lo mismo.
export type CalloutType =
  "concepto" | "comando" | "error" | "evidencia" | "reto" | "nota";

export const CALLOUT_LABELS = {
  concepto: "Concepto",
  comando: "Comando",
  error: "Error común",
  evidencia: "Evidencia",
  reto: "Reto",
  nota: "Nota",
} satisfies Record<CalloutType, string>;
