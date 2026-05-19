export const construccionArquitecturaCategory = {
    title: "2. Construcción y Arquitectura Avanzada",
    topics: [
        {
            id: "dockerfile",
            title: "Dockerfile: Estructura e Instrucciones",
            content: [
                {
                    title: "¿Qué es un Dockerfile?",
                    text: "Un Dockerfile es un archivo de texto plano que contiene una serie de instrucciones secuenciales y declarativas que el demonio de Docker ejecuta para ensamblar y construir una imagen de contenedor inmutable."
                },
                {
                    title: "Estructura básica",
                    text: "Sigue un modelo apilado donde cada instrucción genera una nueva capa en la imagen. Comienza invariablemente definiendo una imagen base, configura el entorno de trabajo, copia los archivos del proyecto, ejecuta comandos de instalación de dependencias y finaliza declarando el comando de arranque del contenedor."
                },
                {
                    title: "Instrucciones principales (FROM, WORKDIR, COPY, RUN)",
                    text: "`FROM` establece la imagen base (ej. `node:20-alpine`). `WORKDIR` define el directorio de trabajo interno. `COPY` transfiere archivos desde el host hacia el contenedor. `RUN` ejecuta comandos durante el proceso de construcción (ej. `npm install`).",
                    code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . ."
                },
                {
                    title: "Instrucciones de ejecución (CMD vs ENTRYPOINT)",
                    text: "`ENTRYPOINT` configura el contenedor para que se comporte como un binario ejecutable fijo. `CMD` define los argumentos o el comando por defecto que se ejecutará si el usuario no especifica uno al hacer `docker run`. Ambos pueden combinarse para máxima flexibilidad.",
                    code: "ENTRYPOINT [\"node\"]\nCMD [\"src/index.js\"]"
                },
                {
                    title: "¿Por qué es importante dominarlo?",
                    text: "El Dockerfile es la piedra angular de la infraestructura como código (IaC) en la contenedorización. Define de forma explícita y auditable cómo se construye y empaqueta tu software."
                }
            ],
            description: "Análisis profundo de la sintaxis, estructura declarativa e instrucciones fundamentales para escribir archivos Dockerfile profesionales.",
            code: `# Ejemplo de Dockerfile profesional para una aplicación Node.js
FROM node:20.11.0-alpine

# Establecer el directorio de trabajo interno
WORKDIR /usr/src/app

# Copiar primero los manifiestos de dependencias para aprovechar la caché
COPY package*.json ./

# Instalar dependencias de producción de forma limpia
RUN npm ci --only=production

# Copiar el resto del código fuente del proyecto
COPY . .

# Documentar el puerto en el que escucha la aplicación
EXPOSE 3000

# Configurar el comando de arranque del contenedor
CMD ["node", "src/index.js"]`,
            syntaxDescription: "La instrucción `FROM` utiliza una imagen Alpine ultraligera. El uso de `npm ci` garantiza una instalación de dependencias estricta y determinista basada en el archivo `package-lock.json`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Existe una diferencia técnica crucial entre `COPY` y `ADD`. `COPY` transfiere archivos locales de forma directa. `ADD` tiene capacidades adicionales complejas, como desempaquetar archivos TAR automáticamente o descargar recursos desde URLs remotas.",
                    code: "# ✅ Usar COPY para archivos normales (recomendado por simplicidad y transparencia)\nCOPY ./src /app/src\n\n# ⚠️ Usar ADD solo cuando necesites auto-descomprimir un archivo TAR\nADD app-backup.tar.gz /app"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Copiar todo el proyecto (`COPY . .`) antes de ejecutar la instalación de dependencias (`RUN npm install`). Esto provoca que cualquier cambio menor en el código fuente invalide la caché de dependencias, forzando a descargar todas las librerías en cada build.",
                    code: "# ❌ Mal: Invalida la caché de dependencias ante cualquier cambio de código\nCOPY . .\nRUN npm install\n\n# ✅ Bien: Separa la copia del package.json para cachear el npm install\nCOPY package*.json ./\nRUN npm install\nCOPY . ."
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Crea siempre un archivo `.dockerignore` en la raíz de tu proyecto para excluir carpetas pesadas (como `node_modules`, `.git` o builds locales) de la transferencia del contexto de construcción, acelerando drásticamente el comando `docker build`.",
                    code: "# En tu archivo .dockerignore\nnode_modules\nnpm-debug.log\n.git\ndist"
                }
            ]
        },
        {
            id: "imagenes-personalizadas",
            title: "Creación y Versionamiento de Imágenes",
            content: [
                {
                    title: "Construcción de imágenes (Build)",
                    text: "El comando `docker build` lee un archivo Dockerfile y el contexto de archivos actual para ensamblar y compilar una nueva imagen de contenedor en tu almacenamiento local.",
                    code: "# Construir una imagen a partir del Dockerfile en el directorio actual\ndocker build -t mi-api:v1 ."
                },
                {
                    title: "El contexto de construcción (Build Context)",
                    text: "Es el conjunto de archivos y carpetas ubicados en la ruta especificada al ejecutar `docker build`. El CLI empaqueta este contexto y se lo envía al demonio de Docker para que pueda ejecutar las instrucciones `COPY` o `ADD`.",
                    code: "# Especificar un Dockerfile en otra ruta manteniendo el contexto actual\ndocker build -f ./docker/Dockerfile ."
                },
                {
                    title: "Versionamiento de imágenes",
                    text: "Al igual que el código fuente se versiona con Git (v1.0.0, v1.1.0), las imágenes de contenedores deben versionarse estrictamente utilizando etiquetas (tags) para identificar qué versión de la aplicación contienen.",
                    code: "# Construir asignando una etiqueta de versión semántica\ndocker build -t miapp:v1.0.0 ."
                },
                {
                    title: "Etiquetas (Tags)",
                    text: "La bandera `-t` (`--tag`) permite asignar un nombre de repositorio y una etiqueta a la imagen con el formato `usuario/repositorio:etiqueta` (ej. `miempresa/api-usuarios:v2.1.0`).",
                    code: "# Asignar una etiqueta adicional a una imagen existente\ndocker tag miapp:v1.0.0 miapp:latest"
                },
                {
                    title: "¿Por qué es crucial para despliegues seguros?",
                    text: "El correcto versionamiento permite realizar despliegues continuos seguros y, en caso de fallos críticos en producción, hacer un rollback instantáneo simplemente ejecutando el contenedor con la etiqueta de la versión anterior."
                }
            ],
            description: "Mecanismos de compilación, gestión del contexto de construcción y estrategias profesionales de etiquetado y versionamiento semántico.",
            code: `# Construir una imagen asignándole un repositorio y un tag de versión semántica
docker build -t miempresa/mi-backend:v1.0.0 .

# Asignar una etiqueta adicional (ej. latest) a una imagen ya existente
docker tag miempresa/mi-backend:v1.0.0 miempresa/mi-backend:latest

# Subir (push) la imagen versionada a un registro de contenedores (Docker Hub)
docker push miempresa/mi-backend:v1.0.0`,
            syntaxDescription: "El punto final (`.`) en `docker build` indica que el contexto de construcción es el directorio actual. El comando `docker tag` crea un nuevo puntero de referencia hacia el mismo ID de imagen base sin duplicar espacio en disco.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes pasar variables dinámicas en tiempo de construcción hacia el Dockerfile utilizando la bandera `--build-arg`. Esto es ideal para inyectar números de compilación, versiones de dependencias o claves temporales de instalación.",
                    code: "# En el Dockerfile: ARG VERSION_NODE=20\ndocker build --build-arg VERSION_NODE=22 -t mi-app:v2 ."
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Construir imágenes desde el directorio raíz de tu ordenador o desde carpetas con gigabytes de archivos irrelevantes sin un `.dockerignore`. El demonio intentará empaquetar y transferir todo ese volumen de datos, colapsando la memoria RAM y el disco.",
                    code: "# ✅ Asegúrate de ejecutar docker build solo dentro del directorio del proyecto\ncd /proyectos/mi-servicio && docker build -t api:1.0 ."
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En flujos de CI/CD avanzados, etiqueta tus imágenes utilizando el hash corto del commit de Git (SHA) junto con la versión semántica. Esto establece una trazabilidad absoluta entre el contenedor en producción y la línea de código exacta que lo generó.",
                    code: "docker build -t mi-app:v1.2.0-$(git rev-parse --short HEAD) ."
                }
            ]
        },
        {
            id: "capas-layers",
            title: "Capas (Layers) y Caché de Construcción",
            content: [
                {
                    title: "Cómo funciona el sistema de capas (UnionFS / Overlay2)",
                    text: "Una imagen de Docker está compuesta por una pila de capas inmutables de solo lectura, gestionadas mediante sistemas de archivos de unión (como OverlayFS). Cada instrucción del Dockerfile (`FROM`, `RUN`, `COPY`) crea una nueva capa que representa los cambios en el sistema de archivos respecto a la capa inferior.",
                    code: "# Inspeccionar el historial de capas de una imagen\ndocker history mi-imagen:tag"
                },
                {
                    title: "La caché de construcción (Build Cache)",
                    text: "Al ejecutar `docker build`, el demonio revisa si ya posee una capa en caché que coincida exactamente con la instrucción actual. Si la encuentra, reutiliza la capa existente en lugar de ejecutar la instrucción de nuevo, acelerando la construcción drásticamente.",
                    code: "# Aprovechar la caché en compilaciones repetitivas\ndocker build -t mi-api:v2 ."
                },
                {
                    title: "Invalidador de caché",
                    text: "La caché funciona en cascada. Si una instrucción cambia (ej. modificas una línea de código en un archivo transferido con `COPY`), Docker invalida la caché para esa capa y para absolutamente TODAS las capas subsiguientes.",
                    code: "# Forzar una compilación limpia ignorando la caché existente\ndocker build --no-cache -t mi-api:v2 ."
                },
                {
                    title: "Optimización del orden de instrucciones",
                    text: "Para maximizar el uso de la caché, las instrucciones que cambian con menor frecuencia (como la instalación de herramientas del SO o librerías) deben colocarse en la parte superior del Dockerfile, mientras que los archivos de código fuente (que cambian constantemente) deben colocarse al final.",
                    code: "COPY package*.json ./\nRUN npm install\nCOPY . ."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Reduce los tiempos de compilación en flujos de integración continua (CI/CD) de varios minutos a apenas unos pocos segundos."
                }
            ],
            description: "Arquitectura del sistema de archivos por capas (Overlay2), funcionamiento de la caché en cascada y estrategias de ordenamiento en el Dockerfile.",
            code: `# Inspeccionar el historial de capas, tamaño y comandos de una imagen
docker history miempresa/mi-backend:v1.0.0

# Ejecutar una compilación forzando al demonio a ignorar la caché (Build limpio)
docker build --no-cache -t miempresa/mi-backend:v1.0.0 .`,
            syntaxDescription: "`docker history` desglosa visualmente la pila inmutable de la imagen, mostrando qué instrucción exacta del Dockerfile generó cada capa y cuántos megabytes ocupa de forma individual.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Cuando un contenedor se arranca a partir de una imagen, Docker añade una única capa superior de lectura y escritura (Container Layer). Todos los cambios, escrituras y borrados temporales que hace la aplicación ocurren exclusivamente en esta capa efímera.",
                    code: "# La capa del contenedor desaparece al ejecutar docker rm\ndocker rm -f mi-contenedor"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Agrupa múltiples comandos de ejecución en una sola instrucción `RUN` utilizando el operador lógico `&&` y barras invertidas `\\`. Esto genera una sola capa en lugar de múltiples capas redundantes en disco.",
                    code: "# ✅ Buena práctica: Genera una sola capa limpia en disco\nRUN apt-get update && apt-get install -y curl wget \\ \n    && rm -rf /var/lib/apt/lists/*"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Al instalar paquetes de sistema en distribuciones Linux (apt, apk, yum), incluye siempre la eliminación de las cachés del gestor de paquetes dentro de la misma instrucción `RUN`. Si lo haces en un `RUN` posterior, el espacio ya habrá quedado grabado en la capa anterior.",
                    code: "RUN apk add --no-cache curl git"
                }
            ]
        },
        {
            id: "persistencia-datos",
            title: "Persistencia de Datos en Contenedores",
            content: [
                {
                    title: "El problema de los datos efímeros",
                    text: "Por diseño arquitectónico, los contenedores son entidades efímeras, descartables e inmutables. Toda la información que una aplicación escribe dentro del sistema de archivos interno del contenedor se almacena en la capa temporal de lectura/escritura (Container Layer).",
                    code: "# Crear un archivo temporal en un contenedor efímero\ndocker run --name test ubuntu bash -c \"echo 'data' > /file.txt\""
                },
                {
                    title: "Riesgos de la volatilidad",
                    text: "Si el contenedor se detiene, se corrompe, se reinicia en otro nodo o es eliminado mediante `docker rm`, la capa de lectura/escritura se destruye por completo, provocando la pérdida catastrófica e irreversible de toda la información guardada en ella.",
                    code: "# Eliminar el contenedor destruye su capa temporal de lectura/escritura\ndocker rm -f test"
                },
                {
                    title: "El concepto de Persistencia de Datos",
                    text: "La persistencia es el mecanismo que permite desacoplar los datos generados por la aplicación del ciclo de vida del contenedor, almacenándolos en una ubicación segura y permanente en el sistema de archivos de la máquina anfitriona (Host)."
                },
                {
                    title: "Mecanismos de persistencia en Docker",
                    text: "Docker proporciona dos mecanismos primordiales para lograr la persistencia de datos: Volúmenes (Volumes), gestionados directamente por el demonio de Docker, y Bind Mounts, que enlazan rutas específicas del host.",
                    code: "# Crear un volumen gestionado por Docker para persistencia\ndocker volume create mi-volumen"
                },
                {
                    title: "¿Por qué es vital para servicios con estado (Stateful)?",
                    text: "Es el requisito fundamental para poder ejecutar bases de datos (PostgreSQL, MySQL, MongoDB), colas de mensajería o sistemas de almacenamiento de archivos dentro de contenedores sin arriesgar la integridad de los datos de negocio."
                }
            ],
            description: "El desafío de la volatilidad en la capa efímera del contenedor y la necesidad arquitectónica de desacoplar el almacenamiento persistente.",
            code: `# Comprobar la efimeridad: Crear un archivo en un contenedor y ver cómo se pierde
docker run --name prueba-efimera ubuntu bash -c "echo 'datos importantes' > /archivo.txt"
docker rm prueba-efimera

# Si creas un nuevo contenedor, el archivo ya no existirá
docker run --rm ubuntu ls /archivo.txt # Devuelve error: No such file or directory`,
            syntaxDescription: "El experimento demuestra de forma incontestable que el ciclo de vida del almacenamiento interno está rígidamente atado al ciclo de vida del contenedor. Al eliminar el contenedor con `docker rm`, el archivo `/archivo.txt` se desvanece.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Además de los Volúmenes y Bind Mounts, Docker ofrece un tercer tipo de montaje en Linux llamado `tmpfs`. Este mecanismo almacena los archivos exclusivamente en la memoria RAM del host, ideal para guardar secretos temporales o cachés de alta velocidad que nunca deben tocar el disco físico.",
                    code: "docker run -d --tmpfs /app/cache nginx:alpine"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Ejecutar una base de datos en producción sin configurar ningún volumen ni bind mount. El sistema funcionará perfectamente durante meses, hasta que una actualización o reinicio del contenedor borre toda la base de datos en un segundo.",
                    code: "# ❌ Catástrofe garantizada en producción\ndocker run -d --name mi-db mysql:8.0\n\n# ✅ Arquitectura robusta y segura\ndocker run -d --name mi-db -v db_data:/var/lib/mysql mysql:8.0"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Al diseñar arquitecturas nativas en la nube (cloud-native), mantén tus contenedores de aplicación web y APIs completamente sin estado (Stateless). Delega toda la persistencia de datos hacia bases de datos externas o almacenamiento de objetos (como AWS S3).",
                    code: "# Las APIs web deben poder destruirse y replicarse sin perder datos"
                }
            ]
        },
        {
            id: "volumenes",
            title: "Volúmenes (Volumes): Creación y Gestión",
            content: [
                {
                    title: "¿Qué es un Volumen en Docker?",
                    text: "Un Volumen es un objeto de almacenamiento nativo creado y gestionado de forma exclusiva por el demonio de Docker. Se almacena dentro de una estructura de directorios dedicada en el sistema de archivos del host (ej. `/var/lib/docker/volumes/` en Linux), completamente aislada de los procesos ajenos a Docker.",
                    code: "# Crear un volumen nativo en Docker\ndocker volume create mi-volumen"
                },
                {
                    title: "Tipos de volúmenes (Anónimos vs Nombrados)",
                    text: "Los volúmenes anónimos carecen de nombre explícito y reciben un hash aleatorio largo; se eliminan difícilmente si se pierde su referencia. Los volúmenes nombrados (Named Volumes) tienen un identificador claro (ej. `pg_data`), persisten indefinidamente y son el estándar de oro para bases de datos.",
                    code: "# Montar un volumen nombrado en un contenedor\ndocker run -d -v mi-volumen:/data nginx:alpine"
                },
                {
                    title: "Ventajas sobre el almacenamiento directo",
                    text: "Ofrecen un rendimiento de entrada/salida (I/O) superior, son fáciles de respaldar o migrar, funcionan de forma idéntica en Windows, Mac y Linux, y pueden ser gestionados directamente mediante el CLI de Docker.",
                    code: "# Inspeccionar los detalles y ruta en el host de un volumen\ndocker volume inspect mi-volumen"
                },
                {
                    title: "Compartición de datos",
                    text: "Un mismo volumen nombrado puede ser montado y compartido simultáneamente por múltiples contenedores, permitiendo que varios microservicios accedan a un repositorio de archivos común de forma segura.",
                    code: "# Compartir un volumen entre múltiples contenedores\ndocker run -d -v mi-volumen:/data app1\ndocker run -d -v mi-volumen:/data app2"
                },
                {
                    title: "¿Por qué es la mejor práctica de persistencia?",
                    text: "Al estar gestionados por Docker, evitan los típicos y complejos problemas de permisos de archivos del sistema operativo anfitrión que suelen ocurrir al utilizar Bind Mounts.",
                    code: "# Listar todos los volúmenes en el sistema\ndocker volume ls"
                }
            ],
            description: "Gestión avanzada de volúmenes nombrados nativos de Docker, ventajas de rendimiento, aislamiento del host y compartición entre contenedores.",
            code: `# 1. Crear un volumen nombrado de forma explícita
docker volume create mi-volumen-datos

# 2. Inspeccionar la ubicación física del volumen en el host
docker volume inspect mi-volumen-datos

# 3. Montar el volumen nombrado en un contenedor de PostgreSQL
docker run -d --name base-datos -v mi-volumen-datos:/var/lib/postgresql/data postgres:16-alpine

# 4. Listar todos los volúmenes gestionados por Docker
docker volume ls`,
            syntaxDescription: "La bandera `-v` (`--volume`) utiliza la sintaxis `<nombre_volumen>:<ruta_contenedor>`. Al especificar `mi-volumen-datos`, Docker monta automáticamente el directorio gestionado del host sobre la ruta interna `/var/lib/postgresql/data`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Si montas un volumen nombrado vacío sobre un directorio del contenedor que ya contiene archivos (ej. `/usr/share/nginx/html`), Docker copiará automáticamente el contenido existente del contenedor hacia el volumen antes de realizar el montaje.",
                    code: "# El volumen se inicializa con los archivos base de la imagen\ndocker run -d -v web_assets:/usr/share/nginx/html nginx:alpine"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Utiliza siempre la sintaxis moderna y explícita `--mount` en lugar de `-v` cuando necesites configuraciones avanzadas o mayor claridad en tus scripts de despliegue, ya que su estructura clave-valor es mucho más autoexplicativa.",
                    code: "docker run -d --name web --mount source=mi-volumen,target=/app nginx:alpine"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Realiza copias de seguridad (backups) periódicas de tus volúmenes de bases de datos levantando un contenedor temporal inmutable que monte el volumen y comprima los archivos en un TAR guardado en el host.",
                    code: "docker run --rm -v mi-volumen-datos:/datos -v $(pwd):/backup alpine tar czvf /backup/backup.tar.gz /datos"
                }
            ]
        },
        {
            id: "bind-mounts",
            title: "Bind Mounts: Conexión Directa al Host",
            content: [
                {
                    title: "¿Qué es un Bind Mount?",
                    text: "Un Bind Mount es un mecanismo de montaje directo que enlaza una ruta de directorio o archivo específico de tu máquina física anfitriona (Host) directamente dentro de una ruta del sistema de archivos del contenedor.",
                    code: "# Enlazar un directorio del host con el contenedor\ndocker run -d -v /path/host:/path/container nginx:alpine"
                },
                {
                    title: "Diferencia fundamental con Volúmenes",
                    text: "Mientras que los volúmenes viven dentro de un espacio protegido y gestionado por Docker (`/var/lib/docker`), los Bind Mounts pueden apuntar a absolutamente cualquier parte de tu ordenador (ej. `/home/usuario/mi-proyecto` o `C:\\proyectos`).",
                    code: "# Montar un directorio de proyectos en Windows\ndocker run -d -v C:\\proyectos:/app node:20"
                },
                {
                    title: "El caso de uso rey: Desarrollo local (Live Reload)",
                    text: "Es la herramienta insustituible para el desarrollo local. Al montar tu carpeta de código fuente dentro del contenedor, cualquier cambio que hagas en tu editor (VS Code, IntelliJ) se refleja instantáneamente dentro del contenedor, permitiendo usar herramientas de recarga en vivo (Nodemon, Vite, Webpack) sin reconstruir la imagen.",
                    code: "# Montar el código actual para desarrollo con recarga en vivo\ndocker run -d -v $(pwd):/app -p 3000:3000 node:20 npm run dev"
                },
                {
                    title: "Desventajas y riesgos",
                    text: "Dependen de la estructura de directorios específica de la máquina anfitriona, lo que reduce la portabilidad. Además, exponen el sistema de archivos del host a posibles modificaciones no autorizadas o problemas complejos de permisos de usuario (UID/GID).",
                    code: "# Probar el montaje en modo de solo lectura (Read-Only)\ndocker run -d -v $(pwd):/app:ro nginx:alpine"
                },
                {
                    title: "¿Cuándo evitar su uso?",
                    text: "Nunca utilices Bind Mounts para bases de datos en entornos de producción; emplea siempre Volúmenes nombrados para garantizar el rendimiento y la seguridad."
                }
            ],
            description: "Mecanismo de enlace directo de directorios del host, diferencias con volúmenes nativos y su aplicación estelar en el desarrollo local con recarga en vivo.",
            code: `# Montar el directorio actual del host dentro de /app en el contenedor (Sintaxis -v)
docker run -d --name dev-server -v $(pwd):/app -p 3000:3000 node:20-alpine npm run dev

# Mismo montaje utilizando la sintaxis moderna y estricta --mount
docker run -d --name dev-server --mount type=bind,source=$(pwd),target=/app -p 3000:3000 node:20-alpine npm run dev`,
            syntaxDescription: "La expresión `$(pwd)` (Print Working Directory) extrae la ruta absoluta del directorio actual en Linux/macOS (en PowerShell de Windows se utiliza `${PWD}`). Cualquier modificación en el host altera de forma inmediata los archivos en `/app`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes configurar un Bind Mount en modo de solo lectura añadiendo la bandera `:ro` (Read-Only) al final de la sintaxis. Esto protege los archivos de tu ordenador para que el contenedor pueda leerlos pero jamás modificarlos ni borrarlos.",
                    code: "# Proteger el código del host montándolo como solo lectura\ndocker run -d -v $(pwd):/app:ro mi-imagen:1.0"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Montar un Bind Mount desde el host sobre una carpeta del contenedor que contiene dependencias instaladas (ej. montar tu proyecto sin `node_modules` sobre `/app` en el contenedor). El montaje ocultará y sobrescribirá la carpeta interna, rompiendo la aplicación.",
                    code: "# Solución: Crear un volumen anónimo interno para proteger los node_modules del contenedor\ndocker run -d -v $(pwd):/app -v /app/node_modules node:20 npm run dev"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En sistemas Linux, asegúrate de que el usuario interno del contenedor (definido con la instrucción `USER` en el Dockerfile) tenga el mismo UID (User ID, comúnmente 1000) que tu usuario del host para evitar problemas de permisos denegados al editar archivos.",
                    code: "# Ejecutar el contenedor con tu UID local\ndocker run -u $(id -u):$(id -g) -v $(pwd):/app mi-imagen"
                }
            ]
        },
        {
            id: "redes",
            title: "Redes en Docker: Aislamiento y Comunicación",
            content: [
                {
                    title: "¿Cómo funciona el Networking en Docker?",
                    text: "Docker gestiona la comunicación de red mediante controladores nativos (Network Drivers) que virtualizan la infraestructura de red, permitiendo que los contenedores se comuniquen entre sí, con el host o con redes externas de forma completamente segura y aislada.",
                    code: "# Listar las redes virtuales existentes en Docker\ndocker network ls"
                },
                {
                    title: "Tipos de redes principales (Bridge, Host, None, Overlay)",
                    text: "`bridge` es la red virtual por defecto; aísla los contenedores en una subred interna. `host` elimina el aislamiento de red, haciendo que el contenedor comparta directamente la IP y puertos de la máquina anfitriona. `none` deshabilita toda la red. `overlay` conecta contenedores distribuidos en múltiples servidores físicos (Docker Swarm).",
                    code: "# Crear una red virtual con el driver bridge\ndocker network create --driver bridge mi-red"
                },
                {
                    title: "Comunicación por nombres (DNS interno)",
                    text: "Al crear una red virtual personalizada (User-defined Bridge), Docker habilita un servidor DNS nativo interno. Esto permite que los contenedores se comuniquen entre sí utilizando directamente el nombre del contenedor como nombre de dominio (ej. conectar a `http://api-backend:8080`), eliminando el uso de direcciones IP inestables.",
                    code: "# Conectar un contenedor a una red virtual por nombre\ndocker run -d --name api --network mi-red node:20"
                },
                {
                    title: "Puertos internos vs externos",
                    text: "Los contenedores conectados a la misma red virtual pueden comunicarse libremente a través de todos sus puertos internos sin restricciones. La publicación de puertos (`-p`) solo es necesaria para permitir el acceso desde fuera de la red virtual de Docker.",
                    code: "# Publicar puertos al exterior del host\ndocker run -d -p 8080:80 nginx:alpine"
                },
                {
                    title: "¿Por qué es crucial para microservicios?",
                    text: "Permite segmentar la arquitectura en subredes aisladas. Por ejemplo, puedes crear una red pública para el Frontend y una red privada exclusiva para el Backend y la Base de datos.",
                    code: "# Inspeccionar la configuración y contenedores de una red\ndocker network inspect mi-red"
                }
            ],
            description: "Controladores de red nativos (Bridge, Host, Overlay), resolución DNS interna por nombres de contenedor y segmentación de microservicios.",
            code: `# 1. Crear una red virtual aislada definida por el usuario
docker network create red-microservicios

# 2. Levantar una base de datos conectada a la red creada
docker run -d --name mi-postgres --network red-microservicios -e POSTGRES_PASSWORD=123 postgres:16-alpine

# 3. Levantar un backend en la misma red conectándose por el nombre del contenedor
docker run -d --name mi-backend --network red-microservicios -e DB_HOST=mi-postgres mi-api:1.0

# 4. Inspeccionar la topología y contenedores conectados a la red
docker network inspect red-microservicios`,
            syntaxDescription: "La bandera `--network` vincula los contenedores a la misma subred virtual. El contenedor `mi-backend` resuelve la variable `DB_HOST=mi-postgres` de forma automática hacia la IP interna asignada a la base de datos.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "La red por defecto de Docker (llamada `bridge`) es una red heredada (legacy) que carece de resolución DNS automática por nombres de contenedor. Para que los contenedores se comuniquen por nombre, debes crear siempre una red personalizada.",
                    code: "# ❌ En la red por defecto no funciona el ping por nombre\n# ✅ En una red personalizada (docker network create) funciona perfectamente"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Intentar conectar dos contenedores ubicados en redes virtuales... extrañarse de que devuelvan `connection refused`. Por diseño de seguridad, las redes virtuales de Docker están estrictamente aisladas entre sí por el firewall del kernel.",
                    code: "# Solución: Conectar el contenedor a la segunda red de forma dinámica\ndocker network connect red-secundaria mi-contenedor"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "En entornos de alta seguridad o cumplimiento normativo... utiliza la red en modo `internal` al crearla para impedir que los contenedores de esa red tengan acceso a Internet exterior.",
                    code: "docker network create --internal red-db-aislada"
                }
            ]
        },
        {
            id: "docker-compose",
            title: "Docker Compose: Infraestructura como Código",
            content: [
                {
                    title: "¿Qué es Docker Compose?",
                    text: "Docker Compose es una herramienta de orquestación local y definición de Infraestructura como Código (IaC) que permite definir, configurar y gestionar aplicaciones compuestas por múltiples contenedores (microservicios) de forma centralizada.",
                    code: "# Verificar la versión instalada de Docker Compose\ndocker compose version"
                },
                {
                    title: "Estructura del archivo YAML (docker-compose.yml)",
                    text: "Utiliza un archivo declarativo estructurado en tres bloques raíz principales: `services` (define los contenedores, imágenes, puertos y variables), `networks` (define las redes virtuales) y `volumes` (define los volúmenes persistentes nombrados).",
                    code: "version: '3.8'\nservices:\n  web:\n    image: nginx:alpine"
                },
                {
                    title: "Gestión Multi-contenedor (Microservicios)",
                    text: "En lugar de ejecutar docenas de extensos y complejos comandos `docker run` en la terminal, Compose permite levantar, interconectar y supervisar la arquitectura completa de tu sistema con un solo comando unificado.",
                    code: "# Levantar toda la arquitectura en segundo plano\ndocker compose up -d"
                },
                {
                    title: "Gestión del ciclo de vida centralizado",
                    text: "Compose supervisa el estado de los servicios definidos en el YAML. Si modificas una variable de entorno o un puerto en el archivo, Compose detecta el cambio y recrea de forma inteligente únicamente los contenedores afectados, manteniendo intactos los demás.",
                    code: "# Reiniciar un servicio específico gestionado por Compose\ndocker compose restart api-backend"
                },
                {
                    title: "¿Por qué es el estándar de la industria?",
                    text: "Es la herramienta imprescindible para estandarizar entornos de desarrollo, facilitando que cualquier nuevo miembro del equipo levante el proyecto completo en su primer día de trabajo en cuestión de minutos.",
                    code: "# Listar los procesos de contenedores de la pila actual\ndocker compose ps"
                }
            ],
            description: "Orquestación declarativa local, definición de servicios, redes y volúmenes en YAML, y gestión simplificada de arquitecturas complejas.",
            code: `# Estructura profesional de un archivo docker-compose.yml
version: '3.8'

services:
  base-datos:
    image: postgres:16-alpine
    container_name: db_postgres
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: superpassword
      POSTGRES_DB: sistema_prod
    volumes:
      - pg_datos:/var/lib/postgresql/data
    networks:
      - red-backend
    restart: unless-stopped

  api-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: api_server
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=base-datos
      - DB_PORT=5432
      - DB_USER=root
      - DB_PASS=superpassword
    depends_on:
      - base-datos
    networks:
      - red-backend
    restart: unless-stopped

volumes:
  pg_datos:
    name: volumen_postgres_prod

networks:
  red-backend:
    name: red_interna_backend
    driver: bridge`,
            syntaxDescription: "El bloque `depends_on` establece un orden de arranque secuencial, asegurando que el contenedor `api-backend` no se inicie hasta que el contenedor `base-datos` esté corriendo. Todos los servicios comparten la red virtual `red-backend`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En las versiones modernas de Docker (V2), Docker Compose ya no es un script de Python independiente (`docker-compose`); ahora está integrado de forma nativa dentro del propio CLI de Docker como un subcomando oficial (`docker compose`).",
                    code: "# ❌ Sintaxis antigua (V1 heredada)\ndocker-compose up -d\n\n# ✅ Sintaxis moderna nativa (V2 actual)\ndocker compose up -d"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Utiliza los comandos de gestión de Compose para operar sobre toda tu pila de microservicios de forma unificada: `docker compose logs -f` para ver los logs combinados de todos los servicios, y `docker compose down` para detener y limpiar todo el entorno.",
                    code: "# Apagar y destruir contenedores y redes creadas por el YAML\ndocker compose down"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Ten en cuenta que `depends_on` solo espera a que el contenedor inicie, no a que la base de datos interna esté lista para recibir conexiones. Para servicios críticos, utiliza la condición avanzada `condition: service_healthy` combinada con un `healthcheck` en la base de datos.",
                    code: "# En el servicio api-backend:\ndepends_on:\n  base-datos:\n    condition: service_healthy"
                }
            ]
        },
        {
            id: "env-avanzadas",
            title: "Variables de Entorno Avanzadas en Compose",
            content: [
                {
                    title: "Archivos de configuración y variables",
                    text: "Docker Compose ofrece múltiples capas de jerarquía para inyectar y gestionar variables de entorno en tus microservicios, permitiendo desacoplar por completo la configuración secreta del archivo declarativo YAML.",
                    code: "# Validar y previsualizar la configuración final con variables resueltas\ndocker compose config"
                },
                {
                    title: "La directiva env_file",
                    text: "En lugar de listar docenas de variables bajo el bloque `environment`, la directiva `env_file: - ./config.env` indica a Compose que lea un archivo externo y cargue todas sus variables dentro del contenedor de forma limpia.",
                    code: "env_file:\n  - ./config.env"
                },
                {
                    title: "Interpolación de variables en el YAML (${VAR})",
                    text: "Puedes utilizar variables de entorno del sistema operativo anfitrión directamente dentro del archivo `docker-compose.yml` mediante la sintaxis de interpolación `${VARIABLE}`. Esto es ideal para dinamizar puertos o etiquetas de imágenes (ej. `image: mi-api:${API_VERSION}`).",
                    code: "image: mi-api:\${API_VERSION}"
                },
                {
                    title: "Separación de ambientes (Dev / Prod / Staging)",
                    text: "Para gestionar múltiples entornos, la mejor práctica consiste en mantener un archivo base común (`docker-compose.yml`) y crear archivos de anulación específicos para cada entorno (ej. `docker-compose.override.yml` para desarrollo local y `docker-compose.prod.yml` para producción).",
                    code: "# Desplegar combinando y fusionando archivos de entorno\ndocker compose -f docker-compose.yml -f docker-compose.prod.yml up -d"
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Garantiza que las credenciales de producción, claves de cifrado y configuraciones sensibles nunca queden expuestas en el código fuente ni en los manifiestos de infraestructura compartidos en Git."
                }
            ],
            description: "Estrategias de jerarquía e interpolación de variables en YAML, uso de env_file y patrones avanzados para la separación de ambientes dev/prod.",
            code: `# 1. Archivo docker-compose.yml base con interpolación de variables
version: '3.8'
services:
  webapp:
    image: miempresa/frontend:\${APP_VERSION:-latest} # Usa 'latest' por defecto si APP_VERSION no existe
    ports:
      - "\${PORT_EXTERNO}:80"
    env_file:
      - .env.production

# 2. Comando para desplegar fusionando el archivo base con el archivo de producción
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`,
            syntaxDescription: "La sintaxis `${APP_VERSION:-latest}` demuestra el uso de valores por defecto en la interpolación. La bandera `-f` permite encadenar y sobrescribir configuraciones YAML en orden secuencial para modelar entornos específicos.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Por defecto, si no especificas ningún archivo con la bandera `-f`, Docker Compose busca automáticamente un archivo llamado `.env` en el mismo directorio y utiliza sus valores para resolver todas las interpolaciones `${VAR}` del archivo YAML.",
                    code: "# El archivo .env alimenta automáticamente al docker-compose.yml\ndocker compose up -d"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Confundir las variables de interpolación del YAML con las variables de entorno internas del contenedor. Que una variable exista en el archivo `.env` para ser interpolada en el YAML no significa que el contenedor tenga acceso a ella; debes declararla explícitamente en `environment` o `env_file`.",
                    code: "# ❌ El contenedor no verá la variable VAR_SECRETA a menos que la pases explícitamente\nenvironment:\n  - MI_VAR=\${VAR_SECRETA}"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "En flujos de despliegue automatizados (CI/CD), utiliza el comando `docker compose config` antes de desplegar. Esta herramienta valida la sintaxis del YAML y muestra el archivo resultante con todas las variables ya interpoladas y resueltas.",
                    code: "docker compose config"
                }
            ]
        },
        {
            id: "optimizacion-imagenes",
            title: "Optimización Avanzada de Imágenes",
            content: [
                {
                    title: "El objetivo: Reducir drásticamente el tamaño",
                    text: "Las imágenes pesadas (de más de 1 GB) aumentan los costos de almacenamiento en la nube, ralentizan los despliegues automatizados de CI/CD y amplían peligrosamente la superficie de ataque ante vulnerabilidades de seguridad.",
                    code: "# Listar imágenes limpias filtrando las huérfanas\ndocker images --filter 'dangling=false'"
                },
                {
                    title: "La técnica maestra: Builds Multi-etapa (Multi-stage Builds)",
                    text: "Un Multi-stage build permite utilizar múltiples instrucciones `FROM` en un solo Dockerfile. Esto hace posible usar una imagen pesada y llena de herramientas (SDKs, compiladores) para compilar el código en la primera etapa, y luego copiar únicamente el binario resultante hacia una imagen final mínima y limpia en la segunda etapa.",
                    code: "FROM golang:alpine AS builder\n# ... compilar ...\nFROM alpine\nCOPY --from=builder /app/bin ."
                },
                {
                    title: "Selección de imágenes base mínimas (Alpine vs Distroless)",
                    text: "Sustituir imágenes base completas (como `ubuntu` o `node:bullseye`) por imágenes `alpine` (basadas en musl libc y busybox, de apenas 5 MB) o imágenes `distroless` (mantenidas por Google, que carecen de gestor de paquetes y consola de comandos, ofreciendo seguridad extrema).",
                    code: "FROM gcr.io/distroless/static-debian12"
                },
                {
                    title: "Minimización de capas y limpieza de cachés",
                    text: "Cada instrucción `RUN`, `COPY` y `ADD` genera una capa inmutable. Agrupar comandos con `&&` y purgar las cachés de los gestores de paquetes (`apt-get clean`, `npm cache clean`, `apk --no-cache`) dentro de la misma capa es vital para no arrastrar peso muerto.",
                    code: "RUN apt-get update && apt-get install -y curl && apt-get clean"
                },
                {
                    title: "¿Por qué es un estándar profesional?",
                    text: "Una imagen optimizada puede reducir su tamaño de 1.2 GB a apenas 30 MB, logrando arranques instantáneos y minimizando drásticamente las vulnerabilidades reportadas por escáneres de seguridad."
                }
            ],
            description: "Técnicas de élite para reducir el tamaño de imágenes: compilaciones multi-etapa (Multi-stage builds), imágenes Alpine/Distroless y minimización de capas.",
            code: `# Dockerfile Multi-stage profesional para una aplicación Golang / React / Node
# --- ETAPA 1: Compilación (Imagen pesada con herramientas y SDKs) ---
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# Compilar el binario estático eliminando información de depuración para reducir tamaño
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o api-server .

# --- ETAPA 2: Producción (Imagen mínima Distroless ultra-segura) ---
FROM gcr.io/distroless/static-debian12:latest
WORKDIR /root/
# Copiar EXCLUSIVAMENTE el binario compilado desde la etapa anterior
COPY --from=builder /app/api-server .
EXPOSE 8080
CMD ["./api-server"]`,
            syntaxDescription: "La directiva `AS builder` nombra la primera etapa. La directiva `COPY --from=builder` transfiere de forma quirúrgica el binario final hacia la imagen Distroless, dejando atrás todos los compiladores y librerías de la etapa de construcción.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Las imágenes Distroless representan el nivel máximo de seguridad en contenedores. Al no tener una consola de comandos (`sh` o `bash`) ni gestores de paquetes (`apt`), si un atacante logra vulnerar tu aplicación, le resultará imposible ejecutar comandos o descargar malware en el contenedor.",
                    code: "# ❌ En una imagen Distroless, intentar abrir una terminal fallará\ndocker exec -it mi-contenedor-distroless sh # Devuelve error"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Realizar un `RUN apt-get update && apt-get install -y paquete` y olvidar añadir la bandera `--no-install-recommends`. Sin esta bandera, el gestor de paquetes de Debian/Ubuntu descargará docenas de paquetes secundarios opcionales, inflando el tamaño de la imagen en cientos de megabytes.",
                    code: "RUN apt-get update && apt-get install -y --no-install-recommends curl \\ \n    && rm -rf /var/lib/apt/lists/*"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Utiliza herramientas de análisis de imágenes como `dive` (`dive mi-imagen:tag`) para explorar visualmente el sistema de archivos de tu imagen capa por capa, identificando exactamente qué comandos o archivos están desperdiciando espacio en disco.",
                    code: "dive miempresa/mi-backend:v1.0.0"
                }
            ]
        },
        {
            id: "arquitectura-multicontenedor",
            title: "Arquitectura Multi-contenedor y Desacoplamiento",
            content: [
                {
                    title: "El paradigma: Desacoplamiento de Monolitos",
                    text: "En la arquitectura tradicional monolítica, el servidor web, la lógica de negocio, la base de datos y las tareas en segundo plano se ejecutan dentro del mismo servidor físico. En el paradigma de contenedores, la regla de oro es el desacoplamiento estricto: Un contenedor = Un único proceso o servicio arquitectónico.",
                    code: "# Desacoplar un servidor Nginx independiente\ndocker run -d --name proxy nginx:alpine"
                },
                {
                    title: "Separación de servicios (Frontend + Backend + DB)",
                    text: "Una arquitectura moderna estándar se divide en múltiples contenedores independientes y especializados: un contenedor Nginx para el Frontend (React/Angular), un contenedor Node/Java/Go para el Backend (API REST), un contenedor PostgreSQL para los datos y un contenedor Redis para la caché.",
                    code: "# Orquestar la separación de servicios con Compose\ndocker compose up -d"
                },
                {
                    title: "Beneficios de la separación arquitectónica",
                    text: "Aislamiento de fallos (si el contenedor de caché colapsa, la base de datos y la API siguen funcionando), escalabilidad independiente (puedes levantar 5 réplicas del Backend manteniendo una sola Base de datos) y seguridad perimetral avanzada.",
                    code: "# Escalar horizontalmente el backend de forma independiente\ndocker compose up --scale api-backend=3 -d"
                },
                {
                    title: "Gestión de dependencias de arranque",
                    text: "En arquitecturas distribuidas, es fundamental orquestar el orden de inicio de los microservicios utilizando directivas como `depends_on` combinadas con controles de salud (`healthchecks`), garantizando que los servicios dependientes arranquen de forma estable.",
                    code: "depends_on:\n  base-datos:\n    condition: service_healthy"
                },
                {
                    title: "¿Por qué es la antesala a Kubernetes?",
                    text: "Diseñar tu aplicación dividida en microservicios limpios y desacoplados en Docker Compose es el paso previo directo y natural para poder migrar y escalar la arquitectura hacia un clúster de Kubernetes en la nube.",
                    code: "# Desplegar en Kubernetes mediante manifiestos declarativos\nkubectl apply -f deployment.yaml"
                }
            ],
            description: "Patrones de diseño de microservicios, separación de responsabilidades (Frontend, Backend, DB, Caché) y escalabilidad horizontal independiente.",
            code: `# Arquitectura Multi-contenedor completa con Healthchecks en Docker Compose
version: '3.8'

services:
  cache-redis:
    image: redis:7.2-alpine
    container_name: redis_server
    ports:
      - "6379:6379"
    networks:
      - red-interna

  base-datos:
    image: postgres:16-alpine
    container_name: postgres_server
    environment:
      POSTGRES_PASSWORD: adminpassword
    volumes:
      - pg_data:/var/lib/postgresql/data
    networks:
      - red-interna
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  api-backend:
    image: miempresa/backend-api:v1.0.0
    container_name: backend_server
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=base-datos
      - REDIS_HOST=cache-redis
    depends_on:
      base-datos:
        condition: service_healthy # Espera a que el healthcheck de Postgres sea exitoso
      cache-redis:
        condition: service_started
    networks:
      - red-interna

volumes:
  pg_data:

networks:
  red-interna:
    driver: bridge`,
            syntaxDescription: "El bloque `healthcheck` ejecuta el comando nativo `pg_isready` para validar que el motor de base de datos esté plenamente operativo. El backend espera de forma inteligente esta confirmación antes de iniciar su propio proceso.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Al mantener tus contenedores de Backend y Frontend completamente sin estado (Stateless), puedes implementar un balanceador de carga (como Traefik o Nginx) delante de ellos para distribuir el tráfico entre múltiples réplicas idénticas de forma transparente.",
                    code: "# Escalabilidad horizontal instantánea de microservicios sin estado\ndocker compose up --scale api-backend=3 -d"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Diseñar microservicios que dependen de compartir archivos locales en disco entre contenedores para comunicarse (ej. el backend escribe un archivo que el frontend lee). Esto rompe el desacoplamiento; los microservicios deben comunicarse exclusivamente a través de red (APIs REST, gRPC o colas de mensajes).",
                    code: "# ❌ Mal: Compartir carpetas locales para flujos de datos\n# ✅ Bien: Intercambiar datos mediante peticiones HTTP o RabbitMQ"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Asigna límites estrictos de memoria RAM y CPU (`deploy.resources.limits`) a cada microservicio dentro de tu archivo `docker-compose.yml`. Esto evita que un fallo de fuga de memoria (memory leak) en un solo contenedor consuma todos los recursos y tire abajo el servidor físico completo.",
                    code: "# En la definición del servicio:\ndeploy:\n  resources:\n    limits:\n      cpus: '0.5'\n      memory: 512M"
                }
            ]
        },
        {
            id: "networking-avanzado",
            title: "Networking Avanzado y Service Discovery",
            content: [
                {
                    title: "Comunicación avanzada entre servicios",
                    text: "En arquitecturas distribuidas complejas, la seguridad de red exige ir más allá de una simple red plana compartida. Docker permite diseñar topologías de red avanzadas donde los contenedores se conectan selectivamente a múltiples redes virtuales para aislar el tráfico de datos.",
                    code: "# Crear una red virtual dedicada al backend\ndocker network create red-backend"
                },
                {
                    title: "Aislamiento perimetral por múltiples redes",
                    text: "Una topología profesional estándar consiste en crear dos redes virtuales: `red-frontend` y `red-backend`. El contenedor Nginx (Proxy) se conecta a `red-frontend`. La API Backend se conecta a ambas redes (`red-frontend` y `red-backend`). La Base de datos se conecta EXCLUSIVAMENTE a `red-backend`, quedando físicamente inaccesible desde el proxy exterior.",
                    code: "networks:\n  - red-frontend\n  - red-backend"
                },
                {
                    title: "Service Discovery Interno nativo",
                    text: "Es el mecanismo por el cual los microservicios se descubren y localizan entre sí dinámicamente en la red virtual. Docker implementa un servidor DNS embebido (Embedded DNS) a nivel de demonio que mantiene una tabla de enrutamiento actualizada con las IPs virtuales de cada contenedor.",
                    code: "# Consultar la IP interna de un contenedor mediante DNS\ndocker exec mi-web nslookup api-backend"
                },
                {
                    title: "Alias de red (Network Aliases)",
                    text: "Docker permite asignar múltiples nombres de dominio virtuales (alias) a un mismo contenedor dentro de una red específica mediante la directiva `aliases`. Esto permite que distintos servicios se comuniquen con el mismo contenedor utilizando nombres de dominio adaptados a su contexto.",
                    code: "aliases:\n  - db-master.local"
                },
                {
                    title: "¿Por qué es vital para la seguridad Zero-Trust?",
                    text: "Garantiza el principio de mínimo privilegio en la red. Si un atacante logra vulnerar tu servidor web Nginx público, le resultará imposible realizar un escaneo de red o atacar la base de datos, ya que no existen rutas de red hacia ella.",
                    code: "# Inspeccionar las subredes y aislamiento de una red virtual\ndocker network inspect red-backend"
                }
            ],
            description: "Topologías de red avanzadas, aislamiento perimetral estricto (redes frontend/backend), resolución DNS nativa y alias de red.",
            code: `# Topología de red avanzada con aislamiento perimetral estricto en Compose
version: '3.8'

services:
  proxy-nginx:
    image: nginx:alpine
    container_name: proxy_publico
    ports:
      - "80:80"
      - "443:443"
    networks:
      - red-frontend # Solo tiene acceso a la red pública frontal

  api-backend:
    image: miempresa/api-core:v1.0
    container_name: api_interna
    networks:
      - red-frontend # Se comunica con el proxy Nginx
      - red-backend  # Se comunica con la base de datos

  base-datos-segura:
    image: postgres:16-alpine
    container_name: db_protegida
    environment:
      POSTGRES_PASSWORD: secretpassword
    networks:
      red-backend:
        aliases:
          - db-master.local # Alias DNS personalizado exclusivo para esta red

networks:
  red-frontend:
    name: frontend_network
    driver: bridge
  red-backend:
    name: backend_network
    driver: bridge
    internal: true # Red interna aislada sin acceso a Internet exterior`,
            syntaxDescription: "La directiva `internal: true` en `red-backend` bloquea a nivel de kernel cualquier tráfico de salida o entrada hacia Internet. El servicio `api-backend` actúa como el único puente seguro de comunicación entre ambos mundos.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El servidor DNS embebido de Docker (que escucha en la IP virtual interna `127.0.0.11`) funciona de forma totalmente dinámica. Si destruyes y recreas un contenedor y este recibe una nueva IP virtual, el DNS actualiza su registro al instante sin cortes en el servicio.",
                    code: "# Consultar el DNS interno de Docker desde dentro de un contenedor\ndocker exec -it mi-contenedor nslookup db-master.local"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Utilizar direcciones IP estáticas fijas (`ipv4_address`) en tus archivos Docker Compose para conectar servicios. Esto destruye la flexibilidad de los contenedores, genera colisiones de IP y rompe la capacidad de escalar servicios horizontalmente.",
                    code: "# ❌ Mal: Forzar IPs estáticas rompe la escalabilidad y dinamismo\n# ✅ Bien: Confiar siempre en el Service Discovery por nombres de contenedor"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para arquitecturas de microservicios modernas, implementa un Reverse Proxy dinámico (como Traefik o Caddy) configurado como contenedor en Docker. Estos proxies leen los eventos de la API de Docker y enrutan el tráfico automáticamente basándose en etiquetas (labels) del contenedor, sin editar archivos de configuración.",
                    code: "# Ejemplo de etiqueta para Traefik en Compose:\nlabels:\n  - 'traefik.http.routers.mi-api.rule=Host(`api.midominio.com`)'"
                }
            ]
        }
    ]
};
