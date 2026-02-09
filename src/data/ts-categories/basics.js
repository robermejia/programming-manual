export const basicsCategory = {
    title: "1. Fundamentos",
    topics: [
        {
            id: "ts-basics",
            title: "Tipos Básicos",
            content: [
                {
                    title: "¿Qué es?",
                    text: "TypeScript extiende JavaScript añadiendo tipos estáticos. Esto permite definir qué tipo de datos debe tener una variable, argumento o retorno de función."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite atrapar errores de tipo durante el desarrollo, antes de que el código se ejecute, mejorando la robustez y mantenibilidad."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita errores comunes como sumar un número con un objeto o intentar acceder a propiedades que no existen, algo frecuente en JS puro."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene usarlo en cualquier proyecto moderno de mediana o gran escala. No conviene en scripts extremadamente simples de una sola vez donde la velocidad de escritura es la única prioridad."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimientos básicos de JavaScript (variables, funciones, tipos de datos)."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "Arrays son listas de elementos del mismo tipo. Tuplas son arrays especializados con un número fijo de elementos y tipos específicos por posición."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite modelar colecciones de datos con mayor precisión, garantizando que cada elemento de una lista o posición de una tupla sea válido."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita acceder a índices inexistentes con tipos incorrectos y previene que se mezclen datos no deseados en una lista."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Usa arrays para listas homogéneas. Usa tuplas para estructuras cortas y fijas, como coordenadas o respuestas de hooks."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Manejo básico de arrays en JavaScript."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "Los Enums permiten definir un conjunto de constantes numeradas o con nombre, facilitando la semántica del código."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evitan el uso de 'números mágicos' o strings repetitivos, centralizando las opciones posibles para una variable."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Previene errores ortográficos en strings de configuración y hace que el código sea autodocumentado."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para estados, categorías o direcciones constantes. No los uses si necesitas una estructura de datos muy dinámica."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Concepto de constantes y objetos en JavaScript."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "Any es un escape que desactiva el tipado. Unknown es un any seguro que exige validación. Never representa estados que no deberían ocurrir."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Proporcionan herramientas para manejar la incertidumbre (APIs externas) o el flujo de control estricto de forma segura."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Any permite migrar de JS a TS gradualmente. Unknown previene errores al consumir datos externos. Never ayuda a detectar lógica incompleta."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Evita Any siempre que sea posible. Usa Unknown para entradas de API. Usa Never para funciones que siempre lanzan errores."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimiento de tipos de datos y manejo de excepciones."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "Interfaces definen la forma de los objetos. Los Type Aliases crean nombres para cualquier tipo, incluyendo uniones y primitivos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permiten crear estructuras de datos complejas y reutilizables, estableciendo 'contratos' que el código debe cumplir."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita la repetición de definiciones de objetos complejos y permite extender tipos existentes de forma limpia."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Usa interfaces para objetos y POO (permiten mezcla de declaraciones). Usa types para uniones, tuplas y tipos complejos."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Objetos en JavaScript y concepto de contrato/interfaz."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "Bloques de código que permiten tipar tanto sus parámetros como su valor de retorno."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Garantiza que las funciones reciban los datos correctos y devuelvan lo prometido, evitando errores en la lógica interna."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita pasar parámetros de menos o de más, y previene el uso de resultados de función con tipos inesperados."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Siempre conviene tipar las funciones. Solo en lógica interna muy trivial y obvia se puede confiar en la inferencia."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Funciones y arrow functions en JavaScript."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "Las clases en TS extienden las de ES6 añadiendo modificadores de acceso, inicialización en el constructor y tipado de propiedades."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Facilita el uso de patrones de diseño clásico y Programación Orientada a Objetos con un control estricto de la privacidad."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita el acceso a datos internos sensibles (private) y garantiza que las clases hijas cumplan con la estructura de las madres."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalas en arquitecturas basadas en POO. Evítalas si prefieres un enfoque funcional o basado en hooks y funciones puras."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Clases en ES6 JavaScript y conceptos de POO básica."
                }
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
            content: [
                {
                    title: "¿Qué es?",
                    text: "El archivo tsconfig.json es el cerebro de un proyecto TypeScript. Define las opciones del compilador y qué archivos deben incluirse."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite estandarizar el comportamiento de TS en todo el equipo, definiendo qué tan estricto debe ser el chequeo de tipos y a qué versión de JS compilar."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita inconsistencias entre desarrolladores y garantiza que el código generado sea compatible con el entorno de ejecución (navegador o Node.js)."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Es obligatorio en cualquier proyecto TS real. Solo se puede omitir en pruebas rápidas usando compiladores externos como esbuild o swc sin chequeo de tipos."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos básicos de JSON y del ecosistema npm/Node.js."
                }
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
