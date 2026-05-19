export const vocabularyCategory = {
    title: "0. Glosario de Docker",
    topics: [
        {
            id: "docker-vocab-a-e",
            title: "Glosario A - E",
            description: "Términos fundamentales sobre montajes, contenedores, orquestación local y motores de ejecución.",
            content: [
                {
                    title: "Bind Mount",
                    text: "Un montaje directo de un directorio o archivo específico del sistema operativo anfitrión dentro del contenedor, ideal para reflejar cambios de código instantáneamente en entornos de desarrollo.",
                    code: "# Montar el directorio actual del host dentro de /app en el contenedor\ndocker run -d -v $(pwd):/app node:20 npm run dev"
                },
                {
                    title: "Contenedor (Container)",
                    text: "Un contenedor es un entorno ligero, portátil y completamente aislado donde se ejecuta el proceso de una aplicación junto con sus librerías y dependencias, compartiendo el kernel del sistema operativo anfitrión.",
                    code: "# Ejecutar un contenedor efímero interactivo\ndocker run -it --rm ubuntu bash"
                },
                {
                    title: "Docker Compose",
                    text: "Una herramienta de orquestación local que permite definir y ejecutar aplicaciones multi-contenedor mediante un archivo declarativo en formato YAML (docker-compose.yml).",
                    code: "version: '3.8'\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - \"8080:80\""
                },
                {
                    title: "Docker Engine",
                    text: "El motor de ejecución cliente-servidor principal de Docker, compuesto por un demonio en segundo plano (dockerd), una API REST y el cliente de línea de comandos (CLI).",
                    code: "# Consultar la versión del cliente y del servidor (demonio)\ndocker version"
                },
                {
                    title: "Docker Hub / Registry",
                    text: "Un servicio de almacenamiento y distribución centralizado (público o privado) donde los desarrolladores publican (push) y descargan (pull) imágenes de contenedores.",
                    code: "# Iniciar sesión y subir una imagen a un registro\ndocker login\ndocker push miusuario/miapp:v1.0"
                },
                {
                    title: "Dockerfile",
                    text: "Un archivo de texto plano con una serie de instrucciones declarativas (FROM, WORKDIR, COPY, RUN, CMD) que el motor de Docker ejecuta secuencialmente para construir una imagen de contenedor personalizada.",
                    code: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"node\", \"index.js\"]"
                }
            ]
        },
        {
            id: "docker-vocab-i-z",
            title: "Glosario I - Z",
            description: "Términos clave sobre paquetes inmutables, redes, orquestación distribuida y persistencia nativa.",
            content: [
                {
                    title: "Imagen (Image)",
                    text: "Una imagen es un paquete inmutable y estático de solo lectura que contiene el código fuente, librerías, herramientas y configuración del entorno necesarios para crear contenedores.",
                    code: "# Descargar y listar imágenes almacenadas localmente\ndocker pull nginx:alpine\ndocker images"
                },
                {
                    title: "Mapeo de Puertos (Port Mapping)",
                    text: "La regla de red que enlaza un puerto de la máquina física anfitriona con un puerto interno del contenedor, permitiendo el acceso externo a los servicios web o bases de datos.",
                    code: "# Enlazar el puerto 8080 del host con el puerto 80 del contenedor\ndocker run -d -p 8080:80 nginx:alpine"
                },
                {
                    title: "Orquestación / Kubernetes",
                    text: "La disciplina y tecnología (como Kubernetes) que automatiza el despliegue, escalado, balanceo de carga y recuperación ante fallos de miles de contenedores distribuidos en clústeres de servidores en producción.",
                    code: "# Consultar los Pods (contenedores orquestados) en un clúster de Kubernetes\nkubectl get pods"
                },
                {
                    title: "Volumen (Volume)",
                    text: "Un mecanismo nativo de Docker para gestionar el almacenamiento persistente de datos fuera del ciclo de vida efímero del contenedor, protegiendo la información de bases de datos ante borrados.",
                    code: "# Crear y montar un volumen persistente en un contenedor\ndocker volume create mi-datos\ndocker run -d -v mi-datos:/var/lib/mysql mysql:8.0"
                }
            ]
        }
    ]
};
