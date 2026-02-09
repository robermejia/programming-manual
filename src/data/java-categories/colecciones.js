export const coleccionesCategory = {
    title: "3. Colecciones y Métodos de Datos",
    topics: [
        {
            id: "arrays",
            title: "Arrays",
            videoUrl: "https://www.youtube.com/watch?v=6Kh8aRc0eeM",
            content: [
                {
                    title: "¿Qué es?",
                    text: "La estructura más básica para guardar múltiples cosas. Tiene un tamaño FIJO que nace y muere con él. No puedes agrandarlo mágicamente."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es la base de todo. Es ultra rápido leer datos de él, pero muy rígido para situaciones dinámicas."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando sepas EXACTAMENTE cuántos elementos vas a necesitar (ej. días de la semana, coordenadas XYZ, tablero de ajedrez)."
                }
            ],
            description: "Estructuras de almacenamiento de tamaño fijo.",
            code: `// Declaración y dimensionamiento
int[] numeros = new int[5];

// Inicialización directa
String[] colores = {"Rojo", "Verde", "Azul"};

// Acceso
colores[0] = "Amarillo";
System.out.println(colores.length); // 3`,
            syntaxDescription: "Es como una caja de huevos de cartón. Si la caja es de 12 huevos, solo caben 12. No puedes meter el huevo 13 aunque quieras (error), y si se rompe una parte de la caja, no puedes pegarle un pedazo extra. Es rígido.",
            useCases: [
                {
                    title: "Arrays Multidimensionales",
                    description: "Matrices y tablas de datos.",
                    code: `int[][] matriz = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int centro = matriz[1][1]; // 5`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "IndexOutOfBoundsException",
                    content: "El error más clásico. Si tu array tiene tamaño 5, los índices van del 0 al 4. Acceder a `arr[5]` explotará tu programa.",
                    code: "int[] arr = new int[5];\n// System.out.println(arr[5]); // 💥 Crash"
                },
                {
                    type: "idea",
                    title: "Arrays.toString()",
                    content: "Si imprimes un array directamente (`System.out.println(arr)`), verás una dirección de memoria. Usa `Arrays.toString(arr)` para ver el contenido.",
                    code: "int[] n = {1, 2};\nSystem.out.println(Arrays.toString(n)); // [1, 2]"
                }
            ]
        },
        {
            id: "lists",
            title: "Listas (ArrayList vs LinkedList)",
            videoUrl: "https://www.youtube.com/watch?v=dwdAQBchj34",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una lista inteligente que crece sola. `ArrayList` es como un array con superpoderes y `LinkedList` es una cadena de nodos unidos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "La mayoría de datos en la vida real son dinámicos (lista de usuarios, carrito de compras). Las listas manejan ese crecimiento automáticamente."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Usa `ArrayList` el 95% del tiempo (rápido para leer). Usa `LinkedList` solo si vas a estar metiendo y sacando cosas del principio o final constantemente (colas)."
                }
            ],
            description: "Colecciones ordenadas y dinámicas.",
            code: `// ArrayList: Rápido lectura
List<String> frutas = new ArrayList<>();
frutas.add("Manzana");
frutas.add("Pera");
frutas.add(0, "Uva"); // Insertar al inicio

System.out.println(frutas.get(1)); // "Manzana"

// LinkedList: Rápido inserción/borrado extremos
LinkedList<String> cola = new LinkedList<>();
cola.addFirst("Cliente 1");
cola.addLast("Cliente 2");
String atendido = cola.removeFirst();`,
            syntaxDescription: "`ArrayList` es como una hoja de papel infinita donde anotas una lista de tareas; si se acaba el espacio, Java te da una hoja más grande automáticamente. `LinkedList` es como una cadena de personas dándose la mano; para meter a alguien en medio, solo sueltas dos manos y agarras al nuevo, no tienes que mover a todo el mundo de lugar.",
            useCases: [
                {
                    title: "Manipulación de Listas",
                    description: "Operaciones comunes: eliminar, reemplazar y buscar.",
                    code: `List<Integer> numeros = new ArrayList<>(List.of(1, 2, 3, 2, 4));

// Eliminar primera ocurrencia del número 2
numeros.remove(Integer.valueOf(2)); 

// Reemplazar elemento en índice 0
numeros.set(0, 99);

// Comprobar existencia
if (numeros.contains(99)) {
    System.out.println("Lista contiene 99");
}`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "ArrayList por Defecto",
                    content: "Ante la duda, usa siempre `ArrayList`. Es más eficiente en memoria y en acceso aleatorio (`get(i)`). Solo usa `LinkedList` si entiendes perfectamente por qué la necesitas.",
                    code: "List<String> list = new ArrayList<>();"
                },
                {
                    type: "goodPractice",
                    title: "Interfaz List",
                    content: "Declara tus variables como `List` (la interfaz) en lugar de la implementación concreta. Esto te da flexibilidad.",
                    code: "// ✅ Bien\nList<String> l = new ArrayList<>();\n// ⚠️ Menos flexible\nArrayList<String> l = new ArrayList<>();"
                }
            ]
        },
        {
            id: "sets",
            title: "Sets (Conjuntos)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una colección exclusiva: NO admite duplicados. `HashSet` es desordenado pero rápido. `TreeSet` es ordenado."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Garantiza unicidad de datos sin que tengas que programar bucles complejos para verificar 'si ya existe'."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Emails únicos, IDs de usuarios, Inventario de productos (sin repetir)."
                }
            ],
            description: "Colecciones de elementos únicos.",
            code: `// HashSet: Sin orden, muy rápido
Set<String> emails = new HashSet<>();
emails.add("a@test.com");
emails.add("b@test.com");
boolean agregado = emails.add("a@test.com"); // false, ya existe

// TreeSet: Ordenado
Set<Integer> ordenados = new TreeSet<>();
ordenados.add(5);
ordenados.add(1);
ordenados.add(3);
System.out.println(ordenados); // [1, 3, 5]`,
            syntaxDescription: "Es como un álbum de cromos (stickers). Si te sale un cromo repetido, no lo pegas dos veces en el álbum, lo descartas. El álbum (Set) solo tiene una copia de cada cromo, sin importar cuántos sobres abras.",
            useCases: [
                {
                    title: "Eliminar Duplicados de una Lista",
                    description: "Técnica común pasando una lista al constructor de un Set.",
                    code: `List<String> listaConDuplicados = List.of("A", "B", "A", "C", "B");

// Convertir a Set elimina duplicados automáticamente
Set<String> conjuntoUnico = new HashSet<>(listaConDuplicados);

// Volver a lista si se necesita (orden no garantizado)
List<String> listaLimpia = new ArrayList<>(conjuntoUnico);
System.out.println(listaLimpia); // [A, B, C]`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Equals y HashCode",
                    content: "Para que un Set sepa si un objeto está duplicado, tu objeto DEBE implementar correctamente `equals()` y `hashCode()`. Si no, puedes tener dos objetos idénticos duplicados.",
                    code: "public boolean equals(Object o) { ... }\npublic int hashCode() { ... }"
                },
                {
                    type: "goodPractice",
                    title: "Set.of()",
                    content: "Desde Java 9, puedes crear sets inmutables rápidamente: `Set.of(\"A\", \"B\")`. Útil para listas blancas de valores permitidos.",
                    code: "Set<String> set = Set.of(\"ACTIVO\", \"INACTIVO\");"
                }
            ]
        },
        {
            id: "maps",
            title: "Maps (Diccionarios)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un diccionario de datos. Gurda pares Clave -> Valor. Buscas por la clave y obtienes el valor."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es la forma más rápida de encontrar algo. En lugar de recorrer una lista buscando 'Juan', vas directo a su ID."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cachés, Diccionarios de palabras, Tablas de base de datos en memoria, configuraciones (Opción -> Valor)."
                }
            ],
            description: "Almacenamiento Clave-Valor.",
            code: `Map<String, Integer> inventario = new HashMap<>();
inventario.put("Laptop", 10);
inventario.put("Mouse", 50);

// Actualizar valor
inventario.put("Laptop", 9); 

// Obtener valor (o null si no existe)
Integer stock = inventario.get("Laptop");

// Métodos modernos (Java 8+)
inventario.putIfAbsent("Teclado", 5);
int total = inventario.getOrDefault("Monitor", 0);`,
            syntaxDescription: "Es como el guardarropa de un teatro. Tú entregas tu abrigo (Valor) y te dan un número (Clave). Para recuperar tu abrigo, SOLO necesitas el número. No buscas tu abrigo entre todos los abrigos uno por uno, vas directo a la percha con tu número.",
            useCases: [
                {
                    title: "Frecuencia de Palabras",
                    description: "Contar ocurrencias usando merge o compute.",
                    code: `String[] palabras = {"java", "code", "java", "test"};
Map<String, Integer> contador = new HashMap<>();

for (String palabra : palabras) {
    // Opción 1: Verbosa
    /*
    if (contador.containsKey(palabra)) {
        contador.put(palabra, contador.get(palabra) + 1);
    } else {
        contador.put(palabra, 1);
    }
    */
   
    // Opción 2: Elegante
    contador.merge(palabra, 1, Integer::sum);
}
System.out.println(contador); // {java=2, code=1, test=1}`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Claves Mutables",
                    content: "NUNCA uses un objeto que cambia (mutable) como clave de un Map. Si cambias el objeto después de meterlo, el Map puede perderlo para siempre.",
                    code: "user.setName(\"Nuevo\"); // ❌ Si user es key, el Map fallará"
                },
                {
                    type: "idea",
                    title: "Iterar Eficientemente",
                    content: "Si necesitas clave y valor, itera sobre `entrySet()`. Es más rápido que iterar las claves y luego hacer `get()` por cada una.",
                    code: "for (var entry : map.entrySet()) {\n    System.out.println(entry.getKey() + \": \" + entry.getValue());\n}"
                }
            ]
        },
        {
            id: "generics",
            title: "Generics",
            videoUrl: "https://www.youtube.com/watch?v=lkDLJUvy3gk",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Las etiquetas `<T>` que ves por todos lados. Permiten crear clases que funcionen con CUALQUIER tipo de dato, pero de forma segura e individual."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita errores de 'Casting' (tratar de leer un String como Int). El compilador te avisa: 'Eh, esta lista es solo de Manzanas, no metas una Pera'."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que uses Colecciones (`List<String>`) o cuando crees componentes reutilizables (ej. una clase `RespuestaAPI<T>`)."
                }
            ],
            description: "Seguridad de tipos y reutilización de código.",
            code: `// Clase genérica
public class Caja<T> {
    private T contenido;
    public void poner(T t) { contenido = t; }
    public T sacar() { return contenido; }
}

Caja<String> cajaStr = new Caja<>();
cajaStr.poner("Hola");
// cajaStr.poner(123); // Error de compilación`,
            syntaxDescription: "Imagina un tubo de ensayo etiquetado. Si dice 'SANGRE' (<Sangre>), el enfermero (compilador) no te dejará meter orina ahí por error. Antes de los genéricos, todos los tubos decían 'MUESTRA' (Object) y tenías que adivinar o probar qué había dentro, con riesgo de explosión.",
            useCases: [
                {
                    title: "Wildcards Bounded (Acotados)",
                    description: "Aceptar una familia de tipos.",
                    code: `public static double sumarLista(List<? extends Number> lista) {
    double suma = 0;
    for (Number n : lista) {
        suma += n.doubleValue();
    }
    return suma;
}

// Funciona con List<Integer> y List<Double>`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Type Erasure",
                    content: "Los genéricos solo existen al compilar. En tiempo de ejecución (Runtime), Java 'borra' los tipos y todo se vuelve `Object` internamente. Por eso no puedes hacer `new T()`.",
                    code: "// T obj = new T(); // ❌ Borrado en Runtime"
                },
                {
                    type: "goodPractice",
                    title: "El operador Diamante <>",
                    content: "No necesitas repetir el tipo a la derecha: `new ArrayList<>()` es suficiente. El compilador infiere el tipo de la izquierda.",
                    code: "List<String> list = new ArrayList<>();"
                }
            ]
        },
        {
            id: "collections-utils",
            title: "Collections (Utilidades)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una caja de herramientas llena de trucos ya hechos para manipular listas y sets. Ordenar, desordenar, buscar, invertir..."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "No reinventes la rueda. `Collections.sort()` es probablemente más rápido y libre de bugs que cualquier algoritmo de ordenamiento que escribas a mano."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cada vez que necesites alterar el orden o buscar en una colección estándar."
                }
            ],
            description: "Algoritmos estándar para colecciones.",
            code: `List<Integer> numeros = new ArrayList<>(List.of(5, 1, 3, 2, 4));

Collections.sort(numeros); // Ordena [1, 2, 3, 4, 5]
Collections.reverse(numeros); // Invierte [5, 4, 3, 2, 1]
Collections.shuffle(numeros); // Aleatorio`,
            syntaxDescription: "Es como tener un robot asistente de cocina. En lugar de cortar las verduras tú mismo (bucle manual), le dices al robot 'Pica esto' (`Collections.sort`) y él lo hace perfecto en un segundo.",
            useCases: [
                {
                    title: "Colecciones Inmutables",
                    description: "Crear listas de solo lectura desde Java 9.",
                    code: `List<String> fija = List.of("A", "B", "C");
// fija.add("D"); // Lanza UnsupportedOperationException

// Ordenar lista personalizada con Comparator
Collections.sort(personas, (p1, p2) -> p1.edad - p2.edad);`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "UnsupportedOperationException",
                    content: "Las listas creadas con `List.of()` o `Arrays.asList()` suelen ser fijas. Si intentas hacer `.add()` o `.remove()`, te lanzarán este error.",
                    code: "// List.of(1).add(2); // 💥 Error"
                },
                {
                    type: "recommendation",
                    title: "BinarySearch",
                    content: "Si tienes una lista ORDENADA muy grande, usa `Collections.binarySearch()`. Es instantáneo comparado con recorrerla toda.",
                    code: "int idx = Collections.binarySearch(lista, obj);"
                }
            ]
        },
        {
            id: "string-methods",
            title: "Métodos de String",
            videoUrl: "https://www.youtube.com/watch?v=jYNJIesvT48",
            content: [
                {
                    title: "¿Qué es?",
                    text: "`String` no es simple texto, es un objeto poderoso. Tienes docenas de métodos para limpiar, partir, juntar y analizar texto."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "El 90% de los datos que verás son texto. Saber limpiar input de usuario (quitar espacios, mayúsculas) es crítico."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Validación de formularios, formateo de salida, parsing de archivos CSV / Logs."
                }
            ],
            description: "Manipulación avanzada de texto.",
            code: `String texto = "  Hola Java 2025  ";
String limpio = texto.strip(); // "Hola Java 2025"
String upper = limpio.toUpperCase(); // "HOLA JAVA 2025"
boolean vacio = "".isBlank(); // true`,
            syntaxDescription: "El `String` en Java es inmutable (como una estatua de mármol). Si usas `.toUpperCase()`, no 'pintas' sobre la estatua, Java crea una estatua nueva idéntica pero gritando (mayúsculas) y te da esa nueva, dejando la original intacta.",
            useCases: [
                {
                    title: "Procesamiento de Texto Moderno",
                    description: "Métodos útiles de Java 11+.",
                    code: `String multilinea = "Linea 1\nLinea 2";

multilinea.lines()
    .map(String::trim)
    .forEach(System.out::println);
    
String repetido = "Na".repeat(4) + " Batman";
// "NaNaNaNa Batman"`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "StringBuilder en Bucles",
                    content: "Concatenar Strings con `+` dentro de un bucle `for` es lentísimo (crea miles de objetos temporales). Usa `StringBuilder`.",
                    code: "// ❌ Lento\nString s = \"\";\nfor(...) s += \"x\";\n\n// ✅ Rápido\nStringBuilder sb = new StringBuilder();\nfor(...) sb.append(\"x\");"
                },
                {
                    type: "idea",
                    title: "String Pool",
                    content: "Java ahorra memoria reutilizando cadenas idénticas literales. `String a = \"Sol\"; String b = \"Sol\";` apuntan al mismo sitio en memoria.",
                    code: "String a = \"Sol\"; String b = \"Sol\";\nSystem.out.println(a == b); // true"
                }
            ]
        }
    ]
};
