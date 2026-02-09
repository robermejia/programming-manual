export const funcionesUtilidadesCategory = {
    title: "4. Funciones y Expresiones Útiles",
    topics: [
        {
            id: "string-functions",
            title: "Funciones de Texto (String)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Herramientas nativas para manipular, limpiar y transformar cadenas de caracteres."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite procesar y limpiar datos directamente en el motor, entregando información formateada a la aplicación."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Limpia espacios innecesarios, transforma minúsculas a mayúsculas y extrae partes de textos (como dominios de correos)."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas para normalizar datos antes de mostrarlos. No apliques funciones pesadas sobre millones de filas sin índices funcionales."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos básicos de tipos de datos TEXT y VARCHAR."
                }
            ],
            description: "Manipulación y transformación de cadenas de caracteres.",
            code: `-- Limpieza y fragmentación
SELECT UPPER(TRIM(nombre)), SPLIT_PART(email, '@', 2) 
FROM usuarios;`,
            syntaxDescription: "`UPPER` convierte a mayúsculas, `TRIM` elimina espacios en los extremos y `SPLIT_PART` divide una cadena por un delimitador y devuelve la parte especificada.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El operador `||` es el estándar para unir textos, pero prefiere `CONCAT()` para manejar valores nulos sin que el resultado sea NULL.",
                    code: "SELECT CONCAT(nombre, ' ', apellido) FROM t; -- Robusta con Nulos"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Usar funciones de texto sobre una columna en el `WHERE`. Esto hará que Postgres no use los índices de esa columna.",
                    code: "-- ❌ Lento\nWHERE LOWER(nombre) = 'ana'\n\n-- ✅ Rápido (usando ILIKE)\nWHERE nombre ILIKE 'ana'"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `LPAD()` para formatear números de serie o códigos que necesiten ceros a la izquierda.",
                    code: "SELECT LPAD(id::text, 5, '0') FROM pedidos; -- '00012'"
                }
            ]
        },
        {
            id: "date-functions",
            title: "Funciones de Fecha y Hora",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Funciones para realizar aritmética y extracción sobre datos temporales."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "PostgreSQL es el estándar de la industria en manejo de zonas horarias y cálculos de intervalos complejos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite calcular antigüedades, diferencias de tiempo y agrupar datos por períodos (días, meses, años)."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas para todo manejo de tiempo. Evita usar textos para representar fechas."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Timestamps y zonas horarias (UTC)."
                }
            ],
            description: "Aritmética y extracción de componentes temporales.",
            code: `-- Aritmética humana
SELECT NOW() - INTERVAL '3 days';
SELECT DATE_PART('year', fecha_nacimiento);`,
            syntaxDescription: "Aritmética directa restando un `INTERVAL`. `DATE_PART` extrae un componente específico (año, mes, día) de un objeto de tiempo o fecha.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "El tipo `INTERVAL` permite trabajar con tiempo de forma natural: horas, meses, años o incluso semanas.",
                    code: "SELECT '2024-01-01'::date + INTERVAL '2 weeks';"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `DATE_TRUNC()` para normalizar fechas al inicio de un período (día, mes, hora) antes de agrupar.",
                    code: "SELECT DATE_TRUNC('month', fecha) FROM ventas GROUP BY 1;"
                },
                {
                    type: "recommendation",
                    title: "Recomendación profesional",
                    content: "Usa siempre `TIMESTAMPTZ`. Es la única forma segura de manejar aplicaciones globales sin errores de desfase horario.",
                    code: "INSERT INTO logs (fecha) VALUES (CURRENT_TIMESTAMP);"
                }
            ]
        },
        {
            id: "case-coalesce",
            title: "CASE, COALESCE y NULLIF",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Lógica condicional y manejo de valores nulos dentro de SQL."
                },
                {
                    title: "¿Por qué es importante en PostgreSQL moderno?",
                    text: "Permite inyectar lógica de programación directamente en las consultas, reduciendo la carga del servidor de aplicaciones."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita errores de nulos en cálculos y permite clasificar datos automáticamente (ej. Categoría de cliente A, B o C)."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas para formatear salidas y manejar nulos. No pongas lógica de negocios extremadamente compleja que sea difícil de auditar en SQL."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de lógica condicional (If/Else)."
                }
            ],
            description: "Lógica condicional y manejo de valores nulos.",
            code: `-- Lógica condicional
SELECT COALESCE(tel, 'S/T'), 
       CASE WHEN activo THEN 'OK' ELSE 'FIX' END 
FROM t;`,
            syntaxDescription: "`COALESCE` es la barrera contra nulos: toma el primer valor válido. `CASE` es el `if-then-else` de SQL, evaluando condiciones secuencialmente.",
            tips: [
                {
                    type: "idea",
                    title: "Idea clave",
                    content: "`COALESCE` devuelve el primer valor no nulo de su lista. Es vital para cálculos que involucran columnas opcionales.",
                    code: "SELECT precio + COALESCE(impuesto, 0) FROM t;"
                },
                {
                    type: "error",
                    title: "Error común",
                    content: "Olvidar el `ELSE` en un `CASE`. Si ninguna condición entra y no hay ELSE, Postgres devolverá NULL por defecto.",
                    code: "-- Pon siempre el ELSE\nCASE WHEN x THEN 1 ELSE 0 END"
                },
                {
                    type: "goodPractice",
                    title: "Buenas prácticas",
                    content: "Usa `NULLIF()` para evitar errores críticos como el de 'división por cero' de forma elegante.",
                    code: "SELECT total / NULLIF(ventas, 0) FROM t;"
                }
            ]
        }
    ]
};
