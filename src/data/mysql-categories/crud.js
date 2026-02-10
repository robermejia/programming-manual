export const crudCategory = {
    title: "3. Manipulación de Datos (CRUD)",
    topics: [
        {
            id: "mysql-crud-insert",
            title: "Insertar (INSERT)",
            videoUrl: "https://www.youtube.com/watch?v=pqi9Ov6nc9Y",
            content: [
                { title: "¿Qué es?", text: "El comando INSERT se utiliza para agregar uno o más registros nuevos a una tabla." },
                { title: "Múltiples Registros", videoUrl: "https://www.youtube.com/watch?v=PC6Y_2AjsZQ", text: "Es posible insertar varias filas en una sola sentencia, lo cual es mucho más eficiente para el servidor." }
            ],
            syntaxDescription: "El comando para poblar tus tablas con información.",
            description: "Creación de registros.",
            code: `INSERT INTO usuarios (nombre, edad) VALUES ('Ana', 25);
INSERT INTO usuarios (nombre, edad) VALUES ('Luis', 30), ('Carlos', 22);`,
            useCases: [
                {
                    title: "Batch Loading",
                    description: "Insertar cientos de registros en una sola transacción para mejorar performance."
                }
            ]
        },
        {
            id: "mysql-run-scripts",
            title: "Ejecución de Scripts SQL",
            videoUrl: "https://www.youtube.com/watch?v=O5bCapbBZ1o",
            content: [
                {
                    title: "Automatización",
                    text: "En lugar de escribir comando por comando, puedes guardar tus sentencias en un archivo `.sql` y ejecutarlas masivamente usando el comando `source` o redirección de shell."
                }
            ],
            description: "Cómo correr archivos completos de bases de datos.",
            code: "source c:/scripts/dump.sql;\nmysql -u root -p db < script.sql",
            useCases: [
                {
                    title: "Despliegue de DB",
                    description: "Correr un script de creación de tablas y datos iniciales en un servidor nuevo."
                }
            ]
        },
        {
            id: "mysql-crud-select",
            title: "Consultar (SELECT)",
            videoUrl: "https://www.youtube.com/watch?v=ml6EM1sYGno",
            content: [
                { title: "¿Qué es?", text: "Permite recuperar datos de una o más tablas basándose en criterios específicos." },
                { title: "Consultas Rápidas", text: "Uso de `LIMIT`, `OFFSET` y selección de columnas específicas para obtener datos de forma veloz." }
            ],
            description: "Lectura de datos.",
            code: "SELECT nombre FROM usuarios LIMIT 5;",
            useCases: [
                {
                    title: "Reportes",
                    description: "Obtener una lista de los últimos 10 usuarios registrados."
                }
            ]
        },
        {
            id: "mysql-crud-where",
            title: "Filtrar (WHERE)",
            videoUrl: "https://www.youtube.com/watch?v=ZtVoLRDB0kU",
            content: [
                { title: "Condicionamiento", text: "El WHERE es el filtro fundamental. Permite actuar solo sobre los registros que nos interesan." },
                { title: "Condiciones Avanzadas", videoUrl: "https://www.youtube.com/watch?v=YuspzqAVlB0", text: "Combinación de operadores para búsquedas más precisas." }
            ],
            description: "Condiciones de búsqueda.",
            code: "SELECT * FROM productos WHERE stock > 0;",
            useCases: [
                {
                    title: "Búsqueda por ID",
                    description: "Encontrar un registro específico usando su clave primaria."
                }
            ]
        },
        {
            id: "mysql-logic-ops",
            title: "Operadores Lógicos",
            videoUrl: "https://www.youtube.com/watch?v=2Xd76Va3g3c",
            content: [
                {
                    title: "AND, OR, NOT",
                    text: "Permiten combinar múltiples condiciones en un mismo WHERE. Por ejemplo: traer productos que sean 'Electrónica' Y tengan un precio mayor a 100."
                }
            ],
            description: "Complejidad en los filtros de búsqueda.",
            code: "WHERE precio > 100 AND categoria = 'PC';",
            useCases: [
                {
                    title: "Filtros de Búsqueda",
                    description: "Implementar barras de búsqueda con múltiples criterios (categoría, rango precio, marca)."
                }
            ]
        },
        {
            id: "mysql-execution-cycle",
            title: "Ciclo de Vida de una Sentencia",
            videoUrl: "https://www.youtube.com/watch?v=E54c9TQUDUk",
            content: [
                {
                    title: "¿Cómo se ejecuta?",
                    text: "Entender cómo MySQL procesa una query (Análisis -> Optimización -> Ejecución) nos permite escribir mejor código SQL y entender el impacto en el servidor."
                }
            ],
            description: "Funcionamiento interno del motor MySQL.",
            code: "EXPLAIN SELECT * FROM usuarios;",
            useCases: [
                {
                    title: "Performance Tuning",
                    description: "Usar EXPLAIN para ver por qué una consulta está tardando demasiado."
                }
            ]
        },
        {
            id: "mysql-crud-update",
            title: "Actualizar (UPDATE)",
            content: [
                { title: "¿Qué es?", text: "Comando para modificar valores de registros existentes en una tabla." }
            ],
            description: "Modificación de registros.",
            code: "UPDATE usuarios SET nombre = 'Juan' WHERE id = 1;",
            useCases: [
                {
                    title: "Edición de Perfil",
                    description: "Actualizar los datos de un usuario en la plataforma."
                }
            ]
        },
        {
            id: "mysql-crud-delete",
            title: "Eliminar (DELETE)",
            content: [
                { title: "¿Qué es?", text: "Comando para borrar registros de una tabla." },
                { title: "Precaución", text: "Úsalo con extrema precaución. En sistemas modernos, se prefiere el 'Soft Delete' para no perder histórico." }
            ],
            description: "Borrado de datos.",
            code: "DELETE FROM usuarios WHERE id = 99;",
            useCases: [
                {
                    title: "Limpieza",
                    description: "Eliminar registros obsoletos."
                }
            ]
        }
    ]
};
