// Datos estructurados de las rutas de aprendizaje.
// Las páginas de rutas y las cards se generan a partir de acá.

import type { IconName } from "./icons";

export const PATH_SLUGS = [
  "linux-real",
  "redes-internet",
  "backend-arquitectura",
  "cloud-produccion",
  "ciberseguridad",
  "devsecops-agentes",
] as const;

export type PathSlug = (typeof PATH_SLUGS)[number];

export interface LearningPath {
  slug: PathSlug;
  order: number;
  /** Nombre corto para badges. */
  short: string;
  title: string;
  /** Una línea, en voseo, sin hype. */
  tagline: string;
  /** Frase de posicionamiento del temario. */
  positioning: string;
  description: string;
  /** Comando representativo que se muestra como acento de terminal. */
  command: string;
  /** Temas que cubre la ruta. */
  focus: string[];
  /** Color de acento (hex). Paleta sobria, no neón. */
  accent: string;
  /** Ícono temático de la ruta. */
  icon: IconName;
}

export const paths: LearningPath[] = [
  {
    slug: "linux-real",
    order: 1,
    short: "Linux",
    title: "Linux Real",
    tagline:
      "Linux no es la estética de una distro. Es cómo entendés sistemas.",
    positioning:
      "Linux no es la estética de una distro. Es cómo entendés servidores, debugging y seguridad desde abajo.",
    description:
      "Filesystem, usuarios, permisos, procesos, systemd, logs y red desde el sistema operativo. La base para todo lo demás.",
    command: "id && ps aux",
    focus: [
      "Filesystem y rutas",
      "Usuarios y grupos",
      "Permisos (rwx, octal)",
      "Procesos y señales",
      "Servicios y systemd",
      "Logs con journalctl",
      "Red desde el SO",
      "Workflow de shell",
      "Gestores de paquetes",
      "Hardening básico",
    ],
    accent: "#56d364",
    icon: "terminal",
  },
  {
    slug: "redes-internet",
    order: 2,
    short: "Redes",
    title: "Redes e Internet",
    tagline: "Una request no es magia.",
    positioning:
      "Una request no es magia. Todo bug de producción termina, tarde o temprano, tocando la red.",
    description:
      "TCP/IP, DNS, HTTP/HTTPS, TLS, puertos, routing, NAT, firewalls y proxies. Lo que pasa entre el navegador y el servidor.",
    command: "dig +short && curl -v",
    focus: [
      "TCP/IP",
      "DNS",
      "HTTP/HTTPS",
      "TLS",
      "Puertos",
      "Routing",
      "NAT",
      "Firewalls",
      "Proxies y VPNs",
      "Latencia, timeouts y retries",
    ],
    accent: "#39c5cf",
    icon: "network",
  },
  {
    slug: "backend-arquitectura",
    order: 3,
    short: "Backend",
    title: "Backend y Arquitectura",
    tagline: "No hay arquitectura gratis.",
    positioning:
      "La arquitectura es un conjunto de tradeoffs: no hay decisión gratis. Acá los ves de cerca.",
    description:
      "APIs, autenticación vs autorización, JWT, sesiones, IDOR, colas, observabilidad y modos de falla. Diseño con criterio.",
    command: "curl -H 'Authorization: ...'",
    focus: [
      "APIs",
      "Authn vs Authz",
      "JWT y sesiones",
      "IDOR",
      "Colas y mensajería",
      "Logs, métricas y traces",
      "Monolitos",
      "Microservicios",
      "Event-driven",
      "Arquitectura hexagonal",
      "Consistencia y fallos",
    ],
    accent: "#bc8cff",
    icon: "server",
  },
  {
    slug: "cloud-produccion",
    order: 4,
    short: "Cloud",
    title: "Cloud y Producción",
    tagline:
      "Cloud no es magia: es identidad, red, APIs, logs, costos y fallos.",
    positioning:
      "Cloud no es magia. Es identidad, redes, APIs, billing, logs y modos de falla, corriendo en la computadora de otro.",
    description:
      "AWS desde la base: IAM, S3, VPC, security groups, balanceadores, CloudTrail y CloudWatch. Más mentalidad de incidentes.",
    command: "aws sts get-caller-identity",
    focus: [
      "AWS básico",
      "IAM",
      "S3",
      "VPC",
      "Security groups",
      "Load balancers",
      "CloudTrail",
      "CloudWatch",
      "Deployments y secretos",
      "Mentalidad de incidentes",
      "Costo y blast radius",
    ],
    accent: "#58a6ff",
    icon: "cloud",
  },
  {
    slug: "ciberseguridad",
    order: 5,
    short: "Ciberseguridad",
    title: "Ciberseguridad Práctica",
    tagline: "Ciberseguridad es entender cómo fallan los sistemas.",
    positioning:
      "Ciberseguridad no es solo herramientas. Es entender cómo fallan los sistemas. No podés defender lo que no entendés.",
    description:
      "Seguridad web, OWASP API, threat modeling, hardening de Linux y conceptos ofensivos enmarcados de forma defensiva.",
    command: "ss -tulpn",
    focus: [
      "Seguridad web",
      "OWASP API",
      "Threat modeling",
      "Hardening de Linux",
      "Privesc en labs seguros",
      "Reverse shells (defensivo)",
      "Logs y detección",
      "Writeups de vulnerabilidades",
      "Divulgación responsable",
    ],
    accent: "#ff7b72",
    icon: "shield",
  },
  {
    slug: "devsecops-agentes",
    order: 6,
    short: "DevSecOps",
    title: "DevSecOps y Agentes",
    tagline:
      "Si tu agente tiene herramientas, también tiene superficie de ataque.",
    positioning:
      "Si tu agente tiene herramientas, también tiene superficie de ataque. Seguridad es permisos, no solo prompts.",
    description:
      "Seguridad en CI/CD, GitHub Actions, escaneo de secretos, Docker, SBOM y permisos de agentes de IA con auditoría.",
    command: "gitleaks detect",
    focus: [
      "Seguridad en CI/CD",
      "GitHub Actions",
      "Secret scanning",
      "Seguridad en Docker",
      "SBOM básico",
      "Permisos de agentes",
      "MCP y acceso a tools",
      "Audit logs",
      "Approval gates",
      "Backups seguros",
    ],
    accent: "#e3b341",
    icon: "bot",
  },
];

export function getPath(slug: string): LearningPath | undefined {
  return paths.find((p) => p.slug === slug);
}
