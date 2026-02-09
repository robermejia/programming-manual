export const intermediateCategory = {
    title: "2. Nivel Intermedio",
    topics: [
        {
            id: "ts-unions-intersections",
            title: "Union e Intersection Types",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Las Uniones (|) permiten que una variable sea de uno de varios tipos. Las Intersecciones (&) combinan múltiples tipos en uno solo."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Aportan flexibilidad extrema al sistema de tipos, permitiendo modelar situaciones donde los datos pueden variar de forma predecible."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita el uso de 'any' cuando un valor puede ser, por ejemplo, un string o un número, manteniendo la seguridad de tipos en ambos casos."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Usa uniones para estados o tipos alternativos. Usa intersecciones para extender tipos de objetos sin usar herencia de clases."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Tipos básicos y aliases de tipos."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Discriminated Unions",
                    content: "Añade una propiedad común (ej. 'tipo') para diferenciar entre tipos en una unión.",
                    code: "type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };"
                }
            ],
            description: "Combinación de tipos flexibles.",
            codeJs: `// JS no tiene uniones ni intersecciones.\n// Las variables simplemente pueden contener cualquier valor.\nlet resultado = "éxito";\nresultado = 200;\n\n// El equivalente a intersección es combinar objetos\nconst empleado = Object.assign({}, { nombre: "Ana" }, { salario: 3000 });`,
            codeTs: `// Union\ntype Resultado = string | number;\n\n// Intersection\ntype Empleado = { nombre: string } & { salario: number };`,
            syntaxDescription: "Union es 'A o B'; Intersection es 'A y B'.",
            useCases: [
                {
                    title: "Manejo de Respuestas de API",
                    description: "Representar un resultado que puede ser exitoso o contener un error de forma segura.",
                    code: "type ApiResponse = { status: 'success'; data: any } | { status: 'error'; message: string };\n\nfunction handle(res: ApiResponse) {\n  if (res.status === 'success') console.log(res.data);\n  else console.error(res.message);\n}"
                }
            ]
        },
        {
            id: "ts-literal-types",
            title: "Literal Types",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Son tipos que representan un valor exacto (string, número o booleano) en lugar de un conjunto general."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permiten restringir variables a un conjunto cerrado de opciones, mejorando el autocompletado y evitando valores inválidos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Elimina la ambigüedad de usar un simple 'string' cuando solo se permiten tres palabras específicas (ej. 'rojo', 'verde', 'azul')."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene siempre que tengas opciones finitas y conocidas. No conviene para datos gobernados por el usuario (como nombres propios)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Tipos primitivos y uniones."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Combinación con Unions",
                    content: "Son ideales para definir un conjunto limitado de opciones permitidas.",
                    code: "type Direccion = 'arriba' | 'abajo';"
                }
            ],
            description: "Tipos basados en valores exactos.",
            codeJs: `// JS no restringe valores a nivel de lenguaje.\n// Se suele usar validación manual.\nlet estado = "loading";\nlet dado = 1;`,
            codeTs: `type Estado = "loading" | "success" | "error";\ntype Dado = 1 | 2 | 3 | 4 | 5 | 6;`,
            syntaxDescription: "Es como decir: 'Esta variable solo puede ser exactamente la palabra \"rojo\"'.",
            useCases: [
                {
                    title: "Configuración de UI",
                    description: "Limitar los temas de una aplicación a valores específicos permitidos.",
                    code: "type Theme = 'light' | 'dark' | 'system';\nfunction setTheme(t: Theme) { /* ... */ }\n\nsetTheme('light'); // OK\n// setTheme('blue'); // Error"
                }
            ]
        },
        {
            id: "ts-generics",
            title: "Generics",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Los genéricos permiten crear componentes (funciones, interfaces, clases) que funcionan sobre una variedad de tipos preservando la información del tipo original."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es la herramienta clave para la reutilización de código en TypeScript sin perder la seguridad de tipos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita tener que duplicar funciones para diferentes tipos o usar 'any' para colecciones de datos (como una lista de cualquier cosa)."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos cuando la lógica sea la misma independientemente del tipo de dato. No los uses si la lógica depende fuertemente de un tipo específico."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Funciones e interfaces."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Constraints",
                    content: "Usa 'extends' para limitar qué tipos pueden usarse en un genérico.",
                    code: "function log<T extends { id: number }>(item: T) {}"
                }
            ],
            description: "Componentes reutilizables tipados.",
            codeJs: `// En JS las funciones son genéricas por naturaleza.\nfunction identidad(valor) {\n  return valor;\n}`,
            codeTs: `function identidad<T>(valor: T): T {\n  return valor;\n}\n\ninterface Caja<T> {\n  contenido: T;\n}`,
            syntaxDescription: "Es como un molde que se adapta al material que le pongas.",
            useCases: [
                {
                    title: "Envoltorio de Respuesta (Wrapper)",
                    description: "Crear una interfaz genérica para respuestas de servidor que funcione con cualquier modelo de datos.",
                    code: "interface Resource<T> {\n  data: T;\n  timestamp: number;\n}\n\nconst userRes: Resource<User> = { data: { name: 'Ana' }, timestamp: 123 };"
                }
            ]
        },
        {
            id: "ts-utility-types",
            title: "Utility Types",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Son tipos integrados (Partial, Readonly, Pick...) que permiten transformar tipos existentes en otros nuevos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Ahorran tiempo y líneas de código al evitar la creación manual de variaciones de un mismo tipo (ej. versión opcional de un objeto)."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Mantiene la coherencia: si el tipo base cambia, sus derivados (Partial, Required) se actualizan automáticamente."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos siempre que necesites una transformación estándar. No abuses de ellos si la transformación es demasiado compleja (usa Mapped Types)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Generics e Interfaces."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Pick y Omit",
                    content: "Usa Pick para elegir propiedades y Omit para quitar las que no quieres.",
                    code: "type SoloNombre = Pick<User, 'nombre'>;"
                }
            ],
            description: "Herramientas integradas para transformar tipos.",
            codeJs: `// JS no utiliza tipos de utilidad.\n// Las transformaciones se hacen en tiempo de ejecución.\nconst usuarioReducido = { nombre: usuario.nombre };`,
            codeTs: `type Parcial = Partial<Usuario>;\ntype Requerido = Required<Usuario>;\ntype SoloLectura = Readonly<Usuario>;\ntype SoloNombre = Pick<Usuario, "nombre">;`,
            syntaxDescription: "Son como fórmulas matemáticas para tipos de datos.",
            useCases: [
                {
                    title: "Actualización Parcial de Perfil",
                    description: "Usar Partial para permitir que una función de actualización reciba solo algunos campos del usuario.",
                    code: "interface User { id: number; name: string; email: string; }\n\nfunction updateUser(id: number, changes: Partial<User>) {\n  // changes puede tener solo 'name', solo 'email', o ambos\n}"
                }
            ]
        },
        {
            id: "ts-modules",
            title: "Namespaces y Modules",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Sistemas para organizar y encapsular código. Los módulos son el estándar moderno (export/import), mientras que los namespaces son un sistema propio de TS (antiguo)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evitan colisiones de nombres en proyectos grandes y permiten una carga modular y eficiente de scripts."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita que 'Usuario' en el módulo de compras choque con 'Usuario' en el módulo de administración."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Usa siempre módulos ES6. Usa namespaces solo si mantienes código legacy muy antiguo o para declaraciones muy específicas."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de archivos y rutas en el desarrollo web."
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Modules sobre Namespaces",
                    content: "En el desarrollo moderno con bundlers, usa módulos ES6 (import/export).",
                    code: "export interface Config {}"
                }
            ],
            description: "Encapsulamiento y organización de código.",
            codeJs: `// Modules (ES6)\nexport const version = "1.0";\nimport { version } from "./config.js";\n\n// Namespaces (no estándar en JS)`,
            codeTs: `// Module\nexport const version = "1.0";\n\n// Namespace (Legacy)\nnamespace Utils {\n  export function log() {}\n}`,
            syntaxDescription: "Cajones etiquetados para guardar tu código ordenadamente.",
            useCases: [
                {
                    title: "Exportación de Utilidades",
                    description: "Organizar funciones relacionadas en un archivo separado y consumirlas de forma selectiva.",
                    code: "// mathUtils.ts\nexport const add = (a: number, b: number) => a + b;\n\n// main.ts\nimport { add } from './mathUtils';"
                }
            ]
        },
        {
            id: "ts-indexed-types",
            title: "Tipos de Índice (keyof, lookup)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Operadores para acceder dinámicamente a las claves de un tipo (keyof) o al tipo de una propiedad específica (lookup types)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permiten que el sistema de tipos sea dinámico y se adapte a la estructura de los objetos sin duplicar información."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Garantiza que si intentas acceder a una propiedad de un objeto usando una variable, esa variable realmente sea una de las llaves válidas."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalos en funciones utilitarias que operan sobre objetos genéricos. No los uses si la estructura del objeto ya es simple y fija."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Aliases de tipos y objetos en JS."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Acceso dinámico",
                    content: "Puedes obtener el tipo de una propiedad específica usando corchetes.",
                    code: "type EmailType = User['email'];"
                }
            ],
            description: "Acceso dinámico a la estructura de tipos.",
            codeJs: `// En JS se accede usando llaves o corchetes\nconst claves = Object.keys(usuario);\nconst email = usuario["email"];`,
            codeTs: `type Claves = keyof Usuario;\ntype EmailType = Usuario["email"];`,
            syntaxDescription: "Es como mirar el índice de un libro para saber qué temas (llaves) contiene.",
            useCases: [
                {
                    title: "Getter Dinámico",
                    description: "Crear una función que garantice que solo se pidan propiedades existentes de un objeto.",
                    code: "function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}"
                }
            ]
        },
        {
            id: "ts-async",
            title: "Promises y Async/Await",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Extensión tipada para operaciones asíncronas de JavaScript, permitiendo definir qué devuelve una promesa."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita el manejo manual de 'any' en respuestas de servidor, garantizando que el flujo asíncrono sea seguro."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita crasheos al intentar acceder a datos de una API que aún no han llegado o que tienen una estructura diferente a la esperada."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Siempre que trabajes con asincronía (fetch, DB, timers). No tiene contraindicaciones en TS."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Promises y Async/Await en JavaScript moderno."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Awaited",
                    content: "Usa el tipo 'Awaited' para obtener el tipo de resolución de una promesa.",
                    code: "type Res = Awaited<Promise<string>>;"
                }
            ],
            description: "Manejo de operaciones asíncronas tipadas.",
            codeJs: `async function fetchData() {\n  const res = await fetch("/api");\n  return res.json();\n}`,
            codeTs: `async function fetchData(): Promise<User> {\n  const res = await fetch("/api");\n  return res.json();\n}`,
            syntaxDescription: "Asegúrate de saber qué te devolverá una promesa antes de que llegue.",
            useCases: [
                {
                    title: "Llamada a API Tipada",
                    description: "Asegurar que el resultado de una petición asíncrona cumpla con una interfaz definida.",
                    code: "interface Post { id: number; title: string; }\n\nasync function getPost(id: number): Promise<Post> {\n  const response = await fetch(`https://api.example.com/posts/${id}`);\n  return response.json();\n}"
                }
            ]
        },
        {
            id: "ts-narrowing",
            title: "Narrowing y Type Guards",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Mecanismos para 'estrechar' o filtrar un tipo amplio (como string | number) a uno más específico dentro de un bloque de código."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es lo que dota a TS de su 'inteligencia' para saber qué métodos puedes llamar según las comprobaciones de runtime que hagas (typeof, instanceof)."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita errores de 'esta propiedad no existe en el tipo string | number' cuando tú ya has comprobado que es un string."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene siempre que tengas tipos de unión. Usa guardias personalizados cuando la lógica de filtrado sea compleja."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Condicionales, typeof e instanceof en JavaScript."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Custom Type Guards",
                    content: "Crea funciones que verifiquen tipos manualmente.",
                    code: "function isString(v: any): v is string { return typeof v === 'string'; }"
                }
            ],
            description: "Refinamiento de tipos en tiempo de ejecución.",
            codeJs: `function log(v) {\n  if (typeof v === "string") v.toUpperCase();\n  else if (typeof v === "number") v.toFixed(2);\n}`,
            codeTs: `function log(v: string | number) {\n  if (typeof v === "string") v.toUpperCase();\n  else v.toFixed(2);\n}`,
            syntaxDescription: "Es como un embudo que va filtrando posibilidades hasta saber qué tienes exactamente.",
            useCases: [
                {
                    title: "Procesador de Mensajes",
                    description: "Manejar diferentes tipos de eventos usando un campo discriminador.",
                    code: "interface Click { type: 'click'; x: number; }\ninterface Scroll { type: 'scroll'; y: number; }\n\nfunction handleEvent(event: Click | Scroll) {\n  if (event.type === 'click') console.log(event.x);\n  else console.log(event.y);\n}"
                }
            ]
        },
        {
            id: "ts-satisfies",
            title: "Satisfies Operator",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un operador (TS 4.9+) que valida que un valor cumple un tipo sin 'olvidar' el valor exacto inferido (más específico)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Resuelve el dilema entre validar una estructura y mantener la precisión de los tipos literales."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita que al asignar un objeto a una interfaz general, se pierdan los tipos específicos de sus propiedades."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Úsalo para configuraciones, paletas de colores o cualquier objeto donde quieras validación pero necesites el valor exacto después."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Inferencia de tipos y tipos de utilidad."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Precisión vs Validación",
                    content: "A diferencia de una anotación, 'satisfies' mantiene el conocimiento de los valores exactos.",
                    code: "const p = { r: '#f00' } satisfies Record<string, string>;"
                }
            ],
            description: "Validación estructural sin pérdida de precisión.",
            codeJs: `// En JS simplemente defines el objeto.\nconst config = {\n  port: 8080\n};`,
            codeTs: `const config = {\n  port: 8080\n} satisfies Record<string, number>;\n\nconfig.port.toFixed(); // Sabe que es number`,
            syntaxDescription: "Comprueba que cumples las reglas, pero mantén tu identidad original.",
            useCases: [
                {
                    title: "Configuración de Colores",
                    description: "Validar una paleta de colores asegurando que las llaves sean correctas pero manteniendo los valores hexadecimales literales.",
                    code: "const colors = {\n  primary: '#007bff',\n  secondary: '#6c757d'\n} satisfies Record<string, string>;\n\n// TS sabe que colors.primary es exactamente '#007bff' y no cualquier string"
                }
            ]
        }
    ]
};
