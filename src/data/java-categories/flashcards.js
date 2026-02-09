export const flashcardsCategory = {
    title: "10. Java Flashcards",
    isFlashcard: true,
    topics: [
        {
            id: "java-flashcards-1-21",
            title: "Flashcards: Introducción y Conceptos Básicos",
            description: "21 tarjetas sobre definiciones de programación, JDK/JRE y configuración inicial.",
            cards: [
                { q: "¿Qué es programar, según la definición formal?", a: "Es especificar un conjunto de instrucciones a una computadora para que realice una función de manera automática." },
                { q: "¿Cuál es la función principal de un lenguaje de programación?", a: "Servir como intermediario o traductor entre los humanos y la computadora." },
                { q: "¿Qué significa que Java es un lenguaje 'fuertemente tipado'?", a: "Que todas las variables deben tener un tipo de dato asignado y cumplir con él estrictamente." },
                { q: "Java se utiliza principalmente para aplicaciones de gran envergadura en el mundo _____.", a: "empresarial" },
                { q: "¿Qué característica de Java le permite ejecutarse en diferentes sistemas operativos sin cambios?", a: "Es multiplataforma." },
                { q: "¿Cómo gestiona Java la memoria de forma automática?", a: "A través del 'Garbage Collector' (recolector de basura) y un administrador de memoria." },
                { q: "¿Cuál es la diferencia principal entre Java Standard Edition (JSE) y Java Enterprise Edition (JEE)?", a: "JSE es para aplicaciones de escritorio sencillas, mientras que JEE está orientada a aplicaciones web y empresariales complejas." },
                { q: "El nuevo nombre para Java Enterprise Edition (JEE) a partir de su versión 9 es _____ Enterprise Edition.", a: "Jakarta" },
                { q: "¿Qué es un IDE (Integrated Development Environment)?", a: "Un entorno de desarrollo integrado que incluye un editor de código, herramientas de construcción, depurador y compilador/intérprete." },
                { q: "¿Cuál es la diferencia fundamental entre un IDE y un editor de código simple como Visual Studio Code?", a: "Un IDE es una suite completa de herramientas, mientras que un editor simple puede necesitar plugins para igualar sus funciones." },
                { q: "Término: JRE (Java Runtime Environment)", a: "El conjunto de utilidades necesarias para ejecutar aplicaciones Java en una computadora." },
                { q: "Término: JDK (Java Development Kit)", a: "El kit de desarrollo que necesitan los programadores para crear aplicaciones, el cual incluye el JRE." },
                { q: "¿Qué versión de JDK se recomienda por ser la más estable y utilizada laboralmente?", a: "JDK 17." },
                { q: "¿Cuál es el orden correcto de instalación para las herramientas de desarrollo de Java?", a: "Primero se debe instalar el JDK y luego el IDE." },
                { q: "¿Qué significa que Java es 'Case Sensitive'?", a: "Que distingue entre mayúsculas y minúsculas; 'casa' y 'Casa' son variables diferentes." },
                { q: "En Java, toda línea de código que no sea una estructura debe terminar con un _____.", a: "punto y coma (;)" },
                { q: "Todas las estructuras de código, como clases o métodos, deben comenzar con una llave de apertura ({) y terminar con una de _____.", a: "cierre (})" },
                { q: "Al crear un proyecto de Java Standard Edition en NetBeans, se debe seleccionar la opción 'Java with _____' para una aplicación básica.", a: "Ant" },
                { q: "¿Qué es el 'camelCase' y dónde se recomienda su uso en Java?", a: "Es una convención de nomenclatura (ej. 'HolaMundo') usada para nombres de proyectos y clases." },
                { q: "¿Cuál es el método principal desde donde se ejecuta todo sistema en Java?", a: "El método `main`." },
                { q: "¿Cuál es el comando y atajo en NetBeans para imprimir una línea en la consola?", a: "El comando es `System.out.println()` y el atajo es escribir `sout` + Tab." }
            ]
        },
        {
            id: "java-flashcards-22-40",
            title: "Flashcards: Variables, Tipos y Control de Flujo",
            description: "19 tarjetas sobre tipos primitivos, Scanner, operadores y estructuras if/switch.",
            cards: [
                { q: "¿Qué es una variable en programación?", a: "Es un nombre asociado a una porción de memoria donde se puede guardar un valor." },
                { q: "¿Cuál es la diferencia entre una variable y una constante?", a: "El valor de una variable puede cambiar, mientras que el de una constante es fijo una vez asignado." },
                { q: "¿Qué tipo de dato se usa en Java para números enteros sin decimales?", a: "El tipo de dato `int`." },
                { q: "¿Qué tipo de dato se usa en Java para números con decimales?", a: "El tipo de dato `double`." },
                { q: "¿Qué tipo de dato se usa en Java para valores de verdadero o falso?", a: "El tipo de dato `boolean`." },
                { q: "¿Qué tipo de dato se usa para almacenar un solo carácter, como una letra?", a: "El tipo de dato `char`, y su valor se encierra en comillas simples (')." },
                { q: "¿Por qué `String` no se considera un tipo de dato primitivo en Java?", a: "Porque es una clase (empieza con mayúscula) que tiene sus propios métodos asociados." },
                { q: "Una de las reglas para nombrar variables en Java es que nunca pueden empezar con un _____.", a: "número" },
                { q: "¿Por qué es una buena práctica guardar números de teléfono o DNI como `String` en lugar de `int`?", a: "Porque no se usarán para cálculos y pueden contener caracteres especiales como guiones o espacios." },
                { q: "¿Qué clase se utiliza en Java para leer datos ingresados por el teclado?", a: "La clase `Scanner`." },
                { q: "Para crear un objeto `Scanner` que lea desde el teclado, se utiliza la expresión `new Scanner(_____)`.", a: "`System.in`" },
                { q: "El operador de asignación en Java es el símbolo _____.", a: "=" },
                { q: "Para comparar si dos valores son iguales en una condición, se utiliza el operador relacional _____.", a: "==" },
                { q: "El operador `&&` (AND) en una condición se cumple solo si...", a: "ambas condiciones que une son verdaderas simultáneamente." },
                { q: "El operador `||` (OR) en una condición se cumple si...", a: "al menos una de las condiciones que une es verdadera." },
                { q: "¿Qué hace el operador de negación `!` en Java?", a: "Invierte el valor booleano; lo verdadero lo hace falso y viceversa." },
                { q: "La estructura condicional con bloque alternativo es _____ / _____.", a: "`if` / `else`" },
                { q: "¿Para qué se utiliza la estructura `switch` en Java?", a: "Para permitir múltiples caminos de ejecución basados en el valor de una única variable." },
                { q: "Cada caso dentro de un `switch` debe definir un valor con `case` y terminar con la palabra clave _____.", a: "`break`" }
            ]
        },
        {
            id: "java-flashcards-41-59",
            title: "Flashcards: Programación Funcional y Lambdas",
            description: "19 tarjetas sobre el paradigma funcional, lambdas e interfaces funcionales.",
            cards: [
                { q: "¿Qué es la programación funcional?", a: "Es un paradigma de programación basado en el uso de funciones simples como bloques principales de construcción." },
                { q: "¿A partir de qué versión Java incorporó la programación funcional?", a: "A partir de Java 8 (JDK 1.8)." },
                { q: "Término: Clase Anónima", a: "Una clase que se define e instancia al mismo tiempo sin nombre, útil para usos únicos." },
                { q: "Otro nombre común para las expresiones lambda en Java es _____.", a: "funciones anónimas" },
                { q: "Sintaxis: `(parámetros) -> {sentencias}`", a: "Representa la estructura básica de una expresión lambda en Java." },
                { q: "En una lambda, el lado izquierdo `(parámetros)` son las entradas y el derecho `{sentencias}` representa _____.", a: "la implementación o cuerpo de la función." },
                { q: "¿Qué es una interfaz funcional en Java?", a: "Es un tipo especial de interfaz que tiene un solo método abstracto." },
                { q: "¿Qué anotación se utiliza para marcar explícitamente una interfaz como funcional?", a: "La anotación `@FunctionalInterface`." },
                { q: "Término: Referencia a Métodos (Method Reference)", a: "Forma compacta de una lambda para ejecutar un método existente usando el operador `::`." },
                { q: "¿Qué son los 'streams' en Java?", a: "Una secuencia de elementos de una colección que permite operaciones funcionales sobre ellos." },
                { q: "Las operaciones de streams se dividen en dos tipos: operaciones _____ y operaciones _____.", a: "intermedias / terminales" },
                { q: "¿Cuál es la función de la operación intermedia `filter` en un stream?", a: "Permite seleccionar elementos de un stream que cumplen con un criterio específico." },
                { q: "¿Para qué se utiliza la operación intermedia `map` en un stream?", a: "Para transformar cada elemento del stream en otro valor o tipo." },
                { q: "La operación terminal `forEach` en un stream se utiliza para...", a: "realizar una acción en cada elemento del stream (ej. imprimirlo)." },
                { q: "¿Qué es un 'collector' en la API de streams de Java?", a: "Herramienta para recolectar resultados de un stream en una estructura final (List, Map, etc.)." },
                { q: "¿Qué hace el método `collect(Collectors.toList())`?", a: "Agrupa los elementos de un stream en una nueva `List`." },
                { q: "¿Cuál es la particularidad del método `collect(Collectors.toSet())`?", a: "Recolecta los elementos en un `Set`, eliminando automáticamente los duplicados." },
                { q: "¿Para qué sirve el collector `joining(delimitador)`?", a: "Une elementos de un stream de strings en una sola cadena separados por el delimitador." },
                { q: "El collector `groupingBy()` se utiliza para...", a: "agrupar los elementos en un `Map` según un criterio de clasificación." }
            ]
        },
        {
            id: "java-flashcards-60-75",
            title: "Flashcards: Optional, Streams Avanzados y Scanner",
            description: "16 tarjetas sobre el manejo de nulos con Optional, procesamiento paralelo y utilidades de Scanner.",
            cards: [
                { q: "¿Cuál es el propósito principal de la clase `Optional` introducida en Java 8?", a: "Manejar de forma segura valores que pueden ser nulos y evitar `NullPointerException`." },
                { q: "¿Cuál es la diferencia entre un valor `null` y un valor 'vacío' en `Optional`?", a: "`null` es falta de referencia, 'vacío' es un contenedor de Optional existente pero sin valor." },
                { q: "¿Qué método crea un `Optional` que transforma un nulo en un optional vacío?", a: "El método estático `Optional.ofNullable()`." },
                { q: "¿Qué método de `Optional` se utiliza para verificar si un valor está presente?", a: "El método `isPresent()`." },
                { q: "Para obtener el valor contenido dentro de un `Optional`, se debe usar el método _____.", a: "`.get()`" },
                { q: "Término: Parallel Streams", a: "Streams que procesan elementos en paralelo usando múltiples núcleos para mejorar el rendimiento." },
                { q: "¿Cuál es la principal ventaja de usar 'parallel streams'?", a: "Mayor velocidad de procesamiento con grandes volúmenes de datos." },
                { q: "¿Cuál es la principal desventaja o consideración al usar 'parallel streams'?", a: "No garantizan el orden de procesamiento de los elementos." },
                { q: "Para convertir un stream normal en uno paralelo, se utiliza el método _____.", a: "`.parallel()`" },
                { q: "Para crear un stream paralelo directamente desde una colección, se invoca el método _____.", a: "`.parallelStream()`" },
                { q: "En la clase `Scanner`, ¿qué diferencia hay entre `next()` y `nextLine()`?", a: "`next()` lee hasta el primer espacio, `nextLine()` lee toda la línea hasta el salto." },
                { q: "Si tienes una variable `double` y lees con `scanner.nextInt()`, ¿qué debes corregir?", a: "Debes usar el método `scanner.nextDouble()` para leer decimales correctamente." },
                { q: "En `Optional`, ¿para qué sirve el método `orElse(valorPorDefecto)`?", a: "Devuelve el valor si existe, o el `valorPorDefecto` si el Optional está vacío." },
                { q: "La operación terminal `count()` en un stream devuelve un valor de tipo _____.", a: "`long` (el número de elementos)." },
                { q: "El método `sorted()` en un stream sirve para...", a: "ordenar los elementos del stream." },
                { q: "Para realizar ordenamientos personalizados con `sorted()`, se debe pasar un objeto de tipo _____.", a: "`Comparator`" }
            ]
        }
    ]
};
