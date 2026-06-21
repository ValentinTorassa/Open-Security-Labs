import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { PATH_SLUGS } from "./data/paths";

const labs = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/labs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Ruta a la que pertenece el lab (debe coincidir con un slug de paths.ts).
    path: z.enum(PATH_SLUGS),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    estimatedMinutes: z.number().int().positive(),
    prerequisites: z.array(z.string()).default([]),
    objectives: z.array(z.string()).default([]),
    // Qué evidencia produce el lab (screenshots, writeups, diagramas, etc.).
    evidence: z.array(z.string()).default([]),
    // Comandos clave que se practican.
    commands: z.array(z.string()).default([]),
    // Enunciado del reto final.
    challenge: z.string().optional(),
    // IDs de otros labs sugeridos como continuación (ej: "redes-internet/una-request-no-es-magia").
    nextLabs: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    // Orden dentro de la ruta (menor primero). Para secuenciar labs quirúrgicos.
    order: z.number().int().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { labs };
