# AGENTS.md

Guía para agentes de IA y colaboradores humanos que trabajen en este repositorio.

## Contexto

**Open Security Labs** es un repositorio **público y educativo**. Todo lo que
entra acá puede ser leído, indexado y reutilizado por cualquiera. Tratá cada
commit como una publicación.

El objetivo del proyecto es enseñar a entender sistemas (Linux, redes, backend,
cloud, ciberseguridad) de forma práctica y honesta, en español rioplatense
(voseo), con tono directo y sin hype.

## Reglas de seguridad y privacidad (no negociables)

**Nunca** incluyas en el repo:

- Secretos reales: tokens, API keys, contraseñas, claves privadas SSH/TLS.
- IPs o hostnames privados, rangos internos, nombres de máquinas reales.
- Datos de empleadores, clientes o terceros.
- Account IDs, ARNs, nombres de buckets o recursos reales de cloud.
- Logs reales sin redactar.
- Instrucciones ofensivas accionables que habiliten daño contra sistemas de
  terceros (exploits listos para usar, bypasses sin mitigación, etc.).

En su lugar, usá siempre:

- **Ejemplos de juguete** y entornos locales/descartables (VM, contenedor).
- **Datos sintéticos** y muestras redactadas.
- **Credenciales falsas** y claramente ficticias (`AKIAEXAMPLE...`, `user_42`).

## Reglas de contenido

- Los labs deben ser **defensivos, educativos, reproducibles y seguros**.
- Si un tema toca lo ofensivo (privesc, reverse shells, abuso de identidad), se
  enmarca desde la **defensa**: cómo funciona, cómo se detecta, cómo se
  previene. Siempre en labs locales y controlados.
- **Cada lab termina con evidencia**: comandos, writeup, diagrama o screenshot.
  Si un lab no produce evidencia, está incompleto.
- Verificá que los comandos funcionen y no sean destructivos. Evitá `rm -rf`,
  `chmod 777`, `--privileged` y similares salvo como ejemplo de **qué no
  hacer**, claramente marcado.

## Estilo y voz

- Español de Argentina/LatAm, **voseo** natural (`tenés`, `hacés`, `podés`).
- Directo, práctico, técnico. Honesto sobre tradeoffs e incertidumbre.
- **Evitá**: hype de influencer, promesas de bootcamp, fearmongering,
  gatekeeping elitista, marketing corporativo, motivación vacía.
- Arrancá de un problema real, no del nombre de una herramienta. Convertí la
  "magia" en componentes, estado, protocolos, logs, permisos y modos de falla.

## Flujo técnico

- Stack: **Astro + TypeScript + TailwindCSS + MDX**. Sitio estático, sin
  backend, sin base de datos, sin login, sin analytics.
- Antes de proponer cambios: `npm run check` y `npm run build` deben pasar.
- Formateá con `npm run format` antes de commitear.
- No agregues dependencias pesadas ni estado innecesario. Mantené el código
  simple y legible.

## Checklist antes de un PR

- [ ] No hay secretos, datos privados ni reales.
- [ ] Los ejemplos son de juguete / sintéticos / ficticios.
- [ ] El lab es defensivo y reproducible en local.
- [ ] El lab termina con evidencia.
- [ ] Voz y voseo correctos, sin hype.
- [ ] `npm run check` y `npm run build` pasan.
