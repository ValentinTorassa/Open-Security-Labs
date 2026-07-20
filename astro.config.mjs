import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Mapa "backend-arquitectura/api-http-base" -> fecha más reciente entre
// `updated`/`published` de frontmatter, para alimentar <lastmod> del sitemap
// sin depender de astro:content (no disponible todavía en config).
const labDates = new Map();
for await (const file of glob("src/content/labs/**/*.mdx")) {
  const raw = readFileSync(file, "utf-8");
  const updated = raw.match(/^updated:\s*(\S+)/m)?.[1];
  const published = raw.match(/^published:\s*(\S+)/m)?.[1];
  const date = updated ?? published;
  if (!date) continue;
  const id = file
    .replace(/\\/g, "/")
    .replace(/^src\/content\/labs\//, "")
    .replace(/\.mdx$/, "");
  labDates.set(id, date);
}

// https://astro.build/config
export default defineConfig({
  site: "https://securitylabs.valentorassa.com",
  trailingSlash: "always",
  // prefetchAll: sin esto, prefetch solo actúa sobre links con data-astro-prefetch
  // (ninguno en el sitio).
  prefetch: { prefetchAll: true },
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const match = item.url.match(/\/labs\/([^/]+\/[^/]+)\/$/);
        const date = match && labDates.get(match[1]);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // Shiki resalta los bloques de código en Markdown/MDX en build.
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
      wrap: false,
    },
  },
});
