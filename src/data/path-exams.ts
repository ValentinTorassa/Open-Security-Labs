// Examen corto al final de cada ruta. Pocas preguntas, al grano.
import type { PathSlug } from "./paths";
import type { ExamQuestion } from "./questions";

export const pathExams: Partial<Record<PathSlug, ExamQuestion[]>> = {
  "linux-real": [
    {
      q: "El comando id te muestra, entre otras cosas…",
      options: [
        "El uso de disco del sistema",
        "Tu UID, GID y los grupos a los que pertenecés",
        "Los procesos en ejecución",
      ],
      answer: 1,
      explain:
        "id reporta tu identidad: UID, GID y grupos. Para el kernel, esa identidad (números) es lo que define tus permisos.",
    },
    {
      q: "Un archivo -rw------- está en octal…",
      options: ["600", "644", "700"],
      answer: 0,
      explain: "rw- = 6, --- = 0, --- = 0 → 600. Solo el dueño lee y escribe.",
    },
    {
      q: "¿Qué comando te dice qué proceso está escuchando en un puerto?",
      options: ["ss -tulpn", "chmod -R", "echo $PATH"],
      answer: 0,
      explain:
        "ss -tulpn lista los sockets en escucha junto con el proceso dueño de cada puerto.",
    },
  ],
  "redes-internet": [
    {
      q: "Recibís un 503. ¿De quién es, en principio, el problema?",
      options: ["De tu request (4xx)", "Del servidor (5xx)", "Del DNS siempre"],
      answer: 1,
      explain:
        "5xx indica que el servidor no pudo responder una request válida. Empezás mirando los logs del servidor, no tu token.",
    },
    {
      q: "Cambiaste un registro DNS y 'no toma efecto'. La causa más común es…",
      options: ["El TTL y el caché", "Que DNS está roto", "Un problema de TLS"],
      answer: 0,
      explain:
        "Las respuestas DNS se cachean según su TTL. Hasta que expira, seguís viendo el valor viejo. Es esperado, no un error.",
    },
    {
      q: "Tenés un token válido pero el endpoint da 403. Significa que…",
      options: [
        "No estás autenticado",
        "Estás autenticado pero no tenés permiso sobre ese recurso",
        "El recurso no existe",
      ],
      answer: 1,
      explain:
        "401 = no sé quién sos (autenticación). 403 = sé quién sos, pero esto no es para vos (autorización).",
    },
  ],
  "backend-arquitectura": [
    {
      q: "Un JWT prueba…",
      options: [
        "Que la acción está permitida sobre el recurso",
        "La identidad de quien lo presenta (autenticación)",
        "Que el servidor está sano",
      ],
      answer: 1,
      explain:
        "El JWT transporta identidad firmada (authn). No dice nada sobre si esa identidad puede tocar un recurso puntual (authz).",
    },
    {
      q: "Cambiás /facturas/100 por /facturas/101 con tu token y te devuelve la factura ajena. Eso es…",
      options: ["Un IDOR", "Un error 500", "Comportamiento normal"],
      answer: 0,
      explain:
        "IDOR: el servidor sirve un recurso ajeno sin verificar ownership. El token es válido; falta el chequeo de autorización.",
    },
    {
      q: "El payload de un JWT está…",
      options: [
        "Cifrado: nadie puede leerlo",
        "Codificado en base64: cualquiera con el token lo lee",
        "Comprimido con contraseña",
      ],
      answer: 1,
      explain:
        "El payload está codificado (base64), no cifrado. Nunca pongas secretos ahí: quien tenga el token, los ve.",
    },
  ],
  "cloud-produccion": [
    {
      q: "Después de un incidente en AWS, ¿qué te dice quién hizo qué llamada a la API?",
      options: ["CloudWatch", "CloudTrail", "S3"],
      answer: 1,
      explain:
        "CloudTrail registra las llamadas a la API: identidad, acción, IP y recurso. Es la base de cualquier investigación.",
    },
    {
      q: "En el modelo de responsabilidad compartida, parchear el SO de tu EC2 es responsabilidad…",
      options: ["De AWS", "Del cliente", "De nadie"],
      answer: 1,
      explain:
        "AWS asegura la nube (infra); vos asegurás lo que va EN la nube: el SO invitado, los parches y la config.",
    },
    {
      q: "¿Qué principio aplicás al dar permisos en IAM?",
      options: [
        "Mínimo privilegio",
        "Admin para todos, así nada falla",
        "Compartir credenciales root",
      ],
      answer: 0,
      explain:
        "Mínimo privilegio: solo los permisos necesarios. Reduce el blast radius si una credencial se compromete.",
    },
  ],
  ciberseguridad: [
    {
      q: "¿Por qué chmod 777 suele ser un problema en un servidor?",
      options: [
        "Hace el archivo más lento",
        "Cualquier usuario/proceso del sistema puede leerlo, modificarlo y ejecutarlo",
        "Borra el archivo",
      ],
      answer: 1,
      explain:
        "777 = rwxrwxrwx. El bloque 'otros' con 7 deja que cualquier proceso reescriba el archivo, lo que habilita escaladas.",
    },
    {
      q: "Montar /var/run/docker.sock dentro de un contenedor equivale, en la práctica, a…",
      options: [
        "Nada importante, solo administra contenedores",
        "Dar control sobre el host (acceso al demonio root de Docker)",
        "Acelerar el contenedor",
      ],
      answer: 1,
      explain:
        "El socket habla con el demonio Docker (root). Quien lo controla puede crear contenedores que montan el host: control del host.",
    },
    {
      q: "Un 401 frente a un 403 indica…",
      options: [
        "401 sin autenticar; 403 autenticado pero sin permiso",
        "Son equivalentes",
        "401 sin permiso; 403 sin autenticar",
      ],
      answer: 0,
      explain:
        "401 = falta autenticación. 403 = identidad válida pero sin autorización para ese recurso.",
    },
  ],
  "devsecops-agentes": [
    {
      q: "El límite de seguridad de un agente de IA con herramientas es…",
      options: [
        "Confiar en que el modelo se porte bien",
        "Una policy explícita: allowlist, denylist y auditoría",
        "El tamaño del prompt",
      ],
      answer: 1,
      explain:
        "El modelo no es el control; la policy lo es. Mínimo privilegio + denylist + audit log + approval gate para lo irreversible.",
    },
    {
      q: "¿Para qué sirve el secret scanning en CI/CD?",
      options: [
        "Acelerar el build",
        "Detectar credenciales filtradas antes de que lleguen al repo",
        "Formatear el código",
      ],
      answer: 1,
      explain:
        "El secret scanning detecta tokens/claves en commits y PRs, evitando que secretos terminen versionados en el historial.",
    },
    {
      q: "Una acción destructiva de un agente (borrar, ejecutar shell) debería…",
      options: [
        "Ejecutarse automáticamente para ser ágil",
        "Pasar por un approval gate con confirmación humana",
        "Quedar sin registrar para no ensuciar los logs",
      ],
      answer: 1,
      explain:
        "Lo irreversible pasa por un humano (approval gate) y queda en el audit log. La velocidad no justifica perder control.",
    },
  ],
};
