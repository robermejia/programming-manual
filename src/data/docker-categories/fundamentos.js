export const fundamentosCategory = {
    title: "1. Fundamentos de Docker",
    topics: [
        {
            id: "introduccion",
            title: "Introducción a Docker",
            content: [
                {
                    title: "¿Qué es Docker?",
                    text: "Docker es una plataforma de código abierto líder en la industria que permite a los desarrolladores automatizar el despliegue, empaquetado y ejecución de aplicaciones dentro de entornos aislados y ligeros llamados contenedores."
                },
                {
                    title: "Problema que resuelve (entornos inconsistentes)",
                    text: "Elimina el clásico y frustrante problema de 'en mi máquina sí funciona'. Al empaquetar la aplicación junto con todas sus dependencias, librerías, binarios y archivos de configuración del sistema operativo, garantiza que el software se ejecutará de forma idéntica en el portátil del desarrollador, en el entorno de pruebas y en los servidores de producción en la nube."
                },
                {
                    title: "Beneficios de usar contenedores",
                    text: "Ofrece portabilidad extrema entre nubes y sistemas operativos, tiempos de arranque casi instantáneos (milisegundos), aislamiento eficiente de procesos y una drástica optimización en el consumo de recursos de hardware al no requerir la virtualización de un sistema operativo completo."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Es indispensable para arquitecturas de microservicios, flujos de integración y despliegue continuos (CI/CD) y desarrollo nativo en la nube (cloud-native). No es necesario para scripts simples de un solo uso o aplicaciones monolíticas heredadas (legacy) fuertemente acopladas al hardware físico."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Familiaridad básica con la línea de comandos (CLI) de Linux/Windows, conceptos generales de redes (puertos, IPs) y arquitectura de software cliente-servidor."
                }
            ],
            description: "Conceptos introductorios, el fin de la inconsistencia de entornos y las ventajas de la contenedorización moderna.",
            code: `# Verificar la versión instalada de Docker en el sistema
docker --version

# Comprobar el estado general del demonio de Docker y su configuración
docker info`,
            syntaxDescription: "El comando `docker --version` valida que el binario cliente (CLI) esté en el PATH del sistema. `docker info` realiza una consulta al demonio (Docker Daemon) para mostrar datos clave sobre el almacenamiento, red y contenedores activos.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "A diferencia de las máquinas virtuales tradicionales, los contenedores no virtualizan el hardware; virtualizan el sistema operativo, compartiendo el kernel del anfitrión de forma nativa y directa.",
                    code: "# Ver los procesos de contenedores activos en tiempo real\ndocker ps"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Adopta Docker desde el primer día de desarrollo en tu equipo para asegurar que todos los desarrolladores utilicen exactamente las mismas versiones de bases de datos, lenguajes y librerías.",
                    code: "# Levantar un entorno de desarrollo Node.js inmutable y efímero\ndocker run -it --rm node:20-alpine sh"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Evita instalar bases de datos (Postgres, MySQL, Redis) directamente en tu sistema operativo local. Levántalas siempre mediante contenedores de Docker para mantener tu máquina limpia y cambiar de versión en segundos.",
                    code: "docker run --name mi-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:16-alpine"
                }
            ]
        },
        {
            id: "conceptos-basicos",
            title: "Conceptos Básicos: Imagen, Contenedor y Registry",
            content: [
                {
                    title: "Imagen (Image)",
                    text: "Una imagen es un paquete inmutable y estático de solo lectura que contiene el código fuente, librerías, dependencias, herramientas y la configuración del entorno necesarios para ejecutar una aplicación. Funciona como la plantilla o molde a partir del cual se instancian los contenedores.",
                    code: "# Descargar y listar imágenes almacenadas localmente\ndocker pull nginx:alpine\ndocker images"
                },
                {
                    title: "Contenedor (Container)",
                    text: "Un contenedor es una instancia en tiempo de ejecución (activa o detenida) de una imagen. Es un entorno completamente aislado donde se ejecuta el proceso de la aplicación, provisto de su propio sistema de archivos temporal, red y espacio de procesos.",
                    code: "# Crear y ejecutar un contenedor en segundo plano\ndocker run -d --name servidor-web -p 8080:80 nginx:alpine\ndocker ps"
                },
                {
                    title: "Docker Engine",
                    text: "Es el motor de ejecución cliente-servidor principal de la plataforma. Está compuesto por un demonio en segundo plano (dockerd), una API REST que especifica las interfaces de comunicación y el cliente de línea de comandos (CLI).",
                    code: "# Consultar las versiones del cliente y del servidor de Docker\ndocker version"
                },
                {
                    title: "Docker Hub / Registry",
                    text: "Un Registry (como Docker Hub, AWS ECR o Google GCR) es un servicio de almacenamiento y distribución centralizado donde se publican (push) y descargan (pull) imágenes de contenedores, gestionando repositorios públicos y privados.",
                    code: "# Buscar imágenes públicas en Docker Hub desde la terminal\ndocker search ubuntu\ndocker pull ubuntu:latest"
                },
                {
                    title: "¿Por qué es importante dominar estos conceptos?",
                    text: "Comprender la estricta separación entre la inmutabilidad de la imagen y la naturaleza efímera del contenedor es el pilar fundamental para diseñar, construir y escalar aplicaciones modernas en contenedores."
                }
            ],
            description: "Definición y relación estructural entre imágenes inmutables, contenedores efímeros, el motor Docker Engine y los registros de distribución.",
            code: `# Descargar una imagen oficial de Nginx desde Docker Hub
docker pull nginx:alpine

# Crear y ejecutar un contenedor en segundo plano a partir de la imagen descargada
docker run --name servidor-web -d -p 8080:80 nginx:alpine`,
            syntaxDescription: "`docker pull` obtiene la plantilla inmutable (imagen) desde el Registry. `docker run` crea una nueva capa de lectura y escritura (contenedor) sobre la imagen base, asigna el mapeo de puertos (`-p`) y arranca el proceso en segundo plano (`-d`).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En Programación Orientada a Objetos, una Imagen equivale a la definición de una Clase (plantilla), mientras que un Contenedor equivale a un Objeto o Instancia viva creada a partir de esa clase.",
                    code: "# Múltiples contenedores (instancias) independientes de la misma imagen base\ndocker run -d --name web1 nginx:alpine\ndocker run -d --name web2 nginx:alpine"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Confundir el almacenamiento temporal interno del contenedor con almacenamiento persistente. Si eliminas un contenedor, todos los archivos creados o modificados en su interior se pierden para siempre si no utilizas volúmenes.",
                    code: "# ❌ Los archivos guardados aquí se destruirán al borrar el contenedor\ndocker run -it ubuntu bash"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Utiliza siempre etiquetas (tags) específicas y fijas en lugar de `:latest` para garantizar que tus despliegues en producción sean predecibles, deterministas y totalmente reproducibles.",
                    code: "# ✅ Buena práctica (versión anclada)\ndocker pull node:20.11.0-alpine\n\n# ❌ Evitar en producción (impredecible)\ndocker pull node:latest"
                }
            ]
        },
        {
            id: "arquitectura",
            title: "Arquitectura de Docker",
            content: [
                {
                    title: "Cliente (Docker CLI)",
                    text: "El binario `docker` es la interfaz de línea de comandos principal que utilizan los usuarios. Actúa como el cliente en la arquitectura, aceptando comandos del usuario y traduciéndolos en peticiones HTTP hacia la API REST del demonio.",
                    code: "# Ejecutar comandos desde el cliente CLI\ndocker ps"
                },
                {
                    title: "Servidor (Docker Daemon / dockerd)",
                    text: "El Docker Daemon es el proceso pesado en segundo plano que escucha y procesa las peticiones de la API REST. Es el verdadero cerebro que crea, ejecuta, supervisa y destruye imágenes, contenedores, redes y volúmenes.",
                    code: "# Iniciar o verificar el estado del demonio en Linux\nsudo systemctl status docker"
                },
                {
                    title: "Comunicación entre componentes",
                    text: "El Cliente y el Demonio se comunican de forma nativa a través de sockets UNIX locales (`/var/run/docker.sock`) en la misma máquina, o mediante sockets TCP sobre la red para la gestión de servidores remotos.",
                    code: "# Inspeccionar los permisos del socket UNIX de Docker\nls -l /var/run/docker.sock"
                },
                {
                    title: "¿Por qué es clave en arquitecturas modernas?",
                    text: "Este diseño fuertemente desacoplado permite gestionar clústeres enteros de servidores remotos desde tu máquina local con la misma facilidad que si estuvieras ejecutando los contenedores en tu propio portátil."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Facilita la automatización y la integración con herramientas de terceros (como pipelines de CI/CD, IDEs o portales internos), ya que cualquier software puede controlar Docker simplemente enviando peticiones HTTP a su API REST."
                }
            ],
            description: "El modelo Cliente-Servidor desacoplado de Docker: CLI, Docker Daemon y la API REST de comunicación mediante sockets.",
            code: `# Comprobar la conexión cliente-servidor y ver las versiones de ambos componentes
docker version

# Inspeccionar información avanzada del demonio y su estado de ejecución
docker info | grep -i "server version"`,
            syntaxDescription: "El comando `docker version` expone de manera clara y explícita la arquitectura cliente-servidor, mostrando bloques separados para el 'Client' (CLI) y el 'Server' (Docker Engine Daemon).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Dado que la comunicación se basa en una API REST estándar, puedes apuntar tu CLI local hacia un demonio de Docker en un servidor remoto simplemente configurando la variable de entorno `DOCKER_HOST`.",
                    code: "export DOCKER_HOST=tcp://192.168.1.50:2375\ndocker ps"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Protege con máximo rigor el socket de Docker (`/var/run/docker.sock`). Otorgar acceso a este socket a un contenedor no confiable equivale a darle permisos de root en la máquina física anfitriona.",
                    code: "# ⚠️ Máxima precaución al montar el socket en contenedores de terceros\ndocker run -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer-ce"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Cuando configures demonios de Docker para acceso remoto sobre red TCP, habilita siempre el cifrado y autenticación mutua mediante TLS (puerto 2376) para evitar ataques de ejecución remota de código.",
                    code: "docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=10.0.0.1:2376 ps"
                }
            ]
        },
        {
            id: "contenedores-vs-vms",
            title: "Contenedores vs Máquinas Virtuales",
            content: [
                {
                    title: "Diferencias de arquitectura",
                    text: "Las Máquinas Virtuales (VMs) virtualizan el hardware físico mediante una capa de Hipervisor (como VMware o Hyper-V), requiriendo instalar un Sistema Operativo invitado (Guest OS) completo por cada VM. Los contenedores virtualizan a nivel del sistema operativo, compartiendo el mismo Kernel Linux del anfitrión.",
                    code: "# Comprobar que el contenedor comparte el kernel de la máquina anfitriona\ndocker run --rm alpine uname -a"
                },
                {
                    title: "Diferencias de rendimiento",
                    text: "Al no tener el enorme peso de un SO completo, los contenedores arrancan en milisegundos, ocupan apenas megabytes en disco y acceden a la CPU y RAM con rendimiento casi nativo. Las VMs tardan minutos en arrancar e inmovilizan gigabytes de RAM asignados de forma estática.",
                    code: "# Inspeccionar el consumo en vivo de recursos de los contenedores\ndocker stats"
                },
                {
                    title: "Casos de uso para Contenedores",
                    text: "Empaquetado de microservicios, aplicaciones web, APIs REST, entornos de desarrollo efímeros, integración continua (CI/CD) y arquitecturas elásticas orquestadas por Kubernetes."
                },
                {
                    title: "Casos de uso para Máquinas Virtuales",
                    text: "Aislamiento estricto de seguridad a nivel de hardware físico, ejecución de sistemas operativos con kernels incompatibles (ej. ejecutar Windows Server sobre un host Linux) o aplicaciones monolíticas heredadas (legacy)."
                },
                {
                    title: "¿Cuál elegir en el desarrollo moderno?",
                    text: "Ambas tecnologías son complementarias. En la nube moderna (AWS, GCP, Azure), la arquitectura estándar consiste en desplegar contenedores Docker altamente dinámicos sobre instancias de máquinas virtuales robustas y elásticas."
                }
            ],
            description: "Comparativa técnica a nivel de kernel, consumo de recursos, velocidad de arranque y casos de uso ideales entre contenedores y VMs.",
            code: `# Comprobar que el contenedor comparte el kernel exacto de la máquina anfitriona
docker run --rm alpine uname -a

# Inspeccionar el consumo en vivo de CPU, RAM y Red de los contenedores
docker stats`,
            syntaxDescription: "`docker stats` proporciona un monitor interactivo en tiempo real (similar al comando `top` de Linux) que muestra el uso de memoria, CPU, operaciones de entrada/salida en disco y tráfico de red por cada contenedor activo.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Un contenedor es fundamentalmente un proceso estándar del sistema operativo anfitrión, confinado y aislado mediante características nativas del kernel de Linux: Namespaces (aislamiento) y Cgroups (limitación de recursos).",
                    code: "# Puedes ver el proceso del contenedor directamente desde el host (en Linux)\nps aux | grep containerd"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar tratar un contenedor como si fuera una máquina virtual, instalando en él servidores SSH, demonios de sistema (systemd/init) o múltiples aplicaciones no relacionadas ejecutándose en paralelo.",
                    code: "# ❌ Mal: Instalar SSH, Apache y MySQL en un solo contenedor\n# ✅ Bien: Un contenedor = Un único proceso o servicio arquitectónico"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Aprovecha la ligereza extrema de los contenedores para levantar la arquitectura completa de tu proyecto (Frontend, Backend, Base de datos, Caché Redis y Cola RabbitMQ) en tu propia máquina local sin saturar tu memoria RAM.",
                    code: "docker compose up -d"
                }
            ]
        },
        {
            id: "instalacion",
            title: "Instalación de Docker y Entornos de Ejecución",
            content: [
                {
                    title: "Requisitos del sistema",
                    text: "Docker requiere un procesador de 64 bits con las capacidades de virtualización por hardware habilitadas en la BIOS (VT-x para Intel o AMD-V para AMD) y un mínimo recomendado de 4 GB de memoria RAM."
                },
                {
                    title: "Docker en Windows (WSL2)",
                    text: "En Windows 10/11, Docker utiliza el Subsistema de Windows para Linux (WSL2). Esta arquitectura ejecuta un kernel de Linux real y completo de forma nativa, ofreciendo un rendimiento extraordinario y eliminando las antiguas limitaciones de Hyper-V.",
                    code: "# Verificar el estado y versión de las distribuciones en WSL2\nwsl -l -v"
                },
                {
                    title: "Docker en Linux",
                    text: "En distribuciones Linux (Ubuntu, Debian, RHEL, Arch), Docker se ejecuta de forma 100% nativa sin capas de emulación intermedias, proporcionando el máximo rendimiento posible y acceso directo al hardware del servidor.",
                    code: "# Verificar el estado del servicio de Docker en Linux\nsudo systemctl status docker"
                },
                {
                    title: "Docker Desktop",
                    text: "Es una suite completa con interfaz gráfica (GUI) para Windows, Mac y Linux que empaqueta el Docker Engine, la CLI, Docker Compose y un clúster local de Kubernetes en una sola aplicación fácil de instalar y actualizar.",
                    code: "# Consultar la configuración general en la terminal\ndocker info"
                },
                {
                    title: "¿Qué consideraciones de licencia existen?",
                    text: "Docker Desktop es gratuito para uso personal, educativo y pequeñas empresas (menos de 250 empleados). Para grandes corporaciones se requiere una suscripción comercial. En servidores Linux de producción se instala siempre el paquete libre `docker-ce` (Community Edition)."
                }
            ],
            description: "Requisitos de hardware y configuración del entorno de ejecución en Windows (WSL2), servidores Linux nativos y Docker Desktop.",
            code: `# Instalación automatizada de Docker Community Edition en Linux (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Habilitar el servicio en el arranque y agregar el usuario al grupo docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER`,
            syntaxDescription: "El script oficial automatiza la configuración de repositorios y claves GPG. El comando `usermod -aG docker` añade tu usuario al grupo administrativo de Docker, permitiéndote ejecutar comandos sin anteponer `sudo`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En Windows con WSL2, para obtener la máxima velocidad de lectura y escritura en disco, almacena tus proyectos de código dentro del sistema de archivos de Linux (ej. `/home/usuario/proyectos`) y nunca en el sistema de archivos de Windows (`C:\\`).",
                    code: "# Acceder a tu entorno WSL2 desde PowerShell\nwsl\ncd ~/mis-proyectos"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Olvidar cerrar sesión y volver a entrar tras agregarse al grupo `docker` en Linux, lo que provoca el error `permission denied while trying to connect to the Docker daemon socket` al ejecutar comandos.",
                    code: "# Solución inmediata para aplicar el grupo sin cerrar sesión\nnewgrp docker"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "En servidores Linux de producción, configura la rotación automática de logs en el archivo `/etc/docker/daemon.json` para evitar que los registros de los contenedores llenen el disco duro del servidor con el paso de los meses.",
                    code: "{\n  \"log-driver\": \"json-file\",\n  \"log-opts\": {\n    \"max-size\": \"10m\",\n    \"max-file\": \"3\"\n  }\n}"
                }
            ]
        },
        {
            id: "ciclo-vida",
            title: "Ciclo de Vida de un Contenedor",
            content: [
                {
                    title: "Creación (Create)",
                    text: "La fase de creación (`docker create`) instancia el contenedor a partir de una imagen base, preparando su capa temporal de lectura/escritura, variables de entorno y red, pero sin iniciar el proceso en el kernel.",
                    code: "# Crear un contenedor con nombre personalizado sin arrancarlo\ndocker create --name mi-app nginx:alpine"
                },
                {
                    title: "Ejecución (Start / Run)",
                    text: "`docker start` arranca un contenedor previamente creado o detenido. `docker run` es el comando combinado más utilizado que descarga la imagen (si no existe), crea el contenedor y lo arranca en un solo paso.",
                    code: "# Iniciar un contenedor existente y arrancar uno nuevo en un solo paso\ndocker start mi-app\ndocker run -d --name nuevo-web nginx:alpine"
                },
                {
                    title: "Detención (Stop)",
                    text: "La detención (`docker stop`) envía una señal elegante de terminación (`SIGTERM`) al proceso principal del contenedor (PID 1). Esto le otorga un periodo de gracia (10 segundos por defecto) para cerrar conexiones de red y guardar datos antes de enviar la señal de apagado forzoso (`SIGKILL`).",
                    code: "# Detener el contenedor de forma controlada\ndocker stop mi-app"
                },
                {
                    title: "Eliminación (Remove)",
                    text: "La eliminación (`docker rm`) destruye la capa temporal del contenedor y libera el espacio en disco. Como medida de seguridad, Docker solo permite eliminar contenedores detenidos, a menos que se utilice la bandera de forzado.",
                    code: "# Eliminar un contenedor detenido\ndocker rm mi-app"
                },
                {
                    title: "¿Por qué es clave para la automatización?",
                    text: "Comprender este ciclo permite configurar políticas de reinicio automático (`--restart`) para que las aplicaciones se recuperen por sí solas ante caídas del sistema, picos de memoria o reinicios del servidor físico.",
                    code: "# Configurar política de reinicio automático\ndocker run -d --restart unless-stopped --name api-prod mi-api:1.0"
                }
            ],
            description: "Fases operativas y transiciones de estado de un contenedor: Creación, Ejecución, Detención elegante y Eliminación.",
            code: `# 1. Crear un contenedor con nombre personalizado sin arrancarlo
docker create --name mi-app nginx:alpine

# 2. Iniciar el contenedor previamente creado
docker start mi-app

# 3. Detener el contenedor de forma controlada (espera 10s antes de forzar)
docker stop mi-app

# 4. Eliminar el contenedor del sistema (debe estar detenido)
docker rm mi-app`,
            syntaxDescription: "Cada instrucción opera sobre el identificador o nombre único del contenedor (`mi-app`). El comando `docker run` fusiona las etapas de `pull`, `create` y `start` en una única y fluida ejecución.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Cuando utilizas la bandera `--rm` en `docker run`, le indicas al demonio de Docker que destruya y elimine automáticamente el contenedor en el instante exacto en que su proceso interno finalice.",
                    code: "docker run --rm alpine echo 'Contenedor de un solo uso que se autoelimina'"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Utilizar `docker kill` en lugar de `docker stop` para detener contenedores en el trabajo diario. `kill` envía un `SIGKILL` inmediato que no permite cerrar transacciones de bases de datos, arriesgando la corrupción de archivos.",
                    code: "# ❌ Apagado brusco y peligroso para bases de datos\ndocker kill mi-postgres\n\n# ✅ Apagado elegante y seguro\ndocker stop mi-postgres"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para servicios críticos en servidores de producción, configura siempre la política `--restart unless-stopped`. Esto garantiza que el contenedor se reinicie automáticamente ante fallos o si el servidor físico se reinicia.",
                    code: "docker run -d --restart unless-stopped --name api-prod mi-api:1.0"
                }
            ]
        },
        {
            id: "estados",
            title: "Estados de los Contenedores",
            content: [
                {
                    title: "Created (Creado)",
                    text: "El contenedor ha sido instanciado y configurado en el sistema de archivos del demonio de Docker, pero su proceso principal (PID 1) aún no ha sido arrancado por el kernel del sistema operativo.",
                    code: "# Listar contenedores que se encuentran en estado 'created'\ndocker ps -a --filter 'status=created'"
                },
                {
                    title: "Running (En ejecución)",
                    text: "El contenedor está plenamente activo. Su proceso principal se está ejecutando con normalidad, consumiendo ciclos de CPU, memoria RAM y gestionando conexiones de red.",
                    code: "# Listar exclusivamente los contenedores activos en estado 'running'\ndocker ps --filter 'status=running'"
                },
                {
                    title: "Paused (Pausado)",
                    text: "La ejecución del contenedor ha sido congelada temporalmente (`docker pause`). El demonio utiliza la funcionalidad cgroups del kernel de Linux para suspender los procesos sin liberar la memoria RAM, permitiendo reanudarlos de forma instantánea en el punto exacto donde se quedaron.",
                    code: "# Pausar un contenedor y verificar su estado\ndocker pause mi-contenedor\ndocker ps --filter 'status=paused'"
                },
                {
                    title: "Exited (Detenido / Salido)",
                    text: "El proceso principal del contenedor ha finalizado, ya sea de forma programada y exitosa (código de salida 0), por una excepción o error fatal (códigos distintos de 0) o porque fue detenido manualmente por el administrador.",
                    code: "# Listar contenedores detenidos en estado 'exited'\ndocker ps -a --filter 'status=exited'"
                },
                {
                    title: "¿Cómo influye en el diagnóstico de errores?",
                    text: "El código de salida exacto de un contenedor en estado Exited te revela la causa raíz del fallo. Por ejemplo, `Exited (137)` indica que el contenedor fue liquidado por el sistema operativo por consumir demasiada memoria RAM (OOM Killer).",
                    code: "# Consultar el código de salida exacto de un contenedor detenido\ndocker inspect mi-contenedor | grep ExitCode"
                }
            ],
            description: "Análisis técnico de los estados de ciclo de vida en Docker: Created, Running, Paused y Exited, y su relación con los procesos del kernel.",
            code: `# Filtrar y listar contenedores según su estado específico en el sistema
docker ps --filter "status=running"
docker ps --filter "status=exited"

# Congelar (pausar) y reanudar la ejecución de un contenedor activo
docker pause mi-contenedor
docker unpause mi-contenedor`,
            syntaxDescription: "La bandera `--filter` permite realizar consultas avanzadas sobre el estado de los contenedores. Pausar un contenedor es una técnica excelente para liberar uso de CPU en el servidor sin perder el estado actual de la memoria RAM.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Un contenedor existe con el único propósito de mantener vivo a su proceso principal (PID 1). Si ese proceso principal termina, el contenedor pasa inmediatamente e inevitablemente al estado Exited.",
                    code: "# Este contenedor arrancará, imprimirá el texto y pasará a Exited(0) en un segundo\ndocker run alpine echo 'Proceso finalizado'"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Asumir que un contenedor en estado `Exited` ya no ocupa espacio en el disco duro. Aunque no consuma RAM ni CPU, su capa temporal de archivos sigue existiendo hasta que ejecutes explícitamente `docker rm`.",
                    code: "# Limpiar y purgar todos los contenedores detenidos (Exited) de un solo comando\ndocker container prune -f"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Si observas que un contenedor entra en un bucle infinito de reinicios rápidos (`Restarting (1)`), inspecciona sus logs de inmediato para corregir el fallo de arranque en lugar de dejarlo consumir recursos del servidor.",
                    code: "docker logs --tail 50 mi-contenedor-fallido"
                }
            ]
        },
        {
            id: "ejecucion",
            title: "Modalidades de Ejecución de Contenedores",
            content: [
                {
                    title: "Contenedores en primer plano (Foreground / Attached)",
                    text: "Es el comportamiento por defecto al ejecutar `docker run`. La salida estándar (stdout y stderr) del contenedor se enlaza directamente a tu terminal actual, bloqueándola y mostrando los logs en tiempo real hasta que el contenedor se detiene.",
                    code: "# Ejecutar en primer plano (bloquea la terminal)\ndocker run nginx:alpine"
                },
                {
                    title: "Contenedores en segundo plano (Background / Detached)",
                    text: "Se activa mediante la bandera `-d` (`--detach`). El contenedor se inicia de forma asíncrona en segundo plano, devolviendo el ID único del contenedor y liberando tu terminal de inmediato para que puedas seguir ejecutando otros comandos.",
                    code: "# Ejecutar en segundo plano liberando la terminal\ndocker run -d --name mi-web nginx:alpine"
                },
                {
                    title: "Contenedores interactivos (Interactive / TTY)",
                    text: "Se consigue combinando las banderas `-i` (`--interactive`, mantiene abierto el flujo STDIN) y `-t` (`--tty`, emula una pseudoterminal). Es indispensable para abrir consolas de comandos (bash, sh, zsh) dentro de un contenedor.",
                    code: "# Iniciar una sesión de consola interactiva efímera\ndocker run -it --rm ubuntu:22.04 bash"
                },
                {
                    title: "¿Cuándo usar cada modalidad?",
                    text: "Emplea el modo interactivo para depuración, desarrollo y exploración manual; el modo en segundo plano (detached) para servidores web, APIs y bases de datos; y el modo en primer plano para scripts de ejecución única o revisión rápida de logs.",
                    code: "# Entrar de forma interactiva a un contenedor que ya corre en segundo plano\ndocker exec -it mi-web sh"
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Comprensión de los flujos de entrada y salida estándar de los sistemas operativos (stdin, stdout, stderr) y manejo general de la consola de comandos."
                }
            ],
            description: "Diferencias operativas y comandos prácticos para ejecutar contenedores en primer plano (Attached), segundo plano (Detached) e interactivos.",
            code: `# Modo Detached (-d) para servicios continuos en segundo plano
docker run -d --name mi-redis redis:alpine

# Modo Interactivo (-it) para explorar, depurar o compilar manualmente
docker run -it --rm ubuntu:22.04 bash

# Abrir una terminal interactiva dentro de un contenedor que ya corre en segundo plano
docker exec -it mi-redis sh`,
            syntaxDescription: "`docker run -it` crea un nuevo contenedor y te sumerge en su consola. `docker exec -it` ejecuta un proceso secundario (como `sh` o `bash`) dentro de un contenedor que ya se encuentra en execution activa.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Si estás dentro de una sesión de contenedor interactiva y deseas salir a tu terminal anfitriona sin detener el contenedor (desvincularte), presiona la secuencia de teclas `Ctrl + P`, seguido inmediatamente de `Ctrl + Q`.",
                    code: "# Secuencia de desvinculación mágica de Docker (Detach keys)\nCtrl + P, Ctrl + Q"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar ejecutar un servicio de fondo con `docker run -d` pero pasándole un comando que termina de inmediato (ej. `echo` o `ls`). Al finalizar el comando, el contenedor se detendrá al instante.",
                    code: "# ❌ Se detiene al instante tras ejecutar el echo\ndocker run -d ubuntu echo 'hola'\n\n# ✅ Se mantiene corriendo indefinidamente esperando peticiones\ndocker run -d nginx:alpine"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Evita usar el comando `docker attach`. Si te adjuntas a un contenedor y presionas `Ctrl + C`, enviarás una señal SIGINT al proceso principal y apagarás el contenedor. Utiliza siempre `docker exec -it` en su lugar.",
                    code: "docker exec -it mi-contenedor bash"
                }
            ]
        },
        {
            id: "gestion-contenedores",
            title: "Gestión Básica de Contenedores",
            content: [
                {
                    title: "Listar contenedores (PS)",
                    text: "`docker ps` muestra exclusivamente los contenedores activos en ejecución. Para listar absolutamente todos los contenedores del sistema, incluyendo los detenidos (Exited) o creados, se utiliza la bandera `-a` (`--all`).",
                    code: "# Listar todos los contenedores activos e inactivos\ndocker ps -a"
                },
                {
                    title: "Detener contenedores (Stop)",
                    text: "`docker stop` detiene uno o varios contenedores en ejecución de forma limpia y controlada, permitiendo que las aplicaciones guarden su estado en disco y cierren conexiones de red correctamente.",
                    code: "# Detener un contenedor en ejecución\ndocker stop mi-app-web"
                },
                {
                    title: "Eliminar contenedores (RM)",
                    text: "`docker rm` elimina de forma permanente la capa temporal del contenedor. Para destruir un contenedor que se encuentra en ejecución activa sin detenerlo previamente, se añade la bandera de forzado `-f` (`--force`).",
                    code: "# Eliminar un contenedor inactivo o forzar su borrado activo\ndocker rm mi-app-web\ndocker rm -f mi-app-web"
                },
                {
                    title: "Limpieza masiva (Prune)",
                    text: "`docker container prune` es un comando de mantenimiento esencial que busca y elimina de un solo golpe todos los contenedores en estado detenido, recuperando valioso espacio en el disco duro.",
                    code: "# Purgar todos los contenedores detenidos del sistema\ndocker container prune -f"
                },
                {
                    title: "¿Por qué es importante dominar estos comandos?",
                    text: "Constituyen el conjunto de operaciones más frecuentes y repetitivas en el flujo de trabajo diario de cualquier desarrollador de software, ingeniero DevOps o administrador de sistemas."
                }
            ],
            description: "Comandos fundamentales del CLI de Docker para listar, detener, inspeccionar y purgar contenedores en el trabajo diario.",
            code: `# Listar todos los contenedores (activos e inactivos) en el sistema
docker ps -a

# Detener y eliminar un contenedor específico por su nombre
docker stop mi-app-web
docker rm mi-app-web

# Comando avanzado: Detener y borrar TODOS los contenedores del sistema de un solo golpe
docker rm -f $(docker ps -aq)`,
            syntaxDescription: "La expresión `$(docker ps -aq)` extrae únicamente los IDs numéricos (`-q` o quiet) de todos los contenedores (`-a`) y los pasa como lista de argumentos al comando `docker rm -f` para una purga total.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes utilizar el formateo avanzado de plantillas Go (`--format`) en `docker ps` para personalizar las columnas de la terminal y visualizar únicamente los datos que te interesan de forma limpia.",
                    code: "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Asigna siempre nombres claros y descriptivos a tus contenedores utilizando la bandera `--name`. Si omites esta bandera, Docker generará nombres aleatorios difíciles de gestionar (como `quirky_hawking` o `elegant_turing`).",
                    code: "docker run -d --name api-usuarios-dev node:20-alpine"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Antes de ejecutar un `prune` masivo en servidores de producción, verifica con atención qué contenedores están detenidos por mantenimiento programado y cuáles por un fallo real del sistema.",
                    code: "docker container prune -f"
                }
            ]
        },
        {
            id: "gestion-imagenes",
            title: "Gestión y Limpieza de Imágenes",
            content: [
                {
                    title: "Descargar imágenes (Pull)",
                    text: "`docker pull <imagen>:<tag>` descarga una imagen desde un registro de contenedores hacia tu almacenamiento local. Si omites la etiqueta (tag), Docker descargará automáticamente la versión `:latest`.",
                    code: "# Descargar una imagen con una etiqueta específica\ndocker pull redis:7.2-alpine"
                },
                {
                    title: "Listar imágenes (Images)",
                    text: "`docker images` (o `docker image ls`) muestra el inventario de imágenes almacenadas localmente, detallando el repositorio, la etiqueta, el ID de la imagen, la fecha de creación y el tamaño físico que ocupa en disco.",
                    code: "# Listar todas las imágenes locales\ndocker images"
                },
                {
                    title: "Eliminar imágenes (RMI)",
                    text: "`docker rmi <imagen_id>` (o `docker image rm`) elimina una imagen local. Docker prohíbe eliminar una imagen si existe algún contenedor (incluso en estado Exited) que haya sido creado a partir de ella.",
                    code: "# Eliminar una imagen local específica\ndocker rmi redis:7.2-alpine"
                },
                {
                    title: "Imágenes Dangling (Huérfanas)",
                    text: "Son capas de imágenes antiguas que han perdido su etiqueta (mostrándose en la terminal como `<none>:<none>`) al construir una nueva imagen con el mismo nombre. Consumen gigabytes de espacio inútilmente y deben purgarse con regularidad.",
                    code: "# Purgar automáticamente todas las imágenes huérfanas sin etiqueta\ndocker image prune -f"
                },
                {
                    title: "¿Por qué es crucial para el mantenimiento?",
                    text: "Las imágenes de contenedores, especialmente en entornos de desarrollo y servidores de integración continua (CI/CD), acumulan espacio en disco a gran velocidad. Una correcta política de limpieza evita la saturación del almacenamiento del servidor."
                }
            ],
            description: "Estrategias y comandos para la descarga, inventario, inspección y purga de imágenes locales e imágenes huérfanas (dangling).",
            code: `# Listar todas las imágenes almacenadas en el sistema local
docker images

# Descargar una versión específica de una imagen
docker pull redis:7.2-alpine

# Eliminar una imagen local específica
docker rmi redis:7.2-alpine

# Limpiar automáticamente todas las imágenes huérfanas (dangling) del sistema
docker image prune -f`,
            syntaxDescription: "`docker rmi` elimina el puntero y las capas inmutables de la imagen. El comando `docker image prune` detecta y purga de forma inteligente las capas sin etiqueta, respetando todas tus imágenes activas y etiquetadas.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Las imágenes de Docker están construidas mediante un sistema de capas compartidas. Si descargas dos imágenes distintas que comparten la misma capa base (ej. `alpine:3.19`), Docker solo almacena esa capa una vez en el disco duro.",
                    code: "# Inspeccionar el historial de capas que componen una imagen\ndocker history nginx:alpine"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar ejecutar `docker rmi` y recibir el error `image is being used by stopped container`. Para solucionarlo, debes eliminar primero el contenedor inactivo con `docker rm` antes de poder borrar la imagen base.",
                    code: "# Forzar la eliminación de la imagen (usar con precaución)\ndocker rmi -f mi-imagen:1.0"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En servidores de integración continua (CI/CD) como Jenkins o GitHub Actions, programa la ejecución semanal de `docker system prune -af --volumes` para realizar una limpieza profunda y automatizada del servidor.",
                    code: "docker system prune -af --volumes"
                }
            ]
        },
        {
            id: "inspeccion-sistema",
            title: "Inspección del Sistema, Logs y Procesos",
            content: [
                {
                    title: "Información del sistema (Inspect)",
                    text: "`docker inspect` devuelve un documento JSON profundamente detallado con toda la metadata interna de un contenedor o imagen: direcciones IP virtuales, volúmenes montados, variables de entorno, drivers de almacenamiento y estado del proceso.",
                    code: "# Inspeccionar toda la metadata interna de un contenedor\ndocker inspect servidor-web"
                },
                {
                    title: "Logs de contenedores (Logs)",
                    text: "`docker logs` extrae y muestra los flujos de salida estándar (stdout y stderr) generados por la aplicación dentro del contenedor. Es la herramienta de diagnóstico primordial para resolver errores de execution.",
                    code: "# Inspeccionar los últimos 100 logs de un contenedor en tiempo real\ndocker logs -f --tail 100 servidor-web"
                },
                {
                    title: "Procesos internos (Top)",
                    text: "`docker top` muestra los procesos del sistema operativo que se están ejecutando dentro del contenedor, listando sus PIDs, usuarios y comandos exactos tal como los supervisa el kernel de la máquina anfitriona.",
                    code: "# Listar los procesos activos y PIDs dentro del contenedor\ndocker top servidor-web"
                },
                {
                    title: "Eventos del sistema en vivo (Events)",
                    text: "`docker events` transmite en tiempo real un flujo continuo con todos los eventos que ocurren en el demonio de Docker (creación y arranque de contenedores, reinicios automáticos, errores fatales, borrado de imágenes).",
                    code: "# Monitorear en tiempo real los eventos internos del demonio de Docker\ndocker events"
                },
                {
                    title: "¿Por qué es clave para el rol de DevOps?",
                    text: "Estas herramientas nativas te otorgan visibilidad absoluta sobre el comportamiento interno de tus microservicios, permitiéndote diagnosticar problemas complejos de red o permisos sin necesidad de instalar agentes de monitoreo externos."
                }
            ],
            description: "Caja de herramientas de diagnóstico avanzado en Docker: docker inspect, docker logs, docker top y monitoreo de eventos en vivo.",
            code: `# Ver los logs de un contenedor web en tiempo real (modo follow)
docker logs -f --tail 100 servidor-web

# Extraer la dirección IP interna de un contenedor usando inspect y plantillas Go
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' servidor-web

# Listar los procesos activos y PIDs dentro del contenedor
docker top servidor-web`,
            syntaxDescription: "La bandera `-f` (`--follow`) en `docker logs` mantiene la conexión abierta en la terminal mostrando nuevos registros en vivo. La sintaxis `-f '{{...}}'` de inspect permite filtrar directamente el árbol JSON resultante sin recurrir a herramientas externas como `jq`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En Docker, los logs no son archivos de texto planos guardados dentro del contenedor; son flujos capturados por el 'Logging Driver' del demonio (json-file por defecto, pero configurable hacia syslog, fluentd, AWS CloudWatch, etc.).",
                    code: "# Verificar qué logging driver está utilizando un contenedor específico\ndocker inspect -f '{{.HostConfig.LogConfig.Type}}' mi-contenedor"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Ejecutar `docker logs mi-contenedor` en un servicio de producción que lleva meses corriendo sin usar la bandera `--tail`. Esto intentará volcar millones de líneas de golpe en tu terminal, congelándola por completo.",
                    code: "# ✅ Usar siempre tail o since en contenedores antiguos\ndocker logs --tail 200 mi-contenedor\ndocker logs --since 30m mi-contenedor"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Abre una terminal secundaria ejecutando `docker events` cuando estés depurando comportamientos inestables de reinicios automáticos o despliegues CI/CD para observar en tiempo real las decisiones del demonio de Docker.",
                    code: "docker events --filter 'type=container'"
                }
            ]
        },
        {
            id: "puertos-acceso",
            title: "Puertos y Acceso a Aplicaciones (Port Mapping)",
            content: [
                {
                    title: "Mapeo de puertos (Port Binding)",
                    text: "Por defecto, los contenedores viven aislados dentro de su propia red virtual interna. Para que el mundo exterior (o tu máquina local) pueda acceder a una aplicación web o base de datos dentro de un contenedor, es imperativo mapear un puerto del host hacia el puerto del contenedor mediante la bandera `-p` (`--publish`).",
                    code: "# Mapear el puerto 8080 del host hacia el puerto 80 del contenedor\ndocker run -d --name mi-web -p 8080:80 nginx:alpine"
                },
                {
                    title: "Sintaxis estricta del mapeo",
                    text: "La sintaxis posicional es `-p <puerto_host>:<puerto_contenedor>`. Por ejemplo, la regla `-p 8080:80` enlaza el puerto 8080 de tu máquina física anfitriona con el puerto 80 interno donde escucha el servidor web Nginx.",
                    code: "# Mapear puertos para un entorno de desarrollo Node.js\ndocker run -d -p 3000:3000 node:20-alpine"
                },
                {
                    title: "Acceso desde el navegador",
                    text: "Una vez establecido el mapeo, puedes abrir tu navegador web e ingresar a `http://localhost:8080` (en tu entorno local) o la IP pública de tu servidor para interactuar fluidamente con la aplicación contenedorizada.",
                    code: "# Probar la respuesta HTTP del contenedor desde la terminal local\ncurl http://localhost:8080"
                },
                {
                    title: "Exposición de servicios (EXPOSE)",
                    text: "La instrucción `EXPOSE` dentro de un archivo Dockerfile sirve de forma exclusiva como metadato de documentación para indicar qué puertos escucha la aplicación internamente; NO publica ni abre puertos en el host automáticamente.",
                    code: "# En el Dockerfile (documentación interna)\nEXPOSE 80"
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite ejecutar múltiples contenedores idénticos que internamente utilizan el mismo puerto (ej. tres contenedores de Nginx en el puerto 80), mapeándolos hacia puertos externos completamente distintos en el host (8081, 8082, 8083).",
                    code: "# Consultar la tabla exacta de reenvío de puertos de un contenedor\ndocker port mi-web"
                }
            ],
            description: "Mecanismos de comunicación externa, reglas de mapeo de puertos entre el host y el contenedor, y acceso a servicios web.",
            code: `# Ejecutar un servidor Nginx exponiendo su puerto 80 interno al puerto 8080 externo
docker run -d --name mi-web -p 8080:80 nginx:alpine

# Consultar las reglas de mapeo de puertos activas de un contenedor
docker port mi-web`,
            syntaxDescription: "`docker port` muestra la tabla exacta de reenvío de paquetes. Al acceder a `localhost:8080`, el demonio de Docker y las reglas nativas de iptables del kernel redirigen el tráfico de red hacia el puerto 80 del contenedor.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes restringir el enlace de puertos a una interfaz de red específica de tu máquina host. Por ejemplo, `-p 127.0.0.1:8080:80` asegura que el servicio solo sea accesible desde tu propio portátil y no desde la red pública externa.",
                    code: "# Aislar una base de datos para que solo escuche peticiones locales del host\ndocker run -d -p 127.0.0.1:3306:3306 mysql:8.0"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar mapear un puerto del host que ya está ocupado por otra aplicación local (como un servidor Apache local, Skype o un servicio del sistema), provocando el error fatal `Bind for 0.0.0.0:80 failed: port is already allocated`.",
                    code: "# Solución: Asignar un puerto libre en el host\ndocker run -d -p 8888:80 nginx:alpine"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En arquitecturas multi-contenedor gestionadas con Docker Compose, no mapees los puertos de tus bases de datos (`-p 5432:5432`) hacia el host en producción; permite que los microservicios se comuniquen de forma segura a través de la red interna virtual.",
                    code: "# En docker-compose.yml, utilizar 'expose' en lugar de 'ports' para bases de datos"
                }
            ]
        },
        {
            id: "variables-entorno",
            title: "Variables de Entorno en Contenedores",
            content: [
                {
                    title: "Configuración de aplicaciones (The 12-Factor App)",
                    text: "Siguiendo los estándares de la arquitectura moderna (12-Factor App), cualquier configuración que varíe entre entornos de despliegue (credenciales de bases de datos, claves de APIs, modos de ejecución dev/prod) debe almacenarse estrictamente en variables de entorno, nunca hardcodeada en el código fuente.",
                    code: "# Inyectar el entorno de ejecución como variable\ndocker run -d -e NODE_ENV=production mi-api:1.0"
                },
                {
                    title: "Personalización de contenedores (-e)",
                    text: "Docker permite inyectar variables de entorno dinámicas en el instante de instanciar el contenedor utilizando la bandera `-e` (`--env`). Esto hace posible utilizar exactamente la misma imagen inmutable en desarrollo, staging y producción cambiando únicamente los valores de las variables.",
                    code: "# Inyectar múltiples variables de entorno individuales desde el CLI\ndocker run -d --name mi-db -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=tienda mysql:8.0"
                },
                {
                    title: "Archivos de entorno (--env-file)",
                    text: "Para gestionar arquitecturas complejas con decenas de variables sin saturar la línea de comandos de la terminal, puedes agruparlas dentro de un archivo de texto plano (comúnmente denominado `.env`) y cargarlas de un solo comando con `--env-file`.",
                    code: "# Cargar un bloque completo de variables desde un archivo externo (.env)\ndocker run -d --name mi-backend --env-file ./config.env mi-api:1.0"
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Elimina por completo la necesidad de reconstruir la imagen de Docker cada vez que cambias una contraseña, una URL de conexión o un parámetro de configuración del servidor.",
                    code: "# Inspeccionar las variables activas dentro de un contenedor en ejecución\ndocker exec mi-db env"
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimiento sobre el manejo de variables de entorno en sistemas operativos y lenguajes de programación (ej. `process.env` en Node.js, `os.getenv()` en Python o `System.getenv()` en Java)."
                }
            ],
            description: "Inyección de configuración dinámica y gestión de secretos en contenedores mediante variables de entorno (-e y --env-file).",
            code: `# Inyectar variables de entorno individuales directamente desde el CLI
docker run -d --name mi-db -e MYSQL_ROOT_PASSWORD=supersecreto -e MYSQL_DATABASE=tienda mysql:8.0

# Cargar un bloque completo de variables desde un archivo externo (.env)
docker run -d --name mi-backend --env-file ./config.env mi-api:1.0

# Verificar las variables de entorno activas dentro de un contenedor en ejecución
docker exec mi-db env`,
            syntaxDescription: "La bandera `-e` define pares `CLAVE=VALOR`. La bandera `--env-file` lee y parsea archivos de texto plano con el mismo formato clave-valor, ignorando líneas vacías o comentarios iniciados con `#`. `docker exec mi-db env` lista el entorno del contenedor.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "La gran mayoría de las imágenes oficiales en Docker Hub (como MySQL, Postgres, WordPress, MongoDB o RabbitMQ) están programadas en sus scripts de arranque (`entrypoint.sh`) para reaccionar y autoconfigurarse según las variables de entorno que les inyectes.",
                    code: "# Levantar y autoconfigurar Postgres pasándole credenciales por variables\ndocker run -d -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123 postgres:16-alpine"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Dejar espacios en blanco alrededor del signo igual al defining variables en archivos `.env` o en el CLI, lo que provoca que el sistema operativo del contenedor asigne nombres o valores corruptos a las variables.",
                    code: "# ❌ Mal: Genera errores de parseo en el contenedor\nAPI_KEY = abc123\n\n# ✅ Bien: Sin espacios\nAPI_KEY=abc123"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Jamás confirmes (commit) archivos `.env` con contraseñas reales o claves de producción en tus repositorios de Git. Sube siempre un archivo de plantilla `.env.example` con valores de muestra o vacíos.",
                    code: "# En tu archivo .gitignore\n.env\n*.secret\n.env.production"
                }
            ]
        }
    ]
};
