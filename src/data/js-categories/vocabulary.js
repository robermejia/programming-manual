export const vocabularyCategory = {
    title: "0. Vocabulario de JavaScript",
    topics: [
        {
            id: "js-vocab-a-c",
            title: "Glosario A - C",
            description: "Conceptos desde funciones asíncronas hasta clases y break.",
            content: [
                { title: "Array", text: "Constructor de objetos globales para manejar arreglos." },
                { title: "ArrayBuffer", text: "Buffer de datos binarios de longitud fija." },
                { title: "arrow function (=>)", text: "Función flecha con sintaxis concisa y 'this' léxico." },
                { title: "async", text: "Palabra reservada que declara una función como asíncrona." },
                { title: "async function", text: "Función que devuelve una promesa automáticamente." },
                { title: "at()", text: "Accede a un elemento por índice (acepta negativos)." },
                { title: "await", text: "Pausa la ejecución de una función async hasta que se resuelva la promesa." },
                { title: "bigint", text: "Números enteros de precisión arbitraria (ej: 100n)." },
                { title: "BigInt", text: "Constructor de objetos bigints." },
                { title: "boolean", text: "Tipo de dato lógico con valores true o false." },
                { title: "Boolean", text: "Objeto envolvente para tipos booleanos." },
                { title: "break", text: "Instrucción que sale de un bucle o estructura switch." },
                { title: "case", text: "Define un caso específico dentro de un switch." },
                { title: "catch", text: "Captura errores lanzados en el bloque try." },
                { title: "class", text: "Declara una clase para programación orientada a objetos." },
                { title: "const", text: "Declara una constante con alcance de bloque que no puede ser reasignada." },
                { title: "continue", text: "Salta inmediatamente a la siguiente iteración de un bucle." }
            ]
        },
        {
            id: "js-vocab-d-h",
            title: "Glosario D - H",
            description: "Manejo de fechas, errores, herencia y destructuración.",
            content: [
                { title: "Date", text: "Constructor para manejar fechas y horas." },
                { title: "default", text: "Exportación o caso por defecto en el flujo de ejecución." },
                { title: "delete", text: "Operador que elimina una propiedad de un objeto." },
                { title: "Destructuring", text: "Extracción eficiente de valores de arrays u objetos." },
                { title: "do...while", text: "Bucle que ejecuta el código al menos una vez antes de evaluar la condición." },
                { title: "else", text: "Bloque alternativo de ejecución cuando la condición if falla." },
                { title: "Error", text: "Constructor base para el lanzamiento de errores." },
                { title: "every()", text: "Verifica si todos los elementos del array cumplen una condición." },
                { title: "export", text: "Exporta valores, funciones o clases desde un módulo." },
                { title: "extends", text: "Indica herencia de clase en la definición de una nueva clase." },
                { title: "filter()", text: "Filtra los elementos de un array basándose en una condición." },
                { title: "finally", text: "Bloque de código que se ejecuta siempre, haya error o no." },
                { title: "find() / findIndex()", text: "Busca elementos o sus índices en un array." },
                { title: "flat() / flatMap()", text: "Métodos para aplanar arrays anidados." },
                { title: "for / while", text: "Estructuras fundamentales de bucles/ciclos." },
                { title: "for...in / for...of", text: "Iteración sobre propiedades de objetos o valores de iterables." },
                { title: "Function", text: "Constructor de funciones en el ámbito global." },
                { title: "function", text: "Palabra clave para declarar una función estándar." }
            ]
        },
        {
            id: "js-vocab-i-p",
            title: "Glosario I - P",
            description: "Internacionalización, módulos, objetos y promesas.",
            content: [
                { title: "if", text: "Estructura de control para ejecución condicional." },
                { title: "IIFE", text: "Expresión de función ejecutada inmediatamente (Immediately Invoked Function Expression)." },
                { title: "import", text: "Importa módulos o funcionalidades específicas de otros archivos." },
                { title: "in", text: "Verifica la existencia de una propiedad dentro de un objeto." },
                { title: "instanceof", text: "Verifica si un objeto es instancia de una clase base específica." },
                { title: "Intl", text: "API para el manejo de internacionalización (fechas, números, etc.)." },
                { title: "JSON.parse() / stringify()", text: "Conversión entre strings JSON y objetos JavaScript." },
                { title: "let", text: "Declara una variable con alcance de bloque (block scope)." },
                { title: "Map / Set", text: "Colecciones modernas para pares clave-valor o valores únicos." },
                { title: "Math", text: "Objeto que provee constantes y funciones matemáticas de utilidad." },
                { title: "new", text: "Operador que crea una nueva instancia de un objeto." },
                { title: "null", text: "Representa la ausencia intencional de cualquier valor de objeto." },
                { title: "number / Number", text: "Manejo de valores numéricos de 64 bits." },
                { title: "Object", text: "Objeto base del cual heredan prácticamente todos los demás objetos." },
                { title: "Optional chaining (?.)", text: "Acceso seguro a propiedades anidadas de un objeto." },
                { title: "Promise", text: "Representa el resultado final (éxito o fallo) de una tarea asíncrona." },
                { title: "Proxy", text: "Crea un puente para interceptar y personalizar operaciones sobre objetos." }
            ]
        },
        {
            id: "js-vocab-q-s",
            title: "Glosario S - T",
            description: "Símbolos, metaprogramación, plantillas y manejo de contexto.",
            content: [
                { title: "SharedArrayBuffer", text: "Buffer de datos compartido comúnmente usado entre workers." },
                { title: "Spread operator (...)", text: "Expande los elementos de un iterable para copia o unión." },
                { title: "static", text: "Define miembros que pertenecen a la clase y no a sus instancias." },
                { title: "string / String", text: "Manejo de cadenas de texto y caracteres." },
                { title: "super", text: "Referencia y permite llamar a métodos de la clase padre." },
                { title: "switch", text: "Estructura de control de selección de múltiples casos." },
                { title: "symbol / Symbol", text: "Valor primitivo único usado para identificadores de propiedades." },
                { title: "Template literals (backticks)", text: "Strings con soporte para interpolación y multilínea." },
                { title: "this", text: "Referencia dinámica al contexto de ejecución actual." },
                { title: "throw", text: "Lanza manualmente una excepción o error." },
                { title: "toSorted() / toReversed()", text: "Métodos modernos que retornan copias modificadas del array (ES2023)." },
                { title: "try", text: "Define el bloque de código que será monitoreado en busca de errores." },
                { title: "typeof", text: "Devuelve una cadena indicando el tipo de dato del operando." }
            ]
        },
        {
            id: "js-vocab-u-z",
            title: "Glosario U - Z",
            description: "Valores indefinidos, referencias débiles y novedades futuras.",
            content: [
                { title: "undefined", text: "Valor automático para variables declaradas pero no inicializadas." },
                { title: "var", text: "Forma antigua de declarar variables con alcance de función (function scope)." },
                { title: "void", text: "Evalúa una expresión sin devolver ningún valor de retorno." },
                { title: "WeakMap / WeakSet", text: "Colecciones que mantienen referencias débiles a objetos (permiten el recolector de basura)." },
                { title: "WeakRef", text: "Referencia débil a un objeto para evitar retención de memoria innecesaria." },
                { title: "yield", text: "Pausa y reanuda el flujo dentro de una función generadora." },
                { title: "Temporal API", text: "Nueva propuesta moderna para el manejo preciso de fechas y horas." }
            ]
        }
    ]
};
