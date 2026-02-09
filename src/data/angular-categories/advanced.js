export const advancedCategory = {
    title: "8. Características Avanzadas",
    topics: [
        {
            id: "ng-defer",
            title: "Deferrable Views (@defer)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es una herramienta de optimización que permite posponer la carga de una parte del template hasta que sea realmente necesaria."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Reduce drásticamente el tamaño del archivo inicial que descarga el usuario, haciendo que la web cargue mucho más rápido."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita cargar componentes pesados (como un mapa o una gráfica) que están al final de la página y que quizás el usuario nunca llegue a ver."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para componentes grandes or secundarios de la página. No conviene para contenido crítico que debe verse de inmediato 'above the fold'."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos básicos de rendimiento web y componentes Angular."
                }
            ],
            syntaxDescription: "El bloque @defer es como un interruptor de luz inteligente: solo gasta energía (descarga archivos) cuando tú entras en la habitación (scrolleo) o cuando pulsas el botón (interacción).",
            description: "Carga diferida inteligente para mejor rendimiento.",
            code: `@defer (on viewport) {
  <app-mapa-pesado />
} @placeholder {
  <div>Cargando mapa...</div>
}`,
            useCases: [
                {
                    title: "Mapa de Ubicación",
                    description: "Cargar la librería pesada de Google Maps solo cuando el usuario hace scroll y llega a la sección de contacto.",
                    code: `@defer (on viewport) { <google-map /> }`
                },
                {
                    title: "Comentarios de un Blog",
                    description: "Cargar la sección de comentarios solo cuando el usuario hace clic en el botón 'Ver comentarios' (on interaction).",
                    code: `@defer (on interaction(btn)) { <app-comments /> } \n <button #btn>Cargar</button>`
                }
            ]
        },
        {
            id: "ng-animations",
            title: "Animaciones",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es el sistema de Angular para crear transiciones suaves entre diferentes estados de los elementos de la interfaz."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Mejora la experiencia de usuario (UX) haciendo que la aplicación se sienta fluida, profesional y amigable."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Elimina la tosquedad de elementos que aparecen o desaparecen de golpe, guiando la atención del usuario hacia los cambios."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para transiciones de estado importantes. No conviene abusar de ellas (demasiadas animaciones pueden marear o hacer que la app se sienta lenta)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos básicos de CSS Transitions y Animaciones."
                }
            ],
            syntaxDescription: "Las animaciones en Angular son como el guion de una película de acción: defines un punto de partida ('style'), una trayectoria de movimiento ('animate') y un desenlace final para los elementos de tu pantalla.",
            description: "Mejora de la experiencia de usuario mediante movimiento.",
            code: `animations: [
  trigger('slide', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('200ms ease-out', style({ transform: 'translateX(0)' }))
    ])
  ])
]`,
            useCases: [
                {
                    title: "Menú Lateral (Sidebar)",
                    description: "Hacer que el menú se deslice suavemente desde la izquierda cuando el usuario presiona el icono de hamburguesa.",
                    code: `state('open', style({ width: '250px' })), transition('* => open', [ animate('0.3s') ])`
                },
                {
                    title: "Feedback de Guardado",
                    description: "Un pequeño mensaje de 'Check' verde que aparece con un rebote suave al completar una acción.",
                    code: `transition(':enter', [ style({ scale: 0 }), animate('0.5s cubic-bezier(.17,.67,.83,.67)', style({ scale: 1 })) ])`
                }
            ]
        }
    ]
};
