export const administracionCategory = {
    title: "8. Seguridad y Administración",
    topics: [
        {
            id: "usuarios-roles",
            title: "Usuarios y Permisos (RBAC)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Sistema de gestión de accesos basado en Roles para controlar quién puede entrar y qué puede hacer."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Garantiza el cumplimiento de estándares de seguridad y protege la integridad de los datos sensibles."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Aísla el acceso a los datos, evitando que un fallo en la aplicación comprometa toda la base de datos o que usuarios no autorizados vean información confidencial."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo siempre. Nunca utilices el usuario 'postgres' en producción. Asigna solo los permisos mínimos necesarios."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos básicos de seguridad informática."
                }
            ],
            description: "Gestión de accesos y seguridad basada en roles.",
            code: `-- Crear y otorgar
CREATE ROLE analista;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analista;`,
            syntaxDescription: "`CREATE ROLE` define una entidad de seguridad. `GRANT SELECT` otorga permisos de solo lectura. El esquema `public` se usa para aplicar la regla a todas las tablas actuales.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Un ROL puede ser un Usuario (con Login) o un Grupo (contendor de permisos).",
                    code: "CREATE ROLE u1 WITH LOGIN PASSWORD '123';\nGRANT mi_grupo TO u1;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Usar la cuenta `postgres` para la aplicación web. Es un riesgo masivo; usa una cuenta con 'Privilegios Mínimos'.",
                    code: "-- ❌ FATAL\nusername: postgres\n-- ✅ MEJOR\nusername: app_user"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa RLS (Row Level Security) si necesitas que un usuario X solo pueda ver sus propias filas en una tabla compartida.",
                    code: "CREATE POLICY p1 ON t FOR SELECT USING (user_id = current_user);"
                }
            ]
        },
        {
            id: "optimizacion-explain",
            title: "Optimización con EXPLAIN",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Muestra el plan de ejecución que el motor usará para resolver una consulta."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Es la herramienta indispensable para cualquier DBA o desarrollador Backend que busque un rendimiento óptimo."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Identifica por qué una consulta es lenta (ej. falta un índice, el motor está leyendo demasiados datos) antes de que afecte a los usuarios."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo cada vez que desarrolles una nueva funcionalidad o detectes lentitud. No te obsesiones con optimizar consultas que corren en milisegundos."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de escaneo secuencial e índices."
                }
            ],
            description: "Análisis y depuración de rendimiento de consultas.",
            code: `-- Analizar rendimiento real
EXPLAIN ANALYZE SELECT * FROM ventas;`,
            syntaxDescription: "`EXPLAIN` muestra el plan teórico. Al añadir `ANALYZE`, PostgreSQL **ejecuta** realmente la consulta y ofrece métricas precisas de tiempo real y recursos usados.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El 'Cost' no es tiempo, es una estimación de recursos de E/S y CPU.",
                    code: "cost=0.00..15.50 rows=550 width=12"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Obsesionarse con eliminar los 'Sequential Scans'. En tablas muy pequeñas, leer toda la tabla es más rápido que usar un índice.",
                    code: "-- Si la tabla tiene 50 filas, Seq Scan es perfecto."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `ANALYZE` regularmente para que las estadísticas del optimizador sean precisas y no elija planes de ejecución malos.",
                    code: "VACUUM ANALYZE usuarios;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Usa `BUFFERS` para ver cuántos bloques de memoria está leyendo Postgres realmente.",
                    code: "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM t;"
                }
            ]
        },
        {
            id: "import-export-copy",
            title: "Importar y Exportar (COPY)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Mecanismo de alta velocidad para mover datos entre archivos y tablas."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite alimentar la base de datos con millones de registros en segundos, algo vital para Big Data y migraciones."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita el overhead del parseo SQL individual para cargas masivas, siendo hasta 10 veces más rápido que múltiples INSERTs."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para cargas y descargas masivas de datos. No lo uses para cambios individuales en vivo en la aplicación."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Formatos de archivos planos (CSV, TXT)."
                }
            ],
            description: "Movimiento masivo de datos de alta velocidad.",
            code: `-- Exportar a CSV
COPY usuarios TO '/tmp/datos.csv' (FORMAT CSV, HEADER);`,
            syntaxDescription: "`COPY` vuelca datos de una tabla a un archivo físico. `FORMAT CSV` define el estándar y `HEADER` incluye los nombres de las columnas en la primera fila.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El comando `COPY` inserta datos directamente sin pasar por todo el overhead del parser SQL normal, siendo el más rápido.",
                    code: "COPY t FROM STDIN; -- Forma común en backups"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Confundir `COPY` (Server side) con `\\copy` (Client side). El primero requiere permisos en la carpeta del servidor físico.",
                    code: "-- 🖥️ Local (psql): \\copy table FROM 'file.csv'\n-- 🗄️ Server: COPY table FROM '/var/lib/data.csv'"
                }
            ]
        }
    ]
};
