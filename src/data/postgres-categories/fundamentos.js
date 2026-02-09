export const fundamentosCategory = {
    title: "1. Fundamentos de PostgreSQL",
    topics: [
        {
            id: "tipos-datos",
            title: "Tipos de Datos",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Los tipos de datos definen la naturaleza de la información que una columna puede almacenar, como números, texto, fechas o estructuras complejas como JSON."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "PostgreSQL destaca por su soporte nativo para tipos avanzados (JSONB, UUID, Array, Geométricos) que permiten tratarlo como una base de datos híbrida Relacional/NoSQL de clase mundial."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Garantiza la integridad de los datos a nivel físico, evitando que se guarden textos donde debería haber números o fechas inválidas."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos siempre para definir el esquema. No uses tipos demasiado grandes (como BIGINT) si un INTEGER es suficiente para ahorrar espacio."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Concepto básico de tablas y columnas SQL."
                }
            ],
            description: "Clasificación y definición de datos en PostgreSQL.",
            code: `-- Numéricos
INTEGER, BIGINT, NUMERIC(10,2)

-- Texto y Identificadores
TEXT, UUID

-- Fecha y Otros
TIMESTAMPTZ, BOOLEAN, JSONB`,
            syntaxDescription: "PostgreSQL es estricto. Elegir entre `INTEGER` (4 bytes) y `BIGINT` (8 bytes) puede afectar el rendimiento en tablas de miles de millones de filas. `NUMERIC` es para precisión exacta.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "PostgreSQL permite crear tipos de datos personalizados (ENUM o Compuestos) para modelar mejor tu dominio de negocio.",
                    code: "CREATE TYPE status_pedido AS ENUM ('pendiente', 'enviado', 'entregado');"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Usar `CHAR(n)` pensando que es más rápido que `TEXT`. En Postgres son internamente iguales y `TEXT` evita el desperdicio de espacio.",
                    code: "-- ❌ Mal\nnombre CHAR(100)\n\n-- ✅ Bien\nnombre TEXT"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `TIMESTAMPTZ` para almacenar fechas con zona horaria. Postgres las guardará en UTC y las mostrará según la zona horaria de la sesión.",
                    code: "fecha_registro TIMESTAMPTZ DEFAULT NOW()"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para dinero, usa siempre `NUMERIC` con precisión fija. Nunca uses `FLOAT` o `REAL` por errores de redondeo binario.",
                    code: "precio NUMERIC(15,2) -- Máxima precisión decimal"
                }
            ]
        },
        {
            id: "consultas-basicas",
            title: "Consultas SELECT Básicas",
            content: [
                {
                    title: "¿Qué es?",
                    text: "La sentencia SELECT es la instrucción fundamental para recuperar y proyectar datos almacenados en las tablas."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite extraer solo la información necesaria, optimizando el uso de memoria y red entre el servidor de DB y la aplicación."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita tener que procesar todos los datos en el código de la aplicación (Java/Node), permitiendo que la DB haga el trabajo pesado de filtrado."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para toda lectura de datos. No lo uses sin filtros (WHERE) en tablas gigantes o podrías causar lentitud."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocer el nombre de las tablas y sus columnas."
                }
            ],
            description: "Recuperación, ordenamiento y proyección de datos.",
            code: `-- Selección y ordenamiento
SELECT nombre, email 
FROM usuarios 
ORDER BY nombre ASC;`,
            syntaxDescription: "La sentencia elige las columnas `nombre` y `email`. La cláusula `FROM` especifica el origen y `ORDER BY` garantiza el orden alfanumérico ascendente.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Puedes realizar cálculos matemáticos o transformaciones directamente en el SELECT sin afectar los datos originales.",
                    code: "SELECT nombre, precio * 1.21 AS precio_con_iva FROM productos;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Asumir que el orden de los resultados es fijo. Sin un `ORDER BY`, Postgres devuelve las filas según estén grabadas en disco (aleatorio).",
                    code: "-- ❌ Incierto\nSELECT * FROM t;\n\n-- ✅ Garantizado\nSELECT * FROM t ORDER BY id;"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "No uses `SELECT *` en producción. Especifica las columnas para ahorrar red y evitar problemas si la tabla cambia.",
                    code: "SELECT id, username, email FROM usuarios;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Usa `LIMIT` y `FETCH FIRST` para paginar resultados y no saturar la memoria de tu servidor Node/Java.",
                    code: "SELECT * FROM logs FETCH FIRST 50 ROWS ONLY;"
                }
            ]
        },
        {
            id: "where-filtros",
            title: "Filtros WHERE y Operadores",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es la cláusula que permite filtrar las filas devueltas por una consulta basándose en condiciones lógicas."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Esencial para el rendimiento. Un buen filtro permite usar índices y evitar lecturas completas de disco."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite encontrar datos específicos (un usuario por su email, ventas del mes) entre millones de registros."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo siempre que no necesites TODA la tabla. No apliques funciones a las columnas del WHERE si quieres usar índices."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Operadores lógicos (AND, OR, NOT) y de comparación."
                }
            ],
            description: "Condicionales y filtrado avanzado de filas.",
            code: `-- Filtros comunes
WHERE precio > 100 AND stock <= 10
WHERE email ILIKE '%@gmail.com'`,
            syntaxDescription: "Usa operadores lógicos combinados. `ILIKE` es un operador exclusivo de PostgreSQL que realiza búsquedas de texto ignorando mayúsculas y minúsculas.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El operador `ILIKE` es una joya de Postgres para buscar texto ignorando mayúsculas/minúsculas de forma nativa.",
                    code: "WHERE nombre ILIKE 'roberto' -- Encuentra 'ROBERTO' o 'Roberto'"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Comparar con NULL usando el signo igual (`=`). Los nulos deben compararse con `IS NULL` o `IS NOT NULL`.",
                    code: "-- ❌ No funciona\nWHERE tel = NULL\n\n-- ✅ Correcto\nWHERE tel IS NULL"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `IN` para comparar una columna contra una lista de valores estáticos, es más legible que múltiples `OR`.",
                    code: "WHERE categoria_id IN (1, 5, 10, 15);"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Para rangos de fechas o números, usa `BETWEEN` para que la intención de tu consulta sea más clara para otros devs.",
                    code: "WHERE fecha BETWEEN '2024-01-01' AND '2024-12-31';"
                }
            ]
        },
        {
            id: "restricciones-constraints",
            title: "Constraints (Restricciones)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Reglas de integridad aplicadas a las columnas para garantizar la calidad y veracidad de los datos."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Asegura que las reglas de negocio se cumplan incluso si el código de la aplicación tiene errores."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita datos incoherentes como usuarios sin nombre, correos duplicados o precios negativos."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas siempre para proteger tu DB. No pongas reglas demasiado complejas que deban cambiar cada semana."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Tipos de datos y diseño básico de tablas."
                }
            ],
            description: "Reglas de integridad a nivel de base de datos.",
            code: `CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio NUMERIC CHECK (precio > 0)
);`,
            syntaxDescription: "`SERIAL` crea un autoincremental automático. `NOT NULL` prohíbe vacíos y `CHECK` define una expresión lógica que el dato debe cumplir para guardarse.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "Las restricciones no solo validan; también ayudan al optimizador de Postgres a descartar búsquedas innecesarias.",
                    code: "ALTER TABLE ventas ADD CONSTRAINT fecha_valida CHECK (inicio < fin);"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "No usar `NOT NULL` en columnas obligatorias. Esto permite 'basura' en tu DB que luego romperá tu código de aplicación.",
                    code: "email TEXT NOT NULL UNIQUE -- Doble protección"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Ponle nombres descriptivos a tus restricciones para que los errores en logs sean fáciles de diagnosticar.",
                    code: "CONSTRAINT check_stock_positivo CHECK (qty >= 0)"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Usa `UNIQUE` no solo en IDs, sino en cualquier campo que conceptualmente no deba repetirse (como un DNI o un SKU).",
                    code: "CREATE TABLE t (codigo TEXT UNIQUE);"
                }
            ]
        }
    ]
};
