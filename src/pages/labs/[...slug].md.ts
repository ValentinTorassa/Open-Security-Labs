import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { labToMarkdown } from "../../lib/lab-markdown";
import { SITE_URL } from "../../data/site";

// Versión en markdown de cada lab: /labs/<ruta>/<slug>.md, al lado de la
// página /labs/<ruta>/<slug>/. Se genera en build desde el mismo .mdx.
export const getStaticPaths = (async () => {
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  return labs.map((lab) => ({
    params: { slug: lab.id },
    props: { lab, labs },
  }));
}) satisfies GetStaticPaths;

interface Props {
  lab: CollectionEntry<"labs">;
  labs: CollectionEntry<"labs">[];
}

export const GET: APIRoute<Props> = ({ props, site }) =>
  new Response(
    labToMarkdown(props.lab, props.labs, site ?? new URL(SITE_URL)),
    {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    },
  );
