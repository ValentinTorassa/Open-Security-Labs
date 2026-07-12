import type { Certification } from "../certifications";

export const comptiaCysaPlus: Certification = {
  slug: "comptia-cysa-plus",
  name: "CompTIA CySA+ (Cybersecurity Analyst)",
  code: "CS0-003",
  vendor: "CompTIA",
  badge: "Cy+",
  badgeImage: "/certifications/comptia-cysa-plus.png",
  level: "Asociado",
  icon: "shield",
  accent: "#c80f2e",
  summary:
    "Certificación intermedia enfocada en defensa cibernética. Valida habilidades en análisis de logs, detección de intrusos y respuesta ante incidentes.",
  prepTips: [
    "Estudiá la lectura e interpretación de logs de red (Wireshark, tcpdump) y de sistemas (journalctl, syslog).",
    "Aprendé la sintaxis de expresiones regulares (RegEx) para buscar indicadores de compromiso (IoC) en logs.",
    "Dominá el ciclo de vida de respuesta ante incidentes del NIST: Preparación, Detección, Contención, Erradicación y Lecciones Aprendidas.",
  ],
  studyResources: [
    {
      name: "CySA+ CS0-003 Exam Objectives Guide",
      platform: "CompTIA",
      type: "guide",
      url: "https://www.comptia.jp/pdf/CompTIA%20CySA+%20CS0-003%20Exam%20Objectives.pdf",
      free: true,
      desc: "El temario y lista de acrónimos oficial de CompTIA para el examen de Analista de Seguridad.",
    },
    {
      name: "CySA+ Full Certification Prep playlist",
      platform: "YouTube / Certify Breakfast",
      type: "video",
      url: "https://www.youtube.com/playlist?list=PLMYSjEaGLw_vGxGsAIUgmkbEm52QR02tx",
      free: true,
      desc: "Curso completo gratuito de CySA+ que repasa los dominios teóricos y herramientas analíticas.",
    },
  ],
  domainLabs: [
    {
      domainName: "Gestión de vulnerabilidades",
      labIds: ["ciberseguridad/threat-modeling-app-chica"],
    },
    {
      domainName: "Monitoreo de seguridad",
      labIds: ["linux-real/systemd-y-journalctl"],
    },
    {
      domainName: "Respuesta a incidentes",
      labIds: ["cloud-produccion/cloudtrail-quien-hizo-que"],
    },
  ],
  meta: {
    questions: 85,
    durationMin: 165,
    passingScore: "750/900",
    cost: "USD 392",
    validityYears: 3,
    format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
  },
  outcomes: [
    "Analizar logs de sistemas, firewalls y aplicaciones para detectar anomalías.",
    "Identificar y evaluar vulnerabilidades técnicas en infraestructura.",
    "Ejecutar tareas de contención ante incidentes y análisis de IoCs.",
    "Configurar herramientas de monitoreo (SIEM, EDR, IDS/IPS).",
  ],
  domains: [
    { name: "Gestión de vulnerabilidades", weight: 22 },
    { name: "Monitoreo de seguridad", weight: 25 },
    { name: "Respuesta a incidentes", weight: 23 },
    { name: "Arquitectura de seguridad y herramientas", weight: 18 },
    { name: "Cumplimiento y gobernanza", weight: 12 },
  ],
  relatedPaths: ["ciberseguridad", "linux-real", "cloud-produccion"],
  exam: [
    {
      q: "Encontrás multiples accesos fallidos de SSH seguidos por una conexión exitosa desde una IP desconocida. ¿Qué ataque sospechás?",
      options: [
        "DDoS",
        "Fuerza bruta con contraseña adivinada",
        "SQL Injection",
      ],
      answer: 1,
      explain:
        "Múltiples accesos fallidos rápidos indican ataques de fuerza bruta o diccionario orientados a adivinar contraseñas.",
    },
    {
      q: "¿Cuál es el primer paso en el ciclo de vida de respuesta a incidentes de NIST?",
      options: [
        "Detección y análisis",
        "Preparación",
        "Contención, erradicación y recuperación",
      ],
      answer: 1,
      explain:
        "La preparación es el primer paso, donde se establecen políticas, herramientas y se entrena al equipo antes de que ocurra un incidente.",
    },
    {
      q: "Un analista busca archivos de configuración sospechosos usando la regla: '^.*\\.conf$'. ¿Qué herramienta y concepto está aplicando?",
      options: [
        "Nmap / Escaneo de puertos",
        "Grep / Expresiones Regulares",
        "Traceroute / Routing",
      ],
      answer: 1,
      explain:
        "Grep utiliza expresiones regulares (RegEx) para buscar patrones específicos en cadenas de texto o logs.",
    },
    {
      q: "¿Qué métrica del estándar CVSS evalúa el impacto en la confidencialidad, integridad y disponibilidad si se explota con éxito una vulnerabilidad?",
      options: [
        "Métrica de Exploitability",
        "Métrica de Impacto",
        "Métrica Temporal",
      ],
      answer: 1,
      explain:
        "Las métricas de impacto de CVSS analizan la degradación potencial sobre la tríada CIA (Confidencialidad, Integridad y Disponibilidad) resultante de un exploit.",
    },
    {
      q: "¿Qué herramienta recopila, correlaciona y analiza de manera centralizada logs de múltiples fuentes de infraestructura en tiempo real?",
      options: ["SIEM", "Nmap", "Wireshark"],
      answer: 0,
      explain:
        "Un SIEM (Security Information and Event Management) consolida datos de logs, detecta patrones maliciosos cruzando fuentes y genera alertas centralizadas.",
    },
    {
      q: "Verificás que un servidor comprometido sigue enviando balizas de conexión (beacons) periódicas a una IP externa. ¿Qué tipo de infraestructura está operando?",
      options: [
        "DNS Server legítimo",
        "Command & Control (C2) de un atacante",
        "Proxy reverso local",
      ],
      answer: 1,
      explain:
        "El 'beaconing' es el tráfico saliente periódico que envía un host infectado hacia el servidor C2 de un atacante para recibir instrucciones.",
    },
    {
      q: "¿Qué control técnico limita de forma inmediata el movimiento lateral de un atacante aislando redes comprometidas?",
      options: [
        "Políticas de privacidad",
        "Microsegmentación de red",
        "Monitoreo de logs",
      ],
      answer: 1,
      explain:
        "La microsegmentación divide la red en segmentos pequeños lógicos y bloquea tráficos no autorizados entre ellos, minimizando el radio de impacto (blast radius) de una brecha.",
    },
    {
      q: "¿Qué tipo de escaneo no intrusivo evalúa puertos abiertos e identifica servicios sin explotar activamente la vulnerabilidad?",
      options: [
        "Escaneo de vulnerabilidades",
        "Penetration Testing activo",
        "Fuzzing de API",
      ],
      answer: 0,
      explain:
        "El escaneo de vulnerabilidades busca fallos conocidos de manera pasiva y no destructiva, a diferencia de un pentest que intenta la explotación real.",
    },
    {
      q: "¿Qué estándar o catálogo documenta las tácticas, técnicas y procedimientos comunes de los atacantes (TTPs) para auditar defensas?",
      options: ["ISO 27001", "MITRE ATT&CK", "NIST CSF"],
      answer: 1,
      explain:
        "MITRE ATT&CK es una base de conocimientos global estructurada de comportamientos de adversarios en ataques reales en el mundo real.",
    },
    {
      q: "Si necesitás aislar un servidor vulnerado de la red sin apagarlo para no perder evidencia en memoria RAM, ¿qué acción de contención tomás?",
      options: [
        "Apagar el tomacorriente del servidor",
        "Aislar la máquina virtual a una VLAN muerta (Sandboxed VLAN)",
        "Formatear el disco duro",
      ],
      answer: 1,
      explain:
        "Mover el servidor a una VLAN aislada bloquea el tráfico sospechoso (contención) sin alterar los datos volátiles en memoria RAM que se perderían al apagarla.",
    },
  ],
};
