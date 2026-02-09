export const templatesCategory = {
    title: "2. Templates y Control Flow",
    topics: [
        {
            id: "ng-control-flow",
            title: "Control Flow (@if, @for, @switch)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es la sintaxis nativa de Angular para manejar condicionales y bucles directamente en el template, similar a los lenguajes de programación tradicionales."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es mucho más rápido que las antiguas directivas (*ngIf), ofrece mejor chequeo de tipos y no necesita importar módulos adicionales (como CommonModule)."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita el uso de contenedores adicionales como <ng-container> solo para aplicar lógica y soluciona problemas de rendimiento en listas grandes."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene usarlo en todos los nuevos desarrollos. No conviene si usas versiones de Angular anteriores a la 17."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Lógica básica de programación (if/else, bucles for)."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "@empty",
                    content: "El bloque @for incluye un @empty opcional que se muestra si la lista está vacía.",
                    code: "@for(i of lista; track i.id) { ... } @empty { No hay datos }"
                }
            ],
            syntaxDescription: "La nueva sintaxis @ es como escribir JavaScript directamente dentro del HTML. @if es el portero que deja entrar o no a una sección, y @for es el capataz que repite una tarea por cada elemento de una lista, usando 'track' para acordarse de quién es quién.",
            description: "Lógica de control nativa y eficiente en el template.",
            code: `@if (activo) {
  <span>Online</span>
} @else {
  <span>Offline</span>
}

@for (user of usuarios; track user.id) {
  <p>{{ user.name }}</p>
}`,
            useCases: [
                {
                    title: "Lista de Productos",
                    description: "Mostrar una cuadrícula de productos con un mensaje de 'No hay stock' si la lista viene vacía.",
                    code: `@for (p of productos; track p.id) { <card [info]="p"/> } @empty { <p>No hay productos disponibles</p> }`
                },
                {
                    title: "Panel de Roles",
                    description: "Mostrar diferentes botones de acción dependiendo de si el usuario es 'admin', 'editor' o 'lector' usando @switch.",
                    code: `@switch (rol) { @case ('admin') { <button>Borrar</button> } @default { <button>Ver</button> } }`
                }
            ]
        },
        {
            id: "ng-bindings",
            title: "Property y Event Binding",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es el mecanismo para pasar datos del código a la vista (Property []) y capturar acciones del usuario (Event ())."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite que la aplicación sea interactiva y responda en tiempo real a los cambios de datos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Automatiza la actualización del DOM. Ya no tienes que buscar elementos por ID y cambiar su valor manualmente con JS puro."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene siempre que necesites dinamismo. No conviene para contenido que es 100% estático."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos básicos de atributos HTML y eventos del DOM."
                }
            ],
            syntaxDescription: "Los corchetes [prop] son como un cable que lleva electricidad (datos) desde tu código TS hacia el HTML. Los paréntesis (event) son como un sensor en el HTML que envía una señal de vuelta a tu código cuando alguien lo toca.",
            description: "Comunicación bidireccional entre datos y vista.",
            code: `<!-- Pasar dato al HTML -->
<img [src]="fotoUrl">

<!-- Escuchar acción del usuario -->
<button (click)="guardar()">Guardar</button>`,
            useCases: [
                {
                    title: "Deshabilitar Botón",
                    description: "Bloquear un botón de envío mientras se está procesando una petición al servidor para evitar duplicados.",
                    code: `<button [disabled]="cargando" (click)="enviar()">Enviar</button>`
                },
                {
                    title: "Galería de Imágenes",
                    description: "Cambiar la imagen principal de una galería cuando el usuario hace clic en una miniatura.",
                    code: `<img [src]="imgPrincipal"> \n <img (click)="imgPrincipal = th.url" *for="...">`
                }
            ]
        },
        {
            id: "ng-interpolation",
            title: "Interpolación",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es el uso de dobles llaves {{ }} para incrustar valores dinámicos dentro del texto de un template."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es la forma más sencilla y común de mostrar información al usuario."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite concatenar texto y variables de forma limpia directamente en el HTML."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para mostrar texto plano. No conviene para asignar valores a atributos (usa property binding [] en ese caso)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Manejo de variables en TypeScript."
                }
            ],
            syntaxDescription: "Las dobles llaves {{ }} son como un hueco en la pared del HTML donde se proyecta la imagen (valor) que hay en tu código TS. Si el valor cambia en el código, la proyección en el hueco cambia instantáneamente.",
            description: "Incrustración de datos dinámicos en texto.",
            code: `<p>Bienvenido, {{ nombreUsuario }}</p>
<p>Total: {{ precio * cantidad }}</p>`,
            useCases: [
                {
                    title: "Contador de Caracteres",
                    description: "Mostrar cuántas letras ha escrito el usuario en un campo de texto en tiempo real.",
                    code: `<textarea #txt></textarea> \n <p>Caracteres: {{ txt.value.length }}</p>`
                },
                {
                    title: "Mensaje Dinámico",
                    description: "Mostrar un saludo personalizado que incluye la fecha actual formateada.",
                    code: `<h3>Hoy es {{ fechaHoy | date:'fullDate' }}</h3>`
                }
            ]
        }
    ]
};
