export const administrationCategory = {
    title: "7. Administración y Optimización",
    topics: [
        {
            id: "mysql-admin-transactions",
            title: "Transacciones",
            content: [
                { title: "¿Qué es?", text: "Unidad de trabajo lógica que consta de una o más operaciones SQL. O se completan todas (COMMIT) o ninguna (ROLLBACK)." },
                { title: "¿Por qué es importante?", text: "Es la base de la integridad de datos en sistemas concurrentes (ACID)." },
                { title: "¿Qué problema real resuelve?", text: "Evita estados inconsistentes, como descontar dinero a A pero fallar al abonárselo a B." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre que modifiques múltiples registros relacionados. Solo funciona con motores transaccionales como InnoDB." },
                { title: "¿Qué conocimientos previos requiere?", text: "Propiedades ACID." }
            ],
            syntaxDescription: "Garantiza que un grupo de operaciones se ejecuten todas o ninguna (atomicidad).",
            description: "Integridad y atomicidad.",
            code: `START TRANSACTION;
UPDATE cuenta SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuenta SET saldo = saldo + 100 WHERE id = 2;
COMMIT;`,
            useCases: [
                {
                    title: "Transferencia Bancaria",
                    description: "Asegurar que no se descuente dinero de una cuenta si falla el abono en la otra.",
                    code: "ROLLBACK; -- Si algo falla antes del COMMIT"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Auto-commit",
                    content: "MySQL tiene autocommit activado por defecto. UPDATEs son permanentes al instante si no inicias transacción.",
                    code: "SET autocommit = 0; -- Desactiva autocommit"
                },
                {
                    type: "performance",
                    title: "Transacciones cortas",
                    content: "Mantén las transacciones cortas. Una transacción abierta bloquea filas.",
                    code: "-- No hacer sleeps o llamadas a API externas en medio"
                }
            ]
        },
        {
            id: "mysql-admin-users",
            title: "Usuarios y Permisos",
            content: [
                { title: "¿Qué es?", text: "Sistema de gestión de identidades y privilegios de MySQL." },
                { title: "¿Por qué es importante?", text: "La seguridad es crítica. No todos deben poder borrar tablas o ver datos sensibles." },
                { title: "¿Qué problema real resuelve?", text: "Control de acceso granular y principio de mínimo privilegio." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Crea usuarios específicos para cada aplicación. NUNCA uses 'root' desde la aplicación." },
                { title: "¿Qué conocimientos previos requiere?", text: "Seguridad básica." }
            ],
            syntaxDescription: "Controla quién puede entrar y qué puede hacer en la base de datos.",
            description: "Seguridad.",
            code: `CREATE USER 'app'@'localhost' IDENTIFIED BY 'pass123';
GRANT SELECT, INSERT ON tienda.* TO 'app'@'localhost';
FLUSH PRIVILEGES;`,
            useCases: [
                {
                    title: "Usuario de Lectura",
                    description: "Crear un usuario para reportes que solo pueda leer datos.",
                    code: "GRANT SELECT ON *.* TO 'reportes'@'%';"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Host específico",
                    content: "Restringe el acceso a la IP de tu servidor web en lugar de `%` (cualquiera).",
                    code: "CREATE USER 'app'@'192.168.1.50' ..."
                },
                {
                    type: "warning",
                    title: "Flush Privileges",
                    content: "No es necesario si usas `CREATE USER`. Solo si modificas `mysql.user` directamente.",
                    code: "FLUSH PRIVILEGES; -- Solo a veces"
                }
            ]
        },
        {
            id: "mysql-admin-import",
            title: "Importar / Exportar",
            content: [
                { title: "¿Qué es?", text: "Herramientas para mover datos masivamente dentro y fuera del servidor (bulks)." },
                { title: "¿Por qué es importante?", text: "Insertar 1 millón de filas una por una es lento. LOAD DATA es instantáneo." },
                { title: "¿Qué problema real resuelve?", text: "Migraciones de datos, backups y carga inicial de información." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para movimientos masivos de datos." },
                { title: "¿Qué conocimientos previos requiere?", text: "Formatos de archivo (CSV)." }
            ],
            syntaxDescription: "Mover datos masivamente dentro y fuera de MySQL.",
            description: "Migración de datos.",
            code: `LOAD DATA INFILE '/tmp/datos.csv' 
INTO TABLE tabla 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\\n';`,
            useCases: [
                {
                    title: "Backup CSV",
                    description: "Exportar listado de correos para marketing.",
                    code: "SELECT email INTO OUTFILE 'emails.csv' FROM usuarios;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Mysqldump",
                    content: "Para backups completos, usa `mysqldump` desde la consola, no SQL.",
                    code: "$ mysqldump -u user -p db > backup.sql"
                },
                {
                    type: "error",
                    title: "Permisos de archivo",
                    content: "MySQL corre como `mysql`. Asegúrate de que tenga permisos de lectura en la carpeta del CSV.",
                    code: "$ chown mysql:mysql import.csv"
                }
            ]
        },
        {
            id: "mysql-admin-partitioning",
            title: "Particionamiento",
            content: [
                { title: "¿Qué es?", text: "Técnica para dividir físicamente una tabla lógica grande en partes más pequeñas y manejables." },
                { title: "¿Por qué es importante?", text: "Mejora el rendimiento de consultas y mantenimiento en tablas con cientos de millones de filas." },
                { title: "¿Qué problema real resuelve?", text: "Búsquedas lentas y tiempos de backup inmanejables en Big Data." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Solo en tablas masivas donde el índice ya no cabe en memoria." },
                { title: "¿Qué conocimientos previos requiere?", text: "Estructura física de datos." }
            ],
            syntaxDescription: "Dividir tablas gigantes en pedazos más pequeños y manejables físicamente.",
            description: "Optimización de grandes volúmenes.",
            code: `CREATE TABLE logs (dt DATE)
PARTITION BY RANGE (YEAR(dt)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);`,
            useCases: [
                {
                    title: "Histórico de Logs",
                    description: "Separar datos por año para que las consultas recientes sean más rápidas.",
                    code: "PARTITION BY RANGE (YEAR(created_at))"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Borrado instantáneo",
                    content: "Usa `DROP PARTITION` para borrar millones de filas viejas instantáneamente.",
                    code: "ALTER TABLE logs DROP PARTITION p2023;"
                },
                {
                    type: "warning",
                    title: "Clave Primaria",
                    content: "Todas las columnas de partición DEBEN ser parte de la Primary Key.",
                    code: "PRIMARY KEY (id, fecha) -- fecha requerida si particionas por fecha"
                }
            ]
        },
        {
            id: "mysql-admin-info",
            title: "Información del Sistema",
            content: [
                { title: "¿Qué es?", text: "Comandos para inspeccionar el estado, configuración y actividad del servidor." },
                { title: "¿Por qué es importante?", text: "Necesario para diagnóstico, tuning y monitoreo." },
                { title: "¿Qué problema real resuelve?", text: "Permite responder '¿Por qué está lenta la DB?' identificando bloqueos o cuellos de botella." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Cuando administras o optimizas la BD." },
                { title: "¿Qué conocimientos previos requiere?", text: "Arquitectura interna de MySQL." }
            ],
            syntaxDescription: "Comandos para diagnosticar la salud y el comportamiento del servidor.",
            description: "Diagnóstico.",
            code: `SHOW PROCESSLIST;
SHOW VARIABLES LIKE 'max_connections';
EXPLAIN SELECT * FROM users WHERE id = 1;`,
            useCases: [
                {
                    title: "Debug Performance",
                    description: "Ver si hay consultas bloqueadas o lentas ejecutándose ahora.",
                    code: "SHOW FULL PROCESSLIST;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "EXPLAIN siempre",
                    content: "Usa `EXPLAIN` para ver si tu consulta usa índices.",
                    code: "EXPLAIN SELECT ... -- key: NULL es malo"
                },
                {
                    type: "idea",
                    title: "Variables de Sesión",
                    content: "Puedes cambiar variables solo para tu conexión sin afectar al servidor.",
                    code: "SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION';"
                }
            ]
        }
    ]
};
