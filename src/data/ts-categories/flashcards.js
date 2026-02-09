export const flashcardsCategory = {
    title: "5. TypeScript Flashcards",
    isFlashcard: true,
    topics: [
        {
            id: "ts-flashcards-1-20",
            title: "Flashcards: Introducción y Configuración",
            description: "20 tarjetas sobre qué es TypeScript, instalación y tsconfig.json.",
            cards: [
                { q: "¿Qué es TypeScript en relación con JavaScript?", a: "Es un superconjunto (superset) de JavaScript, lo que significa que extiende JavaScript añadiendo nuevas características, principalmente el tipado estático." },
                { q: "¿Quién desarrolló y mantiene TypeScript?", a: "Microsoft." },
                { q: "TypeScript es un lenguaje de programación tipado _____, a diferencia de JavaScript que es de tipado débil o dinámico.", a: "estáticamente" },
                { q: "¿En qué se compila o transpila el código TypeScript para que pueda ser ejecutado por los navegadores?", a: "El código TypeScript se compila a código JavaScript." },
                { q: "¿Cuál es uno de los principales beneficios de usar el tipado estático en TypeScript?", a: "Ayuda a detectar errores en tiempo de desarrollo en lugar de en tiempo de ejecución, minimizando bugs." },
                { q: "¿Qué entorno de ejecución de JavaScript es un prerrequisito para poder utilizar TypeScript?", a: "Node.js." },
                { q: "¿Qué comando se utiliza para instalar TypeScript de forma global en tu sistema usando npm?", a: "`npm install -g typescript`" },
                { q: "¿Con qué comando puedes verificar la versión de TypeScript instalada en tu sistema?", a: "`tsc -v` o `tsc --version`." },
                { q: "¿Cuál es el comando para inicializar un proyecto de TypeScript, que crea el archivo `tsconfig.json`?", a: "`tsc --init`" },
                { q: "¿Qué archivo de configuración centraliza las opciones del compilador de TypeScript en un proyecto?", a: "El archivo `tsconfig.json`." },
                { q: "En `tsconfig.json`, ¿qué propiedad se usa para especificar el directorio raíz de los archivos fuente TypeScript?", a: "La propiedad `rootDir`." },
                { q: "En `tsconfig.json`, ¿qué propiedad se usa para especificar el directorio de salida para los archivos JavaScript compilados?", a: "La propiedad `outDir`." },
                { q: "¿Qué comando se utiliza para compilar un archivo TypeScript específico, por ejemplo `script.ts`?", a: "`tsc script.ts`" },
                { q: "¿Cómo se activa el 'modo observador' (watch mode) de TypeScript para que compile automáticamente los archivos cuando se guardan cambios?", a: "Se utiliza el comando `tsc -w` o `tsc --watch`." },
                { q: "Si un proyecto está inicializado con `tsconfig.json`, ¿qué comando se usa para activar el modo observador para todos los archivos del proyecto?", a: "`tsc -w`, que observará todos los archivos definidos en la configuración." },
                { q: "¿Cuál es la extensión de los archivos de código fuente de TypeScript?", a: "`.ts`" },
                { q: "En el contexto de React con TypeScript, ¿cuál es la extensión de archivo utilizada para los componentes?", a: "`.tsx`" },
                { q: "¿Cómo se declara una variable llamada `nombre` que debe ser de tipo `string` en TypeScript?", a: "`let nombre: string;`" },
                { q: "Si declaras `let edad = 25;` sin especificar el tipo, ¿qué mecanismo utiliza TypeScript para determinar que `edad` es de tipo `number`?", a: "Utiliza la inferencia de tipos." },
                { q: "Tipo de dato en TypeScript que puede contener `true` o `false`.", a: "`boolean`" }
            ]
        },
        {
            id: "ts-flashcards-21-40",
            title: "Flashcards: Tipos y Estructuras",
            description: "20 tarjetas sobre tipos básicos, interfaces y clases.",
            cards: [
                { q: "Tipo de dato en TypeScript que representa valores numéricos, tanto enteros como decimales.", a: "`number`" },
                { q: "Tipo de dato en TypeScript que representa cadenas de texto.", a: "`string`" },
                { q: "¿Qué tipo especial en TypeScript se utiliza para indicar que una variable puede ser de cualquier tipo y que desactiva la verificación de tipos para esa variable?", a: "El tipo `any`." },
                { q: "¿Por qué se recomienda evitar el uso del tipo `any` en TypeScript?", a: "Porque elimina la seguridad que proporciona el tipado estático, comportándose como JavaScript tradicional y perdiendo los beneficios de TypeScript." },
                { q: "¿Qué tipo se utiliza para una función que no devuelve ningún valor?", a: "El tipo `void`." },
                { q: "¿Cómo se define un array que solo puede contener números en TypeScript?", a: "`let numeros: number[];`" },
                { q: "¿Cómo se define una variable que puede ser un `string` o un `null`?", a: "`let miVariable: string | null;` (unión type)." },
                { q: "¿Para qué se utiliza la palabra clave `type` en TypeScript?", a: "Para crear alias de tipos personalizados, mejorando la legibilidad y reutilización." },
                { q: "Define un tipo `Programador` que represente un objeto con una propiedad `nombre` de tipo `string` y `edad` de tipo `number`.", a: "`type Programador = { nombre: string; edad: number; };`" },
                { q: "¿Qué es una `interface` en TypeScript?", a: "Es un contrato que define la forma de los objetos o clases." },
                { q: "En una `interface` u objeto `type`, ¿qué carácter se usa para indicar que una propiedad es opcional?", a: "El signo `?` (ej: `nombre?: string;`)." },
                { q: "¿Cómo se tipan los parámetros y el valor de retorno de una función `sumar` que recibe dos números y devuelve un número?", a: "`function sumar(a: number, b: number): number { return a + b; }`" },
                { q: "En TypeScript, una _____ es una estructura similar a una clase que define la forma de un objeto, pero no contiene implementación.", a: "interfaz (interface)" },
                { q: "¿Qué palabra clave se utiliza para crear una clase en TypeScript?", a: "`class`" },
                { q: "¿Qué método especial dentro de una clase se ejecuta automáticamente cuando se crea una nueva instancia del objeto?", a: "El `constructor`." },
                { q: "¿Qué palabra clave se usa para referirse a la instancia actual de una clase desde dentro de sus propios métodos?", a: "`this`" },
                { q: "¿Qué palabra clave se utiliza para crear una nueva instancia de una clase?", a: "`new`" },
                { q: "¿Qué palabra clave se usa para que una clase adopte la estructura definida por una interfaz?", a: "`implements`" },
                { q: "En programación orientada a objetos, ¿qué concepto permite ocultar los detalles internos de un objeto y exponer solo lo necesario a través de una interfaz pública?", a: "Encapsulamiento." },
                { q: "En TypeScript, los _____ y _____ son métodos especiales que permiten controlar el acceso (lectura y escritura) a las propiedades de una clase.", a: "getters (`get`), setters (`set`)" }
            ]
        },
        {
            id: "ts-flashcards-41-60",
            title: "Flashcards: Conceptos Avanzados y Herramientas",
            description: "20 tarjetas sobre genéricos, enums, colecciones y herramientas.",
            cards: [
                { q: "El modificador de acceso _____ indica que una propiedad o método solo puede ser accedido desde dentro de la misma clase.", a: "`private`" },
                { q: "El modificador de acceso _____ indica que una propiedad o método puede ser accedido desde cualquier lugar.", a: "`public`" },
                { q: "¿Qué son los genéricos (`<T>`) en TypeScript?", a: "Plantillas de código para crear componentes reutilizables que trabajan con diferentes tipos manteniendo la seguridad de tipos." },
                { q: "En React, ¿cómo se tiparía el hook `useState` para que maneje un estado que es un array de strings?", a: "`const [tareas, setTareas] = useState<string[]>([]);`" },
                { q: "¿Qué framework de desarrollo frontend requiere obligatoriamente el uso de TypeScript?", a: "Angular." },
                { q: "Estructura de datos en TypeScript que representa una colección de valores únicos.", a: "Set." },
                { q: "¿Cómo se crea una instancia de un `Set` que contendará solo strings?", a: "`const miSet = new Set<string>();`" },
                { q: "Estructura de datos en TypeScript que almacena pares clave-valor.", a: "Map." },
                { q: "¿Cómo se define un `Map` donde las claves son strings y los valores son números?", a: "`const miMapa = new Map<string, number>();`" },
                { q: "¿Qué es un `enum` en TypeScript?", a: "Tipo de dato para definir un conjunto de constantes nombradas." },
                { q: "Para compilar el código TypeScript a una versión de JavaScript compatible con navegadores más antiguos, ¿qué propiedad se modifica en `tsconfig.json`?", a: "La propiedad `target` (ej: `\"target\": \"es2016\"`)." },
                { q: "En la terminal, ¿qué herramienta se usa para ejecutar código TypeScript directamente en Node.js sin compilarlo?", a: "`ts-node`" },
                { q: "¿Qué extensión de VS Code es útil para abrir archivos HTML en un servidor de desarrollo local?", a: "Live Server." },
                { q: "¿Cuál es la herramienta de línea de comandos para gestionar proyectos de Angular?", a: "El Angular CLI." },
                { q: "¿Qué comando de Angular CLI se usa para crear un nuevo proyecto?", a: "`ng new nombre-del-proyecto`" },
                { q: "¿Qué comando de `npm` se utiliza con Vite para crear un nuevo proyecto de React con TypeScript?", a: "`npm create vite@latest` (seleccionar React + TypeScript)." },
                { q: "Si una función de TypeScript recibe un parámetro que puede no ser proporcionado al llamarla, ¿cómo se marca ese parámetro como opcional?", a: "Se le añade un `?` antes de los dos puntos (ej: `nombre?: string`)." },
                { q: "En TypeScript, ¿qué es una tupla?", a: "Array con longitud fija y tipos conocidos para cada posición." },
                { q: "Si tienes una variable de tipo `any` a la que le asignas un número y luego un string, ¿reportará TypeScript algún error?", a: "No, `any` desactiva la comprobación." },
                { q: "En `tsconfig.json`, la propiedad `\"strict\": true` activa una serie de comprobaciones más rigurosas para qué propósito?", a: "Detectar errores comunes y fomentar un código robusto y predecible." }
            ]
        }
    ]
};
