// Sistema de insignias. Se ganan con el progreso guardado en el navegador
// (labs hechos, rutas completas, exámenes pasados). Sin backend: la evaluación
// la hace el cliente en /perfil leyendo localStorage vía scripts/progress.
//
// Cada insignia declara una `rule` que el cliente sabe evaluar contra un
// resumen de progreso. Agregá una entrada y aparece sola en el perfil.

import type { IconName } from "./icons";
import { paths, type PathSlug } from "./paths";

export type BadgeTier = "bronce" | "plata" | "oro" | "platino";

export type BadgeRule =
  | { kind: "labs"; n: number }
  | { kind: "rutas"; n: number }
  | { kind: "exams"; n: number }
  | { kind: "route"; route: PathSlug }
  | { kind: "allLabs" };

export interface Badge {
  id: string;
  name: string;
  /** Qué representa: se muestra siempre, ganada o no. */
  description: string;
  /** Pista de cómo ganarla: se muestra cuando está bloqueada. */
  hint: string;
  icon: IconName;
  tier: BadgeTier;
  rule: BadgeRule;
  /** Override del color del tier (las de ruta usan el acento de la ruta). */
  accent?: string;
}

/** Color base de cada tier (paleta sobria, alineada con los acentos). */
export const TIER_COLOR: Record<BadgeTier, string> = {
  bronce: "#cd7f32",
  plata: "#aeb9c2",
  oro: "#e3b341",
  platino: "#39c5cf",
};

export const TIER_LABEL: Record<BadgeTier, string> = {
  bronce: "Bronce",
  plata: "Plata",
  oro: "Oro",
  platino: "Platino",
};

// Insignias por hito general.
const milestones: Badge[] = [
  {
    id: "first-lab",
    name: "Primer paso",
    description: "Completaste tu primer lab. Todo empieza por uno.",
    hint: "Completá 1 lab.",
    icon: "zap",
    tier: "bronce",
    rule: { kind: "labs", n: 1 },
  },
  {
    id: "labs-5",
    name: "En racha",
    description: "Cinco labs hechos. Ya es un hábito.",
    hint: "Completá 5 labs.",
    icon: "flame",
    tier: "bronce",
    rule: { kind: "labs", n: 5 },
  },
  {
    id: "labs-10",
    name: "Veterano",
    description: "Diez labs. Te movés con soltura por el catálogo.",
    hint: "Completá 10 labs.",
    icon: "rocket",
    tier: "plata",
    rule: { kind: "labs", n: 10 },
  },
  {
    id: "all-labs",
    name: "Catálogo 100%",
    description: "Hiciste todos los labs. No quedó nada sin tocar.",
    hint: "Completá todos los labs.",
    icon: "trophy",
    tier: "platino",
    rule: { kind: "allLabs" },
  },
  {
    id: "first-route",
    name: "Primera ruta",
    description: "Terminaste una ruta entera de punta a punta.",
    hint: "Completá todos los labs de una ruta.",
    icon: "target",
    tier: "plata",
    rule: { kind: "rutas", n: 1 },
  },
  {
    id: "routes-3",
    name: "Polímata",
    description: "Tres rutas completas. Cruzás dominios sin despeinarte.",
    hint: "Completá 3 rutas.",
    icon: "star",
    tier: "oro",
    rule: { kind: "rutas", n: 3 },
  },
  {
    id: "first-exam",
    name: "Aprobado",
    description: "Pasaste tu primer examen de práctica.",
    hint: "Aprobá 1 examen.",
    icon: "list-checks",
    tier: "plata",
    rule: { kind: "exams", n: 1 },
  },
  {
    id: "exams-3",
    name: "Examinado",
    description: "Tres exámenes pasados. Te estás preparando en serio.",
    hint: "Aprobá 3 exámenes.",
    icon: "medal",
    tier: "oro",
    rule: { kind: "exams", n: 3 },
  },
  {
    id: "exams-6",
    name: "Certi-ready",
    description: "Pasaste seis exámenes. Listo para rendir de verdad.",
    hint: "Aprobá 6 exámenes.",
    icon: "award",
    tier: "platino",
    rule: { kind: "exams", n: 6 },
  },
];

// Una insignia de maestría por ruta, con el ícono y el acento de la ruta.
const routeBadges: Badge[] = [...paths]
  .sort((a, b) => a.order - b.order)
  .map((p) => ({
    id: `route-${p.slug}`,
    name: `${p.short} dominado`,
    description: `Completaste toda la ruta ${p.title}.`,
    hint: `Completá todos los labs de ${p.title}.`,
    icon: p.icon,
    tier: "oro" as BadgeTier,
    rule: { kind: "route" as const, route: p.slug },
    accent: p.accent,
  }));

export const badges: Badge[] = [...milestones, ...routeBadges];

export function badgeColor(b: Badge): string {
  return b.accent ?? TIER_COLOR[b.tier];
}
