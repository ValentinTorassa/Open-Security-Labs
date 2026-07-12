import type { Certification } from "../certifications";

export const comptiaNetworkPlus: Certification = {
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
    "Estudiá el funcionamiento y los códigos de error/mensajes de ICMP (ej: para comandos como ping y traceroute).",
  ],
  studyResources: [
    {
      name: "Professor Messer's N10-009 Network+ Course",
      platform: "YouTube",
      type: "video",
      url: "https://www.youtube.com/playlist?list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8",
      free: true,
      desc: "Curso completo actualizado al examen N10-009 con explicaciones visuales de networking e infraestructura.",
    },
    {
      name: "Network+ N10-009 Exam Objectives",
      platform: "CompTIA",
      type: "guide",
      url: "https://www.comptia.jp/pdf/CompTIA%20Network+%20N10-009%20Exam%20Objectives.pdf",
      free: true,
      desc: "Documento oficial que enumera todos los protocolos, tipos de cables, conectores y estándares inalámbricos.",
    },
  ],
  domainLabs: [
    {
      domainName: "Conceptos de redes",
      labIds: [
        "redes-internet/una-request-no-es-magia",
        "redes-internet/dns-paso-a-paso",
      ],
    },
    {
      domainName: "Implementación de redes",
      labIds: [
        "redes-internet/leer-un-cidr-sin-calculadora",
        "cloud-produccion/vpc-security-groups",
      ],
    },
    {
      domainName: "Troubleshooting de red",
      labIds: ["redes-internet/status-codes-4xx-vs-5xx"],
    },
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
    "Identificar y resolver fallos comunes de red usando herramientas de diagnóstico.",
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
        "RIP es un protocolo clásico de vector de distancia basado en número de saltos. OSPF es de estado de enlace (Link-State) y BGP es de vector de ruta (Path-Vector).",
    },
    {
      q: "¿Qué capa de modelo OSI se encarga de fragmentar los datos y garantizar una transferencia de datos confiable y orientada a conexión?",
      options: ["Capa 3 (Red)", "Capa 4 (Transporte)", "Capa 5 (Sesión)"],
      answer: 1,
      explain:
        "La capa de transporte (Capa 4), mediante TCP, se encarga del control de flujo, fragmentación y entrega confiable de datos.",
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
        "Las VLANs segmentan redes a nivel lógico (capa 2), permitiendo aislar el tráfico de difusión (broadcast) sin necesidad de switches físicos separados.",
    },
    {
      q: "¿Cuál de las siguientes herramientas te permite rastrear la ruta que toma un paquete a través de routers hasta su destino?",
      options: ["ping", "nslookup", "traceroute (o tracert)"],
      answer: 2,
      explain:
        "Traceroute envía paquetes con valores TTL crecientes para mapear cada salto (router) en el camino hacia el destino.",
    },
  ],
};
