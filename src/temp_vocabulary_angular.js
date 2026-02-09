export const vocabularyCategory = {
    title: "0. Vocabulario de Angular 21",
    topics: [
        {
            id: "ng-vocab-fundamentals",
            title: "Conceptos Fundamentales",
            description: "Términos esenciales sobre la arquitectura y el lenguaje base de Angular.",
            content: [
                { title: "Angular", text: "Framework de desarrollo web de código abierto mantenido por Google para construir aplicaciones de una sola página (SPA)." },
                { title: "TypeScript", text: "Lenguaje de programación tipado que es un superset de JavaScript, usado como lenguaje principal en Angular." },
                { title: "Component (Componente)", text: "Clase TypeScript decorada con @Component que controla una parte de la interfaz de usuario. Incluye la lógica, plantilla HTML y estilos." },
                { title: "Template (Plantilla)", text: "Código HTML que define la vista de un componente, puede incluir directivas y bindings de Angular." },
                { title: "Module (Módulo)", text: "Contenedor que agrupa componentes, directivas, pipes y servicios relacionados. Usa el decorador @NgModule." },
                { title: "Standalone Components", text: "Componentes que no requieren ser declarados en un NgModule, pueden importar sus propias dependencias directamente." }
            ]
        },
        {
            id: "ng-vocab-decorators",
            title: "Decoradores",
            description: "Anotaciones que definen metadatos y comportamientos para clases y propiedades.",
            content: [
                { title: "@Component", text: "Decorador que marca una clase como componente de Angular." },
                { title: "@NgModule", text: "Decorador que define un módulo de Angular." },
                { title: "@Injectable", text: "Marca una clase como disponible para la inyección de dependencias." },
                { title: "@Input", text: "Permite que una propiedad reciba datos desde un componente padre." },
                { title: "@Output", text: "Define un evento que puede ser emitido hacia un componente padre." },
                { title: "@ViewChild", text: "Permite acceder a un elemento hijo del template desde el componente." },
                { title: "@ViewChildren", text: "Permite acceder a múltiples elementos hijos del template." },
                { title: "@ContentChild", text: "Accede a contenido proyectado en el componente." },
                { title: "@HostListener", text: "Escucha eventos en el elemento host del componente." },
                { title: "@HostBinding", text: "Vincula una propiedad del host a una propiedad del componente." }
            ]
        },
        {
            id: "ng-vocab-data-binding",
            title: "Data Binding",
            description: "Mecanismos para sincronizar datos entre el componente y la vista.",
            content: [
                { title: "Interpolation (Interpolación)", text: "Sintaxis {{ }} para mostrar valores de propiedades en el template." },
                { title: "Property Binding", text: "Sintaxis [property]=\"value\" para vincular propiedades del DOM." },
                { title: "Event Binding", text: "Sintaxis (event)=\"handler()\" para manejar eventos del DOM." },
                { title: "Two-way Binding", text: "Sintaxis [(ngModel)]=\"property\" para binding bidireccional." },
                { title: "Attribute Binding", text: "Vincula atributos HTML usando [attr.attribute-name]." },
                { title: "Class Binding", text: "Vincula clases CSS usando [class.class-name]." },
                { title: "Style Binding", text: "Vincula estilos inline usando [style.style-property]." }
            ]
        },
        {
            id: "ng-vocab-directives",
            title: "Directivas",
            description: "Clases que modifican la estructura o el comportamiento de los elementos del DOM.",
            content: [
                { title: "Directive (Directiva)", text: "Clase que modifica el comportamiento o apariencia de elementos del DOM." },
                { title: "Structural Directives", text: "Modifican la estructura del DOM (agregan/eliminan elementos)." },
                { title: "@if", text: "Control de flujo condicional moderno (reemplaza *ngIf)." },
                { title: "@for", text: "Control de flujo para iteraciones (reemplaza *ngFor)." },
                { title: "@switch", text: "Control de flujo para múltiples condiciones (reemplaza *ngSwitch)." },
                { title: "@defer", text: "Carga diferida de componentes y dependencias." },
                { title: "Attribute Directives", text: "Cambian la apariencia o comportamiento de un elemento." },
                { title: "ngClass", text: "Añade o elimina clases CSS dinámicamente." },
                { title: "ngStyle", text: "Aplica estilos inline dinámicamente." },
                { title: "ngModel", text: "Implementa binding bidireccional en formularios." }
            ]
        },
        {
            id: "ng-vocab-signals",
            title: "Signals (Señales)",
            description: "Primitivas reactivas para un manejo eficiente y granular del estado.",
            content: [
                { title: "Signal", text: "Primitiva reactiva que encapsula un valor y notifica cuando cambia." },
                { title: "signal()", text: "Función que crea una señal writable." },
                { title: "computed()", text: "Crea una señal de solo lectura derivada de otras señales." },
                { title: "effect()", text: "Ejecuta código cuando las señales que usa cambian." },
                { title: "WritableSignal", text: "Signal que puede ser modificado." },
                { title: "ReadonlySignal", text: "Signal de solo lectura." },
                { title: "set()", text: "Método para establecer el valor de una señal." },
                { title: "update()", text: "Método para actualizar el valor basado en el valor anterior." },
                { title: "mutate()", text: "Método para mutar objetos/arrays en señales." }
            ]
        },
        {
            id: "ng-vocab-di",
            title: "Servicios e Inyección de Dependencias",
            description: "Patrón para organizar y proveer lógica compartida a través de la aplicación.",
            content: [
                { title: "Service (Servicio)", text: "Clase que encapsula lógica de negocio y puede ser inyectada en componentes." },
                { title: "Dependency Injection (DI)", text: "Patrón de diseño para proveer dependencias a las clases." },
                { title: "Provider", text: "Configuración que indica cómo crear una instancia de una dependencia." },
                { title: "Injector", text: "Responsable de crear instancias de servicios y resolver dependencias." },
                { title: "inject()", text: "Función para inyectar dependencias, alternativa al constructor." },
                { title: "providedIn", text: "Propiedad que especifica dónde se provee un servicio ('root', 'platform', etc.)." },
                { title: "InjectionToken", text: "Token usado para inyección de valores que no son clases." }
            ]
        },
        {
            id: "ng-vocab-routing",
            title: "Routing",
            description: "Navegación y gestión de rutas en aplicaciones de una sola página.",
            content: [
                { title: "Router", text: "Servicio que maneja la navegación entre vistas." },
                { title: "Routes", text: "Array de configuración de rutas." },
                { title: "RouterOutlet", text: "Directiva que marca dónde se renderizan los componentes de ruta." },
                { title: "RouterLink", text: "Directiva para crear enlaces de navegación." },
                { title: "ActivatedRoute", text: "Servicio que contiene información sobre la ruta actual." },
                { title: "Route Guards", text: "Interfaces para controlar el acceso a rutas." },
                { title: "CanActivate", text: "Guard que determina si una ruta puede ser activada." },
                { title: "CanDeactivate", text: "Guard que determina si se puede salir de una ruta." },
                { title: "Resolve", text: "Guard que obtiene datos antes de activar una ruta." },
                { title: "Lazy Loading", text: "Carga de módulos bajo demanda para mejorar el rendimiento." },
                { title: "withComponentInputBinding", text: "Función que habilita el binding automático de parámetros de ruta a inputs." }
            ]
        },
        {
            id: "ng-vocab-forms",
            title: "Formularios",
            description: "Técnicas para la captura, validación y envío de datos de usuario.",
            content: [
                { title: "Reactive Forms", text: "Enfoque basado en código para manejar formularios de manera predecible." },
                { title: "Template-driven Forms", text: "Enfoque basado en directivas directamente en el template HTML." },
                { title: "FormControl", text: "Representa un control individual del formulario (ej. un input)." },
                { title: "FormGroup", text: "Grupo de controles de formulario que se gestionan juntos." },
                { title: "FormArray", text: "Array dinámico de controles de formulario." },
                { title: "FormBuilder", text: "Servicio para crear instancias de formularios de forma sintética." },
                { title: "Validators", text: "Clase con validadores predefinidos (required, minLength, etc.)." },
                { title: "AsyncValidator", text: "Validador que retorna una Promise o Observable para validaciones asíncronas." },
                { title: "ControlValueAccessor", text: "Interfaz para crear controles de formulario personalizados." }
            ]
        },
        {
            id: "ng-vocab-rxjs",
            title: "RxJS y Observables",
            description: "Programación reactiva para manejar flujos de datos asíncronos.",
            content: [
                { title: "Observable", text: "Objeto que emite múltiples valores a lo largo del tiempo." },
                { title: "Observer", text: "Objeto con métodos next, error y complete para procesar valores del Observable." },
                { title: "Subscription", text: "Representa la ejecución de un Observable, permite cancelar la suscripción." },
                { title: "Subject", text: "Observable especial que puede emitir valores a múltiples observadores (multicast)." },
                { title: "BehaviorSubject", text: "Subject que requiere un valor inicial y emite el último valor a nuevos suscriptores." },
                { title: "pipe()", text: "Método para encadenar operadores de RxJS para transformar el flujo." },
                { title: "map", text: "Operador que transforma cada valor emitido por un Observable." },
                { title: "filter", text: "Operador que solo deja pasar valores que cumplen una condición." },
                { title: "switchMap", text: "Operador que mapea a un nuevo Observable cancelando la suscripción anterior." },
                { title: "takeUntil", text: "Operador que completa el flujo cuando otro Observable emite un valor." }
            ]
        },
        {
            id: "ng-vocab-lifecycle",
            title: "Ciclo de Vida",
            description: "Etapas por las que pasa un componente desde su creación hasta su eliminación.",
            content: [
                { title: "Lifecycle Hooks", text: "Métodos que permiten ejecutar código en momentos específicos del ciclo." },
                { title: "ngOnInit", text: "Se ejecuta una vez después de la inicialización de las propiedades del componente." },
                { title: "ngOnChanges", text: "Se ejecuta cuando cambian las propiedades de entrada (@Input)." },
                { title: "ngOnDestroy", text: "Se ejecuta justo antes de que Angular destruya el componente o directiva." },
                { title: "ngAfterViewInit", text: "Se ejecuta después de que Angular inicialice la vista del componente." },
                { title: "ngAfterContentInit", text: "Se ejecuta después de procesar el contenido proyectado (<ng-content>)." },
                { title: "ngDoCheck", text: "Se ejecuta durante cada ciclo de detección de cambios de Angular." },
                { title: "DestroyRef", text: "Referencia inyectable para registrar callbacks de limpieza de forma funcional." }
            ]
        },
        {
            id: "ng-vocab-change-detection",
            title: "Change Detection",
            description: "Proceso interno de Angular para sincronizar el estado del componente con la vista.",
            content: [
                { title: "Change Detection", text: "Proceso que sincroniza el estado de los componentes con el DOM." },
                { title: "ChangeDetectorRef", text: "Servicio para controlar manualmente la detección de cambios en un componente." },
                { title: "OnPush", text: "Estrategia de detección de cambios optimizada: solo verifica ante cambios en Inpùts o eventos." },
                { title: "Default", text: "Estrategia de detección de cambios por defecto (recorre todo el árbol)." },
                { title: "markForCheck()", text: "Marca el componente y sus ancestros para ser verificados en el próximo ciclo." },
                { title: "detectChanges()", text: "Ejecuta inmediatamente la detección de cambios en el componente y sus hijos." },
                { title: "detach()", text: "Desconecta el componente del árbol de detección de cambios (suspende actualizaciones)." }
            ]
        },
        {
            id: "ng-vocab-pipes",
            title: "Pipes",
            description: "Utilidades para transformar datos directamente desde las plantillas HTML.",
            content: [
                { title: "Pipe", text: "Función que transforma datos en el template (ej. date, currency, json)." },
                { title: "Pure Pipe", text: "Pipe que solo se re-ejecuta cuando cambian sus argumentos de entrada." },
                { title: "Impure Pipe", text: "Pipe que se ejecuta en cada ciclo de detección de cambios (menos eficiente)." },
                { title: "DatePipe", text: "Formatea fechas según el locale configurado." },
                { title: "CurrencyPipe", text: "Formatea valores monetarios según monedas y regiones." },
                { title: "DecimalPipe", text: "Formatea números decimales (especificando dígitos, etc.)." },
                { title: "JsonPipe", text: "Convierte cualquier valor a un string en formato JSON para depuración." },
                { title: "AsyncPipe", text: "Suscribe automáticamente a Observables o Promises y maneja la desuscripción." },
                { title: "Upper/LowerCase", text: "Convierten texto a mayúsculas o minúsculas respectivamente." }
            ]
        },
        {
            id: "ng-vocab-http",
            title: "HTTP",
            description: "Comunicación con servicios externos mediante el protocolo HTTP.",
            content: [
                { title: "HttpClient", text: "Servicio para realizar peticiones HTTP (GET, POST, etc.) de forma reactiva." },
                { title: "HttpInterceptor", text: "Permite interceptar y modificar peticiones o respuestas de forma global." },
                { title: "HttpHeaders / Params", text: "Clases para manejar cabeceras y parámetros de URL respectivamente." },
                { title: "provideHttpClient", text: "Función para configurar e inicializar el cliente HTTP en la aplicación." },
                { title: "withInterceptors", text: "Función para registrar interceptores basados en funciones (moderno)." },
                { title: "withFetch", text: "Habilita el uso de la API Fetch nativa del navegador en lugar de XMLHttpRequest." }
            ]
        },
        {
            id: "ng-vocab-testing",
            title: "Testing",
            description: "Herramientas y conceptos para asegurar la calidad y el correcto funcionamiento del código.",
            content: [
                { title: "TestBed", text: "Principal utilidad para configurar entornos de prueba de Angular." },
                { title: "ComponentFixture", text: "Objeto que envuelve un componente de prueba para interactuar con él." },
                { title: "DebugElement", text: "Representación extendida del DOM para facilitar la inspección en tests." },
                { title: "Jasmine / Karma", text: "Framework de BDD y test runner tradicional de Angular." },
                { title: "beforeEach / it", text: "Funciones para organizar y definir casos de prueba individuales." },
                { title: "expect", text: "Función para realizar aserciones de verdad en los resultados de los tests." }
            ]
        },
        {
            id: "ng-vocab-build",
            title: "Build y Optimización",
            description: "Proceso de construcción y despliegue eficiente de la aplicación.",
            content: [
                { title: "Angular CLI", text: "Interfaz de línea de comandos para crear, desarrollar y desplegar Angular." },
                { title: "ng build / serve", text: "Comandos para compilar la aplicación para producción o servirla en desarrollo." },
                { title: "AOT Compilation", text: "Ahead-of-Time: Compila plantillas y estilos a JS durante el build." },
                { title: "Tree Shaking", text: "Eliminación automática de código muerto (no utilizado) en el bundle final." },
                { title: "Bundle / Chunk", text: "Archivos JS resultantes; los chunks permiten la carga diferida (lazy loading)." },
                { title: "Source Maps", text: "Archivos que mapean el código minificado con el código fuente original." },
                { title: "esbuild / Vite", text: "Herramientas de construcción ultra rápidas integradas en versiones modernas." }
            ]
        },
        {
            id: "ng-vocab-ssr",
            title: "Server-Side Rendering (SSR)",
            description: "Renderizado en servidor para mejorar el SEO y la carga inicial.",
            content: [
                { title: "Angular Universal", text: "Tecnología para renderizar aplicaciones Angular en el servidor (Node.js)." },
                { title: "SSR", text: "Server-Side Rendering: El servidor entrega el HTML completo al navegador." },
                { title: "Hydration", text: "Proceso donde el cliente toma el control del HTML estático renderizado por el servidor." },
                { title: "TransferState", text: "Servicio para pasar datos cacheables del servidor al cliente sin repetir peticiones." },
                { title: "renderApplication", text: "Función core para ejecutar el renderizado en un entorno de servidor." }
            ]
        },
        {
            id: "ng-vocab-animations",
            title: "Animations",
            description: "Creación de experiencias visuales fluidas y transiciones interactivas.",
            content: [
                { title: "@angular/animations", text: "Módulo oficial para definir animaciones complejas basadas en estados." },
                { title: "trigger", text: "Define un nombre para un grupo de estados y transiciones de animación." },
                { title: "state / transition", text: "Definen el estilo final de un estado y la duración/efecto al cambiar entre ellos." },
                { title: "style / animate", text: "Funciones para especificar los estilos CSS y los tiempos de la animación." },
                { title: "AnimationBuilder", text: "Servicio avanzado para crear y ejecutar animaciones dinámicamente desde TS." }
            ]
        },
        {
            id: "ng-vocab-i18n",
            title: "Internacionalización (i18n)",
            description: "Adaptación de la aplicación a diferentes idiomas y regiones.",
            content: [
                { title: "i18n / $localize", text: "Atributo en template y función en JS para marcar texto traducible." },
                { title: "LOCALE_ID", text: "Token de inyección que identifica el idioma actual de la aplicación." },
                { title: "@angular/localize", text: "Paquete oficial necesario para habilitar herramientas de traducción." }
            ]
        },
        {
            id: "ng-vocab-v21",
            title: "Nuevas Características Angular",
            description: "Últimos avances y APIs modernas introducidas en las versiones más recientes.",
            content: [
                { title: "Resource API", text: "Nueva API experimental simplificada para gestionar datos asíncronos." },
                { title: "Linked Signals", text: "Señales cuyo valor depende de otra señal y se resetean automáticamente." },
                { title: "Incremental Hydration", text: "Hidratación progresiva de componentes según visibilidad o interacción." },
                { title: "Signal-based Components", text: "Componentes reactivos que no dependen de Zone.js ni RxJS para actualizarse." },
                { title: "Functional Guards/Interceptors", text: "Versiones modernas basadas en funciones en lugar de clases inyectables." }
            ]
        }
    ]
};
