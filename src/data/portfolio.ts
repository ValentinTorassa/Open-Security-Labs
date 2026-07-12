import type { IconName } from "./icons";
import type { PathSlug } from "./paths";

export interface PortfolioProject {
  slug: string;
  role: string;
  title: string;
  summary: string;
  why: string;
  /** Nivel estandarizado (mismo enum que los labs). */
  level: "beginner" | "intermediate" | "advanced";
  timebox: string;
  accent: string;
  icon: IconName;
  relatedPaths: PathSlug[];
  /** Labs concretos que preparan para este brief (ids de la colección labs, validados en build). */
  labIds: string[];
  /** Cómo contarlo en 30 segundos (entrevista, README, LinkedIn). */
  pitch: string;
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
    level: "intermediate",
    timebox: "1 semana",
    accent: "#ff7b72",
    icon: "target",
    relatedPaths: ["ciberseguridad", "backend-arquitectura"],
    labIds: [
      "ciberseguridad/threat-modeling-app-chica",
      "ciberseguridad/xss-local-defensivo",
      "backend-arquitectura/jwt-no-es-autorizacion",
    ],
    pitch:
      "Modelé amenazas de una app chica: qué puede fallar, cuánto importa y qué mitigación aplicaría primero. Diagrama, tabla priorizada y tradeoffs documentados.",
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
    level: "intermediate",
    timebox: "1-2 semanas",
    accent: "#bc8cff",
    icon: "lock",
    relatedPaths: ["backend-arquitectura", "ciberseguridad"],
    labIds: [
      "backend-arquitectura/api-http-base",
      "backend-arquitectura/idor-cambiar-un-id",
      "backend-arquitectura/jwt-no-es-autorizacion",
      "ciberseguridad/sql-injection-parametrizada",
    ],
    pitch:
      "Construí una API donde autorización, validación y errores están diseñados y testeados: los tests demuestran que un usuario no puede tocar recursos de otro.",
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
    level: "intermediate",
    timebox: "1 semana",
    accent: "#58a6ff",
    icon: "gauge",
    relatedPaths: ["cloud-produccion", "redes-internet"],
    labIds: [
      "cloud-produccion/aws-desde-cero",
      "cloud-produccion/iam-deny-gana",
      "cloud-produccion/vpc-security-groups",
      "cloud-produccion/cloudtrail-quien-hizo-que",
    ],
    pitch:
      "Diseñé una arquitectura AWS mínima con IAM de mínimo privilegio, logs que confirman cada acción importante y una estimación de costos con plan de cleanup.",
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
    level: "beginner",
    timebox: "2-4 tardes",
    accent: "#56d364",
    icon: "list-checks",
    relatedPaths: ["linux-real", "ciberseguridad"],
    labIds: [
      "linux-real/permisos-usuarios-procesos",
      "linux-real/systemd-y-journalctl",
      "ciberseguridad/por-que-chmod-777",
    ],
    pitch:
      "Hice hardening de un servidor Linux descartable y dejé un script de auditoría read-only que explica cada control, con evidencia before/after.",
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
    level: "intermediate",
    timebox: "1 semana",
    accent: "#e3b341",
    icon: "git-branch",
    relatedPaths: ["devsecops-agentes", "backend-arquitectura"],
    labIds: [
      "devsecops-agentes/github-actions-secrets-en-logs",
      "devsecops-agentes/secret-scanning-token-al-repo",
      "devsecops-agentes/sbom-basico",
    ],
    pitch:
      "Armé un pipeline de CI con permisos mínimos que bloquea secretos y errores comunes antes del merge, con un reporte de qué bloquea cada paso y por qué.",
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
    slug: "deteccion-logs-locales",
    role: "Blue team / detección",
    title: "Detección con logs locales (mini SOC)",
    summary:
      "Generá actividad sospechosa de juguete en un entorno descartable y escribí reglas de detección sobre logs reales del sistema, con casos de prueba.",
    why: "Detección es la mitad del trabajo defensivo que casi nadie muestra: probás que entendés qué rastros deja cada acción y cómo separar señal de ruido.",
    level: "intermediate",
    timebox: "1 semana",
    accent: "#f778ba",
    icon: "shield",
    relatedPaths: ["linux-real", "devsecops-agentes"],
    labIds: [
      "linux-real/systemd-y-journalctl",
      "cloud-produccion/cloudtrail-quien-hizo-que",
      "devsecops-agentes/github-actions-secrets-en-logs",
    ],
    pitch:
      "Escribí reglas de detección sobre logs del sistema con casos de prueba que disparan cada alerta, y documenté falsos positivos y puntos ciegos.",
    build: [
      "Levantá una VM o contenedor descartable y generá actividad normal más acciones sospechosas de juguete (sudo fallidos, procesos inesperados, descargas raras).",
      "Definí 4-6 reglas de detección sobre journalctl/auditd: patrón, por qué importa y qué falso positivo esperás.",
      "Automatizá las reglas en un script que lea logs y emita eventos con severidad y contexto.",
      "Escribí un caso de prueba reproducible por regla: el comando que dispara la alerta y la salida esperada.",
    ],
    evidence: [
      "Tabla de reglas: patrón, severidad, fuente del log y falsos positivos conocidos.",
      "Script de detección con salida de ejemplo.",
      "Transcripción de un caso de prueba disparando cada regla.",
      "Writeup honesto: qué NO detecta y cómo lo mejorarías.",
    ],
    deliverables: [
      "scripts/detect.sh o scripts/detect.py.",
      "docs/detection-rules.md.",
      "docs/test-cases.md con comandos reproducibles.",
    ],
    avoid: [
      "No corras malware real: simulá los comportamientos con acciones inofensivas.",
      "No uses logs de tu máquina personal ni de sistemas de terceros.",
      "No prometas cero falsos positivos: documentarlos vale más que ocultarlos.",
    ],
  },
  {
    slug: "agente-con-permisos",
    role: "Agentes / seguridad moderna",
    title: "Agente con permisos acotados y approval gate",
    summary:
      "Diseñá un workflow donde un agente puede leer, proponer cambios y pedir aprobación antes de acciones riesgosas.",
    why: "Cada vez más equipos usan agentes. El diferencial es mostrar que pensás en permisos, auditoría y límites operativos.",
    level: "advanced",
    timebox: "1-2 semanas",
    accent: "#39c5cf",
    icon: "alert-triangle",
    relatedPaths: ["devsecops-agentes", "ciberseguridad"],
    labIds: [
      "devsecops-agentes/agente-no-deberia-tocar-archivos-a-ciegas",
      "devsecops-agentes/docker-image-hardening",
    ],
    pitch:
      "Diseñé un agente con permisos acotados y approval gate: puede leer y proponer, pero toda acción riesgosa pasa por aprobación humana y queda auditada.",
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
