export const flashcardsCategory = {
    title: "10. React Flashcards",
    isFlashcard: true,
    topics: [
        {
            id: "react-flashcards-1-20",
            title: "Flashcards: Fundamentos y Componentes",
            description: "20 tarjetas sobre conocimientos previos, JSX y componentes básicos.",
            cards: [
                { q: "¿Cuáles son los conocimientos previos necesarios para tomar un curso de React?", a: "Se deben tener conocimientos previos sobre HTML, CSS y JavaScript." },
                { q: "¿Qué es JSX en el contexto de React?", a: "Es una extensión de sintaxis para JavaScript que parece una mezcla entre HTML y JavaScript, usada para definir la estructura de los componentes." },
                { q: "Por convención en React, ¿cómo deben comenzar los nombres de los componentes definidos por el usuario?", a: "Deben comenzar siempre con una letra mayúscula (PascalCase)." },
                { q: "Un componente funcional en React siempre debe retornar un _____.", a: "elemento de React, usualmente definido con JSX." },
                { q: "En React, la herramienta de línea de comandos `mpx create-react-app nombre-app` se utiliza para...", a: "crear la estructura inicial de una nueva aplicación de React." },
                { q: "En la estructura de un proyecto de React, ¿cuál es la función del archivo `App.js`?", a: "Es el componente principal de la aplicación que contiene toda la estructura y la lógica central." },
                { q: "En React, ¿qué son los componentes?", a: "Son piezas de código independientes y reutilizables que describen una parte de la interfaz de usuario." },
                { q: "¿Para qué se utilizan las 'props' en React?", a: "Para pasar datos de un componente padre a un componente hijo, permitiendo que los componentes sean dinámicos y reutilizables." },
                { q: "Para importar un archivo CSS en un componente de JavaScript, se utiliza la sintaxis `import '_____';`?", a: "./ruta/al/archivo.css" },
                { q: "¿Qué herramienta de desarrollo para navegadores se puede instalar para inspeccionar componentes de React y sus props?", a: "Las React Developer Tools (Herramientas de desarrollo de React)." },
                { q: "En JSX, para asignar una clase CSS a un elemento, se utiliza el atributo _____ en lugar de `class`.", a: "className" },
                { q: "Si un componente funcional de React no se importa desde su archivo, la aplicación continuará funcionando correctamente. (Verdadero/Falso)", a: "Falso, es necesario importar los componentes para poder usarlos." },
                { q: "¿Qué es un 'export nombrado' (named export) en JavaScript y cómo se importa?", a: "Es una forma de exportar múltiples valores de un módulo, y se importa usando llaves: `import { Componente } from './archivo';`" },
                { q: "El operador _____ se utiliza comúnmente en JSX para renderizado condicional, evaluando una condición y devolviendo un valor si es verdadera y otro si es falsa.", a: "ternario (condición ? valor_si_verdadero : valor_si_falso)" },
                { q: "En la estructura de archivos de un proyecto React, ¿qué sucede si se modifica el archivo `App.css`?", a: "Se alteran los estilos visuales del componente principal de la aplicación." },
                { q: "Al definir la ruta para importar un archivo en React, ¿qué significa el uso de dos puntos (`..`) al inicio de la ruta, como en `../carpeta/archivo`?", a: "Indica que se debe subir un nivel en la estructura de directorios antes de buscar la carpeta o archivo." },
                { q: "Al manejar eventos como `onClick` en React, ¿por qué se pasa una función de flecha `() => miFuncion()` en lugar de solo `miFuncion()`?", a: "Para evitar que la función se ejecute inmediatamente al renderizar el componente, asegurando que solo se llame cuando ocurra el evento." },
                { q: "En JSX, cuando un componente no necesita un `div` contenedor pero debe retornar múltiples elementos, se pueden usar _____ para agruparlos.", a: "Fragmentos, representados por etiquetas vacías `<>` y `</>`." },
                { q: "¿Qué es Vite.js en el contexto de React?", a: "Es una herramienta de construcción moderna y rápida que sirve como alternativa a `create-react-app` para iniciar proyectos de desarrollo front-end." },
                { q: "El hook de React que permite a un componente tener su propio estado interno se llama _____.", a: "useState" }
            ]
        },
        {
            id: "react-flashcards-21-40",
            title: "Flashcards: Hooks y Formularios",
            description: "20 tarjetas sobre useState, useEffect y manejo de eventos.",
            cards: [
                { q: "¿Qué retorna el hook `useState`?", a: "Retorna un array con dos elementos: la variable de estado actual y una función para actualizarla." },
                { q: "Cuando el estado de un componente de React cambia, ¿qué ocurre con el componente?", a: "El componente se vuelve a renderizar (re-render) para reflejar el nuevo estado en la interfaz de usuario." },
                { q: "Para manejar los cambios en un campo de entrada (input) en un formulario de React, ¿qué evento se utiliza?", a: "El evento `onChange`." },
                { q: "El hook de React utilizado para ejecutar efectos secundarios (como llamadas a API o suscripciones) en componentes funcionales es _____.", a: "useEffect" },
                { q: "En el hook `useEffect`, ¿qué significa pasar un array de dependencias vacío `[]` como segundo argumento?", a: "Significa que el efecto se ejecutará solo una vez, después del montaje inicial del componente (similar a `componentDidMount`)." },
                { q: "En JavaScript, ¿cómo se puede desestructurar un objeto `props` para acceder directamente a sus propiedades `nombre` y `edad`?", a: "Se puede hacer en los parámetros de la función: `function Componente({ nombre, edad })`." },
                { q: "Al renderizar una lista de elementos en React usando el método `.map()`, ¿qué prop especial y única se debe asignar a cada elemento de la lista?", a: "La prop `key`." },
                { q: "¿Cuál es el propósito principal de la librería `react-router-dom`?", a: "Gestionar el enrutamiento del lado del cliente en una aplicación de React, permitiendo la navegación entre vistas sin recargar la página." },
                { q: "En `react-router-dom`, el componente `<_____>` se utiliza para crear enlaces de navegación declarativos que no recargan la página.", a: "Link" },
                { q: "¿Cómo se define una ruta dinámica en `react-router-dom` para capturar un parámetro, por ejemplo, un ID de producto?", a: "Se utiliza una sintaxis con dos puntos en el `path`, por ejemplo: `path=\"/producto/:id\"`." },
                { q: "¿Qué problema resuelve el Context API de React?", a: "Resuelve el problema del \"prop drilling\", que es la necesidad de pasar props a través de múltiples niveles de componentes que no las necesitan." },
                { q: "Para consumir un valor de un contexto de React en un componente funcional, se utiliza el hook _____.", a: "useContext" },
                { q: "En un componente de clase de React, ¿cómo se accede a los props que se le pasan?", a: "Se accede a través de `this.props`." },
                { q: "El método _____ es obligatorio en un componente de clase de React y es el responsable de retornar el JSX que se renderizará.", a: "render()" },
                { q: "Para definir el estado inicial en un componente de clase de React, se utiliza el _____.", a: "constructor" },
                { q: "En un componente de clase, ¿qué método se utiliza para actualizar el estado del componente?", a: "El método `this.setState()`." },
                { q: "Al manejar un formulario en React, ¿para qué se utiliza `event.preventDefault()` en la función de `onSubmit`?", a: "Para prevenir el comportamiento por defecto del navegador de recargar la página al enviar un formulario." },
                { q: "Un _____ es un componente cuyo valor de entrada está controlado por el estado de React.", a: "componente controlado (controlled component)" },
                { q: "¿Qué es Firebase en el contexto del desarrollo web?", a: "Es una plataforma de desarrollo de aplicaciones de Google que proporciona servicios de backend, como bases de datos en tiempo real (Firestore), autenticación y hosting." },
                { q: "En Firestore, para obtener una colección de documentos, ¿qué función se importa desde la librería de Firebase?", a: "Se importa la función `collection` para crear la referencia y `getDocs` para obtener los documentos." }
            ]
        },
        {
            id: "react-flashcards-41-60",
            title: "Flashcards: Desarrollo Avanzado",
            description: "20 tarjetas sobre custom hooks, React 19 y optimización.",
            cards: [
                { q: "¿Qué es un custom hook (hook personalizado) en React?", a: "Es una función de JavaScript cuyo nombre empieza por \"use\" y que puede llamar a otros hooks, permitiendo reutilizar lógica con estado entre componentes." },
                { q: "El hook `useReducer` es una alternativa a `useState` y es especialmente útil para manejar lógica de estado _____.", a: "compleja o cuando el próximo estado depende del anterior." },
                { q: "Al hacer una llamada a una API con `fetch` en un `useEffect`, ¿por qué la función dentro del hook se suele declarar como `async`?", a: "Para poder utilizar `await` y manejar de forma más limpia las promesas devueltas por la operación de `fetch`." },
                { q: "En React 19, el hook `useOptimistic` se utiliza para...", a: "actualizar la UI de forma inmediata con un estado esperado, mientras la operación asíncrona real (como una llamada a la API) se completa en segundo plano." },
                { q: "Los _____ son un concepto en React que permite renderizar componentes en el servidor antes de enviarlos al cliente, mejorando el rendimiento.", a: "Server Components" },
                { q: "En la librería `react-hook-form`, el hook `useForm` retorna, entre otras cosas, las funciones `register` y `_____` para manejar el registro de inputs y el envío del formulario.", a: "handleSubmit" },
                { q: "En el archivo `package.json`, la sección de `_____` lista todas las librerías externas que el proyecto necesita para funcionar.", a: "dependencies" },
                { q: "Cuando se trabaja con formularios, el valor de un `input` se puede obtener del objeto evento a través de la propiedad `event.target._____`.", a: "value" },
                { q: "¿Qué comando se utiliza para iniciar el servidor de desarrollo de una aplicación React creada con `create-react-app` o `Vite`?", a: "npm start o npm run dev." },
                { q: "¿Qué hace el método `.json()` en una respuesta de la API `fetch`?", a: "Parsea el cuerpo de la respuesta como JSON, devolviendo una promesa que se resuelve con el objeto JavaScript resultante." },
                { q: "En `react-router-dom`, el componente `<_____>` envuelve un conjunto de rutas y se asegura de que solo una de ellas se renderice a la vez.", a: "Routes" },
                { q: "Para pasar una función de un componente padre a un hijo, se hace a través de las _____.", a: "props" },
                { q: "El hook de React `useMemo` se utiliza para...", a: "memorizar el resultado de un cálculo costoso, evitando que se recalcule en cada renderizado si las dependencias no han cambiado." },
                { q: "¿Cuál es la diferencia principal entre `useMemo` y `useCallback`?", a: "`useMemo` memoriza un valor (el resultado de una función), mientras que `useCallback` memoriza una función en sí misma." },
                { q: "¿Por qué es importante la inmutabilidad al actualizar el estado en React, especialmente con arrays u objetos?", a: "Porque React compara referencias para detectar cambios; si se muta el estado directamente, la referencia no cambia y React podría no detectar el cambio y no volver a renderizar." },
                { q: "Para crear una copia de un array y añadirle un nuevo elemento de forma inmutable, se puede usar el operador _____.", a: "spread (`...`), como en `[...arrayAnterior, nuevoElemento]`." },
                { q: "En `react-router-dom`, ¿cómo se puede crear una ruta que capture cualquier `path` no coincidente (ruta 404)?", a: "Se define una ruta con `path=\"*\"` al final de todas las demás rutas." },
                { q: "¿Qué es la \"desestructuración\" (destructuring) en JavaScript?", a: "Es una sintaxis que permite desempaquetar valores de arrays o propiedades de objetos en distintas variables." },
                { q: "¿Qué significa que el flujo de datos en React es unidireccional?", a: "Significa que los datos fluyen en una sola dirección, de los componentes padres a los componentes hijos, a través de las props." },
                { q: "En Firestore, ¿qué es una \"colección\"?", a: "Es un contenedor de documentos, que a su vez contienen los datos." }
            ]
        },
        {
            id: "react-flashcards-61-72",
            title: "Flashcards: Miscelánea y React 19",
            description: "12 tarjetas sobre mejores prácticas y novedades.",
            cards: [
                { q: "Cuando se usa `map` para renderizar una lista, ¿por qué es una mala práctica usar el índice del array como `key`?", a: "Porque si el orden de los elementos cambia, el índice no identificará de forma única al elemento, lo que puede causar problemas de renderizado y de estado." },
                { q: "Para poder ejecutar comandos de Node.js (como `npm`) desde la terminal, es necesario que la ruta de instalación de Node.js se añada a la variable de entorno _____.", a: "PATH" },
                { q: "¿Qué son los \"props por defecto\" (default props) en React?", a: "Son valores predeterminados para las props de un componente, que se usan si no se proporciona un valor para esa prop." },
                { q: "En el hook `useEffect`, ¿qué sucede si se omite el segundo argumento (el array de dependencias)?", a: "El efecto se ejecutará después de cada renderizado del componente." },
                { q: "El archivo `_____` en la raíz de un proyecto React ignora archivos y carpetas para que no sean subidos a un repositorio Git, como la carpeta `node_modules`.", a: ".gitignore" },
                { q: "En React 19, el componente `<Context.Provider>` puede ser reemplazado por solo `<Context>` para proveer un valor.", a: "Verdadero, la sintaxis para el proveedor de contexto se ha simplificado." },
                { q: "Al trabajar con eventos en JSX, el nombre del manejador de eventos se escribe en _____, por ejemplo, `onClick` u `onChange`.", a: "camelCase" },
                { q: "En React, `children` es una prop especial que contiene...", a: "el contenido que se anida entre las etiquetas de apertura y cierre de un componente." },
                { q: "¿Qué significa que una función sea \"asíncrona\"?", a: "Significa que su ejecución no bloquea el hilo principal, permitiendo que otras operaciones continúen mientras espera un resultado, como una respuesta de una API." },
                { q: "El hook `useRef` puede usarse para acceder directamente a un elemento del _____ sin necesidad de usar el estado.", a: "DOM" },
                { q: "¿Qué es un \"reducer\" en el contexto de `useReducer` o Redux?", a: "Es una función pura que toma el estado actual y una acción, y devuelve un nuevo estado." },
                { q: "El concepto de levantar el estado (\"lifting state up\") en React se refiere a...", a: "mover el estado a un ancestro común de varios componentes para que puedan compartir y manipular ese estado." }
            ]
        }
    ]
};
