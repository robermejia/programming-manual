export const fundamentosCategory = {
    title: "1. Fundamentos",
    topics: [
        {
            id: "intro-java",
            title: "Introducción a Java",
            videoUrl: "https://www.youtube.com/watch?v=3rXpZTbceTY",
            content: [
                {
                    title: "¿Qué es Java?",
                    text: "Un lenguaje de programación orientado a objetos, fuertemente tipado y multiplataforma ('Write Once, Run Anywhere'). Es el estándar en el mundo empresarial para aplicaciones robustas."
                },
                {
                    title: "Conceptos Clave",
                    text: "• **JDK (Kit de Desarrollo)**: Herramientas para crear apps (incluye compilador).\n• **JRE (Entorno de Ejecución)**: Necesario para correr las apps.\n• **JVM (Máquina Virtual)**: El motor que ejecuta el código en cualquier SO.\n• **Garbage Collector**: Administra la memoria automáticamente."
                },
                {
                    title: "Ediciones",
                    text: "• **JSE (Standard Edition)**: Para escritorio y base del lenguaje.\n• **Jakarta EE (antes JEE)**: Para aplicaciones web y empresariales complejas."
                }
            ],
            description: "Fundamentos teóricos, ecosistema (JDK/JRE) y definiciones clave.",
            code: `// Flujo de trabajo típico:
// 1. Escribes código (.java) -> IDE (NetBeans, IntelliJ)
// 2. Compilas (JDK) -> Bytecode (.class)
// 3. Ejecutas (JRE/JVM) -> Tu programa corre en Windows, Linux, Mac...
`,
            syntaxDescription: "Recuerda: Primero instalas el JDK (versión 17 o 21 LTS recomendadas), luego el IDE. Un IDE (como NetBeans o IntelliJ) es tu taller completo, mientras que un editor (VS Code) es solo una mesa de trabajo que necesita plugins.",
            useCases: [],
            tips: [
                {
                    type: "idea",
                    title: "Definición de Programar",
                    content: "Es especificar instrucciones a una computadora para que realice una función automáticamente."
                }
            ]
        },
        {
            id: "estructura-basica",
            title: "Estructura Básica",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Java es un lenguaje orientado a objetos donde todo código vive dentro de clases (moldes). El método `main` es el punto de partida obligatorio que la JVM busca para iniciar tu programa."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Esta estructura estricta garantiza que el código esté organizado y sea modular desde el principio. El tipado fuerte y la compilación previa previenen errores tontos antes de que ocurran."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En cualquier aplicación Java estándar. Sin una clase y un método main (o un framework que lo maneje), el programa no puede arrancar."
                }
            ],

            description: "Punto de entrada universal y reglas de sintaxis.",
            code: `public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("Hola Java!"); // 'sout' + Tab en NetBeans
    }
}`,
            syntaxDescription: "Reglas de Oro:\n1. **Case Sensitive**: 'Hola' y 'hola' son distintos.\n2. **Bloques**: Todo empieza con `{` y termina con `}`.\n3. **Sentencias**: Toda línea de orden termina en `;`.\n4. **Nombres**: Clases en 'PascalCase' (HolaMundo), variables/métodos en 'camelCase' (miVariable).",
            useCases: [
                {
                    title: "Recibir Argumentos",
                    description: "El método main puede procesar argumentos pasados al ejecutar el programa.",
                    code: `public class SaludoPersonalizado {
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("Hola, " + args[0]);
        } else {
            System.out.println("Hola invitado");
        }
    }
}`
                },
                {
                    title: "Main Simplificado (JDK 21-25+)",
                    description: "En versiones modernas, Java permite un punto de entrada mucho más sencillo para principiantes.",
                    code: `// Sin 'public class', 'static' ni 'String[] args'
void main() {
    System.out.println("¡Mucho más limpio!");
}

// O incluso (JDK 23+):
/*
void main() {
    println("Adiós verbosidad");
}
*/`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Todo es una Clase",
                    content: "En Java, no existen funciones 'sueltas' como en JS. Hasta el `main` debe vivir dentro de una `class`."
                },
                {
                    type: "error",
                    title: "Olvidar 'static'",
                    content: "Si tu método `main` no es static, la JVM no podrá ejecutarlo porque no existe una instancia de la clase todavía.",
                    code: "// ❌ Error común\npublic void main(String[] args) { ... }"
                },
                {
                    type: "goodPractice",
                    title: "Convención de Nombres",
                    content: "Las clases siempre empiezan con Mayúscula (`HolaMundo`). Si el archivo se llama `holamundo.java` y la clase `HolaMundo`, no compilará.",
                    code: "// ❌ holamundo.java\npublic class HolaMundo { } // Error\n\n// ✅ HolaMundo.java\npublic class HolaMundo { } // Correcto"
                }
            ]
        },
        {
            id: "variables-tipos",
            title: "Variables y Tipos",
            videoUrl: "https://www.youtube.com/watch?v=yNklI26ksV0",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Java divide los datos en dos mundos: Primitivos (valores simples y rápidos como `int`, `boolean`) y Referencias (objetos complejos y flexibles como `String`, `Array`)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Los primitivos son ultra eficientes para la memoria. Las referencias permiten crear estructuras complejas. Confundirlos puede causar errores como `NullPointerException`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Usa primitivos (`int`, `double`) para cálculos matemáticos simples. Usa referencias (Objetos) cuando necesites modelar datos reales (Usuario, Producto) o usar métodos utilitarios."
                },
                {
                    title: "Constantes",
                    text: "Usa la palabra clave `final` para definir valores que no pueden cambiar. Es el equivalente a `const` en otros lenguajes."
                },
                {
                    title: "Lectura de Datos (Scanner)",
                    text: "La clase `Scanner` (del paquete `java.util`) permite leer la entrada del usuario desde la consola (`System.in`)."
                }
            ],
            description: "Primitivos, Referencias, Constantes y Entrada de Datos.",
            code: `// Constante
final double PI = 3.1416;

// Primitivos básicos
int edad = 25;           // Enteros
double precio = 19.99;   // Decimales
boolean activo = true;   // Verdad/Falso
char letra = 'A';        // Un solo carácter ('')

// Referencia (Clase)
String nombre = "Juan";  // Texto ("") - No es primitivo`,
            syntaxDescription: "Reglas de Nombres: Las variables NUNCA pueden empezar por un número. Usa nombres descriptivos (ej: `numeroTelefono` en string, no int, porque no vas a sumar teléfonos).",
            useCases: [
                {
                    title: "Input (Tipos de Lectura)",
                    description: "Diferencia crítica entre leer palabras sueltas o líneas completas.",
                    code: `Scanner scanner = new Scanner(System.in);

System.out.print("Nombre: ");
// next() lee solo hasta el primer espacio "Juan Perez" -> "Juan"
String nombre = scanner.next(); 

// Limpiar el buffer (necesario si vas a usar nextLine después)
scanner.nextLine(); 

System.out.print("Frase favorita: ");
// nextLine() lee todo hasta el Enter
String frase = scanner.nextLine();`
                },
                {
                    title: "Conversión de Tipos (Casting)",
                    description: "Convertir entre tipos de datos numéricos explícita o implícitamente.",
                    code: `double precio = 9.99;
int precioEntero = (int) precio; // Casting explícito (pierde decimales)

int nota = 10;
double notaPromedio = nota; // Implícito (int cabe en double)

String numeroStr = "123";
int numero = Integer.parseInt(numeroStr); // Parsing`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Wrappers",
                    content: "Cada primitivo tiene su 'hermano mayor' objeto (int -> Integer, double -> Double). Úsalos cuando necesites `null` o guardarlos en Colecciones (List, Map).",
                    code: "int a = null; // ❌ Error de compilación\nInteger b = null; // ✅ Válido"
                },
                {
                    type: "error",
                    title: "Desbordamiento (Overflow)",
                    content: "Los primitivos tienen un límite. Si sumas 1 al máximo valor de `int`, dará la vuelta y se convertirá en negativo.",
                    code: "int max = 2147483647;\nSystem.out.println(max + 1); // -2147483648"
                },
                {
                    type: "recommendation",
                    title: "BigDecimal",
                    content: "Para dinero, NUNCA uses `double` o `float` por problemas de precisión. Usa `BigDecimal`.",
                    code: "BigDecimal precio = new BigDecimal(\"19.99\");"
                }
            ]
        },
        {
            id: "operadores",
            title: "Operadores",
            videoUrl: "https://www.youtube.com/watch?v=Qg5i1AJDaOA",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Símbolos especiales (+, -, &&, ==) que realizan cálculos o comparaciones. Java es estricto: no puedes sumar un número y un texto esperando una suma matemática (los concatena)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Son los ladrillos básicos de la lógica. Entender la diferencia entre `==` (compara referencias) y `.equals()` (compara contenido) en objetos es vital en Java."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En casi todas las líneas de código: matemáticas, condiciones lógicas y asignaciones."
                }
            ],
            description: "Herramientas para manipulación y comparación de datos.",
            code: `int a = 10, b = 3;
int suma = a + b;       // 13
int modulo = a % b;     // 1 (residuo)
boolean mayor = a > b;  // true
boolean logica = (a > 5) && (b < 5); // true`,
            syntaxDescription: "Es como una calculadora estricta. Si usas `==` para comparar dos personas gemelas (objetos), Java te dirá 'Falso' porque son dos cuerpos distintos, aunque se vean iguales. Debes preguntar '¿Son genéticamente iguales?' (`.equals()`) para que diga 'Verdad'.",
            useCases: [
                {
                    title: "Operador Ternario",
                    description: "Una forma concisa de escribir una sentencia if-else simple en una línea.",
                    code: `int edad = 18;
String estado = (edad >= 18) ? "Adulto" : "Menor";

// Equivalente a:
/*
if (edad >= 18) estado = "Adulto";
else estado = "Menor";
*/`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Comparar Strings con ==",
                    content: "El operador `==` compara referencias de memoria, no contenido. Para comparar textos, usa SIEMPRE `.equals()`.",
                    code: `String a = new String("Hola");\nString b = new String("Hola");\nSystem.out.println(a == b);      // false\nSystem.out.println(a.equals(b)); // true`
                },
                {
                    type: "idea",
                    title: "Cortocircuito (&& y ||)",
                    content: "Java es perezoso. Si en `A && B`, A es falso, Java ni siquiera evalúa B (útil para evitar NullPointerExceptions).",
                    code: "if (obj != null && obj.metodo()) { ... } // Seguro"
                }
            ]
        },
        {
            id: "condicionales",
            title: "Condicionales",
            videoUrl: "https://www.youtube.com/watch?v=H4GZAGJ5-2w",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Estructuras de control (`if`, `switch`) que permiten al programa tomar decisiones. Java 14+ introdujo el 'Switch Expression', que es mucho más limpio y poderoso."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Sin condicionales, un programa sería una línea recta aburrida. Permiten reaccionar a datos variables. El Switch `->` moderno evita errores clásicos como olvidar el `break`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Usa `if` para condiciones booleanas simples o rangos. Usa `switch` cuando compares una variable contra valores fijos (enums, strings, enteros)."
                }
            ],
            description: "Control de flujo: If-Else y Switch moderno.",
            code: `int hora = 14;

if (hora < 12) {
    System.out.println("Buenos días");
} else if (hora < 18) {
    System.out.println("Buenas tardes");
} else {
    System.out.println("Buenas noches");
}`,
            syntaxDescription: "Son los guardias de tráfico de tu código. El `if` es un policía que dice 'Si tienes pase (true), pasa; si no, vete por allá'. El `switch` moderno es como un centro de clasificación de correo eficiente: miras el código postal (variable) y lo tiras directamente al contenedor correcto (flecha ->) sin riesgo de que caiga en el del vecino.",
            useCases: [
                {
                    title: "Switch Expression Moderno",
                    description: "Uso de switch para asignar valores directamente y manejar múltiples casos.",
                    code: `String dia = "LUNES";

String tipoDia = switch (dia) {
    case "SABADO", "DOMINGO" -> "Fin de semana";
    case "LUNES", "VIERNES" -> "Cerca del descanso";
    default -> "Día laboral";
};

System.out.println(tipoDia);`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Switch Moderno (Arrow)",
                    content: "Prefiere siempre la sintaxis `->` introducida en Java 14. No necesita `break` y evita el 'fall-through' accidental (que se ejecuten casos siguientes por error).",
                    code: "String res = switch(x) {\n    case 1 -> \"Uno\";\n    default -> \"Otro\";\n};"
                },
                {
                    type: "idea",
                    title: "Llaves en bloques if",
                    content: "Aunque `if (cond) linea;` es válido, SIEMPRE usa llaves `{}`. Evita errores graves al refactorizar o añadir líneas después.",
                    code: "// ❌ Riesgoso\nif (admin) access = true;\n\n// ✅ Seguro\nif (admin) {\n    access = true;\n}"
                }
            ]
        },
        {
            id: "bucles",
            title: "Bucles",
            videoUrl: "https://www.youtube.com/watch?v=H4GZAGJ5-2w",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Mecanismos para repetir código. `for` tradicional (control total del índice), `for-each` (ideal para listas) y `while` (basado en condición)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evitan copiar y pegar código n veces. El `for-each` es especialmente valioso en Java porque elimina el riesgo de 'IndexOutOfBoundsException' al leer colecciones."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Usa `for-each` el 90% del tiempo para leer listas. Usa `for` normal si necesitas el índice (i). Usa `while` si no sabes cuántas veces se va a repetir."
                }
            ],
            description: "Iteración y repetición de tareas.",
            code: `// For tradicional
for (int i = 1; i <= 5; i++) {
    System.out.println("Contador: " + i);
}

// While
int k = 0;
while (k < 5) {
    System.out.println(k);
    k++;
}`,
            syntaxDescription: "`for` es como dar vueltas a una pista de atletismo sabiendo que tienes que correr 10k: cuentas las vueltas. `for-each` es como repartir cartas en una mesa: tomas cada carta del mazo hasta que se acaban, sin contar cuántas son. `while` es como comer: sigues comiendo *mientras* tengas hambre.",
            useCases: [
                {
                    title: "Recorrer Colecciones (For-Each)",
                    description: "La forma más común y limpia de iterar listas o arrays.",
                    code: `String[] frutas = {"Manzana", "Banana", "Naranja"};

for (String fruta : frutas) {
    if (fruta.equals("Banana")) {
        System.out.println("¡Encontré la banana!");
        break; // Detener búsqueda
    }
    System.out.println("Revisando: " + fruta);
}`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Modificar en For-Each",
                    content: "No puedes eliminar o agregar elementos a una colección mientras la recorres con un `for-each` (lanza `ConcurrentModificationException`). Usa un `Iterator` explícito o `removeIf()`.",
                    code: "// ❌ Explota\nfor(String s : lista) { lista.remove(s); }"
                },
                {
                    type: "goodPractice",
                    title: "Foreach Functional",
                    content: "En Java moderno, puedes usar `.forEach()` con lambdas para una sintaxis más limpia.",
                    code: "lista.forEach(item -> System.out.println(item));"
                }
            ]
        },
        {
            id: "metodos",
            title: "Métodos",
            videoUrl: "https://www.youtube.com/watch?v=RiX-1B1okoA",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Bloques de código con nombre que realizan una acción. En Java, siempre deben pertenecer a una clase. Definen sus entradas (parámetros) y su salida (tipo de retorno, o `void`)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Son la base de la reutilización. La sobrecarga (overloading) permite que un método 'imprimir' funcione tanto con texto como con números, facilitando la vida al programador."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que tengas código duplicado o una lógica compleja que merezca un nombre propio para ser entendida."
                }
            ],
            description: "Modularización y reutilización de lógica.",
            code: `public static double calcularArea(double radio) {
    return Math.PI * radio * radio;
}

// Llamada
double area = calcularArea(5.0);`,
            syntaxDescription: "Un método es como una máquina en una fábrica. Tiene una entrada (embudo), proceso interno, y una salida (cinta transportadora). Si la máquina está etiquetada como `void` (vacío), es porque hace algo (como triturar) pero no te devuelve ningún producto nuevo al final.",
            useCases: [
                {
                    title: "Sobrecarga de Métodos",
                    description: "Crear variantes de un método para manejar diferentes tipos de entrada.",
                    code: `public class Impresora {
    public void imprimir(String texto) {
        System.out.println("Texto: " + texto);
    }
    
    public void imprimir(int numero) {
        System.out.println("Número: " + numero);
    }
    
    public void imprimir(String texto, int copias) {
        for(int i=0; i<copias; i++) imprimir(texto);
    }
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Principio de Responsabilidad Única",
                    content: "Un método debe hacer una sola cosa y hacerla bien. Si tu método se llama `calcularImpuestoYEnviarEmailYGuardarLog()`, divídelo en tres.",
                    code: "// ❌ calcularTodo();\n\n// ✅\ncalcularImpuesto();\nenviarEmail();\nguardarLog();"
                },
                {
                    type: "recommendation",
                    title: "Documentación Javadoc",
                    content: "Acostúmbrate a comentar tus métodos públicos con `/** ... */`. Los IDEs te mostrarán esa ayuda flotante al usarlos.",
                    code: "/**\n * Calcula el área de un círculo.\n * @param radio El radio en metros.\n * @return Área en metros cuadrados.\n */"
                }
            ]
        },
        {
            id: "var",
            title: "Var (Inferencia)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "`var` permite que Java adivine el tipo de la variable por ti basándose en lo que hay a la derecha del igual. No es tipado dinámico; es inferencia de tipos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Elimina la redundancia. En lugar de escribir `ArrayList<String> list = new ArrayList<String>()` (repetitivo), escribes `var list = new ArrayList<String>()`. Mucho más limpio."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando el tipo es obvio a simple vista. Evítalo si necesitas ver el tipo para entender el código."
                }
            ],
            description: "Reducción de verbosidad mediante inferencia de tipos.",
            code: `// Antes
ArrayList<String> lista = new ArrayList<String>();

// Con var
var lista = new ArrayList<String>(); // Infiere ArrayList<String>
var stream = lista.stream();         // Infiere Stream<String>
var contador = 0;                    // Infiere int`,
            syntaxDescription: "Es como usar una etiquetadora inteligente en la mudanza. En lugar de escribir manualmente 'Libros' en la caja, simplemente metes libros dentro y la etiquetadora escanea el contenido y escribe 'Libros' por ti. Ahorras tiempo, pero la caja sigue siendo solo para libros.",
            useCases: [
                {
                    title: "Limpieza en Tipos Genéricos",
                    description: "Simplifica la declaración de variables con tipos anidados complejos.",
                    code: `// Verboso
Map<String, List<Integer>> mapaComplejo = new HashMap<>();

// Limpio
var mapaComplejo = new HashMap<String, List<Integer>>();

// Uso en bucles for-each
for (var entrada : mapaComplejo.entrySet()) {
    System.out.println(entrada.getKey());
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Sigue siendo Tipado Estático",
                    content: "`var` no convierte a Java en JavaScript. La variable sigue teniendo un tipo fijo, solo que el compilador lo escribe por ti. No puedes cambiar el tipo después.",
                    code: "var x = 10; // Es int\n// x = \"Hola\"; // ❌ Error de compilación"
                },
                {
                    type: "goodPractice",
                    title: "Legibilidad ante todo",
                    content: "Usa `var` cuando la parte derecha sea obvia (`new ArrayList()`). Evítalo si oscurece el código (`var resultado = metodoMisterioso()`).",
                    code: "var list = new ArrayList<String>(); // ✅ Claro\nvar x = getVal(); // ❌ ¿Qué es x?"
                }
            ]
        }
    ]
};
