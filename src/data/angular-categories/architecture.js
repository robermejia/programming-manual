export const architectureCategory = {
    title: "9. Arquitectura y Entornos",
    topics: [
        {
            id: "ng-host",
            title: "Host Bindings",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es una forma de gestionar las propiedades y eventos del elemento que contiene a nuestro componente."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite que el componente se autogestione sin necesidad de que el padre tenga que pasarle clases o estilos externos."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Centraliza la lógica visual de un componente. Por ejemplo, que una tarjeta cambie de color automáticamente cuando su estado interno cambia a 'activo'."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para componentes reutilizables como botones o tarjetas personalizadas. No conviene si la lógica depende puramente de un estilo global de la app."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Property y Event binding básicos."
                }
            ],
            syntaxDescription: "El 'Host' es la piel exterior de tu componente. El 'Host Binding' es como si tú mismo pudieras decidir de qué color es tu piel o cómo reaccionas cuando alguien te toca, sin esperar a que alguien de fuera te lo ordene.",
            description: "Control absoluto sobre el elemento protector del componente.",
            code: `@Component({
  host: {
    '[class.elevado]': 'isElevated',
    '(click)': 'toggle()'
  }
})`,
            useCases: [
                {
                    title: "Foco Automático",
                    description: "Un componente de entrada personalizada que se pone un borde azul automáticamente al recibir el foco.",
                    code: `host: { '[class.focused]': 'isFocused', '(focus)': 'onFocus()' }`
                },
                {
                    title: "Navegación por Teclado",
                    description: "Hacer que un componente de 'tarjeta' responda a la tecla 'Enter' como si fuera un clic, gestionándolo desde el host.",
                    code: `host: { '(keydown.enter)': 'onClick()' }`
                }
            ]
        },
        {
            id: "ng-environments",
            title: "Archivos de Entorno (Configuration)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es un sistema de archivos que permite tener diferentes configuraciones para desarrollo y producción."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita el riesgo de usar la base de datos de producción durante las pruebas locales y automatiza el cambio de variables al desplegar."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite cambiar URLs de APIs, claves de servicios y niveles de log sin tener que editar el código fuente manualmente antes de subirlo a la nube."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene en cualquier proyecto que salga a internet. No tiene sentido en proyectos de práctica personal de un solo archivo."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de CI/CD básicos (despliegue)."
                }
            ],
            syntaxDescription: "Los archivos de entorno son como tener diferentes 'modos' de funcionamiento para tu aplicación: un 'Modo Taller' (Desarrollo) con herramientas de prueba, y un 'Modo Carrera' (Producción) optimizado para el usuario final.",
            description: "Configuración variable segura para cada etapa del proyecto.",
            code: `// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.miempresa.com'
};`,
            useCases: [
                {
                    title: "Cambio de API",
                    description: "Usar 'http://localhost:3000' en tu PC y que al subir a la nube pase solo a 'https://api.web.com'.",
                    code: `import { environment } from './env'; \n this.http.get(environment.apiUrl + '/users');`
                },
                {
                    title: "Modo Debug",
                    description: "Mostrar logs detallados en la consola solo si estamos en el entorno de desarrollo.",
                    code: `if (!environment.production) { console.log('Log detallado...'); }`
                }
            ]
        }
    ]
};
