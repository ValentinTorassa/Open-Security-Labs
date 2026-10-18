// Niveles de un lab y su etiqueta visible. La usan LabLevel.astro, el
// JSON-LD (educationalLevel) y la versión en markdown de cada lab.
export type Level = "beginner" | "intermediate" | "advanced";

export const LEVEL_LABELS = {
  beginner: "Inicial",
  intermediate: "Intermedio",
  advanced: "Avanzado",
} satisfies Record<Level, string>;
