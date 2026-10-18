import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { sortLabs } from "../data/labs";
import { labToMarkdown } from "../lib/lab-markdown";
import { PROJECT_SUMMARY, SITE_URL } from "../data/site";

// /llms-full.txt: todos los labs en markdown, en el orden de las rutas. Es la
// concatenación de las versiones .md de cada lab, cada una con su URL.
export const GET: APIRoute = async ({ site: astroSite }) => {
  const site = astroSite ?? new URL(SITE_URL);
  const labs = await getCollection("labs", ({ data }) => !data.draft);

  const header = [
    "# Open Security Labs",
    `> ${PROJECT_SUMMARY}`,
    `${labs.length} labs, en el orden de cada ruta. Índice: ${new URL("/llms.txt", site).href}`,
  ].join("\n\n");
  const text = [
    header,
    ...sortLabs(labs).map((lab) => labToMarkdown(lab, labs, site).trim()),
  ].join("\n\n---\n\n");

  return new Response(text + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
