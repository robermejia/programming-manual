export const advancedQueryingCategory = {
    title: "4. Consultas Avanzadas",
    topics: [
        {
            id: "mysql-advanced-groupby",
            title: "Agrupación (GROUP BY)",
            content: [
                { title: "¿Qué es?", text: "Cláusula que agrupa filas con los mismos valores en filas de resumen, como 'encontrar el número de clientes en cada país'." },
                { title: "¿Por qué es importante?", text: "Es esencial para la inteligencia de negocios y reportes. Permite ver 'el bosque' en lugar de 'los árboles'." },
                { title: "¿Qué problema real resuelve?", text: "Permite calcular totales, promedios y estadísticas sobre conjuntos de datos." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo siempre que necesites agregar datos. No es para listar registros individuales." },
                { title: "¿Qué conocimientos previos requiere?", text: "Funciones de agregación (COUNT, SUM, AVG)." }
            ],
            syntaxDescription: "Permite condensar múltiples filas en una sola, útil para generar reportes y estadísticas.",
            description: "Agregación de datos.",
            code: `SELECT categoria, COUNT(*) FROM productos 
GROUP BY categoria 
HAVING COUNT(*) > 5;`,
            useCases: [
                {
                    title: "Total de Ventas",
                    description: "Calcular el total vendido por cada vendedor.",
                    code: "SELECT vendedor_id, SUM(monto) FROM ventas GROUP BY vendedor_id;"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "ONLY_FULL_GROUP_BY",
                    content: "En MySQL moderno, no puedes seleccionar columnas que no estén en el `GROUP BY` ni en una función de agregación. Dará error.",
                    code: "SELECT nombre, SUM(total) FROM ventas; -- ❌ Error si nombre no está agrupado"
                },
                {
                    type: "idea",
                    title: "HAVING vs WHERE",
                    content: "`WHERE` filtra antes de agrupar. `HAVING` filtra después de agrupar (sobre los totales).",
                    code: "-- Ventas > 100 de vendedores activos\nWHERE activo = 1 GROUP BY vendedor HAVING SUM(total) > 100"
                }
            ]
        },
        {
            id: "mysql-advanced-joins",
            title: "Uniones (JOINS)",
            content: [
                { title: "¿Qué es?", text: "Operación que combina columnas de una o más tablas basándose en claves relacionadas entre ellas." },
                { title: "¿Por qué es importante?", text: "Las bases de datos relacionales normalizadas separan los datos. Los JOINs son el pegamento que vuelve a unir esa información para el usuario." },
                { title: "¿Qué problema real resuelve?", text: "Permite consultar datos distribuidos, como 'ver el nombre del cliente junto con los detalles de su pedido'." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo para conectar entidades relacionadas. Evita demasiados JOINs en una sola consulta (afecta rendimiento)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Claves primarias y foráneas." }
            ],
            syntaxDescription: "Conecta datos de diferentes tablas basándose en una columna común (clave foránea).",
            description: "Relacionando tablas.",
            code: `SELECT u.nombre, p.titulo 
FROM usuarios u
JOIN posts p ON u.id = p.autor_id;`,
            useCases: [
                {
                    title: "Usuarios sin Pedidos",
                    description: "Encontrar usuarios que nunca han comprado nada (usando LEFT JOIN).",
                    code: "SELECT nombre FROM usuarios u LEFT JOIN pedidos p ON u.id = p.usuario_id WHERE p.id IS NULL;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Usa Alias Cortos",
                    content: "Usa alias de una letra para las tablas (`usuarios u`, `pedidos p`) para que la consulta sea más legible.",
                    code: "SELECT u.id, p.id FROM usuarios u JOIN pedidos p..."
                },
                {
                    type: "error",
                    title: "Producto Cartesiano",
                    content: "Si olvidas el `ON` en un JOIN, MySQL combinará CADA fila de una tabla con CADA fila de la otra (Join cruzado).",
                    code: "SELECT * FROM a JOIN b; -- 😱 1000 x 1000 = 1 millón"
                }
            ]
        },
        {
            id: "mysql-advanced-subqueries",
            title: "Subconsultas",
            content: [
                { title: "¿Qué es?", text: "Una consulta SQL anidada dentro de otra consulta mayor." },
                { title: "¿Por qué es importante?", text: "Permite realizar operaciones en pasos lógicos sin necesidad de scripts externos." },
                { title: "¿Qué problema real resuelve?", text: "Resuelve preguntas complejas como '¿Quién tiene el salario por encima del promedio?' (que requiere calcular el promedio primero)." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Útil para lógica compleja. A veces un JOIN es más eficiente que una subconsulta correlacionada." },
                { title: "¿Qué conocimientos previos requiere?", text: "Entender el orden de ejecución de SQL." }
            ],
            syntaxDescription: "Una consulta anidada dentro de otra. Puede usarse en SELECT, FROM o WHERE.",
            description: "Consultas anidadas.",
            code: `SELECT * FROM productos 
WHERE precio > (SELECT AVG(precio) FROM productos);`,
            useCases: [
                {
                    title: "Mejor Vendedor",
                    description: "Encontrar al empleado con más ventas sin usar LIMIT.",
                    code: "SELECT nombre FROM empleados WHERE id = (SELECT empleado_id FROM ventas GROUP BY empleado_id ORDER BY SUM(total) DESC LIMIT 1);"
                }
            ],
            tips: [
                {
                    type: "performance",
                    title: "Dependent Subqueries",
                    content: "Evita subconsultas que dependan de la consulta externa (correlacionadas) dentro de un bucle, son muy lentas.",
                    code: "SELECT * FROM t1 WHERE col1 = (SELECT ... FROM t2 WHERE t2.id = t1.id)"
                },
                {
                    type: "idea",
                    title: "Usar IN",
                    content: "La forma más común de subconsulta es con `IN`. 'Dame usuarios que estén en la lista de morosos'.",
                    code: "WHERE id IN (SELECT user_id FROM deudas)"
                }
            ]
        },
        {
            id: "mysql-advanced-union",
            title: "UNION",
            content: [
                { title: "¿Qué es?", text: "Operador que combina el conjunto de resultados de dos o más sentencias SELECT en un único conjunto de resultados." },
                { title: "¿Por qué es importante?", text: "Permite tratar datos de diferentes tablas como una sola lista unificada." },
                { title: "¿Qué problema real resuelve?", text: "Agregación vertical de datos similares que están en estructuras separadas." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para combinar listas. Usa UNION ALL si no te importan los duplicados (es más rápido)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Ambas consultas deben tener el mismo número y tipo de columnas." }
            ],
            syntaxDescription: "Pega el resultado de una consulta debajo del resultado de otra. Deben tener las mismas columnas.",
            description: "Combinación vertical.",
            code: `SELECT email FROM clientes
UNION
SELECT email FROM proveedores;`,
            useCases: [
                {
                    title: "Lista de Contactos",
                    description: "Crear una lista única de correos tanto de clientes como de empleados.",
                    code: "SELECT email FROM clientes UNION SELECT email FROM empleados;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Mismas Columnas",
                    content: "Para que UNION funcione, ambos SELECT deben tener exactamente el mismo número de columnas y tipos compatibles.",
                    code: "SELECT a, b FROM t1 UNION SELECT a, b FROM t2 -- ✅"
                },
                {
                    type: "performance",
                    title: "UNION vs UNION ALL",
                    content: "`UNION` intenta eliminar duplicados (lento). `UNION ALL` no (muy rápido). Si sabes que no hay repetidos, usa ALL.",
                    code: "SELECT id FROM a UNION ALL SELECT id FROM b"
                }
            ]
        },
        {
            id: "mysql-advanced-windows",
            title: "Funciones de Ventana",
            content: [
                { title: "¿Qué es?", text: "Funciones que realizan cálculos a través de un conjunto de filas relacionadas con la fila actual." },
                { title: "¿Por qué es importante?", text: "Permite analítica avanzada (rankings totales acumulados, comparativas) directamente en SQL." },
                { title: "¿Qué problema real resuelve?", text: "Cálculos que antes requerían cursores complejos o procesamiento en el código de aplicación." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Ideal para reportes analíticos y paginación compleja. Requiere MySQL 8.0+." },
                { title: "¿Qué conocimientos previos requiere?", text: "Concepto de partición y orden en ventanas." }
            ],
            syntaxDescription: "Permite realizar cálculos sobre un conjunto de filas relacionadas con la fila actual.",
            description: "Análisis avanzado (MySQL 8.0+).",
            code: `SELECT nombre, salario, 
RANK() OVER (ORDER BY salario DESC) as ranking
FROM empleados;`,
            useCases: [
                {
                    title: "Paginación Eficiente",
                    description: "Numerar filas para paginación compleja.",
                    code: "SELECT *, ROW_NUMBER() OVER(ORDER BY fecha) as fila FROM logs;"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "OVER()",
                    content: "La clave es la cláusula `OVER()`. Define 'la ventana' de datos que la función ve. Puede ser particionada por grupos.",
                    code: "SUM(val) OVER (PARTITION BY dep ORDER BY fecha)"
                },
                {
                    type: "goodPractice",
                    title: "Ranking sin huecos",
                    content: "Usa `DENSE_RANK()` para que después del puesto 1 y 1 (empate), venga el 2, no el 3.",
                    code: "DENSE_RANK() OVER (ORDER BY ptos DESC)"
                }
            ]
        },
        {
            id: "mysql-advanced-cte",
            title: "CTE (Common Table Expressions)",
            content: [
                { title: "¿Qué es?", text: "Un conjunto de resultados temporal con nombre que existe solo dentro del ámbito de una única instrucción SQL." },
                { title: "¿Por qué es importante?", text: "Mejora drásticamente la legibilidad de consultas complejas al dividir la lógica en partes pequeñas y reutilizables." },
                { title: "¿Qué problema real resuelve?", text: "Sustituye a las subconsultas anidadas ilegibles y permite recursividad (consultas jerárquicas)." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo para limpiar cualquier consulta compleja. Úsalo SIEMPRE para datos jerárquicos (árboles)." },
                { title: "¿Qué conocimientos previos requiere?", text: "MySQL 8.0+." }
            ],
            syntaxDescription: "Crea vistas temporales solo para la consulta actual, haciendo el código más limpio que con subconsultas.",
            description: "Subconsultas legibles (MySQL 8.0+).",
            code: `WITH VentasRecientes AS (
    SELECT * FROM ventas WHERE fecha > '2025-01-01'
)
SELECT * FROM VentasRecientes;`,
            useCases: [
                {
                    title: "Jerarquías",
                    description: "Recorrer un árbol de categorías (padre-hijo) recursivamente.",
                    code: "WITH RECURSIVE cat_tree AS (...) SELECT * FROM cat_tree;"
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Divide y Vencerás",
                    content: "Usa CTEs para romper una consulta monstruosa en pasos lógicos.",
                    code: "WITH paso1 AS (...), paso2 AS (...) SELECT * FROM paso2"
                },
                {
                    type: "performance",
                    title: "Optimización",
                    content: "MySQL 8.0+ optimiza las CTEs muy bien, así que no tengas miedo de usarlas por rendimiento.",
                    code: ""
                }
            ]
        }
    ]
};
