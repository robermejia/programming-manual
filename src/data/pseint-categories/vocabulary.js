export const vocabularyCategory = {
    title: "0. Vocabulario de PSeInt",
    topics: [
        {
            id: "pseint-vocab-structure",
            title: "1. Estructura del Algoritmo",
            description: "Palabras clave para definir la estructura básica de un programa.",
            content: [
                { title: "Algoritmo", text: "Indica el inicio del algoritmo y su nombre." },
                { title: "Proceso", text: "Alternativa a 'Algoritmo' para iniciar el programa." },
                { title: "FinAlgoritmo", text: "Marca el final del algoritmo." },
                { title: "FinProceso", text: "Alternativa a 'FinAlgoritmo'." },
                { title: "SubProceso", text: "Define una subrutina o función." },
                { title: "FinSubProceso", text: "Marca el final de un subproceso." }
            ]
        },
        {
            id: "pseint-vocab-variables",
            title: "2. Declaración de Variables",
            description: "Tipos de datos y comandos para reservar memoria.",
            content: [
                { title: "Definir", text: "Declara variables especificando su tipo." },
                { title: "Dimension", text: "Declara arreglos (vectores o matrices)." },
                { title: "Como", text: "Palabra clave para especificar el tipo de dato." },
                { title: "Entero", text: "Números sin decimales (positivos, negativos o cero)." },
                { title: "Real", text: "Números con decimales." },
                { title: "Logico", text: "Valores booleanos (Verdadero o Falso)." },
                { title: "Caracter / Texto", text: "Cadenas de texto (palabras, frases)." }
            ]
        },
        {
            id: "pseint-vocab-io",
            title: "3. Entrada y Salida",
            description: "Comandos para interactuar con el usuario.",
            content: [
                { title: "Leer", text: "Lee datos ingresados por el usuario desde el teclado." },
                { title: "Escribir / Imprimir", text: "Muestra información en pantalla." },
                { title: "Sin Saltar", text: "Modificador que evita el salto de línea después de Escribir." }
            ]
        },
        {
            id: "pseint-vocab-operators",
            title: "4-6. Operadores",
            description: "Símbolos para operaciones matemáticas, comparaciones y lógica.",
            content: [
                { title: "+, -, *, /, ^", text: "Operadores aritméticos básicos: suma, resta, multiplicación, división, potencia." },
                { title: "MOD / %", text: "Módulo: devuelve el resto de la división entera." },
                { title: "=", text: "Igual a (relacional) o asignación (dependiendo del contexto)." },
                { title: "<> / !=", text: "Diferente de." },
                { title: "<, >, <=, >=", text: "Menor, Mayor, Menor o igual, Mayor o igual." },
                { title: "Y / &", text: "Conjunción lógica (AND): ambas condiciones deben ser verdaderas." },
                { title: "O / |", text: "Disyunción lógica (OR): al menos una condición debe ser verdadera." },
                { title: "NO / ~", text: "Negación lógica (NOT): invierte el valor de verdad." }
            ]
        },
        {
            id: "pseint-vocab-conditionals",
            title: "7. Estructuras Condicionales",
            description: "Control de flujo para toma de decisiones.",
            content: [
                { title: "Si", text: "Inicia una estructura condicional." },
                { title: "Entonces", text: "Separa la condición de las acciones a ejecutar si es verdadera." },
                { title: "Sino / SiNo", text: "Define las acciones a ejecutar si la condición es falsa." },
                { title: "FinSi", text: "Cierra la estructura Si." },
                { title: "Segun", text: "Inicia una estructura de selección múltiple (Switch)." },
                { title: "De Otro Modo", text: "Caso por defecto en una estructura Segun." },
                { title: "FinSegun", text: "Cierra la estructura Segun." }
            ]
        },
        {
            id: "pseint-vocab-loops",
            title: "8. Estructuras Repetitivas",
            description: "Bucles para repetir bloques de código.",
            content: [
                { title: "Mientras", text: "Repite un bloque mientras la condición sea verdadera (evalúa al inicio)." },
                { title: "Hacer", text: "Marca el inicio del bloque de instrucciones del ciclo." },
                { title: "FinMientras", text: "Cierra el ciclo Mientras." },
                { title: "Repetir", text: "Inicia un ciclo que se ejecuta al menos una vez." },
                { title: "Hasta Que", text: "Condición de salida del ciclo Repetir (se detiene cuando es verdadera)." },
                { title: "Para", text: "Inicia un ciclo con contador automático." },
                { title: "Hasta", text: "Define el valor final del contador en un ciclo Para." },
                { title: "Con Paso", text: "Define el incremento del contador (opcional, por defecto 1)." },
                { title: "FinPara", text: "Cierra el ciclo Para." }
            ]
        },
        {
            id: "pseint-vocab-math-funcs",
            title: "9. Funciones Matemáticas",
            description: "Funciones integradas para cálculos matemáticos.",
            content: [
                { title: "RC", text: "Raíz Cuadrada." },
                { title: "ABS", text: "Valor Absoluto." },
                { title: "TRUNC", text: "Trunca un número (elimina la parte decimal sin redondear)." },
                { title: "REDON", text: "Redondea un número al entero más cercano." },
                { title: "SEN, COS, TAN", text: "Funciones trigonométricas (Seno, Coseno, Tangente)." },
                { title: "ASEN, ACOS, ATAN", text: "Funciones trigonométricas inversas." },
                { title: "LN, EXP", text: "Logaritmo Natural y Función Exponencial." },
                { title: "Aleatorio", text: "Genera un número aleatorio entre dos valores dados." },
                { title: "azar", text: "Genera un número aleatorio entre 0 y N-1." }
            ]
        },
        {
            id: "pseint-vocab-string-funcs",
            title: "10. Funciones de Cadenas",
            description: "Operaciones para manipular texto.",
            content: [
                { title: "Longitud", text: "Devuelve la cantidad de caracteres de una cadena." },
                { title: "Subcadena", text: "Extrae una parte de la cadena indicada por posiciones." },
                { title: "Concatenar", text: "Une dos cadenas de texto." },
                { title: "Mayusculas", text: "Convierte todo el texto a mayúsculas." },
                { title: "Minusculas", text: "Convierte todo el texto a minúsculas." },
                { title: "ConvertirANumero", text: "Transforma una cadena numérica en un valor numérico real/entero." },
                { title: "ConvertirATexto", text: "Transforma un valor numérico en una cadena de texto." }
            ]
        },
        {
            id: "pseint-vocab-misc",
            title: "Otros Elementos",
            description: "Asignación, comentarios y comandos especiales.",
            content: [
                { title: "<-", text: "Operador de asignación (guarda el valor de la derecha en la variable de la izquierda)." },
                { title: "//", text: "Inicia un comentario de una sola línea (ignorado por el programa)." },
                { title: "Verdadero (V) / Falso (F)", text: "Valores literales para tipos lógicos." },
                { title: "Borrar Pantalla", text: "Limpia todo el texto de la consola de salida." },
                { title: "Esperar", text: "Pausa la ejecución por un tiempo (Segundos/Milisegundos) o hasta una tecla." },
                { title: "Por Valor / Por Referencia", text: "Modos de pasar parámetros a un SubProceso." }
            ]
        }
    ]
};
