export const diServicesCategory = {
    title: "4. Dependency Injection y Servicios",
    topics: [
        {
            id: "ng-services",
            title: "Servicios e Injectables",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Son clases diseñadas para compartir datos y lógica de negocio entre múltiples componentes."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita que los componentes se vuelvan 'pesados' y permite mantener una única fuente de verdad (Single Source of Truth)."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite que dos componentes alejados en la aplicación puedan compartir la misma información sin pasársela manualmente a través de todos los niveles intermedios."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para llamadas a APIs y estados globales. No conviene para lógica muy específica que solo un componente usará una vez."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Clases en TypeScript e Inyección de Dependencias básica."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "inject()",
                    content: "La función inject() es la forma moderna y recomendada de obtener servicios en Angular 21.",
                    code: "auth = inject(AuthService);"
                }
            ],
            syntaxDescription: "Un servicio es como el sistema de tuberías de un edificio: una infraestructura centralizada que suministra agua (datos) a todos los apartamentos (componentes) sin que cada uno tenga que cavar su propio pozo.",
            description: "Lógica de negocio y estados compartidos.",
            code: `@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal(false);
}`,
            useCases: [
                {
                    title: "Carrito Global",
                    description: "Mantener la lista de productos seleccionados accesible desde el buscador, el detalle y el finalizar compra.",
                    code: `export class CartService { items = signal([]); add(p) { this.items.update(i => [...i, p]); } }`
                },
                {
                    title: "Notificaciones (Toast)",
                    description: "Un servicio centralizado que permite disparar alertas o mensajes desde cualquier parte de la app.",
                    code: `export class AlertService { show(msg) { /* lógica para mostrar popup */ } }`
                }
            ]
        }
    ]
};
