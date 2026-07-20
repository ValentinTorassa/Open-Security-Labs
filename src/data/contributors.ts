// Contribuidores del proyecto. Fuente única para los avatares de los labs y la
// sección de agradecimientos en /contribuir.
//
// Sin backend: el avatar y el perfil se arman a partir del handle de GitHub.
// `commits` es aproximado (sale de `git shortlog -sn`); actualizalo cuando haya
// movimiento. Para sumar a alguien: agregá una entrada acá y, si hizo un lab,
// poné su handle en el frontmatter `contributor` de ese lab.

export interface Contributor {
  /** Handle de GitHub. Se usa para el avatar y el link al perfil. */
  github: string;
  /** Nombre para mostrar. */
  name: string;
  /** Rol o aporte principal. */
  role: string;
  /** Cantidad aproximada de commits. */
  commits: number;
}

/** Handle por defecto cuando un lab no declara `contributor`. */
export const DEFAULT_CONTRIBUTOR = "ValentinTorassa";

export const contributors: Contributor[] = [
  {
    github: "ValentinTorassa",
    name: "Valentín Torassa Colombero",
    role: "Creador y mantenedor",
    commits: 36,
  },
  {
    github: "solsolettidev",
    name: "Sol Soletti",
    role: "Autor de lab",
    commits: 1,
  },
  {
    github: "CorbalanLucas",
    name: "Lucas Corbalan",
    role: "Fixes de espaciado y UI",
    commits: 1,
  },
  {
    github: "Luciano-plaza",
    name: "Luciano Plaza",
    role: "Infra, SEO y performance",
    commits: 1,
  },
];

const byHandle = new Map(contributors.map((c) => [c.github.toLowerCase(), c]));

export function getContributor(github: string): Contributor | undefined {
  return byHandle.get(github.toLowerCase());
}

/** URL del avatar de GitHub (sin API, cacheado por GitHub). */
export function avatarUrl(github: string, size = 48): string {
  return `https://github.com/${github}.png?size=${size}`;
}

/** URL del perfil de GitHub. */
export function profileUrl(github: string): string {
  return `https://github.com/${github}`;
}
