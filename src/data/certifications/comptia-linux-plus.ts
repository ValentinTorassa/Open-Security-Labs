import type { Certification } from "../certifications";

export const comptiaLinuxPlus: Certification = {
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
    "Aprendé la sintaxis básica de Docker (docker run, build, compose) y configuración básica de Ansible.",
  ],
  studyResources: [
    {
      name: "Free Linux Video Series",
      platform: "YouTube / NetworkChuck",
      type: "video",
      url: "https://www.youtube.com/playlist?list=PLIhvC56v63IL2OjFvv_PI0B2yAXGfJLMI",
      free: true,
      desc: "Videos interactivos y muy entretenidos para aprender la administración de sistemas Linux desde cero.",
    },
    {
      name: "CompTIA Linux+ XK0-006 Exam Objectives",
      platform: "CompTIA",
      type: "guide",
      url: "https://www.comptia.jp/pdf/CompTIA%20Linux+%20XK0-006%20Exam%20Objectives.pdf",
      free: true,
      desc: "El temario del examen oficial donde verás el nuevo peso de contenedores, nubes híbridas y Ansible.",
    },
  ],
  domainLabs: [
    {
      domainName: "Gestión del sistema",
      labIds: ["linux-real/filesystem-real", "linux-real/systemd-y-journalctl"],
    },
    {
      domainName: "Seguridad",
      labIds: [
        "linux-real/permisos-usuarios-procesos",
        "linux-real/permisos-en-octal",
        "ciberseguridad/por-que-chmod-777",
      ],
    },
    {
      domainName: "Automatización, orquestación y scripting",
      labIds: ["ciberseguridad/docker-socket-to-host"],
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
    "Configurar y administrar almacenamiento, procesos y redes en servidores Linux.",
    "Desplegar y orquestar contenedores con Docker y configurar automatizaciones con Ansible.",
    "Hardonizar sistemas y configurar políticas de permisos avanzados (ACLs y SELinux).",
    "Diagnosticar fallos del kernel, almacenamiento y conectividad.",
  ],
  domains: [
    { name: "Gestión del sistema", weight: 23 },
    { name: "Gestión de servicios y usuarios", weight: 20 },
    { name: "Seguridad", weight: 18 },
    { name: "Automatización, orquestación y scripting", weight: 17 },
    { name: "Troubleshooting", weight: 22 },
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
        "El demonio cron permite programar scripts y comandos para ejecutarse periódicamente utilizando configuraciones crontab.",
    },
    {
      q: "Necesitás ver el espacio disponible en todos los sistemas de archivos montados en formato legible para humanos (ej: GB, MB). ¿Qué comando usás?",
      options: ["du -sh", "df -h", "lsblk"],
      answer: 1,
      explain:
        "df -h muestra el espacio libre en los filesystems montados. du -sh calcula el uso de disco de un directorio o archivo específico.",
    },
    {
      q: "¿Cuál de los siguientes directorios almacena archivos de configuración del sistema en Linux?",
      options: ["/var", "/opt", "/etc"],
      answer: 2,
      explain:
        "El directorio `/etc` contiene los archivos de configuración estática del sistema operativo y servicios instalados.",
    },
    {
      q: "¿Qué comando de Docker se utiliza para compilar una imagen a partir de un archivo Dockerfile?",
      options: ["docker run", "docker build", "docker commit"],
      answer: 1,
      explain:
        "docker build procesa el archivo Dockerfile para compilar y empaquetar una nueva imagen de contenedor localmente.",
    },
  ],
};
