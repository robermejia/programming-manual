export const httpRxjsCategory = {
    title: "7. HTTP y RxJS",
    topics: [
        {
            id: "ng-http",
            title: "HttpClient",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es el servicio oficial de Angular para realizar peticiones HTTP (comunicación con bases de datos o servicios externos)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite que la aplicación sea dinámica al poder consumir y enviar datos reales a un servidor."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Simplifica el manejo de cabeceras, parámetros de consulta y errores de red, integrándose perfectamente con el ecosistema de Observables."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene siempre que necesites datos de una API. No conviene si los datos son estáticos (usa archivos JSON locales en ese caso)."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Conceptos de REST (GET, POST, etc.) y Observables (RxJS)."
                }
            ],
            syntaxDescription: "HttpClient es como el mensajero de tu aplicación: va hasta el buzón de la calle (URL), pide un paquete (datos), y te lo entrega a través de una tubería ('Observable') que tú vigilas desde tu código.",
            description: "Comunicación con servicios externos y APIs.",
            code: `http = inject(HttpClient);
getData() {
  return this.http.get('/api/resource');
}`,
            useCases: [
                {
                    title: "Obtener Perfil",
                    description: "Cargar los datos de un usuario desde el servidor al entrar a su perfil.",
                    code: `user$ = this.http.get<User>('/api/profile/1');`
                },
                {
                    title: "Subir Imagen",
                    description: "Enviar un archivo seleccionado por el usuario mediante un POST con FormData.",
                    code: `const fd = new FormData(); fd.append('file', blob); \n this.http.post('/api/upload', fd).subscribe();`
                }
            ]
        },
        {
            id: "ng-rxjs",
            title: "RxJS (Programación Reactiva)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es una biblioteca para manejar flujos de datos asíncronos mediante colecciones de eventos observables."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite gestionar múltiples acciones asíncronas (como clics del usuario, timers y peticiones HTTP) de forma unificada y elegante."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Soluciona el 'callback hell' (pirámide de funciones anidadas) y facilita tareas como cancelar peticiones viejas si el usuario hace clic muy rápido."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para cualquier flujo asíncrono complejo. No conviene si una simple Promesa de JS es suficiente para un caso muy aislado."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Programación funcional básica (map, filter)."
                }
            ],
            syntaxDescription: "RxJS es como una cadena de montaje: los datos (eventos o respuestas HTTP) pasan por una cinta transportadora ('pipe') donde les ponemos etiquetas ('map'), descartamos los defectuosos ('filter') o esperamos a que no vengan muchos seguidos ('debounce').",
            description: "Manejo de flujos de datos asíncronos.",
            code: `this.data$.pipe(
  map(res => res.items),
  filter(items => items.length > 0)
).subscribe();`,
            useCases: [
                {
                    title: "Buscador 'Type-ahead'",
                    description: "Esperar 300ms a que el usuario deje de escribir antes de lanzar la petición de búsqueda (debounceTime).",
                    code: `input.valueChanges.pipe(debounceTime(300), switchMap(v => search(v))).subscribe();`
                },
                {
                    title: "Reintento Automático",
                    description: "Si una petición falla por un micro-corte de internet, intentar la conexión 3 veces antes de mostrar error.",
                    code: `this.http.get('/api').pipe(retry(3)).subscribe();`
                }
            ]
        },
        {
            id: "ng-interceptors",
            title: "Interceptors",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Son funciones que 'atrapan' cada petición HTTP antes de que salga al servidor y cada respuesta antes de que llegue al componente."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite centralizar tareas repetitivas como añadir tokens de seguridad o registrar logs de errores."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Evita tener que añadir el 'Authorization Header' manualmente en cada una de las 50 peticiones HTTP que pueda tener tu app."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para autenticación y manejo global de errores. No conviene para lógica que sea específica de una sola llamada HTTP."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "HttpClient y RxJS."
                }
            ],
            syntaxDescription: "Un interceptor es como un peaje en la autopista HTTP: cada coche que pasa tiene que pagar una tasa (añadir token) o ser revisado por la policía (registrar logs) antes de que se le permita seguir su camino.",
            description: "Modificación global de peticiones HTTP.",
            code: `export const authInt: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({ ... });
  return next(reqClone);
};`,
            useCases: [
                {
                    title: "Añadir Token JWT",
                    description: "Pegar automáticamente el 'Bearer Token' en todas las llamadas salientes para que el backend nos reconozca.",
                    code: `req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });`
                },
                {
                    title: "Manejador de Errores 401",
                    description: "Si el servidor responde que la sesión expiró (401), el interceptor redirige al login automáticamente.",
                    code: `return next(req).pipe(catchError(e => { if(e.status===401) logout(); throw e; }));`
                }
            ]
        }
    ]
};
