export const funcionalCategory = {
    title: "4. Programación Funcional",
    topics: [
        {
            id: "lambdas",
            title: "Expresiones Lambda",
            videoUrl: "https://www.youtube.com/watch?v=Akdh_Kis3GI",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una forma corta de guardar una función en una variable. `(a, b) -> a + b`. Es código que puedes pasar de mano en mano."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Hace el código mucho más limpio. Antes de Java 8, para pasar una acción tenías que crear una 'Clase Anónima' gigante. Ahora es una línea."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Principalmente al trabajar con Colecciones (Streams) o eventos. Ej: 'Haz esto con cada elemento de la lista'."
                }
            ],
            description: "Funciones anónimas concisas.",
            code: `// Interfaz Funcional
interface Operacion {
  int ejecutar(int a, int b);
}

// Implementación con Lambda
Operacion suma = (a, b) -> a + b;
System.out.println(suma.ejecutar(5, 3)); // 8`,
            syntaxDescription: "Es como una nota adhesiva (Post-it) con instrucciones. En lugar de contratar a un empleado entero (Clase) y darle uniforme solo para que sume dos números, escribes 'Suma esto' en el Post-it (Lambda) y se lo pegas al encargado. Rápido y desechable.",
            useCases: [
                {
                    title: "Antes de Java 8: Clases Anónimas",
                    description: "Lo que teníamos que sufrir para pasar comportamiento antes de las lambdas.",
                    code: `// Típico listener de botón antiguo
boton.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Click!");
    }
});

// VS Lambda moderno
boton.addActionListener(e -> System.out.println("Click!"));`
                },
                {
                    title: "Uso en Colecciones (forEach)",
                    description: "Iterar listas de forma funcional.",
                    code: `List<String> nombres = List.of("Ana", "Bob", "Cid");

// Consumer lambda
nombres.forEach(nombre -> System.out.println("Hola " + nombre));

// Ordenar con lambda comparator
nombres.sort((n1, n2) -> n1.length() - n2.length());`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Variables Finales",
                    content: "Las lambdas solo pueden acceder a variables locales si estas son 'final' o 'efectivamente final'. No puedes modificar una variable externa desde dentro de una lambda.",
                    code: "int contador = 0;\n// ❌ Error: Variable usada en lambda debe ser final\n// list.forEach(x -> contador++);"
                },
                {
                    type: "goodPractice",
                    title: "Brevedad",
                    content: "Si tu lambda tiene más de 3 líneas, mejor extrae esa lógica a un método privado y usa una referencia a método.",
                    code: "// ❌ Larga\nlist.forEach(x -> {\n    lógica_compleja_1;\n    lógica_compleja_2;\n});\n\n// ✅ Corta\nlist.forEach(this::procesarX);"
                }
            ]
        },
        {
            id: "streams",
            title: "Streams API",
            videoUrl: "https://www.youtube.com/watch?v=h_dhDW0GGjY",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una tubería de procesamiento de datos. Los datos entran por un lado (`source`), pasan por filtros y transformaciones (`intermediate ops`) y salen listos por el otro (`terminal op`)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite programar CQUÉ quieres hacer (filtrar, mapear) en lugar de CÓMO hacerlo (bucles for complejos). También facilita el procesamiento paralelo gratis."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que tengas una lista de datos y necesites filtrarla, transformarla, agruparla o calcular totales."
                }
            ],
            description: "Procesamiento declarativo de datos.",
            code: `List<Integer> numeros = List.of(1, 2, 3, 4, 5, 6);

// Filtrar pares, elevar al cuadrado y sumar
int sumaParesCuadrados = numeros.stream()
  .filter(n -> n % 2 == 0)
  .mapToInt(n -> n * n)
  .sum();
  
System.out.println(sumaParesCuadrados); // 4 + 16 + 36 = 56`,
            syntaxDescription: "Imagina una fábrica embotelladora. Las botellas viajan por una cinta transportadora. Una máquina descarta las rotas (`filter`), otra las pinta (`map`), y al final una caja las empaqueta (`collect`). Tú configuras las máquinas, y la cinta (Stream) se encarga de mover los datos a través de ellas.",
            useCases: [
                {
                    title: "Parallel Streams (Multihilo Fácil)",
                    description: "Usar todos los núcleos del CPU para procesar datos masivos.",
                    code: `List<Integer> datos = List.of(1, 2, 3, 4, 5);

// Procesamiento en paralelo
datos.parallelStream()
     .map(Math::sqrt) // Se ejecuta en múltiples hilos
     .forEach(System.out::println); // ¡Orden NO garantizado!

// Cuándo NO usarlo: Listas pequeñas o tareas que dependen del orden.`
                },
                {
                    title: "Estadísticas y Ordenamiento",
                    description: "Operaciones terminales útiles: count, sorted.",
                    code: `List<String> items = List.of("Z", "A", "B", "A");

long cantidadA = items.stream()
    .filter(s -> s.equals("A"))
    .count(); // 2

List<String> ordenados = items.stream()
    .sorted() // Orden natural (Alfabético)
    .collect(Collectors.toList()); // [A, A, B, Z]`
                },
                {
                    title: "Transformación de Datos Compleja",
                    description: "Convertir una lista de objetos en un mapa agrupado.",
                    code: `class Empleado { String depto; String nombre; /*...*/ }
List<Empleado> empleados = obtenerEmpleados();

// Agrupar empleados por departamento
Map<String, List<Empleado>> porDepto = empleados.stream()
  .collect(Collectors.groupingBy(e -> e.depto));`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Reutilizar Streams",
                    content: "Un Stream es de un solo uso. Una vez que llamas a una operación terminal (`collect`, `sum`), el stream se cierra. Si intentas usarlo de nuevo, lanzará excepción.",
                    code: "Stream<String> s = lista.stream();\ns.forEach(...); \n// s.count(); // 💥 Error: stream has already been operated upon"
                },
                {
                    type: "idea",
                    title: "Lazy Evaluation",
                    content: "Las operaciones intermedias (`filter`, `map`) son perezosas. No se ejecutan hasta que llamas a la operación terminal. Si no recolectas, no procesas nada.",
                    code: "stream.filter(x -> { \n    System.out.println(\"Hi\"); // No imprimirá nada\n    return x > 0; \n});"
                }
            ]
        },
        {
            id: "optional",
            title: "Optional",
            videoUrl: "https://www.youtube.com/watch?v=YJ9c-IOjpCg",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una caja que puede estar llena con un valor o vacía. Reemplaza al infame `null`."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "El error `NullPointerException` es el más común de la historia. `Optional` te obliga a verificar si hay valor antes de usarlo, evitando crasheos sorpresa."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Como valor de retorno de funciones que pueden no encontrar lo que buscan (ej. `buscarUsuarioPorID` puede no encontrar nada)."
                }
            ],
            description: "Contenedor seguro para valores opcionales.",
            code: `Optional<String> posibleNombre = buscarNombreEnBD(123);

// Si existe, imprimirlo
posibleNombre.ifPresent(System.out::println);

// Obtener valor o default
String valor = posibleNombre.orElse("Desconocido");

// Lanzar excepcion si no existe
String necesario = posibleNombre.orElseThrow();`,
            syntaxDescription: "Es como el gato de Schrödinger, pero seguro. Tienes una caja. En lugar de meter la mano a ciegas para sacar el gato y que te muerda (error null), `Optional` te obliga a preguntar primero: '¿Hay gato?'. Si sí, lo sacas. Si no, te vas tranquilo.",
            useCases: [
                {
                    title: "Encadenamiento Seguro (Chaining)",
                    description: "Transformar valores solo si existen.",
                    code: `Optional<Usuario> usuario = obtenerUsuario();

String ciudad = usuario
  .map(u -> u.getDireccion()) // Si u es null, no ejecuta esto
  .map(d -> d.getCiudad())    // Si direcc es null, no ejecuta esto
  .orElse("Ciudad desconocida");`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "No abusar de Optional",
                    content: "Usa `Optional` SOLO para retornos de métodos. NO lo uses como parámetros de métodos ni como campos de clase (no es serializable y añade complejidad innecesaria).",
                    code: "public Optional<User> find() { ... }"
                },
                {
                    type: "error",
                    title: "Optional.get() Directo",
                    content: "Llamar a `.get()` sin verificar `.isPresent()` es lo mismo que tener un NullPointerException. Usa mejor `.orElse()`, `.orElseThrow()` o `.ifPresent()`.",
                    code: "// opt.get(); // ❌ Riesgo\nopt.orElseThrow(); // ✅"
                }
            ]
        },
        {
            id: "method-references",
            title: "Referencias a Métodos",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Atajos para Lambdas. Si tu lambda solo hace una cosa, y esa cosa es llamar a un método ya existente, usa `::`."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Código más limpio. `System.out::println` se lee mejor que `x -> System.out.println(x)`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que tu lambda sea una simple redirección a otro método."
                }
            ],
            description: "Sintaxis compacta para lambdas.",
            code: `List<String> mensajes = List.of("a", "b", "c");

// Lambda
mensajes.forEach(s -> System.out.println(s));

// Method Reference
mensajes.forEach(System.out::println);`,
            syntaxDescription: "Es como decir 'Haz lo que dice él'. En vez de explicar paso a paso qué hacer, señalas a alguien que ya sabe hacerlo (`::`) y dices 'Pásale el trabajo a él'.",
            useCases: [
                {
                    title: "Tipos de Referencias",
                    description: "Constructor y métodos estáticos.",
                    code: `// Constructor Reference (Supplier)
Supplier<List<String>> listaFactory = ArrayList::new;

// Static Method Reference
Function<String, Integer> parser = Integer::parseInt;
Integer num = parser.apply("123");`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Preferencia",
                    content: "Siempre que los argumentos de la lambda coincidan exactamente con los del método, usa referencia (`::`). Es más legible y el compilador lo optimiza mejor.",
                    code: "list.forEach(System.out::println);"
                },
                {
                    type: "idea",
                    title: "Tipos de Referencia",
                    content: "Existen 4 tipos: Estáticos (`Integer::parseInt`), Instancia particular (`System.out::println`), Instancia arbitraria (`String::toLowerCase`) y Constructor (`ArrayList::new`).",
                    code: "String::toUpperCase"
                }
            ]
        },
        {
            id: "functional-interfaces",
            title: "Interfaces Funcionales",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Interfaces con UN solo método abstracto. Son las 'formas' que encajan con las lambdas."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Entender `Predicate` (filtro), `Function` (map), `Consumer` (forEach) y `Supplier` (lazy load) es vital para dominar la API de Streams."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando escribas métodos que acepten comportamientos como parámetro. Ej: un método `filtrar` que acepte una regla de filtrado cualquiera."
                }
            ],
            description: "Tipos base para programación funcional.",
            code: `// Predicate: Evaluar condición
Predicate<String> esLargo = s -> s.length() > 10;

// Function: Transformar
Function<String, Integer> longitud = String::length;

// Consumer: Efecto secundario
Consumer<String> imprimir = System.out::println;`,
            syntaxDescription: "Es la 'oferta de empleo'. Dice 'Busco a alguien que sepa hacer UNA cosa específica (ej. Transformar Strings en Enteros)'. La Lambda es la persona que llega y demuestra saber hacerlo. El `Function<String, Integer>` es el nombre del puesto.",
            useCases: [
                {
                    title: "Composición de Funciones",
                    description: "Encadenar lógica funcional compleja.",
                    code: `Predicate<String> noVacio = s -> !s.isEmpty();
Predicate<String> empiezaConA = s -> s.startsWith("A");

// Componer predicados
Predicate<String> valido = noVacio.and(empiezaConA);

System.out.println(valido.test("Avión")); // true
System.out.println(valido.test("Barco")); // false`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Anotación @FunctionalInterface",
                    content: "Si creas tu propia interfaz funcional, anótala con `@FunctionalInterface`. Así el compilador te avisará si por error añades un segundo método abstracto.",
                    code: "@FunctionalInterface\ninterface X { void handle(); }"
                },
                {
                    type: "recommendation",
                    title: "Standards primero",
                    content: "Antes de crear `MiFuncionRara`, revisa el paquete `java.util.function`. Seguramente ya existe lo que necesitas (`BiFunction`, `UnaryOperator`, `Supplier`, etc.).",
                    code: "java.util.function.Predicate"
                }
            ]
        }
    ]
};
