export const vocabularyCategory = {
    title: "0. Vocabulario de TypeScript",
    topics: [
        {
            id: "ts-vocab-a-c",
            title: "Glosario A - C",
            description: "Conceptos desde aserciones hasta clases y abstracción.",
            content: [
                { title: "abstract", text: "Modificador para clases y métodos que no tienen implementación completa." },
                { title: "any", text: "Tipo que permite cualquier valor, desactivando la comprobación de tipos (usar con precaución)." },
                { title: "Array", text: "Lista ordenada de elementos del mismo tipo." },
                { title: "Assertion (as)", text: "Mecanismo para indicar a TypeScript que trate un valor como un tipo específico." },
                { title: "async / await", text: "Sintaxis para manejar operaciones asíncronas de forma legible." },
                { title: "Awaited", text: "Utility type que desenvuelve tipos de promesas anidadas." },
                { title: "bigint", text: "Tipo primitivo para números enteros de precisión arbitraria." },
                { title: "boolean", text: "Tipo lógico con valores true o false." },
                { title: "Bounded Type Parameter", text: "Restricción en un tipo genérico (usando extends)." },
                { title: "class", text: "Plantilla para crear objetos con propiedades y métodos definidos." },
                { title: "Conditional Types", text: "Tipos que seleccionan otro tipo basándose en una condición lógica." },
                { title: "const", text: "Variable de solo lectura con alcance de bloque." }
            ]
        },
        {
            id: "ts-vocab-d-h",
            title: "Glosario D - H",
            description: "Conceptos sobre decoradores, enums y el corazón de TypeScript.",
            content: [
                { title: "Decorator", text: "Función especial que añade metadatos o modifica clases, métodos y propiedades." },
                { title: "default", text: "Exportación principal de un módulo." },
                { title: "Destructuring", text: "Sintaxis para extraer valores de arrays u objetos de forma limpia." },
                { title: "Discriminated Union", text: "Patrón de unión con una propiedad común (tag) para facilitar el narrowing." },
                { title: "Disposable", text: "Interfaz para objetos que requieren limpieza manual de recursos." },
                { title: "enum", text: "Conjunto de constantes nombradas, numéricas o de string." },
                { title: "export / import", text: "Sistema de módulos ES6 para organizar el código." },
                { title: "extends", text: "Palabra clave para herencia de clases o extensión de interfaces." },
                { title: "Function Overloading", text: "Múltiples firmas para una misma función según sus parámetros." },
                { title: "Generics", text: "Componentes reutilizables que trabajan con diversos tipos manteniendo la seguridad." }
            ]
        },
        {
            id: "ts-vocab-i-p",
            title: "Glosario I - P",
            description: "Interfaces, literales, módulos y tipos mapeados.",
            content: [
                { title: "interface", text: "Define la estructura o 'contrato' que un objeto debe cumplir." },
                { title: "Intersection Type (&)", text: "Combina múltiples tipos en uno solo que debe cumplir todas las reglas." },
                { title: "keyof", text: "Operador que obtiene las claves de un tipo como una unión de literales." },
                { title: "Literal Type", text: "Tipo que representa un valor exacto (ej: 'éxito' | 'error')." },
                { title: "Mapped Types", text: "Crea nuevos tipos transformando cada propiedad de uno existente." },
                { title: "module", text: "Unidad de código encapsulada que exporta sus funcionalidades." },
                { title: "Narrowing", text: "Proceso de refinar un tipo ancho a uno más específico mediante lógica." },
                { title: "never", text: "Representa el tipo de valores que nunca deberían ocurrir." },
                { title: "null / undefined", text: "Tipos primitivos que representan ausencia de valor." },
                { title: "number", text: "Tipo para todos los valores numéricos." },
                { title: "Partial", text: "Utility type que hace todas las propiedades de un tipo opcionales." },
                { title: "Pick / Omit", text: "Utility types para seleccionar o excluir propiedades específicas." },
                { title: "private / protected / public", text: "Modificadores de acceso para miembros de una clase." },
                { title: "Promise", text: "Representa el resultado final de una operación asíncrona." }
            ]
        },
        {
            id: "ts-vocab-q-s",
            title: "Glosario Q - S",
            description: "Calificadores, tuplas y tipos de utilidad.",
            content: [
                { title: "readonly", text: "Modificador que impide que una propiedad sea reasignada tras su creación." },
                { title: "Record", text: "Utility type para construir objetos con claves y valores específicos." },
                { title: "Required", text: "Utility type que obliga a que todas las propiedades sean obligatorias." },
                { title: "ReturnType", text: "Obtiene el tipo de retorno de una función." },
                { title: "satisfies", text: "Valida la estructura de un valor contra un tipo sin cambiar su inferencia." },
                { title: "static", text: "Miembros que pertenecen a la clase y no a las instancias individuales." },
                { title: "string", text: "Tipo para cadenas de texto." },
                { title: "symbol", text: "Tipo primitivo para identificadores únicos." }
            ]
        },
        {
            id: "ts-vocab-t-z",
            title: "Glosario T - Z",
            description: "Uniones, utilidades y configuración final.",
            content: [
                { title: "Template Literal Type", text: "Tipos construidos dinámicamente usando plantillas de strings." },
                { title: "this", text: "Referencia al contexto de ejecución actual." },
                { title: "Tuple", text: "Array con un número fijo de elementos y tipos conocidos en cada posición." },
                { title: "type", text: "Define un alias para cualquier tipo de dato o combinación de estos." },
                { title: "Type Assertion", text: "Indica explícitamente al compilador el tipo de un valor." },
                { title: "Type Guard", text: "Funciones o expresiones que permiten refinar tipos en el flujo de control." },
                { title: "Union Type (|)", text: "Permite que un valor sea uno de varios tipos posibles." },
                { title: "unknown", text: "Versión segura de 'any' que obliga a realizar comprobaciones antes de su uso." },
                { title: "Utility Types", text: "Tipos globales que facilitan transformaciones comunes de tipos." },
                { title: "void", text: "Indica que una función no retorna ningún valor." }
            ]
        }
    ]
};
