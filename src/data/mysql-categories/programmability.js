export const programmabilityCategory = {
    title: "6. Programación y Objetos",
    topics: [
        {
            id: "mysql-prog-views",
            title: "Vistas (Views)",
            content: [
                { title: "¿Qué es?", text: "Una tabla virtual basada en el conjunto de resultados de una consulta SQL. No almacena datos físicos, solo la definición de la consulta." },
                { title: "¿Por qué es importante?", text: "Simplifica el acceso a datos complejos. En lugar de escribir un JOIN enorme cada vez, consultada la vista simple." },
                { title: "¿Qué problema real resuelve?", text: "Abstracción y seguridad. Puedes dar acceso a una vista sin dar acceso a las tablas subyacentes." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para reportes frecuentes o interfaces simplificadas. No las uses si el rendimiento es crítico (no están cacheadas por defecto)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Comandos SELECT complejos." }
            ],
            syntaxDescription: "Una tabla virtual basada en el conjunto de resultados de una consulta SQL.",
            description: "Consultas guardadas.",
            code: `CREATE VIEW vista_empleados AS 
SELECT id, nombre, departamento 
FROM empleados 
WHERE activo = 1;

SELECT * FROM vista_empleados;`,
            useCases: [
                {
                    title: "Seguridad",
                    description: "Ocultar columnas sensibles (salario, passwords) exponiendo solo datos públicos en una vista.",
                    code: "CREATE VIEW public_users AS SELECT username, public_email FROM users;"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Vistas como Interface",
                    content: "Usa vistas para desacoplar tu aplicación de la estructura real de la BD.",
                    code: "CREATE VIEW api_users AS SELECT id, CONCAT(a, b) FROM t;"
                },
                {
                    type: "error",
                    title: "Performance Trap",
                    content: "Una vista no es mágica. Si la consulta subyacente es lenta, la vista será lenta.",
                    code: "EXPLAIN SELECT * FROM vista_lenta;"
                }
            ]
        },
        {
            id: "mysql-prog-procedures",
            title: "Procedimientos Almacenados",
            content: [
                { title: "¿Qué es?", text: "Conjunto de instrucciones SQL que se guardan en la base de datos y se pueden llamar por su nombre." },
                { title: "¿Por qué es importante?", text: "Centraliza la lógica de negocio en la base de datos, reduce el tráfico de red y mejora el rendimiento." },
                { title: "¿Qué problema real resuelve?", text: "Evita enviar múltiples consultas desde la aplicación para realizar una sola tarea lógica." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para procesos batch o transacciones complejas. Evita poner lógica de negocio volátil allí (difícil de versionar)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Programación procedural (variables, loops)." }
            ],
            syntaxDescription: "Código SQL encapsulado que se guarda en la base de datos y se puede ejecutar bajo demanda.",
            description: "Logica de negocio en BD.",
            code: `DELIMITER //
CREATE PROCEDURE GetUserCount(OUT total INT)
BEGIN
    SELECT COUNT(*) INTO total FROM users;
END //
DELIMITER ;

CALL GetUserCount(@total);
SELECT @total;`,
            useCases: [
                {
                    title: "Batch Processing",
                    description: "Ejecutar una serie de operaciones complejas de limpieza nocturna.",
                    code: "CALL LimpiezaDiaria();"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Versionado",
                    content: "El código en procedures es difícil de rastrear con Git. Mantén siempre el código fuente el repositorio.",
                    code: "-- Guardar en archivo: db/procedures/cleanup.sql"
                },
                {
                    type: "error",
                    title: "Lógica excesiva",
                    content: "No intentes reprogramar tu API en SQL. Las bases de datos son malas procesando strings.",
                    code: "-- Evitar bucles complejos en SQL"
                }
            ]
        },
        {
            id: "mysql-prog-functions",
            title: "Funciones Almacenadas",
            content: [
                { title: "¿Qué es?", text: "Rutinas guardadas que reciben parámetros y retornan UN valor. Se usan dentro de sentencias SQL (como SELECT o WHERE)." },
                { title: "¿Por qué es importante?", text: "Permite extender el lenguaje SQL con tus propias fórmulas o lógica de conversión." },
                { title: "¿Qué problema real resuelve?", text: "Reutilización de cálculos complejos (ej. fórmula de distancia, cálculo de impuestos) en múltiples consultas." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para cálculos deterministas. No pueden realizar transacciones ni modificar datos." },
                { title: "¿Qué conocimientos previos requiere?", text: "Diferencia entre función y procedimiento." }
            ],
            syntaxDescription: "Similar a los procedimientos, pero diseñadas para retornar un valor y usarse dentro de consultas SQL.",
            description: "Funciones personalizadas.",
            code: `DELIMITER //
CREATE FUNCTION CalcularIVA(precio DECIMAL(10,2)) 
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
    RETURN precio * 0.21;
END //
DELIMITER ;

SELECT precio, CalcularIVA(precio) FROM productos;`,
            useCases: [
                {
                    title: "Calculadora de Precios",
                    description: "Encapsular la lógica de cálculo de precios complejos.",
                    code: "SELECT GetFinalPrice(id) FROM products;"
                }
            ],
            tips: [
                {
                    type: "performance",
                    title: "Determinismo",
                    content: "Marca tus funciones como `DETERMINISTIC` si siempre devuelven lo mismo. MySQL optimiza el resultado.",
                    code: "CREATE FUNCTION ... RETURNS INT DETERMINISTIC"
                },
                {
                    type: "error",
                    title: "Side Effects",
                    content: "Las funciones no pueden hacer COMMIT ni modificar tablas. Solo pueden leer y calcular.",
                    code: "-- COMMIT da error dentro de FUNCTION"
                }
            ]
        },
        {
            id: "mysql-prog-triggers",
            title: "Triggers (Disparadores)",
            content: [
                { title: "¿Qué es?", text: "Código que se ejecuta automáticamente ('se dispara') en respuesta a eventos en una tabla (INSERT, UPDATE, DELETE)." },
                { title: "¿Por qué es importante?", text: "Garantiza que ciertas acciones ocurran siempre, sin importar qué aplicación modifique los datos." },
                { title: "¿Qué problema real resuelve?", text: "Auditoría automática, validaciones complejas o actualización de contadores/resúmenes." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para auditoría y consistencia crítica. Úsalos con moderación: son 'invisibles' y difíciles de depurar." },
                { title: "¿Qué conocimientos previos requiere?", text: "Eventos de base de datos." }
            ],
            syntaxDescription: "Acciones automáticas que se disparan en respuesta a cambios en las tablas.",
            description: "Automatización de eventos.",
            code: `CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO logs (action, user_id) VALUES ('create', NEW.id);
END;`,
            useCases: [
                {
                    title: "Auditoría",
                    description: "Guardar automáticamente una copia del registro anterior antes de cada actualización.",
                    code: "INSERT INTO history (old_email, changed_at) VALUES (OLD.email, NOW());"
                }
            ],
            tips: [
                {
                    type: "warning",
                    title: "Magia invisible",
                    content: "Los triggers son peligrosos porque son invisibles. Si un INSERT es lento, suele ser un trigger.",
                    code: "SHOW TRIGGERS LIKE 'users';"
                },
                {
                    type: "goodPractice",
                    title: "No lógica de negocio",
                    content: "Usa triggers solo para integridad de datos o auditoría. No envíes emails.",
                    code: "-- Call API externa -> MAL"
                }
            ]
        },
        {
            id: "mysql-prog-events",
            title: "Eventos (Jobs)",
            content: [
                { title: "¿Qué es?", text: "Tareas programadas que se ejecutan en el servidor MySQL según un horario definido (como CRON)." },
                { title: "¿Por qué es importante?", text: "Permite automatizar el mantenimiento de la base de datos sin depender de scripts externos o del SO." },
                { title: "¿Qué problema real resuelve?", text: "Automatización de limpiezas, rotación de logs o generación de reportes periódicos." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para tareas de mantenimiento de BD. Asegúrate de que el scheduler de eventos esté activado." },
                { title: "¿Qué conocimientos previos requiere?", text: "Conceptos de scheduling." }
            ],
            syntaxDescription: "El 'cron' interno de MySQL para tareas programadas.",
            description: "Tareas programadas.",
            code: `CREATE EVENT borrar_tokens
ON SCHEDULE EVERY 1 HOUR
DO
    DELETE FROM tokens WHERE expira < NOW();`,
            useCases: [
                {
                    title: "Mantenimiento Automático",
                    description: "Eliminar registros temporales cada noche.",
                    code: "ON SCHEDULE EVERY 1 DAY STARTS '2025-01-01 03:00:00'"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Event Scheduler OFF",
                    content: "Por defecto, el organizador de eventos puede estar apagado. Verifica que esté ON.",
                    code: "SHOW VARIABLES LIKE 'event_scheduler';"
                },
                {
                    type: "idea",
                    title: "Limpieza automática",
                    content: "Perfectos para purgar tablas sin configurar nada en el servidor Linux/Windows.",
                    code: "DELETE FROM logs WHERE date < NOW() - INTERVAL 1 MONTH"
                }
            ]
        }
    ]
};
