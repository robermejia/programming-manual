import { vocabularyCategory } from './pseint-categories/vocabulary';
import { flashcardsCategory } from './pseint-categories/flashcards';

export const categories = [
    vocabularyCategory,
    // empty

    {
        title: "1. Conceptos Básicos",
        topics: [
            {
                id: "pseint-intro",
                title: "Estructura de un Algoritmo",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Un algoritmo en PSeInt es una secuencia lógica y finita de pasos diseñados para resolver un problema. Se delimita por las palabras clave `Algoritmo` y `FinAlgoritmo`."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Establece la base del pensamiento secuencial. Antes de escribir código complejo, necesitas entender cómo ordenar instrucciones para que una computadora las ejecute correctamente."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Permite plasmar ideas abstractas en un lenguaje semi-formal (pseudocódigo) que es fácil de entender y depurar antes de traducirlo a un lenguaje de programación real."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene usarlo siempre que estés empezando a diseñar una solución. No conviene para aplicaciones finales de producción, ya que PSeInt es una herramienta puramente educativa."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Ninguno. Es el punto de partida ideal para cualquier persona que quiera aprender a programar."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Nombre del Algoritmo",
                        content: "El nombre no debe contener espacios. Usa CamelCase o guiones bajos si necesitas separar palabras.",
                        code: "Algoritmo Mi_Programa // Correcto\nAlgoritmo Mi Programa // Error"
                    }
                ],
                description: "Estructura fundamental de un programa en PSeInt.",
                code: `Algoritmo MiPrimerPrograma
    // Aquí van las instrucciones
    Escribir "Hola Mundo";
FinAlgoritmo`,
                useCases: [
                    {
                        title: "Hola Mundo",
                        description: "El ejemplo más básico para verificar que el entorno funciona correctamente.",
                        code: `Algoritmo Saludo
    Escribir "Bienvenido a PSeInt";
    Escribir "Este es tu primer algoritmo";
FinAlgoritmo`
                    },
                    {
                        title: "Comentarios",
                        description: "Uso de comentarios para documentar el código sin afectar la ejecución.",
                        code: `Algoritmo Comentarios
    // Esto es un comentario de una línea
    Escribir "Los comentarios son invisibles"; // Otro comentario
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-variables",
                title: "Variables y Tipos de Datos",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Las variables son 'contenedores' con nombre que guardan valores en la memoria. Pueden ser de tipo `Entero`, `Real`, `Caracter` o `Logico`."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Introduce el concepto de manejo de memoria y tipos. Enseña que los datos tienen naturalezas distintas y no deben mezclarse sin control."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Evita errores de 'incompatibilidad' (como intentar sumar un nombre con un número) y permite que el programa 'recuerde' información para usarla después."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene usarlas siempre que necesites procesar información dinámica. No conviene usar variables sin definir previamente, ya que causa errores de ejecución."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos básicos de matemáticas y comprensión de la estructura de un algoritmo."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Definir siempre",
                        content: "Aunque PSeInt a veces permite usar variables sin definir, es una mala práctica. Siempre usa la palabra clave `Definir`.",
                        code: "Definir edad Como Entero;"
                    }
                ],
                description: "Declaración y uso de variables y tipos de datos.",
                code: `Definir nombre Como Caracter;
Definir edad Como Entero;
Definir altura Como Real;
Definir esEstudiante Como Logico;

nombre <- "Juan";
edad <- 20;`,
                useCases: [
                    {
                        title: "Datos Personales",
                        description: "Declaración y asignación de variables de diferentes tipos para almacenar un perfil.",
                        code: `Algoritmo DatosPersonales
    Definir nombre Como Caracter;
    Definir edad Como Entero;
    
    nombre <- "Ana";
    edad <- 25;
    
    Escribir "Nombre: ", nombre;
    Escribir "Edad: ", edad;
FinAlgoritmo`
                    },
                    {
                        title: "Cálculo Simple con Reales",
                        description: "Uso de variables tipo Real para cálculos con decimales.",
                        code: `Algoritmo Precio
    Definir precio, impuesto Como Real;
    precio <- 100.50;
    impuesto <- precio * 0.18;
    Escribir "Impuesto: ", impuesto;
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-io",
                title: "Entrada y Salida de Datos",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es la forma en que el programa se comunica con el mundo exterior: `Escribir` muestra datos en pantalla y `Leer` captura lo que el usuario escribe."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Enseña el flujo de datos: de dónde vienen (entrada), cómo se procesan y adónde van (salida)."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Permite que los programas no sean estáticos. Gracias a esto, el resultado puede variar cada vez que el usuario ingresa algo diferente."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene usarlo siempre que necesites interactuar con una persona. No conviene abusar de `Escribir` cuando el proceso es interno y técnico."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Uso de variables y tipos de datos."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Sin Saltar",
                        content: "Usa `Sin Saltar` si quieres que el siguiente `Leer` o `Escribir` aparezca en la misma línea.",
                        code: "Escribir Sin Saltar \"Ingresa tu nombre: \";\nLeer nombre;"
                    }
                ],
                syntaxDescription: "Usa `Leer` para capturar y `Escribir` para mostrar.",
                description: "Interacción con el usuario mediante Leer y Escribir.",
                code: `Escribir "Ingrese su nombre:";
Leer nombre;
Escribir "Hola ", nombre;`,
                useCases: [
                    {
                        title: "Calculadora de Suma",
                        description: "Solicita dos números al usuario, los suma y muestra el resultado en pantalla.",
                        code: `Algoritmo Sumar
    Definir num1, num2, resultado Como Entero;
    
    Escribir "Ingrese primer número:";
    Leer num1;
    Escribir "Ingrese segundo número:";
    Leer num2;
    
    resultado <- num1 + num2;
    
    Escribir "La suma es: ", resultado;
FinAlgoritmo`
                    },
                    {
                        title: "Bienvenida Personalizada",
                        description: "Captura el nombre del usuario para darle un saludo personalizado.",
                        code: `Algoritmo Bienvenida
    Definir usuario Como Caracter;
    Escribir "¿Cómo te llamas?";
    Leer usuario;
    Escribir "¡Hola ", usuario, "! Bienvenido al sistema.";
FinAlgoritmo`
                    }
                ]
            }
        ]
    },
    {
        title: "2. Operadores y Expresiones",
        topics: [
            {
                id: "pseint-operators",
                title: "Operadores Aritméticos",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Son símbolos que permiten realizar operaciones matemáticas básicas como suma (+), resta (-), multiplicación (*), división (/), potencia (^) y resto (MOD)."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Permite transformar datos crudos en información útil mediante el procesamiento matemático."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Resuelve cualquier necesidad de cálculo, desde un promedio simple hasta determinar si un número es par o impar usando el operador de resto."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene usarlos siempre que necesites manipular valores numéricos. No conviene usar división (/) sin antes verificar que el divisor no sea cero."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Aritmética básica y uso de variables."
                    }
                ],
                tips: [
                    {
                        type: "error",
                        title: "División por Cero",
                        content: "Intentar dividir entre cero causará un error fatal en tu algoritmo.",
                        code: "// ❌ Error\nresultado <- 10 / 0;"
                    }
                ],
                description: "Operaciones matemáticas: suma, resta, producto, división, potencia y módulo.",
                code: `suma <- a + b;
resta <- a - b;
producto <- a * b;
division <- a / b;
potencia <- a ^ 2;
resto <- a MOD 2;`,
                useCases: [
                    {
                        title: "Área de un Círculo",
                        description: "Utiliza multiplicación y potencia para calcular el área a partir del radio ingresado.",
                        code: `Algoritmo AreaCirculo
    Definir radio, area Como Real;
    Escribir "Ingrese el radio:";
    Leer radio;
    
    // Área = PI * radio al cuadrado
    area <- 3.1416 * (radio ^ 2);
    
    Escribir "El área es: ", area;
FinAlgoritmo`
                    },
                    {
                        title: "Conversor de Moneda",
                        description: "Uso de multiplicación para convertir divisas.",
                        code: `Algoritmo DolaresASoles
    Definir dolares, tipoCambio, soles Como Real;
    tipoCambio <- 3.80;
    
    Escribir "Ingrese cantidad en dólares:";
    Leer dolares;
    
    soles <- dolares * tipoCambio;
    Escribir "Son ", soles, " soles.";
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-logic",
                title: "Operadores Lógicos y Relacionales",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Los operadores relacionales (>, <, =, etc.) comparan valores, y los lógicos (Y, O, NO) combinan esas comparaciones para tomar decisiones complejas."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Es la base del razonamiento condicional. Permite que tus programas analicen situaciones y elijan el camino correcto."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Permite validar condiciones como si un usuario es mayor de edad Y tiene permiso, o si un precio es menor O igual a un presupuesto."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene usarlos siempre que necesites comparar datos. No conviene crear condiciones demasiado largas y confusas; divide la lógica si es necesario."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Comprensión de valores de verdad (Verdadero/Falso) y operadores aritméticos."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Paréntesis en Lógica",
                        content: "Usa paréntesis para agrupar comparaciones y hacer que la lógica sea más legible.",
                        code: "Si (edad > 18) Y (tienePermiso = Verdadero) Entonces"
                    }
                ],
                description: "Comparaciones y lógica booleana.",
                code: `(a > 5) Y (b < 10)  // Y lógico
(a = 1) O (a = 2)   // O lógico
NO (a > b)          // Negación`,
                useCases: [
                    {
                        title: "Validar Rango",
                        description: "Verifica si una nota ingresada está dentro del rango válido (0-20) usando el operador Y.",
                        code: `Algoritmo ValidarNota
    Definir nota Como Entero;
    Escribir "Ingrese nota (0-20):";
    Leer nota;
    
    Si nota >= 0 Y nota <= 20 Entonces
        Escribir "Nota válida";
    SiNo
        Escribir "Nota fuera de rango";
    FinSi
FinAlgoritmo`
                    },
                    {
                        title: "Acceso con Descuento",
                        description: "Otorga descuento si es socio O si es lunes.",
                        code: `Algoritmo DescuentoCine
    Definir esSocio, esLunes Como Logico;
    // ... asignar valores ...
    
    Si esSocio O esLunes Entonces
        Escribir "Tiene descuento";
    FinSi
FinAlgoritmo`
                    }
                ]
            }
        ]
    },
    {
        title: "3. Estructuras Condicionales",
        topics: [
            {
                id: "pseint-if",
                title: "Si-Entonces (If-Else)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una estructura que permite bifurcar el camino del programa. Si se cumple una condición, hace una cosa; si no se cumple (`SiNo`), hace otra."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Enseña a manejar el flujo de control no lineal. Los programas reales casi nunca corren en línea recta de principio a fin."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Resuelve cualquier situación donde el programa deba elegir, como validar un acceso, calcular un descuento solo para ciertos casos, etc."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para decisiones binarias o con pocas opciones. No conviene cuando tienes muchísimas opciones basadas en una sola variable (para eso usa `Segun`)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Operadores relacionales y lógicos."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Indentación",
                        content: "Manten siempre el código interno del `Si-Entonces` un poco más a la derecha (sangría) para identificar dónde termina el bloque.",
                        code: "Si nota >= 11 Entonces\n    Escribir \"Aprobado\";\nFinSi"
                    }
                ],
                description: "Toma de decisiones basada en condiciones booleanas.",
                code: `Si condicion Entonces
    // Verdadero
SiNo
    // Falso
FinSi`,
                useCases: [
                    {
                        title: "Mayor de Edad",
                        description: "Condicional simple que decide qué mensaje mostrar basado en la edad.",
                        code: `Algoritmo VerificarEdad
    Definir edad Como Entero;
    Escribir "Ingrese su edad:";
    Leer edad;
    
    Si edad >= 18 Entonces
        Escribir "Es mayor de edad";
    SiNo
        Escribir "Es menor de edad";
    FinSi
FinAlgoritmo`
                    },
                    {
                        title: "Número Par o Impar",
                        description: "Uso del operador MOD dentro de un Si para determinar paridad.",
                        code: `Algoritmo ParImpar
    Definir num Como Entero;
    Escribir "Ingrese número:";
    Leer num;
    
    Si num MOD 2 == 0 Entonces
        Escribir "Es par";
    SiNo
        Escribir "Es impar";
    FinSi
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-switch",
                title: "Segun (Switch)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una estructura de selección múltiple que compara una sola variable contra varios valores posibles, ejecutando el bloque que coincida."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Enseña una forma más organizada y legible de manejar múltiples opciones que un montón de `Si-Entonces` anidados."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Es perfecto para crear menús de opciones o procesar códigos específicos donde cada uno requiere una acción distinta."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando comparas una sola variable con valores exactos. No conviene para comparaciones de rangos (como 'si nota está entre 10 y 15')."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Variables y conocimiento de estructuras condicionales simples."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "De Otro Modo",
                        content: "Siempre incluye la opción `De Otro Modo` para capturar cualquier valor que no hayas previsto y evitar que el programa falle silenciosamente.",
                        code: "De Otro Modo:\n    Escribir \"Opción inválida\";"
                    }
                ],
                description: "Selección múltiple basada en el valor de una variable.",
                code: `Segun variable Hacer
    val1: Accion1;
    val2: Accion2;
    De Otro Modo: AccionDefecto;
FinSegun`,
                useCases: [
                    {
                        title: "Días de la Semana",
                        description: "Convierte un número del 1 al 7 en el nombre del día correspondiente.",
                        code: `Algoritmo DiaSemana
    Definir dia Como Entero;
    Escribir "Ingrese número de día (1-7):";
    Leer dia;
    
    Segun dia Hacer
        1: Escribir "Lunes";
        2: Escribir "Martes";
        3: Escribir "Miércoles";
        4: Escribir "Jueves";
        5: Escribir "Viernes";
        6: Escribir "Sábado";
        7: Escribir "Domingo";
        De Otro Modo:
            Escribir "Día inválido";
    FinSegun
FinAlgoritmo`
                    },
                    {
                        title: "Calculadora Básica",
                        description: "Menú de opciones para elegir una operación matemática.",
                        code: `Algoritmo MenuCalc
    Definir op Como Entero;
    Escribir "1. Sumar  2. Restar";
    Leer op;
    
    Segun op Hacer
        1: Escribir "Sumando...";
        2: Escribir "Restando...";
        De Otro Modo: Escribir "Opción no válida";
    FinSegun
FinAlgoritmo`
                    }
                ]
            }
        ]
    },
    {
        title: "4. Estructuras Repetitivas",
        topics: [
            {
                id: "pseint-while",
                title: "Mientras (While)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un bucle que repite un bloque de código mientras se cumpla una condición. La condición se evalúa al principio, antes de entrar al bucle."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Introduce la idea de la repetición controlada por eventos o estados, no solo por conteo fijo."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Permite que un programa siga funcionando hasta que ocurra algo específico, como que el usuario decida salir o que se alcance un resultado deseado."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando no sabes exactamente cuántas veces vas a repetir una acción. No conviene si no tienes una forma clara de hacer que la condición sea falsa (riesgo de bucle infinito)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Condicionales y operadores lógicos."
                    }
                ],
                tips: [
                    {
                        type: "error",
                        title: "Bucle Infinto",
                        content: "Asegúrate siempre de que dentro del `Mientras` haya algo que cambie la variable de la condición. Si no, el programa nunca se detendrá.",
                        code: "// ❌ Error: i nunca cambia\nMientras i < 10 Hacer\n    Escribir i;\nFinMientras"
                    }
                ],
                description: "Bucle pre-condicional: repite mientras la condición sea verdadera.",
                code: `Mientras condicion Hacer
    // Instrucciones
FinMientras`,
                useCases: [
                    {
                        title: "Contador Regresivo",
                        description: "Imprime una cuenta regresiva asegurando que el contador disminuya en cada iteración.",
                        code: `Algoritmo CuentaRegresiva
    Definir contador Como Entero;
    contador <- 10;
    
    Mientras contador > 0 Hacer
        Escribir contador;
        contador <- contador - 1;
    FinMientras
    
    Escribir "¡Despegue!";
FinAlgoritmo`
                    },
                    {
                        title: "Suma Acumulativa",
                        description: "Suma números ingresados por el usuario hasta que ingrese 0.",
                        code: `Algoritmo SumarHastaCero
    Definir num, suma Como Entero;
    suma <- 0;
    Escribir "Ingrese número (0 para salir):";
    Leer num;
    
    Mientras num <> 0 Hacer
        suma <- suma + num;
        Leer num;
    FinMientras
    Escribir "Total: ", suma;
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-repeat",
                title: "Repetir (Do-While)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un bucle que se ejecuta al menos una vez y luego repite el proceso hasta que se cumpla una condición específica."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Muestra que a veces necesitas ejecutar una acción antes de poder evaluar si debes seguir haciéndola (flujo post-condicional)."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Es ideal para validaciones de datos (pedir algo hasta que sea correcto) y para mostrar menús que siempre deben aparecer al menos una vez."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando la primera ejecución es obligatoria. No conviene si la ejecución depende estrictamente de una condición que podría ser falsa desde el inicio."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Estructura Mientras y operadores lógicos."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "¿Mientras o Repetir?",
                        content: "Recuerda: `Mientras` evalúa y luego actúa. `Repetir` actúa y luego evalúa.",
                        code: "Repetir\n    Escribir \"Hola\";\nHasta Que Verdadero"
                    }
                ],
                description: "Bucle post-condicional: repite hasta que la condición se cumpla.",
                code: `Repetir
    // Instrucciones
Hasta Que condicion`,
                useCases: [
                    {
                        title: "Validación de Entrada",
                        description: "Obliga al usuario a ingresar un número positivo, repitiendo la petición si no lo hace.",
                        code: `Algoritmo ValidarPositivo
    Definir num Como Entero;
    
    Repetir
        Escribir "Ingrese un número positivo:";
        Leer num;
    Hasta Que num > 0
    
    Escribir "Dato correcto: ", num;
FinAlgoritmo`
                    },
                    {
                        title: "Menú Interactivo",
                        description: "Muestra el menú repetidamente hasta que el usuario elija Salir.",
                        code: `Algoritmo SistemaMenu
    Definir op Como Entero;
    Repetir
        Escribir "1. Ver  2. Salir";
        Leer op;
        Si op = 1 Entonces
            Escribir "Viendo datos...";
        FinSi
    Hasta Que op = 2
    Escribir "Adiós";
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-for",
                title: "Para (For)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un bucle especializado en conteos. Tú le dices dónde empieza, dónde termina y de cuánto en cuánto debe avanzar."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Introduce la automatización de procesos repetitivos basados en un rango conocido, algo fundamental para recorrer listas de datos."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Simplifica enormemente la escritura de bucles cuando ya sabes cuántas veces vas a repetir algo (ej: 10 veces, todos los elementos de una lista)."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para conteos fijos y recorrer arreglos. No conviene si la repetición depende de una condición externa impredecible (usa `Mientras` en ese caso)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Uso de variables y operadores aritméticos."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Con Paso",
                        content: "Usa `Con Paso` para saltar de 2 en 2 o para contar hacia atrás con -1.",
                        code: "Para i <- 10 Hasta 1 Con Paso -1 Hacer\n    Escribir i;\nFinPara"
                    }
                ],
                description: "Bucle con contador automático, ideal para un número fijo de iteraciones.",
                code: `Para i <- 1 Hasta fin Hacer
    // Instrucciones
FinPara`,
                useCases: [
                    {
                        title: "Tabla de Multiplicar",
                        description: "Genera la tabla de multiplicar del 5 iterando del 1 al 10.",
                        code: `Algoritmo TablaDel5
    Definir i Como Entero;
    
    Para i <- 1 Hasta 10 Hacer
        Escribir "5 x ", i, " = ", 5 * i;
    FinPara
FinAlgoritmo`
                    },
                    {
                        title: "Promedio de N notas",
                        description: "Solicita 5 notas y calcula el promedio.",
                        code: `Algoritmo Promedio
    Definir i, nota, suma Como Real;
    suma <- 0;
    
    Para i <- 1 Hasta 5 Hacer
        Escribir "Nota ", i, ":";
        Leer nota;
        suma <- suma + nota;
    FinPara
    
    Escribir "Promedio: ", suma / 5;
FinAlgoritmo`
                    }
                ]
            }
        ]
    },
    {
        title: "5. Estructuras de Datos",
        topics: [
            {
                id: "pseint-arrays",
                title: "Arreglos (Vectores)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una variable que puede guardar muchos valores del mismo tipo al mismo tiempo, organizados por una posición o índice."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Enseña a manejar colecciones de datos. Es el primer paso para entender cómo las aplicaciones manejan listas de usuarios, productos o mensajes."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Evita tener que crear 100 variables diferentes (`precio1`, `precio2`...) para guardar una lista de datos relacionados."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando tienes un grupo de datos de la misma naturaleza. No conviene si los datos son de tipos muy distintos entre sí (ej: un nombre y una edad)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Variables, tipos de datos y bucle `Para`."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "Índice Base",
                        content: "Ten cuidado: en PSeInt los índices suelen empezar en 1, pero en casi todos los lenguajes reales (C, Java, Python) empiezan en 0.",
                        code: "Dimension notas[5];\nnotas[1] <- 20; // Correcto en PSeInt"
                    }
                ],
                description: "Estructuras para almacenar múltiples datos del mismo tipo.",
                code: `Dimension lista[5];
lista[1] <- 10;`,
                useCases: [
                    {
                        title: "Llenar y Mostrar Vector",
                        description: "Crea un arreglo de 5 espacios, lo llena con múltiplos de 10 y lo recorre para mostrarlo.",
                        code: `Algoritmo VectorEjemplo
    Definir nums, i Como Entero;
    Dimension nums[5];
    
    // Llenado
    Para i <- 1 Hasta 5 Hacer
        nums[i] <- i * 10;
    FinPara
    
    // Recorrido
    Para i <- 1 Hasta 5 Hacer
        Escribir "Posición ", i, ": ", nums[i];
    FinPara
FinAlgoritmo`
                    },
                    {
                        title: "Buscar Mayor",
                        description: "Encuentra el número más grande en un vector.",
                        code: `Algoritmo BuscarMayor
    // Supongamos un vector ya lleno
    // ...
    mayor <- vector[1];
    Para i <- 2 Hasta 5 Hacer
        Si vector[i] > mayor Entonces
            mayor <- vector[i];
        FinSi
    FinPara
    Escribir "El mayor es: ", mayor;
FinAlgoritmo`
                    }
                ]
            },
            {
                id: "pseint-matrices",
                title: "Matrices",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un arreglo de dos dimensiones, como una tabla. Tiene filas y columnas, y necesitas dos índices para encontrar un valor."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Enseña a visualizar datos en forma de cuadrícula y a manejar bucles anidados (un bucle dentro de otro)."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Permite representar estructuras complejas como tableros, horarios, hojas de cálculo o mapas de juego."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando los datos tienen una relación de doble entrada. No conviene si la estructura es simple y lineal (un vector es suficiente)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Arreglos (vectores) y bucles anidados."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Recorrido",
                        content: "Para recorrer una matriz completa, usa un `Para` para las filas y, dentro de ese, otro `Para` para las columnas.",
                        code: "Para f <- 1 Hasta 3 Hacer\n    Para c <- 1 Hasta 3 Hacer\n        // ...\n    FinPara\nFinPara"
                    }
                ],
                description: "Arreglos bidimensionales (filas y columnas).",
                code: `Dimension matriz[3, 3];
matriz[1, 1] <- 5;`,
                useCases: [
                    {
                        title: "Matriz Identidad",
                        description: "Crea una matriz cuadrada y llena la diagonal principal con unos.",
                        code: `Algoritmo MatrizIdentidad
    Definir M, i, j Como Entero;
    Dimension M[3, 3];
    
    Para i <- 1 Hasta 3 Hacer
        Para j <- 1 Hasta 3 Hacer
            Si i = j Entonces
                M[i, j] <- 1;
            SiNo
                M[i, j] <- 0;
            FinSi
            Escribir Sin Saltar M[i, j], " ";
        FinPara
        Escribir ""; // Salto de línea
    FinPara
FinAlgoritmo`
                    }
                ]
            }
        ]
    },
    {
        title: "6. Modularidad",
        topics: [
            {
                id: "pseint-functions",
                title: "Subprocesos y Funciones",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un bloque de código independiente que realiza una tarea específica. Puede recibir datos (parámetros) y devolver un resultado (retorno)."
                    },
                    {
                        title: "¿Por qué es importante para aprender lógica?",
                        text: "Introduce el concepto de modularidad y reutilización. Enseña a 'dividir y vencer' problemas complejos separándolos en partes pequeñas."
                    },
                    {
                        title: "¿Qué problema real/común resuelve?",
                        text: "Evita la repetición de código. Si necesitas calcular un promedio en diez partes distintas de tu programa, solo escribes la lógica una vez en una función."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene siempre que tengas una tarea lógica que se repita o que sea muy compleja. No conviene para acciones de una sola línea que no aportan claridad al código."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Variables, estructuras condicionales y bucles."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Nombres Descriptivos",
                        content: "Nombra tus funciones con verbos que indiquen qué hacen, como `CalcularImpuesto` o `MostrarMensaje`.",
                        code: "Funcion res <- SumarNumeros(a, b)"
                    }
                ],
                description: "Programación modular para reutilizar código.",
                code: `Funcion res <- Nombre(arg1)
    // Instrucciones
FinFuncion`,
                useCases: [
                    {
                        title: "Función Cuadrado",
                        description: "Define una función que calcula el cuadrado de un número y la utiliza en el algoritmo principal.",
                        code: `Funcion res <- CalcularCuadrado(n)
    Definir res Como Entero;
    res <- n * n;
FinFuncion

Algoritmo Modular
    Definir num Como Entero;
    Escribir "Ingrese número:";
    Leer num;
    Escribir "El cuadrado es: ", CalcularCuadrado(num);
FinAlgoritmo`
                    },
                    {
                        title: "Procedimiento Saludar",
                        description: "Un subproceso que no retorna valor, solo ejecuta una acción.",
                        code: `SubProceso Saludar(nombre)
    Escribir "Hola ", nombre, " ten un buen día.";
FinSubProceso

Algoritmo Principal
    Saludar("Carlos");
    Saludar("Maria");
FinAlgoritmo`
                    }
                ]
            }
        ]
    },
    flashcardsCategory
];
