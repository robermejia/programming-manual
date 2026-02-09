export const patronesCategory = {
    title: "8. Patrones de Diseño (GoF Completo)",
    topics: [
        // ==========================================
        // PATRONES CREACIONALES (5)
        // ==========================================
        {
            id: "singleton",
            title: "Singleton",
            videos: [
                { title: "1.7 - Singleton en java (EDTEAM)", url: "https://www.youtube.com/watch?v=MNBZuZpkxgU" },
                { title: "001. Teoría Singleton (Udemy)", url: "https://www.youtube.com/watch?v=jJ11wtiaX0Q" },
                { title: "002. Código Singleton (Udemy)", url: "https://www.youtube.com/watch?v=KEjh9KqNN-g" },
                { title: "19. Singleton (Código Facilito)", url: "https://www.youtube.com/watch?v=leLRmTah4Mg" },
                { title: "20. Singleton concurrente (Código Facilito)", url: "https://www.youtube.com/watch?v=Sm0qmz3yOGs" },
                { title: "SINGLETON PATTERN the pattern you absolutely MUST LEARN", url: "https://www.youtube.com/watch?v=UekxC1hvurk" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una clase que solo permite crear UNA única instancia de sí misma. Bloquea el constructor y te da un método estático (`getInstance`) para acceder a ella."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Para cosas que deben ser únicas: conexión a base de datos, gestor de configuración, sistema de logging. Evita conflictos de recursos."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando necesites controlar estrictamente el acceso a un recurso compartido único. Úsalo con moderación (es difícil de testear)."
                }
            ],
            description: "Garantiza una única instancia de una clase.",
            code: `// Enfoque Moderno (Recomendado): Enum Singleton
public enum DatabaseConnection {
    INSTANCE;
    
    // Variables de instancia
    private String connectionString;
    
    // Constructor (se ejecuta solo una vez)
    DatabaseConnection() {
        this.connectionString = "jdbc:mysql://localhost:3306/app";
        System.out.println("Inicializando conexión...");
    }
    
    public void ejecutarQuery(String query) {
        System.out.println("Ejecutando en " + connectionString + ": " + query);
    }
}

// Uso en cualquier parte del código
DatabaseConnection.INSTANCE.ejecutarQuery("SELECT * FROM users");`,
            syntaxDescription: "Es como el protagonista de 'Los Inmortales': 'Solo puede quedar uno'. No importa cuántas veces lo llames, siempre es el mismo tipo.",
            useCases: [
                {
                    title: "Singleton Lazy Thread-Safe",
                    description: "Técnica de inicialización diferida para objetos pesados que no siempre se usan.",
                    code: `public class ConfiguracionPesada {
    // volatile asegura visibilidad entre hilos
    private static volatile ConfiguracionPesada instance;
    private String data;

    private ConfiguracionPesada() {
        // Simular carga costosa
        this.data = "Configuración Cargada del Disco";
    }

    // Doble comprobación de bloqueo (Double-Checked Locking)
    public static ConfiguracionPesada getInstance() {
        if (instance == null) {
            synchronized (ConfiguracionPesada.class) {
                if (instance == null) {
                    instance = new ConfiguracionPesada();
                }
            }
        }
        return instance;
    }
}`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Enum Singleton",
                    content: "La mejor forma de implementar un Singleton en Java es usando un `enum`. Es thread-safe, protege contra serialización y reflection attacks gratis.",
                    code: "public enum Config { INSTANCE; }"
                },
                {
                    type: "error",
                    title: "Abuso de Singleton",
                    content: "Los Singletons son difíciles de testear (estado global). No los uses para todo manager. La Inyección de Dependencias es casi siempre mejor.",
                    code: "// ❌ Global State\nMySingleton.getInstance().do();"
                }
            ]
        },
        {
            id: "factory-method",
            title: "Factory Method",
            videos: [
                { title: "2.1 - Introducción a factory (EDTEAM)", url: "https://www.youtube.com/watch?v=RrFPolkPxCE" },
                { title: "2.2 - Partes de factory (EDTEAM)", url: "https://www.youtube.com/watch?v=KgNEGjhvT5Y" },
                { title: "2.3 - Utilizando factory (EDTEAM)", url: "https://www.youtube.com/watch?v=97iQcy-YQo8" },
                { title: "2.4 - Utilizando factory ii (EDTEAM)", url: "https://www.youtube.com/watch?v=DtI4JzUKoWk" },
                { title: "001. Teoría Factory Method (Udemy)", url: "https://www.youtube.com/watch?v=VmVYQnDhC8U" },
                { title: "002. Código Factory Method (Udemy)", url: "https://www.youtube.com/watch?v=ZduAs4z2Akg" },
                { title: "003. Ventajas Factory Method (Udemy)", url: "https://www.youtube.com/watch?v=sqa7bT7_Pso" },
                { title: "16. Simple Factory (Código Facilito)", url: "https://www.youtube.com/watch?v=UQymRElFU6E" },
                { title: "17. Factory Method (Código Facilito)", url: "https://www.youtube.com/watch?v=Oy33swukogg" },
                { title: "FACTORY METHOD PATTERN the pattern that DOES NOT DISAPPOINT 🏭", url: "https://www.youtube.com/watch?v=iPkq6s7nrus" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una interfaz para crear objetos, pero dejas que las subclases decidan qué clase instanciar. En lugar de llamar `new`, llamas a un método `crearAlgo()`."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Desacopla tu código. Si tu código usa `new Camion()`, estás atado a Camiones. Si usas `factory.crearTransporte()`, puedes cambiar a Barcos mañana sin tocar el código principal."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando no sabes de antemano qué tipos exactos de objetos necesitará tu código, o quieres que una librería sea extensible por el usuario."
                }
            ],
            description: "Delega la instanciación a subclases.",
            code: `// Producto abstracto
interface Transporte {
    void entregar();
}

// Productos concretos
class Camion implements Transporte {
    public void entregar() { System.out.println("Entrega por tierra en caja."); }
}
class Barco implements Transporte {
    public void entregar() { System.out.println("Entrega por mar en contenedor."); }
}

// Creador (Factory)
abstract class Logistica {
    // El método fábrica
    abstract Transporte crearTransporte();

    // Lógica de negocio que usa el producto
    public void planificarEntrega() {
        Transporte t = crearTransporte();
        t.entregar();
    }
}

// Creadores concretos
class LogisticaTerrestre extends Logistica {
    @Override Transporte crearTransporte() { return new Camion(); }
}
class LogisticaMaritima extends Logistica {
    @Override Transporte crearTransporte() { return new Barco(); }
}`,
            syntaxDescription: "Es como un gerente de contratación. Tú (el cliente) le dices a RRHH 'necesito un empleado'. El gerente (Factory) decide si contrata a un Becario, un Junior o un Senior según el presupuesto, pero a ti te llega un 'Empleado' genérico listo para trabajar.",
            useCases: [
                {
                    title: "Uso del Factory",
                    description: "El cliente trabaja con la abstracción, sin conocer las clases concretas.",
                    code: `Logistica logistica;

// Dependiendo de la configuración o input
if (tipoEntorno.equals("mar")) {
    logistica = new LogisticaMaritima();
} else {
    logistica = new LogisticaTerrestre();
}

// El código cliente es agnóstico del tipo de transporte
logistica.planificarEntrega();`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Desacoplamiento",
                    content: "Factory Method te permite añadir nuevos tipos de productos sin romper el código existente (Open/Closed Principle).",
                    code: "Logistica l = new LogisticaMar();"
                },
                {
                    type: "goodPractice",
                    title: "Nombres",
                    content: "Los métodos fábrica suelen llamarse `create` o `newInstance`. Ayuda a distinguirlos de los constructores normales.",
                    code: "public T create() { ... }"
                }
            ]
        },
        {
            id: "abstract-factory",
            title: "Abstract Factory",
            videos: [
                { title: "2.5 - Abstract factory (EDTEAM)", url: "https://www.youtube.com/watch?v=vI1Bv-g1z1o" },
                { title: "2.6 - Abstract factory ii (EDTEAM)", url: "https://www.youtube.com/watch?v=SsshTGSzxi0" },
                { title: "001. Teoría Abstract Factory (Udemy)", url: "https://www.youtube.com/watch?v=pRrOwEr3oLo" },
                { title: "002. Código Abstract Factory Parte 1 (Udemy)", url: "https://www.youtube.com/watch?v=XY5wqzBGsGA" },
                { title: "003. Código Abstract Factory Parte 2 (Udemy)", url: "https://www.youtube.com/watch?v=z9p1-sJzTug" },
                { title: "004. Código Abstract Factory Final (Udemy)", url: "https://www.youtube.com/watch?v=8lBGyvGaNjQ" },
                { title: "005. Ventajas Abstract Factory (Udemy)", url: "https://www.youtube.com/watch?v=5_9J5EnWzDY" },
                { title: "18. Abstract Factory (Código Facilito)", url: "https://www.youtube.com/watch?v=H6Kp2lN06q4" },
                { title: "ABSTRACT FACTORY PATTERN 🏭 the MOST DIFFICULT to understand", url: "https://www.youtube.com/watch?v=AN53ccq2Syk" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una fábrica de fábricas. Crea familias de objetos relacionados sin especificar sus clases concretas. Garantiza que los objetos creados sean compatibles entre sí."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Si estás creando una UI, quieres que el Botón y la Checkbox tengan el mismo estilo (Windows vs Mac). Abstract Factory te asegura que no mezcles un Botón Windows con una Checkbox Mac."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tu sistema debe ser independiente de cómo se crean sus productos, o configurarse con una de varias familias de productos."
                }
            ],
            description: "Crea familias de objetos relacionados.",
            code: `// Interfaces de Productos
interface Boton { void pintar(); }
interface Checkbox { void pintar(); }

// Familia 1: Windows
class WinBoton implements Boton {
    public void pintar() { System.out.println("Botón estilo Windows"); }
}
class WinCheckbox implements Checkbox {
    public void pintar() { System.out.println("Checkbox estilo Windows"); }
}

// Familia 2: Mac
class MacBoton implements Boton {
    public void pintar() { System.out.println("Botón estilo Mac"); }
}
class MacCheckbox implements Checkbox {
    public void pintar() { System.out.println("Checkbox estilo Mac"); }
}

// Interfaz de Fábrica Abstracta
interface GUIFactory {
    Boton crearBoton();
    Checkbox crearCheckbox();
}`,
            syntaxDescription: "Es como comprar un set de muebles. Vas a la sección 'Victorian' (Fábrica Concreta) y compras una silla y una mesa. Sabes que combinarán entre sí. No compras una silla victoriana y una mesa futurista por error.",
            useCases: [
                {
                    title: "Implementación y Uso",
                    description: "El cliente construye la UI usando la fábrica inyectada.",
                    code: `// Fábricas Concretas
class WinFactory implements GUIFactory {
    public Boton crearBoton() { return new WinBoton(); }
    public Checkbox crearCheckbox() { return new WinCheckbox(); }
}
class MacFactory implements GUIFactory {
    public Boton crearBoton() { return new MacBoton(); }
    public Checkbox crearCheckbox() { return new MacCheckbox(); }
}

// Código Cliente
public class Aplicacion {
    private Boton boton;
    private Checkbox checkbox;

    public Aplicacion(GUIFactory factory) {
        boton = factory.crearBoton();
        checkbox = factory.crearCheckbox();
    }

    public void pintar() {
        boton.pintar();
        checkbox.pintar();
    }
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Consistencia Visual",
                    content: "Asegura que todos los elementos de UI creados (Botón, Menú, Ventana) pertenezcan al mismo tema (Dark Mode, Light Mode) sin mezclar.",
                    code: "new DarkThemeFactory();"
                },
                {
                    type: "recommendation",
                    title: "Complejidad",
                    content: "Abstract Factory es complejo. Úsalo solo si realmente necesitas familias de objetos. Si solo creas un tipo de objeto, Factory Method basta.",
                    code: "// 1 Familia = Abstract Factory"
                }
            ]
        },
        {
            id: "builder",
            title: "Builder",
            videos: [
                { title: "3.1 - Proyecto sin modelo builder (EDTEAM)", url: "https://www.youtube.com/watch?v=Gjxscc-0eOQ" },
                { title: "3.2 - Aplicación de builder en nuestro proyecto (EDTEAM)", url: "https://www.youtube.com/watch?v=Wt216pggB3E" },
                { title: "3.3 - Aplicación de builder en nuestro proyecto ii (EDTEAM)", url: "https://www.youtube.com/watch?v=QcSdfvpYoQE" },
                { title: "3.4 - Aplicación de builder en nuestro proyecto iii (EDTEAM)", url: "https://www.youtube.com/watch?v=ENTt2r_jrBA" },
                { title: "001. Teoría Builder (Udemy)", url: "https://www.youtube.com/watch?v=uVa0jn65Qhg" },
                { title: "002. Código Builder Parte 1 (Udemy)", url: "https://www.youtube.com/watch?v=mwKJ4J_9-Tc" },
                { title: "003. Código Builder Final (Udemy)", url: "https://www.youtube.com/watch?v=_o6nuzBnKIQ" },
                { title: "004. Ventajas Builder (Udemy)", url: "https://www.youtube.com/watch?v=0AX885x5qqU" },
                { title: "21. Builder Parte 1 (Código Facilito)", url: "https://www.youtube.com/watch?v=HpePKu40Q4Y" },
                { title: "22. Builder Parte 2 (Código Facilito)", url: "https://www.youtube.com/watch?v=dEdkRUhgHLc" },
                { title: "BUILDER PATTERN 👷🏻‍♀️🔨 the MOST USEFUL design pattern", url: "https://www.youtube.com/watch?v=cXlhMjzLZBI" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un constructor paso a paso. En lugar de un constructor gigante con 10 parámetros (`new Usuario(a, b, null, null, c...)`), usas métodos encadenados para configurar el objeto."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Legibilidad y claridad. Evita el 'Constructor Telescópico'. Permite crear objetos inmutables complejos sin volverse loco con los parámetros."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando un objeto tiene muchos parámetros opcionales o su configuración es compleja."
                }
            ],
            description: "Construcción flexible y legible de objetos.",
            code: `public class Usuario {
    // Todos los campos son final (Inmutabilidad)
    private final String nombre;     // Requerido
    private final String apellido;   // Requerido
    private final int edad;          // Opcional
    private final String telefono;   // Opcional
    private final String direccion;  // Opcional

    // Constructor privado: Solo el Builder puede instanciar
    private Usuario(UsuarioBuilder builder) {
        this.nombre = builder.nombre;
        this.apellido = builder.apellido;
        this.edad = builder.edad;
        this.telefono = builder.telefono;
        this.direccion = builder.direccion;
    }

    // Getters...

    // Static Inner Class
    public static class UsuarioBuilder {
        private final String nombre;
        private final String apellido;
        private int edad = 0; // valor default
        private String telefono = "N/A";
        private String direccion = "";

        public UsuarioBuilder(String nombre, String apellido) {
            this.nombre = nombre;
            this.apellido = apellido;
        }

        public UsuarioBuilder edad(int edad) {
            this.edad = edad;
            return this; // Retornamos this para encadenar
        }
        public UsuarioBuilder telefono(String val) { this.telefono = val; return this; }
        public UsuarioBuilder direccion(String val) { this.direccion = val; return this; }

        public Usuario build() {
            // Aquí podríamos validar reglas de negocio complejas
            return new Usuario(this);
        }
    }
}`,
            syntaxDescription: "Es como pedir un sándwich en Subway. No dices 'dame el sándwich número 4'. Dices: 'Inicia con pan orégano, añade queso, añade jamón, añade lechuga, tuesta'. Construyes el producto final paso a paso a tu gusto.",
            useCases: [
                {
                    title: "Uso Fluido (Fluent Interface)",
                    description: "Creación limpia y auto-documentada.",
                    code: `Usuario user = new Usuario.UsuarioBuilder("Elon", "Musk")
    .edad(50)
    .direccion("Boca Chica, TX")
    // .telefono() es opcional, se usa el default
    .build();

System.out.println("Usuario creado: " + user.getNombre());`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Inmutabilidad",
                    content: "El Building Pattern brilla creando objetos inmutables. El `Builder` acumula el estado y el `build()` devuelve un objeto `final` bloqueado.",
                    code: "public final class User { ... }"
                },
                {
                    type: "idea",
                    title: "Lombok @Builder",
                    content: "En la vida real, raramente escribes el Builder a mano. Usas la anotación `@Builder` de Lombok y él escribe todo el código sucio por ti.",
                    code: "@Builder\nclass User { ... }"
                }
            ]
        },
        {
            id: "prototype",
            title: "Prototype",
            videos: [
                { title: "4.1 - Introducción a prototype (EDTEAM)", url: "https://www.youtube.com/watch?v=BkxncFm9XLA" },
                { title: "4.2 - Ejemplo de prototype (EDTEAM)", url: "https://www.youtube.com/watch?v=Jcei_LPEVjw" },
                { title: "4.3 - Ejemplo de prototype II (EDTEAM)", url: "https://www.youtube.com/watch?v=fWapMLcNkPY" },
                { title: "4.5 - Recomendaciones y preguntas II (EDTEAM)", url: "https://www.youtube.com/watch?v=v7neiRumwPM" },
                { title: "001. Teoría Prototype (Udemy)", url: "https://www.youtube.com/watch?v=W4990rnW-7w" },
                { title: "002. Código Prototype Parte 1 (Udemy)", url: "https://www.youtube.com/watch?v=UgrEcqlbWyA" },
                { title: "003. Código Prototype Final (Udemy)", url: "https://www.youtube.com/watch?v=eREXh-xEXgs" },
                { title: "004. Ventajas Prototype (Udemy)", url: "https://www.youtube.com/watch?v=ARve6ioLgH8" },
                { title: "23. Prototype (Código Facilito)", url: "https://www.youtube.com/watch?v=Nq9sqM9Z5YU" },
                { title: "PROTOTYPE PATTERN 🤖🔨 the pattern of CLONES", url: "https://www.youtube.com/watch?v=fRcbe-3V1c8" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Crear nuevos objetos clonando uno existente. En lugar de crear desde cero, tomas un prototipo y lo copias."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Útil si crear un objeto es muy costoso (ej. requiere consultar BD externa) y necesitas muchas copias casi idénticas."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando la creación de instancias es cara o compleja. Prefiere 'Copy Constructors' o métodos de fábrica sobre `clone()` nativo de Java (que es problemático)."
                }
            ],
            description: "Clonar objetos existentes eficientemente.",
            code: `// Interfaz personalizada para evitar líos con Cloneable nativo
interface Prototipo<T> {
    T clonar();
}

class Robot implements Prototipo<Robot> {
    private String modelo;
    private List<String> capacidades;

    public Robot(String modelo) {
        this.modelo = modelo;
        this.capacidades = new ArrayList<>();
    }
    
    // Constructor de copia privado para uso interno
    private Robot(Robot target) {
        if (target != null) {
            this.modelo = target.modelo;
            // Deep copy de la lista para seguridad
            this.capacidades = new ArrayList<>(target.capacidades);
        }
    }

    @Override
    public Robot clonar() {
        return new Robot(this);
    }
    
    public void agregarCapacidad(String cap) { capacidades.add(cap); }
    public String toString() { return modelo + ": " + capacidades; }
}`,
            syntaxDescription: "Es como la oveja Dolly. No la construyeron desde cero átomo por átomo; tomaron una oveja existente y la clonaron.",
            useCases: [
                {
                    title: "Clonación y Modificación",
                    description: "Crear variantes basadas en un objeto base configurado.",
                    code: `Robot robotBase = new Robot("R2 Unit");
robotBase.agregarCapacidad("Moverse");
robotBase.agregarCapacidad("Reparar");

// Clonamos el base para crear uno específico
Robot r2d2 = robotBase.clonar();
r2d2.agregarCapacidad("Hackear Puertas");

// El original queda intacto
System.out.println(robotBase); // [Moverse, Reparar]
System.out.println(r2d2);      // [Moverse, Reparar, Hackear Puertas]`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Cloneable Roto",
                    content: "La interfaz `Cloneable` nativa de Java es famosa por estar mal diseñada. Evítala. Usa constructores de copia o librerías de clonación.",
                    code: "public T clonar() { return new T(this); }"
                },
                {
                    type: "idea",
                    title: "Costo de Creación",
                    content: "Usa prototipo cuando hacer `new` sea muy caro (ej. requiere conectar a BD) pero clonar en memoria sea barato.",
                    code: "obj.clonar(); // Rápido"
                }
            ]
        },

        // ==========================================
        // PATRONES ESTRUCTURALES (7)
        // ==========================================
        {
            id: "adapter",
            title: "Adapter",
            videos: [
                { title: "2.1 - Adapter teoría (EDTEAM)", url: "https://www.youtube.com/watch?v=aEhP9h_A0Qg" },
                { title: "2.2 - Ejemplo práctico adapter (EDTEAM)", url: "https://www.youtube.com/watch?v=Z3b8kM1jnuQ" },
                { title: "2.3 - Ejemplo práctico adapter II (EDTEAM)", url: "https://www.youtube.com/watch?v=vhzaOJ00mo4" },
                { title: "24. Adapter (Código Facilito)", url: "https://www.youtube.com/watch?v=PpEo3kzfPDM" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un puente entre dos interfaces incompatibles. Envuelve un objeto extraño dentro de una clase que tu sistema sí entiende."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite integrar librerías de terceros o código legacy sin romper tu diseño actual. No necesitas reescribir la librería externa, solo adaptarla."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tienes una clase que hace lo que necesitas, pero su interfaz no encaja con lo que tu código espera."
                }
            ],
            description: "Permite colaborar a interfaces incompatibles.",
            code: `// Interfaz que entiende nuestro sistema actual
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// Interfaz avanzada (Librería externa o Legacy)
interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

// Implementaciones concretas de la librería avanzada
class VlcPlayer implements AdvancedMediaPlayer {
    public void playVlc(String f) { System.out.println("Playing vlc file: " + f); }
    public void playMp4(String f) { /* do nothing */ }
}

// EL ADAPTADOR
class MediaAdapter implements MediaPlayer {
    AdvancedMediaPlayer advancedMusicPlayer;

    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer = new VlcPlayer();
        }
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer.playVlc(fileName);
        }
    }
}`,
            syntaxDescription: "Es exactamente como un adaptador de corriente universal. Tu secador de pelo (clase cliente) tiene enchufe europeo (interfaz A), pero estás en un hotel en Londres con enchufe de 3 pines (interfaz B). El adaptador 'traduce' la conexión.",
            useCases: [
                {
                    title: "Uso del Adaptador",
                    description: "El cliente usa MediaPlayer sin saber que hay un VlcPlayer debajo.",
                    code: `public class AudioPlayer implements MediaPlayer {
    MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        // Soporte nativo para mp3
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file: " + fileName);
        } 
        // MediaAdapter provee soporte para otros formatos
        else if (audioType.equalsIgnoreCase("vlc")) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        }
    }
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Wrapper",
                    content: "El Adapter es un 'Wrapper' (Envoltorio). Envuelve al objeto incompatible para que parezca compatible.",
                    code: "class Adapter implements Target { ... }"
                },
                {
                    type: "goodPractice",
                    title: "Dos Direcciones",
                    content: "A veces necesitas un 'Two-Way Adapter' que funcione en ambas direcciones si los sistemas necesitan hablarse mutuamente.",
                    code: "implements InterfaceA, InterfaceB"
                }
            ]
        },
        {
            id: "bridge",
            title: "Bridge",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Separa la Abstracción (el 'qué') de la Implementación (el 'cómo'). En lugar de herencia masiva, usa composición."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita la explosión de clases. Si tienes Formas (Círculo, Cuadrado) y Colores (Rojo, Azul), sin Bridge tendrías 4 clases (CirculoRojo, CirculoAzul...). Con Bridge, tienes 2 jerarquías que se combinan."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando quieras extender una clase en varias dimensiones ortogonales independientes."
                }
            ],
            description: "Separa la abstracción de su implementación.",
            code: `// Implementación (La dimensión "Color")
interface Color {
    void aplicar();
}

class Rojo implements Color {
    public void aplicar() { System.out.println("Aplicando color Rojo"); }
}
class Azul implements Color {
    public void aplicar() { System.out.println("Aplicando color Azul"); }
}

// Abstracción (La dimensión "Forma")
abstract class Forma {
    protected Color color; // El 'Puente'
    
    public Forma(Color c) { this.color = c; }
    
    abstract public void dibujar();
}

class Circulo extends Forma {
    public Circulo(Color c) { super(c); }
    
    public void dibujar() {
        System.out.print("Dibujando Círculo -> ");
        color.aplicar();
    }
}`,
            syntaxDescription: "Un control remoto (Abstracción) y un Televisor (Implementación). Tienes un control Sony y un control Samsung. Y tienes TVs Sony y TVs Samsung. El concepto de 'Control Remoto' es independiente del dispositivo que controla; el puente invisible es la señal IR que los conecta.",
            useCases: [
                {
                    title: "Combinación Dinámica",
                    description: "Combinar cualquier Forma con cualquier Color sin crear nuevas clases.",
                    code: `Forma circuloRojo = new Circulo(new Rojo());
Forma circuloAzul = new Circulo(new Azul());

circuloRojo.dibujar(); // Dibujando Círculo -> Aplicando color Rojo
circuloAzul.dibujar(); // Dibujando Círculo -> Aplicando color Azul`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Producto Cartesiano",
                    content: "El Bridge evita que multipliques clases. 3 Formas x 3 Colores = 9 Clases (Mal). 3 Formas + 3 Colores = 6 Clases (Bien con Bridge).",
                    code: "A + B en vez de AB"
                },
                {
                    type: "recommendation",
                    title: "Drivers JDBC",
                    content: "JDBC es un ejemplo clásico de Bridge. Java tiene la abstracción (`Connection`) y cada vendedor (MySQL, Oracle) provee la implementación.",
                    code: "DriverManager.getConnection(...)"
                }
            ]
        },
        {
            id: "composite",
            title: "Composite",
            videos: [
                { title: "25. Composite (Código Facilito)", url: "https://www.youtube.com/watch?v=NpV6PJq93n0" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Permite tratar a objetos individuales y a grupos de objetos de la misma manera. Estructuras de árbol donde las ramas y las hojas tienen la misma interfaz."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Simplifica el código cliente. No necesitas saber si estás borrando un archivo (Hoja) o una carpeta con 1000 archivos (Compuesto); solo llamas a `borrar()`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Para representar jerarquías parte-todo: menús gráficos, sistemas de archivos, estructuras organizacionales."
                }
            ],
            description: "Trata objetos individuales y composiciones uniformemente.",
            code: `// Componente común
interface FileSystemComponent {
    void mostrarDetalles();
}

// Hoja (Leaf)
class Archivo implements FileSystemComponent {
    private String nombre;
    public Archivo(String nombre) { this.nombre = nombre; }
    
    public void mostrarDetalles() {
        System.out.println("Archivo: " + nombre);
    }
}

// Compuesto (Composite)
class Carpeta implements FileSystemComponent {
    private String nombre;
    private List<FileSystemComponent> hijos = new ArrayList<>();
    
    public Carpeta(String nombre) { this.nombre = nombre; }
    
    public void agregar(FileSystemComponent componente) {
        hijos.add(componente);
    }
    
    public void mostrarDetalles() {
        System.out.println("Carpeta: " + nombre);
        for (FileSystemComponent hijo : hijos) {
            hijo.mostrarDetalles(); // Recursión mágica
        }
    }
}`,
            syntaxDescription: "Como un ejército. Un soldado raso es una unidad. Un pelotón (que contiene soldados) también funciona como una unidad. Un batallón (que contiene pelotones) también. El general da la orden '¡Avanzar!' y se propaga automáticamente hacia abajo, sin importar qué tan grande sea el grupo.",
            useCases: [
                {
                    title: "Estructura de Árbol",
                    description: "Operar sobre una jerarquía compleja con una sola llamada.",
                    code: `Carpeta raiz = new Carpeta("Raiz");
Carpeta musica = new Carpeta("Música");
musica.agregar(new Archivo("cancion.mp3"));

raiz.agregar(new Archivo("nota.txt"));
raiz.agregar(musica);

// Imprime todo el árbol recursivamente
raiz.mostrarDetalles();`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Uniformidad",
                    content: "Lo mágico es que puedes ignorar si tienes una hoja o una rama. Llamas al método y funciona. Ideal para menús recursivos.",
                    code: "raiz.mostrar();"
                },
                {
                    type: "error",
                    title: "Tipado Fuerte",
                    content: "A veces quieres restringir que solo una Carpeta pueda tener hijos, no un Archivo. Composite a veces sacrifica esa seguridad por uniformidad.",
                    code: "// list.add() en Hoja"
                }
            ]
        },
        {
            id: "decorator",
            title: "Decorator",
            videos: [
                { title: "26. Decorator (Código Facilito)", url: "https://www.youtube.com/watch?v=zPG4MII21tA" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un envoltorio que añade funcionalidades extra. Envuelves un objeto dentro de otro que tiene la misma interfaz, pero añade 'adornos' antes o después de llamar al objeto original."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Alternativa flexible a la herencia. Si quieres un `Coche + Turbo + Alerón`, con herencia es difícil. Con Decorador, envuelves `new Aleron(new Turbo(new Coche()))`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Para añadir responsabilidades a objetos individuales dinámicamente sin afectar a otros objetos de la misma clase."
                }
            ],
            description: "Añade funcionalidad a objetos dinámicamente.",
            code: `// Interfaz Base
interface Notificador {
    void enviar(String mensaje);
}

class NotificadorBasico implements Notificador {
    public void enviar(String mensaje) { System.out.println("Email: " + mensaje); }
}

// Decorador Base
abstract class BaseDecorator implements Notificador {
    private Notificador wrappee;
    
    public BaseDecorator(Notificador n) { this.wrappee = n; }
    
    public void enviar(String mensaje) { wrappee.enviar(mensaje); }
}

// Decoradores Concretos
class SMSDecorator extends BaseDecorator {
    public SMSDecorator(Notificador n) { super(n); }
    
    public void enviar(String mensaje) {
        super.enviar(mensaje);
        System.out.println("SMS: " + mensaje);
    }
}
class FacebookDecorator extends BaseDecorator {
    public FacebookDecorator(Notificador n) { super(n); }
    
    public void enviar(String mensaje) {
        super.enviar(mensaje);
        System.out.println("FB: " + mensaje);
    }
}`,
            syntaxDescription: "Como las Matryoshkas (muñecas rusas). Tienes una muñeca pequeña (Objeto base). La metes dentro de una mediana (Decorador 1). Y esa dentro de una grande (Decorador 2). Cuando miras a la muñeca grande, ves una sola cosa, pero contiene todas las capas.",
            useCases: [
                {
                    title: "Apilando Comportamientos",
                    description: "Construir un objeto con múltiples capacidades en runtime.",
                    code: `// Quiero Email + SMS + Facebook
Notificador n = new FacebookDecorator(
                    new SMSDecorator(
                        new NotificadorBasico()));

// Una sola llamada dispara la cadena
n.enviar("Alerta Crítica!");
// Salida: Email..., SMS..., FB...`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Herencia vs Decoración",
                    content: "La herencia es estática (se decide al compilar). La decoración es dinámica (se decide al ejecutar). Puedes añadir/quitar poderes en tiempo real.",
                    code: "new Dec(new Obj())"
                },
                {
                    type: "goodPractice",
                    title: "Java IO",
                    content: "Java I/O usa esto a muerte. `new BufferedReader(new InputStreamReader(new FileInputStream()))`. Cada capa decora a la anterior.",
                    code: "new BufferedInputStream(in)"
                }
            ]
        },
        {
            id: "facade",
            title: "Facade",
            videos: [
                { title: "1.4 - Facade teoría (EDTEAM)", url: "https://www.youtube.com/watch?v=jFuLiKj5xcI" },
                { title: "1.5 - Ejemplo práctico facade (EDTEAM)", url: "https://www.youtube.com/watch?v=ny-nrxdejeU" },
                { title: "27. Facade (Código Facilito)", url: "https://www.youtube.com/watch?v=krTJNhwDDAQ" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una interfaz simple para un sistema complejo. Oculta el lío de clases que hay detrás y te da un botón fácil de usar."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Reduce la curva de aprendizaje. No necesitas saber como funcionan las 50 clases de una librería de video, solo llamas a `convertirVideo()`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que quieras simplificar la interacción con una librería compleja o un subsistema heredado."
                }
            ],
            description: "Interfaz simplificada para un sistema complejo.",
            code: `// Subsistema Complejo
class VideoFile { ... }
class OggCompressionCodec { ... }
class MPEG4CompressionCodec { ... }
class CodecFactory { ... }
class BitrateReader { ... }
class AudioMixer { ... }

// Nuestra Fachada
public class VideoConversionFacade {
    public File convertVideo(String fileName, String format) {
        System.out.println("VideoConversionFacade: conversion started.");
        VideoFile file = new VideoFile(fileName);
        Codec sourceCodec = CodecFactory.extract(file);
        
        Codec destinationCodec;
        if (format.equals("mp4")) {
            destinationCodec = new MPEG4CompressionCodec();
        } else {
            destinationCodec = new OggCompressionCodec();
        }
        
        VideoFile buffer = BitrateReader.read(file, sourceCodec);
        VideoFile intermediateResult = BitrateReader.convert(buffer, destinationCodec);
        File result = (new AudioMixer()).fix(intermediateResult);
        
        System.out.println("VideoConversionFacade: conversion completed.");
        return result;
    }
}`,
            syntaxDescription: "Es como el servicio de habitaciones de un hotel. Tú llamas y pides 'Una hamburguesa'. No tienes que llamar al carnicero, luego al panadero, luego al chef y luego al camarero. La recepción (Fachada) coordina todo ese caos por ti.",
            useCases: [
                {
                    title: "Uso para el Cliente",
                    description: "El cliente desconoce la complejidad total del proceso.",
                    code: `VideoConversionFacade converter = new VideoConversionFacade();
// Una simple línea hace todo el trabajo sucio
File mp4Video = converter.convertVideo("youtubevideo.ogg", "mp4");`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "No escondas todo",
                    content: "Una fachada debe simplificar el uso común, pero no bloquear el acceso a las clases de bajo nivel por si un usuario avanzado las necesita.",
                    code: "facade.simple();\nlowLevel.complex();"
                },
                {
                    type: "idea",
                    title: "Fachada vs Adapter",
                    content: "El Adapter hace que dos cosas incompatibles funcionen. La Fachada hace que una cosa compleja sea simple.",
                    code: "// Adapter = Bridge\n// Facade = UI"
                }
            ]
        },
        {
            id: "flyweight",
            title: "Flyweight",
            videos: [
                { title: "30. Flyweight (Código Facilito)", url: "https://www.youtube.com/watch?v=cb_r6D1ItiI" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Optimización de memoria. Si tienes millones de objetos similares (ej. árboles en un bosque), no guardes el color 'Verde' un millón de veces. Guarda 'Verde' una vez y compártelo."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Sin él, te quedas sin memoria RAM en aplicaciones gráficas o simulaciones masivas."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tienes una cantidad masiva de objetos que consumen mucha memoria y gran parte de su estado puede ser compartido."
                }
            ],
            description: "Comparte estado para soportar millones de objetos.",
            code: `// Flyweight: Estado intrínseco (compartido)
class TipoArbol {
    private String nombre;
    private String color;
    private String textura; // Datos pesados

    public TipoArbol(String nombre, String color, String textura) {
        this.nombre = nombre;
        this.color = color;
        this.textura = textura;
    }

    public void dibujar(int x, int y) {
        System.out.println("Dibujando " + nombre + " en (" + x + ", " + y + ")");
    }
}

// Fábrica de Flyweights (Cache)
class ArbolFactory {
    static Map<String, TipoArbol> tipos = new HashMap<>();

    public static TipoArbol getTipoArbol(String nombre, String color, String textura) {
        TipoArbol result = tipos.get(nombre);
        if (result == null) {
            result = new TipoArbol(nombre, color, textura);
            tipos.put(nombre, result);
        }
        return result;
    }
}`,
            syntaxDescription: "Como una biblioteca pública. No compras un libro para cada ciudadano. Tienes UN libro en la estantería (Flyweight) y miles de personas lo leen por turnos. El contenido del libro es el mismo para todos.",
            useCases: [
                {
                    title: "Bosque de Objetos",
                    description: "Miles de árboles usan solo un par de objetos en memoria.",
                    code: `class Arbol {
    private int x, y;
    private TipoArbol tipo; // Referencia ligera

    public Arbol(int x, int y, TipoArbol tipo) {
        this.x = x; this.y = y; this.tipo = tipo;
    }
    public void dibujar() { tipo.dibujar(x, y); }
}

// Uso: Creamos 10,000 árboles, pero solo 2 objetos "TipoArbol" en memoria
TipoArbol pino = ArbolFactory.getTipoArbol("Pino", "Verde", "TexturaPino");
for(int i=0; i<10000; i++) {
    bosque.add(new Arbol(randomX, randomY, pino));
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Inmutabilidad",
                    content: "Los objetos Flyweight (compartidos) DEBEN ser inmutables. Si uno cambia, cambia para todos los que lo usan.",
                    code: "public final class Fly { ... }"
                },
                {
                    type: "goodPractice",
                    title: "String Pool",
                    content: "El 'String Constant Pool' de Java es un ejemplo nativo del patrón Flyweight.",
                    code: "String s = \"hi\".intern();"
                }
            ]
        },
        {
            id: "proxy",
            title: "Proxy",
            videos: [
                { title: "1.1 - Introducción (EDTEAM)", url: "https://www.youtube.com/watch?v=gfqK_j0pQLU" },
                { title: "1.2 - Proxy teoría (EDTEAM)", url: "https://www.youtube.com/watch?v=cP9UecsYjzQ" },
                { title: "1.3 - Ejemplo práctico Proxy (EDTEAM)", url: "https://www.youtube.com/watch?v=05yOslfM6I4" },
                { title: "28. Proxy (Código Facilito)", url: "https://www.youtube.com/watch?v=hAVK20C3wm4" },
                { title: "29. Virtual Proxy (Código Facilito)", url: "https://www.youtube.com/watch?v=44v5Os6H7sc" }
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un sustituto de otro objeto. Controla el acceso al objeto original, permitiendo hacer cosas antes o después de que la petición llegue al destino."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Seguridad y Performance. Puedes usar un proxy para verificar permisos antes de dejar pasar a alguien (Security Proxy) o para cargar objetos pesados solo cuando realmente se necesiten (Virtual Proxy)."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Lazy loading, control de acceso, logging, o conexión remota."
                }
            ],
            description: "Controla el acceso al objeto original.",
            code: `interface Internet {
    void conectar(String servidor) throws Exception;
}

class InternetReal implements Internet {
    public void conectar(String servidor) {
        System.out.println("Conectando a " + servidor);
    }
}

class InternetProxy implements Internet {
    private InternetReal internetReal = new InternetReal();
    private static List<String> sitiosProhibidos = Arrays.asList("juegos.com", "redsocial.com");

    @Override
    public void conectar(String servidor) throws Exception {
        if (sitiosProhibidos.contains(servidor.toLowerCase())) {
            throw new Exception("Acceso Denegado a " + servidor);
        }
        // Validacion pasada, delegamos
        internetReal.conectar(servidor);
    }
}`,
            syntaxDescription: "Es como una tarjeta de crédito. La tarjeta es un Proxy del dinero real en tu cuenta bancaria. No llevas los billetes (Objeto Real) en el bolsillo. La tarjeta representa el dinero y el banco verifica la transacción antes de mover los fondos reales.",
            useCases: [
                {
                    title: "Proxy de Protección",
                    description: "Restringir acceso basado en reglas sin tocar la clase real.",
                    code: `Internet internet = new InternetProxy();

try {
    internet.conectar("google.com"); // Funciona
    internet.conectar("juegos.com"); // Lanza Excepción
} catch (Exception e) {
    System.out.println(e.getMessage());
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Lazy Loading",
                    content: "Un Virtual Proxy puede retrasar la carga de una imagen pesada hasta que realmente se vaya a pintar en pantalla.",
                    code: "if (real == null) real = load();"
                },
                {
                    type: "goodPractice",
                    title: "Spring AOP",
                    content: "Spring usa Proxies dinámicos para añadir magia (Transacciones, Seguridad) a tus métodos sin que tú escribas ese código.",
                    code: "@Transactional"
                }
            ]
        },

        // ==========================================
        // PATRONES DE COMPORTAMIENTO (11)
        // ==========================================
        {
            id: "chain-responsibility",
            title: "Chain of Responsibility",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Pasar una petición por una cadena de manejadores. Cada manejador decide si procesa la petición o se la pasa al siguiente de la fila."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Desacoplamiento total. El emisor no sabe quién resolverá el problema, y los receptores no conocen al emisor."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En sistemas de soporte (Nivel 1 -> Nivel 2 -> Nivel 3), filtros web (Auth -> Logging -> Compresión) o manejo de eventos en UI."
                }
            ],
            description: "Pasa una petición por una cadena de objetos.",
            code: `abstract class Middleware {
    private Middleware proximo;

    // Construye la cadena
    public Middleware linkWith(Middleware proximo) {
        this.proximo = proximo;
        return proximo;
    }

    protected boolean checkNext(String email, String password) {
        if (proximo == null) return true;
        return proximo.check(email, password);
    }
    
    public abstract boolean check(String email, String password);
}

class AuthMiddleware extends Middleware {
    public boolean check(String email, String password) {
        if (!email.equals("admin@admin.com")) {
             System.out.println("Usuario inválido!");
             return false;
        }
        return checkNext(email, password);
    }
}
class RoleMiddleware extends Middleware {
    public boolean check(String email, String password) {
        if (email.equals("admin@admin.com")) { // Chequeo simple
            System.out.println("Bienvenido Administrador");
            return checkNext(email, password);
        }
        return false;
    }
}`,
            syntaxDescription: "El 'balde de agua' en un incendio. Una persona llena el balde y lo pasa al siguiente, que lo pasa al siguiente. O como el soporte técnico: llamas al call center (Nivel 1), si no saben, te pasan al supervisor (Nivel 2), si no, al ingeniero (Nivel 3).",
            useCases: [
                {
                    title: "Configuración de Cadena",
                    description: "Enlazar y ejecutar la secuencia de validaciones.",
                    code: `Middleware cadena = new AuthMiddleware();
cadena.linkWith(new RoleMiddleware());
// Se pueden añadir más eslabones (Logging, Throttling...)

// Ejecución
cadena.check("admin@admin.com", "1234"); 
// Salida: Bienvenido Administrador`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Filtros Web",
                    content: "Este patrón es la base de los 'Filters' en Servlets o Spring Security. Cada filtro decide si deja pasar la petición o la bloquea (ej. Auth).",
                    code: "doFilter(request, response, chain);"
                },
                {
                    type: "goodPractice",
                    title: "Orden Importa",
                    content: "El orden de la cadena es crítico. Pon los filtros más rápidos y restrictivos (Seguridad, IP Ban) al principio para no gastar recursos.",
                    code: "// IPBan -> Auth -> Log"
                }
            ]
        },
        {
            id: "command",
            title: "Command",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Empaquetar una solicitud como un objeto. El 'Botón' no sabe lo que hace, solo sabe que tiene que llamar al método `ejecutar()` de un objeto que le dieron."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite 'encolar' peticiones, deshacer operaciones (Undo), y desacoplar quien pide la acción de quien la ejecuta."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En elementos de UI (botones, menús), tareas programadas, o sistemas transaccionales con rollback."
                }
            ],
            description: "Encapsula una petición como un objeto.",
            code: `// Receiver: Lógica de negocio real
class Luz {
    void on() { System.out.println("Luz encendida"); }
    void off() { System.out.println("Luz apagada"); }
}

// Command Interface
interface Comando {
    void ejecutar();
}

// Concrete Command
class EncenderLuzCmd implements Comando {
    private Luz luz;
    public EncenderLuzCmd(Luz luz) { this.luz = luz; }
    public void ejecutar() { luz.on(); }
}

// Invoker: El control remoto
class ControlRemoto {
    private Comando comando;
    public void setComando(Comando c) { this.comando = c; }
    public void click() { comando.ejecutar(); }
}`,
            syntaxDescription: "Es como la comanda de un restaurante. Tú (Cliente) le dices al camarero (Invoker) 'Quiero sopa'. El camarero escribe una nota (Command). Esa nota va a la cocina. El cocinero (Receiver) la lee y hace la sopa. El camarero no sabe cocinar, y el cocinero no sabe quién pidió, pero la nota los conecta.",
            useCases: [
                {
                    title: "Desacoplamiento UI",
                    description: "El botón no conoce la clase Luz.",
                    code: `Luz luzSala = new Luz();
Comando encender = new EncenderLuzCmd(luzSala);

ControlRemoto remoto = new ControlRemoto();
remoto.setComando(encender);

// El usuario presiona el botón
remoto.click(); // "Luz encendida"`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Deshacer (Undo)",
                    content: "Si el objeto Command guarda el estado previo antes de ejecutar, puedes implementar `deshacer()` fácilmente. Es la base de todo Ctrl+Z.",
                    code: "command.undo();"
                },
                {
                    type: "goodPractice",
                    title: "Runnable",
                    content: "La interfaz `Runnable` de Java es, en esencia, el patrón Command más simple: 'Aquí tienes un código, ejecútalo cuando quieras'.",
                    code: "new Thread(runnable).start();"
                }
            ]
        },
        {
            id: "interpreter",
            title: "Interpreter",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un patrón para definir una gramática y descifrar oraciones en ese idioma. Convierte texto en acciones."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Útil para crear mini-lenguajes (DSLs) dentro de tu aplicación, como buscadores avanzados ('nombre=Juan AND edad>20') o calculadoras."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tienes reglas gramaticales simples y estables. Para cosas complejas, usa un parser real como ANTLR."
                }
            ],
            description: "Evalúa sentencias de un lenguaje simple.",
            code: `interface Expresion {
    boolean interpretar(String contexto);
}

class ExpresionTerminal implements Expresion {
    private String data;
    public ExpresionTerminal(String data) { this.data = data; }
    public boolean interpretar(String contexto) {
        return contexto.contains(data);
    }
}

class ExpresionO implements Expresion {
    private Expresion expr1;
    private Expresion expr2;
    public ExpresionO(Expresion e1, Expresion e2) {
        this.expr1 = e1; this.expr2 = e2;
    }
    public boolean interpretar(String ctx) {
        return expr1.interpretar(ctx) || expr2.interpretar(ctx);
    }
}`,
            syntaxDescription: "Es como un músico leyendo partitura. Los símbolos en el papel (negra, blanca, corchea) son interpretados uno por uno para producir música. El intérprete conoce las reglas de qué significa cada símbolo.",
            useCases: [
                {
                    title: "Motor de Reglas Simple",
                    description: "Evaluar si un texto cumple regla A o regla B.",
                    code: `Expresion esJava = new ExpresionTerminal("Java");
Expresion esSpring = new ExpresionTerminal("Spring");
Expresion esJavaOSpring = new ExpresionO(esJava, esSpring);

System.out.println(esJavaOSpring.interpretar("Me gusta Java")); // true
System.out.println(esJavaOSpring.interpretar("Uso .NET"));    // false`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "No Reinventes",
                    content: "Para gramáticas complejas, escribir un Interpreter a mano es un infierno. Usa herramientas como ANTLR o JavaCC.",
                    code: "// Parser Generator"
                },
                {
                    type: "idea",
                    title: "RegEx",
                    content: "Las Expresiones Regulares son, en el fondo, un patrón Interpreter super optimizado incorporado en el lenguaje.",
                    code: "Pattern.compile(\".*\");"
                }
            ]
        },
        {
            id: "iterator",
            title: "Iterator",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un objeto que te deja recorrer los elementos de una colección sin exponer cómo está guardada por dentro (array, lista, árbol)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Unifica la forma de recorrer cosas. `for (Elemento e : coleccion)` funciona igual para un ArrayList, un HashSet o tu propia estructura de datos loca."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando quieras recorrer una estructura de datos compleja ocultando su complejidad, o proveer múltiples formas de recorrido (secuencial, inverso, saltos)."
                }
            ],
            description: "Recorre una colección sin exponer su estructura.",
            code: `// Nuestra propia colección
class NombresContainer implements Iterable<String> {
    public String[] nombres = {"Robert", "John", "Julie", "Lora"};

    @Override
    public Iterator<String> iterator() {
        return new NombresIterator();
    }

    private class NombresIterator implements Iterator<String> {
        int index;

        @Override
        public boolean hasNext() {
            return index < nombres.length;
        }

        @Override
        public String next() {
            if(this.hasNext()){
                return nombres[index++];
            }
            return null;
        }
    }
}`,
            syntaxDescription: "Es como el botón 'Siguiente' en tu reproductor de música. No te importa si la canción siguiente viene de un CD, un MP3 o Streaming. Solo sabes que al pulsar 'Next' obtienes la siguiente canción.",
            useCases: [
                {
                    title: "Uso Estándar (For-Each)",
                    description: "Java usa Iteradores por debajo para el bucle for mejorado.",
                    code: `NombresContainer container = new NombresContainer();

// La magia del Iterator permite esto:
for(String nombre : container) {
    System.out.println("Nombre: " + nombre);
}`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Oculta Detalles",
                    content: "El iterador permite cambiar tu estructura interna (de Array a LinkedList) sin romper el código de quien la usa. ¡Abstraction win!",
                    code: "iterator = list.iterator();"
                },
                {
                    type: "idea",
                    title: "Streams",
                    content: "Los Java Streams son 'Iteradores con Esteroides'. Permiten recorrer, filtrar y transformar datos de forma funcional y paralela.",
                    code: "list.stream().filter(...)"
                }
            ]
        },
        {
            id: "mediator",
            title: "Mediator",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un intermediario que coordina la comunicación entre objetos. En lugar de que los objetos se hablen todos con todos, todos hablan con el Mediador."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Reduce el acoplamiento caótico (N x N conexiones). Convierte una red de dependencias en una estrella, donde el Mediador es el centro."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "En sistemas complejos de UI (donde un checkbox activa un botón que borra un texto...), o sistemas de chat."
                }
            ],
            description: "Centraliza la comunicación entre objetos.",
            code: `class ChatMediator {
    private List<Usuario> usuarios = new ArrayList<>();

    public void registrar(Usuario u) { usuarios.add(u); }

    public void enviar(String msg, Usuario emisor) {
        for (Usuario u : usuarios) {
            // No enviar el mensaje a quien lo mandó
            if (u != emisor) {
                u.recibir(msg);
            }
        }
    }
}

abstract class Usuario {
    protected ChatMediator mediator;
    protected String nombre;
    
    public Usuario(ChatMediator med, String nombre) { 
        this.mediator = med; 
        this.nombre = nombre; 
    }
    
    public abstract void enviar(String msg);
    public abstract void recibir(String msg);
}

class UsuarioConcreto extends Usuario {
    public UsuarioConcreto(ChatMediator m, String n) { super(m, n); }
    
    @Override
    public void enviar(String msg) {
        System.out.println(this.nombre + " enviando: " + msg);
        mediator.enviar(msg, this);
    }
    @Override
    public void recibir(String msg) {
        System.out.println(this.nombre + " recibió: " + msg);
    }
}`,
            syntaxDescription: "Es como la Torre de Control de un aeropuerto. Los aviones (Objetos) no hablan entre ellos para decidir quién aterriza. Hablan con la Torre (Mediador), y la Torre les dice qué hacer. Evita que los aviones choquen.",
            useCases: [
                {
                    title: "Sala de Chat",
                    description: "Los usuarios no necesitan conocerse entre sí, solo al mediador.",
                    code: `ChatMediator chat = new ChatMediator();

Usuario u1 = new UsuarioConcreto(chat, "Juan");
Usuario u2 = new UsuarioConcreto(chat, "Pepe");
Usuario u3 = new UsuarioConcreto(chat, "Maria");

chat.registrar(u1);
chat.registrar(u2);
chat.registrar(u3);

u1.enviar("¡Hola a todos!");
// Pepe y Maria reciben, Juan no.`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Topología Estrella",
                    content: "El Mediator convierte una malla caótica (todos contra todos) en una estrella ordenada. El centro (Mediador) lo sabe todo; los nodos apenas saben nada.",
                    code: "A -> M -> B"
                },
                {
                    type: "error",
                    title: "God Object",
                    content: "Cuidado: El Mediador tiende a convertirse en un 'God Object' gigante que hace demasiadas cosas. Mantenlo enfocado solo en coordinar.",
                    code: "class Mediator { // Too big }"
                }
            ]
        },
        {
            id: "memento",
            title: "Memento",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Capturar el estado interno de un objeto para poder restaurarlo después. Básicamente, Ctrl+Z."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite deshacer cambios sin violar la encapsulación (no tienes que hacer públicos los campos privados para guardarlos)."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Editores de texto, juegos (guardar partida), transacciones."
                }
            ],
            description: "Captura y restaura el estado interno de un objeto.",
            code: `// Memento: Objeto inmutable que guarda el estado
class Memento {
    private final String estado;
    public Memento(String estado) { this.estado = estado; }
    public String getEstado() { return estado; }
}

// Originator: El objeto cuyo estado queremos guardar
class Editor {
    private String contenido;
    
    public void escribir(String texto) { this.contenido = texto; }
    public String getContenido() { return contenido; }
    
    public Memento guardar() { return new Memento(contenido); }
    
    public void restaurar(Memento m) {
        this.contenido = m.getEstado();
    }
}

// Caretaker: El que administra los guardados (historial)
class Historial {
    private Stack<Memento> historia = new Stack<>();
    
    public void guardar(Editor e) { historia.push(e.guardar()); }
    public void deshacer(Editor e) {
        if (!historia.isEmpty()) e.restaurar(historia.pop());
    }
}`,
            syntaxDescription: "Es como las 'Partidas Guardadas' (Save Games) en un videojuego. Antes de enfrentarte al jefe final, guardas la partida (creas un Memento). Si mueres, cargas la partida (Restauras el Memento) y vuelves exactamente al estado donde estabas.",
            useCases: [
                {
                    title: "Editor con Deshacer",
                    description: "Implementación simple de Undo/Redo.",
                    code: `Editor editor = new Editor();
Historial historial = new Historial();

editor.escribir("Versión 1");
historial.guardar(editor); // Guardamos "Versión 1"

editor.escribir("Versión 2");
System.out.println(editor.getContenido()); // Versión 2

historial.deshacer(editor); // Volvemos atrás
System.out.println(editor.getContenido()); // Versión 1`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Snapshot",
                    content: "El Memento debe ser inmutable. Es una foto del pasado. No dejes que nadie modifique la foto o cambiarás la historia.",
                    code: "public final class Memento { ... }"
                },
                {
                    type: "idea",
                    title: "Serialización",
                    content: "A menudo, serializar un objeto a un JSON o byte array es la forma más fácil de crear un Memento (guardar estado).",
                    code: "String json = toJson(obj);"
                }
            ]
        },
        {
            id: "observer",
            title: "Observer",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un mecanismo de suscripción. Un objeto (Sujeto) notifica a múltiples objetos (Observadores) sobre cualquier evento que le ocurra."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es la base de la reactividad. Cuando el Modelo cambia, la Vista se actualiza automáticamente. Desacopla al que emite el evento de los que reaccionan a él."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Event Listeners en UI, sistemas de noticias, redes sociales (Notificaciones), arquitectura MVC."
                }
            ],
            description: "Notifica cambios a múltiples objetos suscritos.",
            code: `// Interfaz Observador
interface Subscriber {
    void update(String context);
}

// Sujeto (Publisher)
class CanalYoutube {
    private List<Subscriber> subs = new ArrayList<>();
    
    public void suscribir(Subscriber s) { subs.add(s); }
    public void desuscribir(Subscriber s) { subs.remove(s); }
    
    public void subirVideo(String titulo) {
        System.out.println("Subiendo video: " + titulo);
        notificarAComunidad(titulo);
    }
    
    private void notificarAComunidad(String video) {
        for (Subscriber s : subs) {
            s.update(video);
        }
    }
}

// Observadores Concretos
class UsuarioNormal implements Subscriber {
    private String nombre;
    public UsuarioNormal(String n) { this.nombre = n; }
    public void update(String video) {
        System.out.println(nombre + ": ¡Nuevo video! " + video);
    }
}`,
            syntaxDescription: "YouTube. Tú (Observador) te suscribes a un canal (Sujeto). No tienes que revisar el canal cada 5 segundos. Cuando el Youtuber sube un video, YouTube te envía una notificación ('Bing!').",
            useCases: [
                {
                    title: "Sistema de Eventos",
                    description: "Notificación automática a suscriptores.",
                    code: `CanalYoutube miCanal = new CanalYoutube();
UsuarioNormal u1 = new UsuarioNormal("Fan1");
UsuarioNormal u2 = new UsuarioNormal("Fan2");

miCanal.suscribir(u1);
miCanal.suscribir(u2);

miCanal.subirVideo("Tutorial Java");
// Fan1: ¡Nuevo video! Tutorial Java
// Fan2: ¡Nuevo video! Tutorial Java`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Reactividad",
                    content: "Observer es el abuelo de la programación reactiva (RxJava, React). La idea es la misma: 'No me llames, yo te aviso'.",
                    code: "Observable.subscribe(...)"
                },
                {
                    type: "error",
                    title: "Memory Leaks",
                    content: "El problema #1 del Observer. Si olvidas desuscribir a los observadores, nunca serán recolectados por el GC (Lapsed Listener Problem).",
                    code: "list.remove(observer);"
                }
            ]
        },
        {
            id: "state",
            title: "State",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Permite que un objeto altere su comportamiento cuando su estado interno cambia. Parece como si el objeto hubiera cambiado de clase."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Elimina máquinas de estado gigantescas basadas en `switch` o `if-else` anidados. Cada estado es una clase que sabe qué hacer."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando un objeto tiene fases claras (Borrador -> Publicado) y las mismas operaciones hacen cosas distintas en cada fase."
                }
            ],
            description: "Cambia el comportamiento según el estado interno.",
            code: `interface EstadoReproductror {
    void clickPlay(Reproductor ctx);
}

class EstadoReady implements EstadoReproductror {
    public void clickPlay(Reproductor ctx) {
        System.out.println("Iniciando reproducción...");
        ctx.cambiarEstado(new EstadoPlaying());
    }
}

class EstadoPlaying implements EstadoReproductror {
    public void clickPlay(Reproductor ctx) {
        System.out.println("Pausando...");
        ctx.cambiarEstado(new EstadoReady());
    }
}

class Reproductor {
    private EstadoReproductror est;
    public Reproductor() { this.est = new EstadoReady(); } // Estado inicial
    
    public void cambiarEstado(EstadoReproductror e) { this.est = e; }
    
    // Delegamos la acción al estado actual
    public void click() { est.clickPlay(this); }
}`,
            syntaxDescription: "Tu cerebro. Estado 'Dormido': si suena la alarma, la ignoras. Estado 'Despierto': si suena la alarma, te asustas.",
            useCases: [
                {
                    title: "Máquina de Estados",
                    description: "El mismo botón hace cosas opuestas según el estado.",
                    code: `Reproductor ipod = new Reproductor();

ipod.click(); // Estado Ready -> "Iniciando..." -> Cambia a Playing
ipod.click(); // Estado Playing -> "Pausando..." -> Cambia a Ready`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Adiós Switch",
                    content: "Si tienes un `switch` o `if-else` gigante que depende de una variable `estado`, estás pidiendo a gritos el patrón State.",
                    code: "state.handle(); // No switch"
                },
                {
                    type: "goodPractice",
                    title: "Polimorfismo",
                    content: "Cada estado es una clase. El comportamiento cambia porque el objeto delegado cambia, no porque cambien las variables.",
                    code: "Context { State s; }"
                }
            ]
        },
        {
            id: "strategy",
            title: "Strategy",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Define una familia de algoritmos, encapsula cada uno y los hace intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo usan."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Puedes cambiar la lógica de negocio en tiempo de ejecución. ¿El usuario quiere pagar con PayPal o Tarjeta? Simplemente cambias la estrategia de pago."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Múltiples variantes de un algoritmo (ordenamiento, rutas GPS, compresión, pago)."
                }
            ],
            description: "Intercambia algoritmos en tiempo de ejecución.",
            code: `interface EstrategiaRuta {
    void construirRuta(String a, String b);
}

class MoverseEnCoche implements EstrategiaRuta {
    public void construirRuta(String a, String b) {
        System.out.println("Ruta rápida por carretera de " + a + " a " + b);
    }
}

class MoverseAPie implements EstrategiaRuta {
    public void construirRuta(String a, String b) {
        System.out.println("Ruta escénica por sendero de " + a + " a " + b);
    }
}

class NavegadorGPS {
    private EstrategiaRuta estrategia;
    
    public void setEstrategia(EstrategiaRuta e) { this.estrategia = e; }
    
    public void ir(String a, String b) {
        estrategia.construirRuta(a, b);
    }
}`,
            syntaxDescription: "Google Maps. Eliges el destino. Luego eliges 'Coche', 'A pie' o 'Transporte Público'. El destino es el mismo, pero la forma de calcular la ruta (La Estrategia) cambia drásticamente.",
            useCases: [
                {
                    title: "Cambio Dinámico",
                    description: "El mismo objeto cambia su lógica interna al vuelo.",
                    code: `NavegadorGPS gps = new NavegadorGPS();

gps.setEstrategia(new MoverseEnCoche());
gps.ir("Madrid", "Barcelona"); 
// Ruta rápida por carretera...

gps.setEstrategia(new MoverseAPie());
gps.ir("Madrid", "Barcelona");
// Ruta escénica por sendero...`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Inyección de Dependencia",
                    content: "Strategy es el mejor amigo de la Inyección de Dependencias. `Service` recibe una `Strategy` en el constructor y la usa.",
                    code: "constructor(Strategy s)"
                },
                {
                    type: "goodPractice",
                    title: "Composición > Herencia",
                    content: "En lugar de heredar `PatoVolador` o `PatoNadador`, ten un `Pato` que tiene una `EstrategiaVuelo` y `EstrategiaNado`.",
                    code: "class Pato { FlyBehavior f; }"
                }
            ]
        },
        {
            id: "template-method",
            title: "Template Method",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Define el esqueleto de un algoritmo en una clase base, pero deja que las subclases sobrescriban pasos específicos sin cambiar la estructura global."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita la duplicación de código en algoritmos que son casi idénticos excepto por algunos detalles."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Procesamiento de datos (Abrir->Procesar->Cerrar), generación de documentos, flujos de trabajo estandarizados."
                }
            ],
            description: "Define el esqueleto de un algoritmo.",
            code: `abstract class MineriaDatos {
    // El método plantilla: ES FINAL para que no lo cambien
    public final void minar(String path) {
        abrirArchivo(path);
        extraerDatos();
        parsearDatos(); // Este paso cambia según el formato
        cerrarArchivo();
    }
    
    // Pasos comunes
    void abrirArchivo(String p) { System.out.println("Abriendo " + p); }
    void extraerDatos() { System.out.println("Extrayendo bytes..."); }
    void cerrarArchivo() { System.out.println("Cerrando archivo."); }
    
    // Paso abstracto: Las subclases DEBEN implementarlo
    abstract void parsearDatos();
}

class PDFMiner extends MineriaDatos {
    @Override void parsearDatos() { System.out.println("Algoritmo para PDF"); }
}
class CSVMiner extends MineriaDatos {
    @Override void parsearDatos() { System.out.println("Algoritmo para CSV"); }
}`,
            syntaxDescription: "Receta de cocina. Los pasos generales (mezclar, hornear, servir) son fijos. Pero el paso 'Añadir ingrediente principal' varía: puede ser 'Añadir Pollo' o 'Añadir Tofu'. La estructura de la receta no cambia.",
            useCases: [
                {
                    title: "Procesamiento Homogéneo",
                    description: "Garantiza que siempre se abre y cierra el archivo, variando solo el proceso central.",
                    code: `MineriaDatos pdf = new PDFMiner();
pdf.minar("doc.pdf"); 
// Abre -> Extrae -> Algoritmo PDF -> Cierra

MineriaDatos csv = new CSVMiner();
csv.minar("data.csv");
// Abre -> Extrae -> Algoritmo CSV -> Cierra`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Hollywood Principle",
                    content: "'Don't call us, we'll call you'. La clase padre (Template) llama a tus métodos (hijos), no al revés. Tú solo rellenas los huecos.",
                    code: "super.template();"
                },
                {
                    type: "goodPractice",
                    title: "Frameworks",
                    content: "Casi todos los frameworks usan esto (ej. `React.Component` con `render()`, o `Android Activity` con `onCreate()`). Ellos controlan el flujo, tú pones la lógica.",
                    code: "void onCreate() { ... }"
                }
            ]
        },
        {
            id: "visitor",
            title: "Visitor",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Permite añadir nuevas operaciones a una estructura de objetos existente sin modificar dichas estructuras. Separa el algoritmo de los objetos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Cumple con Open/Closed. Si quieres exportar tus objetos a XML, JSON y YAML, no tienes que modificar las clases de tus objetos 3 veces. Creas 3 Visitors."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tienes una estructura de objetos estable (rara vez cambia) pero necesitas definir nuevas operaciones sobre ellos frecuentemente."
                }
            ],
            description: "Añade operaciones a una estructura sin modificarla.",
            code: `// Interfaz Elemento
interface ElementoGeografico {
    void aceptar(Visitor v);
}

// Elementos Concretos
class Ciudad implements ElementoGeografico {
    public void aceptar(Visitor v) { v.visit(this); }
}
class Pueblo implements ElementoGeografico {
    public void aceptar(Visitor v) { v.visit(this); }
}

// Interfaz Visitor
interface Visitor {
    void visit(Ciudad c);
    void visit(Pueblo p);
}

// Visitor Concreto: Exportar a XML
class XMLExportVisitor implements Visitor {
    public void visit(Ciudad c) { System.out.println("<ciudad>...</ciudad>"); }
    public void visit(Pueblo p) { System.out.println("<pueblo>...</pueblo>"); }
}`,
            syntaxDescription: "Un inspector de sanidad (Visitor) visitando diferentes restaurantes (Objetos). Los restaurantes no cambian su menú ni su personal para el inspector. Simplemente le dejan entrar (`aceptar()`), y el inspector hace su trabajo específico (verificar higiene). Mañana puede venir un inspector de incendios (otro Visitor) a hacer algo totalmente diferente.",
            useCases: [
                {
                    title: "Exportación de Datos",
                    description: "Añadir funcionalidad de exportación sin tocar las clases de datos.",
                    code: `List<ElementoGeografico> mapa = List.of(new Ciudad(), new Pueblo());
Visitor exportadorXML = new XMLExportVisitor();

for (ElementoGeografico lugar : mapa) {
    // Doble Dispatch: El lugar llama al método correcto del visitor
    lugar.aceptar(exportadorXML);
}
// Salida:
// <ciudad>...</ciudad>
// <pueblo>...</pueblo>`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Double Dispatch",
                    content: "El truco del Visitor: `elemento.aceptar(visitor)` -> `visitor.visitar(elemento)`. El método ejecutado depende de DOS tipos: el del elemento y el del visitor.",
                    code: "v.visit(this);"
                },
                {
                    type: "error",
                    title: "Estructuras Estables",
                    content: "Visitor es genial para añadir operaciones, pero terrible si cambias la jerarquía de clases (ej. añadir `PuebloFantasma`). Tendrías que actualizar todos los Visitors.",
                    code: "interface Visitor { ... }"
                }
            ]
        }
    ]
};
