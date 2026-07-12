import type { Certification } from "../certifications";

export const comptiaSecurityPlus: Certification = {
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
    "Estudiá el modelo Zero Trust y sus principios: verificar explícitamente, usar el mínimo privilegio y asumir la brecha.",
  ],
  studyResources: [
    {
      name: "Professor Messer's SY0-701 Security+ Training Course",
      platform: "YouTube",
      type: "video",
      url: "https://www.youtube.com/playlist?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv",
      free: true,
      desc: "El curso gratuito más famoso de la comunidad que cubre absolutamente todos los objetivos del examen oficial.",
    },
    {
      name: "CompTIA Security+ SY0-701 Exam Objectives",
      platform: "CompTIA",
      type: "guide",
      url: "https://www.comptia.jp/pdf/CompTIA%20Security+%20SY0-701%20Exam%20Objectives%20(3.0).pdf",
      free: true,
      desc: "El PDF oficial con cada concepto y acrónimo que pueden llegar a tomar en el examen real.",
    },
  ],
  domainLabs: [
    {
      domainName: "Amenazas, vulnerabilidades y mitigaciones",
      labIds: [
        "ciberseguridad/xss-local-defensivo",
        "ciberseguridad/sql-injection-parametrizada",
        "ciberseguridad/threat-modeling-app-chica",
      ],
    },
    {
      domainName: "Arquitectura de seguridad",
      labIds: [
        "cloud-produccion/vpc-security-groups",
        "redes-internet/tls-sin-magia",
      ],
    },
    {
      domainName: "Operaciones de seguridad",
      labIds: [
        "ciberseguridad/hashear-no-es-cifrar",
        "ciberseguridad/docker-socket-to-host",
        "ciberseguridad/por-que-chmod-777",
      ],
    },
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
    "Operar bajo marcos de cumplimiento y gestión de riesgos.",
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
    {
      q: "¿Qué tipo de malware se propaga de forma autónoma a través de la red sin necesidad de interactuar con un archivo ejecutable?",
      options: ["Virus", "Gusano (Worm)", "Troyano"],
      answer: 1,
      explain:
        "Un gusano (worm) se propaga de forma automática explotando fallos en la red. Un virus requiere la ejecución de un archivo infectado por parte de un usuario.",
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
        "Los controles físicos restringen el acceso al espacio físico (ej. rejas, guardias, tarjetas de proximidad). Los otros son controles lógicos/técnicos o administrativos.",
    },
    {
      q: "Un ataque de 'Man-in-the-Middle' ocurre típicamente porque un atacante logra envenenar la tabla de traducción de direcciones IP a MAC. ¿Cómo se llama este ataque?",
      options: ["DNS Spoofing", "ARP Poisoning", "MAC Flooding"],
      answer: 1,
      explain:
        "ARP Poisoning asocia la dirección IP de la puerta de enlace a la dirección MAC del atacante, permitiendo interceptar el tráfico local.",
    },
    {
      q: "¿Cuál de los siguientes algoritmos de cifrado es asimétrico?",
      options: ["AES", "RSA", "ChaCha20"],
      answer: 1,
      explain:
        "RSA utiliza un par de claves (pública y privada), lo que lo hace asimétrico. AES y ChaCha20 son algoritmos simétricos rápidos.",
    },
  ],
};
