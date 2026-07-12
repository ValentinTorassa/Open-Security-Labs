import type { ImageMetadata } from "astro";

// Badges de certificaciones vía astro:assets: optimización (webp) y
// verificación de existencia en build. El campo badgeImage del JSON
// ("/certifications/<slug>.png") se resuelve contra src/assets.
const badges = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/certifications/*.png",
  { eager: true },
);

export function getCertBadge(badgeImage: string): ImageMetadata {
  const file = badgeImage.replace(/^\/certifications\//, "");
  const mod = badges[`../assets/certifications/${file}`];
  if (!mod) {
    throw new Error(
      `certifications: badge "${badgeImage}" no existe en src/assets/certifications/`,
    );
  }
  return mod.default;
}
