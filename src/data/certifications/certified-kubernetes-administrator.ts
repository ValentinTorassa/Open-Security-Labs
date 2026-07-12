import type { Certification } from "../certifications";

export const certifiedKubernetesAdministrator: Certification = {
  slug: "certified-kubernetes-administrator",
  name: "Certified Kubernetes Administrator (CKA)",
  code: "CKA",
  vendor: "The Linux Foundation",
  badge: "CKA",
  badgeImage: "/certifications/certified-kubernetes-administrator.png",
  level: "Asociado",
  icon: "server",
  accent: "#326CE5",
  summary:
    "La certificación práctica de Kubernetes más respetada. Valida tu habilidad para configurar y administrar clusters de Kubernetes en producción.",
  prepTips: [
    "Practicá atajos con kubectl alias (alias k=kubectl) y generá YAML rápidamente con --dry-run=client -o yaml.",
    "Entendé el funcionamiento de los componentes del plano de control (Control Plane): API Server, etcd, Scheduler y Controller Manager.",
    "Dominá el troubleshooting de nodos caídos y la configuración de redes de Pods (CNI).",
  ],
  studyResources: [
    {
      name: "Kubernetes Official Documentation",
      platform: "Kubernetes.io",
      type: "doc",
      url: "https://kubernetes.io/docs/home/",
      free: true,
      desc: "La documentación oficial de Kubernetes que podés (y debés) consultar durante el examen real.",
    },
    {
      name: "Free CKA Course on YouTube",
      platform: "freeCodeCamp / KodeKloud",
      type: "video",
      url: "https://www.youtube.com/watch?v=X48VuDVv0do",
      free: true,
      desc: "Curso completo de video de 5 horas que repasa los temas fundamentales necesarios para la prueba.",
    },
  ],
  domainLabs: [
    {
      domainName: "Cluster Architecture, Installation & Config",
      labIds: ["linux-real/systemd-y-journalctl"],
    },
    {
      domainName: "Services & Networking",
      labIds: ["redes-internet/dns-paso-a-paso"],
    },
    {
      domainName: "Troubleshooting",
      labIds: ["ciberseguridad/docker-socket-to-host"],
    },
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
    "Diagnosticar y solucionar fallos en pods, servicios e infraestructura.",
  ],
  domains: [
    { name: "Almacenamiento (Storage)", weight: 10 },
    { name: "Troubleshooting", weight: 30 },
    { name: "Workloads & Scheduling", weight: 15 },
    { name: "Cluster Architecture, Installation & Config", weight: 25 },
    { name: "Services & Networking", weight: 20 },
  ],
  relatedPaths: ["linux-real", "cloud-produccion", "devsecops-agentes"],
  exam: [
    {
      q: "¿Qué componente de Kubernetes se encarga de asignar pods a nodos específicos según los recursos disponibles?",
      options: ["Kubelet", "Kube-Scheduler", "Kube-Controller-Manager"],
      answer: 1,
      explain:
        "Kube-Scheduler analiza los requisitos de un pod y los recursos de los nodos para asignarlo al host ideal.",
    },
    {
      q: "¿Qué comando kubectl muestra los logs en tiempo real de un pod llamado 'web-server'?",
      options: [
        "kubectl describe pod web-server",
        "kubectl logs -f web-server",
        "kubectl get logs web-server",
      ],
      answer: 1,
      explain:
        "El comando `kubectl logs -f pod-name` sigue (-f, follow) los logs del contenedor dentro del pod en vivo.",
    },
    {
      q: "¿Qué tipo de recurso en Kubernetes proporciona almacenamiento persistente independiente del ciclo de vida de un pod individual?",
      options: ["EmptyDir", "PersistentVolume (PV)", "ConfigMap"],
      answer: 1,
      explain:
        "Un PersistentVolume (PV) es un recurso de almacenamiento aprovisionado por un administrador que persiste más allá de la vida de cualquier pod individual.",
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
        "La combinación `--dry-run=client -o yaml` evalúa la sintaxis del comando localmente y exporta el YAML correspondiente para guardarlo o modificarlo.",
    },
    {
      q: "¿Qué agente de Kubernetes corre en cada nodo y se encarga de que los contenedores estén funcionando según lo solicitado?",
      options: ["Kube-Proxy", "Etcd", "Kubelet"],
      answer: 2,
      explain:
        "El Kubelet es el agente del nodo que se comunica con el API Server y se encarga de ejecutar y monitorear los contenedores locales.",
    },
    {
      q: "Verdadero o falso: etcd es la base de datos clave-valor distribuida y consistente que sirve como la única fuente de verdad de Kubernetes.",
      options: ["Verdadero", "Falso"],
      answer: 0,
      explain:
        "Verdadero. etcd guarda todo el estado de configuración del cluster y debe ser respaldada frecuentemente en producción.",
    },
    {
      q: "¿Qué tipo de Service expone una aplicación de manera externa asignando una IP estática pública provista por el proveedor de nube?",
      options: ["ClusterIP", "NodePort", "LoadBalancer"],
      answer: 2,
      explain:
        "LoadBalancer crea un balanceador de carga externo en el proveedor de nube y mapea el tráfico hacia los pods de tu servicio.",
    },
    {
      q: "Necesitás configurar un Pod para que pueda escribir en el directorio root del host. ¿Qué volumen utilizás?",
      options: ["hostPath", "persistentVolumeClaim", "secret"],
      answer: 0,
      explain:
        "hostPath monta un directorio directo del sistema operativo del nodo dentro del pod. Debe usarse con precaución por razones de seguridad.",
    },
    {
      q: "¿Qué recurso se encarga de enrutar tráfico HTTP y HTTPS externo hacia los servicios internos del cluster basándose en reglas de rutas?",
      options: ["Ingress", "NetworkPolicy", "ClusterIP"],
      answer: 0,
      explain:
        "Ingress actúa como un reverse proxy/router en el perímetro del cluster, aplicando reglas de host y path antes de enviar el tráfico a los Services.",
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
        "ImagePullBackOff significa que kubelet falló repetidamente al descargar la imagen especificada en el manifiesto (url incorrecta, tag erróneo o credenciales de registro faltantes).",
    },
  ],
};
