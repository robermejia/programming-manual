export const produccionEscalabilidadCategory = {
    title: "3. Producción y Escalabilidad",
    topics: [
        {
            id: "docker-produccion",
            title: "Docker en Producción: Buenas Prácticas",
            content: [
                {
                    title: "El desafío de la Producción",
                    text: "Desplegar contenedores en el portátil de un desarrollador es sencillo; mantenerlos ejecutándose de forma estable, segura y eficiente en un entorno de producción de alta disponibilidad exige adherirse a rigurosas normas de arquitectura e ingeniería de sistemas."
                },
                {
                    title: "Inmutabilidad estricta",
                    text: "La regla de oro en producción es la inmutabilidad absoluta: un contenedor jamás debe ser modificado, parcheado o actualizado en vivo mientras se está ejecutando. Si se requiere un cambio de código o configuración, se debe construir una nueva imagen inmutable y reemplazar el contenedor anterior.",
                    code: "# Reemplazar inmutablemente un contenedor en producción\ndocker pull mi-api:v2.0.0\ndocker stop api\ndocker rm api\ndocker run -d --name api mi-api:v2.0.0"
                },
                {
                    title: "Asignación y límites de recursos (Cgroups)",
                    text: "Es imperativo configurar límites estrictos de memoria RAM y uso de CPU para cada contenedor. Si omites estos límites, un solo contenedor con una fuga de memoria (memory leak) consumirá el 100% de la RAM del servidor, provocando que el kernel congele o reinicie la máquina física completa.",
                    code: "# Asignar límites de hardware en el instante de ejecución\ndocker run -d --memory=\"512m\" --cpus=\"1.5\" mi-api:v1.0"
                },
                {
                    title: "Políticas de reinicio resilientes",
                    text: "Configurar directivas como `--restart unless-stopped` asegura que el demonio de Docker supervise y levante automáticamente las aplicaciones tras caídas del sistema, picos de carga o reinicios no programados del servidor anfitrión.",
                    code: "# Configurar reinicio automático persistente\ndocker run -d --restart unless-stopped mi-api:v1.0"
                },
                {
                    title: "¿Por qué es vital para la estabilidad del negocio?",
                    text: "Garantiza que la infraestructura sea predecible, auditable y capaz de resistir fallos e imprevistos sin requerir la intervención manual de emergencia de un administrador de sistemas a altas horas de la madrugada."
                }
            ],
            description: "Arquitectura de despliegue, principios de inmutabilidad, limitación de recursos mediante cgroups y políticas de resiliencia en servidores de producción.",
            code: `# Despliegue profesional de un contenedor en producción con límites estrictos de recursos
docker run -d \\
  --name api-produccion \\
  --restart unless-stopped \\
  --memory="512m" \\
  --memory-swap="512m" \\
  --cpus="1.5" \\
  --security-opt="no-new-privileges:true" \\
  -p 8080:8080 \\
  miempresa/api-backend:v1.2.0`,
            syntaxDescription: "Las banderas `--memory` y `--memory-swap` con el mismo valor impiden que el contenedor utilice paginación en disco duro al agotar su RAM. La directiva `--security-opt` prohíbe la escalada de privilegios internos mediante binarios SUID/SGID.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En producción, el demonio de Docker (dockerd) debe configurarse en modo 'Live Restore' dentro de `/etc/docker/daemon.json`. Esto permite reiniciar o actualizar el demonio de Docker sin detener los contenedores que se encuentran actualmente en ejecución.",
                    code: "# En /etc/docker/daemon.json\n{\n  \"live-restore\": true\n}"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Utilizar la etiqueta `:latest` en manifiestos de producción o scripts de despliegue automatizados. Si la imagen base se actualiza en el registro con un cambio incompatible (breaking change), el próximo reinicio del contenedor descargará la nueva versión y romperá el sistema en producción.",
                    code: "# ❌ Mal: Despliegue impredecible y frágil\nimage: mi-api:latest\n\n# ✅ Bien: Versión semántica fijada de forma inmutable\nimage: mi-api:v2.4.1"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Nunca almacenes certificados SSL/TLS, claves privadas o contraseñas de bases de datos dentro de la imagen de Docker. Utiliza gestores de secretos externos (como HashiCorp Vault, AWS Secrets Manager o Docker Swarm Secrets) inyectados en tiempo de ejecución como sistemas de archivos en memoria (`/run/secrets`).",
                    code: "# Los secretos deben inyectarse de forma segura y temporal en memoria"
                }
            ]
        },
        {
            id: "seguridad",
            title: "Seguridad Avanzada en Docker",
            content: [
                {
                    title: "El vector de ataque: El usuario Root",
                    text: "Por defecto, los procesos dentro de un contenedor de Docker se ejecutan con privilegios del usuario `root` (UID 0). Dado que el contenedor comparte el kernel de la máquina anfitriona, si un atacante logra escapar del aislamiento del contenedor (Container Breakout), obtendrá acceso de root directo sobre el servidor físico.",
                    code: "# Verificar el usuario actual dentro de un contenedor en ejecución\ndocker exec -it mi-contenedor whoami # Devuelve root por defecto"
                },
                {
                    title: "Ejecución con usuarios no root (USER)",
                    text: "La medida de seguridad más crítica y elemental consiste en crear un usuario sin privilegios administrativos dentro del Dockerfile (ej. `node`, `appuser` con UID 1000) y declarar la instrucción `USER` para que el proceso principal abandone los privilegios de root antes de ejecutar la aplicación.",
                    code: "# En el Dockerfile: Crear usuario y cambiar contexto\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser"
                },
                {
                    title: "Escaneo de imágenes y vulnerabilidades",
                    text: "Las imágenes base suelen contener librerías del sistema operativo con vulnerabilidades conocidas (CVEs). Es obligatorio integrar herramientas de escaneo estático de imágenes (como Docker Scout, Trivy o Clair) para auditar y bloquear despliegues de imágenes vulnerables.",
                    code: "# Auditar vulnerabilidades estáticas de una imagen local\ndocker scout cves miempresa/mi-api:v1.0.0"
                },
                {
                    title: "Abandono de capacidades del kernel (Cap-Drop)",
                    text: "El kernel de Linux divide los privilegios de root en unidades distintas llamadas Capabilities (ej. `CAP_NET_ADMIN` para gestionar red o `CAP_SYS_ADMIN`). En producción, se debe aplicar el principio de mínimo privilegio eliminando todas las capacidades innecesarias del contenedor mediante `--cap-drop=ALL`.",
                    code: "# Bloquear todas las capacidades del kernel y habilitar solo las necesarias\ndocker run -d --cap-drop=ALL --cap-add=NET_BIND_SERVICE mi-api:v1.0"
                },
                {
                    title: "¿Por qué es el estándar en ciberseguridad?",
                    text: "Cumple con las normativas internacionales de seguridad (ISO 27001, SOC2, PCI-DSS), estableciendo múltiples capas de defensa en profundidad (Defense in Depth) para aislar y contener posibles brechas de seguridad."
                }
            ],
            description: "Hardening de contenedores, ejecución sin privilegios root, escaneo de vulnerabilidades (CVEs), abandono de capabilities y protección del kernel.",
            code: `# Dockerfile profesional configurado para ejecución estricta sin root
FROM node:20.11.0-alpine

# Crear un directorio de trabajo y asignar propiedad al usuario sin privilegios 'node' (UID 1000)
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node . .

# Cambiar explícitamente al usuario sin privilegios antes de ejecutar la aplicación
USER node

EXPOSE 3000
CMD ["node", "src/index.js"]`,
            syntaxDescription: "La bandera `--chown=node:node` en la instrucción `COPY` asigna la propiedad de los archivos directamente al usuario sin privilegios en un solo paso, evitando crear capas adicionales pesadas con comandos `RUN chown`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes utilizar el modo de solo lectura para el sistema de archivos raíz del contenedor añadiendo la bandera `--read-only` al hacer `docker run`. Esto impide que un atacante que haya vulnerado tu aplicación pueda descargar scripts maliciosos o modificar binarios del sistema.",
                    code: "# Ejecutar un contenedor con sistema de archivos inmutable de solo lectura\ndocker run -d --read-only --tmpfs /app/tmp mi-imagen:1.0"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Ejecutar contenedores de terceros o herramientas de gestión utilizando la bandera `--privileged`. Esta bandera desactiva absolutamente todos los mecanismos de aislamiento y seguridad del kernel (cgroups, apparmor, seccomp), otorgando al contenedor acceso directo y total al hardware físico de la máquina anfitriona.",
                    code: "# ❌ Peligro extremo de seguridad: Nunca usar en producción\ndocker run -d --privileged ubuntu bash"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Integra el escáner de código abierto `Trivy` en tus flujos de integración continua (CI/CD) configurado para fallar el pipeline de forma automática si detecta vulnerabilidades de severidad 'CRITICAL' o 'HIGH' en tu imagen de Docker.",
                    code: "# Escaneo de vulnerabilidades automatizado en terminal\ntrivy image --severity HIGH,CRITICAL miempresa/mi-api:v1.0.0"
                }
            ]
        },
        {
            id: "registry-avanzado",
            title: "Docker Registry Avanzado y Privado",
            content: [
                {
                    title: "El rol del Registry en la empresa",
                    text: "Mientras que Docker Hub es excelente para imágenes públicas de código abierto, el software propietario y comercial de una empresa requiere un almacenamiento estrictamente privado, seguro y con control de acceso granular."
                },
                {
                    title: "Repositorios Privados y Autohospedados",
                    text: "Las organizaciones utilizan registros en la nube gestionados de nivel corporativo (como AWS ECR, Google Artifact Registry o GitHub Container Registry - GHCR) o despliegan su propio registro privado autohospedado levantando la imagen oficial `registry:2` dentro de su infraestructura.",
                    code: "# Levantar un registro de contenedores privado autohospedado en el puerto 5000\ndocker run -d -p 5000:5000 --name registry registry:2"
                },
                {
                    title: "Autenticación y Control de Acceso (Login)",
                    text: "Para interactuar con un registro privado, el cliente CLI debe autenticarse utilizando el comando `docker login`, proporcionando credenciales o tokens de acceso personal (PAT) que el demonio almacena de forma segura en el archivo de configuración del usuario (`~/.docker/config.json`).",
                    code: "# Iniciar sesión contra un registro privado corporativo\ndocker login myregistry.example.com"
                },
                {
                    title: "Estrategias de Versionamiento y Retención",
                    text: "En registros corporativos se configuran políticas de ciclo de vida (Lifecycle Policies) automáticas para purgar imágenes antiguas de desarrollo que no han sido descargadas en los últimos 90 días, evitando costos desmesurados de almacenamiento en la nube.",
                    code: "# Etiquetar una imagen local apuntando hacia el dominio del registro privado\ndocker tag mi-api:v1 myregistry.example.com/mi-api:v1"
                },
                {
                    title: "¿Por qué es crucial para flujos automatizados?",
                    text: "El registro actúa como el único punto de la verdad (Single Point of Truth) que conecta el final del pipeline de integración continua (CI) con el inicio del pipeline de despliegue continuo (CD)."
                }
            ],
            description: "Gestión corporativa de imágenes, configuración de registros privados (AWS ECR, GHCR, Registry autohospedado), autenticación y políticas de retención.",
            code: `# 1. Autenticarse contra un registro privado corporativo (ej. GitHub Container Registry)
echo $CR_PAT | docker login ghcr.io -u miusuario --password-stdin

# 2. Etiquetar una imagen local apuntando hacia el dominio del registro privado
docker tag mi-api:v1.0.0 ghcr.io/miempresa/mi-api:v1.0.0

# 3. Subir (push) la imagen hacia el repositorio privado
docker push ghcr.io/miempresa/mi-api:v1.0.0

# 4. Cerrar sesión para eliminar las credenciales almacenadas en el sistema local
docker logout ghcr.io`,
            syntaxDescription: "El uso de `--password-stdin` permite inyectar el token de seguridad a través de la tubería estándar (pipe), evitando que la contraseña quede expuesta en el historial de comandos de la terminal (bash history).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes levantar tu propio registro privado de imágenes en tu servidor local en cuestión de segundos ejecutando un contenedor de la imagen oficial `registry:2`, respaldado por un volumen persistente para almacenar las imágenes.",
                    code: "# Levantar un registro de contenedores privado autohospedado en el puerto 5000\ndocker run -d -p 5000:5000 --name mi-registro --restart always -v registry_data:/var/lib/registry registry:2"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar hacer `docker pull` o `docker push` contra un registro privado autohospedado que no posee un certificado SSL/TLS válido (HTTPS), provocando que el demonio de Docker rechace la conexión con el error `http: server gave HTTP response to HTTPS client`.",
                    code: "# Solución temporal para desarrollo: Declarar el registro como inseguro en /etc/docker/daemon.json\n{\n  \"insecure-registries\": [\"192.168.1.50:5000\"]\n}"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En flujos de CI/CD en la nube (como AWS ECR o GCP), no utilices contraseñas estáticas de largo plazo para hacer `docker login`. Configura la autenticación mediante roles temporales de IAM (OIDC - OpenID Connect) que generan tokens de un solo uso con caducidad de 15 minutos.",
                    code: "# Autenticación temporal segura en AWS ECR mediante CLI\naws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com"
                }
            ]
        },
        {
            id: "orquestacion",
            title: "Orquestación y Relación con Kubernetes",
            content: [
                {
                    title: "El límite de Docker Compose",
                    text: "Docker Compose es una herramienta maravillosa para un solo servidor físico o entorno local. Sin embargo, cuando una aplicación crece y requiere ejecutarse distribuida a lo largo de un clúster de 10, 50 o 100 servidores físicos para garantizar alta disponibilidad, Compose alcanza su límite arquitectónico."
                },
                {
                    title: "El concepto de Orquestación de Contenedores",
                    text: "La orquestación es la tecnología que automatiza el despliegue, la gestión del ciclo de vida, el escalado dinámico, el balanceo de carga, la recuperación ante fallos (self-healing) y la interconexión de miles de contenedores distribuidos en un clúster de servidores.",
                    code: "# Iniciar un clúster de orquestación nativo en Docker Swarm\ndocker swarm init"
                },
                {
                    title: "Introducción a Kubernetes (K8s)",
                    text: "Kubernetes es la plataforma de orquestación de contenedores de código abierto líder indiscutible a nivel mundial, originalmente desarrollada por Google. Actúa como el sistema operativo de la nube, gestionando clústeres enteros de máquinas como si fueran un solo supercomputador.",
                    code: "# Consultar los nodos de un clúster de Kubernetes en producción\nkubectl get nodes"
                },
                {
                    title: "La relación técnica entre Docker y Kubernetes",
                    text: "Existe una confusión común en la industria. Kubernetes no reemplaza a Docker; son tecnologías complementarias. Docker (o más específicamente su motor de bajo nivel, `containerd`) actúa como el Entorno de Ejecución (Container Runtime) ubicado dentro de cada servidor (Worker Node) del clúster, encargado de arrancar y detener los contenedores físicos que Kubernetes le ordena gestionar.",
                    code: "# Inspeccionar contenedores a nivel de runtime containerd\ncrictl ps"
                },
                {
                    title: "¿Por qué es la meta final en la nube moderna?",
                    text: "Dominar la creación de imágenes inmutables en Docker y la estructuración de microservicios en Compose te proporciona exactamente los fundamentos y artefactos necesarios para empaquetar y migrar tus aplicaciones hacia clústeres de Kubernetes en producción."
                }
            ],
            description: "Evolución arquitectónica desde contenedores individuales hacia la orquestación distribuida, alta disponibilidad y la simbiosis técnica con Kubernetes.",
            code: `# 1. Empaquetar y probar tu microservicio localmente con Docker
docker build -t miempresa/mi-microservicio:v1.0.0 .
docker push miempresa/mi-microservicio:v1.0.0

# 2. Manifiesto declarativo de Kubernetes (Deployment.yaml) que orquesta la imagen de Docker
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-microservicio-deployment
spec:
  replicas: 5 # Mantiene 5 instancias idénticas corriendo distribuidas en el clúster
  selector:
    matchLabels:
      app: mi-microservicio
  template:
    metadata:
      labels:
        app: mi-microservicio
    spec:
      containers: # Kubernetes ordena al runtime (containerd/Docker) ejecutar esta imagen
      - name: aplicacion-core
        image: miempresa/mi-microservicio:v1.0.0
        ports:
        - containerPort: 8080`,
            syntaxDescription: "El manifiesto de Kubernetes asume la responsabilidad de la orquestación superior. Si uno de los 5 servidores físicos colapsa, Kubernetes detecta la pérdida y ordena inmediatamente al motor Docker de otro servidor sano que levante una nueva réplica para mantener el estado deseado.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En Kubernetes, la unidad atómica de despliegue no se llama 'Contenedor', se llama 'Pod'. Un Pod es una envoltura lógica superior que encapsula a uno o más contenedores de Docker que comparten la misma dirección IP, red y volúmenes de almacenamiento.",
                    code: "# Consultar los Pods (y sus contenedores internos) en un clúster de Kubernetes\nkubectl get pods"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Puedes habilitar un clúster de Kubernetes local de un solo nodo directamente dentro de la configuración de Docker Desktop (pestaña Kubernetes -> Enable Kubernetes). Esto te permite practicar y probar tus manifiestos de K8s en tu propia máquina local sin gastar dinero en la nube.",
                    code: "# Verificar la conexión con tu clúster local de Docker Desktop\nkubectl cluster-info"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Ten claro el cambio histórico en la industria (CRI - Container Runtime Interface). Aunque Kubernetes deprecó el uso directo del demonio pesado `dockerd` (Docker Shim) en versiones recientes, sigue utilizando de forma nativa e intensiva el motor central de Docker (`containerd`) para ejecutar todas tus imágenes.",
                    code: "# Tus imágenes construidas con 'docker build' funcionarán perfectamente en cualquier clúster de Kubernetes"
                }
            ]
        },
        {
            id: "escalado",
            title: "Escalado de Aplicaciones y Balanceo",
            content: [
                {
                    title: "El concepto de Escalabilidad Horizontal",
                    text: "Escalar verticalmente significa añadir más RAM y CPU a un solo servidor físico, lo cual tiene un límite duro de hardware y costos exponenciales. Escalar horizontalmente significa añadir más réplicas idénticas del contenedor de tu aplicación para distribuir la carga de trabajo entre múltiples instancias.",
                    code: "# Escalar horizontalmente un servicio en Docker Compose\ndocker compose up --scale backend=5 -d"
                },
                {
                    title: "El requisito fundamental: Aplicaciones Stateless",
                    text: "Para que una aplicación pueda escalarse horizontalmente, debe ser estrictamente Sin Estado (Stateless). Ninguna réplica del contenedor debe guardar sesiones de usuario, archivos subidos o cachés locales en su disco interno; todo estado debe delegarse hacia bases de datos compartidas (Postgres) o clústeres de caché (Redis).",
                    code: "# Inyectar la URL del clúster de caché externo a las réplicas\ndocker run -d -e REDIS_URL=redis://cache-cluster mi-api:v1.0"
                },
                {
                    title: "Balanceo de carga (Load Balancing)",
                    text: "Al tener múltiples réplicas de un contenedor ejecutándose en paralelo, es indispensable colocar un Balanceador de Carga (como Nginx, Traefik, HAProxy o un AWS ALB) delante de ellos. El balanceador recibe las peticiones de los usuarios y las distribuye equitativamente (ej. mediante Round-Robin) entre las distintas réplicas.",
                    code: "# Levantar un balanceador de carga Traefik independiente\ndocker run -d -p 80:80 --name load-balancer traefik:v2.10"
                },
                {
                    title: "Escalado local con Docker Compose",
                    text: "Docker Compose permite simular y probar el escalado horizontal en tu máquina local mediante la bandera `--scale`, levantando múltiples instancias de un mismo servicio de forma dinámica.",
                    code: "# Escalar un servicio específico localmente\ndocker compose up --scale api-backend=3 -d"
                },
                {
                    title: "¿Por qué garantiza la Alta Disponibilidad (HA)?",
                    text: "Si un contenedor colapsa por un error de código o un pico repentino de tráfico, el balanceador de carga detecta el fallo y redirige el tráfico instantáneamente hacia las réplicas restantes sanas, evitando la caída del servicio."
                }
            ],
            description: "Estrategias de escalabilidad horizontal, principios de diseño sin estado (stateless), balanceo de carga y gestión de réplicas de contenedores.",
            code: `# 1. Archivo docker-compose.yml preparado para escalado horizontal con Reverse Proxy Traefik
version: '3.8'
services:
  balanceador-traefik:
    image: traefik:v2.10
    command: --api.insecure=true --providers.docker=true
    ports:
      - "80:80"
      - "8080:8080" # Panel de control de Traefik
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # Escucha los eventos de Docker

  api-backend:
    image: miempresa/mi-api-stateless:v1.0
    # NOTA CRÍTICA: No mapear puertos al host (ports: - "8080:80") o habrá colisión de puertos al escalar
    labels:
      - "traefik.http.routers.api.rule=Host(\`api.midominio.com\`)"
    networks:
      - red-app

networks:
  red-app:

# 2. Comando para escalar horizontalmente el backend a 4 réplicas idénticas en paralelo
docker compose up --scale api-backend=4 -d`,
            syntaxDescription: "Al omitir el mapeo estático de puertos en `api-backend`, Docker asigna puertos dinámicos aleatorios a cada una de las 4 réplicas. El contenedor de Traefik lee el socket de Docker, detecta las 4 instancias y balancea el tráfico de red de forma automática y transparente.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En arquitecturas distribuidas modernas, las sesiones de usuario (JWT o cookies de sesión) nunca deben almacenarse en la memoria RAM del contenedor backend. Si lo haces, un usuario logueado en la Réplica 1 perderá su sesión si su siguiente petición es balanceada hacia la Réplica 2.",
                    code: "# Almacenar sesiones centralizadas en un clúster de Redis externo\nconst redisClient = createClient({ url: 'redis://cache-redis:6379' });"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar ejecutar `docker compose up --scale mi-web=3` en un servicio que tiene definido un mapeo de puertos estricto en el YAML (`ports: - '80:80'`). El primer contenedor ocupará el puerto 80 del host, provocando que la segunda y tercera réplica fallen con el error `port is already allocated`.",
                    code: "# Solución: Eliminar el bloque 'ports' del servicio y delegar el acceso al Reverse Proxy (Traefik/Nginx)"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En producción en la nube (AWS ECS, Kubernetes o Docker Swarm), combina el escalado horizontal con políticas de Auto-Escalado (Auto-scaling). Estas reglas monitorean el consumo medio de CPU; si supera el 70%, el clúster levanta automáticamente nuevas réplicas para absorber el tráfico.",
                    code: "# El auto-escalado horizontal absorbe picos virales de tráfico de forma autónoma"
                }
            ]
        },
        {
            id: "monitoreo",
            title: "Monitoreo y Observabilidad en Producción",
            content: [
                {
                    title: "La necesidad de la Observabilidad",
                    text: "Cuando gestionas docenas de microservicios contenedorizados distribuidos en servidores de producción, revisar los logs manualmente contenedor por contenedor con `docker logs` se vuelve humanamente imposible. La observabilidad es la disciplina que centraliza métricas, logs y trazas para entender el estado interno del sistema.",
                    code: "# Inspeccionar logs individuales de un microservicio\ndocker logs --tail 100 mi-microservicio"
                },
                {
                    title: "Centralización de Logs (ELK / Loki / Fluentd)",
                    text: "La mejor práctica consiste en configurar el demonio de Docker para que envíe los flujos de logs de todos los contenedores de forma automática hacia un recolector centralizado. Pilas como ELK (Elasticsearch, Logstash, Kibana) o Grafana Loki permiten buscar, filtrar y analizar millones de registros desde un panel web único.",
                    code: "# Configurar el envío automático de logs hacia Fluentd en el instante de ejecución\ndocker run -d --log-driver=fluentd --log-opt fluentd-address=localhost:24224 mi-api:v1.0"
                },
                {
                    title: "Métricas de rendimiento en vivo (Prometheus + cAdvisor)",
                    text: "Para monitorear el consumo de hardware, se despliega la herramienta `cAdvisor` (desarrollada por Google) como un contenedor en cada servidor. cAdvisor lee los cgroups del kernel y expone métricas detalladas de uso de CPU, RAM, red y disco de cada contenedor para que la base de datos de series temporales `Prometheus` las almacene.",
                    code: "# Desplegar cAdvisor para recolección de métricas del kernel y cgroups\ndocker run -d --volume=/:/rootfs:ro --volume=/var/run:/var/run:ro --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8080:8080 --name=cadvisor gcr.io/cadvisor/cadvisor:v0.47.2"
                },
                {
                    title: "Visualización y Alertas (Grafana)",
                    text: "Grafana se conecta a Prometheus y Loki para crear cuadros de mando (dashboards) visuales de alta fidelidad y configurar sistemas de alertas automáticas (ej. enviar un mensaje a Slack o PagerDuty si un contenedor crítico consume más del 90% de RAM durante 5 minutos).",
                    code: "# Levantar Grafana para visualización de dashboards de observabilidad\ndocker run -d -p 3000:3000 --name grafana grafana/grafana-oss"
                },
                {
                    title: "¿Por qué es vital para el Site Reliability Engineering (SRE)?",
                    text: "Permite pasar de una postura reactiva (enterarse de que el servidor cayó porque los clientes se quejan en redes sociales) a una postura proactiva (detectar y corregir anomalías antes de que afecten a los usuarios)."
                }
            ],
            description: "Arquitecturas de observabilidad, centralización de logs (Loki/ELK), recolección de métricas con cAdvisor/Prometheus y dashboards en Grafana.",
            code: `# Pila de Monitoreo profesional inmutable con cAdvisor, Prometheus y Grafana en Compose
version: '3.8'

services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.47.2
    container_name: monitor_cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro # Lee las métricas internas de Docker y cgroups
    ports:
      - "8080:8080" # Expone métricas en /metrics para Prometheus
    networks:
      - red-monitoreo
    restart: unless-stopped

  prometheus:
    image: prom/prometheus:v2.48.1
    container_name: monitor_prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus # Almacenamiento persistente de métricas
    ports:
      - "9090:9090"
    networks:
      - red-monitoreo
    restart: unless-stopped

  grafana:
    image: grafana/grafana-oss:10.2.2
    container_name: monitor_grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - red-monitoreo
    restart: unless-stopped

volumes:
  prometheus_data:
  grafana_data:

networks:
  red-monitoreo:
    driver: bridge`,
            syntaxDescription: "El contenedor de `cAdvisor` requiere montajes de solo lectura (`:ro`) sobre los directorios del sistema operativo anfitrión (`/sys`, `/var/lib/docker`) para poder inspeccionar a nivel de kernel el consumo de recursos de todos los contenedores vecinos.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El demonio de Docker (dockerd) posee un servidor de métricas compatible con Prometheus integrado de forma nativa. Puedes habilitarlo en `/etc/docker/daemon.json` añadiendo la directiva `\"metrics-addr\": \"0.0.0.0:9323\"` para monitorear la salud interna del propio motor de Docker.",
                    code: "# En /etc/docker/daemon.json\n{\n  \"metrics-addr\": \"0.0.0.0:9323\",\n  \"experimental\": true\n}"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Exponer los puertos de cAdvisor (`8080`) o Prometheus (`9090`) directamente a la red pública de Internet sin autenticación. Cualquier atacante podría acceder a tus métricas y conocer la topología exacta, consumo y nombres de todos tus contenedores internos.",
                    code: "# Solución: Bloquear puertos públicos y acceder a Grafana mediante un Reverse Proxy con HTTPS y autenticación"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Implementa el estándar OpenTelemetry en el código de tus microservicios (Java, Node, Go, Python). Al exportar trazas distribuidas (Distributed Tracing), podrás ver exactamente en qué contenedor de la cadena se produce un cuello de botella o lentitud al procesar una petición HTTP.",
                    code: "# OpenTelemetry permite seguir una petición a través de múltiples microservicios"
                }
            ]
        },
        {
            id: "ci-cd",
            title: "CI/CD con Docker: Pipelines y Automatización",
            content: [
                {
                    title: "El rol de Docker en CI/CD",
                    text: "Docker ha revolucionado la Integración Continua (CI) y el Despliegue Continuo (CD). Al estandarizar el empaquetado del software en imágenes inmutables, elimina las discrepancias entre los entornos de compilación, pruebas y producción, permitiendo automatizar flujos de trabajo con confiabilidad absoluta."
                },
                {
                    title: "Integración Continua (CI - Build & Test)",
                    text: "En un pipeline moderno (GitHub Actions, GitLab CI, Jenkins), cada vez que un desarrollador hace un `git push`, el servidor de CI levanta un entorno limpio, construye la imagen de Docker, ejecuta las pruebas unitarias y de integración dentro de contenedores efímeros y, si todo es exitoso, sube la imagen al registro.",
                    code: "# Construir y ejecutar pruebas unitarias en un contenedor efímero\ndocker build -t mi-api:test .\ndocker run --rm mi-api:test npm test"
                },
                {
                    title: "Automatización de Despliegues (CD - Deploy)",
                    text: "Una vez publicada la imagen versionada en el registro corporativo (ej. `mi-api:v2.1.0`), la fase de CD se conecta al servidor de producción remoto y actualiza el servicio para que descargue y ejecute la nueva versión de forma totalmente desatendida.",
                    code: "# Descargar y rotar el servicio en el servidor de producción\ndocker pull mi-api:v2.1.0\ndocker run -d --restart unless-stopped mi-api:v2.1.0"
                },
                {
                    title: "Despliegues sin tiempo de inactividad (Zero-Downtime / Blue-Green)",
                    text: "Para no afectar a los usuarios durante una actualización, se utilizan técnicas avanzadas como despliegues Blue-Green o Rolling Updates. Se arranca el nuevo contenedor (Green) en paralelo al antiguo (Blue); una vez que el nuevo contenedor pasa sus pruebas de salud (healthchecks), el balanceador de carga conmuta el tráfico hacia él y se destruye el contenedor antiguo.",
                    code: "# Escalar y conmutar réplicas para despliegue sin tiempo de inactividad\ndocker compose -f docker-compose.prod.yml up --scale web-green=2 -d"
                },
                {
                    title: "¿Por qué es el pilar de la agilidad empresarial?",
                    text: "Permite a los equipos de ingeniería desplegar nuevas características a producción docenas de veces al día con total seguridad y con la capacidad de hacer un rollback instantáneo ante cualquier fallo."
                }
            ],
            description: "Arquitectura de automatización, integración continua con GitHub Actions/GitLab CI, pruebas en contenedores efímeros y despliegues Zero-Downtime.",
            code: `# Pipeline profesional de CI/CD en GitHub Actions (.github/workflows/deploy.yml)
name: CI/CD Pipeline Docker

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 1. Clonar el repositorio de código
        uses: actions/checkout@v4

      - name: 2. Iniciar sesión en Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: 3. Construir y Subir (Push) la imagen inmutable
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: miempresa/api-produccion:\${{ github.sha }},miempresa/api-produccion:latest

      - name: 4. Despliegue Continuo remoto mediante SSH en servidor de Producción
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: \${{ secrets.PROD_SERVER_IP }}
          username: \${{ secrets.PROD_USER }}
          key: \${{ secrets.PROD_SSH_KEY }}
          script: |
            docker pull miempresa/api-produccion:\${{ github.sha }}
            # Reemplazar el contenedor activo con la nueva imagen inmutable
            docker stop api-server || true
            docker rm api-server || true
            docker run -d --name api-server --restart unless-stopped -p 8080:8080 miempresa/api-produccion:\${{ github.sha }}
            docker system prune -af`,
            syntaxDescription: "El flujo automatiza la compilación inyectando el hash exacto del commit de Git (`${{ github.sha }}`) como etiqueta de la imagen. La acción SSH se conecta al servidor de producción para realizar la rotación inmutable del contenedor.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En flujos de CI/CD avanzados, utiliza Docker Buildx (el motor de construcción de nueva generación de Docker respaldado por BuildKit). Buildx permite compilar imágenes multiplataforma (ej. para procesadores Intel x86_64 y Apple Silicon / ARM64 simultáneamente) con un solo comando.",
                    code: "# Construir y publicar imagen multiplataforma (x86 y ARM) de un solo comando\ndocker buildx build --platform linux/amd64,linux/arm64 -t mi-api:latest --push ."
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Ejecutar pruebas de integración en CI/CD conectándose a bases de datos externas en la nube. Esto genera latencia, costos innecesarios y colisiones de datos si dos pipelines corren al mismo tiempo. En CI, levanta siempre contenedores de base de datos efímeros y locales mediante Docker Compose.",
                    code: "# ✅ En el pipeline de CI, levantar todo el entorno de pruebas in situ\ndocker compose -f docker-compose.test.yml up --build --exit-code-from test-runner"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para despliegues continuos (CD) avanzados en servidores propios o nubes privadas, adopta el paradigma GitOps utilizando herramientas como `Watchtower` o `ArgoCD`. Watchtower es un contenedor que supervisa tu registro de imágenes; si detecta una nueva versión de tu imagen, actualiza y reinicia tus contenedores de producción automáticamente sin requerir acceso SSH desde GitHub Actions.",
                    code: "# Despliegue continuo desatendido y seguro con Watchtower en Compose\nservices:\n  watchtower:\n    image: containrrr/watchtower\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n    command: --interval 300 --cleanup"
                }
            ]
        }
    ]
};
