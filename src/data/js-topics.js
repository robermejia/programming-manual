import { vocabularyCategory } from './js-categories/vocabulary.js';
import { flashcardsCategory } from './js-categories/flashcards.js';

export const categories = [
  vocabularyCategory,
  {
    title: "1. Basic Syntax",
    topics: [
      {
        id: "variables-constants",
        title: "Variables y Constantes",
        content: [
          {
            title: "¿Qué es?",
            text: "La declaración de variables ha evolucionado. `let` (variable de alcance de bloque) y `const` (constante de alcance de bloque) reemplazaron a `var` para evitar problemas de 'hoisting' y scope global."
          },
          {
            title: "¿Por qué es importante?",
            text: "`var` permitía acceder a variables antes de declararlas y no respetaba bloques `if` o `for`, causando bugs silenciosos. `const` y `let` hacen el flujo de datos predecible y seguro."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa `const` por defecto para todo. Solo usa `let` si realmente necesitas reasignar el valor (como en un contador). Evita `var` completamente."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Idea clave",
            content: "Una variable declarada con `const` no es inmutable. Si es un objeto, puedes modificar sus propiedades, pero no puedes reasignar la variable a otro objeto.",
            code: "const user = { name: 'Ana' };\nuser.name = 'Eva'; // OK\n// user = {}; // Error!"
          },
          {
            type: "goodPractice",
            title: "Buenas prácticas",
            content: "Usa nombres semánticos. `isLoggedIn` es mejor que `flag`. El código se lee muchas más veces de las que se escribe.",
            code: "// Mal\nconst f = true;\n\n// Bien\nconst isModalOpen = true;"
          }
        ],
        syntaxDescription: "Piensa en las variables como cajas con etiqueta. `const` es una caja sellada: una vez que guardas algo, esa caja siempre guardará eso (aunque si guardas una mochila, puedes cambiar lo que hay dentro de la mochila). `let` es una caja abierta: puedes sacar lo que hay y meter otra cosa nueva cuando quieras.",
        description: "Declaración de variables y constantes en JavaScript moderno.",
        code: `// Moderno y Seguro
const TASA_IMPUESTO = 0.16; // No cambiará
let carritoTotal = 0;       // Cambiará

if (true) {
  let bloque = "visible solo aquí";
  var global = "visible fuera"; // ¡Cuidado!
}
// console.log(bloque); // Error: ReferenceError
// console.log(global); // "visible fuera"`,
        useCases: [
          {
            title: "Const en Objetos Mutables",
            description: "Demostración de cómo `const` protege la referencia pero permite mutar el contenido del objeto.",
            code: `const usuario = { nombre: "Ana" };
            
// Permitido: Mutar propiedades
usuario.nombre = "Maria";

// Prohibido: Reasignar la variable
// usuario = { nombre: "Luis" }; // Error: Assignment to constant variable`
          },
          {
            title: "Scope en Bucles",
            description: "Diferencia crítica entre var y let en bucles asíncronos o con timers.",
            code: `// Con var: imprime 3, 3, 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('Var:', i), 100);
}

// Con let: imprime 0, 1, 2 (Correcto)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('Let:', j), 100);
}`
          }
        ]
      },
      {
        id: "primitive-types",
        title: "Tipos de Datos Primitivos",
        content: [
          {
            title: "¿Qué es?",
            text: "JavaScript tiene 7 tipos primitivos: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, y `null`. Son inmutables y se pasan por valor, a diferencia de los objetos que se pasan por referencia."
          },
          {
            title: "¿Por qué es importante?",
            text: "Entender la diferencia entre `null` (valor vacío intencional) y `undefined` (variable declarada sin valor) es vital para el control de errores."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "`BigInt` es necesario para IDs de base de datos grandes o criptografía donde `Number` pierde precisión (mayor a 2^53)."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Bug conocido",
            content: "Debido a un error histórico en JS, `typeof null` devuelve 'object'. No confíes en eso para verificar nulos; usa `val === null`.",
            code: "console.log(typeof null); // 'object' (Bug)\n\nif (val === null) { ... } // Correcto"
          },
          {
            type: "error",
            title: "Precisión Flotante",
            content: "No uses `Number` para dinero. `0.1 + 0.2` resulta en `0.30000000000000004`. Usa librerías como `Decimal.js` o trabaja en centavos.",
            code: "0.1 + 0.2 === 0.3; // false\n\n// Solución (Centavos)\n(10 + 20) === 30; // true"
          }
        ],
        syntaxDescription: "Los tipos primitivos son como átomos: únicos e inmutables. Un '5' es un '5' y no puede cambiarse por dentro. Si copias una variable primitiva, creas una copia totalmente independiente. Si cambias la copia, la original ni se entera.",
        description: "Tipos de datos básicos disponibles en JavaScript.",
        code: `// Primitivos comunes
let texto = "Hola Mundo";
let entero = 42;
let flotante = 3.14;
let esVerdad = true;
let sinDefinir;     // undefined
let nulo = null;    // null

// Tipos especiales
let unico = Symbol("id");
let gigante = 9007199254740991n; // BigInt`,
        useCases: [
          {
            title: "Comparación Estricta vs Abstracta",
            description: "Por qué siempre debes usar `===` (valor y tipo) sobre `==` (solo valor con coerción).",
            code: `console.log(5 == "5");  // true (Coerción implícita, peligroso)
console.log(5 === "5"); // false (Seguro, tipos diferentes)

console.log(null == undefined); // true
console.log(null === undefined); // false`
          },
          {
            title: "Uso de BigInt",
            description: "Manejo seguro de números mayores a 2^53 - 1.",
            code: `const maxSeguro = Number.MAX_SAFE_INTEGER;
const grande = BigInt(maxSeguro) + 2n;

console.log(grande.toString()); 
// Mantiene precisión donde Number fallaría`
          }
        ]
      },
      {
        id: "operators",
        title: "Operadores",
        content: [
          {
            title: "¿Qué es?",
            text: "Símbolos y keywords para realizar operaciones. Incluye la igualdad estricta `===`, lógicos `&& ||`, y los modernos Nullish Coalescing `??` y Optional Chaining `?.`."
          },
          {
            title: "¿Por qué es importante?",
            text: "El operador `===` evita la coerción de tipos (donde `0 == '0'` es true), previniendo bugs sutiles. `??` permite asignar defaults seguros ignorando el 0 o string vacío."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa `?.` para acceder a propiedades anidadas profundas sin crashear si un padre es nulo: `user?.address?.city`."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Usa siempre ===",
            content: "Nunca uses `==` a menos que sepas exactamente por qué lo necesitas. La igualdad estricta es la única forma cuerda de comparar en JS.",
            code: "0 == '0'  // true (Malo)\n0 === '0' // false (Bueno)"
          },
          {
            type: "recommendation",
            title: "Defaults seguros",
            content: "Usa `const val = input ?? default` en lugar de `||`. El `||` reemplazará el número `0` o strings vacíos `''`, lo cual suele ser incorrecto.",
            code: "const price = 0;\n\n// Mal (0 es falsy)\nconst final = price || 10; // 10\n\n// Bien\nconst final = price ?? 10; // 0"
          }
        ],
        syntaxDescription: "Los operadores son los verbos de las matemáticas. El `===` es un juez estricto que mira el ADN (tipo) y la apariencia (valor). El `==` es un juez relajado que dice 'bueno, te pareces, pase'. Confía siempre en el juez estricto.",
        description: "Operadores aritméticos, de comparación, lógicos y más.",
        code: `// Nullish Coalescing
const altura = 0;
const conOr = altura || 100;      // 100 (Incorrecto, 0 es válido)
const conNullish = altura ?? 100; // 0 (Correcto)

// Optional Chaining
const usuario = {};
// Sin error, devuelve undefined
console.log(usuario?.perfil?.foto?.url);`,
        useCases: [
          {
            title: "Short-Circuiting en Asignación",
            description: "Patrón común para ejecutar código solo si una condición se cumple, o asignar defaults.",
            code: `// Ejecutar función solo si existe
onSuccess && onSuccess(data);

// Asignar default solo si es null/undefined
const config = userConfig ?? defaultConfig;`
          },
          {
            title: "Operador Ternario para UI",
            description: "Condicionales en línea limpios, muy usados para clases CSS o renderizado.",
            code: `const estadoclase = isActive ? 'btn-active' : 'btn-inactive';
const mensaje = cantidad > 0 ? \`Tienes \${cantidad} items\` : 'Carrito vacío';`
          }
        ]
      },
      {
        id: "template-literals",
        title: "Template Literals",
        content: [
          {
            title: "¿Qué es?",
            text: "Uso de backticks (`` ` ``) para definir strings. Permiten interpolación `${var}`, multilínea nativa y funciones de etiquetado (Tagged Templates)."
          },
          {
            title: "¿Por qué es importante?",
            text: "Adiós a concatenar con `+`. El código es mucho más limpio y legible, especialmente al generar fragmentos de HTML o SQL."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre que necesites inyectar variables en un string. También para librerías DSL como `styled-components`."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Tagged Templates",
            content: "Las funciones pueden recibir un template literal directamente: `miFuncion\\`texto\\``. Así funcionan las consultas en `Apollo GraphQL` o los estilos en `Styled Components`.",
            code: "const Button = styled.button`\n  color: red;\n`;"
          }
        ],
        syntaxDescription: "Las comillas invertidas (`` ` ``) son el superpoder de los textos. Te dejan meter variables dentro con `${}` como si llenaras un formulario, y puedes escribir en varias líneas sin que el código se rompa.",
        description: "Cadenas de texto con interpolación de variables.",
        code: `const producto = "Laptop";
const precio = 1200;
const moneda = "USD";

// Multilínea + Interpolación
const mensaje = \`
  Resumen de compra:
  ------------------
  Producto: \${producto}
  Precio: \${precio} \${moneda}
  Impuesto (16%): \${precio * 0.16} \${moneda}
\`;`,
        useCases: [
          {
            title: "Generación de HTML Dinámico",
            description: "Crear fragmentos de HTML inyectando datos de forma limpia.",
            code: `const crearCard = (user) => \`
  <div class="user-card">
    <img src="\${user.avatar}" alt="\${user.name}" />
    <h3>\${user.name}</h3>
    <p>\${user.bio ?? 'Sin biografía'}</p>
  </div>
\`;`
          },
          {
            title: "Tagged Templates (Concepto Styled)",
            description: "Cómo funcionan librerías como styled-components bajo el capó.",
            code: `function bold(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i] ? \`<b>\${values[i]}</b>\` : '';
    return acc + str + val;
  }, '');
}

const nombre = "Juan";
// Salida: Hola <b>Juan</b>
console.log(bold\`Hola \${nombre}\`);`
          }
        ]
      },
      {
        id: "conditionals",
        title: "Condicionales",
        content: [
          {
            title: "¿Qué es?",
            text: "`if`, `else`, y el operador ternario `cond ? a : b` controlan el flujo del programa basándose en si una expresión es verdadera o falsa."
          },
          {
            title: "¿Por qué es importante?",
            text: "Evitar el 'Callback Hell' es bueno, pero evitar el 'If-Else Hell' (anidación profunda) también lo es. Usar 'Cláusulas de Guarda' (Early Return) limpia drásticamente las funciones."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa ternarios para asignaciones simples. Usa `if` con retorno temprano para validaciones al inicio de funciones."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Cláusulas de Guarda",
            content: "En lugar de envolver todo tu código en un `if (!error) { ... }`, verifica el error primero y haz `return`. `if (error) return;` reduce la indentación mental.",
            code: "function login(user) {\n  if (!user) return;\n  // ... resto del código sin else\n}"
          }
        ],
        syntaxDescription: "El `if` es como un portero de discoteca: solo te deja pasar si cumples la condición. Las 'Guard Clauses' son poner al portero en la puerta de la calle: si no cumples, te vas de inmediato, en lugar de entrar al pasillo y que te saquen después.",
        description: "Estructuras de control para toma de decisiones.",
        code: `// Cláusula de Guarda (Guard Clause)
function procesarPago(usuario, monto) {
  if (!usuario) return;          // Salida temprana
  if (monto <= 0) return;        // Salida temprana
  if (!usuario.tieneFondos) return; 

  // Lógica principal sin anidamiento
  console.log("Procesando pago...");
}`,
        useCases: [
          {
            title: "Lookup Table (Reemplazo de Switch)",
            description: "Usar un objeto para mapear claves a valores/funciones es a menudo más limpio que un switch grande.",
            code: `const coloresEstado = {
  pending: 'amarillo',
  success: 'verde',
  error: 'rojo',
  deleted: 'gris'
};

const getColor = (estado) => coloresEstado[estado] || 'azul';`
          },
          {
            title: "Validación Compleja",
            description: "Encapsular condiciones complejas en variables booleanas con nombres descriptivos.",
            code: `const esMayor = edad >= 18;
const tienePermiso = usuario.rol === 'admin';
const estaActivo = usuario.status === 'active';

if (esMayor && (tienePermiso || estaActivo)) {
  permitirAcceso();
}`
          }
        ]
      },
      {
        id: "switch",
        title: "Switch",
        content: [
          {
            title: "¿Qué es?",
            text: "Estructura para comparar una expresión con múltiples casos posibles. Es una alternativa más limpia a múltiples `if...else if` cuando se verifica la misma variable."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite 'fall-through' (agrupar casos vacíos) para ejecutar la misma lógica en múltiples escenarios. En Redux, es el estándar para los reducers."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Cuando tienes estados discretos (ej. 'pending', 'success', 'error') o acciones tipadas."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Olvidar el break",
            content: "Si olvidas el `break`, el código seguirá ejecutando el siguiente `case` (caída en cascada). A veces es deseado, pero usualmente es un bug.",
            code: "case 'A':\n  doSomething();\n  // Falta break -> Ejecuta B también\ncase 'B': ..."
          },
          {
            type: "idea",
            title: "Pattern Matching",
            content: "Para mapeos simples valor->valor, un objeto suele ser mejor que un switch: `const colors = { red: '#f00', blue: '#00f' }; return colors[type];`.",
            code: "const actions = {\n  'create': () => { ... },\n  'update': () => { ... }\n};\nactions[type]();"
          }
        ],
        syntaxDescription: "El `switch` es como un panel de botones de ascensor. Presionas uno y vas directo a ese piso. ¡Ojo! El `break` es lo que detiene el ascensor; si no lo pones, el ascensor seguirá bajando por todos los pisos siguientes (esto se llama fall-through).",
        description: "Estructura switch para múltiples casos.",
        code: `const tipoUsuario = "admin";

switch (tipoUsuario) {
  case "guest":
    console.log("Acceso limitado");
    break;
  case "user":
  case "premium": // Fall-through intencional (OR)
    console.log("Acceso a contenido");
    break;
  case "admin":
    console.log("Acceso total");
    break;
  default:
    console.log("Rol desconocido");
}`,
        useCases: [
          {
            title: "Manejo de Acciones (Estilo Redux)",
            description: "El uso clásico de switch para determinar qué lógica ejecutar basado en un tipo de evento o acción.",
            code: `function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return { count: state.count + 1 };
    case 'DECREMENTAR':
      return { count: state.count - 1 };
    default:
      return state;
  }
}`
          },
          {
            title: "Agrupación de Casos",
            description: "Ejecutar la misma lógica para múltiples valores de entrada distintos.",
            code: `switch (fruta) {
  case 'limon':
  case 'naranja':
  case 'mandarina':
    console.log('Es un cítrico');
    break;
  case 'manzana':
    console.log('Es una pomácea');
    break;
}`
          }
        ]
      },
      {
        id: "loops",
        title: "Bucles",
        content: [
          {
            title: "¿Qué es?",
            text: "Estructuras para repetir código: `for`, `while`, y los modernos `for...of` (valores) y `for...in` (claves)."
          },
          {
            title: "¿Por qué es importante?",
            text: "`for...of` es la forma moderna y limpia de iterar cualquier colección (Arrays, Strings, Sets). Soporta `async/await`, a diferencia de `.forEach()`."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa `for..of` para lectura secuencial. Usa métodos funcionales (`.map`, `.filter`) para transformar datos."
          }
        ],
        tips: [
          {
            type: "error",
            title: "For...in en Arrays",
            content: "Nunca uses `for...in` para arrays. Itera sobre las claves (índices en string) y propiedades del prototipo, no sobre los valores ordenados.",
            code: "const list = ['a', 'b'];\nfor (const i in list) {\n  console.log(i); // \"0\", \"1\" (Strings!)\n}"
          },
          {
            type: "recommendation",
            title: "Prefiere Funcional",
            content: "En JS moderno/React, raramente escribirás bucles manuales. `.map()` y `.reduce()` son más expresivos y componibles.",
            code: "// Imperativo\nconst double = [];\nfor (const n of nums) double.push(n * 2);\n\n// Funcional\nconst double = nums.map(n => n * 2);"
          }
        ],
        syntaxDescription: "Los bucles son como una pista de atletismo: corres vueltas hasta que te cansas (condición). `for...of` es correr mirando el paisaje (los valores), mientras que `for` clásico es contar cada paso que das (índice 0, 1, 2...).",
        description: "Estructuras de repetición (For, While, Do-while).",
        code: `const frutas = ["Manzana", "Pera", "Uva"];

// Moderno: For...of (Valores)
for (const fruta of frutas) {
  console.log(fruta);
}

// Clásico: While (Condición)
let intentos = 0;
while (intentos < 3) {
  if (conectar()) break; // Salida temprana
  intentos++;
}`,
        useCases: [
          {
            title: "Iterar Objetos (Claves y Valores)",
            description: "Uso de Object.entries con for...of para recorrer diccionarios limpiamente.",
            code: `const config = { modo: 'dark', vol: 80 };

for (const [clave, valor] of Object.entries(config)) {
  console.log(\`\${clave}: \${valor}\`);
}`
          },
          {
            title: "Break/Continue en Bucles",
            description: "Controlar el flujo saltando iteraciones o terminando el proceso.",
            code: `for (const num of numeros) {
  if (num % 2 === 0) continue; // Saltar pares
  if (num > 100) break;        // Parar si es muy grande
  procesar(num);
}`
          }
        ]
      }
    ]
  },
  {
    title: "2. Functions & Scope",
    topics: [
      {
        id: "functions",
        title: "Funciones",
        content: [
          {
            title: "¿Qué es?",
            text: "Bloques de código reutilizables. Existen 3 formas principales: Declaración (`function fn()`), Expresión (`const fn = function()`) y Arrow Function (`const fn = () =>`)."
          },
          {
            title: "¿Por qué es importante?",
            text: "Las Arrow Functions solucionaron el problema del `this` dinámico, heredando el contexto léxico. Los parámetros por defecto y Rest (`...args`) modernizaron la gestión de argumentos."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa Arrow Functions para callbacks y métodos de clase simples. Usa Declaraciones para funciones de nivel superior que se benefician del hoisting."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "First-Class Citizens",
            content: "Las funciones son valores. Puedes pasarlas como argumentos, retornarlas, o guardarlas en arrays/objetos. Esto permite la Programación Funcional."
          },
          {
            type: "error",
            title: "No uses Arrow en métodos de objeto",
            content: "`const obj = { val: 1, inc: () => this.val++ }` fallará porque `this` no es el objeto. Usa `inc() { this.val++ }`.",
            code: "const obj = {\n  val: 0,\n  bad: () => this.val++, // Error\n  good() { this.val++; } // OK\n};"
          }
        ],
        syntaxDescription: "Una función es una máquina de hacer salchichas. Metes carne (argumentos) por un lado y salen salchichas (return) por el otro. Las Arrow Functions `=>` son máquinas portátiles modernas: hacen lo mismo pero ocupan menos espacio y no se lían con quién es el dueño de la máquina (`this`).",
        description: "Diferentes formas de declarar funciones y sus contextos.",
        code: `// 1. Declaración (Hoisted)
console.log(suma(2, 2)); // Funciona
function suma(a, b) { return a + b; }

// 2. Expresión (No Hoisted)
// resta(4, 2); // Error: Cannot access 'resta'
const resta = function(a, b) { return a - b; };

// 3. Arrow Function (Lexical TS)
const multiplicar = (a, b) => a * b;

// Parámetros Default y Rest
function logear(nivel = 'INFO', ...mensajes) {
  console.log(\`[\${nivel}] \`, mensajes.join(' '));
}`,
        useCases: [
          {
            title: "Arrow Functions en Event Listeners",
            description: "Evitar el problema de `this` en clases o componentes al usar arrows.",
            code: `class Boton {
  constructor() {
    this.clicks = 0;
    // La arrow function hereda 'this' de la instancia
    document.body.addEventListener('click', () => {
      this.clicks++; 
      console.log(this.clicks); 
    });
  }
}`
          },
          {
            title: "Funciones Variádicas y Default",
            description: "Crear funciones utilitarias flexibles que aceptan cualquier cantidad de parámetros.",
            code: `const crearElemento = (tag = 'div', ...clases) => {
  const el = document.createElement(tag);
  el.classList.add(...clases);
  return el;
};

// <button class="btn primary large"></button>
crearElemento('button', 'btn', 'primary', 'large');`
          }
        ]
      },
      {
        id: "closures",
        title: "Closures (Clausuras)",
        content: [
          {
            title: "¿Qué es?",
            text: "Una función que 'recuerda' su entorno léxico (variables externas) incluso cuando es ejecutada fuera de ese entorno. Es la base de la privacidad de datos y de los Hooks de React."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite encapsulamiento (variables privadas) y fábricas de funciones. Sin closures, `useState` no podría recordar el estado entre renders."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para memoización, funciones que generan otras funciones (Factories), o mantener estado privado."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Stale Closures (Closures Rancios)",
            content: "En React, un closure puede capturar una versión vieja de una variable si no actualizas el array de dependencias en `useEffect` o `useCallback`.",
            code: "useEffect(() => {\n  console.log(count); // Siempre 0 si []\n}, []); // Faltó [count]"
          }
        ],
        syntaxDescription: "Un closure es como una mochila. Cuando una función nace, puede guardar variables de fuera en su mochila. Incluso si la función padre se muere, la función hija sigue teniendo acceso a esas variables porque las guardó en su mochila.",
        description: "Funciones que recuerdan su entorno léxico.",
        code: `function crearCuentaBancaria(saldoInicial) {
  let saldo = saldoInicial; // Privado gracias al closure

  return {
    depositar: (monto) => { saldo += monto; },
    retirar: (monto) => {
      if (saldo >= monto) saldo -= monto;
    },
    verSaldo: () => saldo
  };
}

const miCuenta = crearCuentaBancaria(100);
miCuenta.depositar(50);
console.log(miCuenta.verSaldo()); // 150
console.log(miCuenta.saldo); // undefined (Privado)`,
        useCases: [
          {
            title: "Memoización",
            description: "Usar closures para cachear resultados de funciones costosas.",
            code: `const memoizar = (fn) => {
  const cache = {}; // Persiste entre llamadas
  return (arg) => {
    if (cache[arg]) return cache[arg];
    const resultado = fn(arg);
    cache[arg] = resultado;
    return resultado;
  };
};

const fib = memoizar(n => (n <= 1 ? n : fib(n-1) + fib(n-2)));`
          },
          {
            title: "Configuración Parcial (Factory)",
            description: "Generar funciones especializadas preconfiguradas.",
            code: `const logger = (prefijo) => (msg) => {
  console.log(\`[\${prefijo}] \${msg}\`);
};

const logError = logger('ERROR');
const logInfo = logger('INFO');

logError('Base de datos caída'); // [ERROR] Base de datos caída`
          }
        ]
      },
      {
        id: "iife",
        title: "IIFE",
        content: [
          {
            title: "¿Qué es?",
            text: "Inmediately Invoked Function Expression. Una función que se define y se ejecuta inmediatamente: `(() => { ... })()`."
          },
          {
            title: "¿Por qué es importante?",
            text: "Históricamente se usaba para crear scope privado y evitar globales. Hoy se usa principalmente para ejecutar código `async/await` en scripts de nivel superior que no soportan Top-Level Await."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Al inicializar lógica compleja una sola vez o usar `await` en archivos antiguos."
          }
        ],
        tips: [
          {
            type: "recommendation",
            title: "Módulos vs IIFE",
            content: "Si usas módulos ES6 (`import/export`), ya tienes scope de archivo automáticamente. No necesitas IIFEs para privacidad."
          }
        ],
        syntaxDescription: "Es una función tímida: nace, hace su trabajo inmediatamente y muere al instante. Nadie más puede llamarla después. Se usa para no dejar basura (variables globales) tirada por ahí.",
        description: "Expresiones de función invocadas inmediatamente.",
        code: `// Sintaxis clásica
(function() {
  const secreto = "X";
  console.log("Inicializando...");
})();

// Arrow IIFE (más moderno)
(() => {
  console.log("Arrow IIFE");
})();

// Async IIFE (patrón común)
(async () => {
  await db.conectar();
})();`,
        useCases: [
          {
            title: "Inicialización Compleja de Constantes",
            description: "Asignar un valor a una constante que requiere lógica condicional o bucles.",
            code: `const tema = (() => {
  const guardado = localStorage.getItem('theme');
  if (guardado) return guardado;
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
})();`
          },
          {
            title: "Async en Scripts",
            description: "Usar await en un archivo .js estándar que no es un módulo.",
            code: `// main.js
;(async () => {
  try {
    const datos = await fetch('/api/data');
  } catch (e) {
    console.error(e);
  }
})();`
          }
        ]
      },
      {
        id: "strict-mode",
        title: "Strict Mode",
        content: [
          {
            title: "¿Qué es?",
            text: "Modo riguroso (`'use strict'`) que prohíbe sintaxis inseguras, evita globales accidentales y convierte errores silenciosos en excepciones reales."
          },
          {
            title: "¿Por qué es importante?",
            text: "Hace el código más seguro y optimizable. Por ejemplo, asignar a una propiedad de solo lectura lanza error en vez de fallar en silencio."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre. Si usas Módulos ES6 o Clases, está activado por defecto. Si escribes scripts sueltos, ponlo arriba."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Automático en Módulos",
            content: "No necesitas escribir `'use strict'` si estás en un proyecto moderno con bundlers (Vite, Webpack) o usas `<script type='module'>`."
          }
        ],
        syntaxDescription: "Es como ponerle rueditas de entrenamiento a tu bici. No te deja hacer locuras como usar variables sin declarar, para que no te caigas (errores graves).",
        description: "Modo estricto para un código más seguro.",
        code: `'use strict';

// 1. Error al asignar a variable no declarada
// x = 3.14; // ReferenceError

// 2. Error al escribir en propiedad solo lectura
const obj = {};
Object.defineProperty(obj, "x", { value: 0, writable: false });
// obj.x = 9; // TypeError

// 3. 'this' es undefined en funciones sueltas
function prueba() { return this; }
// console.log(prueba()); // undefined`,
        useCases: [
          {
            title: "Prevención de Globales Accidentales",
            description: "El error más común de los principiantes (olvidar let/const) es atrapado inmediatamente.",
            code: `function calcular() {
  'use strict';
  total = 100; // ReferenceError!
  // Sin strict, 'total' sería window.total
  return total; 
}`
          },
          {
            title: "Seguridad en Objetos",
            description: "Asegura que Object.freeze funcione realmente lanzando error si intentas modificar.",
            code: `'use strict';
const config = Object.freeze({ api: 'v1' });

// Lanza TypeError en lugar de fallar silenciosamente
config.api = 'v2';`
          }
        ]
      },
      {
        id: "callbacks",
        title: "Callbacks",
        content: [
          {
            title: "¿Qué es?",
            text: "Función pasada como argumento a otra función para ser ejecutada después. Es la base de los eventos y la asincronía clásica."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite reaccionar a cosas (clicks, timers, respuestas de servidor). Un concepto fundamental, aunque para asincronía secuencial ha sido superado por Promesas."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "En `Array.map`, `addEventListener`, o `setTimeout`. Para flujos asíncronos complejos, mejor usa Async/Await."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Callback Hell",
            content: "Anidar múltiples callbacks hace el código ilegible (Pirámide de la Muerte). Si ves más de 3 niveles de indentación, refactoriza a Promesas o Async/Await."
          }
        ],
        syntaxDescription: "Un callback es como decirle a tu amigo: 'Cuando llegues a casa (evento), llámame (ejecuta función)'. Tú no esperas en el teléfono; sigues con tu vida hasta que él llama.",
        description: "Funciones pasadas como argumentos.",
        code: `// Uso básico síncrono
function procesarUsuario(nombre, callback) {
  console.log('Procesando ' + nombre);
  callback();
}

// Uso asíncrono (Lectura de archivo estilo Node.js)
fs.readFile('/archivo.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});`,
        useCases: [
          {
            title: "Callback Hell (El Problema)",
            description: "Ejemplo visual de por qué necesitamos Promesas. Anidación inmanejable.",
            code: `getData(function(a) {
  getMoreData(a, function(b) {
    getMoreMoreData(b, function(c) {
      getMoreMoreMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});`
          },
          {
            title: "Manejo de Eventos",
            description: "El caso de uso más común y correcto para callbacks hoy en día.",
            code: `const btn = document.querySelector('button');

// Callback que se ejecuta en cada click
btn.addEventListener('click', (e) => {
  console.log('Click en coordenadas', e.clientX, e.clientY);
});`
          }
        ]
      },
      {
        id: "higher-order",
        title: "Higher-Order Functions",
        content: [
          {
            title: "¿Qué es?",
            text: "Una función que recibe otra función como argumento (ej. `map`) o devuelve una función nueva."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es la esencia de la programación funcional. Permite abstraer patrones repetitivos, como 'recorrer una lista' o 'manejar errores', separando el 'qué' pasará del 'cómo' pasa."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para manipular colecciones (`map`, `filter`, `reduce`) o crear utilidades reutilizables (Decoradores)."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "React HOCs",
            content: "Los 'Higher-Order Components' en React son literalmente funciones de orden superior que toman un componente y devuelven otro mejorado."
          }
        ],
        syntaxDescription: "Es una función 'jefa'. No hace el trabajo sucio; contrata a otras funciones (argumentos) para que lo hagan, o fabrica nuevos empleados (retorna funciones).",
        description: "Funciones que reciben o retornan funciones.",
        code: `// 1. Recibe función (Array methods)
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);

// 2. Retorna función
function crearMultiplicador(factor) {
  return function(numero) {
    return numero * factor;
  };
}
const duplicar = crearMultiplicador(2);
console.log(duplicar(5)); // 10`,
        useCases: [
          {
            title: "Abstracción de Lógica Repetitiva",
            description: "Crear una función genérica que maneja el 'try-catch' por nosotros.",
            code: `const safeExecute = (fn) => {
  try {
    fn();
  } catch (e) {
    console.error("Error capturado:", e.message);
  }
};

safeExecute(() => riskyOperation());`
          },
          {
            title: "Filter y Reduce",
            description: "El poder declarativo de las HOFs para procesar datos.",
            code: `const usuarios = [
  { nombre: 'A', edad: 20 },
  { nombre: 'B', edad: 15 }
];

const mayores = usuarios
  .filter(u => u.edad >= 18) // HOF
  .map(u => u.nombre);       // HOF
  
// Resultado: ['A']`
          }
        ]
      },
      {
        id: "currying",
        title: "Currying",
        content: [
          {
            title: "¿Qué es?",
            text: "Técnica de transformar una función de múltiples argumentos `f(a, b, c)` en una secuencia de funciones unarias `f(a)(b)(c)`."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite la 'Aplicación Parcial': configurar una función con algunos parámetros fijos para reutilizarla después. Muy útil para crear manejadores de eventos dinámicos."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Cuando tienes una función genérica que quieres especializar paso a paso."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Currying en Event Handlers",
            content: "En React: `onClick={handleClick('id')}` donde `handleClick = (id) => (e) => ...`. Evita crear funciones anónimas en cada render."
          }
        ],
        syntaxDescription: "Es como servir una comida de tres platos. En vez de darte todo de golpe `f(a,b,c)`, te da primero la sopa `f(a)`, luego esperas, luego el plato fuerte `(b)`, y al final el postre `(c)`. No comes hasta que tienes todo.",
        description: "Técnica de transformar funciones.",
        code: `// Normal
const suma = (a, b) => a + b;

// Curried
const sumaCurried = (a) => (b) => a + b;

const suma10 = sumaCurried(10); // Aplicación parcial
console.log(suma10(5)); // 15
console.log(suma10(20)); // 30`,
        useCases: [
          {
            title: "Manejadores de Eventos Parametrizados",
            description: "Crear handlers para React o DOM sin funciones anónimas inline.",
            code: `const handleChange = (campo) => (evento) => {
  setState({ [campo]: evento.target.value });
};

// En el input
// <input onChange={handleChange('email')} />
// <input onChange={handleChange('password')} />`
          },
          {
            title: "Filtrado Dinámico",
            description: "Crear filtros reutilizables.",
            code: `const tienePropiedad = (prop) => (obj) => obj.hasOwnProperty(prop);

const usuarios = [{id:1}, {name:'B'}, {id:2}];
const conId = usuarios.filter(tienePropiedad('id'));
// Resultado: [{id:1}, {id:2}]`
          }
        ]
      },
      {
        id: "composition",
        title: "Composición de Funciones",
        content: [
          {
            title: "¿Qué es?",
            text: "Combinar funciones simples para crear flujos complejos. `h(x) = f(g(x))`."
          },
          {
            title: "¿Por qué es importante?",
            text: "Fomenta la creación de funciones pequeñas y puras que hacen u na sola cosa bien, y luego se ensamblan como legos. Hace el flujo de datos explícito."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "En procesamiento de datos (pipelines) o middlewares de backend."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Pipe vs Compose",
            content: "`Compose` ejecuta de derecha a izquierda (matemático). `Pipe` ejecuta de izquierda a derecha (lectura natural). Prefiere `Pipe` para logica de negocio."
          }
        ],
        syntaxDescription: "Es como conectar tuberías de Mario Bros. La salida de una tubería (función) se conecta directamente a la entrada de la siguiente. El agua (datos) fluye a través de todas ellas transformándose por el camino.",
        description: "Combinación de funciones.",
        code: `// Funciones simples
const gritar = (str) => str.toUpperCase();
const enfatizar = (str) => str + "!!!";
const saludar = (str) => "HOLA " + str;

// Composición manual (difícil de leer de adentro hacia afuera)
const resultado = enfatizar(gritar(saludar("mundo")));
// "HOLA MUNDO!!!"

// Con utilidad 'compose' (Derecha a Izquierda)
const componer = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const gritoSaludo = componer(enfatizar, gritar, saludar);
gritoSaludo("mundo"); // "HOLA MUNDO!!!"`,
        useCases: [
          {
            title: "Pipe (Izquierda a Derecha)",
            description: "Procesamiento de datos en tubería, más intuitivo de leer.",
            code: `const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const limpiarNombre = pipe(
  (s) => s.trim(),
  (s) => s.toLowerCase(),
  (s) => s.replace(/[^a-z]/g, '') // Solo letras
);

console.log(limpiarNombre("  Juan-Perez! ")); // "juanperez"`
          },
          {
            title: "Middleware en Backend",
            description: "Concepto similar en Express/Koa: composición de funciones asíncronas.",
            code: `// app.use(auth);
// app.use(jsonParser);
// app.use(logger);
// Las requests pasan por esta cadena compuesta.`
          }
        ]
      }
    ]
  },
  {
    title: "3. Data Structures",
    topics: [
      {
        id: "arrays",
        title: "Arrays",
        content: [
          {
            title: "¿Qué es?",
            text: "Listas ordenadas de datos. En JS son dinámicos y pueden contener cualquier tipo. Son la estructura más versátil."
          },
          {
            title: "¿Por qué es importante?",
            text: "Casi todo en frontend es una lista de algo (usuarios, productos). Dominar sus métodos es obligatorio."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre que necesites orden o iteración secuencial. Evítalos si necesitas búsquedas frecuentes por ID (usa Map u Objeto)."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Inmutabilidad",
            content: "En React, evita métodos que mutan (`push`, `pop`, `splice`, `sort`). Usa sus contrapartes inmutables (`map`, `filter`, `slice`, `toSorted`).",
            code: "// Mal (Muta)\narr.push(4);\n\n// Bien (Crea nuevo)\nconst next = [...arr, 4];"
          }
        ],
        syntaxDescription: "Una lista ordenada, como la lista de la compra. Tienen un orden numérico (0, 1, 2...). Puedes meter lo que quieras dentro, mezclando peras con manzanas (strings con números).",
        description: "Manejo básico de arreglos y rendimiento.",
        code: `const arr = [1, 2, 3];

// Mutación (Cuidado en React)
arr.push(4); 
arr.reverse(); 

// Inmutabilidad (Seguro)
const nuevoArr = [...arr, 5];
const ordenado = arr.toSorted(); // ES2023`,
        useCases: [
          {
            title: "Cola (Queue) y Pila (Stack)",
            description: "Usar arrays como estructuras de datos lineales.",
            code: `const pila = [];
pila.push(1); // Entra
pila.pop();   // Sale el último (LIFO)

const cola = [];
cola.push(1); // Entra
cola.shift(); // Sale el primero (FIFO)`
          },
          {
            title: "Clonación y Fusión",
            description: "Crear copias superficiales para evitar mutaciones.",
            code: `const original = [1, 2];
const copia = [...original]; // Clon
const estricto = structuredClone(original); // Clon profundo

const fusion = [...original, ...copia];`
          }
        ]
      },
      {
        id: "array-methods",
        title: "Métodos de Array Avanzados",
        content: [
          {
            title: "¿Qué es?",
            text: "Métodos declarativos (`map`, `filter`, `reduce`) para operar sobre colecciones sin bucles manuales."
          },
          {
            title: "¿Por qué es importante?",
            text: "Hacen el código más predecible y componible. `flatMap` es vital para aplanar estructuras anidadas en una sola pasada."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Casi siempre. Usa `find` para buscar, `some` para verificar existencia, y `reduce` para transformaciones complejas."
          }
        ],
        tips: [
          {
            type: "recommendation",
            title: "Evita break",
            content: "En lugar de `for` con `break`, usa `find` o `some`, que se detienen automáticamente al encontrar la coincidencia.",
            code: "// Verboso\nfor (const u of users) { if (u.id === 1) return u; }\n\n// Conciso\nconst user = users.find(u => u.id === 1);"
          }
        ],
        syntaxDescription: "Son las herramientas de la navaja suiza para tratar listas. `map` transforma cada cosa, `filter` quita lo que no sirve, `find` busca una aguja en el pajar. Son mejores que los bucles manuales porque se leen como frases.",
        description: "Map, filter, reduce, flatMap y búsqueda.",
        code: `const usuarios = [
  { id: 1, tags: ['js', 'web'] },
  { id: 2, tags: ['css'] }
];

// Obtener todos los tags en un solo array plano
const todosTags = usuarios.flatMap(u => u.tags);
// ['js', 'web', 'css']

// Agrupar por condición (Reduce avanzado)
const porTecnologia = usuarios.reduce((acc, u) => {
  u.tags.forEach(tag => {
    acc[tag] = (acc[tag] || []).concat(u.id);
  });
  return acc;
}, {});`,
        useCases: [
          {
            title: "Encadenamiento Declarativo",
            description: "Pipeline de transformación de datos legible.",
            code: `const procesados = datos
  .filter(d => d.activo)
  .map(d => ({ ...d, total: d.precio * d.cantidad }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 5); // Top 5`
          },
          {
            title: "Aplanamiento de Arrays",
            description: "Limpiar datos anidados de APIs.",
            code: `const matriz = [[1, 2], [3, 4], [[5]]];
console.log(matriz.flat(2)); // [1, 2, 3, 4, 5]`
          }
        ]
      },
      {
        id: "objects",
        title: "Objetos",
        content: [
          {
            title: "¿Qué es?",
            text: "Colección de pares clave-valor (diccionario). Las claves son strings o symbols."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es la forma principal de agrupar datos relacionados. JSON es básicamente la representación textual de objetos JS."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para entidades (usuario, producto) o como mapa de búsqueda rápido (cuando la clave es string)."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Propiedad Computada",
            content: "Puedes usar variables como claves: `const key = 'edad'; const obj = { [key]: 25 };`. Fundamental para inputs dinámicos en React.",
            code: "const handleChange = (e) => {\n  setForm({ [e.target.name]: e.target.value });\n};"
          },
          {
            type: "goodPractice",
            title: "Keys, Values, Entries",
            content: "Para iterar un objeto, usa `Object.keys(obj)`, `Object.values(obj)` o `Object.entries(obj)` junto con `.map()` o `for...of`.",
            code: "Object.entries(user).map(([key, val]) => (\n  <div key={key}>{key}: {val}</div>\n));"
          }
        ],
        syntaxDescription: "Son como mochilas con bolsillos etiquetados. En el bolsillo 'nombre' guardas 'Juan', en 'edad' guardas 25. No tienen orden, solo etiquetas (claves) para encontrar las cosas rápido.",
        description: "Estructura y manipulación de objetos.",
        code: `const claveDinamica = 'estado_' + Date.now();
const usuario = {
  nombre: 'Juan',
  [claveDinamica]: 'activo', // Propiedad computada
  saludar() { return 'Hola'; } // Método shorthand
};

// Iteración moderna
for (const [key, val] of Object.entries(usuario)) {
  console.log(\`\${key}: \${val}\`);
}`,
        useCases: [
          {
            title: "Object Freeze vs Seal",
            description: "Controlar la inmutabilidad de objetos.",
            code: `const config = { api: 'v1' };

Object.seal(config); 
// Puedes modificar existentes: config.api = 'v2' (OK)
// No puedes agregar/borrar: config.timeout = 5000 (Error)

Object.freeze(config);
// Inmutabilidad total (superficial). Nada cambia.`
          },
          {
            title: "Conversión a Array para Transformación",
            description: "La técnica estándar para aplicar map/filter a objetos.",
            code: `const inventario = { manzanas: 10, peras: 0 };

const stock = Object.entries(inventario)
  .filter(([_, cant]) => cant > 0)
  .map(([fruta]) => fruta);
// ['manzanas']`
          }
        ]
      },
      {
        id: "destructuring",
        title: "Destructuring",
        content: [
          {
            title: "¿Qué es?",
            text: "Sintaxis para extraer valores de arrays u objetos y asignarlos a variables en una sola línea."
          },
          {
            title: "¿Por qué es importante?",
            text: "Reduce el ruido visual (`user.address.street` -> `street`). Permite renombrar variables y asignar valores por defecto al vuelo."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Al recibir props en componentes React, al importar módulos, o al procesar respuestas de APIs."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Renombrado y Default",
            content: "`const { data: users = [] } = response;`. Extrae `data`, lo renombra a `users`, y si es undefined le asigna `[]`.",
            code: "const { isActive: enabled = false } = config;"
          }
        ],
        syntaxDescription: "Es como sacar cosas de una caja de mudanza y ponerlas directo en la estantería. En lugar de sacar `caja.libros`, `caja.ropa`, haces `const { libros, ropa } = caja` y listo.",
        description: "Extracción elegante de datos.",
        code: `const data = { 
  id: 1, 
  meta: { pag: 1, total: 100 } 
};

// Extracción anidada + Renonmbrado
const { 
  meta: { total: totalItems }, // Renombra total -> totalItems
  id 
} = data;

// Swap de variables
let x = 1, y = 2;
[x, y] = [y, x];`,
        useCases: [
          {
            title: "Parámetros de Función Nombrados",
            description: "Simular argumentos nombrados (casi como Python) usando desestructuración en la firma.",
            code: `function dibujarRect({ x = 0, y = 0, w = 100, h = 100 } = {}) {
  // x e y tienen defaults, y el objeto entero también
  console.log(x, y, w, h);
}

dibujarRect({ w: 50 }); // 0, 0, 50, 100`
          },
          {
            title: "Manejo de Retornos Múltiples",
            description: "Devolver array u objeto para retornar múltiples valores.",
            code: `function useCoordenadas() {
  return [10, 20];
}

const [lat, lon] = useCoordenadas();`
          }
        ]
      },
      {
        id: "spread-rest",
        title: "Spread/Rest Operator",
        content: [
          {
            title: "¿Qué es?",
            text: "El operador `...`. Como **Spread** (derecha del `=`) expande un iterable. Como **Rest** (izquierda del `=`) agrupa elementos restantes."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es la forma estándar de clonar y fusionar objetos/arrays de forma inmutable. `...props` pasa todas las propiedades a un componente hijo."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para copiar estados en Redux/React (`{...state, newProp: 1}`), o recibir n argumentos en una función (`function logs(...msgs)`)."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Copia Superficial (Shallow Copy)",
            content: "`const copy = { ...original }` solo copia el primer nivel. Los objetos anidados siguen compartiendo referencia. Para copia profunda usa `structuredClone()`.",
            code: "const a = { x: { y: 1 } };\nconst b = { ...a };\nb.x.y = 2;\nconsole.log(a.x.y); // 2 (Referencia compartida!)"
          }
        ],
        syntaxDescription: "Los tres puntos `...` son mágicos. Si están a la derecha (`= ...arr`), esparcen el contenido como cartas sobre la mesa (Spread). Si están a la izquierda (`...resto =`), recogen todas las cartas sobrantes en un montón (Rest).",
        description: "Expansión y agrupación de datos.",
        code: `// Spread: Fusión
const base = { a: 1 };
const override = { a: 2, b: 3 };
const final = { ...base, ...override }; // { a: 2, b: 3 }

// Rest: Recolección
const [primero, ...otros] = [10, 20, 30, 40];
// primero: 10, otros: [20, 30, 40]`,
        useCases: [
          {
            title: "Eliminar Propiedad (Omit)",
            description: "Patrón inmutable para borrar una clave.",
            code: `const usuario = { password: '123', nombre: 'Ana', id: 1 };

// Extraemos 'password' y guardamos el resto en 'publico'
const { password, ...publico } = usuario;

console.log(publico); // { nombre: 'Ana', id: 1 }`
          },
          {
            title: "Argumentos Indefinidos",
            description: "Pasar props o argumentos hacia abajo.",
            code: `function debug(...args) {
  console.log('[DEBUG]', ...args); // Pasa todos al log
  // Math.max(...args) si son números
}`
          }
        ]
      },
      {
        id: "map",
        title: "Map",
        content: [
          {
            title: "¿Qué es?",
            text: "Colección de pares clave-valor que recuerda el orden de inserción. Admite CUALQUIER tipo de dato como clave (objetos, funciones), no solo strings."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es más performante que los Objetos para inserciones/borrados frecuentes. Tiene `.size` directo y es iterable por defecto."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Cuando necesitas claves que no son strings, o cuando el orden de inserción importa."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Objetos como claves",
            content: "Map permite asociar metadatos a objetos sin modificarlos: `metadata.set(domNode, { clicked: true })`.",
            code: "const meta = new Map();\nmeta.set(userObject, { lastLogin: Date.now() });"
          }
        ],
        syntaxDescription: "Es un Super-Objeto. Mientras que los objetos normales solo aceptan etiquetas de texto, el Map acepta lo que sea como etiqueta (incluso otro objeto). Además, recuerda en qué orden guardaste las cosas.",
        description: "Diccionario con claves de cualquier tipo.",
        code: `const mapa = new Map();
const keyObj = { id: 1 };

mapa.set(keyObj, "Metadatos del objeto");
mapa.set("string", "Valor texto");

console.log(mapa.get(keyObj)); // "Metadatos del objeto"
console.log(mapa.has("string")); // true
console.log(mapa.size); // 2`,
        useCases: [
          {
            title: "Cacheo con Objetos como Clave",
            description: "Asociar metadatos a objetos DOM o instancias sin ensuciarlos.",
            code: `const clicksCount = new Map();
const btn = document.querySelector('button');

clicksCount.set(btn, 0);

// Incrementamos
const actual = clicksCount.get(btn);
clicksCount.set(btn, actual + 1);`
          },
          {
            title: "Diccionario Ordenado",
            description: "Cuando la secuencia de configuración importa.",
            code: `const pipeline = new Map([
  ['validar', val => val > 0],
  ['formatear', val => \`$ \${val}\`],
  ['imprimir', val => console.log(val)]
]);

for (const [paso, fn] of pipeline) {
  // Ejecutar en orden garantizado
}`
          }
        ]
      },
      {
        id: "set",
        title: "Set",
        content: [
          {
            title: "¿Qué es?",
            text: "Colección de valores ÚNICOS. No permite duplicados."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es la forma más eficiente de eliminar duplicados de un array. La búsqueda `.has(val)` es O(1), mucho más rápida que `array.includes(val)` O(N)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para deduplicación o chequear membresía (si un elemento existe) en listas grandes."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Eliminar duplicados",
            content: "El one-liner clásico: `const unicos = [...new Set(arrayConDuplicados)];`.",
            code: "const nums = [1, 1, 2, 3];\nconst unicos = [...new Set(nums)]; // [1, 2, 3]"
          }
        ],
        syntaxDescription: "Es como un club VIP donde no dejan entrar a nadie repetido. Si intentas meter al mismo '5' dos veces, el portero le dice que ya está dentro.",
        description: "Colección de valores únicos.",
        code: `const unicos = new Set([1, 2, 2, 3]);
console.log(unicos); // Set(3) { 1, 2, 3 }

unicos.add(4);
unicos.delete(1);
console.log(unicos.has(2)); // true`,
        useCases: [
          {
            title: "Eliminar Duplicados de Array",
            description: "El one-liner más famoso de JavaScript moderno.",
            code: `const numeros = [1, 2, 3, 2, 1, 4];
const sinRepetir = [...new Set(numeros)];
// [1, 2, 3, 4]`
          },
          {
            title: "Operaciones de Conjuntos",
            description: "Intersección y Diferencia (usando nuevos métodos o manual).",
            code: `const A = new Set([1, 2, 3]);
const B = new Set([2, 3, 4]);

// Intersección (lo común)
const comun = [...A].filter(x => B.has(x)); // [2, 3]`
          }
        ]
      },
      {
        id: "weakmap-weakset",
        title: "WeakMap y WeakSet",
        content: [
          {
            title: "¿Qué es?",
            text: "Variantes de Map y Set que mantienen referencias 'débiles' a sus claves/valores. Si no hay otra referencia al objeto, el Garbage Collector lo borra."
          },
          {
            title: "¿Por qué es importante?",
            text: "Evitan fugas de memoria (Memory Leaks). No son iterables ni tienen `.size`."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para asociar datos privados a objetos de terceros o trackear nodos del DOM sin impedir que se limpien de memoria."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Datos Privados",
            content: "Antes de `#privateFields`, `WeakMap` era la forma de tener propiedades verdaderamente privadas en clases.",
            code: "const privateData = new WeakMap();\nclass User {\n  constructor(name) {\n    privateData.set(this, { name });\n  }\n}"
          }
        ],
        syntaxDescription: "Son mapas y sets con amnesia. Si nadie más recuerda la llave (el objeto), ellos la olvidan automáticamente para liberar espacio en el cerebro (memoria) del ordenador.",
        description: "Colecciones con referencias débiles al GC.",
        code: `let usuario = { name: "Juan" };
const metadatos = new WeakMap();

metadatos.set(usuario, { sesiones: 5 });

// Si hacemos usuario = null, el objeto { name: "Juan" } puede ser
// recolectado por el GC. La entrada en 'metadatos' desaparece sola.`,
        useCases: [
          {
            title: "Datos Privados en Clases (Pre-ES2022)",
            description: "El patrón clásico para privacidad real antes de los campos privados `#`.",
            code: `const privados = new WeakMap();

class Persona {
  constructor(nombre) {
    privados.set(this, { nombre });
  }

  getNombre() {
    return privados.get(this).nombre;
  }
}`
          },
          {
            title: "Tracking de Nodos DOM",
            description: "Guardar estado de elementos que pueden ser eliminados del DOM.",
            code: `const visitados = new WeakSet();

function procesar(nodo) {
  if (visitados.has(nodo)) return;
  
  // Hacer algo...
  visitados.add(nodo);
  // Si 'nodo' se borra del DOM, el WeakSet no lo retiene.
}`
          }
        ]
      }
    ]
  },
  {
    title: "4. OOP & Prototypes",
    topics: [
      {
        id: "classes",
        title: "Clases",
        content: [
          {
            title: "¿Qué es?",
            text: "Plantillas para crear objetos. En JS son 'azúcar sintáctico' sobre los prototipos. Soportan herencia (`extends`) y constructores."
          },
          {
            title: "¿Por qué es importante?",
            text: "Aunque React prefiere componentes funcionales, las clases son vitales para entender código legacy y para modelar estructuras de datos complejas."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para lógica de negocio compleja que requiere mantener estado y comportamiento encapsulado, o al crear librerías."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Clases vs Hooks",
            content: "En React moderno, no uses clases para componentes. Los Hooks cubren todos los casos de uso (`useEffect` reemplazó a `componentDidMount`).",
            code: "// Antes (Clase)\ncomponentDidMount() { ... }\n\n// Ahora (Hook)\nuseEffect(() => { ... }, []);"
          }
        ],
        syntaxDescription: "Una clase es un molde de galletas. Define la forma (propiedades) y el sabor (métodos). Con `new Galleta()`, usas el molde para crear tantas galletas reales (instancias) como quieras.",
        description: "Definición de clases y herencia en ES6.",
        code: `class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  hablar() {
    console.log(\`\${this.nombre} hace un sonido.\`);
  }
}

class Perro extends Animal {
  constructor(nombre, raza) {
    super(nombre); // Llama al constructor del padre
    this.raza = raza;
  }

  hablar() {
    super.hablar(); // Llama método del padre
    console.log("¡Guau!");
  }
}`,
        useCases: [
          {
            title: "Modelado de Entidades de Negocio",
            description: "Encapsular lógica de dominio compleja en una sola unidad.",
            code: `class Carrito {
  constructor() {
    this.items = [];
  }

  agregar(producto) {
    this.items.push(producto);
  }

  calcularTotal() {
    return this.items.reduce((acc, p) => acc + p.precio, 0);
  }
}`
          },
          {
            title: "Errores Personalizados",
            description: "Extender la clase Error nativa para manejo de excepciones tipadas.",
            code: `class DatabaseError extends Error {
  constructor(msg, codigo) {
    super(msg);
    this.name = 'DatabaseError';
    this.codigo = codigo;
  }
}

// throw new DatabaseError('Fallo conexión', 500);`
          }
        ]
      },
      {
        id: "this",
        title: "This",
        content: [
          {
            title: "¿Qué es?",
            text: "Palabra clave que referencia al contexto de ejecución. Su valor depende de CÓMO se llama a la función, no de dónde se define."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es fuente de muchos bugs. Entender que `this` puede perderse en callbacks es crucial."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Dentro de métodos de clases. Evítalo en funciones sueltas si puedes."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Arrow Functions",
            content: "Las Arrow Functions no tienen su propio `this`; heredan el del padre. Son la solución perfecta para callbacks que necesitan acceder a la instancia.",
            code: "class Counter {\n  count = 0;\n  // Arrow preserva 'this'\n  inc = () => this.count++; \n}"
          },
          {
            type: "error",
            title: "Pérdida de Contexto",
            content: "Pasar `obj.metodo` como callback (`onClick={obj.metodo}`) rompe `this`. Usa `onClick={() => obj.metodo()}` o `.bind`.",
            code: "<button onClick={user.save}> // this es undefined\n<button onClick={() => user.save()}> // OK"
          }
        ],
        syntaxDescription: "`this` es como la palabra 'yo'. Depende de quién la diga. Si la dice Juan, 'yo' es Juan. Si la dice Ana, 'yo' es Ana. En JS, `this` depende de quién llamó a la función.",
        description: "Contexto de ejecución y binding.",
        code: `const objeto = {
  valor: 42,
  imprimir() {
    console.log(this.valor);
  }
};

const fn = objeto.imprimir;
fn(); // undefined (perdió el contexto)

const fnSegura = objeto.imprimir.bind(objeto);
fnSegura(); // 42

// Arrow function preserva contexto
const obj2 = {
  valor: 10,
  delayed: function() {
    setTimeout(() => {
      console.log(this.valor); // 10 (Funciona)
    }, 100);
  }
};`,
        useCases: [
          {
            title: "Borrowing Methods (Préstamo de Métodos)",
            description: "Usar un método de un objeto en otro objeto compatible.",
            code: `const argumentos = { 0: 'a', 1: 'b', length: 2 };
// Los objetos no tienen 'map', pero podemos tomarlo prestado de Array
const arrayReal = Array.prototype.slice.call(argumentos);
// ['a', 'b']`
          },
          {
            title: "Encadenamiento (Method Chaining)",
            description: "Retornar 'this' al final de cada método para permitir llamadas fluidas.",
            code: `class QueryBuilder {
  select(campos) { this.campos = campos; return this; }
  where(cond) { this.cond = cond; return this; }
  run() { console.log('Ejecutando...'); }
}

new QueryBuilder().select('*').where('id=1').run();`
          }
        ]
      },
      {
        id: "getters-setters",
        title: "Getters y Setters",
        content: [
          {
            title: "¿Qué es?",
            text: "Métodos que se camuflan como propiedades. `get prop()` se ejecuta al leer, `set prop(val)` al asignar."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permiten validación y encapsulamiento sin cambiar la API pública (`obj.prop` sigue funcionando igual)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para validar asignaciones (`set edad(v) { if(v<0) throw... }`) o calcular valores derivados (`get nombreCompleto`)."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Computed Props en Clases",
            content: "Es común usar getters en clases de React (aunque no componentes) para derivar estado sin guardarlo."
          }
        ],
        syntaxDescription: "Son espías disfrazados de propiedades normales. Cuando lees `obj.prop`, en realidad se ejecuta una función secreta (`get`). Cuando asignas `obj.prop = 5`, se ejecuta otra (`set`).",
        description: "Propiedades de acceso en objetos.",
        code: `const usuario = {
  nombre: 'Ana',
  apellido: 'Perez',
  
  // Getter (Lectura)
  get nombreCompleto() {
    return \`\${this.nombre} \${this.apellido}\`;
  },
  
  // Setter (Escritura)
  set nombreCompleto(valor) {
    [this.nombre, this.apellido] = valor.split(' ');
  }
};

console.log(usuario.nombreCompleto); // "Ana Perez"
usuario.nombreCompleto = "Juan Lopez"; // Ejecuta el setter`,
        useCases: [
          {
            title: "Validación de Datos",
            description: "Evitar estados inválidos protegiendo la asignación.",
            code: `const producto = {
  _precio: 0,
  set precio(v) {
    if (v < 0) throw new Error("Precio no puede ser negativo");
    this._precio = v;
  },
  get precio() { return this._precio; }
};`
          },
          {
            title: "Propiedades Computadas (Derivadas)",
            description: "Calcular valores al vuelo en lugar de almacenarlos.",
            code: `class Circulo {
  constructor(radio) { this.radio = radio; }
  get area() { return Math.PI * this.radio ** 2; }
}`
          }
        ]
      },
      {
        id: "property-descriptors",
        title: "Property Descriptors",
        content: [
          {
            title: "¿Qué es?",
            text: "Atributos internos de una propiedad: `writable` (modificable), `enumerable` (visible en loops), `configurable` (borrable)."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite crear propiedades de solo lectura o esconder propiedades internas de `JSON.stringify`."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Al crear librerías o definir constantes dentro de objetos (`Object.defineProperty`)."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Ocultar Secretos",
            content: "Si estableces `enumerable: false`, la propiedad no aparecerá en `Object.keys()` ni en `JSON.stringify()`. Útil para metadatos internos."
          }
        ],
        syntaxDescription: "Son las reglas del juego de una propiedad. Puedes decir: 'esta propiedad es de solo lectura', 'esta es invisible', o 'esta no se puede borrar'.",
        description: "Control detallado de propiedades.",
        code: `const obj = {};

Object.defineProperty(obj, 'secreto', {
  value: 42,
  writable: false,     // No se puede cambiar
  enumerable: false,   // No sale en Object.keys()
  configurable: false  // No se puede borrar ni redefinir
});

obj.secreto = 100; // Falla (silencioso o error en strict)
console.log(Object.keys(obj)); // []`,
        useCases: [
          {
            title: "Constantes en Objetos",
            description: "Crear propiedades inmutables sin congelar todo el objeto.",
            code: `Object.defineProperty(app, 'VERSION', {
  value: '1.0.0',
  writable: false
});`
          },
          {
            title: "Propiedades Ocultas a Iteración",
            description: "Agregar metadatos que no deben serializarse a JSON.",
            code: `Object.defineProperty(data, 'hiddenMeta', {
  value: { loaded: true },
  enumerable: false 
});
// JSON.stringify(data) ignorará 'hiddenMeta'`
          }
        ]
      },
      {
        id: "prototype",
        title: "Prototype",
        content: [
          {
            title: "¿Qué es?",
            text: "El mecanismo de herencia de JS. Los objetos heredan de otros objetos. `Class` es solo una capa encima de esto."
          },
          {
            title: "¿Por qué es importante?",
            text: "Entender la 'Cadena de Prototipos' explica por qué `array.map` existe (viene de `Array.prototype`)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Raramente tocarás `prototype` manualmente hoy en día. Útil para polyfills."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Monkey Patching",
            content: "Modificar prototipos nativos (`Array.prototype.miMetodo = ...`) es peligroso. Puede romper librerías o causar conflictos el día que el estándar añada ese método."
          }
        ],
        syntaxDescription: "Es el ADN compartido de los objetos. Si un objeto no sabe hacer algo, mira su ADN (prototipo) para ver si sus antepasados sabían hacerlo.",
        description: "Herencia basada en prototipos.",
        code: `function Gato(nombre) {
  this.nombre = nombre;
}

// Agregar método al prototipo (compartido por todas las instancias)
// Ahorra memoria comparado con definirlo en el constructor
Gato.prototype.maullar = function() {
  console.log("Miau");
};

const felix = new Gato("Felix");
felix.maullar(); // Encuentra el método en el prototipo`,
        useCases: [
          {
            title: "Polyfills",
            description: "Agregar funcionalidad moderna a navegadores antiguos (único caso válido de modificar nativos).",
            code: `if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    // Implementación manual
  };
}`
          },
          {
            title: "Herencia sin Clases (Estilo Antiguo)",
            description: "Cómo se hacía antes de ES6 (útil para entender legacy).",
            code: `function Heredero() {
  Padre.call(this); // Super()
}
Heredero.prototype = Object.create(Padre.prototype);
Heredero.prototype.constructor = Heredero;`
          }
        ]
      },
      {
        id: "private-fields",
        title: "Private Fields (#)",
        content: [
          {
            title: "¿Qué es?",
            text: "Propiedades que empiezan con `#`. Son puramente privadas y no accesibles desde fuera de la clase."
          },
          {
            title: "¿Por qué es importante?",
            text: "Garantiza encapsulamiento real. Antes se usaba `_prop` por convención, pero no era seguro."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para secretos, tokens, o estado interno que una librería no debe exponer."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Usa #",
            content: "Prefiere `#campo` sobre la sintaxis de TypeScript `private campo`, ya que `#` ofrece privacidad en tiempo de ejecución (runtime), no solo en compilación."
          }
        ],
        syntaxDescription: "Ponerle `#` delante a una propiedad es como ponerle un candado. Solo la propia clase tiene la llave. Desde fuera, esa propiedad ni siquiera existe.",
        description: "Campos privados reales con #.",
        code: `class Cuenta {
  #saldo = 0; // Privado

  depositar(monto) {
    this.#saldo += monto;
  }

  getSaldo() {
    return this.#saldo; // Acceso permitido dentro
  }
}

const c = new Cuenta();
c.depositar(100);
// console.log(c.#saldo); // SyntaxError: Private field '#saldo' must be declared...`,
        useCases: [
          {
            title: "Protección de Estado Interno",
            description: "Evitar que librerías externas dependan de tus internos.",
            code: `class SDK {
  #apiKey;
  constructor(key) { this.#apiKey = key; }
  
  hacerCall() {
    // Usa #apiKey internamente sin exponerla
  }
}`
          },
          {
            title: "Métodos Privados",
            description: "Métodos auxiliares que no son parte de la API pública.",
            code: `class Servicio {
  publica() { this.#privada(); }
  #privada() { console.log('Interno'); }
}`
          }
        ]
      },
      {
        id: "static-blocks",
        title: "Static Blocks",
        content: [
          {
            title: "¿Qué es?",
            text: "Bloque `static { ... }` dentro de una clase. Se ejecuta una sola vez al cargar la clase."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite inicializar propiedades estáticas con lógica compleja (try-catch, bucles) que no cabe en una simple asignación."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para configurar singletons, cachés estáticos o leer configuración al inicio."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Acceso a Privados",
            content: "Los bloques estáticos tienen acceso a los campos privados de la clase, lo que permite exponerlos selectivamente si es necesario."
          }
        ],
        syntaxDescription: "Es el constructor de la 'fábrica' (la clase), no del producto (la instancia). Se ejecuta una sola vez cuando el programa arranca, para preparar la maquinaria.",
        description: "Bloques de inicialización estática.",
        code: `class Configuracion {
  static dbConfig;
  static {
    try {
      const datos = loadFromEnv();
      this.dbConfig = datos;
    } catch {
      this.dbConfig = { default: true };
    }
  }
}`,
        useCases: [
          {
            title: "Inicialización Compleja",
            description: "Configurar constantes estáticas que dependen de lógica.",
            code: `class Iconos {
  static mapa = new Map();
  static {
    // Llenar el mapa programáticamente
    ['user', 'home'].forEach(k => this.mapa.set(k, 'icon-' + k));
  }
}`
          }
        ]
      }
    ]
  },
  {
    title: "5. Async Programming",
    topics: [
      {
        id: "promises",
        title: "Promesas",
        content: [
          {
            title: "¿Qué es?",
            text: "Objeto que representa la eventual terminación (o falla) de una operación asíncrona. Tiene 3 estados: Pending, Fulfilled, Rejected."
          },
          {
            title: "¿Por qué es importante?",
            text: "Eliminó el 'Callback Hell' permitiendo encadenamiento plano (`.then().then()`). Es la base de toda la asincronía moderna."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa `Promise.allSettled` para esperar múltiples peticiones, o cuando envuelves APIs de callbacks antiguas."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Promise.allSettled",
            content: "Prefiere `allSettled` sobre `Promise.all` si no quieres que una sola falla cancele todas las demás peticiones.",
            code: "const [res1, res2] = await Promise.allSettled([req1, req2]);\n// res1.status === 'fulfilled' | 'rejected'"
          }
        ],
        syntaxDescription: "Una promesa es como un ticket de pedido de pizza. No tienes la pizza ya (pending), pero el ticket te garantiza que en el futuro te la darán (fulfilled) o te dirán que se quemó (rejected).",
        description: "Objeto que representa una operación asíncrona.",
        code: `const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

esperar(1000)
  .then(() => {
    console.log("Pasó 1 seg");
    return esperar(1000);
  })
  .then(() => console.log("Pasaron 2 seg"))
  .catch(err => console.error("Error:", err))
  .finally(() => console.log("Limpieza final"));

// Métodos estáticos
// Promise.all([p1, p2]) -> Todo o nada
// Promise.allSettled([p1, p2]) -> Reporte completo`,
        useCases: [
          {
            title: "Race Condition Control",
            description: "Usar Promise.race para establecer un timeout a una petición lenta.",
            code: `const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout!')), 5000)
);

const fetchConTimeout = Promise.race([
  fetch('/api/heavy-data'),
  timeout
]);`
          },
          {
            title: "Manejo de Carga Paralela",
            description: "Iniciar múltiples cargas a la vez para mejorar performance UI.",
            code: `const [usuario, config] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/config').then(r => r.json())
]);`
          }
        ]
      },
      {
        id: "async-await",
        title: "Async / Await",
        content: [
          {
            title: "¿Qué es?",
            text: "Sintaxis que hace que el código asíncrono parezca síncrono. `await` pausa la ejecución de la función hasta que la promesa se resuelva."
          },
          {
            title: "¿Por qué es importante?",
            text: "Mejora drásticamente la legibilidad frente a `.then()`. Permite usar `try/catch` estándar para manejo de errores."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Casi siempre. Es el estándar moderno. Solo recuerda que `await` debe estar en una función `async` (o top-level en módulos)."
          }
        ],
        tips: [
          {
            type: "error",
            title: "forEach Async",
            content: "`forEach` no espera a las promesas. Si usas await dentro de un forEach, el loop terminará instantáneamente. Usa `for...of` o `Promise.all(map)`.",
            code: "const items = [1, 2];\n\n// Mal (No espera)\nitems.forEach(async i => await algo(i));\n\n// Bien\nfor (const i of items) await algo(i);"
          }
        ],
        syntaxDescription: "Es poner 'pausa' en una función. `async` avisa 'aquí van a pasar cosas lentas', y `await` dice 'espera aquí sentado hasta que esto termine antes de seguir a la siguiente línea'. Convierte el caos asíncrono en una lista de tareas ordenada.",
        description: "Sintaxis moderna para promesas.",
        code: `async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://api.ejemplo.com");
    if (!respuesta.ok) throw new Error("Error http");
    
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Fallo:", error);
    // Podemos relanzar el error o retornar un default
    return null;
  }
}`,
        useCases: [
          {
            title: "Secuencia Dependiente",
            description: "Cuando el paso 2 requiere estrictamente el resultado del paso 1.",
            code: `const login = await auth.login(user, pass);
const perfil = await db.getProfile(login.id);
const posts = await db.getPosts(perfil.role);`
          },
          {
            title: "Loop Asíncrono en Serie",
            description: "Procesar items uno por uno (no en paralelo) para no saturar.",
            code: `for (const url of urls) {
  await descargar(url); // Espera a que termine antes del siguiente
}`
          }
        ]
      }
      ,
      {
        id: "abort-controller",
        title: "AbortController",
        content: [
          {
            title: "¿Qué es?",
            text: "API estándar para cancelar operaciones asíncronas (como `fetch`). Usa una `AbortSignal`."
          },
          {
            title: "¿Por qué es importante?",
            text: "Evita 'Race Conditions' (peticiones viejas sobrescribiendo nuevas) y fugas de memoria en React (actualizar componente desmontado)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "En buscadores (type-ahead) para cancelar la búsqueda anterior, o en `useEffect` cleanup."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Cleanup en useEffect",
            content: "Siempre retorna una función de limpieza en `useEffect` que aborte la petición si el componente se desmonta. `return () => controller.abort()`.",
            code: "useEffect(() => {\n  const ctrl = new AbortController();\n  fetch(url, { signal: ctrl.signal });\n  return () => ctrl.abort();\n}, []);"
          }
        ],
        syntaxDescription: "Es el botón de 'Cancelar' del navegador. Si pediste una pizza (fetch) pero te arrepientes a los 2 segundos, usas esto para llamar y cancelar el pedido antes de que salga del horno.",
        description: "Cancelación de tareas asíncronas y limpieza de memoria.",
        code: `const controller = new AbortController();
const signal = controller.signal;

// 1. Vincular señal a fetch
fetch('/api/heavy', { signal })
  .then(r => r.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Petición cancelada limpiamente');
    } else {
      console.error('Error real:', err);
    }
  });

// 2. Cancelar al cabo de 2s o acción de usuario
setTimeout(() => controller.abort(), 2000); // Timeout manual`,
        useCases: [
          {
            title: "Type-ahead Search (Búsqueda predictiva)",
            description: "Cancelar la búsqueda anterior si el usuario sigue escribiendo rápido.",
            code: `let activeController = null;

input.oninput = async (e) => {
  // Cancelar petición anterior si existe
  if (activeController) activeController.abort();
  
  activeController = new AbortController();
  try {
    const res = await fetch(\`/search?q=\${e.target.value}\`, { 
      signal: activeController.signal 
    });
    const results = await res.json();
    render(results);
  } catch (err) {
    if (err.name !== 'AbortError') throw err; 
  }
};`
          },
          {
            title: "Listener de una sola vez (Cleanup)",
            description: "Eliminar eventos automáticamente sin removeEventListener explícito.",
            code: `const ac = new AbortController();
// El listener se muere cuando llamamos ac.abort()
btn.addEventListener('click', handler, { signal: ac.signal });

// ... más tarde en desmontaje ...
ac.abort();`
          }
        ]
      },
      {
        id: "top-level-await",
        title: "Top-Level Await",
        content: [
          {
            title: "¿Qué es?",
            text: "Usar `await` fuera de una función `async`, directamente en la raíz de un módulo."
          },
          {
            title: "¿Por qué es importante?",
            text: "Transforma el módulo en una gran promesa. El módulo no termina de cargarse hasta que el await se resuelve."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para inicializar conexiones a DB o cargar configuración remota ANTES de que la app arranque."
          }
        ],
        tips: [
          {
            type: "warning",
            title: "Waterfall de Carga",
            content: "Si abusas al inicio, detienes la carga de toda la aplicación. Úsalo con cuidado.",
            code: "// main.js\n// Bloquea app entera hasta que retorne\nawait loadHugeConfig();"
          }
        ],
        syntaxDescription: "Es poder decir 'espera' sin tener que estar dentro de una función especial. Pero cuidado: si pausas el archivo principal, pausas toda la aplicación.",
        description: "Await fuera de funciones async en Módulos ES.",
        code: `// db-connection.js (Modulo)
// El export no ocurre hasta que la conexión es exitosa
const connection = await db.connect(); 
export const dbClient = connection;

// main.js
import { dbClient } from './db-connection.js'; 
// Aquí dbClient YA está listo y conectado. Sin promesas extra.`,
        useCases: [
          {
            title: "Carga Condicional de Librerías (Lazy)",
            description: "Cargar una librería pesada solo si el entorno la necesita.",
            code: `let graphLib;
if (window.location.pathname === '/dashboard') {
  // Bloquea este módulo hasta que d3 cargue
  graphLib = await import('d3'); 
}`
          },
          {
            title: "Inicialización de Recursos",
            description: "Garantizar que config remota existe antes de exportar.",
            code: `// config.js
const res = await fetch('/api/config.json');
export const config = await res.json(); // Exporta valor final`
          }
        ]
      },
      {
        id: "promise-with-resolvers",
        title: "Promise.withResolvers()",
        content: [
          {
            title: "¿Qué es?",
            text: "Método estático (ES2024) que devuelve `{ promise, resolve, reject }` para controlar una promesa desde fuera."
          },
          {
            title: "¿Por qué es importante?",
            text: "Estandariza el patrón 'Deferred'. Evita la verbosidad de definir variables fuera del constructor `new Promise`."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para convertir eventos (streams, sockets) en promesas únicas o coordinar tareas manualmente."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Limpieza",
            content: "Reemplaza el viejo hack: `let resolve; new Promise(r => resolve = r);` con una sola línea limpia.",
            code: "const { promise, resolve } = Promise.withResolvers();"
          }
        ],
        syntaxDescription: "Es como comprar un ticket en blanco. Te dan la promesa y los sellos de 'APROBADO' y 'RECHAZADO' por separado, para que tú los uses cuando y donde quieras.",
        description: "Control manual total de Promesas (ES2024).",
        code: `// ANTES (Feo y verboso)
let resolver, rechazar;
const p = new Promise((res, rej) => {
  resolver = res;
  rechazar = rej;
});

// AHORA (Limpio ES2024)
const { promise, resolve, reject } = Promise.withResolvers();

// Usar la promesa
promise.then(msg => console.log('Resuelto:', msg));

// Resolverla desde otro lado 5s después
setTimeout(() => resolve('¡Hecho!'), 5000);`,
        useCases: [
          {
            title: "Convertir Eventos a Promesas",
            description: "Esperar a que ocurra un evento específico (ej. 'conectado') una sola vez.",
            code: `function esperarConexion(socket) {
  const { promise, resolve } = Promise.withResolvers();
  
  socket.on('connect', () => resolve());
  socket.on('error', (err) => reject(err));
  
  return promise;
}`
          },
          {
            title: "Colas de Procesamiento",
            description: "Crear tareas manuales que un worker resolverá después.",
            code: `class TaskQueue {
  add(tarea) {
    const { promise, resolve } = Promise.withResolvers();
    this.cola.push({ tarea, resolve });
    this.procesar();
    return promise; // Retorna la promesa al usuario
  }
}`
          }
        ]
      }
    ]
  },
  {
    title: "6. DOM & Browser APIs",
    topics: [
      {
        id: "dom-selection",
        title: "DOM - Selección y Recorrido",
        content: [
          {
            title: "¿Qué es?",
            text: "El método estándar para buscar elementos. `querySelector` devuelve el primero, `querySelectorAll` devuelve todos (NodeList)."
          },
          {
            title: "¿Por qué es importante?",
            text: "Unifica la búsqueda usando selectores CSS (`#id`, `.class`, `[attr]`). Reemplaza a las viejas APIs específicas (`getElementById`, etc)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre que necesites referencias al DOM. Cachea el resultado en una variable para no buscar en cada frame."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Cachear Referencias",
            content: "El acceso al DOM es lento. No hagas `document.querySelector` dentro de un bucle. Hazlo fuera y reutiliza la variable.",
            code: "// Mal\nitems.forEach(() => document.querySelector('#a').append());\n\n// Bien\nconst el = document.querySelector('#a');\nitems.forEach(() => el.append());"
          }
        ],
        syntaxDescription: "`querySelector` es como usar el buscador de archivos. Le dices '#id' o '.clase' y te trae el elemento. Antes tenías que usar funciones diferentes para cada cosa (findById, ByClass, etc), ahora una sola sirve para todo.",
        description: "Selectores modernos y optimización.",
        code: `// Selectores
const list = document.querySelector('#lista');
const items = document.querySelectorAll('.item');

// Convertir a Array
const textos = [...items].map(el => el.textContent);

// Traversal (Navegación)
const padre = el.closest('.card'); // Sube hasta encontrar .card
const hijo = el.querySelector('.icon');
const hermano = el.nextElementSibling;`,
        useCases: [
          {
            title: "Selección Optimizada",
            description: "Cachear elementos para evitar 'Layout Thrashing'.",
            code: `// BIEN: Referencia cacheada fuera del loop
const contenedor = document.getElementById('log');
items.forEach(item => {
  contenedor.innerHTML += item; // Nota: Aún ineficiente, mejor usar Fragment
});`
          },
          {
            title: "Delegación (Selection)",
            description: "Buscar el target real dentro de un listener global.",
            code: `table.onclick = (e) => {
  const btn = e.target.closest('.btn-delete');
  if (!btn) return;
  // ...
};`
          }
        ]
      },
      {
        id: "dom-manipulation",
        title: "Manipulación y Atributos",
        content: [
          {
            title: "¿Qué es?",
            text: "Modificar el árbol DOM: cambiar texto, clases o atributos. `classList` es la API moderna para clases CSS."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es como JS 'da vida' a la página. Usar `textContent` evita ataques XSS que `innerHTML` permitiría."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para actualizar la UI. En React esto lo hace el framework, pero en Vanilla JS es manual."
          }
        ],
        tips: [
          {
            type: "error",
            title: "innerHTML es Peligroso",
            content: "Nunca uses `innerHTML` con input de usuario. Abre la puerta a ataques XSS (Cross Site Scripting).",
            code: "const msg = \"<script>steal()</script>\";\n\n// Peligro\nel.innerHTML = msg;\n// Seguro\nel.textContent = msg;"
          }
        ],
        syntaxDescription: "Es cirugía plástica para tu web. `classList` le cambia la ropa (estilos), y `textContent` le cambia lo que dice. `innerHTML` es cirugía mayor: cambias los órganos internos (cuidado con las infecciones/virus XSS).",
        description: "Modificar contenido, clases y datos.",
        code: `const card = document.querySelector('.card');

// Clases
card.classList.toggle('active');

// Texto vs HTML
card.querySelector('h2').textContent = "Nuevo Título"; // Seguro

// Data Attributes
// <div data-status="pending" data-id="1">
console.log(card.dataset.status); // "pending"
card.dataset.status = "done"; // Actualiza DOM`,
        useCases: [
          {
            title: "Dark Mode Toggle",
            description: "Cambiar tema manipulando clase en body.",
            code: `btnTheme.onclick = () => {
  document.body.classList.toggle('dark-mode');
  // CSS: body.dark-mode { ... }
};`
          }
        ]
      },
      {
        id: "dom-creation",
        title: "Creación Eficiente",
        content: [
          {
            title: "¿Qué es?",
            text: "Generar nuevos elementos HTML. `DocumentFragment` es un contenedor invisible que permite batch-updates."
          },
          {
            title: "¿Por qué es importante?",
            text: "Insertar nodos uno a uno causa 'Reflow' (repintado) constante, lo que es lento. Fragments permite insertar 1000 nodos de una sola vez."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Cuando generas listas o tablas dinámicamente desde un array de datos."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Templates HTML",
            content: "La etiqueta `<template>` permite definir HTML que no se renderiza hasta que lo clonas con JS. Es más limpio que crear nodos desde cero.",
            code: "<template id='card'>\n  <div class='card'>...</div>\n</template>\n\nconst tpl = document.querySelector('#card');\nconst clone = tpl.content.cloneNode(true);"
          }
        ],
        syntaxDescription: "`DocumentFragment` es una bandeja invisible. En lugar de llevar los platos (elementos) uno por uno a la mesa (DOM), los pones todos en la bandeja y haces un solo viaje. Mucho más rápido.",
        description: "Fragments y Templates para performance.",
        code: `// DocumentFragment
const frag = document.createDocumentFragment();
datos.forEach(txt => {
  const div = document.createElement('div');
  div.textContent = txt;
  frag.append(div);
});
padre.append(frag); // 1 Reflow

// Template
const tpl = document.querySelector('#card-tpl');
const clon = tpl.content.cloneNode(true);
padre.append(clon);`,
        useCases: [
          {
            title: "Renderizado Masivo",
            description: "Generar lista larga sin bloquear UI.",
            code: `const fragment = document.createDocumentFragment();
users.forEach(u => fragment.append(createUserRow(u)));
table.append(fragment);`
          }
        ]
      },
      {
        id: "events",
        title: "Sistema de Eventos",
        content: [
          {
            title: "¿Qué es?",
            text: "Mecanismo para reaccionar a acciones del usuario. La **Delegación** consiste en poner un listener en el padre para manejar eventos de muchos hijos."
          },
          {
            title: "¿Por qué es importante?",
            text: "La delegación ahorra memoria (1 listener vs 1000) y maneja elementos creados dinámicamente en el futuro."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa `addEventListener`. Usa delegación para listas o tablas."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Delegación",
            content: "En lugar de `items.forEach(i => i.onclick = ...)`, haz `lista.onclick = (e) => { if(e.target.matches('.item')) ... }`.",
            code: "ul.onclick = (e) => {\n  if (e.target.matches('li')) removeItem(e.target);\n};"
          }
        ],
        syntaxDescription: "`addEventListener` es poner una oreja en la pared. Cuando suena el golpe (click, keypress), reaccionas. La 'Delegación' es poner una sola oreja gigante en el edificio en vez de una en cada habitación.",
        description: "Delegación, bubbling y custom events.",
        code: `// Delegación
list.addEventListener('click', (e) => {
  if (e.target.matches('.btn-borrar')) {
    e.target.closest('li').remove();
  }
});

// Custom Events
const event = new CustomEvent('login', { detail: { user: 'Juan' } });
document.dispatchEvent(event);`,
        useCases: [
          {
            title: "Formularios Dinámicos",
            description: "Manejar inputs creados después de cargar la página.",
            code: `form.onchange = (e) => {
  if (e.target.name === 'pais') cargarCiudades(e.target.value);
};`
          }
        ]
      },
      {
        id: "observers",
        title: "Observadores Modernos",
        content: [
          {
            title: "¿Qué es?",
            text: "APIs para observar cambios sin polling. `IntersectionObserver` (visibilidad), `MutationObserver` (DOM), `ResizeObserver` (tamaño)."
          },
          {
            title: "¿Por qué es importante?",
            text: "Son infinitamente más eficientes que escuchar `scroll` o `resize` en el objeto window, que disparan cientos de veces por segundo."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Lazy loading de imágenes, scroll infinito, o animaciones al entrar en pantalla."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Lazy Loading",
            content: "IntersectionObserver es la base moderna para cargar imágenes o datos solo cuando el usuario hace scroll hasta ellos.",
            code: "const obs = new IntersectionObserver(entries => {\n  if (entries[0].isIntersecting) loadImg();\n});\nobs.observe(img);"
          }
        ],
        syntaxDescription: "Son cámaras de seguridad. En lugar de preguntar cada segundo '¿ya llegamos?', pones una cámara (`IntersectionObserver`) que te avisa sola cuando el elemento entra en pantalla.",
        description: "Intersection, Mutation, Resize.",
        code: `// Lazy Load Img
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.src = e.target.dataset.src;
      observer.unobserve(e.target);
    }
  });
});
imgs.forEach(i => observer.observe(i));`,
        useCases: [
          {
            title: "Infinite Scroll",
            description: "Cargar más al ver el footer.",
            code: `observer.observe(document.querySelector('#footer'));`
          }
        ]
      },
      {
        id: "url-apis",
        title: "URL APIs",
        content: [
          {
            title: "¿Qué es?",
            text: "Clases `URL` y `URLSearchParams` para parsear y construir direcciones web."
          },
          {
            title: "¿Por qué es importante?",
            text: "Manipular URLs como strings es propenso a errores (encoding, slashes). Estas APIs manejan los casos borde automáticamente."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre que leas `window.location` o construyas links con parámetros (?page=1&sort=asc)."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Params fáciles",
            content: "`const params = new URLSearchParams({page: 1, sort: 'asc'});` convierte el objeto a string query `page=1&sort=asc` automáticamente.",
            code: "const p = new URLSearchParams({ q: 'js' });\nconsole.log(p.toString()); // \"q=js\""
          }
        ],
        syntaxDescription: "Es un traductor de direcciones web. En lugar de cortar y pegar strings a mano (propenso a errores), le das la dirección y él te separa los ingredientes (protocolo, dominio, parámetros) limpiamente.",
        description: "Manejo de Query Params.",
        code: `const url = new URL(window.location);
url.searchParams.set('page', 2);
window.history.pushState({}, '', url);`,
        useCases: [
          {
            title: "Filtros de URL",
            description: "Sincronizar estado de filtros con URL.",
            code: `const params = new URLSearchParams(location.search);
const filtro = params.get('type') || 'all';`
          }
        ]
      }
    ]
  },
  {
    title: "7. Utilities & Modern Features",
    topics: [
      {
        id: "persistence",
        title: "Persistencia (Storage)",
        content: [
          {
            title: "¿Qué es?",
            text: "Almacenamiento clave-valor en el navegador. `localStorage` persiste al cerrar, `sessionStorage` muere con la pestaña."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite guardar preferencias de usuario (tema, idioma) o tokens de sesión sin cookies. Soporta ~5MB."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para datos no críticos. Nunca guardes contraseñas o información sensible (es accesible por JS)."
          }
        ],
        tips: [
          {
            type: "warning",
            title: "Es Sincrono",
            content: "Operaciones grandes en localStorage bloquean el hilo principal. No lo uses como base de datos real.",
            code: "// Esto congela la UI si el JSON es gigante\nlocalStorage.setItem('big', JSON.stringify(hugeData));"
          }
        ],
        syntaxDescription: "Es el bolsillo del pantalón del navegador. `localStorage` es el bolsillo cosido (lo que guardas sigue ahí mañana). `sessionStorage` es el bolsillo mágico que se vacía cuando cierras la pestaña.",
        description: "LocalStorage y SessionStorage.",
        code: `const config = { theme: 'dark' };
localStorage.setItem('config', JSON.stringify(config));

// Leer
const saved = JSON.parse(localStorage.getItem('config'));
console.log(saved?.theme);`,
        useCases: [
          {
            title: "Estado de UI",
            description: "Recordar menú colapsado.",
            code: `if (localStorage.getItem('menu') === 'closed') {
  sidebar.classList.add('closed');
}`
          }
        ]
      },
      {
        id: "timers-console",
        title: "Debugging y Temporizadores",
        content: [
          {
            title: "¿Qué es?",
            text: "Herramientas para medir rendimiento (`console.time`) y programar código (`setTimeout`)."
          },
          {
            title: "¿Por qué es importante?",
            text: "El debugging visual (`console.table`) ahorra tiempo. Limpiar temporizadores (`clearTimeout`) evita bugs en SPAs."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Usa `requestAnimationFrame` para animaciones suaves en lugar de `setInterval`."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Limpiar Intervalos",
            content: "Si haces un `setInterval` en un componente React (`useEffect`), es OBLIGATORIO limpiarlo en el return para evitar fugas de memoria.",
            code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);"
          }
        ],
        syntaxDescription: "`setTimeout` es un temporizador de cocina: 'suena en 5 minutos'. `console.log` es tu diario de a bordo para escribir qué está pasando mientras navegas por el código.",
        description: "Console API y Timeouts.",
        code: `console.time('Loop');
console.table([{id:1}, {id:2}]);
console.timeEnd('Loop');

// Intervalo
const id = setInterval(() => console.log('Ping'), 1000);
clearInterval(id);`,
        useCases: [
          {
            title: "Debounce Input",
            description: "Esperar a que pare de escribir.",
            code: `let timer;
input.oninput = () => {
  clearTimeout(timer);
  timer = setTimeout(buscar, 300);
};`
          }
        ]
      },
      {
        id: "modern-modules",
        title: "Módulos Modernos (ESM)",
        content: [
          {
            title: "¿Qué es?",
            text: "El sistema estándar de módulos de JS (`import`/`export`). Reemplaza a CommonJS (`require`)."
          },
          {
            title: "¿Por qué es importante?",
            text: "Permite 'Tree Shaking' (eliminar código no usado) y carga asíncrona de partes de la app (Code Splitting)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre. Usa `import()` dinámico para cargar componentes pesados solo cuando se necesiten."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Dynamic Import",
            content: "`const modulo = await import('./ruta')`. Ideal para bajar el peso inicial del bundle.",
            code: "button.onclick = async () => {\n  const { Chart } = await import('./Chart.js');\n  Chart.render();\n};"
          }
        ],
        syntaxDescription: "`import` y `export` son los puertos de carga y descarga de tus archivos. Te permiten organizar el código en piezas de LEGO separadas y ensamblarlas donde las necesites.",
        description: "ES Modules y Lazy Loading.",
        code: `// lib.js
export const sum = (a, b) => a + b;

// main.js
import { sum } from './lib.js';

// Lazy Load
btn.onclick = async () => {
  const mod = await import('./chart.js');
  mod.render();
};`,
        useCases: [
          {
            title: "Code Splitting",
            description: "Cargar PDF lib solo si se usa.",
            code: `if (needPdf) await import('jspdf');`
          }
        ]
      },
      {
        id: "error-handling",
        title: "Manejo de Errores",
        content: [
          {
            title: "¿Qué es?",
            text: "Bloques `try-catch` y objetos `Error` para gestionar fallos de manera controlada."
          },
          {
            title: "¿Por qué es importante?",
            text: "Evita que tu aplicación 'crashee' por completo ante un fallo inesperado. Permite mostrar feedback útil al usuario."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Envuelve llamadas a APIs o código inestable. Crea errores personalizados para lógica de negocio."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Error Boundaries",
            content: "En React, usa Error Boundaries para capturar errores de renderizado en componentes hijos y no romper toda la página.",
            code: "<ErrorBoundary fallback={<ErrorPage />}>\n  <MyComponent />\n</ErrorBoundary>"
          }
        ],
        syntaxDescription: "`try` es intentar hacer el truco de magia. `catch` es la red de seguridad por si te caes, para que el público no vea que te rompiste la pierna (el programa no crashee).",
        description: "Try/Catch y Custom Errors.",
        code: `class AppError extends Error {
  constructor(msg) { super(msg); this.name = 'AppError'; }
}

try {
  throw new AppError("Fallo");
} catch (e) {
  if (e instanceof AppError) handleAppError(e);
}`,
        useCases: [
          {
            title: "Validación",
            description: "Fallo controlado en forms.",
            code: `if (!email.includes('@')) throw new Error("Email inválido");`
          }
        ]
      },
      {
        id: "regex-text",
        title: "Texto y Regex",
        content: [
          {
            title: "¿Qué es?",
            text: "Herramientas avanzadas para manipulación de strings. Regex con grupos nombrados hace las expresiones regulares legibles."
          },
          {
            title: "¿Por qué es importante?",
            text: "`Intl` formatea monedas, fechas y números correctamente según el idioma del usuario sin librerías externas."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Validación de formularios (regex) o mostrar precios/fechas en la UI (Intl)."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Grupos Nombrados",
            content: "Usa `(?<year>\\d{4})` en lugar de tratar de adivinar qué es `match[1]`. Es autodocumentado.",
            code: "const date = /(\\d{4})-(\\d{2})/.exec('2024-01');\n// date[1] vs date.groups.year"
          }
        ],
        syntaxDescription: "Las Regex son patrones de búsqueda mística. Defines una forma (ej. 'tres números seguido de una letra') y buscas coincidencias. Si usas grupos con nombre `(?<year>)` se vuelven legibles para humanos.",
        description: "Expresiones Regulares e Intl.",
        code: `// Regex Nombre
const re = /(?<year>\\d{4})-(?<month>\\d{2})/;
const match = "2024-01".match(re);
console.log(match.groups.year); // "2024"

// Intl
new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(100);`,
        useCases: [
          {
            title: "Parse Log",
            description: "Extraer datos estructurados de strings.",
            code: `const log = "[ERROR] DB Fail";
const regex = /\\[(?<level>\\w+)\\] (?<msg>.+)/;`
          }
        ]
      },
      {
        id: "metaprogramming",
        title: "Metaprogramación",
        content: [
          {
            title: "¿Qué es?",
            text: "Escribir código que manipula o lee otro código. `Proxy` intercepta operaciones básicas en objetos."
          },
          {
            title: "¿Por qué es importante?",
            text: "Es la base mágica de frameworks modernos como Vue 3 o MobX para detectar cambios automáticamente."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para validación automática, logs de acceso, o crear APIs reactivas."
          }
        ],
        tips: [
          {
            type: "warning",
            title: "Performance",
            content: "Los Proxies son más lentos que los objetos normales. No 'proxies' todo tu estado si no es necesario."
          }
        ],
        syntaxDescription: "Es la magia negra de JS. Puedes crear objetos que 'mienten' sobre lo que tienen dentro, o que reaccionan cuando intentas tocarlos. Es como ponerle trampas y sensores a un objeto normal.",
        description: "Proxy, Reflect, Symbol.",
        code: `const handler = {
  set(obj, prop, val) {
    console.log('Cambiado:', prop);
    obj[prop] = val;
    return true;
  }
};
const p = new Proxy({}, handler);
p.a = 1; // Log: "Cambiado: a"`,
        useCases: [
          {
            title: "Reactividad",
            description: "Auto-actualizar UI al cambiar datos.",
            code: `state = new Proxy(data, { set: updateUI });`
          }
        ]
      },
      {
        id: "modern-syntax",
        title: "Sintaxis Moderna",
        content: [
          {
            title: "¿Qué es?",
            text: "Operadores lógicos modernos: `??` (Nullish), `?.` (Optional Chaining), y asignaciones lógicas."
          },
          {
            title: "¿Por qué es importante?",
            text: "Elimina bugs clásicos donde `0` se confundía con `false`. Reduce drásticamente las verificaciones de nulos (`if (a && a.b && a.b.c)`)."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Siempre. `??` es casi siempre superior a `||` para valores por defecto."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Null Coalescing",
            content: "Usa `valor ?? default` en lugar de `||` si `0` o `\"\"` son valores válidos que no quieres sobreescribir.",
            code: "const count = 0;\nconst show = count ?? 5; // 0\nconst bad = count || 5; // 5"
          }
        ],
        syntaxDescription: "Son atajos para escribir menos y errar menos. `?.` pregunta '¿existes?' antes de entrar a una propiedad. `??` rellena huecos solo cuando realmente faltan datos (null/undefined).",
        description: "??, ?., BigInt.",
        code: `const val = input ?? "Default";
const city = user?.address?.city;
count ||= 1; // Asigna si falsy

const big = 9_000_000_000n;`,
        useCases: [
          {
            title: "API Config",
            description: "Leer configs anidadas de forma segura.",
            code: `const timeout = config?.server?.timeout ?? 5000;`
          }
        ]
      },
      {
        id: "web-workers-util",
        title: "Web Workers",
        content: [
          {
            title: "¿Qué es?",
            text: "Scripts que corren en un hilo separado (background), sin bloquear la UI principal."
          },
          {
            title: "¿Por qué es importante?",
            text: "JS es single-threaded. Si haces un cálculo pesado (procesar imagen, crypto) en el hilo principal, la página se congela. Workers evitan esto."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Para exportaciones de datos masivos, compresión de imágenes o algoritmos complejos."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Comlink",
            content: "Usar workers en crudo es tedioso. Librerías como `comlink` abstractan la comunicación `postMessage` como si fueran funciones normales.",
            code: "// Worker\nconst api = { sum: (a, b) => a+b };\nComlink.expose(api);\n\n// Main\nconst remote = Comlink.wrap(worker);\nawait remote.sum(1, 2);"
          }
        ],
        syntaxDescription: "Es contratar a un asistente. Mientras tú (hilo principal) atiendes a los clientes (UI) y mantienes la tienda bonita, el asistente (worker) está en el almacén haciendo los cálculos pesados sin molestar a nadie.",
        description: "Multihilo real.",
        code: `// main.js
const worker = new Worker('job.js');
worker.postMessage({img: data});
worker.onmessage = e => show(e.data);

// job.js
self.onmessage = e => {
  const res = process(e.data);
  self.postMessage(res);
};`,
        useCases: [
          {
            title: "Exportar Datos",
            description: "Generar CSV/PDF grande sin bloquear.",
            code: `worker.postMessage({action: 'export_csv', data: rows});`
          }
        ]
      }
    ]
  },
  {
    title: "8. Consumo de APIs por Niveles",
    topics: [
      {
        id: "api-basic-fetch",
        title: "Nivel Básico: Fetch + Async/Await",
        content: [
          {
            title: "¿Qué es?",
            text: "El método nativo moderno para peticiones HTTP. Usa Promesas y requiere dos pasos: `fetch()` y luego `res.json()`."
          },
          {
            title: "¿Por qué es importante?",
            text: "Reemplazó al horrible `XMLHttpRequest`. No requiere librerías externas. Con `async/await` es muy legible."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "Scripts pequeños, Vanilla JS, o cuando quieres minimizar dependencias."
          }
        ],
        tips: [
          {
            type: "error",
            title: "Fetch no falla en 404",
            content: "`fetch` solo rechaza la promesa si falla la red (DNS). Un error 404 o 500 se considera éxito. Debes verificar `if (!response.ok)` manualmente.",
            code: "const res = await fetch('/404');\nconsole.log(res.ok); // false\nif (!res.ok) throw new Error('Failed');"
          }
        ],
        syntaxDescription: "`fetch` es como enviar un perro mensajero a buscar algo a otra casa (servidor). El perro corre (promesa), le pides que traiga la carta (response) y luego tienes que abrir el sobre para leer el mensaje (`.json()`).",
        description: "Scripts simples, Vanilla JS, proyectos pequeños.",
        code: `async function obtenerDatos() {
  try {
    // Paso 1: Obtener la respuesta (headers)
    const response = await fetch('https://api.ejemplo.com/datos');
    
    // Paso 2: Verificar si fue exitosa a nivel HTTP
    if (!response.ok) {
      throw new Error(\`Error HTTP: \${response.status}\`);
    }

    // Paso 3: Parsear el cuerpo JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Maneja errores de red o los lanzados manualmente
    console.error('Fallo en la petición:', error);
  }
}`,
        useCases: [
          {
            title: "Petición GET Simple",
            description: "El caso más común: obtener datos para mostrarlos en pantalla. Ideal para webs estáticas con algo de dinamismo.",
            code: `// Obtener lista de usuarios
const usuarios = await fetch('/api/usuarios').then(r => r.json());`
          },
          {
            title: "Enviar Formulario (POST)",
            description: "Enviar datos introducidos por el usuario al servidor, especificando el método y el tipo de contenido.",
            code: `await fetch('/api/contacto', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Juan',
    email: 'test@test.com'
  })
});`
          }
        ]
      },
      {
        id: "api-intermediate-axios",
        title: "Nivel Intermedio: Axios",
        content: [
          {
            title: "¿Qué es?",
            text: "Librería estándar de facto. Simplifica `fetch` añadiendo timeotes, interceptores y parseo JSON automático."
          },
          {
            title: "¿Por qué es importante?",
            text: "Los **Interceptores** son vitales en apps reales para inyectar tokens de autenticación o manejar errores 401 globalmente."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "En aplicaciones medianas/grandes donde necesitas configuración centralizada de la API."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Instancias",
            content: "Crea una instancia global: `const api = axios.create({ baseURL: ... })`. No importes axios directo en cada componente.",
            code: "// api.js\nexport const api = axios.create({ baseURL: '/api' });\n\n// Component.js\nimport { api } from './api';"
          }
        ],
        syntaxDescription: "Axios es un mensajero profesional con GPS y seguro. Si el servidor falla, te avisa mejor. Transforma los datos automáticamente (abre el sobre por ti) y puedes decirle a todos tus mensajeros que lleven siempre la misma placa (headers/tokens).",
        description: "Interceptores, subida de complejos, soporte legacy.",
        code: `import axios from 'axios';

// Instancia preconfigurada
const api = axios.create({
  baseURL: 'https://api.negocio.com/v1',
  timeout: 5000,
});

// Interceptor global de Request
api.interceptors.request.use(config => {
  // Inyectar token automáticamente
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Uso simple y limpio
try {
  const { data } = await api.get('/panel-control');
  console.log(data);
} catch (error) {
  // Captura tanto errores de red como 4xx/5xx
  console.error(error.response?.data?.message);
}`,
        useCases: [
          {
            title: "Manejo Global de Errores",
            description: "Redirigir al usuario al login automáticamente si su sesión expira (401) en cualquier petición.",
            code: `api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);`
          },
          {
            title: "Subida de Archivos con Progreso",
            description: "Monitorear el porcentaje de subida de un archivo grande.",
            code: `const formData = new FormData();
formData.append('archivo', fileInput.files[0]);

await axios.post('/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const porcentaje = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(\`Subiendo: \${porcentaje}%\`);
  }
});`
          }
        ]
      },
      {
        id: "api-advanced-query",
        title: "Nivel Avanzado: TanStack Query / SWR",
        content: [
          {
            title: "¿Qué es?",
            text: "Gestor de estado asíncrono. No solo hace la petición, sino que gestiona el **caché, reintentos y deduplicación**."
          },
          {
            title: "¿Por qué es importante?",
            text: "Resolver el 'fetch' es fácil; resolver 'cache invalidation' y 'race conditions' es difícil. React Query lo hace por ti. Elimina `useEffect` para datos."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "SIEMPRE en React/Vue si manejas datos del servidor. Usar `useEffect` para fetchs complejos es mala práctica hoy día."
          }
        ],
        tips: [
          {
            type: "goodPractice",
            title: "Query Keys",
            content: "Las keys deben ser serializables y únicas, como arrays: `['usuario', id]`. Son la base del caché.",
            code: "useQuery({ queryKey: ['todo', 1] });\n// Diferente a\nuseQuery({ queryKey: ['todo', 2] });"
          }
        ],
        syntaxDescription: "Es contratar a un bibliotecario experto. Tú le pides el libro (datos). Si ya lo tiene en su mesa (caché), te lo da al instante. Si no, lo pide, te lo da, y se encarga de renovarlo si se pone viejo. Tú te olvidas de gestionar el préstamo.",
        description: "Caché, reintentos, estado del servidor.",
        code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function PerfilUsuario() {
  const queryClient = useQueryClient();

  // Lectura de datos (Caching automático)
  const { data: usuario, isLoading } = useQuery({
    queryKey: ['usuario', 1],
    queryFn: () => axios.get('/api/usuario/1').then(res => res.data),
    staleTime: 1000 * 60, // Datos frescos por 1 minuto
  });

  // Escritura de datos (Mutación)
  const mutation = useMutation({
    mutationFn: (nuevoNombre) => axios.put('/api/usuario/1', { name: nuevoNombre }),
    onSuccess: () => {
      // Invalida la caché para forzar una recarga automática
      queryClient.invalidateQueries(['usuario', 1]);
    }
  });

  if (isLoading) return <span>Cargando...</span>;
  return (
    <div>
      <h1>{usuario.name}</h1>
      <button onClick={() => mutation.mutate('Nuevo Nombre')}>
        Actualizar Nombre
      </button>
    </div>
  );
}`,
        useCases: [
          {
            title: "Deduplicación de Peticiones",
            description: "Si 5 componentes en la pantalla necesitan el 'Usuario Actual', React Query solo hará 1 petición de red y compartirá el resultado.",
            code: `// En Sidebar.jsx
useQuery({ queryKey: ['user'], ... }); 
// En Header.jsx
useQuery({ queryKey: ['user'], ... });
// Resultado: 1 sola llamada HTTP`
          },
          {
            title: "Optimistic Updates",
            description: "Actualizar la UI instantáneamente antes de que el servidor responda, y revertir si falla. UX de clase mundial.",
            code: `useMutation({
  onMutate: async (nuevoTodo) => {
    // Cancelar fetches salientes
    await queryClient.cancelQueries(['todos']);
    // Guardar estado previo
    const previo = queryClient.getQueryData(['todos']);
    // Actualizar UI 'optimistamente'
    queryClient.setQueryData(['todos'], old => [...old, nuevoTodo]);
    return { previo };
  },
  onError: (err, variables, context) => {
    // Revertir en caso de error
    queryClient.setQueryData(['todos'], context.previo);
  }
});`
          }
        ]
      },
      {
        id: "api-bleeding-edge",
        title: "Nivel Bleeding Edge: Server Actions / tRPC",
        content: [
          {
            title: "¿Qué es?",
            text: "Llamadas a funciones de servidor directas desde el cliente, sin definir API endpoints manualmente. (Next.js Actions, tRPC)."
          },
          {
            title: "¿Por qué es importante?",
            text: "**End-to-End Type Safety**. Si cambias el backend, el frontend te avisa del error de tipo. Reduce código boilerplate al mínimo."
          },
          {
            title: "¿Cuándo usarlo?",
            text: "En frameworks FullStack como Next.js, Remix, o Astro. Ideal para equipos que controlan ambos lados."
          }
        ],
        tips: [
          {
            type: "idea",
            title: "Zero-API",
            content: "Con Server Actions, mentalmente 'importas' una función del servidor y la ejecutas. La red se abstrae por completo.",
            code: "import { saveItem } from './server-actions';\n\n// Cliente\nbutton.onclick = () => saveItem({ id: 1 });"
          }
        ],
        syntaxDescription: "Es telepatía. Llamas a una función en tu código como si estuviera ahí mismo, pero mágicamente se ejecuta en el servidor de la otra punta del mundo. Sin cables (APIs manuales) visibles.",
        description: "Tipado E2E, Server Actions, Frameworks Modernos.",
        code: `// Ejemplo con Next.js Server Actions
// actions.ts (Corre en el servidor)
'use server'
import { db } from './db';

export async function crearPost(formData: FormData) {
  const titulo = formData.get('titulo');
  // Validación automática en servidor
  await db.post.create({ data: { titulo } });
  // Revalidación de caché de ruta
  revalidatePath('/posts');
}

// Componente.tsx (Cliente)
import { crearPost } from './actions';

export default function Formulario() {
  return (
    <form action={crearPost}>
      <input name="titulo" type="text" />
      <button type="submit">Publicar</button>
    </form>
  );
}`,
        useCases: [
          {
            title: "Llamada RPC Tipada (tRPC)",
            description: "El cliente conoce exactamente qué argumentos espera el backend y qué devolverá.",
            code: `// Backend
const appRouter = router({
  getUser: publicProcedure
    .input(z.string())
    .query((req) => db.user.findById(req.input)),
});

// Frontend
const user = trpc.getUser.useQuery('id_123');
// user.data tienes autocompletado de las propiedades del usuario DB`
          },
          {
            title: "Progressive Enhancement",
            description: "Server Actions funcionan incluso si el JavaScript no ha cargado todavía en el navegador (usando formularios HTML nativos), mejorando la accesibilidad y robustez.",
            code: `<form action={serverAction}>
  <!-- Funciona sin JS -->
  <button>Enviar</button>
</form>`
          }
        ]
      }
    ]
  },
  flashcardsCategory
];

