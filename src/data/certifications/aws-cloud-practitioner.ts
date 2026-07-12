import type { Certification } from "../certifications";

export const awsCloudPractitioner: Certification = {
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
    "Aprendé la diferencia entre CloudWatch (monitoreo/alarmas) y CloudTrail (auditoría de llamadas a la API).",
  ],
  studyResources: [
    {
      name: "AWS Skill Builder: Cloud Practitioner Essentials",
      platform: "AWS",
      type: "course",
      url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/16434/aws-cloud-practitioner-essentials",
      free: true,
      desc: "El curso oficial gratuito de AWS de 6 horas que cubre todos los fundamentos y servicios Core.",
    },
    {
      name: "Guía de Examen Oficial CLF-C02",
      platform: "AWS Docs",
      type: "guide",
      url: "https://d1.awsstatic.com/training-and-certification/category-resources/AWS-Certified-Cloud-Practitioner_Exam-Guide_C02.pdf",
      free: true,
      desc: "El temario oficial detallado con la ponderación exacta de cada dominio y ejemplo de preguntas.",
    },
    {
      name: "AWS Certified Cloud Practitioner Full Course",
      platform: "freeCodeCamp / Andrew Brown",
      type: "video",
      url: "https://www.youtube.com/watch?v=SOTamWGuqnM",
      free: true,
      desc: "Curso completo de video de 14 horas con explicaciones detalladas y laboratorios paso a paso.",
    },
  ],
  domainLabs: [
    {
      domainName: "Seguridad y cumplimiento",
      labIds: [
        "cloud-produccion/iam-deny-gana",
        "cloud-produccion/s3-bucket-publico-sin-querer",
        "cloud-produccion/cloudtrail-quien-hizo-que",
      ],
    },
    {
      domainName: "Conceptos de la nube",
      labIds: [
        "cloud-produccion/aws-desde-cero",
        "cloud-produccion/blast-radius-costo",
      ],
    },
    {
      domainName: "Tecnología y servicios de la nube",
      labIds: ["cloud-produccion/vpc-security-groups"],
    },
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
    "Reconocer buenas prácticas de seguridad y gobernanza en la nube.",
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
        "Las instancias reservadas (y Savings Plans) ofrecen descuentos importantes a cambio de comprometerse a un volumen de cómputo específico por un plazo fijo.",
    },
    {
      q: "¿Qué servicio de base de datos relacional de AWS se encarga automáticamente de tareas como parches y backups?",
      options: ["Amazon DynamoDB", "Amazon RDS", "Amazon Redshift"],
      answer: 1,
      explain:
        "Amazon RDS es un servicio relacional administrado que automatiza tareas de mantenimiento. DynamoDB es NoSQL administrado y Redshift es para data warehousing.",
    },
    {
      q: "¿Qué servicio proporciona protección DDoS administrada y automática para todas las cuentas de AWS sin costo adicional?",
      options: ["AWS Shield Standard", "AWS WAF", "AWS GuardDuty"],
      answer: 0,
      explain:
        "AWS Shield Standard protege de manera gratuita contra ataques DDoS en capas de red y transporte. AWS WAF protege la capa de aplicación y es de pago.",
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
        "El marco Well-Architected ayuda a los arquitectos de nube a construir la infraestructura más segura, de alto rendimiento, resiliente y eficiente posible a través de 6 pilares.",
    },
  ],
};
