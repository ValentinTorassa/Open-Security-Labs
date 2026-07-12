import type { Certification } from "../certifications";

export const hashicorpTerraformAssociate: Certification = {
  slug: "hashicorp-terraform-associate",
  name: "HashiCorp Certified: Terraform Associate",
  code: "Terraform Associate",
  vendor: "HashiCorp",
  badge: "TF",
  badgeImage: "/certifications/hashicorp-terraform-associate.png",
  level: "Asociado",
  icon: "cloud",
  accent: "#844FBA",
  summary:
    "Valida los conocimientos fundamentales de infraestructura como código (IaC) con Terraform. Ideal para desarrolladores, DevOps e ingenieros de nube.",
  prepTips: [
    "Dominá la diferencia entre terraform plan (previsualización de cambios) y terraform apply (aplicación real).",
    "Entendé por qué el archivo terraform.tfstate es crítico y por qué nunca debe subirse a Git (puede contener secretos y credenciales).",
    "Estudiá el uso de variables locales (locals), variables de entrada (variables) y variables de salida (outputs).",
  ],
  studyResources: [
    {
      name: "HashiCorp Terraform Associate Certification Course",
      platform: "freeCodeCamp / Andrew Brown",
      type: "video",
      url: "https://www.youtube.com/watch?v=SPcwo0Gq9T8",
      free: true,
      desc: "Un excelente video curso completo de 12 horas con laboratorios paso a paso y preparación teórica.",
    },
    {
      name: "Official Terraform Associate Tutorials",
      platform: "HashiCorp Developer",
      type: "guide",
      url: "https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials",
      free: true,
      desc: "La ruta de aprendizaje oficial que agrupa los tutoriales prácticos recomendados para rendir.",
    },
  ],
  domainLabs: [
    {
      domainName: "Entender infraestructura como código (IaC)",
      labIds: ["cloud-produccion/aws-desde-cero"],
    },
    {
      domainName: "Navegar por el flujo de trabajo de Terraform",
      labIds: ["cloud-produccion/vpc-security-groups"],
    },
    {
      domainName: "Interactuar con módulos de Terraform",
      labIds: ["cloud-produccion/blast-radius-costo"],
    },
  ],
  meta: {
    questions: 57,
    durationMin: 57,
    passingScore: "70%",
    cost: "USD 70",
    validityYears: 2,
    format:
      "Opción múltiple, opción de respuesta múltiple, verdadero/falso, completar el espacio en blanco",
  },
  outcomes: [
    "Escribir configuraciones de Terraform reutilizables usando HCL.",
    "Administrar el estado de Terraform (tfstate) de manera segura y remota.",
    "Crear y consumir módulos para estructurar arquitecturas organizadas.",
    "Entender y ejecutar el ciclo de vida básico de Terraform (init, plan, apply, destroy).",
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
        "terraform init descarga los proveedores necesarios, inicializa los módulos y configura el backend de almacenamiento del estado.",
    },
    {
      q: "Verdadero o falso: El archivo de estado terraform.tfstate debe subirse al repositorio Git de tu aplicación.",
      options: ["Verdadero", "Falso"],
      answer: 1,
      explain:
        "Falso. El archivo .tfstate puede contener secretos en texto plano (como tokens o contraseñas). Debe almacenarse en un backend remoto seguro (S3, Terraform Cloud) con cifrado.",
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
        "terraform plan compara el estado actual con la configuración deseada y describe el plan de acción (crear, modificar o destruir) sin realizar cambios reales.",
    },
    {
      q: "En HCL, ¿cómo se define una variable cuyo valor no puede ser cambiado externamente pero sirve para reutilizar valores dentro del propio módulo?",
      options: ["variable", "output", "locals"],
      answer: 2,
      explain:
        "Las variables locales (locals) actúan como constantes internas de un módulo y no pueden ser configuradas desde fuera, a diferencia de las variables estándar.",
    },
    {
      q: "Al usar Terraform en equipo, ¿qué funcionalidad evita que dos desarrolladores apliquen cambios sobre la misma infraestructura al mismo tiempo?",
      options: [
        "State Locking (bloqueo de estado)",
        "Git branching",
        "Workspace separation",
      ],
      answer: 0,
      explain:
        "State Locking impide escrituras simultáneas en el estado, evitando inconsistencias o corrupción del archivo tfstate durante la aplicación de cambios.",
    },
    {
      q: "¿Qué comando destruye de manera segura toda la infraestructura administrada por la configuración de Terraform?",
      options: ["terraform delete", "terraform destroy", "terraform remove"],
      answer: 1,
      explain:
        "terraform destroy lee el estado y remueve todos los recursos declarados bajo esa configuración.",
    },
    {
      q: "¿Qué tipo de bloque en HCL se utiliza para consultar información sobre recursos que ya existen en la nube y no son administrados directamente por Terraform?",
      options: ["resource", "variable", "data"],
      answer: 2,
      explain:
        "Los bloques 'data' (Data Sources) permiten leer información externa de APIs de nube (como buscar el ID de una AMI reciente en AWS) para usarla en la configuración.",
    },
    {
      q: "¿Cómo se referencia una variable llamada 'db_port' dentro de una cadena de texto en HCL (interpolación)?",
      options: ["${var.db_port}", "$var.db_port", "var.db_port"],
      answer: 0,
      explain:
        "HCL utiliza la sintaxis ${...} para interpolar variables u operaciones dentro de cadenas de texto de tipo string.",
    },
    {
      q: "Verdadero o falso: Terraform requiere conectarse constantemente a internet para validar el estado de tus recursos una vez desplegados.",
      options: ["Verdadero", "Falso"],
      answer: 1,
      explain:
        "Falso. Terraform lee el archivo de estado local o del backend remoto para comparar los recursos sin consultar continuamente la API en segundo plano.",
    },
    {
      q: "¿Qué backend remoto de HashiCorp proporciona interfaz web, almacenamiento de estado seguro, control de accesos e integración de VCS gratuita?",
      options: ["Amazon S3", "Terraform Cloud", "HashiCorp Consul"],
      answer: 1,
      explain:
        "Terraform Cloud es la plataforma administrada de HashiCorp que hospeda el estado, bloquea las ejecuciones e integra flujos de trabajo VCS de manera centralizada.",
    },
  ],
};
