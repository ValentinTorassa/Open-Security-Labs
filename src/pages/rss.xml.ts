import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { getPath } from "../data/paths";
import { sortLabs } from "../data/labs";
import { SITE_URL } from "../data/site";

export async function GET(context: APIContext) {
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  // Del más nuevo al más viejo por `published`. Los empates (labs del mismo
  // día) quedan en el orden de las rutas; un lab sin fecha va al final.
  const sorted = sortLabs(labs).sort(
    (a, b) =>
      (b.data.published?.getTime() ?? 0) - (a.data.published?.getTime() ?? 0),
  );

  return rss({
    title: "Open Security Labs",
    description:
      "Labs prácticos en español para entender Linux, redes, backend, cloud y ciberseguridad de verdad.",
    site: context.site ?? SITE_URL,
    items: sorted.map((lab) => ({
      title: lab.data.title,
      description: lab.data.description,
      link: `/labs/${lab.id}/`,
      pubDate: lab.data.published,
      categories: [
        getPath(lab.data.path)?.title ?? lab.data.path,
        ...lab.data.tags,
      ],
    })),
    customData: "<language>es-AR</language>",
  });
}
