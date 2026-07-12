import { defineCollection } from "astro:content";
// El re-export de `z` desde astro:content quedó deprecado en Astro 7.
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { PATH_SLUGS } from "./data/paths";
import { DEFAULT_CONTRIBUTOR } from "./data/contributors";
import { icons, type IconName } from "./data/icons";

const ICON_NAMES = Object.keys(icons) as [IconName, ...IconName[]];

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
    // Flag opcional para verificar el reto automáticamente.
    flag: z.string().optional(),
    // IDs de otros labs sugeridos como continuación (ej: "redes-internet/una-request-no-es-magia").
    nextLabs: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    // Handle de GitHub de quien aportó el lab (ver src/data/contributors.ts).
    contributor: z.string().default(DEFAULT_CONTRIBUTOR),
    // Orden dentro de la ruta (menor primero). Para secuenciar labs quirúrgicos.
    order: z.number().int().default(100),
    // Fechas opcionales (YYYY-MM-DD): alimentan RSS pubDate y JSON-LD.
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/certifications" }),
  schema: z.object({
    // Debe coincidir con el nombre del archivo (validado en [slug].astro).
    slug: z.string().min(1),
    // Orden de aparición en los listados (menor primero).
    order: z.number().int().positive(),
    name: z.string().min(1),
    // Código del examen, ej: CLF-C02.
    code: z.string().min(1),
    vendor: z.string().min(1),
    // Iniciales para el badge, ej: AWS / C+.
    badge: z.string().min(1),
    // Arte oficial público del badge, si existe (ruta bajo public/).
    badgeImage: z.string().startsWith("/").optional(),
    level: z.string().min(1),
    icon: z.enum(ICON_NAMES),
    // Color de marca del vendor.
    accent: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/, "accent debe ser hex #rrggbb"),
    summary: z.string().min(1),
    // Consejos estratégicos para el examen.
    prepTips: z.array(z.string().min(1)).min(1),
    // Recursos recomendados con protagonismo.
    studyResources: z
      .array(
        z.object({
          name: z.string().min(1),
          platform: z.string().min(1),
          type: z.enum(["video", "doc", "course", "guide"]),
          url: z.string().url(),
          free: z.boolean(),
          desc: z.string().min(1),
        }),
      )
      .min(1),
    // Datos logísticos del examen real (aprox., verificá la guía oficial).
    meta: z.object({
      questions: z.number().int().positive(),
      durationMin: z.number().int().positive(),
      passingScore: z.string().min(1),
      cost: z.string().min(1),
      validityYears: z.number().int().positive(),
      format: z.string().min(1),
    }),
    // Lo que sabés hacer al certificarte.
    outcomes: z.array(z.string().min(1)).min(1),
    // Dominios del examen con su peso y labs sugeridos (ids de la colección labs).
    domains: z
      .array(
        z.object({
          name: z.string().min(1),
          weight: z.number().int().positive().max(100),
          labIds: z.array(z.string()).default([]),
        }),
      )
      .min(1)
      .refine((ds) => ds.reduce((acc, d) => acc + d.weight, 0) === 100, {
        message: "los pesos de domains deben sumar 100",
      }),
    // Rutas de Open Security Labs que preparan para esta certi.
    relatedPaths: z.array(z.enum(PATH_SLUGS)),
    // Examen de práctica (preguntas propias).
    exam: z
      .array(
        z
          .object({
            q: z.string().min(1),
            options: z.array(z.string().min(1)).min(2),
            // Índice (0-based) de la opción correcta.
            answer: z.number().int().nonnegative(),
            explain: z.string().optional(),
          })
          .refine((q) => q.answer < q.options.length, {
            message: "answer apunta fuera de options",
          }),
      )
      .min(1),
  }),
});

export const collections = { labs, certifications };
