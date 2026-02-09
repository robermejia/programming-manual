export const ddlCategory = {
    title: "2. Definición de Datos (DDL)",
    topics: [
        {
            id: "mysql-ddl-types",
            title: "Tipos de Datos",
            content: [
                { title: "¿Qué es?", text: "Son las definiciones que indican qué clase de información (números, texto, fechas) puede almacenar una columna. MySQL ofrece una gran variedad como INT, VARCHAR, DATETIME o JSON." },
                { title: "¿Por qué es importante?", text: "Elegir el tipo correcto ahorra espacio en disco y asegura la integridad de los datos (no puedes guardar 'hola' en una columna numérica)." },
                { title: "¿Qué problema real resuelve?", text: "Evita la corrupción de datos y optimiza el rendimiento de las búsquedas y cálculos." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre. Cada columna debe tener el tipo más estricto y ligero posible (ej. TINYINT para valores pequeños)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Comprensión básica de la diferencia entre texto, números y fechas." }
            ],
            syntaxDescription: "Los tipos de datos son los moldes que definen qué clase de información puede contener cada columna, asegurando la integridad y optimizando el almacenamiento.",
            description: "Clasificación de los datos soportados.",
            code: `INT, TINYINT, BIGINT
DECIMAL(10, 2) -- Para dinero
VARCHAR(100)   -- Texto variable
DATE, DATETIME -- Fechas
JSON           -- Documentos`,
            useCases: [
                {
                    title: "Dinero",
                    description: "Usar DECIMAL(10,2) para precios evita errores de redondeo de punto flotante.",
                    code: "precio DECIMAL(10, 2)"
                },
                {
                    title: "Estados",
                    description: "Usar ENUM para limitar una columna a valores específicos.",
                    code: "estado ENUM('activo', 'inactivo', 'pendiente')"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Usa el tamaño justo",
                    content: "No uses INT (4 bytes) para una columna de 'estado' que solo tiene 3 valores. Usa TINYINT (1 byte). En millones de filas, la diferencia es gigante.",
                    code: "TINYINT UNSIGNED -- 0 a 255"
                },
                {
                    type: "error",
                    title: "Dinero en FLOAT/DOUBLE",
                    content: "Nunca guardes dinero en tipos de punto flotante porque tienen errores de precisión. Usa siempre DECIMAL.",
                    code: "precio FLOAT; -- ❌ 19.9999999\nprecio DECIMAL(10,2); -- ✅ 20.00"
                }
            ]
        },
        {
            id: "mysql-ddl-db",
            title: "Bases de Datos",
            content: [
                { title: "¿Qué es?", text: "Es el contenedor principal (namespace) que agrupa un conjunto de tablas y objetos relacionados con una aplicación o sistema específico." },
                { title: "¿Por qué es importante?", text: "Permite aislar los datos de diferentes aplicaciones en el mismo servidor, facilitando la gestión, seguridad y backups." },
                { title: "¿Qué problema real resuelve?", text: "Organización. Sin bases de datos, todas las tablas de todos los sistemas estarían mezcladas." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Crea una base de datos nueva para cada proyecto o microservicio independiente." },
                { title: "¿Qué conocimientos previos requiere?", text: "Ninguno, es el primer paso." }
            ],
            syntaxDescription: "Comandos para gestionar el contenedor principal de tus tablas y datos.",
            description: "Gestión de bases de datos.",
            code: `CREATE DATABASE IF NOT EXISTS tienda CHARACTER SET utf8mb4;
USE tienda;
DROP DATABASE IF EXISTS prueba;`,
            useCases: [
                {
                    title: "Inicialización",
                    description: "Script seguro para crear una BD solo si no existe y configurar UTF-8.",
                    code: "CREATE DATABASE IF NOT EXISTS mi_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Siempre UTF-8",
                    content: "Usa siempre `utf8mb4` para soportar todos los caracteres (incluyendo emojis). El `utf8` antiguo de MySQL está incompleto.",
                    code: "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
                },
                {
                    type: "idea",
                    title: "Nombres snake_case",
                    content: "Usa minúsculas y guiones bajos para nombres de BD para prevenir problemas entre Windows (case-insensitive) y Linux (case-sensitive).",
                    code: "CREATE DATABASE mi_tienda; -- ✅\nCREATE DATABASE MiTienda;  -- ❌"
                }
            ]
        },
        {
            id: "mysql-ddl-tables",
            title: "Tablas Completas",
            content: [
                { title: "¿Qué es?", text: "Es la estructura fundamental donde se almacenan los datos. Crear una tabla bien definida es clave para una base de datos eficiente." },
                { title: "Tipos de Datos Comunes", text: "Al crear una tabla, debes definir el tipo de dato para cada columna:\n• INT / BIGINT: Números enteros (IDs, contadores).\n• VARCHAR(n): Texto de longitud variable (Nombres, Emails).\n• DECIMAL(p,s): Números exactos para dinero.\n• ENUM: Lista predefinida de valores ('Activo', 'Inactivo').\n• DATETIME / TIMESTAMP: Fechas y horas.\n• BOOLEAN: Verdadero/Falso (TINYINT 1)." },
                { title: "Llaves y Restricciones", text: "• PRIMARY KEY: Identificador único de cada fila.\n• AUTO_INCREMENT: Genera números secuenciales automáticamente.\n• FOREIGN KEY: Conecta esta tabla con otra (Relación).\n• NOT NULL: Obliga a que el campo tenga valor.\n• UNIQUE: Evita duplicados en esa columna." },
                { title: "¿Por qué es importante?", text: "Una tabla bien diseñada con los tipos correctos y relaciones claras asegura la integridad de los datos y facilita las consultas complejas." }
            ],
            syntaxDescription: "Sintaxis completa para crear tablas con relaciones y diversos tipos de datos.",
            description: "Creación avanzada de tablas.",
            code: `CREATE TABLE productos (
    -- ID autoincremental principal
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Texto variable, obligatorio
    nombre VARCHAR(150) NOT NULL,
    
    -- Texto largo opcional para descripciones
    descripcion TEXT,
    
    -- Decimal para dinero (10 dígitos en total, 2 decimales)
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    
    -- Categoría limitada a valores específicos
    categoria ENUM('Electrónica', 'Ropa', 'Hogar') DEFAULT 'Hogar',
    
    -- Booleano para estado (equivale a TINYINT 1)
    esta_disponible BOOLEAN DEFAULT TRUE,
    
    -- Fechas automáticas
    creado_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Llave foránea (Relación con tabla 'proveedores')
    proveedor_id INT UNSIGNED,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
        ON DELETE SET NULL -- Si se borra el proveedor, queda NULL aquí
);`,
            useCases: [
                {
                    title: "Relación Uno a Muchos",
                    description: "Ejemplo clásico: Un usuario tiene muchos pedidos. La tabla 'pedidos' lleva la FK.",
                    code: `CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);`
                },
                {
                    title: "Tabla Intermedia (Muchos a Muchos)",
                    description: "Para relacionar Estudiantes y Cursos, necesitamos una tabla extra.",
                    code: `CREATE TABLE estudiantes_cursos (
    estudiante_id INT,
    curso_id INT,
    PRIMARY KEY (estudiante_id, curso_id), -- Llave compuesta
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);`
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Usa BIGINT para IDs",
                    content: "Si esperas millones de registros, INT podría quedarse corto (max 2 mil millones). BIGINT es más seguro para el futuro.",
                    code: "id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY"
                },
                {
                    type: "recommendation",
                    title: "Foreign Keys Nombradas",
                    content: "Es buena práctica dar nombre a las restricciones para facilitar el mantenimiento.",
                    code: "CONSTRAINT fk_producto_proveedor FOREIGN KEY (proveedor_id)..."
                }
            ]
        },
        {
            id: "mysql-ddl-alter",
            title: "Modificar Tablas",
            content: [
                { title: "¿Qué es?", text: "El comando ALTER TABLE permite cambiar la estructura de una tabla existente (añadir columnas, cambiar tipos, borrar claves) sin perder los datos." },
                { title: "¿Por qué es importante?", text: "Las aplicaciones evolucionan y los requisitos cambian. ALTER permite adaptar la base de datos a estos cambios." },
                { title: "¿Qué problema real resuelve?", text: "Evita tener que borrar la tabla y volver a crearla (y perder los datos) cada vez que necesitas un campo nuevo." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo en migraciones de esquema. Evita hacerlo en tablas gigantes en horas pico (puede bloquear la tabla)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Entender la estructura actual de la tabla." }
            ],
            syntaxDescription: "Permite evolucionar el esquema de la base de datos sin perder la información ya almacenada.",
            description: "Alteración de estructuras.",
            code: `ALTER TABLE usuarios ADD telefono VARCHAR(20);
ALTER TABLE usuarios MODIFY nombre VARCHAR(150);
ALTER TABLE usuarios CHANGE telefono movil VARCHAR(20);`,
            useCases: [
                {
                    title: "Añadir campo",
                    description: "Agregar una columna de 'activo' a una tabla existente.",
                    code: "ALTER TABLE productos ADD activo BOOLEAN DEFAULT TRUE;"
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Bloqueo de tablas",
                    content: "En tablas grandes, ALTER TABLE puede bloquear la tabla. Considera herramientas como 'pt-online-schema-change' o algoritmos inplace.",
                    code: "ALTER TABLE t ADD c INT, ALGORITHM=INPLACE, LOCK=NONE;"
                },
                {
                    type: "idea",
                    title: "MODIFY vs CHANGE",
                    content: "`MODIFY` sirve cambiar el tipo manteniend el nombre. `CHANGE` permite cambiar también el nombre de la columna.",
                    code: "ALTER TABLE t MODIFY col1 BIGINT;\nALTER TABLE t CHANGE col1 col_nueva BIGINT;"
                }
            ]
        },
        {
            id: "mysql-ddl-constraints",
            title: "Restricciones (Constraints)",
            content: [
                { title: "¿Qué es?", text: "Reglas aplicadas a las columnas para limitar el tipo de datos que pueden introducirse (PK, FK, UNIQUE, CHECK)." },
                { title: "¿Por qué es importante?", text: "Garantiza la calidad y fiabilidad de los datos en la base de datos (Integridad Referencial y de Dominio)." },
                { title: "¿Qué problema real resuelve?", text: "Impide registros huérfanos, duplicados no deseados o valores inválidos (ej. edad negativa)." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Siempre que sea posible. Es mejor que la BD rechace un dato malo a que tu código tenga que validarlo todo." },
                { title: "¿Qué conocimientos previos requiere?", text: "Lógica de conjuntos y relaciones." }
            ],
            syntaxDescription: "Reglas que la base de datos impone para asegurar que la información sea válida y coherente.",
            description: "Integridad de datos.",
            code: `CREATE TABLE pedidos (
    id INT PRIMARY KEY,
    cliente_id INT,
    total DECIMAL(10,2) CHECK (total >= 0),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);`,
            useCases: [
                {
                    title: "Relación Pedido-Cliente",
                    description: "Garantizar que un pedido siempre pertenezca a un cliente válido.",
                    code: "FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE"
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Nombres de Constraints",
                    content: "Pon nombre a tus constraints para facilitar el debug de errores.",
                    code: "CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)"
                },
                {
                    type: "error",
                    title: "Borrado en cascada peligroso",
                    content: "`ON DELETE CASCADE` puede borrar datos masivamente por accidente. `RESTRICT` es más seguro.",
                    code: "ON DELETE RESTRICT -- Error si intentas borrar al padre"
                }
            ]
        },
        {
            id: "mysql-ddl-indexes",
            title: "Índices",
            content: [
                { title: "¿Qué es?", text: "Estructuras de datos (generalmente árboles B-Tree) que mejoran la velocidad de las operaciones de recuperación de datos." },
                { title: "¿Por qué es importante?", text: "Sin índices, MySQL debe escanear toda la tabla para encontrar una fila. Con índices, va directo al dato." },
                { title: "¿Qué problema real resuelve?", text: "Lentitud extrema en consultas sobre tablas grandes." },
                { title: "¿Cuándo conviene usarlo y cuándo no?", text: "Úsalo en columnas que filtras (WHERE) o unes (JOIN) frecuentemente. No indexes todo (ralentiza INSERT/UPDATE)." },
                { title: "¿Qué conocimientos previos requiere?", text: "Cómo funcionan las búsquedas y el costo de escritura." }
            ],
            syntaxDescription: "Son como el índice al final de un libro: permiten encontrar información rápidamente sin tener que leer cada página (fila).",
            description: "Optimización de consultas.",
            code: `CREATE INDEX idx_email ON usuarios(email);
CREATE FULLTEXT INDEX idx_contenido ON articulos(contenido);
DROP INDEX idx_email ON usuarios;`,
            useCases: [
                {
                    title: "Optimizar Búsqueda",
                    description: "Crear un índice en la columna 'email' si se busca frecuentemente por ese campo.",
                    code: "CREATE INDEX idx_usuario_email ON usuarios(email);"
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Índice Compuesto",
                    content: "Si buscas por `nombre` Y `apellido`, crea un solo índice con las dos columnas. El orden importa.",
                    code: "CREATE INDEX idx_completo ON users(nombre, apellido);"
                },
                {
                    type: "error",
                    title: "Demasiados índices",
                    content: "Cada índice ralentiza la escritura (INSERT/UPDATE). No crees índices 'por si acaso'.",
                    code: "-- INSERT es más lento por cada índice extra"
                }
            ]
        }
    ]
};
