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
      "Entendé cómo calcular máscaras CIDR rápidamente y cuántos hosts útiles te deja una subred (fórmula: 2^n - 2).",
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
];

export function getCertification(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}
