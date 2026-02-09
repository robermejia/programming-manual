export const consultasAvanzadasCategory = {
    title: "3. Consultas Avanzadas y Análisis",
    topics: [
        {
            id: "uniones-joins",
            title: "JOINS - Uniones de Tablas",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Mecanismo para combinar registros de múltiples tablas basándose en una columna común."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "PostgreSQL es un motor relacional maduro con algoritmos altamente optimizados para unir millones de registros de forma eficiente."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite normalizar los datos (evitar duplicidad) y volver a unirlos para generar reportes completos."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para relacionar datos estructurados. No unas demasiadas tablas en una sola query si no hay índices, o el rendimiento caerá."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Llaves primarias y foráneas."
                }
            ],
            description: "Combinación de datos entre múltiples tablas relacionadas.",
            code: `-- Unión básica
SELECT c.nombre, p.monto 
FROM clientes c 
INNER JOIN pedidos p ON c.id = p.cliente_id;`,
            syntaxDescription: "`INNER JOIN` busca coincidencias en ambas tablas. La condición `ON` establece el vínculo lógico entre la llave primaria (`id`) y la foránea (`cliente_id`).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El optimizador de Postgres elige entre Hash Join, Merge Join o Nested Loop según el tamaño de los datos.",
                    code: "EXPLAIN SELECT * FROM a JOIN b ON a.id = b.id;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Olvidar que un `INNER JOIN` elimina los registros del lado izquierdo que no tienen pareja en el derecho.",
                    code: "-- Si el cliente no tiene pedidos, desaparece del resultado."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `LEFT JOIN` si necesitas mantener todos los registros de la tabla principal, incluso si no hay coincidencias.",
                    code: "SELECT c.nombre, p.id FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Crea siempre índices en las llaves foráneas. Un JOIN sin índices en tablas grandes causará un 'Sequential Scan' desastroso.",
                    code: "CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);"
                }
            ]
        },
        {
            id: "subconsultas",
            title: "Subconsultas y EXISTS",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una consulta SQL anidada dentro de otra mayor."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "PostgreSQL optimiza muy bien las subconsultas, especialmente con la cláusula EXISTS, que se detiene al encontrar la primera coincidencia."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite realizar filtros complejos basados en datos de otras tablas sin necesidad de duplicar filas mediante un JOIN."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para filtros de presencia o ausencia. No los uses en el SELECT para miles de filas o será muy lento."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Sintaxis básica de SELECT y filtros WHERE."
                }
            ],
            description: "Anidamiento de consultas para lógica compleja.",
            code: `-- EXISTS: Filtrar presencia
SELECT * FROM clientes c 
WHERE EXISTS (SELECT 1 FROM pedidos p WHERE p.cliente_id = c.id);`,
            syntaxDescription: "`EXISTS` evalúa si el conjunto de resultados de la subconsulta no está vacío. Es más eficiente que `IN` porque se detiene al hallar el primer registro.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "`EXISTS` es binario: devuelve verdadero tan pronto como encuentra una fila que cumpla la condición interna.",
                    code: "WHERE EXISTS (SELECT 1 FROM t WHERE cond) -- Más rápido que COUNT(*)"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Usar `NOT IN` con subconsultas que pueden devolver nulos. Si hay un `NULL`, el resultado será vacío inesperadamente.",
                    code: "-- ❌ Peligroso\nWHERE id NOT IN (SELECT id_con_nulos FROM t)"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa subconsultas correlacionadas solo cuando sea estrictamente necesario, ya que pueden ser lentas si no están bien indexadas.",
                    code: "SELECT p.nombre, (SELECT MAX(precio) FROM ventas WHERE p_id = p.id) FROM productos p;"
                }
            ]
        },
        {
            id: "ctes-with",
            title: "CTE - Common Table Expressions",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Tablas temporales con nombre que mejoran la legibilidad de consultas complejas."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Desde la versión 12, PostgreSQL puede optimizar CTEs como si fueran parte de la consulta principal (inlining), uniendo legibilidad y velocidad."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita el anidamiento excesivo de subconsultas, haciendo que el código SQL sea fácil de leer y mantener."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para estructurar consultas de reportes largos. No abuses de ellas si la consulta es trivial."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimiento sólido de SELECT y agrupaciones (GROUP BY)."
                }
            ],
            description: "Consultas legibles y recursivas con la cláusula WITH.",
            code: `-- Bloque temporal
WITH resumen AS (
    SELECT c_id, SUM(m) as tot FROM v GROUP BY 1
)
SELECT * FROM resumen WHERE tot > 100;`,
            syntaxDescription: "Define un conjunto de resultados con nombre (`resumen`) que puede ser referenciado en la consulta principal como si fuera una tabla real. Mejora el orden visual drásticamente.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Las CTEs actúan como 'mini-vistas' que solo existen durante la vida de la consulta principal.",
                    code: "WITH t AS (SELECT 1 as x) SELECT * FROM t;"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa CTEs para 'narrar' tu consulta por pasos en lugar de anidar subconsultas ilegibles una dentro de otra.",
                    code: "WITH filtrados AS (...), agrupados AS (...) SELECT * FROM agrupados;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Aprende `WITH RECURSIVE` para recorrer estructuras en árbol (comentarios, organigramas) de forma nativa en SQL.",
                    code: "WITH RECURSIVE subordinates AS (...) SELECT * FROM subordinates;"
                }
            ]
        },
        {
            id: "window-functions",
            title: "Window Functions (Análisis)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Funciones que calculan valores sobre un grupo de filas sin contraerlas en una sola salida."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Convierte a PostgreSQL en una herramienta de análisis superior (OLAP) capaz de realizar rankings y promedios móviles sin lógica compleja en el backend."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite comparar la fila actual con el resto del grupo (ej. ver el sueldo de un empleado vs el promedio de su departamento) en una sola fila."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas para reportes analíticos y rankings. No las uses en aplicaciones de alta transaccionalidad si no son estrictamente necesarias."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de particionamiento y ordenamiento de datos."
                }
            ],
            description: "Cálculos analíticos avanzados sobre conjuntos de filas.",
            code: `-- Ranking por departamento
SELECT nombre, depto, 
       RANK() OVER (PARTITION BY depto ORDER BY sueldo DESC) 
FROM empleados;`,
            syntaxDescription: "`RANK()` calcula la posición. `OVER` define la 'ventana': `PARTITION BY` agrupa sin colapsar filas y `ORDER BY` define el criterio del ranking.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "A diferencia de `GROUP BY`, las funciones de ventana mantienen el detalle de cada fila original intacto.",
                    code: "SELECT monto, AVG(monto) OVER () FROM ventas; -- Monto vs Promedio Total"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Olvidar el `ORDER BY` dentro del `OVER`. Sin orden, funciones como `RANK()` o `ROW_NUMBER()` darán resultados aleatorios.",
                    code: "ROW_NUMBER() OVER (ORDER BY id) -- Siempre añade el orden"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `LAG()` o `LEAD()` para comparar la fila actual con la anterior o siguiente, ideal para deltas de tiempo o precio.",
                    code: "SELECT precio, LAG(precio) OVER (ORDER BY fecha) FROM logs;"
                }
            ]
        }
    ]
};
