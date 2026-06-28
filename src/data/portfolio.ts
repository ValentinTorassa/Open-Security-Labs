import type { IconName } from "./icons";
import type { PathSlug } from "./paths";

export interface PortfolioProject {
  slug: string;
  role: string;
  title: string;
  summary: string;
  why: string;
  difficulty: string;
  timebox: string;
  accent: string;
  icon: IconName;
  relatedPaths: PathSlug[];
  build: string[];
  evidence: string[];
  deliverables: string[];
  avoid: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "threat-model-app-chica",
    role: "Ciberseguridad",
    title: "Threat model de una app chica",
    summary:
      "Elegí una app simple y documentá activos, trust boundaries, amenazas, impacto y mitigaciones realistas.",
    why: "Muestra criterio defensivo. No es tirar herramientas: es entender qué puede fallar, cuánto importa y qué control baja el riesgo.",
    difficulty: "Inicial/intermedio",
    timebox: "1 semana",
    accent: "#ff7b72",
    icon: "target",
    relatedPaths: ["ciberseguridad", "backend-arquitectura"],
    build: [
      "Definí una app de juguete: usuarios, sesiones, panel admin, API y base de datos falsa.",
      "Dibujá un DFD simple con usuarios, backend, storage, servicios externos y trust boundaries.",
      "Aplicá STRIDE o una matriz propia: amenaza, escenario, impacto, probabilidad y mitigación.",
      "Elegí 3 riesgos y escribí cómo los detectarías en logs o métricas.",
    ],
    evidence: [
      "Diagrama del sistema y trust boundaries.",
      "Tabla de amenazas priorizada.",
      "Writeup con mitigaciones y tradeoffs.",
      "Checklist de logs que mirarías durante un incidente.",
    ],
    deliverables: [
      "README.md con contexto, alcance y supuestos.",
      "docs/threat-model.md con tabla de amenazas.",
      "docs/diagram.md o PNG/SVG del diagrama.",
    ],
    avoid: [
      "No uses datos reales ni nombres de empresas reales.",
      "No vendas esto como pentest profesional.",
      "No agregues exploits listos contra servicios públicos.",
    ],
  },
  {
    slug: "api-backend-segura",
    role: "Backend seguro",
    title: "API con permisos reales",
    summary:
      "Construí una API chica donde autenticación, autorización, validación y errores estén pensados desde el diseño.",
    why: "Para backend, seguridad se ve en decisiones concretas: endpoints, permisos, tests, logs y fallos bien contenidos.",
    difficulty: "Intermedio",
    timebox: "1-2 semanas",
    accent: "#bc8cff",
    icon: "lock",
    relatedPaths: ["backend-arquitectura", "ciberseguridad"],
    build: [
      "Creá una API de tareas, tickets o notas con roles user/admin y datos ficticios.",
      "Separá authn de authz: estar logueado no implica poder tocar cualquier recurso.",
      "Agregá tests que prueben IDOR, permisos cruzados, input inválido y errores esperados.",
      "Documentá decisiones: por qué esos roles, qué queda fuera de alcance y cómo se audita.",
    ],
    evidence: [
      "Repo ejecutable en local con datos seed falsos.",
      "Tests de permisos pasando.",
      "README con matriz de endpoints y roles.",
      "Ejemplos de logs sin secretos ni datos sensibles.",
    ],
    deliverables: [
      "src/ con API mínima y tests.",
      "docs/permissions-matrix.md.",
      "docs/failure-modes.md con errores esperados.",
    ],
    avoid: [
      "No guardes tokens reales en .env ni en screenshots.",
      "No uses permisos admin como solución rápida.",
      "No ocultes errores con catch genéricos sin observabilidad.",
    ],
  },
  {
    slug: "cloud-produccion-minima",
    role: "Cloud / producción",
    title: "Arquitectura cloud mínima con evidencia",
    summary:
      "Diseñá una arquitectura AWS pequeña con IAM mínimo, storage privado, logs, diagrama y costo estimado.",
    why: "Sirve para mostrar criterio de producción sin necesitar una infraestructura grande ni gastar plata de más.",
    difficulty: "Intermedio",
    timebox: "1 semana",
    accent: "#58a6ff",
    icon: "gauge",
    relatedPaths: ["cloud-produccion", "redes-internet"],
    build: [
      "Diseñá el sistema antes de desplegar: usuarios, permisos, red, storage, logs y blast radius.",
      "Escribí políticas IAM mínimas con recursos ficticios o ejemplos claramente redactados.",
      "Incluí CloudTrail/CloudWatch en el diseño y explicá qué evento confirma cada acción importante.",
      "Estimá costos y marcá qué apagarías primero si esto fuera un lab temporal.",
    ],
    evidence: [
      "Diagrama de arquitectura.",
      "Políticas IAM de ejemplo sin account IDs reales.",
      "Tabla de eventos/logs esperados.",
      "Cost estimate y cleanup plan.",
    ],
    deliverables: [
      "docs/architecture.md.",
      "docs/iam-policy-example.json con placeholders.",
      "docs/cost-and-cleanup.md.",
    ],
    avoid: [
      "No publiques ARNs, account IDs, buckets reales ni screenshots de consola con datos privados.",
      "No dejes recursos vivos sin cleanup.",
      "No uses credenciales root ni access keys hardcodeadas.",
    ],
  },
  {
    slug: "linux-hardening-auditoria",
    role: "Linux / infra",
    title: "Hardening y auditoría de un servidor Linux",
    summary:
      "Armá una VM local, revisá usuarios, permisos, servicios, firewall, logs y dejá un checklist reproducible.",
    why: "Es un proyecto simple pero potente: demuestra que entendés el sistema operativo y podés explicar cada control.",
    difficulty: "Inicial",
    timebox: "2-4 tardes",
    accent: "#56d364",
    icon: "list-checks",
    relatedPaths: ["linux-real", "ciberseguridad"],
    build: [
      "Levantá una VM o contenedor local descartable con usuarios y servicios de juguete.",
      "Inventariá procesos, puertos abiertos, permisos inseguros y logs relevantes.",
      "Aplicá hardening básico: usuarios, sudo, SSH local, firewall y permisos de archivos.",
      "Escribí un script de auditoría que no modifique nada y explique cada chequeo.",
    ],
    evidence: [
      "Checklist before/after.",
      "Salida redactada de comandos como ss, id, journalctl y systemctl.",
      "Script de auditoría read-only.",
      "Notas de tradeoffs: seguridad vs operación.",
    ],
    deliverables: [
      "audit.sh o scripts/audit.sh.",
      "docs/hardening-checklist.md.",
      "docs/evidence.md con salidas sintéticas o de lab local.",
    ],
    avoid: [
      "No ejecutes comandos destructivos como parte del script.",
      "No publiques logs reales de tu máquina principal.",
      "No recomiendes chmod 777 ni permisos amplios como arreglo.",
    ],
  },
  {
    slug: "pipeline-devsecops",
    role: "DevSecOps",
    title: "Pipeline que bloquea errores comunes",
    summary:
      "Configurá CI con permisos mínimos, secret scanning, checks de formato/tests y una explicación de qué bloquea cada paso.",
    why: "Muestra seguridad aplicada al flujo real de desarrollo: prevención, feedback temprano y límites de permisos.",
    difficulty: "Intermedio",
    timebox: "1 semana",
    accent: "#e3b341",
    icon: "git-branch",
    relatedPaths: ["devsecops-agentes", "backend-arquitectura"],
    build: [
      "Creá un repo de ejemplo con una app mínima o scripts de juguete.",
      "Agregá GitHub Actions con permisos explícitos y jobs separados por responsabilidad.",
      "Incluí secret scanning con secretos falsos de prueba y documentá el resultado esperado.",
      "Sumá un reporte simple: qué pasó, qué se bloqueó y qué falso positivo aceptarías.",
    ],
    evidence: [
      "Workflow YAML revisable.",
      "Captura o log de un check bloqueando un secreto falso.",
      "README explicando permisos del pipeline.",
      "Lista de limitaciones y próximos controles.",
    ],
    deliverables: [
      ".github/workflows/security.yml.",
      "docs/pipeline-controls.md.",
      "docs/test-secret-example.md con credenciales claramente falsas.",
    ],
    avoid: [
      "No subas secretos reales para probar el scanner.",
      "No le des permissions: write-all al workflow por comodidad.",
      "No ocultes qué controles son preventivos y cuáles son solo informativos.",
    ],
  },
  {
    slug: "agente-con-permisos",
    role: "Agentes / seguridad moderna",
    title: "Agente con permisos acotados y approval gate",
    summary:
      "Diseñá un workflow donde un agente puede leer, proponer cambios y pedir aprobación antes de acciones riesgosas.",
    why: "Cada vez más equipos usan agentes. El diferencial es mostrar que pensás en permisos, auditoría y límites operativos.",
    difficulty: "Intermedio/avanzado",
    timebox: "1-2 semanas",
    accent: "#39c5cf",
    icon: "alert-triangle",
    relatedPaths: ["devsecops-agentes", "ciberseguridad"],
    build: [
      "Definí un caso seguro: agente que revisa archivos de ejemplo y propone un patch.",
      "Separá acciones read-only, write, network y deploy aunque el prototipo sea simple.",
      "Agregá un approval gate antes de escribir archivos o ejecutar comandos sensibles.",
      "Guardá un log auditable: instrucción, acción propuesta, aprobación y resultado.",
    ],
    evidence: [
      "Modelo de permisos por acción.",
      "Demo con aprobación humana antes de una acción de riesgo.",
      "Log de auditoría sintético.",
      "README con amenazas y límites del agente.",
    ],
    deliverables: [
      "docs/agent-permissions.md.",
      "docs/approval-flow.md.",
      "examples/audit-log.json con datos ficticios.",
    ],
    avoid: [
      "No le des acceso libre al filesystem o a red sin justificarlo.",
      "No ejecutes comandos arbitrarios sugeridos por input externo.",
      "No presentes el agente como seguro sin explicar límites y supuestos.",
    ],
  },
];
