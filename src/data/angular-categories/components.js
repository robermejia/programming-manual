export const componentsCategory = {
    title: "1. Componentes y Signals",
    topics: [
        {
            id: "ng-components",
            title: "Componentes Standalone",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es un componente que no requiere estar declarado en un 'NgModule'. Se define con la propiedad 'standalone: true' y gestiona sus propias dependencias a través del array 'imports'."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Simplifica el aprendizaje y el desarrollo al eliminar la complejidad de los módulos. Permite una carga diferida (lazy loading) mucho más directa y granular."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Elimina el error común de 'componente no declarado' y facilita la reutilización de componentes entre diferentes partes de la aplicación sin arrastrar módulos pesados."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene usarlo siempre en aplicaciones modernas (Angular 15+). No conviene si estás trabajando en una aplicación legacy masiva que depende estrictamente de una arquitectura basada en módulos ya establecida."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conocimientos básicos de HTML, CSS y TypeScript (clases y decoradores)."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Migración",
                    content: "Puedes convertir componentes antiguos a standalone usando el CLI de Angular.",
                    code: "ng generate @angular/core:standalone"
                }
            ],
            syntaxDescription: "El decorador @Component con 'standalone: true' es como un kit de LEGO que ya viene con todas las piezas necesarias en su caja interna ('imports'), sin depender de un cajón externo compartido ('NgModule').",
            description: "Arquitectura moderna sin módulos (standalone).",
            code: `@Component({
  selector: 'app-saludo',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>Hola {{ nombre }}</h1>'
})
export class SaludoComponent {
  nombre = 'Usuario';
}`,
            useCases: [
                {
                    title: "Botón Reutilizable",
                    description: "Creación de un componente de botón que se puede importar en cualquier parte de la app sin configurar módulos.",
                    code: `@Component({
  selector: 'app-btn',
  standalone: true,
  template: '<button><ng-content></ng-content></button>'
})
export class BtnComponent {}`
                },
                {
                    title: "Carga Diferida de Tarjeta",
                    description: "Uso de un componente standalone para ser cargado solo cuando el usuario navega a una ruta específica.",
                    code: `{ path: 'perfil', loadComponent: () => import('./perfil.component').then(m => m.PerfilComponent) }`
                }
            ]
        },
        {
            id: "ng-signals",
            title: "Signals (Reactividad)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es un sistema que envuelve un valor y notifica a los interesados cuando cambia. Se compone de 'signal' (valor), 'computed' (valor derivado) y 'effect' (acción lateral)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Mejora drásticamente el rendimiento al permitir que Angular sepa exactamente qué parte de la pantalla debe actualizarse, sin tener que revisar todo el árbol de componentes (Change Detection)."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Sustituye la complejidad de Zone.js y reduce la necesidad de usar RxJS para el estado local, haciendo el código más predecible."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para el estado síncrono que afecta a la UI. No conviene para flujos de datos asíncronos complejos o eventos de red, donde RxJS sigue siendo superior."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Comprensión de variables y funciones básicas en TypeScript."
                }
            ],
            tips: [
                {
                    type: "warning",
                    title: "Lectura",
                    content: "Recuerda que para obtener el valor debes invocar la signal como una función.",
                    code: "console.log(miSignal()); // Correcto\nconsole.log(miSignal); // Error (muestra la función)"
                }
            ],
            syntaxDescription: "Una 'signal' es como un sensor de movimiento conectado a una bombilla: en cuanto detecta un cambio (un nuevo valor), avisa instantáneamente a los interesados ('computed' o 'effect') para que reaccionen.",
            description: "Sistema de reactividad granular y eficiente.",
            code: `contador = signal(0);
doble = computed(() => this.contador() * 2);

incrementar() {
  this.contador.update(v => v + 1);
}`,
            useCases: [
                {
                    title: "Carrito de Compras",
                    description: "Uso de signals para actualizar el total del carrito automáticamente cada vez que se añade un producto.",
                    code: `items = signal([]);
total = computed(() => this.items().reduce((acc, obj) => acc + obj.precio, 0));`
                },
                {
                    title: "Log de Cambios",
                    description: "Uso de 'effect' para guardar en el localStorage cada vez que una preferencia del usuario cambia.",
                    code: `effect(() => localStorage.setItem('theme', this.theme()));`
                }
            ]
        }
    ]
};
