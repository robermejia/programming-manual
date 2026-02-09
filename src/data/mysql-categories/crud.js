export const crudCategory = {
    title: "3. Manipulación de Datos (CRUD)",
    topics: [
        {
            id: "mysql-crud-insert",
            title: "Insertar (INSERT)",
            content: [
                { title: "¿Qué es?", text: "El comando INSERT se utiliza para agregar uno o más registros nuevos a una tabla de la base de datos." },
                { title: "¿Por qué es importante?", text: "Es la forma fundamental de poblar la base de datos con información." },
                { title: "¿Qué problema real resuelve?", text: "Permite persistir los datos generados por la aplicación o el usuario." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo para crear nuevos recursos. Usa INSERT IGNORE o REPLACE con precaución para evitar errores de claves duplicadas." },
                { title: "¿Qué conocimientos previos requiere?", text: "Conocer la estructura de la tabla destino." }
            ],
            syntaxDescription: "El comando para poblar tus tablas con información.",
            description: "Creación de registros.",
            code: `INSERT INTO usuarios (nombre, edad) VALUES ('Ana', 25);
-- Múltiples filas
INSERT INTO usuarios (nombre, edad) VALUES 
('Luis', 30),
('Carlos', 22);`,
            useCases: [
                {
                    title: "Registro de Usuario",
                    description: "Insertar un nuevo usuario especificando solo las columnas obligatorias.",
                    code: "INSERT INTO users (username, email) VALUES ('dev_master', 'dev@email.com');"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Batch Insert",
                    content: "Si vas a insertar 1000 filas, hazlo en un solo `INSERT` con múltiples valores, no en 1000 `INSERT` separados. Es muchísimo más rápido.",
                    code: "INSERT INTO t (a) VALUES (1), (2), (3)...;"
                },
                {
                    type: "error",
                    title: "Confiar en el orden de columnas",
                    content: "Siempre especifica los nombres de las columnas `(col1, col2)`. Si la estructura cambia, tu insert fallará.",
                    code: "INSERT INTO t VALUES (1, 'a'); -- ❌ Frágil\nINSERT INTO t (id, nom) VALUES (1, 'a'); -- ✅ Seguro"
                }
            ]
        },
        {
            id: "mysql-crud-select",
            title: "Consultar (SELECT)",
            content: [
                { title: "¿Qué es?", text: "Es el comando más utilizado en SQL. Permite recuperar datos de una o más tablas basándose en criterios específicos." },
                { title: "¿Por qué es importante?", text: "Es la 'R' de CRUD (Read). Sin él, los datos serían agujeros negros: información que entra pero no se puede ver." },
                { title: "¿Qué problema real resuelve?", text: "Acceso y recuperación de información." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre que necesites datos. Evita `SELECT *` en producción por rendimiento; pide solo las columnas que necesitas." },
                { title: "¿Qué conocimientos previos requiere?", text: "Ninguno, es la base de SQL." }
            ],
            syntaxDescription: "La herramienta principal para hacer preguntas a tus datos.",
            description: "Lectura de datos.",
            code: `SELECT * FROM usuarios;
SELECT nombre, email FROM usuarios LIMIT 10;
SELECT DISTINCT pais FROM clientes;`,
            useCases: [
                {
                    title: "Paginación",
                    description: "Obtener la segunda página de resultados (registros 11-20).",
                    code: "SELECT * FROM productos LIMIT 10 OFFSET 10;"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "SELECT * Evil",
                    content: "Nunca uses `SELECT *` en una app real. Trae columnas que no usas y rompe índices. Sé explícito.",
                    code: "SELECT * FROM users; -- ❌ Malo\nSELECT id, nombre FROM users; -- ✅ Bueno"
                },
                {
                    type: "idea",
                    title: "Alias",
                    content: "Usa `AS` para renombrar columnas o tablas temporalmente, haciendo el código más legible.",
                    code: "SELECT AVG(precio) AS precio_promedio FROM productos;"
                }
            ]
        },
        {
            id: "mysql-crud-where",
            title: "Filtrar (WHERE)",
            content: [
                { title: "¿Qué es?", text: "Es una cláusula que restringe los registros devueltos por SELECT (o afectados por UPDATE/DELETE) a aquellos que cumplen una condición." },
                { title: "¿Por qué es importante?", text: "Permite trabajar con datos específicos en lugar de con toda la tabla." },
                { title: "¿Qué problema real resuelve?", text: "Evita traer o modificar millones de registros cuando solo te interesa uno." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Casi siempre. Operar sin WHERE en UPDATE/DELETE es peligroso (modifica todo)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Lógica booleana (AND, OR, NOT)." }
            ],
            syntaxDescription: "El filtro que decide qué filas específicas te interesan de todo el conjunto.",
            description: "Condiciones de búsqueda.",
            code: `SELECT * FROM usuarios WHERE activo = 1;
SELECT * FROM productos WHERE precio BETWEEN 100 AND 500;
SELECT * FROM clientes WHERE nombre LIKE 'A%';`,
            useCases: [
                {
                    title: "Búsqueda Parcial",
                    description: "Encontrar usuarios cuyo correo termine en '@gmail.com'.",
                    code: "SELECT * FROM usuarios WHERE email LIKE '%@gmail.com';"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Sargable Queries",
                    content: "Evita funciones en las columnas del WHERE. Eso impide usar índices. Mejor compara rangos.",
                    code: "-- ❌ Lento: WHERE YEAR(d) = 2023\n-- ✅ Rápido: WHERE d BETWEEN '2023-01-01' AND '2023-12-31'"
                },
                {
                    type: "idea",
                    title: "IN vs OR",
                    content: "Si vas a comprobar múltiples valores para un mismo campo, usa `IN` en vez de muchos `OR`.",
                    code: "WHERE id IN (1, 2, 3); -- Mejor que id=1 OR id=2..."
                }
            ]
        },
        {
            id: "mysql-crud-order",
            title: "Ordenar (ORDER BY)",
            content: [
                { title: "¿Qué es?", text: "Cláusula que ordena el conjunto de resultados devuelto por una consulta según una o más columnas." },
                { title: "¿Por qué es importante?", text: "Los datos en una tabla no tienen un orden garantizado. Si necesitas orden (ranking, alfabético), debes pedirlo explícitamente." },
                { title: "¿Qué problema real resuelve?", text: "Presentación de datos de forma lógica y legible para el usuario." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo para reportes o listas UI. Ten en cuenta que ordenar grandes volúmenes de datos puede ser costoso computacionalmente." },
                { title: "¿Qué conocimientos previos requiere?", text: "Concepto de ascendente (ASC) y descendente (DESC)." }
            ],
            syntaxDescription: "Organiza los resultados de tu consulta según uno o más criterios.",
            description: "Ordenamiento de resultados.",
            code: `SELECT * FROM ventas ORDER BY fecha DESC;
SELECT * FROM empleados ORDER BY departamento ASC, sueldo DESC;`,
            useCases: [
                {
                    title: "Top Productos",
                    description: "Listar los productos más caros primero.",
                    code: "SELECT * FROM productos ORDER BY precio DESC;"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Múltiples Criterios",
                    content: "Puedes ordenar por varias columnas. MySQL ordenará por la primera, y si hay empates, usará la segunda.",
                    code: "ORDER BY apellido ASC, nombre ASC"
                },
                {
                    type: "performance",
                    title: "Índices y Orden",
                    content: "Si ordenas por columnas que no están indexadas, MySQL tendrá que ordenar en disco ('filesort'), lo cual es lento.",
                    code: "EXPLAIN SELECT ... -- 'Using filesort' es malo"
                }
            ]
        },
        {
            id: "mysql-crud-update",
            title: "Actualizar (UPDATE)",
            content: [
                { title: "¿Qué es?", text: "Comando para modificar valores de registros existentes en una tabla." },
                { title: "¿Por qué es importante?", text: "Permite mantener la información al día (cambios de precio, corrección de nombres)." },
                { title: "¿Qué problema real resuelve?", text: "Evolución de los datos sin necesidad de borrarlos y recrearlos." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre que un dato cambie. ¡Cuidado! Si olvidas el WHERE, actualizarás TODOS los registros." },
                { title: "¿Qué conocimientos previos requiere?", text: "Uso estricto de WHERE." }
            ],
            syntaxDescription: "Modifica la información existente. ¡Cuidado con olvidar el WHERE!",
            description: "Modificación de registros.",
            code: `UPDATE usuarios SET activo = 1 WHERE id = 5;
UPDATE productos SET precio = precio * 1.10 WHERE categoria = 'Electrónica';`,
            useCases: [
                {
                    title: "Soft Delete",
                    description: "Marcar un registro como eliminado sin borrarlo físicamente.",
                    code: "UPDATE usuarios SET deleted_at = NOW() WHERE id = 123;"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Olvido del WHERE",
                    content: "El error número 1 en bases de datos: ejecutar un `UPDATE` sin `WHERE`. Esto sobrescribe TODA la tabla.",
                    code: "UPDATE usuarios SET pass='1234'; -- 😱 Adiós contraseñas"
                },
                {
                    type: "goodPractice",
                    title: "LIMIT 1",
                    content: "Si solo quieres actualizar una fila específica, añade `LIMIT 1` al final por seguridad.",
                    code: "UPDATE ... WHERE id=1 LIMIT 1;"
                }
            ]
        },
        {
            id: "mysql-crud-delete",
            title: "Eliminar (DELETE)",
            content: [
                { title: "¿Qué es?", text: "Comando para borrar registros de una tabla." },
                { title: "¿Por qué es importante?", text: "Permite eliminar información obsoleta o errónea." },
                { title: "¿Qué problema real resuelve?", text: "Gestión del ciclo de vida de los datos y liberación de espacio." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo con extrema precaución. En sistemas modernos, se prefiere el 'Soft Delete' (UPDATE de una flag) para no perder histórico." },
                { title: "¿Qué conocimientos previos requiere?", text: "Impacto en claves foráneas (ON DELETE CASCADE)." }
            ],
            syntaxDescription: "Elimina permanentemente registros de la base de datos.",
            description: "Borrado de datos.",
            code: `DELETE FROM logs WHERE fecha < '2025-01-01';
DELETE FROM carrito WHERE usuario_id = 99;`,
            useCases: [
                {
                    title: "Limpieza",
                    description: "Eliminar usuarios inactivos por más de un año.",
                    code: "DELETE FROM usuarios WHERE last_login < DATE_SUB(NOW(), INTERVAL 1 YEAR);"
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Soft Delete",
                    content: "En lugar de borrar, añade una columna `deleted_at`. Es más seguro y permite restaurar datos.",
                    code: "UPDATE users SET deleted_at = NOW() WHERE id = 1;"
                },
                {
                    type: "error",
                    title: "TRUNCATE vs DELETE",
                    content: "Si quieres borrar TODO usa `TRUNCATE TABLE`. Es mucho más rápido que `DELETE` porque no registra acción por acción.",
                    code: "TRUNCATE TABLE logs_viejos;"
                }
            ]
        }
    ]
};
