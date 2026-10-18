// Datos globales del sitio, una sola fuente de verdad.
export const REPO_URL = "https://github.com/ValentinTorassa/Open-Security-Labs";
export const SITE_URL = "https://securitylabs.valentorassa.com";
// Última revisión manual del contenido de certificaciones (mostrado en /certificaciones).
export const CERTS_LAST_REVIEW = "julio 2026";
// Sitio personal y blog de VT Security, enlazados desde el footer y los labs.
export const AUTHOR_URL = "https://valentorassa.com/";
export const BLOG_URL = "https://vtsecurity.com.ar/";
// Referencia compacta del autor para JSON-LD. El registro completo de la
// persona vive solo en valentorassa.com; acá se apunta a su @id, sin redeclararlo.
export const AUTHOR_JSONLD = {
  "@type": "Person",
  "@id": "https://valentorassa.com/#person",
  name: "Valentín Torassa Colombero",
  url: AUTHOR_URL,
};
export const LICENSE_URL = "https://www.apache.org/licenses/LICENSE-2.0";
// Descripción del proyecto (la misma de package.json), para llms.txt.
export const PROJECT_SUMMARY =
  "Open Security Labs: proyecto educativo open source creado por VT Security. Labs prácticos en español para entender Linux, redes, backend, cloud y ciberseguridad de verdad.";
