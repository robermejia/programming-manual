export const basicsCategory = {
    title: "1. Fundamentos",
    topics: [
        {
            id: "ts-basics",
            title: "Tipos Básicos",
            videoUrl: "https://www.youtube.com/watch?v=FNAz6Bq8z0o", // Introducción Udemy
            content: [
                { title: "¿Qué es?", videoUrl: "https://www.youtube.com/watch?v=UKQjIgvEdk4", text: "TypeScript extiende JavaScript añadiendo tipos estáticos. Esto permite definir qué tipo de datos debe tener una variable, argumento o retorno de función." },
                { title: "Hola Mundo", videoUrl: "https://www.youtube.com/watch?v=GRSPbtyk718", text: "Primeros pasos creando un archivo TS y transpilándolo a JS." },
                { title: "Inferencia y Tipado", videoUrl: "https://www.youtube.com/watch?v=L7-7shL7AIw", text: "TypeScript puede inferir tipos automáticamente, pero el modo estricto nos obliga a ser explícitos para mayor seguridad." },
                { title: "Primitivos (Booleans, Numbers, Strings)", videoUrl: "https://www.youtube.com/watch?v=fyqm1HWLi-o", text: "Uso de los tipos fundamentales del lenguaje." }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Inferencia de Tipos",
                    content: "TypeScript a menudo puede 'adivinar' el tipo basándose en el valor inicial.",
                    code: "let nombre = 'Juan'; // TS sabe que es string"
                }
            ],
            description: "Tipos primitivos y anotaciones.",
            codeJs: `let edad = 25;\nlet nombre = "Ana";`,
            codeTs: `let edad: number = 25;\nlet nombre: string = "Ana";\nlet activo: boolean = true;\nlet grande: bigint = 100n;`,
            syntaxDescription: "Etiqueta tus variables para que TS sepa qué pueden contener.",
            useCases: [
                {
                    title: "Validación de Entradas",
                    description: "Asegura que los datos recibidos de un formulario tengan el formato correcto antes de procesarlos.",
                    code: "function procesarEdad(edadStr: string) {\n  const edad = parseInt(edadStr);\n  if (isNaN(edad)) return;\n  // edad es garantizado como number\n}"
                }
            ]
        },
        {
            id: "ts-arrays-tuples",
            title: "Arrays y Tuplas",
            videoUrl: "https://www.youtube.com/watch?v=AdgfxKxNiZs", // Arrays Udemy
            content: [
                { title: "Arrays", videoUrl: "https://www.youtube.com/watch?v=N5aJ23FW05M", text: "Listas de elementos del mismo tipo." },
                { title: "Tuplas", videoUrl: "https://www.youtube.com/watch?v=TBGnNrKZT3E", text: "Arrays especializados con un número fijo de elementos y tipos específicos por posición." }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Tuplas para retornos",
                    content: "Son útiles para funciones que devuelven múltiples valores, como hooks en React.",
                    code: "let persona: [string, number] = ['Juan', 30];"
                }
            ],
            description: "Manejo de colecciones de datos.",
            codeJs: `let numeros = [1, 2, 3];\nlet persona = ["María", 30];`,
            codeTs: `// Arrays\nlet numeros: number[] = [1, 2, 3];\nlet nombres: Array<string> = ["Ana", "Luis"];\n\n// Tuplas\nlet persona: [string, number] = ["María", 30];`,
            syntaxDescription: "Arrays son listas libres; tuplas son como formularios con espacios específicos para cada dato.",
            useCases: [
                {
                    title: "Geolocalización",
                    description: "Uso de tuplas para representar coordenadas geográficas fijas (Latitud/Longitud).",
                    code: "type Coordenadas = [number, number];\nconst madrid: Coordenadas = [40.4167, -3.7032];"
                }
            ]
        },
        {
            id: "ts-enums",
            title: "Enums",
            videoUrl: "https://www.youtube.com/watch?v=w50o3BVvGCE", // Enums Udemy
            content: [
                { title: "¿Qué es?", videoUrl: "https://www.youtube.com/watch?v=fCfOthrT7VA", text: "Los Enums permiten definir un conjunto de constantes numeradas o con nombre, facilitando la semántica del código." }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Const Enums",
                    content: "Usa 'const enum' para que el compilador los elimine tras la compilación, ahorrando espacio.",
                    code: "const enum Color { Rojo, Verde }"
                }
            ],
            description: "Colecciones de constantes.",
            codeJs: `const Direccion = { Norte: 0, Sur: 1 };`,
            codeTs: `enum Direccion {\n  Norte, Sur, Este, Oeste\n}\n\nenum Estado {\n  Activo = "ACTIVO",\n  Inactivo = "INACTIVO"\n}`,
            syntaxDescription: "En lugar de usar números mágicos (0, 1), usas nombres (Norte, Sur).",
            useCases: [
                {
                    title: "Control de Estados de Pedido",
                    description: "Manejar el flujo de un pedido de forma legible sin usar strings arbitrarios.",
                    code: "enum OrderStatus { Pending, Shipped, Delivered }\nfunction update(status: OrderStatus) {\n  if (status === OrderStatus.Shipped) { /*...*/ }\n}"
                }
            ]
        },
        {
            id: "ts-special-types",
            title: "Any, Unknown y Never",
            videoUrl: "https://www.youtube.com/watch?v=v7xuYl7rfuU", // Any Udemy
            content: [
                { title: "Tipo Any", text: "Any es un escape que desactiva el tipado. Úsalo con cuidado." },
                { title: "Null y Undefined", videoUrl: "https://www.youtube.com/watch?v=QIaXUADktCc", text: "Manejo de valores ausentes." },
                { title: "Unknown y Never", text: "Unknown es un any seguro que exige validación. Never representa estados que no deberían ocurrir." }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Unknown sobre Any",
                    content: "Siempre prefiere 'unknown' porque te obliga a validar el tipo antes de operar con él.",
                    code: "if (typeof valor === 'string') valor.toUpperCase();"
                }
            ],
            description: "Tipos especiales de escape y seguridad.",
            codeJs: `let algo = 4;\n\nlet desc = "hola";\n// En JS no hay chequeo de tipo forzado\nif (typeof desc === "string") desc.toUpperCase();\n\nfunction error(m) {\n  throw new Error(m);\n}`,
            codeTs: `let algo: any = 4;\n\nlet desc: unknown = "hola";\nif (typeof desc === "string") desc.toUpperCase();\n\nfunction error(m: string): never {\n  throw new Error(m);\n}`,
            syntaxDescription: "Any es 'no me importa', Unknown es 'no lo sé aún', Never es 'esto es imposible'.",
            useCases: [
                {
                    title: "Consumo de API Segura",
                    description: "Recibir datos de una fuente externa y asegurar su tipo antes de usarlos.",
                    code: "async function getData(): Promise<unknown> {\n  const res = await fetch('/api');\n  return res.json();\n}\n\nconst data = await getData();\nif (typeof data === 'object' && data !== null) { /* ... */ }"
                }
            ]
        },
        {
            id: "ts-aliases-interfaces",
            title: "Aliases e Interfaces",
            videoUrl: "https://www.youtube.com/watch?fJEgE8JioMs", // Objetos Udemy
            content: [
                { title: "Interfaces y Objetos", videoUrl: "https://www.youtube.com/watch?v=NoDkzOh5T1E", text: "Interfaces definen la forma de los objetos. Los Type Aliases crean nombres para cualquier tipo, incluyendo uniones y primitivos." },
                { title: "Tipado de Objetos", videoUrl: "https://www.youtube.com/watch?v=d5p7oq5RHBQ", text: "Cómo crear objetos con tipos específicos y métodos internos." },
                { title: "Types vs Interfaces", videoUrl: "https://www.youtube.com/watch?v=ku-4BSlwHc4", text: "Cuándo usar cada uno para estructuras personalizadas." },
                { title: "Encadenamiento Opcional", videoUrl: "https://www.youtube.com/watch?v=Uo-SzOGMmSE", text: "Acceso seguro a propiedades anidadas." }
            ],
            tips: [
                {
                    type: "idea",
                    title: "¿Cuál usar?",
                    content: "Interfaces para objetos y herencia; Types para uniones y tipos complejos.",
                    code: "type ID = string | number;\ninterface User { id: ID; }"
                }
            ],
            description: "Definición de estructuras personalizadas.",
            codeJs: `// En JS no existen interfaces ni types.\n// El código simplemente usa objetos planos.\nconst punto = { x: 10, y: 20 };`,
            codeTs: `type Punto = { x: number; y: number };\n\ninterface Producto {\n  nombre: string;\n  precio: number;\n}\n\ninterface Digital extends Producto {\n  formato: string;\n}`,
            syntaxDescription: "Son planos para construir tus propios tipos de datos.",
            useCases: [
                {
                    title: "Modelo de Usuario",
                    description: "Definir una estructura común para los usuarios de toda la aplicación.",
                    code: "interface User {\n  id: string;\n  name: string;\n  email: string;\n  role: 'admin' | 'user';\n}"
                }
            ]
        },
        {
            id: "ts-functions",
            title: "Funciones",
            videoUrl: "https://www.youtube.com/watch?v=lkOVUII2Ljg", // Funciones básicas Udemy
            content: [
                { title: "Tipado de Argumentos", videoUrl: "https://www.youtube.com/watch?v=TiU6hrC5dUw", text: "Garantiza que las funciones reciban los datos correctos." },
                { title: "Parámetros Opcionales y Defecto", videoUrl: "https://www.youtube.com/watch?v=Qzv098uqv3g", text: "Uso de '?' y valores por defecto para mayor flexibilidad." },
                { title: "Parámetros REST", videoUrl: "https://www.youtube.com/watch?v=2ywv4oiaTK8", text: "Manejo de múltiples argumentos en una sola variable." },
                { title: "Tipo Función", videoUrl: "https://www.youtube.com/watch?v=9xx3H6DRS2U", text: "Cómo definir el tipo de una variable que almacena una función." }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Parámetros opcionales",
                    content: "Usa '?' para parámetros que pueden no enviarse.",
                    code: "function hola(n: string, e?: number) {}"
                }
            ],
            description: "Tipado de lógica y parámetros.",
            codeJs: `function sumar(a, b) { return a + b; }\n\nconst saludo = (n) => console.log(n);`,
            codeTs: `function sumar(a: number, b: number): number {\n  return a + b;\n}\n\nconst saludo = (n: string): void => console.log(n);`,
            syntaxDescription: "Define qué entra y qué sale de tus funciones.",
            useCases: [
                {
                    title: "Cálculo de Impuestos",
                    description: "Función matemática con tipos estrictos para evitar errores en transacciones financieras.",
                    code: "function applyTax(price: number, tax: number = 0.21): number {\n  return price * (1 + tax);\n}"
                }
            ]
        },
        {
            id: "ts-classes",
            title: "Clases",
            videoUrl: "https://www.youtube.com/watch?v=qCZ8SFcSYXY", // Clases Fácil
            content: [
                { title: "Constructores", videoUrl: "https://www.youtube.com/watch?v=UVjcGyS5KW8", text: "Inicialización de propiedades y herencia con super()." },
                { title: "Extends y Visibilidad", videoUrl: "https://www.youtube.com/watch?v=QClvtQsGP2k", text: "Uso de extends, protected (video: https://www.youtube.com/watch?v=g5WtHGX8-aw) y private." },
                { title: "Getters y Setters", videoUrl: "https://www.youtube.com/watch?v=JdjmbAMDp5k", text: "Control de acceso a propiedades." },
                { title: "Clases Abstractas", videoUrl: "https://www.youtube.com/watch?v=GTn_pbFS95E", text: "Definiendo clases que no pueden ser instanciadas directamente (video: https://www.youtube.com/watch?v=GfeMkyzUdiM)." }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Readonly",
                    content: "Usa 'readonly' para propiedades que no deben cambiar tras la inicialización.",
                    code: "readonly id: number;"
                }
            ],
            description: "Programación orientada a objetos.",
            codeJs: `class Persona {\n  constructor(nombre) {\n    this.nombre = nombre;\n  }\n}\n\nclass Estudiante extends Persona {\n  constructor(nombre, curso) {\n    super(nombre);\n    this.curso = curso;\n  }\n}`,
            codeTs: `class Persona {\n  private edad: number;\n  constructor(public nombre: string) {}\n}\n\nclass Estudiante extends Persona {\n  constructor(nombre: string, public curso: string) {\n    super(nombre);\n  }\n}`,
            syntaxDescription: "Plantillas para crear objetos con control de privacidad.",
            useCases: [
                {
                    title: "Gestión de Empleados",
                    description: "Modelo de datos jerárquico para una aplicación de recursos humanos.",
                    code: "class Employee {\n  constructor(protected id: number, public name: string) {}\n}\nclass Manager extends Employee {\n  manage() { console.log(this.name + ' managing...'); }\n}"
                }
            ]
        },
        {
            id: "ts-assertions",
            title: "Type Assertions",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una forma de decirle al compilador 'confía en mí, yo sé el tipo de esto' usando la palabra clave 'as'."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es vital cuando trabajas con el DOM o librerías externas donde TS no puede inferir el tipo exacto automáticamente."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite acceder a propiedades específicas de un elemento (como .value en un Input) que de otra forma TS marcaría como error."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo solo cuando estés seguro del tipo. No lo uses para 'forzar' tipos incorrectos, ya que no cambia el comportamiento en ejecución."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimiento del DOM y de cómo TS maneja la jerarquía de tipos."
                }
            ],
            tips: [
                {
                    type: "warning",
                    title: "Úsalo con cuidado",
                    content: "No cambia el tipo real en tiempo de ejecución, solo engaña al compilador.",
                    code: "let x = '123' as unknown as number;"
                }
            ],
            description: "Conversión manual de tipos (casting).",
            codeJs: `let elem = document.getElementById("app");\nlet longitud = valor.length;`,
            codeTs: `let elem = document.getElementById("app") as HTMLDivElement;\nlet longitud = (valor as string).length;`,
            syntaxDescription: "Es como decirle a TS: 'Confía en mí, yo sé que esto es un botón'.",
            useCases: [
                {
                    title: "Manipulación del DOM",
                    description: "Obtener un valor de un input de formulario de forma tipada.",
                    code: "const input = document.getElementById('search') as HTMLInputElement;\nconsole.log(input.value);"
                }
            ]
        },
        {
            id: "ts-config-basic",
            title: "tsconfig.json Básico",
            videoUrl: "https://www.youtube.com/watch?v=ix-TCKiTAoY", // TSConfig Udemy
            content: [
                { title: "Instalación", videoUrl: "https://www.youtube.com/watch?v=rjDrRefgRPg", text: "Instalación global de TypeScript y herramientas necesarias." },
                { title: "Modo Observador", videoUrl: "https://www.youtube.com/watch?v=mfMOG_QeS-M", text: "Uso del flag --watch para recompilación automática." },
                { title: "Configuración", text: "El archivo tsconfig.json es el cerebro de un proyecto TypeScript. Define las opciones del compilador y qué archivos deben incluirse." }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Strict Mode",
                    content: "Siempre activa 'strict: true' para obtener la máxima seguridad de tipos.",
                    code: "\"strict\": true"
                }
            ],
            description: "Configuración del compilador.",
            codeJs: `// JS no utiliza tsconfig.json.\n// Se suele usar Babel o configuraciones de bundlers.`,
            codeTs: `{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "outDir": "./dist"\n  }\n}`,
            syntaxDescription: "El libro de reglas de TypeScript para tu proyecto.",
            useCases: [
                {
                    title: "Migración de Proyecto",
                    description: "Ajustar las opciones para permitir JS gradualmente mientras se migra a TS.",
                    code: "{\n  \"compilerOptions\": {\n    \"allowJs\": true,\n    \"checkJs\": false\n  }\n}"
                }
            ]
        }
    ]
};
