export const pooCategory = {
    title: "3. Programación Orientada a Objetos",
    topics: [
        {
            id: "clases-objetos",
            title: "Clases y Objetos",
            videoUrl: "https://www.youtube.com/watch?v=VWzyq5ABZ28",
            content: [
                {
                    title: "¿Qué es?",
                    text: "La unidad fundamental de Java. Una `Class` es el plano o molde (abstracto). Un `Object` es el edificio o producto real creado a partir de ese plano (concreto). `new` es la orden de construcción."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite modelar el mundo real en código. Agrupa datos (estado) y acciones (comportamiento) en una sola entidad lógica."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre. En Java todo debe vivir dentro de una clase."
                }
            ],
            description: "Moldes (Clases) e Instancias (Objetos).",
            code: `public class Coche {
    String marca; // Atributo
    
    // Constructor
    public Coche(String marca) {
        this.marca = marca;
    }
    
    // Método
    void arrancar() {
        System.out.println(marca + " arrancando...");
    }
}`,
            syntaxDescription: "La Clase es como el molde de metal para galletas. El Objeto es la galleta horneada que te comes. Puedes hacer infinitas galletas (Objetos) con un solo molde (Clase), y si el molde tiene forma de estrella, todas las galletas serán estrellas.",
            useCases: [
                {
                    title: "Instanciación y Uso",
                    description: "Crear múltiples objetos independientes a partir de la misma clase.",
                    code: `public class Main {
    public static void main(String[] args) {
        Coche coche1 = new Coche("Toyota");
        Coche coche2 = new Coche("Ford");
        
        coche1.arrancar(); // Toyota arrancando...
        coche2.arrancar(); // Ford arrancando...
    }
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Blueprint vs House",
                    content: "No puedes vivir en un plano (Clase). Necesitas construir la casa (Objeto, `new`) para usarla. Puedes construir 100 casas iguales con el mismo plano.",
                    code: "Coche plano = new Coche(); // Construcción"
                },
                {
                    type: "error",
                    title: "Constructor Vacío",
                    content: "Si defines un constructor con parámetros (`Coche(String marca)`), Java deja de regalarte el constructor vacío por defecto. `new Coche()` dará error.",
                    code: "class Coche { Coche(String m) {} }\n// Coche c = new Coche(); // ❌ Constructor ausente"
                }
            ]
        },
        {
            id: "encapsulamiento",
            title: "Encapsulamiento",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es proteger los datos internos de un objeto (`private`) y obligar a usar métodos seguros (`public getters/setters`) para acceder a ellos. Es como poner una carcasa a un motor."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Evita que alguien ponga datos inválidos (ej. edad negativa) y permite cambiar la implementación interna sin romper el código de quien usa tu clase."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre. Haz tus atributos `private` por defecto. Solo expón lo estrictamente necesario."
                }
            ],
            description: "Control de acceso y protección de datos.",
            code: `public class Usuario {
    private String password; // Privado, inaccesible directamente
    
    public void setPassword(String pass) {
        if (pass.length() >= 6) {
            this.password = pass;
        } else {
            System.out.println("Contraseña muy corta");
        }
    }
}`,
            syntaxDescription: "Es como un banco. Tú no entras a la bóveda a agarrar tu dinero (acceso directo private). Vas a la ventanilla (método public) y le pides al cajero una cantidad. El cajero verifica si tienes saldo (validación) y te lo da. La bóveda está encapsulada.",
            useCases: [
                {
                    title: "JavaBean Standard",
                    description: "Patrón estándar de getters y setters usado en frameworks.",
                    code: `public class Producto {
    private double precio;

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        if (precio < 0) throw new IllegalArgumentException("Precio negativo");
        this.precio = precio;
    }
}`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Principio de Menor Privilegio",
                    content: "Haz TODO `private` por defecto. Solo haz `public` lo que realmente necesite ser visto desde fuera. Si dudas, déjalo privado.",
                    code: "private String secreto;\npublic void mostrar() { ... }"
                },
                {
                    type: "idea",
                    title: "Getters y Setters Inteligentes",
                    content: "Los setters no son solo para asignar valor. Son el lugar perfecto para validar datos (ej. impedir que la edad sea negativa) antes de guardarlos.",
                    code: "public void setEdad(int e) {\n    if (e > 0) this.edad = e;\n}"
                }
            ]
        },
        {
            id: "herencia",
            title: "Herencia",
            videoUrl: "https://www.youtube.com/watch?v=EEeuVZQpGGs",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Mecanismo donde una clase hija (`extends`) adquiere automáticamente las propiedades y métodos de un padre. Permite especializar el comportamiento."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Reutilización masiva de código. Si `Animal` ya tiene lógica para 'dormir', `Gato` y `Perro` no necesitan escribirla de nuevo."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Solo cuando exista una relación 'ES-UN' estricta. Un Gato ES UN Animal. Evítalo si solo quieres compartir código sin relación lógica (usa composición)."
                }
            ],
            description: "Extender funcionalidad y reutilizar código.",
            code: `class Animal {
    void sonido() { System.out.println("Hacer ruido"); }
}

class Gato extends Animal {
    @Override // Buena práctica indicar sobreescritura
    void sonido() { 
        System.out.println("Miau"); 
    }
}`,
            syntaxDescription: "Es genética pura. Si tu padre tiene ojos azules (método en clase Padre), tú naces con ojos azules automáticamente. Pero puedes decidir usar lentes de contacto (Sobreescritura/Override) para cambiar cómo se ven tus ojos, manteniendo el resto de tu ADN igual.",
            useCases: [
                {
                    title: "Llamada a Constructor Padre",
                    description: "Inicializar estado heredado usando super.",
                    code: `class Empleado {
    String nombre;
    Empleado(String n) { this.nombre = n; }
}

class Gerente extends Empleado {
    String departamento;
    
    Gerente(String nombre, String depto) {
        super(nombre); // Llama al constructor de Empleado
        this.departamento = depto;
    }
}`
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Favor Composición sobre Herencia",
                    content: "La herencia es rígida (se rompe fácil si cambias el padre). A menudo es mejor que `Coche` *tenga* un `Motor` (campo privado) en vez de que `Coche` *sea* un `Motor`.",
                    code: "class Coche {\n    private Motor motor; // Composición\n}"
                },
                {
                    type: "error",
                    title: "Herencia Múltiple",
                    content: "Java NO soporta herencia múltiple de clases (`extends A, B`). Esto evita el 'Problema del Diamante'. Si necesitas comportamientos múltiples, usa Interfaces.",
                    code: "// class Hija extends Papa, Mama { } // ❌ Imposible"
                }
            ]
        },
        {
            id: "polimorfismo",
            title: "Polimorfismo",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Capacidad de tratar objetos de diferentes clases de forma uniforme. Puedes llamar al método `sonido()` en una lista de animales, y cada uno hará su propio sonido (guau, miau) sin que sepas qué animal es."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Hace el sistema flexible y extensible. Puedes agregar nuevos tipos de Animales en el futuro y el código viejo que recorre la lista seguirá funcionando sin cambios."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando quieras escribir algoritmos genéricos que funcionen con familias de objetos (ej. procesar pagos de Visa, MasterCard y PayPal usando una interfaz común)."
                }
            ],
            description: "Flexibilidad de tipos en tiempo de ejecución.",
            code: `Animal miMascota = new Perro(); // Referencia Animal, Objeto Perro
miMascota.sonido(); // Ejecuta "Guau" (versión de Perro)

miMascota = new Gato();
miMascota.sonido(); // Ejecuta "Miau" (versión de Gato)`,
            syntaxDescription: "Es como el control remoto universal. El botón 'Apagar' (método común) envía la señal. Si apuntas a la TV, la TV se apaga. Si apuntas al aire acondicionado, se apaga. El control no sabe qué aparato es, solo manda la orden y el aparato reacciona a su manera.",
            useCases: [
                {
                    title: "Colecciones Polimórficas",
                    description: "Procesar una lista de objetos heterogéneos de manera uniforme.",
                    code: `List<Animal> zoologico = new ArrayList<>();
zoologico.add(new Perro());
zoologico.add(new Gato());

for (Animal a : zoologico) {
    a.sonido(); // Funciona para perro y gato indistintamente
}`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Programar contra Interfaces",
                    content: "Usa el tipo más genérico posible en tus variables. `List<Animal> lista` es mejor que `ArrayList<Perro> lista`. Así puedes cambiar la implementación después sin dolor.",
                    code: "// ✅ Flexible\nAnimal a = new Perro();\n// ❌ Rígido\nPerro p = new Perro();"
                },
                {
                    type: "goodPractice",
                    title: "Casting Seguro",
                    content: "Si tienes que recuperar el tipo original, valida primero con `instanceof`.",
                    code: "if (animal instanceof Perro) {\n    ((Perro) animal).ladrar();\n}"
                }
            ]
        },
        {
            id: "clases-abstractas",
            title: "Clases Abstractas",
            videoUrl: "https://www.youtube.com/watch?v=yja9ZhrfGyg",
            playlistUrls: [
                "https://www.youtube.com/watch?v=Kx2WCz_b0KA",
                "https://www.youtube.com/watch?v=lSiS4_hI3ZM",
                "https://www.youtube.com/watch?v=eax7mXjq620"
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una clase incompleta (`abstract`) que no se puede instanciar (no puedes hacer `new`). Sirve de base para otras clases, definiendo métodos que *deben* existir pero no necesariamente *cómo* funcionan."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Fuerza un diseño estricto. Garantiza que todas las subclases implementen cierta lógica crítica, mientras comparte código común."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tienes una base común con implementación parcial. Ej: `Vehiculo` tiene lógica de combustible (común), pero `moverse` es abstracto (el avión vuela, el auto rueda)."
                }
            ],
            description: "Plantillas base que no se pueden instanciar.",
            code: `abstract class Vehiculo {
    String marca;
    
    // Método concreto (heredado tal cual)
    void encender() { System.out.println("Encendido"); }
    
    // Método abstracto (debe ser implementado)
    abstract void moverse();
}`,
            syntaxDescription: "Es como un plano de arquitectura incompleto para 'Edificio'. Dice 'Aquí va la puerta' y 'Aquí van las ventanas', pero deja un espacio en blanco donde dice 'Diseño del Techo'. No puedes construir esa casa incompleta. Debes crear un plano nuevo (Subclase) que rellene el detalle del techo para poder construir.",
            useCases: [
                {
                    title: "Implementación Concreta",
                    description: "Subclases completando la lógica faltante.",
                    code: `class Avion extends Vehiculo {
    @Override
    void moverse() {
        System.out.println("Volando por el aire");
    }
}

class Barco extends Vehiculo {
    @Override
    void moverse() {
        System.out.println("Navegando el mar");
    }
}`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Instanciar Abstractas",
                    content: "Es imposible hacer `new Vehiculo()` si `Vehiculo` es abstracta. El compilador te protegerá, pero entender *por qué* es clave: el objeto estaría incompleto.",
                    code: "// Vehiculo v = new Vehiculo(); // ❌ Error"
                },
                {
                    type: "idea",
                    title: "Clase vs Abstracta",
                    content: "Usa clases abstractas cuando quieras compartir CÓDIGO (métodos con cuerpo) entre clases relacionadas. Usa interfaces si solo quieres compartir FIRMAS (nombres de métodos).",
                    code: "abstract class Base { void log() { ... } }"
                }
            ]
        },
        {
            id: "interfaces",
            title: "Interfaces",
            videoUrl: "https://www.youtube.com/watch?v=vCpptqm1KOk",
            playlistUrls: [
                "https://www.youtube.com/watch?v=3tT51KwqcwU",
                "https://www.youtube.com/watch?v=EAxyN6MJKU8",
                "https://www.youtube.com/watch?v=dnxFP-SwP44"
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un contrato puro. Solo define NOMBRES de métodos, sin cuerpo (casi siempre). Una clase que implementa una interfaz *promete* cumplir ese contrato."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Desacopla tu código. Te permite decir 'Necesito algo que Vuele', sin importar si es un Pájaro, un Avión o Superman."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Para definir capacidades (Runnable, Serializable, Comparable) o cuando quieras permitir múltiples comportamientos en una clase (Java permite implementar múltiples interfaces)."
                }
            ],
            description: "Contratos de comportamiento y herencia múltiple.",
            code: `interface Reproductor {
    void play();
    void stop();
    
    // Método default (opcional sobreescribir)
    default void reset() {
        stop();
        System.out.println("Reseteado");
    }
}`,
            syntaxDescription: "Es como la descripción de un puesto de trabajo. 'Se busca Chofer: debe saber conducir y tener licencia'. No importa si eres alto, bajo, rubio o moreno (clase), mientras cumplas los requisitos del puesto (interfaz), obtienes el trabajo.",
            useCases: [
                {
                    title: "Implementación Múltiple",
                    description: "Una clase puede adoptar múltiples roles.",
                    code: `class SmartPhone implements Reproductor, Navegador {
    public void play() { /* logica musica */ }
    public void stop() { /* logica stop */ }
    public void navegar() { /* logica web */ }
}

Reproductor ipod = new SmartPhone();
ipod.play(); // Solo ve métodos de Reproductor`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Múltiples Interfaces",
                    content: "Una clase puede implementar N interfaces. Es la forma de darle superpoderes mixtos a un objeto: `implements Volador, Nadador, Cantante`.",
                    code: "class Pato implements Nadador, Volador { ... }"
                },
                {
                    type: "goodPractice",
                    title: "Nombres de Interfaces",
                    content: "Suelen ser adjetivos (`Runnable`, `Serializable`, `Comparable`) o sustantivos que describen una capacidad (`List`, `Map`).",
                    code: "interface Volable { void volar(); }"
                }
            ]
        },
        {
            id: "enums",
            title: "Enumeraciones",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Un tipo especial para listas fijas de constantes. No puede ser instanciado libremente, solo pueden usarse los valores predefinidos."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Seguridad total. Evita 'Magic Strings' o números mágicos. Si una función espera un `DiaSemana`, es imposible pasarle 'JuevesFalso' o 99."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Días de la semana, Estados de un pedido (PENDIENTE, ENVIADO), Colores de un semáforo, Palos de una baraja."
                }
            ],
            description: "Conjuntos fijos de constantes con superpoderes.",
            code: `public enum Talla {
    PEQUEÑO("S"), MEDIANO("M"), GRANDE("L");
    
    private String abreviatura;
    
    // Constructor (siempre privado)
    Talla(String s) { this.abreviatura = s; }
    
    public String getAbreviatura() { return abreviatura; }
}`,
            syntaxDescription: "Es como el menú de un restaurante de comida rápida. No puedes pedir 'Langosta' si el menú solo tiene 'Hamburguesa' y 'Papas'. El enum restringe las opciones a una lista cerrada y segura.",
            useCases: [
                {
                    title: "Uso en Switch y Lógica",
                    description: "Control de flujo seguro con enums.",
                    code: `Talla miTalla = Talla.MEDIANO;

if (miTalla == Talla.GRANDE) {
    System.out.println("Es grande");
}

System.out.println(miTalla.getAbreviatura()); // Imprime "M"`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Enums son Clases",
                    content: "En Java, los Enums son poderosos. Pueden tener constructores, métodos y campos. No son simples enteros como en C.",
                    code: "Talla.GRANDE.getAbreviatura();"
                },
                {
                    type: "goodPractice",
                    title: "Uso en Switch",
                    content: "Los Enums son los mejores amigos del `switch`. El compilador puede avisarte si te falta cubrir algún caso (especialmente con switch expressions).",
                    code: "switch(talla) {\n    case CHICA -> ...\n}"
                }
            ]
        },
        {
            id: "records",
            title: "Records",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Clases de solo datos, inmutables y concisas. Escribes una línea `record Persona(String nombre) {}` y Java genera constructor, getters, equals, hashCode y toString automáticamente."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Adiós al boilerplate y código basura. Simplifica enormemente la creación de DTOs (Data Transfer Objects)."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Siempre que necesites un objeto simple que solo transporte datos y no vaya a cambiar (inmutable)."
                }
            ],
            description: "Clases de datos inmutables sin boilerplate.",
            code: `// Define todo: constructor, getters, equals, toString
public record Punto(int x, int y) {}

// Uso
Punto p = new Punto(10, 20);
System.out.println(p.x()); // getter sin get
System.out.println(p);     // Punto[x=10, y=20]`,
            syntaxDescription: "Es como imprimir una tarjeta de identificación laminada. Una vez impresa (instanciada), no puedes borrar el nombre ni cambiar la foto (inmutable). Es rápido de hacer y sirve perfectamente para identificar a alguien sin complicaciones.",
            useCases: [
                {
                    title: "Constructor Compacto (Validación)",
                    description: "Validar datos antes de crear el record.",
                    code: `public record Rango(int inicio, int fin) {
    public Rango {
        if (fin < inicio) {
            throw new IllegalArgumentException("Fin debe ser mayor a inicio");
        }
    }
}`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Inmutabilidad Estricta",
                    content: "No puedes cambiar los campos de un Record (`p.x = 5` ❌). Son `final` por diseño. Si quieres cambiar algo, debes crear un *nuevo* record con el dato modificado.",
                    code: "// p.nombre = \"Ana\"; // ❌\nvar p2 = new Persona(\"Ana\"); // ✅"
                },
                {
                    type: "recommendation",
                    title: "DTOs y JSON",
                    content: "Los Records son perfectos para mapear respuestas JSON de APIs. Librerías como Jackson los soportan nativamente.",
                    code: "public record UserDTO(Long id, String login) {}"
                }
            ]
        },
        {
            id: "sealed-classes",
            title: "Sealed Classes",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Clases que saben exactamente quiénes son sus hijos. Usan `permits` para hacer una lista VIP de subclases permitidas. Nadie más puede heredar de ellas."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Permite modelar dominios cerrados (ej. Resultado = Exito o Error, nada más). El compilador puede avisarte si olvidas manejar un caso en un `switch`."
                },
                {
                    title: "¿Cuándo usarlo?",
                    text: "Cuando tienes una jerarquía fija conocida de antemano (figuras en un juego, estados de una transacción)."
                }
            ],
            description: "Jerarquías de herencia restringidas.",
            code: `public sealed class Resultado permits Exito, Error {}

public final class Exito extends Resultado {
    String datos;
}
public final class Error extends Resultado {
    String mensaje;
}`,
            syntaxDescription: "Es una fiesta privada con lista de invitados estricta. El cadenero (Compiler) tiene la lista (`permits`). Si no estás en la lista, no entras (no puedes extender la clase). Esto asegura que dentro de la fiesta solo haya gente conocida.",
            useCases: [
                {
                    title: "Exhaustividad en Switch",
                    description: "Manejar todos los tipos posibles sin default.",
                    code: `Resultado res = obtenerResultado();

String mensaje = switch(res) {
    case Exito e -> "Datos: " + e.datos;
    case Error err -> "Fallo: " + err.mensaje;
    // No hace falta default, el compilador sabe que no hay más tipos
};`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Lista VIP",
                    content: "Las Sealed Classes conocen a todos sus hijos. Esto permite al compilador saber si un `switch` cubre todas las posibilidades, haciendo innecesario el bloque `default`.",
                    code: "sealed class Form permits Circulo, Cuadrado {}"
                },
                {
                    type: "goodPractice",
                    title: "Permits",
                    content: "Usa `permits` explícitamente si las subclases están en archivos diferentes. Si están en el mismo archivo, puedes omitirlo.",
                    code: "permits Hijo1, Hijo2"
                }
            ]
        },
        {
            id: "clases-anidadas",
            title: "Clases Anidadas",
            videoUrl: "https://www.youtube.com/watch?v=KzcWrFv8DHA",
            playlistUrls: [
                "https://www.youtube.com/watch?v=yfx_MGivfY4",
                "https://www.youtube.com/watch?v=Q1PATTmO28g"
            ],
            content: [
                {
                    title: "¿Qué es?",
                    text: "Una clase definida dentro de otra clase. Java permite agrupar clases que solo se usan en un lugar, mejorando el encapsulamiento."
                },
                {
                    title: "Tipos de Clases Anidadas",
                    text: "1. **Estáticas**: Funcionan como clases normales pero agrupadas.\n2. **No estáticas (Inner)**: Tienen acceso a los miembros de la clase externa.\n3. **Locales**: Definidas dentro de un método.\n4. **Anónimas**: Clases sin nombre creadas al vuelo."
                }
            ],
            description: "Agrupamiento lógico de clases.",
            code: `class Externa {
    class Interna {
        void mostrar() { System.out.println("Soy interna"); }
    }
}

Externa ext = new Externa();
Externa.Interna in = ext.new Interna();`,
            syntaxDescription: "Es como una muñeca rusa (Matrioshka). Tienes una clase grande que contiene a otra más pequeña. La pequeña solo tiene sentido si está dentro de la grande, y ayuda a mantener el diseño ordenado protegiendo lógica que nadie más necesita ver.",
            useCases: [
                {
                    title: "Escuchadores de Eventos",
                    description: "Uso de clases anónimas para manejar clics o acciones.",
                    code: `boton.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Click!");
    }
});`
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Clases Estáticas",
                    content: "Si la clase interna no necesita acceder a los campos de la externa, hazla `static`. Ahorra memoria y es más limpio.",
                    code: "static class InternaStatic { ... }"
                }
            ]
        }
    ]
};
