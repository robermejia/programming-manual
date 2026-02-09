export const functionsCategory = {
    title: "5. Funciones y Operadores",
    topics: [
        {
            id: "mysql-functions-string",
            title: "Funciones de Texto",
            content: [
                { title: "¿Qué es?", text: "Herramientas integradas para manipular cadenas de caracteres: concatenar, cortar, buscar, reemplazar, etc." },
                { title: "¿Por qué es importante?", text: "Los datos brutos rara vez están en el formato final de presentación. Estas funciones permiten formatearlos en la propia consulta." },
                { title: "¿Qué problema real resuelve?", text: "Evita tener que procesar miles de registros en el backend solo para ponerlos en mayúsculas o unirlos." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Usa para formato simple. No uses para lógica de negocio compleja o procesamiento de texto pesado (mejor en app)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Conceptos básicos de strings." }
            ],
            syntaxDescription: "Manipulación de cadenas de caracteres directamente en la base de datos.",
            description: "Procesamiento de texto.",
            code: `SELECT CONCAT(nombre, ' ', apellido) as completo FROM usuarios;
SELECT UPPER(titulo) FROM posts;`,
            useCases: [
                {
                    title: "Formato de Nombres",
                    description: "Convertir emails a minúsculas antes de guardar o comparar.",
                    code: "UPDATE usuarios SET email = LOWER(email);"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "CONCAT_WS",
                    content: "Usa `CONCAT_WS` (With Separator). Si un campo es NULL, lo ignora en lugar de anular todo el resultado.",
                    code: "CONCAT_WS('-', 'A', NULL) -> 'A' -- Seguro\nCONCAT('A', NULL) -> NULL -- Peligroso"
                },
                {
                    type: "goodPractice",
                    title: "LIKE case-insensitive",
                    content: "Por defecto en MySQL, las búsquedas de texto no distinguen mayúsculas.",
                    code: "SELECT 'Hola' LIKE 'hola'; -- 1 (True)"
                }
            ]
        },
        {
            id: "mysql-functions-date",
            title: "Fechas y Hora",
            content: [
                { title: "¿Qué es?", text: "Funciones para obtener la fecha actual, calcular diferencias, sumar días o formatear fechas." },
                { title: "¿Por qué es importante?", text: "El tiempo es complejo. MySQL maneja años bisiestos, zonas horarias y aritmética de fechas por ti." },
                { title: "¿Qué problema real resuelve?", text: "Cálculos como '¿Cuántos días faltan para X?' o 'Ventas de la semana pasada' de forma trivial." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre que trabajes con columnas DATE/DATETIME." },
                { title: "¿Qué conocimientos previos requiere?", text: "Formatos de fecha estándar (YYYY-MM-DD)." }
            ],
            syntaxDescription: "Cálculos temporales esenciales para reportes y logs.",
            description: "Manejo del tiempo.",
            code: `SELECT NOW();
SELECT DATE_ADD(NOW(), INTERVAL 7 DAY); -- Una semana después`,
            useCases: [
                {
                    title: "Usuarios Recientes",
                    description: "Buscar usuarios registrados en los últimos 30 días.",
                    code: "SELECT * FROM usuarios WHERE registro > DATE_SUB(NOW(), INTERVAL 30 DAY);"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Guardar fechas como texto",
                    content: "Nunca guardes fechas en VARCHAR. Pierdes todas las funciones de ordenación y cálculo.",
                    code: "ORDER BY '10/01' -- Mal: ordena alfabético, no cronológico"
                },
                {
                    type: "recommendation",
                    title: "UTC",
                    content: "Guarda siempre las fechas en UTC (TIMESTAMP) si tu app va a ser usada en múltiples zonas horarias.",
                    code: "timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
                }
            ]
        },
        {
            id: "mysql-functions-numeric",
            title: "Matemáticas",
            content: [
                { title: "¿Qué es?", text: "Operaciones aritméticas y funciones matemáticas (redondeo, valor absoluto, potencias)." },
                { title: "¿Por qué es importante?", text: "Permite realizar cálculos directamente en los datos sin extraerlos primero." },
                { title: "¿Qué problema real resuelve?", text: "Cálculo de impuestos, descuentos, estadísticas y proyecciones numéricas." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para cálculos estándar. Para cálculos científicos muy complejos, mejor usar una librería en el backend." },
                { title: "¿Qué conocimientos previos requiere?", text: "Matemáticas básicas." }
            ],
            syntaxDescription: "Operaciones aritméticas básicas y avanzadas.",
            description: "Cálculos numéricos.",
            code: `SELECT ROUND(4.567, 2); -- 4.57
SELECT FLOOR(RAND() * 100); -- Aleatorio 0-99`,
            useCases: [
                {
                    title: "Descuentos",
                    description: "Aplicar un 15% de descuento y redondear a 2 decimales.",
                    code: "SELECT ROUND(precio * 0.85, 2) FROM productos;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "División por Cero",
                    content: "MySQL retorna NULL si divides por cero. Tenlo en cuenta para no romper tu lógica.",
                    code: "SELECT 10 / 0; -- NULL"
                },
                {
                    type: "idea",
                    title: "Operadores bit a bit",
                    content: "MySQL soporta operaciones binarias (`&`, `|`) útiles para permisos.",
                    code: "SELECT 5 & 1; -- Bitwise AND"
                }
            ]
        },
        {
            id: "mysql-functions-control",
            title: "Control de Flujo",
            content: [
                { title: "¿Qué es?", text: "Lógica condicional (IF, CASE) dentro de una consulta SQL." },
                { title: "¿Por qué es importante?", text: "Permite añadir lógica de decisión directamente en los datos devueltos (ej. categorizar)." },
                { title: "¿Qué problema real resuelve?", text: "Evita tener que hacer múltiples consultas o lógica compleja de mapeo en el backend." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Para transformaciones de vista rápidas. No abuses para lógica de negocio crítica." },
                { title: "¿Qué conocimientos previos requiere?", text: "Lógica If/Else." }
            ],
            syntaxDescription: "Lógica condicional dentro de las consultas SQL.",
            description: "Condicionales.",
            code: `SELECT nombre, 
IF(edad >= 18, 'Mayor', 'Menor') as estado 
FROM personas;`,
            useCases: [
                {
                    title: "Categorización Dinámica",
                    description: "Clasificar productos por precio en la consulta.",
                    code: "SELECT nombre, CASE WHEN precio > 1000 THEN 'Caro' ELSE 'Barato' END FROM productos;"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "IFNULL vs COALESCE",
                    content: "`IFNULL` toma 2 argumentos. `COALESCE` toma una lista ilimitada y devuelve el primero no nulo.",
                    code: "COALESCE(tel_casa, tel_trabajo, 'No tiene')"
                },
                {
                    type: "goodPractice",
                    title: "Limpieza de datos",
                    content: "Usa funciones de control para limpiar datos sucios al vuelo.",
                    code: "SELECT IF(email = '', NULL, email)"
                }
            ]
        },
        {
            id: "mysql-functions-json",
            title: "Funciones JSON",
            content: [
                { title: "¿Qué es?", text: "Conjunto de herramientas para crear, leer y modificar datos JSON almacenados en columnas." },
                { title: "¿Por qué es importante?", text: "Permite modelos híbridos SQL/NoSQL, guardando datos estructurados y semi-estructurados juntos." },
                { title: "¿Qué problema real resuelve?", text: "Almacenamiento de configuraciones dinámicas o atributos variables sin crear cientos de columnas." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo para datos flexibles/opcionales. MySQL 5.7+." },
                { title: "¿Qué conocimientos previos requiere?", text: "Sintaxis JSON." }
            ],
            syntaxDescription: "Manipulación de documentos NoSQL dentro de MySQL.",
            description: "Soporte JSON (5.7+).",
            code: `SELECT datos->>'$.color' as color FROM productos;
UPDATE config SET opciones = JSON_SET(opciones, '$.tema', 'dark');`,
            useCases: [
                {
                    title: "Extracción de Metadatos",
                    description: "Filtrar por una propiedad anidada en una columna JSON.",
                    code: "SELECT * FROM logs WHERE detalles->>'$.nivel' = 'error';"
                }
            ],
            tips: [
                {
                    type: "performance",
                    title: "Indexar JSON",
                    content: "Para indexar JSON, crea una 'Generated Column' virtual y indexa esa columna.",
                    code: "ALTER TABLE t ADD COLUMN id_virt INT AS (data->'$.id'); CREATE INDEX idx ON t(id_virt);"
                },
                {
                    type: "goodPractice",
                    title: "No abuses",
                    content: "Si datos tienen estructura fija, usa columnas normales. JSON ocupa más espacio.",
                    code: ""
                }
            ]
        }
    ]
};
