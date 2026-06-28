// Certificaciones para preparar, con dominios reales y un examen de práctica.
// Escalable: agregá una entrada y aparece sola en /certificaciones.
//
// Nota: Open Security Labs no está afiliado a AWS ni a CompTIA. Los nombres y
// marcas son propiedad de sus dueños. Estas son preguntas de práctica propias,
// no preguntas reales del examen.

import type { IconName } from "./icons";
import type { PathSlug } from "./paths";
import type { ExamQuestion } from "./questions";

export interface Certification {
  slug: string;
  name: string;
  /** Código del examen, ej: CLF-C02. */
  code: string;
  vendor: string;
  /** Iniciales para el badge, ej: AWS / C+. */
  badge: string;
  /** Arte oficial público del badge, si existe. */
  badgeImage?: string;
  level: string;
  icon: IconName;
  /** Color de marca del vendor. */
  accent: string;
  summary: string;
  /** Datos logísticos del examen real (aprox., verificá la guía oficial). */
  meta: {
    /** Cantidad de preguntas del examen real. */
    questions: number;
    /** Duración en minutos. */
    durationMin: number;
    /** Puntaje para aprobar (ej: "700/1000"). */
    passingScore: string;
    /** Costo aproximado en USD. */
    cost: string;
    /** Validez de la certificación en años. */
    validityYears: number;
    /** Formato de las preguntas. */
    format: string;
  };
  /** Lo que sabés hacer al certificarte. */
  outcomes: string[];
  /** Dominios del examen con su peso. */
  domains: { name: string; weight: number }[];
  /** Rutas de Open Security Labs que preparan para esta certi. */
  relatedPaths: PathSlug[];
  /** Examen de práctica (preguntas propias). */
  exam: ExamQuestion[];
}

export const certifications: Certification[] = [
  {
    slug: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    vendor: "Amazon Web Services",
    badge: "AWS",
    badgeImage: "/certifications/aws-cloud-practitioner.png",
    level: "Fundamental",
    icon: "cloud",
    accent: "#ff9900",
    summary:
      "La puerta de entrada a AWS: conceptos de nube, seguridad, servicios principales y facturación. Ideal como primer certificado de cloud.",
    meta: {
      questions: 65,
      durationMin: 90,
      passingScore: "700/1000",
      cost: "USD 100",
      validityYears: 3,
      format: "Opción múltiple y respuesta múltiple",
    },
    outcomes: [
      "Explicar el modelo de responsabilidad compartida",
      "Identificar los servicios core de AWS y cuándo usarlos",
      "Entender precios, facturación y planes de soporte",
      "Reconocer buenas prácticas de seguridad en la nube",
    ],
    domains: [
      { name: "Conceptos de la nube", weight: 24 },
      { name: "Seguridad y cumplimiento", weight: 30 },
      { name: "Tecnología y servicios de la nube", weight: 34 },
      { name: "Facturación, precios y soporte", weight: 12 },
    ],
    relatedPaths: ["cloud-produccion", "redes-internet"],
    exam: [
      {
        q: "Según el modelo de responsabilidad compartida, ¿quién parchea el sistema operativo de una instancia EC2?",
        options: [
          "AWS, siempre",
          "El cliente",
          "Nadie: las instancias se actualizan solas",
        ],
        answer: 1,
        explain:
          "AWS es responsable de la seguridad DE la nube (hardware, hipervisor). El cliente es responsable de la seguridad EN la nube: el SO invitado, los parches y la configuración de EC2.",
      },
      {
        q: "¿Qué servicio registra las llamadas a la API de tu cuenta para auditoría e investigación?",
        options: ["Amazon CloudWatch", "AWS CloudTrail", "AWS Config"],
        answer: 1,
        explain:
          "CloudTrail registra quién hizo qué llamada a la API, cuándo y desde dónde. CloudWatch es métricas y logs operativos; Config evalúa el estado de los recursos.",
      },
      {
        q: "Querés que un usuario solo pueda leer un bucket S3 y nada más. ¿Qué principio aplicás?",
        options: [
          "Mínimo privilegio, con una política de IAM acotada",
          "Le das permisos de administrador por las dudas",
          "Compartís las credenciales root",
        ],
        answer: 0,
        explain:
          "Mínimo privilegio: dar solo los permisos necesarios. Nunca se usa el usuario root para tareas diarias ni se reparten permisos de admin 'por las dudas'.",
      },
      {
        q: "¿Qué concepto de AWS te da alta disponibilidad al desplegar en ubicaciones aisladas dentro de una región?",
        options: [
          "Edge Locations",
          "Availability Zones (zonas de disponibilidad)",
          "IAM Roles",
        ],
        answer: 1,
        explain:
          "Una región tiene varias Availability Zones físicamente separadas. Distribuir en varias AZ tolera la caída de una sin perder el servicio.",
      },
      {
        q: "¿Qué herramienta te permite estimar el costo de una arquitectura ANTES de desplegarla?",
        options: ["AWS Cost Explorer", "AWS Pricing Calculator", "AWS Budgets"],
        answer: 1,
        explain:
          "Pricing Calculator estima costos por adelantado. Cost Explorer analiza el gasto ya ocurrido y Budgets alerta cuando te pasás de un umbral.",
      },
      {
        q: "El modelo de precios 'pay-as-you-go' de la nube significa que…",
        options: [
          "Pagás una licencia anual fija",
          "Pagás solo por lo que consumís, sin compromiso a largo plazo obligatorio",
          "Es gratis hasta cierto límite y después se corta",
        ],
        answer: 1,
        explain:
          "Pay-as-you-go: pagás por uso real. Esto convierte gasto de capital (CapEx) en gasto operativo (OpEx) y permite escalar sin comprar hardware por adelantado.",
      },
    ],
  },
  {
    slug: "comptia-security-plus",
    name: "CompTIA Security+",
    code: "SY0-701",
    vendor: "CompTIA",
    badge: "S+",
    badgeImage: "/certifications/comptia-security-plus.png",
    level: "Asociado",
    icon: "shield",
    accent: "#c80f2e",
    summary:
      "El certificado base de ciberseguridad más pedido en avisos de trabajo. Cubre amenazas, arquitectura segura, operaciones y gestión de riesgo.",
    meta: {
      questions: 90,
      durationMin: 90,
      passingScore: "750/900",
      cost: "USD 404",
      validityYears: 3,
      format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
    },
    outcomes: [
      "Evaluar la postura de seguridad de una organización",
      "Identificar amenazas, ataques y vulnerabilidades comunes",
      "Aplicar controles y arquitecturas seguras",
      "Operar con criterio de gestión de riesgo y cumplimiento",
    ],
    domains: [
      { name: "Conceptos generales de seguridad", weight: 12 },
      { name: "Amenazas, vulnerabilidades y mitigaciones", weight: 22 },
      { name: "Arquitectura de seguridad", weight: 18 },
      { name: "Operaciones de seguridad", weight: 28 },
      { name: "Gestión y supervisión del programa", weight: 20 },
    ],
    relatedPaths: ["ciberseguridad", "redes-internet", "devsecops-agentes"],
    exam: [
      {
        q: "Verificás un archivo con su hash SHA-256 y coincide. ¿Qué propiedad de la tríada CIA estás comprobando?",
        options: ["Confidencialidad", "Integridad", "Disponibilidad"],
        answer: 1,
        explain:
          "Un hash que coincide prueba que el contenido no fue alterado: eso es integridad. Confidencialidad sería cifrado; disponibilidad, que el recurso esté accesible.",
      },
      {
        q: "Un correo de phishing muy dirigido apunta específicamente a un CEO. ¿Cómo se llama?",
        options: ["Spear phishing genérico", "Whaling", "Smishing"],
        answer: 1,
        explain:
          "Whaling es phishing dirigido a 'peces gordos' (ejecutivos). Smishing es por SMS. El spear phishing es dirigido pero no necesariamente a alta dirección.",
      },
      {
        q: "Te piden contraseña + código de una app autenticadora. ¿Qué dos factores se combinan?",
        options: [
          "Dos veces 'algo que sabés'",
          "'Algo que sabés' + 'algo que tenés'",
          "'Algo que sos' + 'algo que sabés'",
        ],
        answer: 1,
        explain:
          "La contraseña es algo que sabés; el código de la app (en tu teléfono) es algo que tenés. MFA real combina factores de categorías DISTINTAS.",
      },
      {
        q: "¿Cuál es la diferencia entre un IDS y un IPS?",
        options: [
          "El IDS detecta y alerta; el IPS además puede bloquear",
          "Son lo mismo con distinto nombre",
          "El IDS bloquea; el IPS solo registra",
        ],
        answer: 0,
        explain:
          "IDS (Detection) detecta y avisa. IPS (Prevention) está en línea y puede frenar el tráfico malicioso activamente.",
      },
      {
        q: "Una app guarda contraseñas para poder mostrárselas al usuario. ¿Por qué está mal?",
        options: [
          "Debería cifrarlas reversiblemente",
          "Debería guardar un hash con salt, no algo recuperable",
          "Está bien si la base de datos es privada",
        ],
        answer: 1,
        explain:
          "Las contraseñas se guardan como hash con salt (bcrypt, Argon2), no de forma recuperable. Si podés mostrarlas, un atacante que robe la base también puede.",
      },
      {
        q: "Aplicás 'defense in depth'. ¿Qué significa?",
        options: [
          "Un único control muy fuerte en el perímetro",
          "Múltiples capas de controles, para que el fallo de una no comprometa todo",
          "Cifrar todo dos veces",
        ],
        answer: 1,
        explain:
          "Defensa en profundidad: varias capas independientes (red, host, app, identidad). Si una falla, las otras siguen conteniendo el ataque.",
      },
    ],
  },
  {
    slug: "comptia-network-plus",
    name: "CompTIA Network+",
    code: "N10-009",
    vendor: "CompTIA",
    badge: "N+",
    badgeImage: "/certifications/comptia-network-plus.png",
    level: "Asociado",
    icon: "network",
    accent: "#c80f2e",
    summary:
      "Fundamentos de redes que sostienen todo lo demás: modelo OSI, TCP/IP, routing, servicios de red y troubleshooting.",
    meta: {
      questions: 90,
      durationMin: 90,
      passingScore: "720/900",
      cost: "USD 369",
      validityYears: 3,
      format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
    },
    outcomes: [
      "Leer y aplicar el modelo OSI y TCP/IP",
      "Configurar direccionamiento, subredes y routing básico",
      "Operar servicios de red (DNS, DHCP, NAT)",
      "Diagnosticar problemas de red por capas",
    ],
    domains: [
      { name: "Conceptos de redes", weight: 23 },
      { name: "Implementación de redes", weight: 20 },
      { name: "Operaciones de red", weight: 19 },
      { name: "Seguridad de red", weight: 14 },
      { name: "Troubleshooting de red", weight: 24 },
    ],
    relatedPaths: ["redes-internet", "linux-real"],
    exam: [
      {
        q: "¿En qué capa del modelo OSI opera el direccionamiento IP y el routing?",
        options: ["Capa 2 (enlace)", "Capa 3 (red)", "Capa 4 (transporte)"],
        answer: 1,
        explain:
          "IP y routing viven en la capa 3 (red). La capa 2 maneja MAC dentro de un segmento; la capa 4, puertos y TCP/UDP.",
      },
      {
        q: "¿Qué puerto usa HTTPS por defecto?",
        options: ["80", "443", "22"],
        answer: 1,
        explain:
          "HTTPS usa 443; HTTP usa 80; SSH usa 22. Conocer los puertos comunes acelera el diagnóstico.",
      },
      {
        q: "Una red /24 (255.255.255.0), ¿cuántas direcciones utilizables para hosts tiene?",
        options: ["256", "254", "512"],
        answer: 1,
        explain:
          "/24 da 256 direcciones, pero una es la de red y otra la de broadcast, así que quedan 254 utilizables para hosts.",
      },
      {
        q: "¿Qué servicio asigna automáticamente direcciones IP a los dispositivos de una red?",
        options: ["DNS", "DHCP", "NAT"],
        answer: 1,
        explain:
          "DHCP reparte IPs automáticamente. DNS traduce nombres a IPs; NAT traduce direcciones privadas a públicas.",
      },
      {
        q: "Hay conectividad por IP pero los nombres no resuelven. ¿Dónde mirás primero?",
        options: [
          "El cableado físico",
          "La configuración de DNS",
          "La fuente de alimentación del switch",
        ],
        answer: 1,
        explain:
          "Si ping por IP funciona pero por nombre no, el problema está en la resolución: DNS. Es un clásico de troubleshooting por capas.",
      },
      {
        q: "¿Qué permite NAT en un router doméstico?",
        options: [
          "Que muchos dispositivos con IP privada compartan una IP pública",
          "Cifrar el tráfico de salida",
          "Asignar nombres de dominio",
        ],
        answer: 0,
        explain:
          "NAT (Network Address Translation) deja que varios hosts con IP privada salgan a internet por una sola IP pública.",
      },
    ],
  },
  {
    slug: "comptia-linux-plus",
    name: "CompTIA Linux+",
    code: "XK0-005",
    vendor: "CompTIA",
    badge: "L+",
    badgeImage: "/certifications/comptia-linux-plus.png",
    level: "Asociado",
    icon: "terminal",
    accent: "#c80f2e",
    summary:
      "Administración de Linux del mundo real: gestión del sistema, permisos y seguridad, scripting, contenedores y troubleshooting.",
    meta: {
      questions: 90,
      durationMin: 90,
      passingScore: "720/900",
      cost: "USD 369",
      validityYears: 3,
      format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
    },
    outcomes: [
      "Administrar usuarios, permisos y procesos en Linux",
      "Asegurar y endurecer un sistema",
      "Automatizar con scripting y contenedores",
      "Diagnosticar fallos del sistema y servicios",
    ],
    domains: [
      { name: "Gestión del sistema", weight: 32 },
      { name: "Seguridad", weight: 21 },
      { name: "Scripting, contenedores y automatización", weight: 19 },
      { name: "Troubleshooting", weight: 28 },
    ],
    relatedPaths: ["linux-real", "ciberseguridad"],
    exam: [
      {
        q: "Un archivo tiene permisos -rw-r-----. ¿Cuál es su representación octal?",
        options: ["640", "644", "660"],
        answer: 0,
        explain:
          "rw- = 6, r-- = 4, --- = 0 → 640. El dueño lee/escribe, el grupo solo lee, otros no acceden.",
      },
      {
        q: "¿Qué comando muestra los sockets en escucha y el proceso dueño de cada puerto?",
        options: ["ls -l", "ss -tulpn", "df -h"],
        answer: 1,
        explain:
          "ss -tulpn lista puertos TCP/UDP en escucha con su proceso. ls lista archivos; df muestra uso de disco.",
      },
      {
        q: "¿Qué permiso necesita SÍ o SÍ una clave privada SSH para que ssh la acepte?",
        options: ["644", "600", "777"],
        answer: 1,
        explain:
          "600 (solo el dueño lee/escribe). Con permisos más abiertos, SSH se niega a usar la clave por seguridad.",
      },
      {
        q: "¿Qué herramienta consultás para ver los logs de un servicio gestionado por systemd?",
        options: ["journalctl", "crontab", "top"],
        answer: 0,
        explain:
          "journalctl lee el journal de systemd (ej: journalctl -u nginx). crontab edita tareas programadas; top muestra procesos en vivo.",
      },
      {
        q: "Querés ver qué proceso consume más CPU en tiempo real. ¿Qué usás?",
        options: ["top (o htop)", "cat", "chmod"],
        answer: 0,
        explain:
          "top/htop muestran procesos ordenados por consumo en vivo. cat imprime archivos; chmod cambia permisos.",
      },
      {
        q: "¿Qué hace 'chmod 755 script.sh'?",
        options: [
          "Dueño rwx; grupo y otros r-x (leen y ejecutan)",
          "Todos pueden escribir",
          "Solo el dueño puede leerlo",
        ],
        answer: 0,
        explain:
          "755 = rwxr-xr-x. El dueño tiene control total; grupo y otros pueden leer y ejecutar, pero no modificar. Típico de ejecutables.",
      },
    ],
  },
  {
    slug: "aws-solutions-architect-associate",
    name: "AWS Solutions Architect – Associate",
    code: "SAA-C03",
    vendor: "Amazon Web Services",
    badge: "AWS",
    badgeImage: "/certifications/aws-solutions-architect-associate.png",
    level: "Asociado",
    icon: "server",
    accent: "#ff9900",
    summary:
      "Diseñar arquitecturas seguras, resilientes, performantes y costo-eficientes en AWS. El paso siguiente después del Cloud Practitioner.",
    meta: {
      questions: 65,
      durationMin: 130,
      passingScore: "720/1000",
      cost: "USD 150",
      validityYears: 3,
      format: "Opción múltiple y respuesta múltiple",
    },
    outcomes: [
      "Diseñar arquitecturas seguras y resilientes en AWS",
      "Elegir servicios de cómputo, storage y red con criterio",
      "Optimizar rendimiento y costos",
      "Aplicar alta disponibilidad y tolerancia a fallos",
    ],
    domains: [
      { name: "Diseño de arquitecturas seguras", weight: 30 },
      { name: "Diseño de arquitecturas resilientes", weight: 26 },
      { name: "Diseño de arquitecturas de alto rendimiento", weight: 24 },
      { name: "Diseño de arquitecturas costo-optimizadas", weight: 20 },
    ],
    relatedPaths: ["cloud-produccion", "backend-arquitectura"],
    exam: [
      {
        q: "Necesitás almacenamiento de objetos durable y escalable para archivos estáticos. ¿Qué servicio elegís?",
        options: ["Amazon EBS", "Amazon S3", "Amazon RDS"],
        answer: 1,
        explain:
          "S3 es almacenamiento de objetos (11 9's de durabilidad). EBS son discos para EC2; RDS es base de datos relacional.",
      },
      {
        q: "Querés desacoplar un productor de un consumidor para tolerar picos de carga. ¿Qué usás?",
        options: [
          "Una cola Amazon SQS entre ambos",
          "Llamadas síncronas directas",
          "Un único servidor más grande",
        ],
        answer: 0,
        explain:
          "Una cola (SQS) desacopla: el productor encola y el consumidor procesa a su ritmo. Absorbe picos y tolera fallos transitorios.",
      },
      {
        q: "En una VPC, ¿qué diferencia a un Security Group de una Network ACL?",
        options: [
          "El Security Group es stateful; la NACL es stateless",
          "Son idénticos",
          "La NACL es stateful; el Security Group es stateless",
        ],
        answer: 0,
        explain:
          "Los Security Groups son stateful (la respuesta a una conexión permitida se permite automáticamente). Las NACL son stateless: hay que permitir ida y vuelta por separado.",
      },
      {
        q: "Tu sitio tiene usuarios globales y querés reducir latencia sirviendo contenido cacheado cerca de ellos. ¿Qué servicio?",
        options: ["Amazon CloudFront", "Amazon EBS", "AWS IAM"],
        answer: 0,
        explain:
          "CloudFront es la CDN de AWS: cachea contenido en edge locations cerca del usuario, bajando latencia.",
      },
      {
        q: "¿Cómo diseñás para que la caída de una sola zona no tire el servicio?",
        options: [
          "Desplegar en múltiples Availability Zones",
          "Una instancia más grande en una sola AZ",
          "Apagar el monitoreo para ahorrar",
        ],
        answer: 0,
        explain:
          "Resiliencia = multi-AZ: distribuir la carga (ej: detrás de un balanceador) en varias zonas para tolerar la falla de una.",
      },
      {
        q: "Querés dar a una aplicación en EC2 acceso a S3 SIN guardar credenciales en el código. ¿Qué usás?",
        options: [
          "Un IAM Role asignado a la instancia",
          "Las access keys del usuario root en una variable",
          "Un archivo .env con las claves en el repo",
        ],
        answer: 0,
        explain:
          "Un IAM Role da credenciales temporales y rotadas a la instancia, sin claves hardcodeadas. Nunca se ponen claves en el código ni en el repo.",
      },
    ],
  },
];

export function getCertification(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}
