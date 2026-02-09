export const apisCategory = {
    title: "7. APIs y Utilidades Esenciales",
    topics: [
        {
            id: "excepciones",
            title: "Manejo de Excepciones",
            videoUrl: "https://www.youtube.com/watch?v=dH3XtlUXBRg",
            content: [
                {
                    title: "¿Qué es?",
                    text: "El sistema de seguridad de Java. Cuando algo sale mal (división por cero, archivo no encontrado), Java lanza una 'Excepción'. Si no la atrapas (`catch`), el programa explota y se cierra."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite controlar errores de forma elegante. En lugar de que la app se cierre en la cara del usuario, le muestras un mensaje amable 'Intente más tarde'."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que hagas operaciones riesgosas: leer archivos, conectar a bases de datos, operaciones matemáticas complejas."
                }
            ],
            description: "Control de errores y flujo seguro.",
            code: `try {
    int resultado = 10 / 0;
} catch (ArithmeticException e) {
    System.err.println("División por cero: " + e.getMessage());
} finally {
    System.out.println("Esto se ejecuta siempre");
}`,
            syntaxDescription: "Es como un trapecista (código) con una red de seguridad (try-catch). Si el trapecista cae (error), no se mata contra el suelo (crash), sino que cae en la red (catch), se recupera y el show continúa.",
            useCases: [
                {
                    title: "Try-With-Resources",
                    description: "Cierre automático de archivos y sockets.",
                    code: `// BufferedReader se cerrará automáticamente
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String linea = br.readLine();
    System.out.println(linea);
} catch (IOException e) {
    System.err.println("Error leyendo archivo");
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "No tragues erorres",
                    content: "Jamás hagas un catch vacío `catch(Exception e) { }`. Es como desconectar la alarma de incendios mientras tu casa se quema: no te enterarás del problema hasta que sea tarde.",
                    code: "// ❌ Crimen\ntry { ... } catch (Exception e) {}"
                },
                {
                    type: "recommendation",
                    title: "Excepciones Específicas",
                    content: "Captura primero las excepciones específicas (`FileNotFoundException`) y al final las genéricas (`Exception`).",
                    code: "catch(IOException e) { ... }\ncatch(Exception e) { ... }"
                }
            ]
        },
        {
            id: "file-io",
            title: "File I/O (NIO.2)",
            content: [
                {
                    title: "¿Qué es?",
                    text: "La forma moderna (NIO.2) de tocar archivos. Usas `Path` (la dirección) y `Files` (el obrero que lee/escribe)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "`java.io.File` es viejo y torpe. `java.nio.file` maneja mejor errores, metadatos y sistemas de archivos modernos."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que necesites leer, escribir, copiar o borrar archivos."
                }
            ],
            description: "Operaciones modernas con archivos.",
            code: `import java.nio.file.*;

Path ruta = Paths.get("documentos", "notas.txt");

// Verificar existencia
if (Files.exists(ruta)) {
    // Leer todo (archivos pequeños)
    String contenido = Files.readString(ruta);
}

// Escribir
Files.writeString(ruta, "Nuevo contenido");`,
            syntaxDescription: "Es como el sistema de archivos de tu oficina. `Path` es la etiqueta en el archivador. `Files` es el asistente que va, busca la carpeta, saca el papel y te lo trae.",
            useCases: [
                {
                    title: "Listar Archivos (Stream)",
                    description: "Recorrer un directorio buscando archivos específicos.",
                    code: `Path dir = Paths.get(".");

try (Stream<Path> stream = Files.walk(dir)) {
    stream
        .filter(p -> p.toString().endsWith(".java"))
        .forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Try-With-Resources",
                    content: "Siempre usa `try(var reader = ...)` para abrir archivos o sockets. Java cerrará el recurso automáticamente al final, incluso si hay error.",
                    code: "try (var s = new Socket(...)) { ... }"
                },
                {
                    type: "idea",
                    title: "Path es el Rey",
                    content: "Olvídate de construir rutas con Strings (`\"C:\\\" + \"folder\"`). Usa `Path.of(\"C:\", \"folder\")` para que funcione en Windows, Mac y Linux sin dolor.",
                    code: "Path p = Path.of(\"data\", \"config.xml\");"
                }
            ]
        },
        {
            id: "serializacion",
            title: "Serialización",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Convertir un Objeto vivo (en memoria RAM) en una secuencia de bytes estática (para guardar en disco o enviar por red)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "La memoria RAM se borra al apagar la PC. Si quieres que los datos de tu usuario sobrevivan al reinicio, necesitas serializarlos (guardarlos)."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Almacenamiento en caché (Redis), sesiones HTTP, o guardar estado de juegos/apps."
                }
            ],
            description: "Persistencia de objetos.",
            code: `import java.io.Serializable;

class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;
    
    String nombre;
    transient String password; // No se guarda
}`,
            syntaxDescription: "Es como congelar a Han Solo en carbonita. El objeto vivo se convierte en un bloque inerte (bytes) que puedes transportar o guardar en un almacén. Luego, puedes descongelarlo (deserializar) y vuelve a estar vivo exactamente como estaba.",
            useCases: [
                {
                    title: "Guardar Objeto en Archivo",
                    description: "Ejemplo básico de escritura de objeto.",
                    code: `Usuario u = new Usuario();
u.nombre = "Admin";

try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("user.dat"))) {
    out.writeObject(u);
}

// La lectura sería con ObjectInputStream`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "serialVersionUID",
                    content: "Si cambias tu clase (ej. añades un campo) y no definiste `serialVersionUID`, Java no podrá leer los objetos guardados anteriormente (InvalidClassException).",
                    code: "private static final long serialVersionUID = 1L;"
                },
                {
                    type: "recommendation",
                    title: "JSON sobre Serialización",
                    content: "La serialización nativa de Java es frágil y peligrosa. Hoy día es estándar serializar a JSON (usando Jackson o Gson) para guardar datos.",
                    code: "ObjectMapper mapper = new ObjectMapper();"
                }
            ]
        },
        {
            id: "reflection",
            title: "Reflection",
            content: [
                {
                    title: "¿Qué es?",
                    text: "La capacidad de Java de mirarse al espejo. Un programa puede inspeccionar sus propias clases, métodos y atributos en tiempo de ejecución, e incluso usarlos dinámicamente."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es magia negra necesaria para frameworks. Spring no sabe qué clases escribirás tú mañana, pero usa Reflection para leerlas y ejecutarlas igual."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Rara vez en lógica de negocio. Muy común si estás creando tus propias librerías o frameworks genéricos."
                }
            ],
            description: "Metaprogramación e introspección.",
            code: `Class <?> clase = Class.forName("com.app.MiClase");

// Instanciar
Object obj = clase.getConstructor().newInstance();

// Obtener método y ejecutarlo
Method metodo = clase.getMethod("saludar", String.class);
metodo.invoke(obj, "Mundo");`,
            syntaxDescription: "Es como visión de rayos X. Normalmente solo puedes usar los botones públicos de una máquina. Con Reflection, puedes abrir la máquina, ver los engranajes internos (clases, métodos privados) y manipularlos directamente.",
            useCases: [
                {
                    title: "Acceder a Campo Privado",
                    description: "Técnica usada por frameworks para inyección de dependencias.",
                    code: `Field campoPrivado = clase.getDeclaredField("secreto");
campoPrivado.setAccessible(true); // Romper seguridad

String valor = (String) campoPrivado.get(obj);
System.out.println("Valor oculto: " + valor);`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Romper Private",
                    content: "Reflection permite llamar métodos `private`. Es útil para testing o frameworks, pero viola el encapsulamiento. Úsalo con gran responsabilidad.",
                    code: "field.setAccessible(true);"
                },
                {
                    type: "error",
                    title: "Lentitud",
                    content: "Reflection es mucho más lento que una llamada normal. No lo uses en bucles críticos de rendimiento (ej. renderizado de juegos).",
                    code: "// ❌ En bucle\nfor(...) metodo.invoke(...);"
                }
            ]
        },
        {
            id: "datetime",
            title: "Date/Time API (java.time)",
            videoUrl: "https://www.youtube.com/watch?v=8qOy1txMkos",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Las clases modernas de Java 8 para manejar tiempo. Inmutables, precisas y thread-safe. `LocalDate` (Fecha), `LocalTime` (Hora), `LocalDateTime` (Ambos)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "`Date` y `Calendar` antiguos eran un desastre (mutables, índices de mes empezando en 0). `java.time` corrige todo eso."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre. Nunca uses `java.util.Date` en código nuevo."
                }
            ],
            description: "Manejo moderno y correcto del tiempo.",
            code: `LocalDate hoy = LocalDate.now();
LocalDate manana = hoy.plusDays(1);

// Formateo
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
String texto = hoy.format(fmt); // "27/01/2026"`,
            syntaxDescription: "Es un reloj atómico digital de alta precisión. A diferencia de un reloj de arena antiguo (`Date`) que si lo tocas se estropea (mutable), este reloj no se puede alterar; si quieres cambiar la hora, te da un objeto reloj NUEVO con la hora cambiada, dejando el original intacto.",
            useCases: [
                {
                    title: "Cálculo de Diferencias",
                    description: "Calcular edad o tiempo transcurrido.",
                    code: `LocalDate nacimiento = LocalDate.of(1995, Month.MAY, 20);
LocalDate ahora = LocalDate.now();

Period periodo = Period.between(nacimiento, ahora);
System.out.printf("Edad: %d años, %d meses", 
    periodo.getYears(), periodo.getMonths());`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Adiós Date/Calendar",
                    content: "`java.util.Date` es mutable (peligroso) and `Calendar` es confuso (meses empiezan en 0). `java.time` (LocalDate) es la API correcta a usar desde 2014.",
                    code: "LocalDate date = LocalDate.now();"
                },
                {
                    type: "idea",
                    title: "Zonas Horarias",
                    content: "Si trabajas con usuarios internacionales, usa `ZonedDateTime` o guarda todo en UTC (`Instant`) y convierte solo al mostrarlo al usuario.",
                    code: "ZonedDateTime.now(ZoneId.of(\"UTC\"))"
                }
            ]
        }
    ]
};
