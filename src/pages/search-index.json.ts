import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { paths, getPath } from "../data/paths";
import { sortLabs } from "../data/labs";

// Índice de búsqueda global, armado en build como endpoint estático.
// El command palette lo baja con fetch() la primera vez que se abre, en vez
// de viajar inline dentro del HTML de todas las páginas.
type Item = {
  href: string;
  title: string;
  sub: string;
  kind: string;
  keywords: string;
};

export const GET: APIRoute = async () => {
  const labs = sortLabs(await getCollection("labs", ({ data }) => !data.draft));

  const labItems: Item[] = labs.map((lab) => {
    const p = getPath(lab.data.path);
    return {
      href: `/labs/${lab.id}`,
      title: lab.data.title,
      sub: p?.title ?? lab.data.path,
      kind: "Lab",
      keywords: [
        lab.data.title,
        p?.title ?? "",
        lab.data.tags.join(" "),
        lab.data.level,
      ]
        .join(" ")
        .toLowerCase(),
    };
  });

  const pathItems: Item[] = paths.map((p) => ({
    href: `/rutas/${p.slug}`,
    title: p.title,
    sub: "Ruta de aprendizaje",
    kind: "Ruta",
    keywords: `${p.title} ${p.short} ${p.focus.join(" ")}`.toLowerCase(),
  }));

  const pageItems: Item[] = [
    {
      href: "/labs",
      title: "Todos los labs",
      sub: "Catálogo completo",
      kind: "Página",
      keywords: "labs catalogo todos",
    },
    {
      href: "/certificaciones",
      title: "Certificaciones",
      sub: "Exámenes por ruta",
      kind: "Página",
      keywords: "certificaciones certis examenes",
    },
    {
      href: "/portafolio",
      title: "Portafolio",
      sub: "Proyectos con evidencia",
      kind: "Página",
      keywords:
        "portafolio portfolio proyectos evidencia backend ciberseguridad cloud devsecops",
    },
    {
      href: "/perfil",
      title: "Perfil",
      sub: "Tu progreso local",
      kind: "Página",
      keywords: "perfil progreso token export import",
    },
    {
      href: "/crear-lab",
      title: "Crear lab",
      sub: "Editor simple para proponer una PR",
      kind: "Página",
      keywords: "crear lab editor mdx contribuir github pull request pr",
    },
    {
      href: "/contribuir",
      title: "Contribuir",
      sub: "Sumar labs",
      kind: "Página",
      keywords: "contribuir aportar pr github",
    },
    {
      href: "/about",
      title: "Acerca",
      sub: "Qué es Open Security Labs",
      kind: "Página",
      keywords: "acerca about sobre",
    },
  ];

  return new Response(
    JSON.stringify([...pageItems, ...pathItems, ...labItems]),
    { headers: { "Content-Type": "application/json" } },
  );
};
