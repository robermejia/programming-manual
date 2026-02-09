export const flashcardsCategory = {
    title: "7. Fichas de Repaso",
    isFlashcard: true,
    topics: [
        {
            id: "pseint-flashcards-fundamentals",
            title: "Fundamentos y Conceptos Básicos",
            description: "22 tarjetas sobre algoritmos, PSeInt, variables y tipos de datos.",
            cards: [
                { q: "¿Qué es la programación?", a: "Es el proceso de creación de software o programas informáticos que se ejecutan en dispositivos electrónicos." },
                { q: "¿Qué es un algoritmo en el contexto de la programación?", a: "Es un conjunto ordenado y preciso de pasos o instrucciones que resuelven un problema o realizan una tarea específica." },
                { q: "Una _____ se refiere a una acción o paso individual dentro de un algoritmo.", a: "instrucción" },
                { q: "¿Qué es el pseudocódigo?", a: "Es una forma de escribir instrucciones de programación utilizando un lenguaje simplificado y cercano al lenguaje humano, como el que se usa en PSeInt." },
                { q: "¿Para qué sirve la herramienta PSeInt?", a: "Es un intérprete de pseudocódigo que permite practicar los conceptos básicos de programación y diseñar diagramas de flujo." },
                { q: "En PSeInt, ¿qué comando se utiliza para mostrar datos o texto en la consola?", a: "El comando `Escribir`." },
                { q: "En programación, un texto encerrado entre comillas (dobles o simples) se conoce como _____ o cadena de caracteres.", a: "string" },
                { q: "¿Qué es el flujo de ejecución de un programa?", a: "Es el orden en que se ejecutan las instrucciones de un algoritmo, generalmente de arriba hacia abajo, línea por línea." },
                { q: "¿Qué es un diagrama de flujo?", a: "Es una representación gráfica que utiliza símbolos estandarizados para describir los pasos y el flujo de ejecución de un algoritmo." },
                { q: "¿Qué es una variable en programación?", a: "Es un espacio de memoria reservado para guardar datos que pueden cambiar durante la ejecución de un programa." },
                { q: "¿Qué es una constante en programación?", a: "Es un contenedor para un dato cuyo valor es fijo y no debe cambiar durante la ejecución del programa." },
                { q: "¿Cuál es la convención en PSeInt y Python para nombrar una constante?", a: "Escribir su nombre completamente en mayúsculas (por ejemplo, `NUMERO_PI`)." },
                { q: "Menciona los cuatro tipos de datos principales en PSeInt.", a: "Entero (o Número), Real, Carácter (o Cadena) y Lógico." },
                { q: "¿Qué tipo de dato se utiliza para almacenar números sin decimales?", a: "El tipo de dato `Entero` (o `Número`)." },
                { q: "¿Qué tipo de dato se utiliza para almacenar números con decimales (de punto flotante)?", a: "El tipo de dato `Real`." },
                { q: "¿Qué tipo de dato se utiliza para almacenar secuencias de texto?", a: "El tipo de dato `Caracter` (o `Cadena`)." },
                { q: "¿Qué dos únicos valores puede almacenar una variable de tipo `Lógico`?", a: "`Verdadero` y `Falso`." },
                { q: "En PSeInt, ¿qué comando se utiliza para declarar una o más variables y especificar su tipo?", a: "El comando `Definir`." },
                { q: "¿Qué acción realiza el comando `Leer` en PSeInt?", a: "Captura un valor introducido por el usuario en la consola y lo asigna a una variable." },
                { q: "La acción de crear una variable, especificando su nombre y tipo pero sin darle un valor inicial, se llama _____.", a: "declaración o definición" },
                { q: "La acción de dar un valor inicial a una variable por primera vez se llama _____.", a: "inicialización" },
                { q: "¿Qué sintaxis se utiliza en PSeInt para añadir comentarios de una sola línea al código?", a: "Se utilizan dos barras diagonales (`//`)." }
            ]
        },
        {
            id: "pseint-flashcards-operators",
            title: "Operadores y Lógica",
            description: "8 tarjetas sobre operadores aritméticos, relacionales y lógicos.",
            cards: [
                { q: "En PSeInt, el operador de asignación que guarda el valor de la derecha en la variable de la izquierda se representa con _____.", a: "`<-` (menor que seguido de un guion)" },
                { q: "¿Cuál es el operador aritmético para calcular el resto de una división (módulo) en PSeInt?", a: "El operador `MOD` o `%`." },
                { q: "¿Cuál es el operador aritmético para calcular la potencia en PSeInt?", a: "El operador `^` (acento circunflejo)." },
                { q: "¿Qué operador relacional se utiliza para comparar si dos valores son iguales?", a: "El operador `==` (doble igual) es la buena práctica, aunque PSeInt también acepta `=`." },
                { q: "¿Qué operador relacional se utiliza para comprobar si dos valores son diferentes?", a: "El operador `<>` o `!=`." },
                { q: "El operador lógico `Y` (AND) devuelve verdadero únicamente si...", a: "todas las condiciones que une son verdaderas." },
                { q: "El operador lógico `O` (OR) devuelve verdadero si...", a: "al menos una de las condiciones que une es verdadera." },
                { q: "¿Qué hace el operador lógico `NO` (NOT)?", a: "Invierte el valor lógico de una expresión; si era verdadero lo convierte en falso, y viceversa." }
            ]
        },
        {
            id: "pseint-flashcards-control-flow",
            title: "Estructuras de Control",
            description: "13 tarjetas sobre condicionales (SI, SEGUN) y bucles (PARA, MIENTRAS, REPETIR).",
            cards: [
                { q: "¿Qué son las estructuras de control de flujo?", a: "Son construcciones como condicionales y bucles que permiten alterar el orden de ejecución lineal de un programa." },
                { q: "¿Para qué sirve la estructura condicional `Si-Entonces-Sino`?", a: "Para ejecutar un bloque de código si una condición es verdadera y, opcionalmente, otro bloque si es falsa." },
                { q: "En la estructura `Si-Entonces-Sino`, ¿qué parte se ejecuta si la expresión lógica es falsa?", a: "La parte del `Sino`." },
                { q: "¿Cuál es el propósito de la estructura condicional `Segun` (switch)?", a: "Ejecutar uno de varios bloques de código dependiendo del valor de una única variable o expresión." },
                { q: "En una estructura `Segun`, ¿qué bloque de código se ejecuta si el valor de la variable no coincide con ninguna de las opciones listadas?", a: "El bloque `De Otro Modo`." },
                { q: "¿Qué es un bucle en programación?", a: "Es una estructura que permite repetir la ejecución de un bloque de código múltiples veces mientras se cumpla una condición." },
                { q: "A cada repetición del bloque de código de un bucle se le llama _____.", a: "iteración" },
                { q: "¿Cuándo se considera que un bucle es \"determinado\"?", a: "Cuando se conoce de antemano el número exacto de veces que se va a ejecutar." },
                { q: "¿Qué tipo de bucle en PSeInt es ideal para iteraciones determinadas, donde se conoce el inicio, el fin y el paso?", a: "El bucle `Para` (equivalente al bucle `for`)." },
                { q: "En el bucle `Para`, la cláusula `Con Paso` se utiliza para...", a: "especificar el valor del incremento o decremento del contador en cada iteración." },
                { q: "¿Para qué se utiliza principalmente el bucle `Mientras` (while)?", a: "Para repetir un bloque de código mientras una condición sea verdadera, especialmente cuando no se sabe el número exacto de iteraciones." },
                { q: "¿Cuál es la característica principal que diferencia al bucle `Repetir-Hasta Que` (do-while) del bucle `Mientras`?", a: "El bucle `Repetir-Hasta Que` siempre se ejecuta al menos una vez, ya que la condición se evalúa al final." },
                { q: "¿Qué es un bucle infinito y cuál es una causa común?", a: "Es un bucle que nunca termina de ejecutarse, a menudo causado por una condición de salida que nunca se vuelve falsa o por no actualizar la variable de control." }
            ]
        },
        {
            id: "pseint-flashcards-advanced",
            title: "Arreglos, Funciones y Buenas Prácticas",
            description: "29 tarjetas sobre arreglos, subprocesos, funciones predefinidas y consejos generales.",
            cards: [
                { q: "¿Qué es un arreglo (o array) en programación?", a: "Es una estructura de datos que permite almacenar una colección de valores del mismo tipo en una sola variable, accesibles mediante un índice." },
                { q: "En PSeInt, ¿qué comando se usa para establecer el tamaño (número de elementos) de un arreglo?", a: "El comando `Dimension`." },
                { q: "Si un arreglo se dimensiona con `Dimension mi_arreglo[5]`, ¿cuáles son los índices válidos para acceder a sus elementos?", a: "Los índices válidos son del 1 al 5 en PSeInt (aunque en muchos otros lenguajes sería de 0 a 4)." },
                { q: "¿Qué es un arreglo multidimensional?", a: "Es un arreglo de más de una dimensión, que permite almacenar datos en una estructura de filas y columnas (como una tabla o matriz)." },
                { q: "¿Qué es una función o subproceso en programación?", a: "Es un bloque de código reutilizable que realiza una tarea específica y que puede ser llamado desde otras partes del programa." },
                { q: "En una función, los _____ son las variables listadas en la definición de la función.", a: "parámetros" },
                { q: "En una función, los _____ son los valores reales que se pasan a la función cuando es llamada.", a: "argumentos" },
                { q: "Cuando una función utiliza una `variable de retorno`, ¿qué significa?", a: "Significa que la función devuelve un valor que puede ser utilizado o asignado a una variable en el lugar donde fue llamada." },
                { q: "¿Qué significa pasar un argumento \"por valor\" a una función?", a: "Significa que se pasa una copia del valor de la variable, por lo que cualquier cambio dentro de la función no afecta a la variable original." },
                { q: "¿Qué significa pasar un argumento \"por referencia\" a una función?", a: "Significa que se pasa la dirección de memoria de la variable, por lo que los cambios dentro de la función sí afectan a la variable original." },
                { q: "¿Qué son las funciones predefinidas de un lenguaje de programación?", a: "Son funciones que ya vienen incluidas en el lenguaje para realizar tareas comunes, como operaciones matemáticas o manipulación de cadenas." },
                { q: "En PSeInt, ¿qué hace la función predefinida `Longitud(cadena)`?", a: "Devuelve el número de caracteres que tiene la cadena de texto pasada como argumento." },
                { q: "En PSeInt, ¿qué hace la función predefinida `Azar(n)`?", a: "Retorna un número entero aleatorio entre 0 y n-1." },
                { q: "En PSeInt, ¿qué hace la función predefinida `Raiz(x)`?", a: "Calcula y devuelve la raíz cuadrada del número x." },
                { q: "Para configurar PSeInt con reglas más estrictas y similares a lenguajes de programación formales, se recomienda usar el perfil _____.", a: "Estricto" },
                { q: "¿Cuál es la extensión de archivo para los algoritmos guardados en PSeInt?", a: "La extensión es `.psc`." },
                { q: "¿Qué representa la \"entrada\" de datos en un programa?", a: "Significa que se introducen datos en el algoritmo desde el exterior, por ejemplo, lo que un usuario escribe en la consola." },
                { q: "¿Qué representa la \"salida\" de datos en un programa?", a: "Son los datos que un programa o algoritmo saca hacia el exterior para que el usuario los vea, como un mensaje en la consola." },
                { q: "En el diagrama de flujo, una flecha apuntando hacia afuera de un símbolo de proceso generalmente representa una _____ de datos.", a: "salida" },
                { q: "En el diagrama de flujo, una flecha apuntando hacia adentro de un símbolo de proceso generalmente representa una _____ de datos.", a: "entrada" },
                { q: "El proceso de documentar el código para explicar qué hace cada parte se realiza principalmente a través de _____.", a: "comentarios" },
                { q: "¿Qué es la indentación (o sangría) en el código?", a: "Es el uso de espacios o tabulaciones al principio de las líneas para organizar el código y mostrar qué bloques de código pertenecen a otros, mejorando la legibilidad." },
                { q: "En PSeInt, el comando `Escribir \"Hola\", \"Mundo\"` mostrará los dos textos juntos. ¿Qué se puede agregar para que no se peguen?", a: "Añadir un espacio al final del primer string o al principio del segundo: `Escribir \"Hola \", \"Mundo\"`." },
                { q: "En PSeInt, ¿qué opción se puede añadir al comando `Escribir` para que el siguiente `Escribir` no comience en una nueva línea?", a: "La opción `Sin Saltar`." },
                { q: "Una de las características de un buen algoritmo es que debe ser _____, lo que significa que cada paso debe estar claramente definido sin ambigüedades.", a: "preciso" },
                { q: "Una de las características de un buen algoritmo es que debe ser _____, lo que significa que debe terminar en algún momento en condiciones normales.", a: "finito" },
                { q: "¿Qué error común ocurre al intentar acceder a una posición de un arreglo que no existe?", a: "Un error de \"subíndice fuera de rango\"." },
                { q: "En PSeInt, ¿cómo se puede declarar e inicializar una variable en la misma línea sin usar `Definir` (si el perfil no es estricto)?", a: "Directamente con una asignación, como `numero <- 10`, donde PSeInt infiere el tipo de dato." },
                { q: "La habilidad de resolver problemas paso a paso y de forma estructurada, que se fortalece con la programación, se conoce como _____.", a: "pensamiento lógico" }
            ]
        }
    ]
};
