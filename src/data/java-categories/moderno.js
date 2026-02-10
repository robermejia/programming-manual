export const modernoCategory = {
    title: "6. Características Modernas",
    topics: [
        {
            id: "pattern-matching",
            title: "Pattern Matching",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una sintaxis inteligente que verifica el tipo y lo convierte en variable en un solo paso. `if (obj instanceof String s)` hace el `instanceof` y el casting automáticamente."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Elimina el casting redundante y propenso a errores. Hace que el código de validación de tipos sea limpio y directo."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que necesites verificar tipos, especialmente en bloques `if` o `switch` (donde ahora puedes hacer switch de tipos enteros)."
                }
            ],
            description: "Sintaxis limpia para verificación y extracción de tipos.",
            code: `Object objeto = "Hola Mundo";

// Antes de Pattern Matching
if (objeto instanceof String) {
    String s = (String) objeto; // Casting redundante
    System.out.println(s.toLowerCase());
}

// Con Pattern Matching
if (objeto instanceof String s) {
    System.out.println(s.toLowerCase()); // 's' creado automáticamente
}`,
            syntaxDescription: "Es como un guardia de seguridad con rayos X. Antes, el guardia te paraba (if instanceof), te pedía abrir la maleta, y luego TÚ tenías que sacar el objeto (casting). Ahora, el guardia ve el objeto, lo saca y te lo da en la mano ('s') en un solo movimiento fluido.",
            useCases: [
                {
                    title: "Switch con Pattern Matching",
                    description: "Switch sobre tipos con guardas (Java 21+).",
                    code: `Object obj = 42;

String resultado = switch (obj) {
    case Integer i when i > 0 -> "Entero positivo: " + i;
    case Integer i -> "Entero no positivo: " + i;
    case String s -> "Cadena de texto: " + s;
    case null -> "Es nulo";
    default -> "Tipo desconocido";
};`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Pattern Matching + Switch",
                    content: "Son la pareja perfecta. Puedes manejar lógica de negocio compleja basada en tipos de forma muy visual y declarativa.",
                    code: "switch (obj) { case String s -> ... }"
                },
                {
                    type: "goodPractice",
                    title: "Nombres Significativos",
                    content: "No llames a tu variable pattern `obj` o `s`. Úsalo para darle contexto: `if (animal instanceof Perro miPerro) { ... }`."
                }
            ]
        },
        {
            id: "text-blocks",
            title: "Text Blocks",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Strings de múltiples líneas delimitados por `\"\"\"`. Permiten escribir JSON, SQL, o HTML sin volverse loco con secuencias de escape (`\\n`, `\\\"`)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "La legibilidad es rey. Pegar un JSON grande en Java solía ser horrible. Ahora se ve exactamente como el JSON original."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que tengas texto de más de una línea, queries SQL, scripts, o plantillas HTML embebidas."
                }
            ],
            description: "Strings multilínea limpios y legibles.",
            code: `// Antes (difícil de leer)
String json = "{\n" +
              "  \"nombre\": \"Java\",\n" +
              "  \"tipo\": \"Lenguaje\"\n" +
              "}";

// Con Text Block
String jsonBlock = """
    {
        "nombre": "Java",
        "tipo": "Lenguaje"
    }
    """;`,
            syntaxDescription: "Antes escribir un párrafo en Java era como recortar letras de periódico y pegarlas una por una (+ \"\\n\" +). Los Text Blocks son como escribir en una hoja de papel en blanco normal: lo que escribes es lo que obtienes.",
            useCases: [
                {
                    title: "SQL y JSON Embebido",
                    description: "Escribir consultas complejas con claridad.",
                    code: `String query = """
    SELECT id, nombre, email
    FROM usuarios
    WHERE activo = 1
    ORDER BY fecha_registro DESC
    LIMIT 10
    """;
    
System.out.println(query);`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Indentación Inteligente",
                    content: "Java detecta la sangría común de todas las líneas y la ignora. Así puedes indentar tu código HTML/JSON para que se vea bien en el editor sin que aparezcan espacios extra en el String final.",
                    code: "String s = \"\"\"\n    Texto\n    \"\"\"; // No guarda los 4 espacios"
                },
                {
                    type: "error",
                    title: "Espacios al final",
                    content: "Los Text Blocks preservan los espacios a la derecha si los pones explícitamente. Ten cuidado si copias y pegas texto con espacios fantasma al final."
                }
            ]
        },
        {
            id: "modules",
            title: "Sistema de Módulos",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un sistema para organizar paquetes en 'Módulos'. Usas `module-info.java` para decir explícitamente: 'Yo exporto esto' y 'Yo requiero esto'."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Acaba con el 'Classpath Hell'. Mejora la seguridad (puedes ocultar paquetes `internal` aunque sean públicos). Permite crear aplicaciones Java minúsculas (`jlink`)."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En bibliotecas grandes o arquitecturas de microservicios donde el aislamiento estricto es vital. Para apps pequeñas, el classpath tradicional sigue funcionando."
                }
            ],
            description: "Encapsulación fuerte y dependencias explícitas.",
            code: `// Archivo: module-info.java
module com.miempresa.app {
    // Requiere el módulo java.sql del JDK
    requires java.sql;
    
    // Requiere un módulo de terceros
    requires org.apache.commons.lang3;
    
    // Exporta este paquete para que otros lo usen
    exports com.miempresa.app.api;
    
    // El resto de paquetes (com.miempresa.app.internal)
    // quedan ocultos y protegidos.
}`,
            syntaxDescription: "Es como compartimentar un submarino. Si hay una fuga de agua (error/acceso indebido) en un compartimento, cierras la compuerta y el resto del submarino sigue seco. Antes de los módulos, todo el barco era una sola habitación gigante.",
            useCases: [
                {
                    title: "Servicios (ServiceLoader)",
                    description: "Declarar proveedores y consumidores de servicios en módulos.",
                    code: `module com.miempresa.servicio {
    // Declara que este módulo provee una implementación
    provides com.api.MiServicio
        with com.impl.MiServicioImpl;
}

module com.miempresa.cliente {
    uses com.api.MiServicio;
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Classpath vs Modulepath",
                    content: "Si usas módulos, Java usa el 'Modulepath'. Es mucho más rápido buscando clases porque sabe exactamente dónde está cada cosa gracias a `module-info.java`.",
                    code: "--module-path mods"
                },
                {
                    type: "recommendation",
                    title: "Complejidad Opcional",
                    content: "Para aplicaciones pequeñas o monolitos simples, no te fuerces a usar módulos. El classpath tradicional sigue funcionando perfectamente y es más simple.",
                    code: "// No module-info.java needed"
                }
            ]
        },
        {
            id: "annotations",
            title: "Anotaciones",
            videoUrl: "https://www.youtube.com/watch?v=AC7zGon28oc",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Etiquetas con `@` para tu código. No cambian lo que el código HACE, pero le dan información extra al compilador o a frameworks."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Son la base mágica de Spring, Hibernate y JUnit. Permiten configuración declarativa: 'Esto es un Test', 'Esto es una Columna de BD'."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Constantemente en frameworks modernos. `@Override` debe usarse siempre que sobrescribas métodos."
                }
            ],
            description: "Metadatos poderosos para configuración y frameworks.",
            code: `// Uso común
@Override // Check de compilador
public String toString() { return "A"; }

@Deprecated(since = "1.5")
public void metodoViejo() { }

@SuppressWarnings("unchecked")
public void metodoRiesgoso() { }`,
            syntaxDescription: "Son notas adhesivas (Post-its) en un documento. Una nota que dice 'URGENTE' (`@Transactional`) no cambia el texto del documento, pero le dice a la secretaria que lo procese de forma especial. Una nota 'CORREGIR' (`@Override`) le dice al revisor que verifique si está bien reescrito.",
            useCases: [
                {
                    title: "Anotación Personalizada",
                    description: "Definir y procesar una anotación propia.",
                    code: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
// Definición
public @interface Testeable {
    String autor() default "Anonimo";
}

// Uso
public class Pruebas {
    @Testeable(autor = "Juan")
    public void testAlgo() { }
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "@Retention",
                    content: "No todas las anotaciones sobreviven al compilar. `@Override` desaparece (Retention SOURCE). Otras como `@Entity` de JPA se quedan en tiempo de ejecución (Retention RUNTIME) para que funcione la magia.",
                    code: "@Retention(RetentionPolicy.RUNTIME)"
                },
                {
                    type: "goodPractice",
                    title: "Siempre @Override",
                    content: "Úsala SIEMPRE. Si cambias el nombre del método padre y no tienes la anotación, tu método hijo se convierte silenciosamente en un método nuevo y rompe el polimorfismo."
                }
            ]
        }
    ]
};
