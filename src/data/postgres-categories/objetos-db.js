export const objetosDbCategory = {
    title: "5. Objetos de la Base de Datos",
    topics: [
        {
            id: "indices-performance",
            title: "Índices y Rendimiento",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Estructuras de datos auxiliares que permiten a PostgreSQL localizar filas de forma rápida sin leer toda la tabla."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Es la diferencia entre una aplicación que escala a millones de usuarios y una que colapsa con poco tráfico."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Elimina la necesidad de realizar 'Sequential Scans' (leer la tabla entera de disco), reduciendo el tiempo de respuesta de segundos a milisegundos."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Indexa columnas usadas en WHERE, JOIN y ORDER BY. Evita indexar cada columna de la tabla para no ralentizar los INSERT/UPDATE."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de búsqueda y tipos de datos."
                }
            ],
            description: "Optimización de búsquedas mediante estructuras de índice.",
            code: `-- Índice estándar y parcial
CREATE INDEX idx_user_email ON usuarios(email);
CREATE INDEX idx_pendientes ON pedidos(id) WHERE status = 'p';`,
            syntaxDescription: "`CREATE INDEX` genera el objeto. `idx_user_email` es el nombre sugerido. La cláusula `WHERE` en el segundo ejemplo crea un 'Índice Parcial', guardando solo las filas que cumplen la condición.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El índice más común es B-Tree. Sigue la regla de oro: indexa las columnas que uses en `WHERE`, `JOIN` y `ORDER BY`.",
                    code: "CREATE INDEX ON ventas (fecha DESC, total DESC);"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Indexar cada columna. Cada índice ralentiza los `INSERT` y `UPDATE` porque Postgres debe actualizar también el índice.",
                    code: "-- ❌ Mal\nCREATE INDEX ON t(c1); CREATE INDEX ON t(c2); ..."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa **índices parciales** para acelerar búsquedas en estados específicos (como pedidos no entregados). Ahorran espacio.",
                    code: "CREATE INDEX ... WHERE procesado = false;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Si usas `JSONB`, aprovecha los **índices GIN**. Permiten buscar dentro de la estructura JSON con un rendimiento increíble.",
                    code: "CREATE INDEX idx_json ON logs USING GIN (detalles);"
                }
            ]
        },
        {
            id: "vistas-db",
            title: "Vistas y Vistas Materializadas",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Consultas SELECT almacenadas. Las materializadas guardan físicamente el resultado para mayor rapidez."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permiten abstraer la complejidad del modelo de datos para los desarrolladores de frontend/móvil."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Simplifica consultas repetitivas y pesadas, y en el caso de las materializadas, acelera drásticamente reportes complejos."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Usa vistas para legibilidad. Usa materializadas para reportes que no necesiten datos al segundo exacto. No abuses de materializadas si tus datos cambian constantemente."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Consultas SQL avanzadas (JOINS, Agrupaciones)."
                }
            ],
            description: "Abstracción y persistencia de consultas complejas.",
            code: `-- Crear vista
CREATE VIEW vista_empleados AS SELECT ...;
CREATE MATERIALIZED VIEW reporte AS SELECT ...;`,
            syntaxDescription: "`CREATE VIEW` es un alias lógico para un SELECT. `MATERIALIZED VIEW` crea una tabla física congelada con el resultado del SELECT en el momento de creación.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Una vista normal (`VIEW`) es solo lógica y no ocupa espacio. Es perfecta para simplificar JOINS repetitivos.",
                    code: "CREATE VIEW v AS SELECT a.n, b.m FROM a JOIN b ON a.id=b.id;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Olvidar que las vistas materializadas NO se actualizan solas. Debes forzar el refresco de datos manualmente.",
                    code: "REFRESH MATERIALIZED VIEW reporte;"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `REFRESH MATERIALIZED VIEW CONCURRENTLY` para actualizar datos sin bloquear las lecturas de otros usuarios.",
                    code: "REFRESH MATERIALIZED VIEW CONCURRENTLY reporte_ventas;"
                }
            ]
        },
        {
            id: "schemas-organizacion",
            title: "Schemas (Esquemas)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Contenedores lógicos para organizar objetos de base de datos, similar a carpetas."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Esencial para aplicaciones multi-inquilino (SaaS) y para organizar DBs empresariales complejas."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita colisión de nombres de tablas y permite gestionar permisos de forma masiva por módulos."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para separar lógica (ej. esquema 'audit', esquema 'ventas'). No los uses si tu base de datos es trivial con pocas tablas."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de roles y permisos."
                }
            ],
            description: "Organización multi-tenencia y modular de la base de datos.",
            code: `-- Crear y usar esquema
CREATE SCHEMA rrhh;
CREATE TABLE rrhh.nominas (...);`,
            syntaxDescription: "`CREATE SCHEMA` define el espacio de nombres. Para crear una tabla dentro, se usa la notación de punto `esquema.tabla`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El esquema por defecto es `public`. El `search_path` define en qué carpetas busca Postgres si no usas el prefijo.",
                    code: "SET search_path TO rrhh, public;"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Para aplicaciones multi-tenant considera un esquema propio para cada cliente. Facilita backups y aislamiento de datos.",
                    code: "CREATE SCHEMA cliente_a;\nCREATE TABLE cliente_a.pedidos (...);"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Mueve tus tablas de auditoría a un esquema separado (`audit`) para mantener el esquema de negocio (`public`) limpio.",
                    code: "CREATE SCHEMA audit;\nALTER TABLE log_cambios SET SCHEMA audit;"
                }
            ]
        }
    ]
};
