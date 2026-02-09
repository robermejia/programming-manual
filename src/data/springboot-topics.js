import { vocabularyCategory } from './springboot-categories/vocabulary';
import { flashcardsCategory } from './springboot-categories/flashcards';

export const categories = [
    vocabularyCategory,
    {
        title: "1. Fundamentos y Configuración",
        topics: [
            {
                id: "sb-pom-config",
                title: "Configuración Inicial (pom.xml)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es el archivo de configuración de Maven (Project Object Model) donde se definen la versión de Spring Boot, las dependencias necesarias y los plugins de construcción."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "El `spring-boot-starter-parent` gestiona las versiones de todas las librerías compatibles, evitando conflictos de versiones y simplificando enormemente el mantenimiento del proyecto."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el 'infierno de dependencias' (dependency hell). Ya no necesitas buscar qué versión de Hibernate es compatible con qué versión de Spring; el parent lo decide por ti."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene usarlo en todo proyecto Java profesional que requiera gestión de librerías. No conviene si estás haciendo un script de un solo archivo (aunque incluso ahí se puede usar con Spring CLI)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Fundamentos básicos de Maven y XML."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Versiones Limpias",
                        content: "No especifiques versiones para las dependencias que ya maneja Spring Boot. Deja que el `parent` decida la versión óptima.",
                        code: "<!-- No pongas <version> aquí si el parent ya lo maneja -->\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n</dependency>"
                    }
                ],
                description: "Gestión de dependencias y configuración centralizada con Maven.",
                syntaxDescription: "Estructura base del archivo pom.xml para Spring Boot.",
                code: `<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version> <!-- O 4.x cuando esté disponible -->
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>`,
                useCases: [
                    {
                        title: "Configuración de Multi-Ambiente",
                        description: "Definir un proyecto que hereda de Spring Boot Starter Parent para heredar la gestión de versiones de dependencias críticas como Hibernate, Jackson y Spring Security sin declararlas manualmente.",
                        code: `<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
</dependencies>`
                    }
                ]
            },
            {
                id: "sb-main-class",
                title: "Clase Principal (@SpringBootApplication)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es el punto de entrada de la aplicación. La anotación `@SpringBootApplication` activa la autoconfiguración, el escaneo de componentes y permite iniciar el servidor embebido."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Centraliza la configuración en una sola línea. Combina `@Configuration`, `@EnableAutoConfiguration` y `@ComponentScan`."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina la necesidad de archivos de configuración XML externos o múltiples clases de configuración manual para arrancar el contexto de Spring."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Es obligatorio en toda aplicación Spring Boot. Es la pieza que orquesta todo el arranque."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos básicos de Java (método main) y anotaciones."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Ubicación",
                        content: "Coloca siempre la clase principal en el paquete raíz de tu aplicación para que el `@ComponentScan` encuentre todos tus componentes automáticamente.",
                        code: "package com.example.proyectobase;\n\n@SpringBootApplication\npublic class App { ... }"
                    }
                ],
                description: "Punto de partida y corazón del arranque de la aplicación.",
                syntaxDescription: "Estructura mínima de la clase Application.",
                code: `@SpringBootApplication
public class MiAplicacion {
    public static void main(String[] args) {
        SpringApplication.run(MiAplicacion.class, args);
    }
}`,
                useCases: [
                    {
                        title: "Inicialización de Datos al Arrancar",
                        description: "Usar un CommandLineRunner dentro de la clase principal para precargar la base de datos con un usuario administrador apenas se inicie la aplicación.",
                        code: `@Bean
CommandLineRunner init(UserRepository repo) {
    return args -> {
        repo.save(new User("admin", "admin@mail.com"));
        System.out.println("Base de datos inicializada");
    };
}`
                    }
                ]
            },
            {
                id: "sb-config-ext",
                title: "Configuración Externa (application.yml)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Son archivos (properties o yml) donde se definen parámetros que pueden cambiar sin necesidad de recompilar el código, como credenciales de BD o puertos."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Permite seguir el principio de 'External Configuration', facilitando que la misma aplicación corra en distintos entornos simplemente cambiando el archivo de configuración."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita tener valores 'hardcoded' (escritos directamente en el código), lo cual es una mala práctica de seguridad y flexibilidad."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Siempre. Incluso para configuraciones mínimas, es mejor tenerlas fuera del código Java."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Sintaxis YAML o Properties."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "YAML vs Properties",
                        content: "Usa YAML si prefieres una estructura jerárquica más legible para ojos humanos. Spring Boot soporta ambos por igual.",
                        code: "server:\n  port: 8081 # Más jerárquico y limpio que server.port=8081"
                    }
                ],
                description: "Personalización del comportamiento de la app sin tocar el código.",
                syntaxDescription: "Ejemplo de configuración jerárquica en YAML.",
                code: `spring:
  datasource:
    url: jdbc:mysql://localhost:3306/midb
    username: root
    password: secret
  jpa:
    hibernate:
      ddl-auto: update

server:
  port: 8080`,
                useCases: [
                    {
                        title: "Seguridad de Credenciales con Variables de Entorno",
                        description: "Configurar la conexión a la base de datos usando marcadores de posición que toman el valor de las variables del sistema, evitando exponer claves en el código.",
                        code: `spring:
  datasource:
    url: \${DB_URL:jdbc:mysql://localhost:3306/test}
    username: \${DB_USER:root}
    password: \${DB_PASS:secret}`
                    }
                ]
            },
            {
                id: "sb-profiles",
                title: "Perfiles (Profiles)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un modo de agrupar configuraciones y componentes para que solo se activen en ciertos entornos (desarrollo, pruebas, producción)."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Permite que la aplicación se comporte de forma diferente según donde esté corriendo. Por ejemplo, usar una BD en memoria en local y una real en la nube."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita el riesgo de conectarse accidentalmente a la base de datos de producción desde una máquina local de desarrollo."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Indispensable en proyectos que pasan por etapas de QA y Producción."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Configuración externa (yml/properties)."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Activación",
                        content: "Puedes activar un perfil desde la línea de comandos sin tocar ningún archivo.",
                        code: "java -jar app.jar --spring.profiles.active=prod"
                    }
                ],
                description: "Gestión de entornos dinámicos para despliegues seguros.",
                syntaxDescription: "Uso de la anotación @Profile y configuración por archivo.",
                code: `@Configuration
@Profile("dev")
public class DevConfig {
    // Solo se carga si el perfil activo es 'dev'
}

# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb`,
                useCases: [
                    {
                        title: "Simulación de Servicios Externos (Mocks)",
                        description: "Crear una implementación de un servicio de envío de correos que solo imprima en consola en el perfil 'dev', pero que use una API real en el perfil 'prod'.",
                        code: `@Service
@Profile("dev")
public class MockEmailService implements EmailService {
    public void send(String msg) { 
        System.out.println("SIMULACIÓN de envío: " + msg); 
    }
}`
                    }
                ]
            },
            {
                id: "sb-logging",
                title: "Logging",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es el sistema que registra lo que sucede en la aplicación (info, advertencias, errores) en la consola o en archivos de texto."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot viene configurado por defecto con SLF4J y Logback, proporcionando un sistema robusto sin configuración inicial necesaria."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Proporciona visibilidad sobre lo que pasa 'dentro' de la app, facilitando el diagnóstico de errores que no son visibles en la interfaz de usuario."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Siempre debes usar logging en lugar de 'System.out.println', ya que los logs se pueden filtrar, guardar en archivos y rotar según el tamaño."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos básicos de flujos de salida de consola."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Niveles de Log",
                        content: "Usa `INFO` para eventos normales, `DEBUG` para detalles de desarrollo y `ERROR` para fallos críticos. No ensucies la consola con demasiada info en producción.",
                        code: "logging.level.root=INFO\nlogging.level.com.miapp=DEBUG"
                    }
                ],
                description: "Rastreo y diagnóstico de eventos en tiempo real.",
                syntaxDescription: "Uso de Logger en clases Java.",
                code: `private static final Logger logger = LoggerFactory.getLogger(MiClase.class);

public void hacerAlgo() {
    logger.info("Iniciando proceso...");
    try {
        // lógica
    } catch (Exception e) {
        logger.error("Error fatal: {}", e.getMessage());
    }
}`,
                useCases: [
                    {
                        title: "Rastreo de Transacciones en Producción",
                        description: "Implementar logs detallados que incluyan el ID de la transacción para poder rastrear qué pasó exactamente cuando un cliente reporta un fallo en un pago.",
                        code: `public void procesarPago(Long id) {
    logger.info("Iniciando pago para transacción: {}", id);
    try {
        paymentService.pay(id);
        logger.info("Pago completado con éxito para: {}", id);
    } catch (Exception e) {
        logger.error("Fallo crítico en el pago de la trans: {}. Error: {}", id, e.getMessage());
    }
}`
                    }
                ]
            }
        ]
    },
    {
        title: "2. Desarrollo API REST y Web",
        topics: [
            {
                id: "sb-rest-controllers",
                title: "Controladores REST",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Son clases anotadas con `@RestController` que gestionan las peticiones HTTP entrantes y devuelven datos (usualmente JSON) directamente al cliente."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Es la pieza que conecta la web con tu lógica de negocio. Spring Web facilita enormemente esta capa al automatizar la conversión de objetos Java a JSON."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Permite construir APIs (Application Programming Interfaces) para que aplicaciones frontend, móviles o de terceros puedan comunicarse con tu servidor."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene siempre que necesites exponer datos a través de peticiones HTTP. No conviene si solo necesitas ejecutar procesos internos sin interfaz externa."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de protocolo HTTP (Verbos y Códigos de Estado)."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Verbos Correctos",
                        content: "Usa `@GetMapping` para leer, `@PostMapping` para crear, `@PutMapping` para actualizar y `@DeleteMapping` para borrar. Respeta el estándar REST.",
                        code: "@GetMapping(\"/{id}\")\npublic Usuario obtener(@PathVariable Long id) { ... }"
                    }
                ],
                description: "Creación de endpoints HTTP para comunicación con clientes.",
                syntaxDescription: "Uso de anotaciones REST en una clase controladora.",
                code: `@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    @GetMapping
    public List<Usuario> obtenerTodos() { ... }
    
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) { ... }
}`,
                useCases: [
                    {
                        title: "Gestión de Recursos Relacionados (Ventas)",
                        description: "Exponer una ruta que permita obtener todas las facturas de un usuario específico usando una variable de ruta limpia.",
                        code: `@GetMapping("/{id}/facturas")
public List<Factura> getFacturas(@PathVariable Long id) {
    return facturaService.listarPorUsuario(id);
}`
                    }
                ]
            },
            {
                id: "sb-dtos-mappers",
                title: "DTOs y Mappers",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Los DTO (Data Transfer Objects) son objetos que solo tienen los datos que queremos enviar al cliente, protegiendo nuestra base de datos interna."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Evita que 'fuguemos' información sensible (como contraseñas) o que el cliente envíe datos que no debe modificar. Los Mappers automatizan la conversión entre Entidades y DTOs."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Desacopla el modelo interno de la base de datos de la respuesta que ve el usuario final, mejorando la seguridad y la flexibilidad."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Indispensable en aplicaciones profesionales. Solo podrías saltártelos en prototipos muy pequeños o internos."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "POO básica y Entidades JPA."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Java Records",
                        content: "En versiones modernas de Spring Boot, usa 'Java Records' para tus DTOs; son inmutables, breves y perfectos para transferir datos.",
                        code: "public record UsuarioDTO(Long id, String nombre) {}"
                    }
                ],
                description: "Objetos de transferencia y conversión segura de datos.",
                syntaxDescription: "Uso de Records como DTOs en Spring Boot.",
                code: `public record UsuarioDTO(Long id, String nombre, String email) {}

@Component
public class UsuarioMapper {
    public UsuarioDTO toDTO(Usuario usuario) {
        return new UsuarioDTO(usuario.getId(), usuario.getNombre(), usuario.getEmail());
    }
}`,
                useCases: [
                    {
                        title: "Protección de Datos Sensibles en Login",
                        description: "Al responder un login exitoso, transformar la entidad 'Usuario' a un 'AuthResponseDTO' que solo contenga el token y el nombre, excluyendo el password.",
                        code: `public record AuthResponseDTO(String token, String username) {}

// En el controlador
return new AuthResponseDTO(token, user.getUsername());`
                    }
                ]
            },
            {
                id: "sb-validation",
                title: "Validación (Bean Validation)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un sistema que usa anotaciones para asegurar que los datos que entran a nuestra aplicación cumplen con ciertas reglas antes de procesarlos."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring se integra con 'Hibernate Validator' para que con solo poner `@Valid`, la aplicación rechace automáticamente datos incorrectos con un error 400."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que guardemos basura en nuestra base de datos (como correos mal escritos o nombres vacíos) y previene errores inesperados en el código."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Siempre que tu app reciba datos del exterior. Es la primera línea de defensa de la calidad de datos."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Anotaciones en Java."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Mensajes Claros",
                        content: "Personaliza los mensajes de error para que el frontend sepa exactamente qué hizo mal el usuario.",
                        code: "@NotBlank(message = \"El nombre no puede estar vacío\")\nprivate String nombre;"
                    }
                ],
                description: "Verificación automática de reglas de negocio en los datos de entrada.",
                syntaxDescription: "Anotaciones de validación en atributos y controladores.",
                code: `public class Usuario {
    @NotNull @Size(min = 3)
    private String nombre;
    
    @Email
    private String email;
}

@PostMapping
public void crear(@Valid @RequestBody Usuario u) { ... }`,
                useCases: [
                    {
                        title: "Validación de Formulario de Registro",
                        description: "Asegurar que un nuevo usuario ingrese un apodo de al menos 4 letras y un correo con formato válido antes de procesar el registro.",
                        code: `public class RegistroDTO {
    @NotBlank @Size(min = 4)
    private String nickname;
    @Email @NotBlank
    private String email;
}`
                    }
                ]
            },
            {
                id: "sb-exceptions",
                title: "Manejo de Excepciones (@RestControllerAdvice)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un componente global que 'atrapa' los errores que ocurren en cualquier parte de la aplicación y los formatea como respuestas JSON bonitas."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Evita que el usuario final vea una pantalla de error técnica (como un Stack Trace) que es fea y poco segura."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Centraliza la lógica de errores. En lugar de poner bloques 'try-catch' en cada controlador, lo manejas todo en un solo lugar."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Imprescindible en APIs profesionales para enviar respuestas de error consistentes (404, 500, etc.)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Excepciones en Java y Códigos HTTP."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Personalización",
                        content: "Crea una clase propia para respuestas de error que incluya timestamp y un código de error específico.",
                        code: "public record ErrorAPI(String message, int status, long timestamp) {}"
                    }
                ],
                description: "Centralización y embellecimiento de respuestas de error.",
                syntaxDescription: "Uso de RestControllerAdvice para interceptar excepciones.",
                code: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(404, ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}`,
                useCases: [
                    {
                        title: "Manejo de Errores en APIs Bancarias",
                        description: "Interceptar excepciones de 'Fondos Insuficientes' para devolver un JSON con un código de error de negocio (ej: ERR-001) y no un 500 genérico.",
                        code: `@ExceptionHandler(SaldoInsuficienteException.class)
public ResponseEntity<ErrorDTO> manejarSaldo(SaldoInsuficienteException ex) {
    return ResponseEntity.status(400).body(new ErrorDTO("ERR-001", ex.getMessage()));
}`
                    }
                ]
            },
            {
                id: "sb-cors",
                title: "CORS",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad de los navegadores que bloquea peticiones si el frontend y el backend están en dominios distintos."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "En desarrollos modernos (React/Angular + Spring), casi siempre se necesita habilitar el acceso para que el frontend pueda consumir la API."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Permite que aplicaciones en diferentes dominios (ej. localhost:3000 y api.miapp.com) se comuniquen de forma segura y autorizada."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Necesario si tu frontend vive fuera del proyecto de Spring. No es necesario si sirves el HTML desde el mismo servidor de Spring."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de dominios y seguridad web básica."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "No uses asterisco (*)",
                        content: "Nunca pongas allowedOrigins(\"*\") en producción. Especifica siempre el dominio exacto de tu frontend por seguridad.",
                        code: "registry.addMapping(\"/**\").allowedOrigins(\"https://miweb.com\");"
                    }
                ],
                description: "Configuración de permisos de acceso entre diferentes dominios.",
                syntaxDescription: "Configuración global de CORS mediante WebMvcConfigurer.",
                code: `@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}`,
                useCases: [
                    {
                        title: "Frontend React en Desarrollo",
                        description: "Permitir que una aplicación React que corre en el puerto 5173 (Vite) pueda consumir la API de Spring que corre en el puerto 8080 sin ser bloqueada.",
                        code: `registry.addMapping("/**")
        .allowedOrigins("http://localhost:5173")
        .allowedMethods("GET", "POST", "PUT", "DELETE");`
                    }
                ]
            },
            {
                id: "sb-pagination",
                title: "Paginación y Ordenamiento",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es la técnica de dividir una lista larga de resultados en pequeños fragmentos (páginas) para no saturar la memoria ni la red."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Data JPA lo hace extremadamente sencillo integrando `Pageable` y `Sort` directamente en los métodos del repositorio."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Maneja el rendimiento. Cargar un millón de usuarios de golpe tumbaría tu servidor; cargarlos de 10 en 10 es eficiente."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Obligatorio en cualquier tabla o búsqueda que pueda devolver más de 50 o 100 resultados."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Repositorios básicos."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Valores por Defecto",
                        content: "Usa `@RequestParam(defaultValue = \"...\")` para que tu API funcione incluso si el cliente no envía el número de página.",
                        code: "@RequestParam(defaultValue = \"0\") int page"
                    }
                ],
                description: "Gestión eficiente de grandes colecciones de datos.",
                syntaxDescription: "Uso de PageRequest y Pageable en controladores.",
                code: `@GetMapping
public Page<Usuario> listar(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {
    
    Pageable pageable = PageRequest.of(page, size);
    return usuarioRepository.findAll(pageable);
}`,
                useCases: [
                    {
                        title: "Búsqueda de Productos con Orden Dinámico",
                        description: "Implementar una lista de productos donde el usuario pueda elegir si quiere ver los más baratos primero o los más nuevos.",
                        code: `@GetMapping
public Page<Producto> getProductos(Pageable pageable) {
    // El cliente envía ?page=0&size=10&sort=precio,desc
    return repo.findAll(pageable);
}`
                    }
                ]
            },
            {
                id: "sb-files",
                title: "File Upload/Download",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es la capacidad de recibir archivos (imágenes, documentos) del cliente y guardarlos, o servir archivos del servidor para que el cliente los descargue."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot maneja el tipo de contenido 'multipart/form-data' de forma nativa, facilitando la captura de archivos mediante `@RequestParam MultipartFile`."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Permite que los usuarios suban fotos de perfil, adjunten comprobantes o descarguen facturas en PDF generadas por el sistema."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Necesario en apps que manejan documentos. Cuidado: para archivos muy grandes o sistemas masivos, considera usar servicios de terceros como S3 (AWS)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Manejo básico de rutas y archivos en Java (java.nio)."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "Tamaño Límite",
                        content: "Spring Boot limita el tamaño de los archivos por defecto (generalmente 1MB o 2MB). Debes aumentarlo en tu application.properties si subes imágenes pesadas.",
                        code: "spring.servlet.multipart.max-file-size=5MB"
                    }
                ],
                description: "Gestión de carga y descarga de archivos binarios.",
                syntaxDescription: "Uso de MultipartFile para subida y Resource para descarga.",
                code: `@PostMapping("/upload")
public String upload(@RequestParam("file") MultipartFile file) {
    Files.copy(file.getInputStream(), Paths.get("uploads/" + file.getOriginalFilename()));
    return "Subido correctamente";
}`,
                useCases: [
                    {
                        title: "Subida de Comprobante de Pago",
                        description: "Recibir una imagen de transferencia bancaria, guardarla en el disco del servidor con un nombre único y devolver la URL de acceso.",
                        code: `public String salvarArchivo(MultipartFile file) {
    String name = UUID.randomUUID().toString() + ".png";
    Files.copy(file.getInputStream(), root.resolve(name));
    return "/files/" + name;
}`
                    }
                ]
            },
            {
                id: "sb-openapi",
                title: "Documentación OpenAPI (Swagger)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una herramienta que genera automáticamente un portal interactivo para que otros desarrolladores vean y prueben tu API sin usar Postman o código extra."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "La librería `springdoc-openapi` lee tus anotaciones de Spring y crea una documentación viva que siempre está actualizada con tu código."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina la necesidad de escribir manuales de API. Facilita la comunicación entre el equipo de backend y el de frontend."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Altamente recomendado en cualquier API profesional. Es una de las mejores herramientas de productividad para un equipo."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos básicos de APIs REST."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Anotaciones Útiles",
                        content: "Usa `@Tag` para agrupar tus controladores y `@Operation` para explicar qué hace exactamente cada endpoint.",
                        code: "@Tag(name = \"Ventas\", description = \"Gestión de facturas\")"
                    }
                ],
                description: "Portal interactivo autogenerado para probar y documentar la API.",
                syntaxDescription: "Dependencia y anotaciones descriptivas básicas.",
                code: `// Solo agrega la dependencia springdoc-openapi-ui en tu pom.xml

@Operation(summary = "Obtener usuario por ID")
@GetMapping("/{id}")
public Usuario get(@PathVariable Long id) { ... }`,
                useCases: [
                    {
                        title: "Configuración de Seguridad en Swagger",
                        description: "Configurar OpenAPI para que todos los desarrolladores puedan ingresar su token JWT una sola vez y probar todos los endpoints protegidos sin salir del navegador.",
                        code: `@Bean
public OpenAPI myConfig() {
    return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
        .components(new Components().addSecuritySchemes("BearerAuth", new SecurityScheme().type(HTTP).scheme("bearer").bearerFormat("JWT")));
}`
                    }
                ]
            },
            {
                id: "sb-graphql",
                title: "GraphQL",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un lenguaje de consulta para APIs. A diferencia de REST donde el servidor decide qué datos enviar, en GraphQL el cliente pide exactamente qué campos necesita."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot ofrece soporte oficial (`spring-boot-starter-graphql`) permitiendo implementar este paradigma con anotaciones muy parecidas a las de REST."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina el 'over-fetching' (traer datos de más) y el 'under-fetching' (tener que llamar a 5 APIs distintas para mostrar una sola pantalla)."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene en aplicaciones con frontends complejos o móviles. No conviene si tu equipo ya domina REST y la aplicación es sencilla."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Esquemas GraphQL y lógica de controladores."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Schema First",
                        content: "En Spring GraphQL, primero defines el archivo .graphqls con tus tipos y luego creas los controladores para que coincidan. ¡Sincronía total!",
                        code: "type Query { producto(id: ID): Producto }"
                    }
                ],
                description: "Consultas flexibles donde el cliente tiene el control total de los datos.",
                syntaxDescription: "Uso de @QueryMapping y esquemas .graphqls.",
                code: `@Controller
public class ProductoGQL {
    @QueryMapping
    public Producto productoPorId(@Argument Long id) {
        return service.findById(id);
    }
}

# schema.graphqls
type Query { productoPorId(id: ID): Producto }`,
                useCases: [
                    {
                        title: "Consulta de Red Social Optimizada",
                        description: "Permitir que el perfil del usuario cargue solo el 'id' y 'avatar' de sus seguidores, ahorrando ancho de banda en comparación con una API REST que enviaría el objeto usuario completo.",
                        code: `query {
  user(id: "123") {
    username
    followers { id avatar }
  }
}`
                    }
                ]
            }
        ]
    },
    {
        title: "3. Persistencia de Datos",
        topics: [
            {
                id: "sb-jpa-entities",
                title: "Entidades JPA",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una clase Java que representa una tabla en la base de datos. Cada objeto de esa clase corresponde a una fila de la tabla."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Permite usar el paradigma ORM (Object-Relational Mapping), lo que significa que puedes manipular datos de la base de datos como si fueran objetos Java normales."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina la necesidad de escribir código SQL manual para insertar, actualizar o borrar datos simples, reduciendo errores y acelerando el desarrollo."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene siempre que uses bases de datos relacionales (MySQL, Postgres, Oracle). No conviene si usas bases de datos NoSQL (para eso hay otras anotaciones)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de bases de datos (Tablas, Llaves Primarias y Foráneas)."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Estrategia de ID",
                        content: "Para MySQL y la mayoría de motores modernos, usa 'IDENTITY' para que la base de datos genere los IDs automáticamente de forma eficiente.",
                        code: "@GeneratedValue(strategy = GenerationType.IDENTITY)"
                    }
                ],
                description: "Mapeo de clases Java a tablas de base de datos relacionales.",
                syntaxDescription: "Estructura básica de una entidad anotada.",
                code: `@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
}`,
                useCases: [
                    {
                        title: "Relación Uno a Muchos (Post-Comentarios)",
                        description: "Modelar una relación donde un Post puede tener múltiples comentarios vinculados por una llave foránea, usando 'CascadeType.ALL' para que al borrar el post se borren sus comentarios.",
                        code: `@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Comentario> comentarios = new ArrayList<>();`
                    }
                ]
            },
            {
                id: "sb-jpa-repos",
                title: "Repositorios (Spring Data JPA)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una interfaz que nos da acceso a todos los métodos CRUD (Crear, Leer, Actualizar, Borrar) sin tener que escribir una sola línea de código SQL."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Es una de las características más queridas de Spring. Solo por heredar de `JpaRepository`, ya tienes métodos como `.save()`, `.findAll()` y `.deleteById()`."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita la creación de clases DAO (Data Access Object) repetitivas y aburridas que hacían lo mismo para cada entidad."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Indispensable para cualquier interacción con bases de datos relacionales."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Entidades JPA e Interfaces en Java."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Query Methods",
                        content: "Puedes crear consultas personalizadas solo con el nombre del método. Spring entiende el inglés técnico de bases de datos.",
                        code: "List<Usuario> findByNombreContaining(String part);"
                    }
                ],
                description: "Interfaces inteligentes para operaciones de base de datos automáticas.",
                syntaxDescription: "Definición de interfaz extendiendo JpaRepository.",
                code: `@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    
    @Query("SELECT u FROM Usuario u WHERE u.nombre LIKE %:nom%")
    List<Usuario> buscarPorNombre(@Param("nom") String nombre);
}`,
                useCases: [
                    {
                        title: "Consultas Personalizadas con JPQL",
                        description: "Implementar una búsqueda avanzada que cuente cuántos pedidos tiene un usuario y solo devuelva aquellos que tengan más de un umbral específico.",
                        code: `@Query("SELECT u FROM Usuario u WHERE size(u.pedidos) > :min")
List<Usuario> buscarUsuariosConMuchosPedidos(@Param("min") int min);`
                    }
                ]
            },
            {
                id: "sb-specifications",
                title: "Búsqueda Dinámica (Specifications)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una herramienta que permite construir filtros de búsqueda complejos y dinámicos (que cambian según lo que el usuario elija en la pantalla)."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Evita tener que crear 20 métodos distintos en el repositorio para cada combinación de filtros (ej: buscar por nombre Y fecha Y estado)."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el problema de las 'búsquedas avanzadas' en paneles administrativos donde el usuario puede filtrar por cualquier columna."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando tienes formularios de búsqueda con muchos campos opcionales. No conviene para consultas fijas y sencillas."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Spring Data JPA y Criteria API básica."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Lógica Desacoplada",
                        content: "Crea una clase 'Specification' separada para mantener tu código de búsqueda limpio y reutilizable.",
                        code: "Specification.where(filtro1).and(filtro2)"
                    }
                ],
                description: "Construcción flexible de filtros de búsqueda avanzados.",
                syntaxDescription: "Uso de herencia de JpaSpecificationExecutor.",
                code: `public interface UsuarioRepo extends JpaRepository<U, L>, JpaSpecificationExecutor<U> {}

// En el servicio
Specification<Usuario> spec = (root, query, cb) -> 
    cb.equal(root.get("activo"), true);
repo.findAll(spec);`,
                useCases: [
                    {
                        title: "Buscador de Inmuebles Dinámico",
                        description: "Construir un filtro donde el usuario pueda elegir rango de precio y ciudad opcionalmente. Si el campo viene vacío, la consulta no lo incluye.",
                        code: `public static Specification<Casa> conPrecioMenorA(Double precio) {
    return (root, query, cb) -> precio == null ? null : cb.lessThanOrEqualTo(root.get("precio"), precio);
}`
                    }
                ]
            },
            {
                id: "sb-lombok",
                title: "Lombok",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una librería que usa anotaciones para generar automáticamente el código repetitivo de Java, como Getters, Setters y Constructores."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Aunque no es parte de Spring, casi todo el mundo lo usa para mantener las clases de datos (Entidades y DTOs) limpias y legibles."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina el 'boilerplate' (código pesado y repetitivo). Una clase de 100 líneas puede pasar a tener solo 10 líneas con Lombok."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Muy recomendado para ahorro de tiempo. No conviene si trabajas en equipos que prefieren el código Java puro y explícito."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Estructura de clases Java."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Anotación @Data",
                        content: "La anotación `@Data` es un combo que incluye @ToString, @EqualsAndHashCode, @Getter, @Setter y @RequiredArgsConstructor.",
                        code: "@Data\npublic class Producto { ... }"
                    }
                ],
                description: "Adiós al código repetitivo: Getters y Setters automáticos.",
                syntaxDescription: "Anotaciones de Lombok sobre una clase POJO.",
                code: `@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    private Long id;
    private String nombre;
}

// Uso de Builder
Usuario u = Usuario.builder().nombre("Pepe").build();`,
                useCases: [
                    {
                        title: "Patrón Builder para Pruebas Unitarias",
                        description: "Usar la anotación '@Builder' para crear objetos complejos de prueba en una sola línea de código, evitando constructores gigantes con muchos nulos.",
                        code: `Usuario u = Usuario.builder()
    .id(1L).nombre("Admin")
    .email("admin@test.com")
    .build();`
                    }
                ]
            },
            {
                id: "sb-redis",
                title: "Redis",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una base de datos en memoria extremadamente rápida que se usa principalmente como caché para guardar datos que se consultan mucho pero cambian poco."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot ofrece `spring-boot-starter-data-redis` que permite usar Redis con la misma facilidad que JPA, pero con velocidades de respuesta mucho mayores."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Reduce la carga en la base de datos principal y mejora la velocidad de la aplicación (velocidad de milisegundos)."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para catálogos de productos, sesiones de usuario o rankings. No conviene para guardar datos permanentes críticos si no tienes persistencia configurada."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de Caché (Clave-Valor)."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "TTL (Tiempo de Vida)",
                        content: "Configura siempre un tiempo de vida (Time To Live) para tus datos en Redis para que la memoria no se llene infinitamente.",
                        code: "spring.cache.redis.time-to-live=600000"
                    }
                ],
                description: "Caché de ultra alta velocidad para datos frecuentes.",
                syntaxDescription: "Configuración y uso de caché con Redis.",
                code: `@Service
public class RankingService {
    @Cacheable(value = "top_usuarios", key = "#region")
    public List<Usuario> obtenerMejores(String region) {
        // proceso lento en BD
    }
}`,
                useCases: [
                    {
                        title: "Caché de Ranking en Tiempo Real",
                        description: "Guardar la lista de los 10 mejores jugadores en Redis para que la consulta sea instantánea sin importar cuántos miles de registros haya en la BD principal.",
                        code: `@Cacheable(value = "rankings", key = "'top10'")
public List<Player> getTopPlayers() {
    return repo.findTop10ByOrderByScoreDesc();
}`
                    }
                ]
            },
            {
                id: "sb-mongodb",
                title: "MongoDB",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una base de datos NoSQL líder que guarda la información en formato tipo JSON (documentos), permitiendo estructuras de datos flexibles."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Data MongoDB permite trabajar con Mongo usando el mismo estilo de Repositorios que JPA, facilitando la transición entre SQL y NoSQL."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Permite guardar datos que no tienen una estructura fija o que cambian frecuentemente sin tener que hacer migraciones de tablas complejas."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Ideal para logs, catálogos flexibles, comentarios o Big Data. No conviene tanto para aplicaciones financieras donde las transacciones ACID relacionales son críticas."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos NoSQL y documentos JSON."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Anotaciones Mongo",
                        content: "Sustituye `@Entity` por `@Document` y `@Id` de Spring Data. Mongo gestiona sus propios IDs de tipo String por defecto.",
                        code: "@Document(collection = \"mensajes\")\npublic class Mensaje { ... }"
                    }
                ],
                description: "Persistencia NoSQL flexible basada en documentos JSON.",
                syntaxDescription: "Entidad y Repositorio para MongoDB.",
                code: `@Document(collection = "usuarios")
public class UsuarioMongo {
    @Id
    private String id;
    private String nombre;
}

public interface UsuarioMongoRepo extends MongoRepository<UsuarioMongo, String> {}`,
                useCases: [
                    {
                        title: "Catálogo de Productos Flexibles",
                        description: "Guardar productos electrónicos donde un smartphone tiene 'RAM' y un televisor tiene 'Pulgadas', sin que ambos compartan la misma estructura de tabla fija.",
                        code: `@Document(collection = "inventory")
public class Product {
    private String name;
    private Map<String, Object> attributes; // Flexibilidad total
}`
                    }
                ]
            }
        ]
    },
    {
        title: "4. Lógica de Negocio y Comunicación",
        topics: [
            {
                id: "sb-service-layer",
                title: "Capas de Servicio (@Service)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una capa intermedia donde reside la 'inteligencia' de tu aplicación. Aquí es donde se aplican las reglas de negocio, cálculos y validaciones complejas."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Mantiene el código organizado y desacoplado. Los controladores solo se encargan de la comunicación (HTTP), mientras que los servicios se encargan de 'qué hacer' con los datos."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que tengas controladores gigantes y pesados (Fat Controllers), facilitando que la misma lógica pueda ser usada por diferentes controladores o tareas programadas."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Siempre que tu aplicación tenga lógica más allá de un simple CRUD."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Inyección de dependencias (@Autowired)."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Inyección por Constructor",
                        content: "En lugar de usar @Autowired sobre el campo, usa la inyección por constructor. Es más seguro, facilita las pruebas y es la recomendación oficial de Spring.",
                        code: "private final Repo repo;\npublic Service(Repo repo) { this.repo = repo; }"
                    }
                ],
                description: "El cerebro de tu app: Donde vive la lógica de negocio.",
                syntaxDescription: "Uso de la anotación @Service y lógica de negocio.",
                code: `@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Usuario registrar(Usuario u) {
        // lógica extra: enviar email, validar saldo, etc.
        return repository.save(u);
    }
}`,
                useCases: [
                    {
                        title: "Orquestación de Compra Online",
                        description: "Implementar un servicio que coordine la reducción de stock, el cobro al cliente y el envío del email, asegurando que si algo falla, no se guarde nada.",
                        code: `@Transactional
public void realizarCompra(Long cartId) {
    stockService.reduce(cartId);
    paymentService.charge(cartId);
    emailService.sendConfirmation(cartId);
}`
                    }
                ]
            },
            {
                id: "sb-cache-local",
                title: "Caché Local (@Cacheable)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un mecanismo que guarda el resultado de un método en la memoria RAM del servidor para que, si se vuelve a pedir lo mismo, no tenga que procesarlo de nuevo."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Es una de las formas más fáciles de acelerar una aplicación. Solo con una anotación, puedes reducir tiempos de respuesta de segundos a milisegundos."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve problemas de rendimiento cuando tienes procesos lentos, como llamadas a APIs externas pesadas o cálculos matemáticos complejos."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene cuando los datos no cambian cada segundo. No conviene si la información debe estar actualizada al milisegundo (ej. la bolsa de valores)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Configuración básica de Spring."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Limpieza de Caché",
                        content: "Usa `@CacheEvict` cuando actualices un dato para que la versión antigua guardada en memoria se borre y se cargue la nueva.",
                        code: "@CacheEvict(value = \"usuarios\", allEntries = true)"
                    }
                ],
                description: "Ahorro de tiempo: Guardar resultados pesados en memoria.",
                syntaxDescription: "Uso de @Cacheable sobre métodos de servicio.",
                code: `@Configuration
@EnableCaching
public class CacheConfig { }

@Service
public class ReporteService {
    @Cacheable("reportes_mensuales")
    public byte[] generar() { 
        // Proceso muy lento
    }
}`,
                useCases: [
                    {
                        title: "Caché de Configuración de Sistema",
                        description: "Guardar en memoria RAM los parámetros globales que se cargan de la base de datos al inicio para no volver a consultarlos en cada petición del usuario.",
                        code: `@Cacheable("config")
public SystemConfig getConfig() {
    return repo.findFirstByOrderByIdAsc();
}`
                    }
                ]
            },
            {
                id: "sb-async",
                title: "Programación Asíncrona (@Async)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es la capacidad de ejecutar una tarea en un hilo separado (en segundo plano) de modo que el usuario no tenga que esperar a que termine para seguir usando la app."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Mejora enormemente la 'sensación' de velocidad de la aplicación. El usuario recibe un 'OK' inmediato mientras el servidor sigue trabajando por detrás."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que el servidor se bloquee esperando procesos lentos (como enviar un email o generar un PDF pesado) que no son necesarios para dar una respuesta inmediata."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para tareas de 'dispara y olvida' (fire and forget). No conviene si necesitas el resultado de esa tarea para completar la petición actual."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Hilos (Threads) básicos y CompletableFuture."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "Contexto de Transacción",
                        content: "Ten cuidado: un método `@Async` corre en un hilo distinto, por lo que no hereda la transacción (`@Transactional`) del hilo principal.",
                        code: "// El rollback del hilo principal no afectará al hilo asíncrono."
                    }
                ],
                description: "Tareas en segundo plano sin hacer esperar al usuario.",
                syntaxDescription: "Configuración y anotación @Async.",
                code: `@Configuration
@EnableAsync
public class AsyncConfig { }

@Service
public class NotificationService {
    @Async
    public void enviarEmail(String to) {
        // proceso que demora 5 segundos
    }
}`,
                useCases: [
                    {
                        title: "Procesamiento de Imágenes en Fondo",
                        description: "Cuando un usuario sube una foto, devolverle un 'OK' inmediato y redimensionar la imagen en otro hilo para no bloquear la experiencia de navegación.",
                        code: `@Async
public void resizeImage(String path) {
    // Proceso pesado de CPU
    imageUtils.generateThumbnail(path);
}`
                    }
                ]
            },
            {
                id: "sb-events",
                title: "Eventos (ApplicationEvent)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un patrón de diseño que permite que un componente 'grite' que algo pasó, y que otros componentes escuchen ese aviso y reaccionen sin conocerse entre sí."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Permite desacoplar el código. Por ejemplo, el servicio de Ventas termina una orden y 'lanza un evento', el servicio de Factura lo escucha y genera el PDF, pero Ventas no sabe nada del PDF."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el problema de las dependencias circulares y las clases 'dios' que intentan hacer de todo en un solo método."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Ideal para arquitecturas limpias y modulares. No conviene si la lógica es lineal y muy simple, ya que añade una capa de complejidad al seguimiento del código."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Patrón Observador."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Eventos Ligeros",
                        content: "No pases objetos pesados en los eventos. Pasa solo el ID del recurso para que el 'escuchador' busque lo que necesite.",
                        code: "public record VentaEvent(Long ventaId) {}"
                    }
                ],
                description: "Comunicación invisible y desacoplada entre módulos.",
                syntaxDescription: "Lanzamiento y escucha de eventos internos.",
                code: `// Lanzador
publisher.publishEvent(new MiEvento(this, "Hola"));

// Escuchador
@EventListener
public void onEvent(MiEvento event) {
    System.out.println("Recibido: " + event.getMessage());
}`,
                useCases: [
                    {
                        title: "Desacoplo de Notificaciones",
                        description: "Lanzar un evento cuando se cierra una venta, para que el servicio de Email y el de Almacén reaccionen de forma independiente sin conocerse entre sí.",
                        code: `public void completarPedido(Pedido p) {
    repo.save(p);
    publisher.publishEvent(new PedidoCompletadoEvent(p.getId()));
}`
                    }
                ]
            },
            {
                id: "sb-scheduling",
                title: "Tareas Programadas (@Scheduled)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un cronómetro interno que permite ejecutar un trozo de código automáticamente cada cierto tiempo (minutos, días) o en un horario exacto."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Facilita la automatización de procesos de mantenimiento sin necesidad de usar herramientas externas del sistema operativo."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Automatiza tareas repetitivas como limpieza de base de datos, envío de newsletters diarias o sincronización de stocks a media noche."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para tareas de mantenimiento. No conviene si necesitas una precisión de milisegundos absoluta o si tienes muchas instancias del servidor (podrían ejecutarse duplicadas)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Expresiones Cron (opcional)."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Expresión Cron",
                        content: "Usa expresiones Cron para tener control total. Ejemplo: '0 0 12 * * ?' significa todos los días a las 12 PM.",
                        code: "@Scheduled(cron = \"0 0 0 * * *\") // Medianoche"
                    }
                ],
                description: "Automatización: Código que corre solo segun el reloj.",
                syntaxDescription: "Uso de @Scheduled con tasas fijas o cron.",
                code: `@Configuration
@EnableScheduling
public class ScheduleConfig { }

@Component
public class TareasLimpieza {
    @Scheduled(fixedRate = 3600000) // cada 1 hora
    public void limpiarTemporales() { ... }
}`,
                useCases: [
                    {
                        title: "Limpieza Semanal de Logs",
                        description: "Configurar un proceso automático que se ejecute todos los domingos a las 3 AM para borrar registros de actividad antiguos que ya no son necesarios.",
                        code: `@Scheduled(cron = "0 0 3 * * SUN")
public void cleanOldLogs() {
    logRepo.deleteByDateBefore(LocalDate.now().minusMonths(1));
}`
                    }
                ]
            },
            {
                id: "sb-websockets",
                title: "WebSockets",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una conexión abierta permanentemente entre el cliente y el servidor que permite que el servidor envíe datos al cliente en cualquier momento, sin esperar una petición."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Permite crear aplicaciones interactivas en tiempo real. Spring ofrece STOMP sobre WebSockets, facilitando un modelo de 'mensajería' muy familiar."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el problema de la 'espera activa' (polling). El cliente ya no tiene que preguntar cada 2 segundos '¿hay mensajes nuevos?'; el servidor se los entrega apenas llegan."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Ideal para chats, notificaciones en vivo y dashboards financieros. No conviene para comunicación web estándar de una sola vía (como leer un post)."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Protocolos de comunicación bidireccional."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Broker Externo",
                        content: "Para aplicaciones grandes, usa un broker externo como RabbitMQ con WebSockets en lugar del broker simple en memoria que viene por defecto.",
                        code: "config.enableStompBrokerRelay(\"/topic\")"
                    }
                ],
                description: "Comunicación bidireccional y tiempo real (Chats, Live Data).",
                syntaxDescription: "Configuración de Message Broker y controladores.",
                code: `@Configuration
@EnableWebSocketMessageBroker
public class WSConfig implements WebSocketMessageBrokerConfigurer { ... }

@MessageMapping("/hello")
@SendTo("/topic/greetings")
public String greeting(String message) { return "Hola: " + message; }`,
                useCases: [
                    {
                        title: "Notificaciones de Stock Bajo",
                        description: "Enviar un aviso visual instantáneo al panel del administrador cuando el stock de un producto llegue a cero, sin que el admin tenga que recargar la página.",
                        code: `public void checkStock(Producto p) {
    if(p.getQty() == 0) {
        messagingTemplate.convertAndSend("/topic/alerts", "¡Stock agotado de: " + p.getName());
    }
}`
                    }
                ]
            },
            {
                id: "sb-kafka",
                title: "Kafka",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una plataforma de streaming de eventos distribuida. Funciona como un buzón de mensajería gigante y ultra veloz que conecta diferentes microservicios."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Kafka simplifica el uso de esta herramienta compleja mediante anotaciones como `@KafkaListener`, permitiendo procesar millones de mensajes por segundo."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Desacopla aplicaciones a gran escala. Si el sistema de pagos lanza un mensaje a Kafka, no le importa si el sistema de facturación está caído; el mensaje esperará ahí hasta ser procesado."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Imprescindible en microservicios y Big Data. No conviene para aplicaciones pequeñas monolíticas donde una cola interna o base de datos es suficiente."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de Pub/Sub y Mensajería Distribuida."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Serialization JSON",
                        content: "Configura Kafka para que use JSON automáticamente al enviar y recibir objetos Java, ¡te ahorrará mucho trabajo manual!",
                        code: "spring.kafka.producer.value-serializer=JsonSerializer"
                    }
                ],
                description: "Mensajería masiva y comunicación entre microservicios.",
                syntaxDescription: "Uso de KafkaTemplate y KafkaListener.",
                code: `@Service
public class Productor {
    @Autowired private KafkaTemplate<String, String> kafkaTemplate;
    public void enviar(String msg) { kafkaTemplate.send("mi-topic", msg); }
}

@KafkaListener(topics = "mi-topic")
public void escuchar(String msg) { ... }`,
                useCases: [
                    {
                        title: "Sincronización de Precios Masiva",
                        description: "Enviar cada cambio de precio a un topic de Kafka para que miles de tiendas físicas reciban la actualización casi al mismo tiempo sin saturar la BD.",
                        code: `public void updatePrice(Long id, Double price) {
    kafkaTemplate.send("price-updates", new PriceMsg(id, price));
}`
                    }
                ]
            },
            {
                id: "sb-batch",
                title: "Batch Processing",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un framework para procesar volúmenes masivos de datos (millones de registros) de forma eficiente, robusta y con capacidad de reintento si algo falla."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Batch es el estándar industrial para tareas de fondo pesadas, ofreciendo control sobre transacciones, saltos de errores y estadísticas de procesamiento."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que el servidor muera por falta de memoria al intentar procesar un Excel de un millón de filas. Lo hace por 'trozos' (chunks) controlados."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Usa Spring Batch para procesos ETL pesados (Extracción, Transformación y Carga). No lo uses para tareas rápidas que duran segundos."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de ETL (Extract, Transform, Load)."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Restartability",
                        content: "Una gran ventaja de Spring Batch es que si el proceso se corta a la mitad (ej. se apaga el server), puede retomar exactamente donde se quedó sin repetir lo ya hecho.",
                        code: "// Configuración automática por defecto."
                    }
                ],
                description: "Procesamiento de datos masivos (ETL) de alta fiabilidad.",
                syntaxDescription: "Estructura de Job, Step y Chunk.",
                code: `@Bean
public Step step1() {
    return stepBuilderFactory.get("step1")
        .<User, User>chunk(100) // de 100 en 100
        .reader(reader())
        .processor(processor())
        .writer(writer())
        .build();
}`,
                useCases: [
                    {
                        title: "Migración de Base de Datos Masiva",
                        description: "Leer un archivo de 1 millón de clientes de un sistema antiguo (Legacy), transformarlos al nuevo formato y guardarlos en trozos de 1000 en 1000.",
                        code: `@Bean
public Step migrationStep() {
    return stepBuilder.get("mig")
        .<OldUser, NewUser>chunk(1000)
        .reader(fileReader()).processor(mapper()).writer(dbWriter()).build();
}`
                    }
                ]
            }
        ]
    },
    {
        title: "5. Seguridad (Spring Security)",
        topics: [
            {
                id: "sb-security-config",
                title: "Configuración Base",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es el conjunto de reglas que definen quién puede entrar a tu aplicación y qué partes son públicas o privadas."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Security es el estándar de la industria. Protege automáticamente contra ataques comunes (como CSRF) y permite configurar la seguridad de forma centralizada."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que extraños accedan a datos privados de tus usuarios o que realicen acciones administrativas sin permiso."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Obligatorio en cualquier aplicación que maneje datos reales en internet. Solo podrías omitirlo en apps puramente educativas que corren solo en tu PC local."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de autenticación (quién eres) y autorización (qué puedes hacer)."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "SecurityFilterChain",
                        content: "En las versiones más nuevas de Spring, ya no se hereda de una clase base. Ahora defines un @Bean de tipo SecurityFilterChain para configurar todo de forma limpia.",
                        code: "@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) { ... }"
                    }
                ],
                description: "La muralla protectora de tu aplicación.",
                syntaxDescription: "Configuración básica de reglas de acceso.",
                code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/publico/**").permitAll()
            .anyRequest().authenticated()
        ).formLogin(withDefaults());
        return http.build();
    }
}`,
                useCases: [
                    {
                        title: "Protección de Rutas por Rol (Admin)",
                        description: "Configurar la aplicación para que solo los usuarios que tengan el rol técnico 'ADMIN' puedan acceder a la consola de gestión de usuarios.",
                        code: `.requestMatchers("/admin/**").hasRole("ADMIN")`
                    }
                ]
            },
            {
                id: "sb-security-jwt",
                title: "JWT Authentication",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "JWT (JSON Web Token) es una 'credencial digital' que el servidor le da al usuario cuando hace login. El usuario la guarda y la envía en cada mensaje para demostrar que es él."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Es la forma preferida de asegurar APIs. Al no usar 'sesiones' en el servidor, permite que tu app escale mucho más fácil en la nube."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Permite que el servidor no tenga que 'recordar' a cada usuario en memoria, ahorrando recursos y permitiendo que muchos servidores distintos entiendan quién es el usuario."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Ideal para APIs REST y aplicaciones móviles. No es necesario para webs tradicionales donde se usan cookies y sesiones estándar."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Estructura de tokens y Headers HTTP."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "Secreto Fuerte",
                        content: "Nunca uses una palabra simple como secreto. Usa una cadena larga de caracteres aleatorios y guárdala fuera del código (en variables de entorno).",
                        code: "// ✅ Bien: jwt.secret=${MY_SECRET_KEY}"
                    }
                ],
                description: "Seguridad moderna basada en tokens para APIs y apps móviles.",
                syntaxDescription: "Generación de token JWT.",
                code: `public String generateToken(String username) {
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(SignatureAlgorithm.HS256, secret)
        .compact();
}`,
                useCases: [
                    {
                        title: "Autenticación para Apps Móviles",
                        description: "Implementar un sistema donde el servidor no guarda sesiones, permitiendo que miles de dispositivos Android/iOS se autentiquen mediante un token digital inmutable.",
                        code: `String token = jwtUtils.createToken(user.getUsername(), user.getRoles());
return ResponseEntity.ok(new AuthDTO(token));`
                    }
                ]
            },
            {
                id: "sb-security-filters",
                title: "Filtros Personalizados",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un componente que intercepta cada peticion que llega al servidor ANTES de que llegue al controlador, para revisar algo (como el token JWT)."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Security basa todo su poder en filtros. Crear uno propio te permite leer el Header 'Authorization' y validar al usuario en cada petición."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que tengas que validar la seguridad dentro de cada controlador. Se hace una sola vez al entrar la petición y listo."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Indispensable si vas a implementar JWT o cualquier sistema de autenticación que no venga por defecto en Spring."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Arquitectura de filtros de Spring Security."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "OncePerRequestFilter",
                        content: "En lugar de implementar 'Filter' genérico, usa `OncePerRequestFilter` de Spring. Garantiza que tu lógica de seguridad se ejecute exactamente una vez por cada petición.",
                        code: "public class JwtFilter extends OncePerRequestFilter { ... }"
                    }
                ],
                description: "Intercepción y validación de peticiones en la entrada.",
                syntaxDescription: "Implementación de filtro de seguridad.",
                code: `@Component
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, ...) {
        String authHeader = request.getHeader("Authorization");
        // validación manual del token...
        filterChain.doFilter(request, response);
    }
}`,
                useCases: [
                    {
                        title: "Intercepción de Identidad en cada Petición",
                        description: "Crear un componente que lea el header 'Authorization' en cada llamada, valide la firma del token y establezca al usuario en el contexto de seguridad de Spring.",
                        code: `String header = request.getHeader("Authorization");
if (header != null && header.startsWith("Bearer ")) {
    String token = header.substring(7);
    if (jwtUtils.validate(token)) { ... }
}`
                    }
                ]
            },
            {
                id: "sb-security-oauth2",
                title: "OAuth2 Client",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es el sistema que permite que tus usuarios se logueen en tu app usando sus cuentas existentes de Google, GitHub o Facebook."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot ofrece integración casi mágica (`spring-boot-starter-oauth2-client`) que maneja todo el flujo complejo de redirecciones por ti."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina la fricción del registro. Un usuario es mucho más propenso a usar tu app si solo tiene que hacer un clic y 'Entrar con Google'."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Ideal para apps orientadas al público general. No conviene si tu seguridad debe ser 100% privada e interna sin depender de empresas externas."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de Identidad Delegada."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Configuración YAML",
                        content: "No necesitas escribir código para configurar Google o GitHub. Spring ya los conoce, solo pon tu 'Client ID' y 'Secret' en el archivo YAML.",
                        code: "registration:\n  google:\n    client-id: ...\n    client-secret: ..."
                    }
                ],
                description: "Login social: 'Entrar con Google/GitHub' en tu app.",
                syntaxDescription: "Habilitación de OAuth2 en la configuración.",
                code: `@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    http.oauth2Login(Customizer.withDefaults());
    return http.build();
}`,
                useCases: [
                    {
                        title: "Inicio de Sesión con Google",
                        description: "Habilitar el botón 'Entrar con Google' para evitar que los usuarios tengan que recordar una contraseña más, delegando la identidad a servidores seguros de Google.",
                        code: `spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: \${GOOGLE_ID}
            client-secret: \${GOOGLE_SECRET}`
                    }
                ]
            },
            {
                id: "sb-rate-limiting",
                title: "Rate Limiting",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una técnica para poner un 'techo' al número de veces que un usuario o IP puede llamar a tu API en un minuto."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Protege tu aplicación contra ataques de denegación de servicio (DoS) o contra usuarios que abusan de tus recursos (scraping)."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que un solo usuario malintencionado sature tu servidor y haga que la aplicación se caiga para todos los demás."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Esencial en APIs públicas. Menos necesario en aplicaciones puramente internas o privadas de pocos usuarios."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Headers HTTP y Códigos de Error (429 Too Many Requests)."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Bucket4j",
                        content: "Spring Boot no tiene rate limiting nativo potente, pero se integra perfecto con librerías como 'Bucket4j'. ¡Es la opción más común!",
                        code: "Bucket bucket = Bucket4j.builder().addLimit(...);"
                    }
                ],
                description: "Protección contra abusos: Límite de peticiones por tiempo.",
                syntaxDescription: "Lógica básica de conteo en un filtro.",
                code: `if (conteoPeticiones > 100) {
    response.setStatus(429); // Too Many Requests
    return;
}`,
                useCases: [
                    {
                        title: "Defensa contra Fuerza Bruta",
                        description: "Limitar a 5 intentos de login por minuto desde una misma dirección IP para evitar que scripts automatizados intenten adivinar contraseñas.",
                        code: `RateLimiter limit = rateLimiterRegistry.rateLimiter("login");
return RateLimiter.decorateSupplier(limit, () -> authService.login(u)).get();`
                    }
                ]
            }
        ]
    },
    {
        title: "6. Microservicios y Resiliencia",
        topics: [
            {
                id: "sb-cloud-config",
                title: "Spring Cloud Config",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es un servidor centralizado que guarda la configuración de todos tus microservicios en un solo lugar (usualmente un repositorio Git)."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "En una arquitectura de microservicios, tener que cambiar el puerto o la base de datos en 50 servicios distintos sería una pesadilla. Con Cloud Config, lo haces en un solo archivo Git y todos se enteran."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el problema de la fragmentación de configuración. Permite cambiar parámetros en 'caliente' sin tener que reiniciar cada microservicio."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Necesario si tienes más de 3 o 4 microservicios colaborando. No tiene sentido en aplicaciones monolíticas simples."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Configuración externa (application.yml) y nociones de Git."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "@RefreshScope",
                        content: "Añade `@RefreshScope` a tus beans de configuración para que se actualicen automáticamente cuando cambies algo en el servidor de Cloud Config, sin reiniciar la app.",
                        code: "@RefreshScope\n@RestController"
                    }
                ],
                description: "Configuración centralizada para todos tus microservicios.",
                syntaxDescription: "Habilitación del servidor de configuración.",
                code: `@EnableConfigServer
@SpringBootApplication
public class ConfigServer { ... }

// En el microservicio (bootstrap.yml)
spring:
  cloud:
    config:
      uri: http://localhost:8888`,
                useCases: [
                    {
                        title: "Gestión de Secretos en Entornos Nube",
                        description: "Configurar un servidor central que inyecte las llaves de API y contraseñas de BD a todos los microservicios, manteniéndolas en un repositorio Git cifrado.",
                        code: `spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/org/private-configs
          search-paths: 'retail-app-*'`
                    }
                ]
            },
            {
                id: "sb-eureka",
                title: "Discovery (Eureka)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es como un 'directorio telefónico' donde cada microservicio se registra al arrancar para que los demás sepan en qué dirección IP y puerto encontrarlo."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "En la nube, las direcciones IP cambian constantemente. Eureka permite que los servicios se encuentren por su 'nombre' (ej. 'servicio-pagos') en lugar de una IP fija."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el problema del acoplamiento de direcciones. Si un servicio se mueve de servidor o se duplica para aguantar más tráfico, los demás lo encuentran automáticamente."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Fundamental en cualquier sistema de microservicios. Innecesario si solo tienes un servidor con una IP fija que nunca cambia."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Arquitectura cliente-servidor básica."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Self-Preservation",
                        content: "Eureka tiene un modo de 'autopreservación' que evita borrar servicios si hay un fallo de red temporal. ¡Es una red de seguridad muy útil!",
                        code: "eureka.server.enable-self-preservation=true"
                    }
                ],
                description: "Directorio dinámico: Encuentra tus servicios por nombre, no por IP.",
                syntaxDescription: "Habilitación de servidor y cliente Eureka.",
                code: `// Servidor
@EnableEurekaServer
public class EurekaApp { }

// Cliente
@EnableDiscoveryClient
public class MiServicio { }`,
                useCases: [
                    {
                        title: "Escalado Elástico de Microservicios",
                        description: "Permitir que el sistema detecte automáticamente cuando levantamos 10 copias de un servicio de 'Inventario' para repartir el tráfico entre todas sin intervención manual.",
                        code: `// En application.yml del cliente
eureka:
  client:
    serviceUrl:
      defaultZone: http://eureka-server:8761/eureka/`
                    }
                ]
            },
            {
                id: "sb-gateway",
                title: "API Gateway",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una puerta de entrada única para todas las peticiones externas. El Gateway recibe la llamada y decide a qué microservicio interno debe enviarla."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Cloud Gateway reemplaza al antiguo Zuul y ofrece un rendimiento superior basado en WebFlux. Permite centralizar seguridad, filtros y límites de velocidad."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Evita que el frontend tenga que conocer 20 direcciones distintas para 20 microservicios. También protege los servicios internos ocultándolos tras una sola IP."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Indispensable como punto de entrada de una arquitectura de microservicios moderna."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Filtros HTTP y Enrutamiento (Routing)."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Predicados",
                        content: "Usa predicados para enrutar no solo por URL, sino también por hora, cabeceras o incluso el peso de la petición (Load Balancing).",
                        code: "predicates:\n  - Path=/usuarios/**\n  - After=2024-01-01T..."
                    }
                ],
                description: "La recepción de tu sistema: Un solo punto de entrada para todo.",
                syntaxDescription: "Configuración de rutas en el Gateway.",
                code: `spring:
  cloud:
    gateway:
      routes:
        - id: ventas-service
          uri: lb://VENTAS-SERVICE
          predicates:
            - Path=/ventas/**`,
                useCases: [
                    {
                        title: "Puerta de Entrada Única (Gateway)",
                        description: "Configurar un punto único que reciba todas las llamadas del exterior y las redirija al microservicio correcto basándose en el prefijo de la URL.",
                        code: `spring:
  cloud:
    gateway:
      routes:
        - id: user-module
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**`
                    }
                ]
            },
            {
                id: "sb-circuit-breaker",
                title: "Circuit Breaker (Resilience4j)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es como un 'fusible eléctrico'. Si un servicio externo está fallando mucho, el fusible 'se abre' y deja de enviarle peticiones para no saturar el sistema y dar una respuesta de error rápida."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Evita el efecto dominó. Si el servicio de correos se cae, el de ventas no debería bloquearse esperando una respuesta que nunca llegará."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Maneja la tolerancia a fallos. Permite que tu app siga funcionando (aunque sea con funciones limitadas) incluso si partes del sistema están caídas."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Obligatorio cuando dependes de servicios externos o de otros microservicios sobre los que no tienes control total."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de resiliencia y programación asíncrona."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Fallback",
                        content: "Define siempre un método 'fallback'. Si el servicio principal falla, este método puede devolver datos por defecto o un mensaje amigable.",
                        code: "public String fallback(Exception e) { return \"Servicio temporalmente caído\"; }"
                    }
                ],
                description: "Protección ante fallos: Evita que un error detenga todo el sistema.",
                syntaxDescription: "Uso de la anotación @CircuitBreaker.",
                code: `@CircuitBreaker(name = "backendA", fallbackMethod = "metodoAlternativo")
public Datos llamarServicioExterno() {
    // llamada arriesgada...
}

public Datos metodoAlternativo(Exception e) {
    return new Datos("Valor por defecto");
}`,
                useCases: [
                    {
                        title: "Prevención de Fallo en Cascada",
                        description: "Si el servicio de cobro externo (ej: PayPal) está lento, activar un cortocircuito que responda 'Servicio no disponible' instantáneamente para no saturar los hilos de la app.",
                        code: `@CircuitBreaker(name = "payment", fallbackMethod = "localError")
public void pay() {
    restTemplate.postForEntity("https://api.external.com/pay", ...);
}`
                    }
                ]
            },
            {
                id: "sb-webflux",
                title: "WebFlux (Reactive)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es la versión reactiva y no bloqueante de Spring. Permite manejar miles de peticiones simultáneas con muchos menos recursos (memoria/CPU) que el Spring tradicional."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Es la base para aplicaciones de ultra alto rendimiento. En lugar de usar un hilo por cada petición, usa un sistema de eventos (como Node.js) para ser sumamente eficiente."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el problema de la escalabilidad masiva. Útil cuando necesitas manejar flujos de datos constantes o 'streaming' de información."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para chats, sistemas de trading o APIs de altísimo tráfico. No conviene si tu equipo no sabe programar de forma reactiva, ya que el código es mucho más difícil de leer y depurar."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Java reactivo (Project Reactor), Mono y Flux."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "No Bloquear",
                        content: "¡Regla de oro! Nunca uses librerías bloqueantes (como JDBC tradicional) dentro de WebFlux, o perderás toda su ventaja de rendimiento.",
                        code: "// Usa R2DBC en lugar de JDBC."
                    }
                ],
                description: "Alto rendimiento: Programación reactiva para millones de usuarios.",
                syntaxDescription: "Controladores usando Mono (1 dato) y Flux (N datos).",
                code: `@GetMapping("/stream")
public Flux<Dato> streaming() {
    return repo.findAll(); // Devuelve datos conforme van llegando
}

@GetMapping("/{id}")
public Mono<Dato> uno(@PathVariable String id) {
    return repo.findById(id);
}`,
                useCases: [
                    {
                        title: "Stream de Precios de Criptomonedas",
                        description: "Mantener una conexión abierta con miles de usuarios para enviarles actualizaciones de precios cada segundo sin consumir un hilo de ejecución por cada cliente.",
                        code: `@GetMapping(value = "/prices", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<Price> streamPrices() {
    return service.getPriceFlux();
}`
                    }
                ]
            }
        ]
    },
    {
        title: "7. Calidad, Pruebas y Despliegue",
        topics: [
            {
                id: "sb-testing-unit",
                title: "Pruebas Unitarias (JUnit 5)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es la práctica de probar pequeños trozos de código (como un solo método de una clase) de forma aislada para asegurar que hacen lo que deben."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot viene con JUnit 5 y Mockito por defecto. Permite detectar errores en la lógica de negocio antes de que lleguen a producción, ahorrando miles de dólares en fallos."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve el miedo a cambiar código. Si tienes buenas pruebas, puedes refactorizar o añadir funciones sabiendo que no rompiste nada de lo anterior."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Siempre. Es la base de un software profesional de calidad."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de Assertions (Afirmaciones)."
                    }
                ],
                tips: [
                    {
                        type: "goodPractice",
                        title: "Mockito",
                        content: "Usa Mockito para simular tus repositorios. No necesitas una base de datos real para probar si tu lógica de cálculo de descuentos funciona bien.",
                        code: "when(repo.find(...)).thenReturn(mockUser);"
                    }
                ],
                description: "Calidad desde la base: Probando métodos de forma aislada.",
                syntaxDescription: "Uso de JUnit 5 y Mockito.",
                code: `@ExtendWith(MockitoExtension.class)
class ServiceTest {
    @Mock private Repo repo;
    @InjectMocks private Service service;

    @Test
    void testCalculo() {
        assertEquals(10, service.sumar(5, 5));
    }
}`,
                useCases: [
                    {
                        title: "Cálculo de Comisiones",
                        description: "Asegurar que un método que calcula la comisión de un vendedor devuelva exactamente el 5% para ventas menores a $1000, simulando los datos del vendedor.",
                        code: `@Test
void testComision() {
    when(repo.getVenta(1L)).thenReturn(new Venta(900.0));
    assertEquals(45.0, service.calcComision(1L));
}`
                    }
                ]
            },
            {
                id: "sb-testing-integration",
                title: "Pruebas de Integración",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Son pruebas que verifican que diferentes partes de la aplicación (como el controlador, el servicio y la base de datos) funcionen bien juntas."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring ofrece `@SpringBootTest`, que levanta todo el contexto de la aplicación para probar flujos reales, incluyendo la conexión a la base de datos."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Detecta errores que las pruebas unitarias no ven, como fallos en el mapeo de la base de datos, errores en filtros de seguridad o URLs mal configuradas."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Conviene para probar flujos críticos de la app (ej. el proceso de compra). No conviene abusar de ellas porque son mucho más lentas que las unitarias."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Contexto de Spring y Bases de datos de prueba (H2)."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "@ActiveProfiles",
                        content: "Usa `@ActiveProfiles(\"test\")` para que tus pruebas usen una base de datos en memoria (H2) y no borren los datos de tu base de datos de desarrollo.",
                        code: "@SpringBootTest\n@ActiveProfiles(\"test\")"
                    }
                ],
                description: "Pruebas de flujo real: Verificando que todo encaje correctamente.",
                syntaxDescription: "Configuración de prueba de integración con contexto.",
                code: `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegracionTest {
    @Autowired private TestRestTemplate restTemplate;

    @Test
    void testGetUsuarios() {
        var resp = restTemplate.getForEntity("/api/u", String.class);
        assertEquals(HttpStatus.OK, resp.getStatusCode());
    }
}`,
                useCases: [
                    {
                        title: "Verificación de Flujo de Registro Real",
                        description: "Simular una petición POST de registro y verificar que el usuario realmente aparezca guardado en la base de datos H2 de pruebas.",
                        code: `@Test
void testRegister() {
    restTemplate.postForEntity("/register", newUser, String.class);
    assertTrue(userRepo.existsByEmail("test@mail.com"));
}`
                    }
                ]
            },
            {
                id: "sb-actuator",
                title: "Monitoreo (Actuator)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una herramienta que te da 'superpoderes' para ver qué está pasando dentro de tu aplicación mientras está corriendo en producción."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot Actuator ofrece endpoints automáticos para ver el estado de salud (Health), las métricas de memoria, los logs y más, sin programar nada."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Resuelve la ceguera operativa. Te permite saber si tu app se quedó sin memoria, si la base de datos se cayó o cuántas peticiones está recibiendo por segundo."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Indispensable en apps profesionales. No es necesario en ejercicios escolares o pruebas muy pequeñas."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de monitoreo y Dashboards (Grafana/Prometheus)."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "Seguridad de Actuator",
                        content: "¡Cuidado! Los endpoints de Actuator revelan mucha info sensible. Protégelos con Spring Security para que solo los administradores puedan verlos.",
                        code: "management.endpoints.web.exposure.include=health,info"
                    }
                ],
                description: "Rayos X para tu app: Estado de salud y métricas en tiempo real.",
                syntaxDescription: "Habilitación de endpoints de monitoreo.",
                code: `// application.properties
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always

// URL: http://localhost:8080/actuator/health`,
                useCases: [
                    {
                        title: "Auto-Sanado en Kubernetes",
                        description: "Configurar el endpoint de salud para que Kubernetes sepa exactamente cuándo debe reiniciar un contenedor que se ha quedado 'congelado' o sin memoria.",
                        code: `# application.yml
management:
  endpoint:
    health:
      probes:
        enabled: true`
                    }
                ]
            },
            {
                id: "sb-swagger",
                title: "Documentación (Swagger/OpenAPI)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es una página web que se genera sola y muestra todos los endpoints de tu API, permitiendo que otros programadores los prueben sin usar Postman."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Facilita enormemente el trabajo en equipo. El programador de Frontend puede ver qué datos necesita enviar a cada URL sin tener que preguntarte a ti."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Elimina la documentación manual y desactualizada. Swagger se actualiza solo cada vez que cambias tu código."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Muy recomendado para todas las APIs REST."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de API REST."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Anotaciones Descriptivas",
                        content: "Usa `@Operation` y `@ApiResponse` sobre tus métodos para que la página de Swagger sea mucho más clara y profesional.",
                        code: "@Operation(summary = \"Busca un usuario por ID\")"
                    }
                ],
                description: "Documentación viva: Tu API explicada y lista para probar.",
                syntaxDescription: "Dependencia de SpringDoc OpenAPI.",
                code: `// URL por defecto:
// http://localhost:8080/swagger-ui.html

@RestController
@Tag(name = "Usuarios", description = "Gestión de clientes")
public class UserCtrl { ... }`,
                useCases: [
                    {
                        title: "Documentación de Seguridad JWT",
                        description: "Configurar Swagger para que muestre el botón 'Authorize', permitiendo que los desarrolladores de Frontend vean cómo enviar el token en la cabecera.",
                        code: `@Bean
public OpenAPI customizeOpenAPI() {
    return new OpenAPI().addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
        .components(new Components().addSecuritySchemes("bearerAuth", new SecurityScheme()
            .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
}`
                    }
                ]
            },
            {
                id: "sb-docker",
                title: "Dockerización",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Es empaquetar tu aplicación junto con todo lo que necesita para correr (Java, Linux, librerías) dentro de una 'caja' llamada Contenedor."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Garantiza que la app que corre en tu PC sea EXACTAMENTE IGUAL a la que corre en el servidor del cliente ('En mi máquina funciona' deja de ser una excusa)."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Soluciona los problemas de instalación y versiones de Java. Puedes desplegar tu app en segundos en cualquier nube (AWS, Google, Azure)."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "Standard actual de la industria. No conviene si tu despliegue es extremadamente simple y manual en un solo servidor fijo."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Comandos básicos de Docker."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "Multi-stage Build",
                        content: "Usa un Dockerfile de dos etapas: una para compilar el código y otra más pequeña solo con el JAR final para que tu imagen no pese demasiado.",
                        code: "FROM maven AS build ... \nFROM openjdk ..."
                    }
                ],
                description: "Portabilidad total: Tu aplicación en contenedores listos para la nube.",
                syntaxDescription: "Dockerfile básico para Spring Boot.",
                code: `FROM openjdk:21-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]`,
                useCases: [
                    {
                        title: "Despliegue de Microservicio en la Nube",
                        description: "Empaquetar tu servicio en una imagen ligera y desplegarla en un clúster de Kubernetes, asegurando que el entorno sea idéntico al de desarrollo.",
                        code: "docker build -t app-service .\ndocker run -p 8080:8080 app-service"
                    }
                ]
            },
            {
                id: "sb-deployment",
                title: "Despliegue (JAR vs WAR)",
                content: [
                    {
                        title: "¿Qué es?",
                        text: "Son los dos formatos principales para entregar tu aplicación terminada. JAR incluye un servidor web dentro, WAR necesita que lo instales en un servidor externo (como Tomcat)."
                    },
                    {
                        title: "¿Por qué es importante en el ecosistema Spring?",
                        text: "Spring Boot revolucionó esto priorizando el JAR (Fat JAR). Es mucho más moderno y fácil de gestionar porque la app 'lleva su propio servidor a cuestas'."
                    },
                    {
                        title: "¿Qué problema real resuelve?",
                        text: "Simplifica el despliegue. Ya no tienes que configurar servidores pesados en el destino; solo copias un archivo y lo ejecutas."
                    },
                    {
                        title: "¿Cuándo conviene usarlo y cuándo no?",
                        text: "JAR: 99% de los casos modernos. WAR: Solo si tu empresa tiene servidores Tomcat antiguos y obligatorios por política interna."
                    },
                    {
                        title: "¿Qué conocimientos previos requiere?",
                        text: "Conceptos de empaquetado Java."
                    }
                ],
                tips: [
                    {
                        type: "recommendation",
                        title: "Variables de entorno",
                        content: "Nunca quemes contraseñas en el JAR. Pasa esos valores al momento de ejecutarlo usando variables externas del servidor.",
                        code: "java -jar app.jar --spring.datasource.password=123"
                    }
                ],
                description: "De tu código al servidor: Formatos de entrega final.",
                syntaxDescription: "Generación del paquete con Maven.",
                code: `// Generar el JAR:
mvn clean package

// Ejecutar el JAR:
java -jar target/mi-proyecto.jar`,
                useCases: [
                    {
                        title: "Automatización con Scripts de Sistema",
                        description: "Configurar un servicio en Linux (Systemd) que ejecute el 'Fat JAR' automáticamente al arrancar el servidor físico, pasando la configuración de producción vía parámetros.",
                        code: "java -jar myapp.jar --spring.profiles.active=prod"
                    }
                ]
            }
        ]
    },
    flashcardsCategory
];
