import type { Certification } from "../certifications";

export const awsSolutionsArchitectAssociate: Certification = {
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
    "Entendé a fondo la diferencia de ruteo y uso de balanceadores (ALB para HTTP/HTTPS en Capa 7 y NLB para protocolos TCP/UDP rápidos en Capa 4).",
  ],
  studyResources: [
    {
      name: "AWS Certified Solutions Architect Associate - Free Course",
      platform: "freeCodeCamp / Andrew Brown",
      type: "video",
      url: "https://www.youtube.com/watch?v=Ia-UEYYqg_0",
      free: true,
      desc: "Un curso masivo de más de 50 horas de pura teoría arquitectónica y laboratorios prácticos en la consola.",
    },
    {
      name: "AWS Exam Prep Guide (SAA-C03)",
      platform: "AWS Docs",
      type: "guide",
      url: "https://d1.awsstatic.com/training-and-certification/category-resources/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf",
      free: true,
      desc: "La guía de estudio oficial de AWS para arquitectos, con los criterios de evaluación de resiliencia y costos.",
    },
  ],
  domainLabs: [
    {
      domainName: "Diseño de arquitecturas seguras",
      labIds: [
        "cloud-produccion/iam-deny-gana",
        "cloud-produccion/s3-bucket-publico-sin-querer",
        "cloud-produccion/cloudtrail-quien-hizo-que",
      ],
    },
    {
      domainName: "Diseño de arquitecturas de alto rendimiento",
      labIds: [
        "cloud-produccion/vpc-security-groups",
        "backend-arquitectura/nats-jetstream-subjects-streams-consumers",
      ],
    },
    {
      domainName: "Diseño de arquitecturas costo-optimizadas",
      labIds: ["cloud-produccion/blast-radius-costo"],
    },
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
    "Mitigar riesgos mediante redundancia, backups automáticos y Multi-AZ.",
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
        "ElastiCache almacena en memoria los datos consultados con frecuencia, evitando que las lecturas repetitivas lleguen a la base de datos relacional RDS.",
    },
    {
      q: "Tenés archivos confidenciales almacenados en S3 que no deben ser eliminados ni modificados por ningún usuario, incluido el administrador, durante un período de cumplimiento regulatorio de 3 años. ¿Qué característica de S3 usás?",
      options: [
        "S3 Versioning",
        "S3 Object Lock en modo Compliance",
        "S3 Lifecycle Policies",
      ],
      answer: 1,
      explain:
        "S3 Object Lock en modo Compliance impide de forma estricta que cualquier usuario (incluso el usuario root) elimine o altere un objeto durante el periodo de retención.",
    },
    {
      q: "¿Qué tipo de volumen Amazon EBS es el más adecuado y de menor costo para cargas de trabajo secuenciales grandes y almacenamiento de logs de acceso poco frecuente?",
      options: [
        "Provisioned IOPS SSD (io2)",
        "Throughput Optimized HDD (st1) / Cold HDD (sc1)",
        "General Purpose SSD (gp3)",
      ],
      answer: 1,
      explain:
        "Los volúmenes HDD (st1 o sc1) son los más rentables para cargas de trabajo de alto rendimiento secuenciales y acceso poco frecuente, a diferencia de los SSD optimizados para IOPS aleatorios.",
    },
    {
      q: "• ¿Qué componente de AWS te permite interconectar VPCs de manera centralizada sin necesidad de crear conexiones peering full-mesh complejas?",
      options: ["VPC Endpoint", "AWS Transit Gateway", "NAT Gateway"],
      answer: 1,
      explain:
        "AWS Transit Gateway funciona como un router en la nube centralizado, simplificando enormemente la interconexión a escala de múltiples VPCs y redes locales.",
    },
  ],
};
