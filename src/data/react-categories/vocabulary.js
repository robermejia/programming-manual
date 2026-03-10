export const vocabularyCategory = {
    title: "0. Vocabulario de React",
    topics: [
        {
            id: "react-vocab-a-c",
            title: "Glosario A - C",
            description: "Términos sobre acciones, accesibilidad y la base de los componentes.",
            content: [
                { title: "Actions", text: "En React 19, son funciones asíncronas que manejan transiciones de estado complejas y envíos de formularios. Facilitan la gestión automática de estados pendientes sin necesidad de múltiples useEffects." },
                { title: "async/await", text: "Sintaxis de JavaScript moderno que permite escribir código asíncrono (como llamadas a una API) de forma secuencial y legible. Previene el anidamiento excesivo de los '.then()'." },
                { title: "Array Methods", text: "Métodos funcionales nativos de JavaScript como map(), filter() y reduce(). Son fundamentales en React, especialmente map() para iterar sobre datos y renderizar listas dinámicas generando JSX por cada elemento." },
                { title: "Arrow Functions", text: "Sintaxis más concisa para escribir funciones en JS: '() => {}'. Además de ser más corta, preserva el contexto léxico de 'this', lo cual era vital en componentes de clase, y hoy es el estándar para callbacks." },
                { title: "Accessibility (a11y)", text: "Prácticas de diseño y desarrollo web para asegurar que las aplicaciones puedan ser usadas por personas con discapacidades. Incluye técnicas como usar etiquetas semánticas y proveer textos alternativos." },
                { title: "Babel", text: "Una herramienta clave (transpilador) que convierte el código moderno (como sintaxis JSX y JavaScript de última generación) en versiones compatibles que cualquier navegador antiguo puede ejecutar sin problemas." },
                { title: "Bundler", text: "Herramientas especializadas como Vite o Webpack que recolectan todos tus módulos dispersos (JS, CSS, Imágenes) y los empaquetan en archivos finales listos y optimizados para el navegador." },
                { title: "Component", text: "La unidad de construcción fundamental en React. Es una pieza visual aislada y reutilizable (como un botón o un formulario) que tiene su propia lógica y se agrupa para conformar una interfaz compleja." },
                { title: "Children", text: "Una prop reservada de React que permite a un componente recibir elementos arbitrarios dentro de sus etiquetas de apertura y cierre. Es la base de la creación de componentes contenedores o layouts." },
                { title: "Composition", text: "El patrón de diseño preferido en React para construir jerarquías de componentes. Fomenta envolver un componente dentro de otro en vez de usar complejas cadenas de herencia orientadas a objetos." },
                { title: "Conditional Rendering", text: "La técnica de usar lógica de JavaScript (operadores ternarios o AND lógico) dentro de JSX para decidir si se muestra un elemento específico basado en el estado actual de la aplicación." },
                { title: "Context API", text: "Una característica nativa que actúa como una red de comunicación global. Permite compartir piezas de datos sensibles a toda la app de forma directa, eliminando prop drilling." },
                { title: "CSS Modules", text: "Un enfoque donde los estilos CSS tienen un alcance local o encapsulado por defecto. Resuelve los conflictos de colisión de nombres de clase al generar referencias únicas durante la compilación." },
                { title: "className", text: "El equivalente en JSX al atributo class de HTML. Dado que class es una palabra reservada en Javascript, se utiliza className para aplicar estilos css a los componentes." },
                { title: "Code Splitting", text: "Técnica de optimización avanzada. En lugar de descargar toda la aplicación de una vez, divide el paquete en trozos y carga solo lo necesario para la ruta en la que está interactuando el usuario." },
                { title: "Custom Hook", text: "Una función propia que comienza con 'use' y que encapsula llamadas a otros hooks básicos. Sirve para reutilizar lógica de estado entre múltiples componentes separados de la arquitectura visual." }
            ]
        },
        {
            id: "react-vocab-d-h",
            title: "Glosario D - H",
            description: "Conceptos sobre el DOM, eventos, fragmentos y la amplia gama de Hooks.",
            content: [
                { title: "DOM (Document Object Model)", text: "La interfaz de programación que representa y modela los documentos HTML estructurados en forma de árbol. Permite que JavaScript manipule su contenido o estilo." },
                { title: "Virtual DOM", text: "La innovación principal que dio popularidad a React. Es una copia ligera del DOM real guardada en la memoria, usándose para calcular rápidamente los cambios antes de repintar la pantalla interactiva real (operación costosa)." },
                { title: "Declarative", text: "Un paradigma de programación fundamental en React. Significa que describes cómo debe verse la UI para los datos estáticos o mutables determinados, sin tener que escribir instrucciones directas e imperativas sobre las etiquetas del DOM." },
                { title: "Dependencies Array", text: "El segundo argumento proporcionado a los hooks como useEffect o useMemo. Controla explícitamente cuándo debe dispararse una reacompilación o validando cambios exclusivos en variables locales que allí coloques." },
                { title: "Destructuring", text: "Una sintaxis compacta de JavaScript para desempaquetar las propiedades (como las variables agrupadas) de manera aislada en constantes independientes o en pasos por parámetros con props." },
                { title: "Diffing Algorithm", text: "Un sofisticado proceso de comparación integrado dentro de React que evalúa contrastes entre cómo lucía el Virtual DOM previo frente al que le seguiría. Localiza quirúrgicamente las pequeñas variables para modificarlas sin molestar otras cosas." },
                { title: "Effect", text: "Operaciones secundarias o complementarias que se sincronizan tangencialmente al renderizado directo base visual del sistema operativo en red. Ejemplo claro, traer bases JSON asíncronas." },
                { title: "Error Boundary", text: "Componentes encapsuladores especiales. Previenen que algún fallo severo ocasional en una región de pantalla tumbe estrepitosamente la aplicación principal global." },
                { title: "Fragment", text: "Una invención y etiqueta nativa envolturada transparente (<>...</>). Puesto por limitantes semánticas que dictaban retornar grupos englobados en nodos sencillos que pudiesen desbalancear o deformar estéticas puras en cascadas previas de flex, etc." },
                { title: "Fiber", text: "Estructuración interna reescrita (Arquitectura profunda en algoritmia y Reconciliación de render). Desarrollado a medida posibilitadora para poder suspender las rutinas colosales momentáneamente si las de alta frecuencia llegan de la interacción física instantánea del consumidor." },
                { title: "forwardRef", text: "La técnica indispensable para pasar transparentemente las herramientas operativas punteras locales inter-nodos (Referenciando campos inputs de un módulo interno por la ventana desde el sistema Superior controlador que requiere forzar focos automáticos por dar ejemplos)." },
                { title: "Hook", text: "Ganchos operacionales nativos preestablecidos enfocados a otorgar funciones y facilidades interactivas u operativas atadas a componentes desprendidos y liberados a no usar esquemas forzados y densos tipo objetos de clase pura." },
                { title: "useState", text: "Hook insignia y primer cimiento a conocer en el React Moderno de hoy en día. Creado a manera especial reservando pequeños datos intermitentes que dispararian la auto actualización local gráfica y su reciclado subyacente de UI bajo cada detonación de función re-asignadora." },
                { title: "useEffect", text: "Instrumento enfocado al amarre a situaciones colaterales no referidas a la representación ininterrumpida principal puramente calculada. Excelente o vitalmente imprescindible para iniciar y finalizar operaciones de limpieza de basuras residuales." },
                { title: "useContext", text: "Puente local facilitador o teletransportador genérico de consumición (Consumidores) usado de la mano en los creadores (Providers) globales previniendo la delegación cascada de las Props en infiernos escalonados." },
                { title: "useReducer", text: "Esquema superior enlazado al State. Condensa o encapsula transformaciones extremadamente rigurosas basando resoluciones estrictamente atadas a disparadores puntuales descifrando una enorme fuente múltiple localizada internamente." },
                { title: "useCallback", text: "Funciones empaquetadas preservadas en memorias limitadas las cuales resguardan interrupciones no necesarias debido a evaluaciones internas estrictamente enfocadas en referenciales que no habían detectado nuevas variaciones." },
                { title: "useMemo", text: "Método que interceptará cargas computables excesivas a algoritmos complicados que no necesitan rehacer o procesarse una y otra vez con resultados inequívocamente predecibles." },
                { title: "useRef", text: "Clave técnica apuntadora exclusiva diseñada que retiene valores con persistencia. No reactores gráficos en absoluto (Silenciosa en el Background), permitiendo la exploración u alteración base directa hacia componentes del núcleo sin notificar un solo refresque al observador general de la virtualización." }
            ]
        },
        {
            id: "react-vocab-i-p",
            title: "Glosario I - P",
            description: "Términos sobre inmutabilidad, JSX, carga perezosa y el manejo de Props.",
            content: [
                { title: "Immutability", text: "Un pilar de diseño restrictivo que indica que no se deben modificar datos directamente (como hacer push a un array en el estado). Se deben crear copias modificadas para garantizar que React detecte los cambios y renderice correctamente." },
                { title: "JSX (JavaScript XML)", text: "El corazón y alma de las interfaces de React. Es una extensión que permite mezclar de manera fluida estructuras visuales (HTML) con variables y lógica en un mismo documento." },
                { title: "JSON", text: "Acrónimo de JavaScript Object Notation. Formato universal muy popular por el cual nos conectamos y transaccionamos mediante los endpoints (APIs) recibiendo datos." },
                { title: "Key", text: "Una prop especial referencial para optimización inyectada. Soluciona ambigüedades operativas e identifica quirúrgicamente con el algoritmo subyacente cuáles ítems alteran listas (mutables/borradas) interactivamente iteradas." },
                { title: "Lazy Loading", text: "Táctica en escalabilidad dividiendo las subidas pesadas (vistas ocultas/internas) aplazándolas de memoria hasta un preciso segundo y tiempo requerible." },
                { title: "Lifting State Up", text: "Patrón donde cuando más de un solo hermano visual necesita conocer detalles homólogos compartidos u operados mutables, el origen interactivo debe de reubicarse a un Padre visual originario intermedio englobado mutuamente superior." },
                { title: "Mounting", text: "Instante o punto biográfico elemental asociado en la existencia o primer nacimiento real sobre la pantalla general de tus componentes aislados." },
                { title: "Memoization", text: "Páctica sistemática que congela respuestas en peticiones pesadas devolviéndolas rápido y previniendo los bloqueos." },
                { title: "Next.js", text: "Estructura colosal moderna montada encima de las fundaciones puras de la librería impulsando la entrega originada preconstruida al instante con Server Side Rendering que catapulta la visibilidad (SEO)." },
                { title: "One-Way Data Flow", text: "Mecánica central. Datos de aplicación nacidos bajo los estados internos purificados viajan exclusiva y restringidamente descendientes en el árbol cascada sin posibilidad de regresar mutables subiendo a orígenes de no inyectarle delegados pasables." },
                { title: "Props", text: "Canalización parametrizada universal transferida descendientemente con similitudes asombrosas a las opciones fijas puramente inyectadas o puestas sobre atributos HTML de antaño (pero de índole complejo o variables programables)." },
                { title: "Portal", text: "Hoyo o portal de reactivación directa incrustadora para saltarse la jerarquía limitante o contenedora actual hacia un nodo padre HTML externo principal (Comúnmente usado al momento para alertas top level sobre puestas e inmunes o Pop-ups de Modales absolutos)." },
                { title: "Provider", text: "Cúspide inyectable asociada a propagar con alcance global masificado a todo sub elemento anidando contexto (Red local operativa) con el fin de resolver carencias referenciales masivas a heredar prop sobre prop infinitamente intermedio." }
            ]
        },
        {
            id: "react-vocab-r-s",
            title: "Glosario R - S",
            description: "Reconciliación, enrutamiento, estado y las bondades de Suspense.",
            content: [
                { title: "Reconciliation", text: "El algoritmo subyacente de React que se usa para diferenciar un árbol de componentes con el árbol anterior para determinar qué partes necesitan ser cambiadas, logrando así actualizaciones predecibles y veloces en la vista real." },
                { title: "React Router", text: "La capa estándar defacto implementable en navegadores de SPA modernas, la cual sirve como guía local e intercepta inteligentemente qué segmento de interfaces gráficas intercambiar cuando cambia la dirección sin recargar la página." },
                { title: "Reducer", text: "Función determinística (State Machine) la cual enruta acciones acompañadas de identificadores ('payload') a fin de desencadenar transformaciones muy complejas de estado global de la interfaz de manera estructurada." },
                { title: "Render", text: "Instrucciones activadas en serie. Evalúan todos los componentes interconectados bajo la lógica funcional, transformando los datos subyacentes en el objetivo HTML nativo desplegable en pantalla." },
                { title: "Re-render", text: "Nueva evaluación (Render) manifestada automáticamente como efecto o trigger. Causante de actualizaciones reactivas en cascada tras cualquier cambio interactivo detectado en los estados base o props parentales." },
                { title: "State", text: "Memoria de vida enlazada y vigilada por un componente independiente dentro del flujo de la interfaz. Los cambios a sus variables incitan inevitablemente a redibujar las dimensiones y colores físicos de la aplicación." },
                { title: "SPA (Single Page Application)", text: "Arquitectura moderna orientada fuertemente por Reactivas e impulsada desde el marco original de frontend que solo hace un 'request' inicial al servidor y recarga los datos JSON sin refrescar o cargar jamás nuevas páginas HTML completas." },
                { title: "SSR / SSG", text: "Renders o compiladores especiales donde el origen del procesamiento transcurre enteramente en el Servidor (BackEnd) que transfiere interfaces pre-esculpidas directamente al formato textual puro HTML comprensible rápido para robots indexadores (SEO)." },
                { title: "Strict Mode", text: "Poderosa herramienta inofensiva e imperceptible tras un despliegue masivo final a producción. Durante desarrollo, revisa tu trabajo doblemente repeticionando las reglas visuales a fin de visibilizar de antemano side-effects problemáticos." },
                { title: "Suspense", text: "Un envolvedor para tiempos inciertos y arquitecturas de cargas diferidas. Delimita un impacto de fallo de algo que todavía no descargó exponiendo la interfase a mostrar UI alternativa controlada tipo Spinner previendo fallos subyacentes." }
            ]
        },
        {
            id: "react-vocab-t-z",
            title: "Glosario T - Z",
            description: "Tipado, utilidades, herramientas de construcción y gestión de estado.",
            content: [
                { title: "TypeScript", text: "Superconjunto con reglas rigurosas y tipado estático que se posiciona sobre el JavaScript estándar de navegador. Analizará predictivamente errores semánticos u objectos nulos sin requerir llegar primero al cliente operativo final." },
                { title: "Tailwind CSS", text: "Marco iterativo orientado altamente en un enfoque utilitario (Atomizado) para poder moldear y generar interfaces al interior combinándolas directamente desde las llaves JSX, esquivando totalmente escribir sábanas abotargadas referenciales de clases." },
                { title: "Vite", text: "Herramienta asombrosamente rápida inyectando interacción simultánea con el modelo original de ES Modules (Browser Nativos). Desmorona drásticamente letargos en reinicio de consola y arranques interminables." },
                { title: "Webpack", text: "El antepasado tradicional o gestor clásico histórico empaquetador enfocado en unir sub-dependencias globales dentro de la época clásica en construcciones pre-Vite. Resolviendo encadenamientos abstractos enormes antes del envío." },
                { title: "XSS (Cross-Site Scripting)", text: "Vulnerabilidad clásica destructiva asimilable por inyecciones en la web in-protegida. React esteriliza textos introducidos neutralizándoles de forma casi absoluta salvo cuando pides escapar explícitamente contenido riesgoso." },
                { title: "Yarn / npm", text: "Centrales cooperativas colaborativas universales interconectables. Albergando el coloso depósito unificado con líneas de comandos especializadas orientadas altamente para descargar paquetes o sub-librerías a tu sistema privado." },
                { title: "Zustand", text: "Solucionador y aliviador global minimalista para entornos en base mutable que evita sumergirse de cabeza frente al enorme contexto envolvente o red de Redux tradicional para Reactivos masivos contemporáneos." }
            ]
        },
        {
            id: "react-vocab-v19",
            title: "Novedades React 19",
            description: "Las últimas características introducidas en la versión 19 de React.",
            content: [
                { title: "Actions", text: "Soporte nativo integrado en librerías superiores de envíos asíncronos directamente atados al clásico modelamiento bajo formulario web HTML ('<form action...>'). Ocultando una inmensa infraestructura para cargas pendientes." },
                { title: "useActionState", text: "Un Hook específico reactualizado que asiste enganchando coordinadamente la respuesta en torno a las entregas de funciones Action. Facilita lecturas centralizadas sobre la consumición asíncrona validada, encolamiento de envío y errores captables de Servidor API." },
                { title: "useOptimistic", text: "Una interfaz inalcanzable previo a React 19 usada internamente enfocándose a emular simuladamente respuestas backend favorables haciendo mutables al momento los perfiles UX visuales a la par de aguardar su verdadera confirmación remota." },
                { title: "use() Hook", text: "Revolución API moderna que provee una lectura libre ante los esquemas que rompen reglas sagradas preexistentes de los Hooks funcionales clásicos y rígidos originando acceso simple en loops condicionales internos (Lectura a 'promises' on-the-go)." },
                { title: "React Compiler", text: "Avance transpilador de la siguiente década orientado en optimización al fondo. Evalúa, intuye y automatiza matemáticamente por ti dependencias algorítmicas sin tu necesidad activa de resguardar o emplear memorizaciones rudimentarias extensas." },
                { title: "Server Components", text: "Categoría de componentes primarios que nacen bajo ambiente exclusivamente central del Backend y fallecen ahí, delegando o remitiendo UI limpia a las conexiones del cliente para que naveguen y operen aligeradamente bajo coste Cero-JS (Zero Bundle Size)." }
            ]
        }
    ]
};
