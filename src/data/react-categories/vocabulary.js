export const vocabularyCategory = {
    title: "0. Vocabulario de React",
    topics: [
        {
            id: "react-vocab-a-c",
            title: "Glosario A - C",
            description: "Términos sobre acciones, accesibilidad y la base de los componentes.",
            content: [
                { title: "Actions", text: "Funciones asíncronas que manejan transiciones de estado y efectos secundarios." },
                { title: "async/await", text: "Sintaxis para manejar operaciones asíncronas en JavaScript." },
                { title: "Array Methods", text: "map(), filter(), reduce() usados para renderizar listas." },
                { title: "Arrow Functions", text: "Sintaxis concisa de funciones: () => {}." },
                { title: "Accessibility (a11y)", text: "Práctica de hacer aplicaciones accesibles para todos." },
                { title: "Babel", text: "Transpilador de JSX y JavaScript moderno." },
                { title: "Bundler", text: "Herramienta que empaqueta código (Webpack, Vite, Rollup)." },
                { title: "Component", text: "Bloque reutilizable de UI en React." },
                { title: "Children", text: "Prop especial que contiene elementos hijos." },
                { title: "Composition", text: "Patrón de combinar componentes pequeños." },
                { title: "Conditional Rendering", text: "Renderizar elementos basado en condiciones." },
                { title: "Context API", text: "Sistema para compartir estado sin prop drilling." },
                { title: "CSS Modules", text: "Archivos CSS con scope local." },
                { title: "className", text: "Atributo para clases CSS en JSX." },
                { title: "Code Splitting", text: "Dividir bundle en chunks más pequeños." },
                { title: "Custom Hook", text: "Hook personalizado que reutiliza lógica." }
            ]
        },
        {
            id: "react-vocab-d-h",
            title: "Glosario D - H",
            description: "Conceptos sobre el DOM, eventos, fragmentos y la amplia gama de Hooks.",
            content: [
                { title: "DOM (Document Object Model)", text: "Representación del HTML en memoria." },
                { title: "Virtual DOM", text: "Representación ligera del DOM en React." },
                { title: "Declarative", text: "Describe qué mostrar, no cómo hacerlo." },
                { title: "Dependencies Array", text: "Array de dependencias en useEffect/useCallback." },
                { title: "Destructuring", text: "Sintaxis para extraer valores de objetos o arrays." },
                { title: "Diffing Algorithm", text: "Algoritmo que compara Virtual DOM para actualizar el real." },
                { title: "Effect", text: "Operación secundaria como llamadas a APIs o suscripciones." },
                { title: "Error Boundary", text: "Componente que captura errores de renderizado en sus hijos." },
                { title: "Fragment", text: "Agrupa elementos sin añadir un nodo extra al DOM (<>...</>)." },
                { title: "Fiber", text: "Arquitectura interna de reconciliación de React." },
                { title: "forwardRef", text: "Técnica para pasar una referencia a un componente hijo." },
                { title: "Hook", text: "Función especial que permite usar estado y otras funciones de React." },
                { title: "useState", text: "Hook para manejar el estado local." },
                { title: "useEffect", text: "Hook para ejecutar efectos secundarios." },
                { title: "useContext", text: "Hook para consumir un contexto creado." },
                { title: "useReducer", text: "Hook para estados complejos con lógica tipo Redux." },
                { title: "useCallback", text: "Hook que memoriza funciones para evitar re-creaciones." },
                { title: "useMemo", text: "Hook que memoriza el resultado de un cálculo costoso." },
                { title: "useRef", text: "Hook para crear referencias persistentes a elementos o valores." }
            ]
        },
        {
            id: "react-vocab-i-p",
            title: "Glosario I - P",
            description: "Términos sobre inmutabilidad, JSX, carga perezosa y el manejo de Props.",
            content: [
                { title: "Immutability", text: "Principio de no modificar los datos directamente, sino crear copias." },
                { title: "JSX (JavaScript XML)", text: "Extensión de sintaxis que permite escribir HTML dentro de JS." },
                { title: "JSON", text: "Formato estándar para el intercambio de datos." },
                { title: "Key", text: "Propiedad necesaria para identificar elementos únicos en una lista." },
                { title: "Lazy Loading", text: "Cargar componentes solo cuando son necesarios para mejorar el rendimiento." },
                { title: "Lifting State Up", text: "Elevar el estado al ancestro común más cercano." },
                { title: "Mounting", text: "Fase en la que un componente se inserta por primera vez en el DOM." },
                { title: "Memoization", text: "Optimización que consiste en cachear resultados previos." },
                { title: "Next.js", text: "Framework de React líder para producción con SSR/SSG." },
                { title: "One-Way Data Flow", text: "Flujo de datos en una sola dirección: de padres a hijos." },
                { title: "Props", text: "Datos externos pasados a un componente (solo lectura)." },
                { title: "Portal", text: "Renderizar un hijo en un nodo del DOM fuera de su jerarquía." },
                { title: "Provider", text: "Componente de Context que suministra los datos a sus descendientes." }
            ]
        },
        {
            id: "react-vocab-r-s",
            title: "Glosario R - S",
            description: "Reconciliación, enrutamiento, estado y las bondades de Suspense.",
            content: [
                { title: "Reconciliation", text: "Proceso por el cual React actualiza el DOM de forma eficiente." },
                { title: "React Router", text: "La librería estándar para manejar la navegación." },
                { title: "Reducer", text: "Función que determina cómo cambia el estado ante una acción." },
                { title: "Render", text: "El proceso de convertir tus componentes en elementos visuales." },
                { title: "Re-render", text: "Nueva renderización disparada por cambios en estado o props." },
                { title: "State", text: "El corazón de un componente; datos mutables que disparan cambios en la UI." },
                { title: "SPA (Single Page Application)", text: "Aplicación de una sola página que no refresca el navegador." },
                { title: "SSR / SSG", text: "Técnicas de renderizado en servidor o estático para SEO." },
                { title: "Strict Mode", text: "Herramienta que resalta problemas potenciales en el código." },
                { title: "Suspense", text: "Componente que maneja estados de carga de forma declarativa." }
            ]
        },
        {
            id: "react-vocab-t-z",
            title: "Glosario T - Z",
            description: "Tipado, utilidades, herramientas de construcción y gestión de estado.",
            content: [
                { title: "TypeScript", text: "Lenguaje que añade tipos estáticos a JavaScript para mayor seguridad." },
                { title: "Tailwind CSS", text: "Framework de CSS basado en utilidades muy usado con React." },
                { title: "Vite", text: "Herramienta de construcción ultra rápida para proyectos modernos." },
                { title: "Webpack", text: "El empaquetador de módulos más clásico del ecosistema." },
                { title: "XSS (Cross-Site Scripting)", text: "Ataque de seguridad que React ayuda a prevenir por defecto." },
                { title: "Yarn / npm", text: "Gestores de paquetes para instalar librerías." },
                { title: "Zustand", text: "Librería ligera y moderna para el estado global." }
            ]
        },
        {
            id: "react-vocab-v19",
            title: "Novedades React 19",
            description: "Las últimas características introducidas en la versión 19 de React.",
            content: [
                { title: "Actions", text: "Soporte nativo para funciones asíncronas en formularios." },
                { title: "useActionState", text: "Hook para gestionar el estado de las acciones de formulario." },
                { title: "useOptimistic", text: "Hook para mostrar cambios en la UI antes de que el servidor responda." },
                { title: "use() Hook", text: "Nueva API para consumir promesas y contextos de forma flexible." },
                { title: "React Compiler", text: "Nuevo compilador que automatiza la memorización (bye bye useMemo)." },
                { title: "Server Components", text: "Componentes que se renderizan exclusivamente en el servidor." }
            ]
        }
    ]
};
