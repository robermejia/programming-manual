export const programacionServidorCategory = {
    title: "6. Programación en el Servidor (PL/pgSQL)",
    topics: [
        {
            id: "funciones-plpgsql",
            title: "Funciones (Functions)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Bloques de código que ejecutan lógica procedimental (variables, bucles) directamente en la base de datos."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permiten mover lógica pesada del backend al servidor de datos, reduciendo el tráfico de red y centralizando reglas de negocio."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita tener que enviar miles de filas a la aplicación para solo obtener un resultado procesado."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas para cálculos complejos y transformaciones. No pongas lógica que cambie constantemente y requiera despliegues rápidos del código frontend."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Lógica de programación básica y sintaxis SQL."
                }
            ],
            description: "Creación de funciones con lógica procedimental.",
            code: `-- Función PL/pgSQL
CREATE FUNCTION calcula_total(subtotal NUMERIC) 
RETURNS NUMERIC AS $$
BEGIN
    RETURN subtotal * 1.21;
END;
$$ LANGUAGE plpgsql;`,
            syntaxDescription: "`RETURNS` define el tipo de salida. El cuerpo de la función se encierra entre `$$`. `plpgsql` es el motor de lenguaje que permite variables y lógica procedural.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "PostgreSQL es extensible. PL/pgSQL es el estándar, pero puedes usar SQL puro, Python o incluso JavaScript.",
                    code: "CREATE FUNCTION add(int, int) RETURNS int AS 'SELECT $1 + $2' LANGUAGE SQL;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Declarar una función como `IMMUTABLE` si consulta tablas. Inmutable significa que SIEMPRE devuelve lo mismo con los mismos inputs.",
                    code: "-- ❌ Incierto\nCREATE FUNCTION get_price(id) RETURNS int IMMUTABLE ... -- Mal si el precio cambia."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa el prefijo `v_` para variables internas y `p_` para parámetros para evitar ambigüedad con columnas de tablas.",
                    code: "DECLARE\n  v_total NUMERIC;\nBEGIN\n  v_total := p_base * 1.21;\nEND;"
                }
            ]
        },
        {
            id: "procedimientos-procs",
            title: "Procedimientos Almacenados",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Parecidos a funciones, pero permiten gestionar transacciones nativas (COMMIT/ROLLBACK) de forma interna."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Esencial para procesos batch largos que necesitan guardar avances parciales para no perder horas de trabajo si el sistema falla."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite orquestar múltiples cambios en la DB que requieren ser guardados en etapas, algo que las funciones puras no pueden hacer."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para mantenimiento y migraciones de datos. No los uses si no necesitas control de transacciones dentro del código."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Manejo de transacciones SQL."
                }
            ],
            description: "Ejecución de procesos que requieren gestión de transacciones.",
            code: `-- Procedimiento moderno
CREATE PROCEDURE transferir(de_id INT, a_id INT, m NUMERIC) AS $$
BEGIN
    UPDATE cuentas SET saldo = saldo - m WHERE id = de_id;
    UPDATE cuentas SET saldo = saldo + m WHERE id = a_id;
    COMMIT; -- Solo válido en Procedures
END;
$$ LANGUAGE plpgsql;`,
            syntaxDescription: "`CREATE PROCEDURE` no devuelve valores directamente. La gran diferencia es la capacidad de usar `COMMIT` o `ROLLBACK` a mitad del cuerpo del código.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "A diferencia de las funciones, los procedimientos se invocan con el comando `CALL`.",
                    code: "CALL transferir(1, 2, 100.00);"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa procedimientos para tareas batch que necesiten guardar avances parciales sin abortar todo si hay un fallo menor.",
                    code: "CREATE PROCEDURE clean_logs() AS ... COMMIT; ..."
                }
            ]
        },
        {
            id: "triggers-disparadores",
            title: "Triggers (Disparadores)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Funciones automáticas que se activan ante eventos de cambio de datos (INSERT, UPDATE, DELETE)."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Son los guardianes definitivos de la integridad y la auditoría, asegurando que nada cambie sin que se activen las reglas de control."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Automatiza tareas como actualizar fechas de modificación, llevar logs de auditoría o sincronizar tablas automáticamente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para auditoría y validación forzosa. No los uses para lógica compleja de la app que deba ser visible por los desarrolladores de backend."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Funciones PL/pgSQL y eventos de tabla."
                }
            ],
            description: "Automatización de acciones basadas en eventos.",
            code: `-- Trigger básico
CREATE TRIGGER audit_log
AFTER UPDATE ON pedidos
FOR EACH ROW EXECUTE FUNCTION log_cambio();`,
            syntaxDescription: "`AFTER UPDATE` define el evento. `FOR EACH ROW` indica que se ejecutará por cada fila afectada. `EXECUTE FUNCTION` invoca la lógica definida previamente.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Usa `NEW` para acceder a los datos entrantes y `OLD` para los datos que ya estaban en la tabla.",
                    code: "IF NEW.precio <> OLD.precio THEN ... END IF;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Triggers recursivos. Un trigger sobre la tabla A que hace un UPDATE en la misma tabla A sin control, creando un bucle infinito.",
                    code: "-- ⚠️ Cuidado con loops infinitos de actualización."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa Triggers `BEFORE` para limpiar datos o validarlos, y `AFTER` para tareas secundarias como auditoría.",
                    code: "CREATE TRIGGER clean_data BEFORE INSERT ON t ... EXECUTE FUNCTION sanitize();"
                }
            ]
        },
        {
            id: "transacciones-acid",
            title: "Transacciones (ACID)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Unidad lógica de trabajo que garantiza que un grupo de sentencias se ejecute como un todo (Todo o Nada)."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "PostgreSQL es famoso mundialmente por su implementación perfecta de ACID, asegurando que tus datos nunca queden corruptos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita situaciones desastrosas como descontar dinero de una cuenta sin sumarlo en la otra si el sistema falla a mitad del proceso."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas siempre que una operación dependa de otra. No mantengas transacciones abiertas por mucho tiempo."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Comandos básicos de SQL (UPDATE, INSERT)."
                }
            ],
            description: "Control de atomicidad and consistencia de datos.",
            code: `-- Transacción atómica
BEGIN;
UPDATE inventario SET stock = stock - 1 WHERE id = 10;
INSERT INTO ventas (p_id) VALUES (10);
COMMIT;`,
            syntaxDescription: "`BEGIN` inicia el modo transaccional. `COMMIT` graba físicamente todos los cambios. Si ocurre un error, cualquier comando previo al `COMMIT` puede revertirse con `ROLLBACK`.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "ACID: Atomicidad, Consistencia, Aislamiento y Durabilidad. Es el pilar de la confiabilidad en Postgres.",
                    code: "-- Si el INSERT falla, el UPDATE se deshace automáticamente."
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Esperar entradas de usuario o llamadas a APIs externas dentro de una transacción. Bloquea la DB innecesariamente.",
                    code: "-- ❌ Nunca hagas peticiones HTTP dentro de BEGIN...COMMIT."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `SAVEPOINT` para crear puntos de retorno dentro de una transacción larga sin abortar el trabajo previo.",
                    code: "SAVEPOINT p1;\n-- Si algo falla...\nROLLBACK TO p1;"
                }
            ]
        }
    ]
};
