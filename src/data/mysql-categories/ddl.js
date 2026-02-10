export const ddlCategory = {
    title: "2. Definición de Datos (DDL)",
    topics: [
        {
            id: "mysql-ddl-types",
            title: "Tipos de Datos",
            content: [
                { title: "¿Qué es?", text: "Son las definiciones que indican qué clase de información (números, texto, fechas) puede almacenar una columna. MySQL ofrece una gran variedad como INT, VARCHAR, DATETIME o JSON." },
                { title: "¿Por qué es importante?", text: "Elegir el tipo correcto ahorra espacio en disco y asegura la integridad de los datos (no puedes guardar 'hola' en una columna numérica)." },
                { title: "¿Qué problema real resuelve?", text: "Evita la corrupción de datos y optimiza el rendimiento de las búsquedas y cálculos." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre. Cada columna debe tener el tipo más estricto y ligero posible (ej. TINYINT para valores pequeños)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Comprensión básica de la diferencia entre texto, números y fechas." }
            ],
            syntaxDescription: "Los tipos de datos son los moldes que definen qué clase de información puede contener cada columna, asegurando la integridad y optimizando el almacenamiento.",
            description: "Clasificación de los datos soportados.",
            code: `INT, TINYINT, BIGINT
DECIMAL(10, 2) -- Para dinero
VARCHAR(100)   -- Texto variable
DATE, DATETIME -- Fechas
JSON           -- Documentos`,
            useCases: [
                {
                    title: "Dinero",
                    description: "Usar DECIMAL(10,2) para precios evita errores de redondeo de punto flotante.",
                    code: "precio DECIMAL(10, 2)"
                },
                {
                    title: "Estados",
                    description: "Usar ENUM para limitar una columna a valores específicos.",
                    code: "estado ENUM('activo', 'inactivo', 'pendiente')"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Usa el tamaño justo",
                    content: "No uses INT (4 bytes) para una columna de 'estado' que solo tiene 3 valores. Usa TINYINT (1 byte). En millones de filas, la diferencia es gigante.",
                    code: "TINYINT UNSIGNED -- 0 a 255"
                },
                {
                    type: "error",
                    title: "Dinero en FLOAT/DOUBLE",
                    content: "Nunca guardes dinero en tipos de punto flotante porque tienen errores de precisión. Usa siempre DECIMAL.",
                    code: "precio FLOAT; -- ❌ 19.9999999\nprecio DECIMAL(10,2); -- ✅ 20.00"
                }
            ]
        },
        {
            id: "mysql-ddl-db",
            title: "Bases de Datos",
            videoUrl: "https://www.youtube.com/watch?v=qATlttf7dv0",
            content: [
                { title: "¿Qué es?", text: "Es el contenedor principal (namespace) que agrupa un conjunto de tablas y objetos relacionados con una aplicación o sistema específico." },
                { title: "Comandos Base", text: "Para empezar, usamos `CREATE DATABASE` para crear el contenedor y `USE` para indicarle a MySQL en qué base de datos queremos trabajar." },
                { title: "¿Por qué es importante?", text: "Permite aislar los datos de diferentes aplicaciones en el mismo servidor, facilitando la gestión, seguridad y backups." },
                { title: "¿Qué problema real resuelve?", text: "Organización. Sin bases de datos, todas las tablas de todos los sistemas estarían mezcladas." }
            ],
            syntaxDescription: "Comandos para gestionar el contenedor principal de tus tablas y datos.",
            description: "Gestión de bases de datos.",
            code: `CREATE DATABASE IF NOT EXISTS tienda CHARACTER SET utf8mb4;
USE tienda;
DROP DATABASE IF EXISTS prueba;`,
            useCases: [
                {
                    title: "Inicialización",
                    description: "Script seguro para crear una BD solo si no existe y configurar UTF-8.",
                    code: "CREATE DATABASE IF NOT EXISTS mi_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Siempre UTF-8",
                    content: "Usa siempre `utf8mb4` para soportar todos los caracteres (incluyendo emojis). El `utf8` antiguo de MySQL está incompleto.",
                    code: "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
                }
            ]
        },
        {
            id: "mysql-ddl-tables",
            title: "Tablas Completas",
            videoUrl: "https://www.youtube.com/watch?v=ALvamNZ15pM",
            content: [
                { title: "¿Qué es?", text: "Es la estructura fundamental donde se almacenan los datos. Crear una tabla bien definida es clave para una base de datos eficiente." },
                { title: "Tipos de Datos Comunes", text: "Al crear una tabla, debes definir el tipo de dato para cada columna:\n• INT / BIGINT: Números enteros.\n• VARCHAR(n): Texto variable.\n• DECIMAL(p,s): Dinero.\n• ENUM: Listas cerradas." }
            ],
            syntaxDescription: "Sintaxis completa para crear tablas con relaciones y diversos tipos de datos.",
            description: "Creación avanzada de tablas.",
            code: `CREATE TABLE productos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);`,
            useCases: [
                {
                    title: "Estructura de Ventas",
                    description: "Diseño de tabla para un catálogo de productos.",
                    code: "CREATE TABLE items (id INT PRIMARY KEY, name VARCHAR(50));"
                }
            ]
        },
        {
            id: "mysql-table-mgmt",
            title: "Gestión de Tablas (Listar y Eliminar)",
            videoUrl: "https://www.youtube.com/watch?v=BB7Q99dLxHw",
            content: [
                {
                    title: "Comandos de Limpieza",
                    text: "`SHOW TABLES` nos permite ver qué tablas existen en la BD actual, mientras que `DROP TABLE` elimina una tabla y todos sus datos permanentemente."
                }
            ],
            description: "Mantenimiento y visualización de la estructura de la base de datos.",
            code: "SHOW TABLES;\nDROP TABLE IF EXISTS usuarios;",
            useCases: [
                {
                    title: "Limpieza de Sandbox",
                    description: "Eliminar tablas temporales después de una prueba."
                }
            ]
        },
        {
            id: "mysql-table-info",
            title: "Inspección de Tablas",
            videoUrl: "https://www.youtube.com/watch?v=bzhpReiz3vE",
            content: [
                {
                    title: "DESCRIBE",
                    text: "El comando `DESCRIBE` o `DESC` muestra la estructura de una tabla: columnas, tipos de datos, si acepta nulos, llaves y valores por defecto."
                }
            ],
            description: "Cómo ver la 'radiografía' de una tabla.",
            code: "DESCRIBE productos;",
            useCases: [
                {
                    title: "Auditoría de Esquema",
                    description: "Verificar si una columna tiene el tipo de dato correcto antes de una migración."
                }
            ]
        },
        {
            id: "mysql-table-clone",
            title: "Clonación de Tablas",
            videoUrl: "https://www.youtube.com/watch?v=q0rgTDWs4a4",
            content: [
                {
                    title: "Crear a partir de otras",
                    text: "Puedes crear una tabla basada en el resultado de un SELECT. Esto es útil para hacer backups rápidos o tablas temporales de análisis."
                }
            ],
            description: "Técnicas para duplicar estructuras y datos.",
            code: "CREATE TABLE productos_backup AS SELECT * FROM productos;",
            useCases: [
                {
                    title: "Backup de Seguridad",
                    description: "Crear una copia de una tabla crítica antes de realizar un proceso masivo."
                }
            ]
        },
        {
            id: "mysql-ddl-alter",
            title: "Modificar Tablas",
            videoUrl: "https://www.youtube.com/watch?v=U2VQOOl_75o",
            content: [
                { title: "¿Qué es?", text: "El comando ALTER TABLE permite cambiar la estructura de una tabla existente sin perder los datos." }
            ],
            description: "Evolución de esquemas.",
            code: "ALTER TABLE usuarios ADD edad INT;",
            useCases: [
                {
                    title: "Migraciones",
                    description: "Añadir columnas de auditoría (creado_at) a tablas viejas."
                }
            ]
        },
        {
            id: "mysql-ddl-constraints",
            title: "Restricciones (Constraints)",
            videoUrl: "https://www.youtube.com/watch?v=VQHtg7dyyKs",
            content: [
                { title: "¿Qué son?", text: "Reglas que aseguran la calidad de los datos: NOT NULL, UNIQUE, CHECK, DEFAULT." },
                { title: "Valores Únicos y Nulos", videoUrl: "https://www.youtube.com/watch?v=A5SGMYoVx2Y", text: "Controlar que no haya emails duplicados o que el nombre sea obligatorio." },
                { title: "Valores por Default", videoUrl: "https://www.youtube.com/watch?v=uRaRCOa5DMg", text: "Asignar valores automáticamente si el usuario no los provee (ej. fecha actual)." }
            ],
            description: "Integridad y reglas de negocio en la base de datos.",
            code: "ALTER TABLE t ADD CONSTRAINT u_email UNIQUE(email);",
            useCases: [
                {
                    title: "Validación de Dominio",
                    description: "Asegurar que un precio nunca sea negativo mediante un CHECK."
                }
            ]
        },
        {
            id: "mysql-type-enum",
            title: "Tipo ENUM",
            videoUrl: "https://www.youtube.com/watch?v=x1C_4rKMFkU",
            content: [
                {
                    title: "Listas Cerradas",
                    text: "El tipo ENUM permite definir un conjunto de valores permitidos. MySQL solo aceptará uno de esos valores, ahorrando espacio y validación."
                }
            ],
            description: "Manejo de estados y categorías fijas.",
            code: "categoria ENUM('Baja', 'Media', 'Alta')",
            useCases: [
                {
                    title: "Estados de Pedido",
                    description: "Limitar la columna estado a 'Pendiente', 'Enviado', 'Entregado'."
                }
            ]
        },
        {
            id: "mysql-keys-relations",
            title: "Llaves y Relaciones (PK / FK)",
            videoUrl: "https://www.youtube.com/watch?v=FYQsn-GROM8",
            content: [
                { title: "Llaves Primarias", text: "Identificador único de la fila. Impide duplicados absolutos." },
                { title: "Llaves Foráneas", videoUrl: "https://www.youtube.com/watch?v=gLNFiUlyhVE", text: "Vincula una tabla con otra, creando el concepto de base de datos relacional." }
            ],
            description: "El corazón del modelo relacional.",
            code: "PRIMARY KEY (id),\nFOREIGN KEY (user_id) REFERENCES users(id)",
            useCases: [
                {
                    title: "Integridad Referencial",
                    description: "Impedir que se borre un cliente que tiene facturas asociadas."
                }
            ]
        }
    ]
};
