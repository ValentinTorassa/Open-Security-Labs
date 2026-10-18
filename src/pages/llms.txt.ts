import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { paths } from "../data/paths";
import { sortLabs } from "../data/labs";
import { labUrls } from "../lib/lab-markdown";
import {
  AUTHOR_JSONLD,
  BLOG_URL,
  PROJECT_SUMMARY,
  REPO_URL,
  SITE_URL,
} from "../data/site";

// /llms.txt (formato de llmstxt.org): índice del sitio para agentes. Una
// sección por ruta, cada lab con su versión en markdown y su descripción.
export const GET: APIRoute = async ({ site: astroSite }) => {
  const site = astroSite ?? new URL(SITE_URL);
  const url = (p: string) => new URL(p, site).href;
  const labs = sortLabs(await getCollection("labs", ({ data }) => !data.draft));

  const routes = [...paths]
    .sort((a, b) => a.order - b.order)
    .map((path) => {
      const items = labs
        .filter((lab) => lab.data.path === path.slug)
        .map(
          (lab) =>
            `- [${lab.data.title}](${labUrls(lab.id, site).markdown}): ${lab.data.description}`,
        );
      return [
        `## ${path.title}`,
        [
          `- [Ruta ${path.title}](${url(`/rutas/${path.slug}/`)}): ${path.description}`,
          ...items,
        ].join("\n"),
      ].join("\n\n");
    });

  const text = [
    "# Open Security Labs",
    `> ${PROJECT_SUMMARY}`,
    `Cada lab tiene una versión en markdown: la URL de la página con \`.md\` en lugar de la barra final. Todos los labs juntos, en orden: ${url("/llms-full.txt")}.`,
    ...routes,
    "## Sobre el autor",
    [
      `- [${AUTHOR_JSONLD.name}](${AUTHOR_JSONLD.url}): Creado por VT Security, el espacio de ${AUTHOR_JSONLD.name}.`,
      `- [VT Security](${BLOG_URL}): Notas largas sobre Linux, Git y seguridad, con las figuras y los comandos que uso de verdad.`,
    ].join("\n"),
    "## Licencia y contribuciones",
    [
      `- [Licencia Apache-2.0](${REPO_URL}/blob/main/LICENSE): Pensado para reuso educativo amplio: podés enseñar con este material, adaptarlo y compartirlo, manteniendo la atribución.`,
      `- [Repositorio en GitHub](${REPO_URL}): el código del sitio y el MDX de cada lab.`,
      `- [Contribuir](${url("/contribuir/")}): Cómo agregar un lab, corregir un error o proponer contenido a Open Security Labs.`,
    ].join("\n"),
    "## Optional",
    [
      `- [RSS](${url("/rss.xml")}): todos los labs, con su fecha de publicación.`,
      `- [Certificaciones](${url("/certificaciones/")}): Preparación y exámenes de práctica, con los labs que sirven para cada certificación.`,
      `- [Portafolio](${url("/portafolio/")}): Roadmap de proyectos para armar un portafolio técnico de ciberseguridad, backend, Linux, cloud y DevSecOps con evidencia real.`,
    ].join("\n"),
  ];

  return new Response(text.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
