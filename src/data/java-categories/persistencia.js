export const persistenciaCategory = {
    title: "9. Persistencia de Datos",
    topics: [
        {
            id: "jdbc-intro",
            title: "Introducción a JDBC",
            videoUrl: "https://www.youtube.com/watch?v=qs9VOwgHFp8",
            playlistUrls: [
                "https://www.youtube.com/watch?v=z2uXS61LCao",
                "https://www.youtube.com/watch?v=mD_2C2FCst0",
                "https://www.youtube.com/watch?v=E3SBwY9xG-Y"
            ],
            content: [
                {
                    title: "¿Qué es JDBC?",
                    text: "Java Database Connectivity es la API estándar de Java para conectar aplicaciones con bases de datos relacionales (MySQL, PostgreSQL, Oracle, etc.)."
                },
                {
                    title: "Componentes Clave",
                    text: "• **Driver**: El traductor específico para cada base de datos.\n• **Connection**: El túnel abierto hacia la base de datos.\n• **Statement**: La orden SQL que enviamos.\n• **ResultSet**: La tabla de resultados que recibimos."
                }
            ],
            description: "Conexión base a bases de datos relacionales.",
            code: `// Ejemplo de conexión básica
String url = "jdbc:mysql://localhost:3306/mi_bd";
try (Connection conn = DriverManager.getConnection(url, "user", "pass")) {
    System.out.println("¡Conectado!");
}`,
            syntaxDescription: "Es como el sistema de tuberías de una casa. JDBC es el estándar de roscas y grifos. No importa si el agua viene de un pozo (MySQL) o de la red pública (PostgreSQL), si usas JDBC, puedes conectar tus grifos de la misma manera.",
            useCases: [
                {
                    title: "Carga de Driver",
                    description: "En versiones modernas de Java, el driver se carga automáticamente si está en el classpath.",
                    code: "// Class.forName(\"com.mysql.cj.jdbc.Driver\"); // Ya no es estrictamente necesario"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Try-with-resources",
                    content: "Usa siempre try-with-resources para cerrar la conexión automáticamente, evitando fugas de memoria y bloqueos en la base de datos.",
                    code: "try (Connection c = ...) { ... }"
                }
            ]
        },
        {
            id: "crud-jdbc",
            title: "Operaciones CRUD con JDBC",
            videoUrl: "https://www.youtube.com/watch?v=WVW93RKY2K8",
            playlistUrls: [
                "https://www.youtube.com/watch?v=bvO9vShOQq8",
                "https://www.youtube.com/watch?v=eGkBFCKiuL8",
                "https://www.youtube.com/watch?v=Pi5CAjPK_jk",
                "https://www.youtube.com/watch?v=x-NlcC130uU",
                "https://www.youtube.com/watch?v=GMJu_ItbOU8",
                "https://www.youtube.com/watch?v=WpLvLoR2iiM"
            ],
            content: [
                {
                    title: "¿Qué es CRUD?",
                    text: "Create (Insertar), Read (Leer), Update (Actualizar) y Delete (Borrar). Son las cuatro operaciones básicas de persistencia."
                }
            ],
            description: "Manipulación de datos en la base de datos.",
            code: `// Ejemplo INSERT
String sql = "INSERT INTO usuarios (nombre) VALUES (?)";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, "Juan");
    pstmt.executeUpdate();
}`,
            syntaxDescription: "Es como gestionar un archivador. CRUD son las acciones: meter una ficha nueva (Create), buscar una ficha (Read), tachar datos y escribir otros (Update) o tirar la ficha a la basura (Delete).",
            useCases: [
                {
                    title: "PreparedStatement",
                    description: "Usa SIEMPRE PreparedStatement para evitar ataques de SQL Injection.",
                    code: `String sql = "SELECT * FROM users WHERE id = ?";
pstmt.setInt(1, idUsuario);`
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "SQL Injection",
                    content: "Nunca concatenes Strings para crear queries SQL. Un usuario malintencionado podría borrar toda tu base de datos.",
                    code: "// ❌ NO: \"WHERE id = \" + id\n// ✅ SI: \"WHERE id = ?\""
                }
            ]
        },
        {
            id: "api-rest-java",
            title: "Consumo de APIs REST",
            videoUrl: "https://www.youtube.com/watch?v=qXhzmLxE8Dw",
            playlistUrls: [
                "https://www.youtube.com/watch?v=YPelv58JCfg",
                "https://www.youtube.com/watch?v=MhKl8jI7n-I",
                "https://www.youtube.com/watch?v=SVthwdsIaVQ",
                "https://www.youtube.com/watch?v=srjI8XN2hEo",
                "https://www.youtube.com/watch?v=StVXy_3lHnI",
                "https://www.youtube.com/watch?v=aRTQXYlTGKY",
                "https://www.youtube.com/watch?v=kVam04y9a7Y",
                "https://www.youtube.com/watch?v=W3rxlSDAchs"
            ],
            content: [
                {
                    title: "¿Qué es una API REST?",
                    text: "Un servicio web que permite a aplicaciones comunicarse entre sí usando el protocolo HTTP. Java puede enviar peticiones GET, POST, PUT y DELETE para obtener o enviar datos."
                }
            ],
            description: "Comunicación con servicios externos.",
            code: `// HttpClient (Java 11+)
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.ejemplo.com/datos"))
    .build();
    
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
            syntaxDescription: "Es como pedir comida por teléfono. Tú (el cliente) haces una llamada (Petición HTTP), dices qué quieres (GET/POST) y a qué dirección. El restaurante (Servidor API) te prepara el pedido y te lo envía de vuelta (Respuesta JSON).",
            useCases: [
                {
                    title: "Manejo de JSON",
                    description: "Uso de librerías como Jackson o Gson para convertir el texto de la API en objetos Java.",
                    code: "User user = objectMapper.readValue(jsonResponse, User.class);"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Códigos de Estado",
                    content: "Aprende los códigos básicos: 200 (OK), 404 (No encontrado), 500 (Error de servidor). Te ahorrarán horas de debugging.",
                    code: "if (response.statusCode() == 200) { ... }"
                }
            ]
        }
    ]
};
