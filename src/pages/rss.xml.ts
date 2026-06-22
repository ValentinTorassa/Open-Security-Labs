import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { getPath } from "../data/paths";

export async function GET(context: APIContext) {
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  const sorted = labs.sort((a, b) => a.data.order - b.data.order);

  return rss({
    title: "VT Security Labs",
    description:
      "Labs prácticos en español para entender Linux, redes, backend, cloud y ciberseguridad de verdad.",
    site: context.site ?? "https://securitylabs.valentorassa.com",
    items: sorted.map((lab) => ({
      title: lab.data.title,
      description: lab.data.description,
      link: `/labs/${lab.id}/`,
      categories: [
        getPath(lab.data.path)?.title ?? lab.data.path,
        ...lab.data.tags,
      ],
    })),
    customData: "<language>es-AR</language>",
  });
}
