export const manipulacionCategory = {
    title: "2. Manipulación y Estructura (DDL/DML)",
    topics: [
        {
            id: "ddl-estructuras",
            title: "DDL - Creación y Modificación",
            content: [
                {
                    title: "¿Qué es?",
                    text: "El Data Definition Language (DDL) es el conjunto de comandos que definen, alteran o eliminan la estructura física de los objetos."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite evolucionar el esquema de la base de datos de forma segura, incluso en bases de datos con millones de filas gracias a las operaciones concurrentes."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite cambiar la estructura de tablas (añadir columnas, crear índices) sin tener que recrear la base de datos entera."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para toda alteración de esquema organizada (usando migraciones). Evita cambios manuales en producción sin backups."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimiento de tipos de datos y constraints."
                }
            ],
            description: "Comandos para gestionar la estructura de tablas y bases de datos.",
            code: `-- Crear y modificar
CREATE TABLE usuarios (id SERIAL);
ALTER TABLE usuarios ADD COLUMN activo BOOLEAN DEFAULT true;`,
            syntaxDescription: "`CREATE TABLE` reserva el espacio en disco con el esquema inicial. `ALTER TABLE` modifica dicho esquema añadiendo una columna con un valor predeterminado.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "En Postgres, el DDL es transaccional. Puedes revertir cambios en la estructura de las tablas si algo sale mal.",
                    code: "BEGIN;\nALTER TABLE t ADD COLUMN c INT;\nROLLBACK; -- La columna desaparece"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Renombrar columnas en vivo sin antes actualizar la aplicación. Usa `RENAME` solo en ventanas de mantenimiento.",
                    code: "ALTER TABLE productos RENAME COLUMN cost TO precio_compra;"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa siempre `IF EXISTS` o `IF NOT EXISTS` para que tus scripts de migración sean idempotentes (se puedan correr varias veces).",
                    code: "CREATE TABLE IF NOT EXISTS configuracion (id INT);"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para añadir columnas con valores por defecto en Postgres 11+, no te preocupes por el tamaño de la tabla; es instantáneo.",
                    code: "ALTER TABLE v ADD COLUMN x INT DEFAULT 0; -- Operación O(1)"
                }
            ]
        },
        {
            id: "dml-datos",
            title: "DML - Manipulación de Datos",
            content: [
                {
                    title: "¿Qué es?",
                    text: "El Data Manipulation Language (DML) permite insertar, actualizar y borrar los datos reales dentro de las tablas."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Soporta operaciones atómicas y de alto rendimiento, incluyendo el poderoso UPSERT (ON CONFLICT)."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite la interactividad de la aplicación: registrar usuarios, editar perfiles y gestionar compras en tiempo real."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para toda operación de escritura. No lo uses masivamente para 'migrar datos' si puedes usar el comando COPY."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocer la sintaxis WHERE para evitar borrados accidentales."
                }
            ],
            description: "Operaciones de escritura, actualización y borrado de registros.",
            code: `-- Inserción y Upsert
INSERT INTO t (val) VALUES (1) RETURNING id;
INSERT INTO s (k,v) VALUES ('a',1) ON CONFLICT (k) DO UPDATE SET v = 10;`,
            syntaxDescription: "`RETURNING id` devuelve el valor generado inmediatamente. `ON CONFLICT` gestiona duplicados de llaves únicas, permitiendo actualizar en lugar de fallar.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "La cláusula `RETURNING` te permite obtener datos de la fila que acabas de modificar sin hacer un SELECT extra.",
                    code: "DELETE FROM usuarios WHERE id = 1 RETURNING email; -- Útil para logs"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Olvidar el `WHERE` en un `UPDATE` o `DELETE`. Esto afectará a TODAS las filas de la tabla de forma irreversible.",
                    code: "-- ❌ PELIGRO\nUPDATE productos SET precio = 0;"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `INSERT INTO ... SELECT` para mover datos entre tablas de forma masiva y eficiente dentro del servidor.",
                    code: "INSERT INTO historico_ventas SELECT * FROM ventas_hoy;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Usa siempre `ON CONFLICT` (UPSERT) para evitar errores de duplicidad en APIs que puedan recibir peticiones repetidas.",
                    code: "INSERT INTO ... ON CONFLICT (hash) DO NOTHING;"
                }
            ]
        },
        {
            id: "secuencias",
            title: "Sequences (Secuencias)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Generadores de números únicos y atómicos ideales para claves primarias."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Garantizan que múltiples conexiones concurrentes no reciban el mismo ID, manteniendo la integridad referencial."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Automatiza la creación de IDs únicos, evitando la colisión de datos en sistemas multiusuario."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas para claves primarias enteras. No las uses para datos que requieran nula predictibilidad (mejor usa UUID)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Tipos de datos enteros (INT, BIGINT)."
                }
            ],
            description: "Generación automática de números correlativos.",
            code: `-- Claves autoincrementales
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY`,
            syntaxDescription: "`GENERATED ALWAYS AS IDENTITY` es el estándar SQL moderno de PostgreSQL. Crea una secuencia vinculada que garantiza números únicos correlativos.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Las secuencias garantizan unicidad incluso si miles de usuarios insertan datos al mismo tiempo.",
                    code: "SELECT nextval('mi_tabla_id_seq');"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Pensar que las secuencias no tienen huecos. Si un INSERT falla (rollback), el ID se pierde igualmente para evitar bloqueos.",
                    code: "-- Si el ID 5 falla, el próximo será el 6."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `IDENTITY` en lugar de `SERIAL` en versiones modernas de Postgres para cumplir con el estándar SQL.",
                    code: "id BIGINT GENERATED BY DEFAULT AS IDENTITY"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Si esperas más de 2 mil millones de registros, usa siempre `BIGINT`. Cambiar de INT a BIGINT en el futuro es muy costoso.",
                    code: "id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY"
                }
            ]
        }
    ]
};
