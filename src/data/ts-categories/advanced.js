export const advancedCategory = {
    title: "3. Nivel Avanzado",
    topics: [
        {
            id: "ts-mapped-types",
            title: "Mapped Types",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Los Mapped Types permiten crear nuevos tipos transformando cada propiedad de un tipo existente, similar a un .map() pero para tipos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Son la base de muchos Utility Types integrados y permiten crear transformaciones masivas de objetos de forma dinámica."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita tener que definir manualmente versiones de solo lectura, opcionales o con prefijos de tus interfaces, manteniéndolas sincronizadas con el tipo original."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos cuando necesites derivar un tipo de otro de forma sistemática. No los uses si la relación entre los tipos es arbitraria o no sigue un patrón."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Tipos de índice (keyof) y genéricos."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Key Remapping",
                    content: "Usa 'as' para cambiar el nombre de las llaves mientras mapeas.",
                    code: "type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };"
                }
            ],
            description: "Creación dinámica de tipos basados en otros.",
            codeJs: `// JS no tiene mecanismos para mapear tipos.\n// Las transformaciones de objetos se hacen por referencia o clonación.\nconst aOpcional = (obj) => ({ ...obj });`,
            codeTs: `type SoloLectura<T> = {\n  readonly [P in keyof T]: T[P];\n};\n\ntype Opcional<T> = {\n  [P in keyof T]?: T[P];\n};`,
            syntaxDescription: "Es como un bucle 'for...in' para tipos.",
            useCases: [
                {
                    title: "Generador de Getters",
                    description: "Crear automáticamente un tipo que defina métodos getter para todas las propiedades de una interfaz.",
                    code: "type User = { name: string; age: number };\ntype Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };\n\ntype UserGetters = Getters<User>;\n// { getName: () => string; getAge: () => number; }"
                }
            ]
        },
        {
            id: "ts-conditional-types",
            title: "Conditional Types",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Permiten seleccionar un tipo basándose en una condición lógica expresada con 'extends' (T extends U ? X : Y)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Aportan 'lógica de programación' al sistema de tipos, permitiendo que los tipos tomen decisiones complejas en tiempo de compilación."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite extraer información de tipos internos (con 'infer') o filtrar uniones de tipos de forma programática."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos en librerías o utilidades muy genéricas que necesiten adaptarse a diferentes entradas. Evítalos si puedes resolver el problema con una simple unión."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Genéricos avanzados y herencia de tipos."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Infer Keyword",
                    content: "Usa 'infer' para extraer tipos de dentro de otros tipos.",
                    code: "type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;"
                }
            ],
            description: "Condicionales en el sistema de tipos.",
            codeJs: `// En JS usas ternarios en ejecución, no en tipos.\nconst tipo = (val) => typeof val === "string" ? "Texto" : "Otro";`,
            codeTs: `type EsString<T> = T extends string ? true : false;\n\ntype NoNulo<T> = T extends null | undefined ? never : T;`,
            syntaxDescription: "Es el 'if...else' de la programación de tipos.",
            useCases: [
                {
                    title: "Selector de Tipo de ID",
                    description: "Elegir entre string o number para un ID basándose en si el recurso es local o remoto.",
                    code: "type IdSelector<T extends 'local' | 'remote'> = T extends 'local' ? number : string;\n\nconst localId: IdSelector<'local'> = 123;\nconst remoteId: IdSelector<'remote'> = 'abc-456';"
                }
            ]
        },
        {
            id: "ts-template-literals",
            title: "Template Literal Types",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Permiten construir tipos de string utilizando la sintaxis de plantillas (backticks), combinando múltiples tipos literales."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Facilitan el tipado de strings complejos como nombres de eventos, rutas de archivos o clases de CSS dinámicas."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Garantiza que las combinaciones de strings permitidas sean válidas (ej. 'btn-small-red') sin tener que listarlas todas a mano."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos para sistemas de eventos, prefijos de CSS o rutas de API. No los uses si el número de combinaciones es astronómico (puede afectar el rendimiento del compilador)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Tipos literales y plantillas de string en JS."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Capitalize y otros",
                    content: "TS incluye utilidades intrínsecas como Capitalize, Uppercase, Lowercase para manipular estos tipos.",
                    code: "type EventName = `on${Capitalize<string>}`;"
                }
            ],
            description: "Manipulación avanzada de tipos de string.",
            codeJs: `// JS usa template literals para VALORES, no tipos.\nconst id = "btn";\nconst clase = \`\${id}-active\`;`,
            codeTs: `type Color = "rojo" | "azul";\ntype Nivel = "claro" | "oscuro";\n\ntype Paleta = \`\${Color}-\${Nivel}\`;\n// "rojo-claro" | "rojo-oscuro" | ...`,
            syntaxDescription: "Construye tipos de texto pegando piezas.",
            useCases: [
                {
                    title: "Sistema de Eventos Tipado",
                    description: "Generar automáticamente tipos para manejadores de eventos basados en una lista de acciones.",
                    code: "type Action = 'save' | 'delete' | 'update';\ntype EventHandler = `on${Capitalize<Action>}`;\n\nconst handler: EventHandler = 'onSave'; // OK\n// const invalid: EventHandler = 'onExit'; // Error"
                }
            ]
        },
        {
            id: "ts-decorators",
            title: "Decoradores",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Son funciones especiales que se pueden adjuntar a clases, métodos o propiedades para modificar su comportamiento mediante anotaciones."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permiten la metaprogramación y la inyección de dependencias, siendo el núcleo de frameworks como Angular o NestJS."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita la repetición de lógica común (logging, validación, autorización) al extraerla a decoradores reutilizables."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos si estás trabajando con frameworks que los exigen (Angular, NestJS) o en arquitecturas de backend complejas. Son experimentales, úsalos con precaución."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Clases avanzadas, closures y configuración de tsconfig."
                }
            ],
            tips: [
                {
                    type: "warning",
                    title: "Experimental",
                    content: "Requieren habilitar 'experimentalDecorators' en el tsconfig y suelen usarse en frameworks como Angular o NestJS.",
                    code: "\"experimentalDecorators\": true"
                }
            ],
            description: "Modificación de comportamiento mediante anotaciones.",
            codeJs: `// Decoradores en JS (Propuesta ECMA).\n// Se asocian a clases o métodos.\n@log\nclass MiApp {}`,
            codeTs: `function Log(target: any, key: string) {\n  console.log("Accediendo a: " + key);\n}\n\nclass MiApp {\n  @Log\n  inicio() {}\n}`,
            syntaxDescription: "Como pegatinas que cambian cómo funciona algo sin tocar su código interno.",
            useCases: [
                {
                    title: "Validación de Roles en NestJS",
                    description: "Uso de decoradores para restringir el acceso a ciertos métodos de una clase según el rol del usuario.",
                    code: "class UserController {\n  @Roles('admin')\n  deleteUser(id: string) { /* ... */ }\n}"
                }
            ]
        },
        {
            id: "ts-declaration-files",
            title: "Declaration Files (.d.ts)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Archivos que contienen únicamente metadatos de tipos, sin código de ejecución, para describir librerías escritas en JavaScript puro."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permiten que TypeScript entienda el código JS de terceros, proporcionando autocompletado y seguridad de tipos en todo el ecosistema npm."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite usar librerías antiguas o externas en un proyecto TS sin tener que renunciar al chequeo de tipos o usar 'any' para todo."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos cuando necesites tipar una librería JS que no incluye tipos. No los crees manualmente si la librería ya tiene tipos (@types/...). "
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Sistemas de módulos, namespaces de TS y ecosistema npm."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "DefinitelyTyped",
                    content: "La mayoría de librerías JS tienen tipos en el repositorio de la comunidad (npm install @types/...).",
                    code: "npm install @types/lodash"
                }
            ],
            description: "Definición de tipos para JS puro.",
            codeJs: `// No existe equivalente en JS.\n// JS simplemente importa la librería sin metadatos de tipos.\nimport _ from "lodash";`,
            codeTs: `// En archivo.d.ts\ndeclare function miLib(s: string): void;\n\ndeclare module "mi-modulo" {\n  export const id: number;\n}`,
            syntaxDescription: "Es el manual de instrucciones (tipos) para una caja negra (JavaScript).",
            useCases: [
                {
                    title: "Tipado de Librería Externa",
                    description: "Proporcionar tipos para una librería JS que solo expone funciones globales.",
                    code: "// globalLib.d.ts\ndeclare function analytics(event: string, data: object): void;\n\n// main.ts\nanalytics('login', { method: 'google' });"
                }
            ]
        },
        {
            id: "ts-variance",
            title: "Variance Annotations",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Anotaciones (in/out) para controlar cómo se comportan los tipos genéricos respecto a la herencia (Covarianza y Contravarianza)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Mejoran el rendimiento del compilador y permiten definir de forma explícita si un genérico es solo de entrada o de salida."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita bugs sutiles donde un consumidor de datos podría aceptar erróneamente un tipo que no sabe manejar debido a la jerarquía de herencia."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos en librerías de utilidades genéricas muy abstractas. En el desarrollo de aplicaciones cotidianas, TS suele inferir la varianza correctamente."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Herencia de clases y genéricos profundos."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "In vs Out",
                    content: "Usa 'out' para productores (salida) e 'in' para consumidores (entrada).",
                    code: "interface Producer<out T> { get(): T; }"
                }
            ],
            description: "Control de herencia en genéricos.",
            codeJs: `// Varianza no existe en JS,\nya que no hay chequeo de tipos estático.`,
            codeTs: `type Producer<out T> = () => T;\ntype Consumer<in T> = (val: T) => void;`,
            syntaxDescription: "Reglas de tráfico para saber si un 'Coche' puede entrar donde piden un 'Vehículo'.",
            useCases: [
                {
                    title: "Seguridad en Procesadores de Datos",
                    description: "Anotación explícita para asegurar que una interfaz solo acepte subtipos de un dato base.",
                    code: "interface Consumer<in T> {\n  consume: (val: T) => void;\n}\n\nlet animalConsumer: Consumer<Animal> = { consume: (a) => console.log(a.name) };\nlet dogConsumer: Consumer<Dog> = animalConsumer; // OK (Contravarianza)"
                }
            ]
        },
        {
            id: "ts-resource-management",
            title: "Using y Disposable",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Nueva sintaxis (TS 5.2+) basada en el estándar 'Explicit Resource Management' para la limpieza automática de recursos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Garantiza que recursos como archivos, conexiones a DB o sockets se cierren siempre, incluso si hay un error, sin usar try/finally manual."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita fugas de memoria y bloqueos de archivos causados por olvidar cerrar un recurso manualmente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo siempre que trabajes con recursos finitos que necesiten limpieza. Requiere polifills en entornos antiguos."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Ciclo de vida de objetos y manejo de excepciones."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Automatic Cleanup",
                    content: "El recurso se cierra automáticamente al salir del bloque 'using'.",
                    code: "using db = new DBConnection();"
                }
            ],
            description: "Garantía de liberación de recursos.",
            codeJs: `// Equivalente tradicional en JS\nconst r = new Recurso();\ntry {\n  // operación\n} finally {\n  r.dispose();\n}`,
            codeTs: `class Recurso implements Disposable {\n  [Symbol.dispose]() {\n    console.log("Limpiando...");\n  }\n}\n\n{\n  using r = new Recurso();\n} // Se limpia aquí`,
            syntaxDescription: "Como una persona que apaga la luz automáticamente al salir de la habitación.",
            useCases: [
                {
                    title: "Gestión de Archivos Segura",
                    description: "Garantizar que un archivo se cierre correctamente al terminar su procesamiento, incluso si falla.",
                    code: "async function processFile(path: string) {\n  using file = await openFile(path);\n  // file se cerrará automáticamente al salir de la función\n  return await file.read();\n}"
                }
            ]
        },
        {
            id: "ts-declaration-merging",
            title: "Declaration Merging",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Comportamiento donde el compilador fusiona dos o más declaraciones individuales con el mismo nombre en una sola definición."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite extender librerías existentes o APIs globales sin tener que modificar su código fuente original."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite añadir propiedades personalizadas al objeto 'window' o 'process.env' que de otro modo TS marcaría como errores de propiedad inexistente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para extender librerías o globals. No lo uses en tu propio código si puedes definir la estructura completa en un solo lugar, ya que puede oscurecer la procedencia de los tipos."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Interfaces y namespaces de TS."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Extender Librerías",
                    content: "Es la técnica principal para añadir propiedades a objetos globales como 'window' o 'process.env'.",
                    code: "interface Window { debug: boolean; }"
                }
            ],
            description: "Expansión de definiciones existentes.",
            codeJs: `// En JS simplemente asignas al objeto global.\nwindow.debug = true;`,
            codeTs: `interface User { nombre: string; }\ninterface User { edad: number; }\n\n// El tipo User tendrá ambas propiedades.`,
            syntaxDescription: "Como dos personas escribiendo en la misma hoja de papel; al final, la hoja tiene toda la información.",
            useCases: [
                {
                    title: "Extensión de Window",
                    description: "Añadir una propiedad personalizada al objeto global Window de forma que TS la reconozca.",
                    code: "interface Window {\n  __MY_APP_CONFIG__: { apiUrl: string };\n}\n\nconsole.log(window.__MY_APP_CONFIG__.apiUrl);"
                }
            ]
        }
    ]
};
