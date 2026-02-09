export const concurrenciaCategory = {
    title: "6. Concurrencia y Asincronía",
    topics: [
        {
            id: "threads",
            title: "Threads (Hilos)",
            videoUrl: "https://www.youtube.com/watch?v=DYL_41YGC1Q",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un trabajador independiente. Tu programa principal (`main`) es un hilo. Puedes crear más hilos para hacer varias cosas a la vez."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Para no congelar tu aplicación. Si descargas un archivo grande en el hilo principal de una UI, la ventana se congela. En un hilo separado, la UI sigue respondiendo."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Directamente (`new Thread`) casi nunca hoy en día. Úsalo a través de Executors. Pero entiende que es la base de todo."
                }
            ],
            description: "La base de la ejecución en paralelo.",
            code: `// Implementando Runnable
Runnable tarea = () -> {
    String hilo = Thread.currentThread().getName();
    System.out.println("Ejecutando en: " + hilo);
};

Thread hilo1 = new Thread(tarea);
hilo1.start(); // Inicia ejecución paralela
// hilo1.run(); // ERROR: Ejecutaría en el hilo main`,
            syntaxDescription: "Imagina una cocina. El `Thread` es un cocinero. Si tienes un solo cocinero (`main`), tiene que picar cebolla, luego freír carne, luego lavar platos, todo secuencial. Si contratas más cocineros (`Threads`), uno pica, otro fríe y otro lava AL MISMO TIEMPO.",
            useCases: [
                {
                    title: "Sincronización Básica",
                    description: "Evitar colisiones de datos con synchronized.",
                    code: `class Contador {
    private int cuenta = 0;
    
    // Solo un hilo puede entrar a la vez
    public synchronized void incrementar() {
        cuenta++;
    }
    
    public int getCuenta() { return cuenta; }
}`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Run vs Start",
                    content: "El error de novato #1. Si llamas a `t.run()`, el código se ejecuta en el thread actual (main) y NO en paralelo. Debes llamar a `t.start()`.",
                    code: "// ❌ No paralelo\nhilo.run();\n// ✅ Paralelo\nhilo.start();"
                },
                {
                    type: "goodPractice",
                    title: "Ponles Nombre",
                    content: "Dale un nombre a tus hilos (`new Thread(runnable, \"MiHilo\")`). Cuando tengas un error, agradecerás ver 'MiHilo' en el log en lugar de 'Thread-0'.",
                    code: "new Thread(r, \"Worker-1\");"
                }
            ]
        },
        {
            id: "executor-service",
            title: "ExecutorService",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una agencia de empleo para Hilos. Tú le das tareas (`submit`), y él se encarga de asignarlas a un grupo de trabajadores (`Pool`) reutilizables."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Crear un Hilo (`new Thread`) es caro para el sistema. Es mejor tener 5 hilos vivos esperando trabajo que crear y despedir 1000 hilos por segundo."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que necesites concurrencia real. `Executors.newFixedThreadPool(10)` es tu mejor amigo."
                }
            ],
            description: "Gestión eficiente de pools de hilos.",
            code: `// Pool de 2 hilos
ExecutorService executor = Executors.newFixedThreadPool(2);

executor.submit(() -> System.out.println("Tarea 1"));
executor.submit(() -> System.out.println("Tarea 2"));
executor.submit(() -> System.out.println("Tarea 3"));

// Importante: apagar el executor al finalizar
executor.shutdown();`,
            syntaxDescription: "Imagina una parada de taxis. No construyes un coche nuevo cada vez que llega un pasajero (`new Thread`). Tienes una flota de 10 taxis (`ThreadPool`). Cuando llega un pasajero (Tarea), se sube al primer taxi libre. Cuando termina, el taxi vuelve a la parada a esperar al siguiente.",
            useCases: [
                {
                    title: "Callable y Future",
                    description: "Obtener resultados de tareas asíncronas.",
                    code: `Callable<Integer> calculo = () -> {
    Thread.sleep(1000);
    return 42;
};

Future<Integer> futuro = executor.submit(calculo);

// Bloquea hasta que esté listo
Integer resultado = futuro.get(); 
System.out.println(resultado);`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Shutdown Obligatorio",
                    content: "El `ExecutorService` mantiene vivos sus hilos. Si no llamas a `executor.shutdown()`, tu programa nunca terminará (la JVM se quedará esperando).",
                    code: "executor.shutdown();"
                },
                {
                    type: "recommendation",
                    title: "Pools Compartidos",
                    content: "En aplicaciones web reales, suele haber un solo ThreadPool global reutilizado para toda la app, no uno nuevo por cada petición.",
                    code: "public static final Executor SERVICE = ...;"
                }
            ]
        },
        {
            id: "completable-future",
            title: "CompletableFuture",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una promesa de que algo ocurrirá en el futuro. Te permite encadenar acciones: 'Haz A, LUEGO haz B con el resultado, LUEGO imprime C'."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita bloquear el hilo principal esperando. Puedes lanzar 3 tareas en paralelo y decir 'Avísame cuando las 3 terminen (combinar)'."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Llamadas a APIs externas, operaciones de I/O lentas, o flujos de trabajo complejos asíncronos."
                }
            ],
            description: "Promesas asíncronas y composición de tareas.",
            code: `CompletableFuture.supplyAsync(() -> "Hola")
    .thenApply(s -> s + " Mundo")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println); 
    // Imprime "HOLA MUNDO" (asíncronamente)`,
            syntaxDescription: "Es como esos dispositivos (beepers) que te dan en los restaurantes de comida rápida. Tú pides tu hamburguesa (inicias tarea) y te vas a sentar a la mesa (hilo libre). No te quedas parado frente al mostrador. Cuando el beeper vibra (`thenApply`), vas a buscarla.",
            useCases: [
                {
                    title: "Combinar Tareas Asíncronas",
                    description: "Ejecutar dos tareas en paralelo y usar ambos resultados.",
                    code: `var futuroUsuario = CompletableFuture.supplyAsync(() -> obtenerUsuario(1));
var futuroPedidos = CompletableFuture.supplyAsync(() -> obtenerPedidos(1));

// Combinar resultados cuando ambos terminen
futuroUsuario.thenCombine(futuroPedidos, (user, pedidos) -> {
    return "Usuario " + user + " tiene " + pedidos + " pedidos";
}).thenAccept(System.out::println);`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Bloquear con .get()",
                    content: "Si llamas a `futuro.get()` inmediatamente, frenas tu hilo actual esperando el resultado, perdiendo la ventaja de la asincronía. Úsalo solo al final final.",
                    code: "// String res = futuro.get(); // ❌ Bloqueante\nfuturo.thenAccept(...) // ✅ Asíncrono"
                },
                {
                    type: "goodPractice",
                    title: "Manejo de Excepciones",
                    content: "Usa `.exceptionally()` para manejar errores dentro de la cadena asíncrona sin romper todo el flujo.",
                    code: "futuro.exceptionally(ex -> \"Error: \" + ex);"
                }
            ]
        },
        {
            id: "virtual-threads",
            title: "Virtual Threads (Loom)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Hilos ultraligeros gestionados por la JVM, no por el Sistema Operativo. Puedes crear MILLONES de ellos sin consumir memoria excesiva."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Revolución total (Java 21). Permite escribir código simple, síncrono y bloqueante (fácil de leer) que escala igual de bien que el código asíncrono complejo."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En servidores de alto rendimiento donde cada petición necesita esperar por I/O (Database, API calls). Hacen obsoleto el uso de programación reactiva para muchos casos."
                }
            ],
            description: "Concurrencia masiva con API simple.",
            code: `// Crear e iniciar un hilo virtual
Thread.ofVirtual().start(() -> {
    System.out.println("Hola desde Loom");
});

// Usar con Executor (la forma recomendada)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
} // Auto-close espera a que terminen las 10,000 tareas`,
            syntaxDescription: "Son como hologramas. Parecen trabajadores reales, actúan como trabajadores reales, pero no ocupan espacio físico ni comen (pocos recursos). Puedes llenar una habitación con 10,000 trabajadores holográficos donde solo cabrían 10 humanos.",
            useCases: [
                {
                    title: "Servidor Web Escalable",
                    description: "Esquema conceptual de manejo de peticiones.",
                    code: `// Cada petición se maneja en su propio hilo virtual
// No necesitamos pools complejos ni código reactivo asíncrono
void handleRequest(Request req) {
    Thread.startVirtualThread(() -> {
        var data = db.query(); // Bloquea virtualmente, no el SO
        var result = process(data);
        sendResponse(result);
    });
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "No Pooling",
                    content: "A diferencia de los hilos normales, NO recicles hilos virtuales. Son tan baratos de crear que es mejor crear uno nuevo por tarea y dejarlo morir.",
                    code: "Executors.newVirtualThreadPerTaskExecutor();"
                },
                {
                    type: "recommendation",
                    title: "Código Bloqueante es Bueno",
                    content: "Con Loom, puedes usar `Socket.read()` bloqueante. Java desmontará el hilo virtual automáticamente mientras espera, liberando el hilo real del sistema operativo.",
                    code: "thread.sleep(1000); // ✅ Seguro en Loom"
                }
            ]
        }
    ]
};
