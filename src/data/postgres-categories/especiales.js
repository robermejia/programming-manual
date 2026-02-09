export const especialesCategory = {
    title: "7. Características Especiales y Pro",
    topics: [
        {
            id: "json-jsonb",
            title: "JSON y JSONB (NoSQL)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Soporte nativo para almacenar y consultar datos flexibles en formato JSON."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite que PostgreSQL actúe como una base de datos de documentos con un rendimiento extraordinario, uniendo lo mejor de SQL y NoSQL."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite guardar esquemas de datos que cambian con frecuencia sin necesidad de alterar la estructura de las tablas constantemente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Usa JSONB para metadatos flexibles o respuestas de APIs externas. No lo uses para datos que sean estrictamente relacionales y necesiten integridad fuerte."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Formato JSON y tipos de datos básicos."
                }
            ],
            description: "Almacenamiento y consulta de datos semi-estructurados.",
            code: `-- Búsqueda en JSONB
SELECT info->>'nombre' FROM logs 
WHERE info @> '{"status": "error"}';`,
            syntaxDescription: "El operador `->>` extrae una clave como texto. El operador `@>` comprueba si el JSON de la izquierda contiene el objeto JSON de la derecha (búsqueda por inclusión).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "`JSONB` se almacena en formato binario descompuesto, lo que lo hace mucho más rápido y permite indexación.",
                    code: "id UUID, metadata JSONB -- Combinación ganadora"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Usar `JSON` simple en lugar de `JSONB`. El tipo `JSON` es solo texto plano y Postgres tiene que parsearlo en cada query.",
                    code: "-- ❌ Lento: data JSON\n-- ✅ Rápido: data JSONB"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa el operador `@>` para buscar dentro de un JSONB. Es la forma más optimizada y aprovecha los índices GIN.",
                    code: "WHERE tags @> '[\"sql\", \"postgres\"]';"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "No entierres datos relacionales clave en JSONB. Si un campo se usa siempre en filtros, extráelo a una columna SQL normal.",
                    code: "email TEXT, data JSONB -- El email fuera del JSONB es más eficiente."
                }
            ]
        },
        {
            id: "arrays-postgres",
            title: "Arrays (Arreglos)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Capacidad de almacenar una lista de elementos en una sola columna."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite desnormalizar intencionadamente ciertos datos para mejorar el rendimiento de lectura en ciertos casos específicos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita tener que crear una tabla intermedia 'Muchos a Muchos' para datos simples como etiquetas (tags) o números de teléfono."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para listas sencillas y cortas de elementos. No los uses si necesitas aplicar integridad referencial a los elementos de la lista."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de tipos de datos y arreglos en programación."
                }
            ],
            description: "Manejo de colecciones de datos en una sola columna.",
            code: `-- Uso de arreglos
SELECT * FROM posts WHERE 'sql' = ANY(tags);`,
            syntaxDescription: "La expresión `'valor' = ANY(arreglo)` es la forma más eficiente de buscar si un elemento existe dentro de una columna de tipo Array sin expandir la tabla.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes tener arreglos de casi cualquier tipo, incluso arreglos multidimensionales.",
                    code: "puntos INT[][] -- Matriz"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `unnest()` para convertir un arreglo de nuevo en filas individuales para realizar reportes.",
                    code: "SELECT unnest(telefonos) FROM clientes;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Los arreglos empiezan en 1 por defecto en Postgres. Su uso es ideal para etiquetas o listas cortas de tags.",
                    code: "SELECT tags[1] FROM posts; -- Obtiene el primer tag"
                }
            ]
        },
        {
            id: "full-text-search",
            title: "Full Text Search (Búsqueda)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Motor de búsqueda lingüística integrado para textos largos."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite implementar búsquedas tipo 'Google' dentro de tu DB sin necesidad de montar motores externos como Elasticsearch."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Resuelve el problema de buscar por relevancia y raíces de palabras, algo que un simple 'LIKE' no puede hacer eficientemente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para blogs, catálogos de productos y gestores documentales. No lo uses si solo necesitas búsquedas exactas por código."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de lexemas y operadores lógicos."
                }
            ],
            description: "Motor de búsqueda lingüística de alto rendimiento.",
            code: `-- Búsqueda avanzada
SELECT * FROM posts 
WHERE to_tsvector('spanish', texto) @@ to_tsquery('spanish', 'postgres & pro');`,
            syntaxDescription: "`to_tsvector` convierte el texto en lexemas (raíces). `@@` es el operador de búsqueda y `to_tsquery` define las palabras clave con operadores lógicos (`&`, `|`, `!`).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "FTS busca lexemas (raíces de palabras). 'Gatos' coincidirá con 'gato' gracias a la normalización lingüística.",
                    code: "SELECT to_tsvector('spanish', 'Buscando gatos'); -- 'busc':1 'gat':2"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Crea una columna física tipo `tsvector` y un índice GIN sobre ella para búsquedas instantáneas en tablas grandes.",
                    code: "ALTER TABLE t ADD COLUMN search_idx tsvector;\nCREATE INDEX ON t USING GIN (search_idx);"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para búsquedas de 'autocompletado' ultra rápidas, usa `pg_trgm` (trigramas) que permite búsquedas parciales eficientes.",
                    code: "CREATE EXTENSION pg_trgm;\nCREATE INDEX ... USING GIST (col gist_trgm_ops);"
                }
            ]
        },
        {
            id: "particionamiento",
            title: "Particionamiento de Tablas",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Divide tablas gigantes en secciones físicas más pequeñas para mejorar el mantenimiento."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite manejar conjuntos de datos de Terabytes con un rendimiento predecible y mantenimiento sencillo."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita que las consultas tengan que recorrer índices masivos, y permite borrar datos viejos instantáneamente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para tablas de logs o históricos con millones de filas. No particiones tablas pequeñas, ya que introduce complejidad innecesaria."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Diseño de tablas y estrategias de indexación."
                }
            ],
            description: "División física de datos para escalabilidad masiva.",
            code: `-- Definir partición
CREATE TABLE ventas (...) PARTITION BY RANGE (fecha);`,
            syntaxDescription: "`PARTITION BY RANGE` define que la tabla principal es 'virtual'. Los datos se almacenarán físicamente en tablas hijas creadas según rangos de valores (ej. por meses).",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El particionamiento permite el 'Partition Pruning': Postgres lee solo las tablas necesarias de forma automática.",
                    code: "EXPLAIN SELECT * FROM ventas WHERE fecha = '2024-05-10'; -- Mostrará solo una tabla."
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Divide por tiempo (meses o años) para tablas de logs. Borrar datos viejos se resume a borrar una partición interna.",
                    code: "DROP TABLE ventas_2020; -- Borrado instantáneo de millones de filas"
                }
            ]
        }
    ]
};
