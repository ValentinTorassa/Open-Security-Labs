import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";
import { getPath } from "../../data/paths";

// Genera una imagen OG por lab en build (sin runtime). /og/<labId>.png
const labs = await getCollection("labs", ({ data }) => !data.draft);

const pages = Object.fromEntries(
  labs.map((lab) => [
    lab.id,
    {
      title: lab.data.title,
      description: lab.data.description,
      path: lab.data.path,
    },
  ]),
);

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const route = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) => {
    const accent = getPath(page.path)?.accent ?? "#56d364";
    return {
      title: page.title,
      description: page.description,
      logo: { path: "./public/vt-youtube.jpg", size: [72] },
      bgGradient: [
        [7, 9, 10],
        [15, 20, 23],
      ],
      border: { color: hexToRgb(accent), width: 8, side: "block-end" },
      padding: 70,
      font: {
        title: {
          color: [241, 245, 246],
          size: 64,
          weight: "Bold",
          families: ["JetBrains Mono"],
        },
        description: { color: [138, 154, 163], size: 32, families: ["Inter"] },
      },
      fonts: [
        "https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-700-normal.ttf",
        "https://api.fontsource.org/v1/fonts/inter/latin-400-normal.ttf",
      ],
    };
  },
});

export const getStaticPaths = route.getStaticPaths;
export const GET = route.GET;
