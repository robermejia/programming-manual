
export const componentsCategory = {
  title: "1. Componentes",
  topics: [
    {
      id: "functional-components",
      title: "Componentes Funcionales",
      content: [
        {
          title: "¿Qué son?",
          text: "Los Componentes Funcionales son, fundamentalmente, funciones de JavaScript que aceptan datos arbitrarios (llamados 'props') y retornan elementos de React (JSX) que describen lo que debe aparecer en la pantalla. Imagínalos como piezas de LEGO personalizadas: cada una encapsula su propia apariencia y lógica."
        },
        {
          title: "¿Por qué son importantes?",
          text: "Representan el estándar moderno de React. Su simplicidad elimina la verbosidad de las antiguas clases, facilitando la lectura, el testing y, sobre todo, la reutilización de lógica mediante Hooks."
        },
        {
          title: "¿Cuándo usarlos?",
          text: "Siempre. Úsalos por defecto para construir cualquier parte de tu interfaz, desde botones atómicos hasta páginas complejas."
        },
        {
          title: "JavaScript vs TypeScript",
          text: "TypeScript añade una capa vital de seguridad: valida que las 'props' que pasas sean exactamente las que el componente espera, previniendo errores de 'undefined' antes de ejecutar el código."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Piensa en la UI como una función pura de tus datos: Vista = f(Datos). Si los datos son los mismos, la vista debería ser idéntica.",
          code: "// Si props cambia, la UI se actualiza automáticamente\nconst element = <Welcome name=\"Sara\" />;"
        },
        {
          type: "error",
          title: "Error común",
          content: "Definir componentes dentro de otros componentes. Esto causa re-renderizados lentos y pérdida de foco en inputs. Decláralos siempre en el nivel superior del módulo.",
          code: "// MAL ❌\nfunction Padre() {\n  // Se crea una nueva función 'Hijo' en cada render\n  function Hijo() { return <p>Hola</p>; }\n  return <Hijo />;\n}\n\n// BIEN ✅\nfunction Hijo() { return <p>Hola</p>; }\nfunction Padre() { return <Hijo />; }"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Mantén tus componentes pequeños y enfocados en una sola responsabilidad (Principio de Responsabilidad Única).",
          code: "// MAL: Un componente 'Dios'\nfunction Page() { /* 500 líneas de header, sidebar, feed... */ }\n\n// BIEN: Composición\nfunction Page() {\n  return <Layout><Sidebar /><Feed /></Layout>;\n}"
        }
      ],
      description: "Bloques de construcción fundamentales que transforman datos en interfaz.",
      codeJs: `// JavaScript
// Contexto: Una tarjeta de producto en un E-commerce

function ProductCard({ title, price, inStock }) {
      // Lógica de presentación simple y directa
      const statusColor = inStock ? 'green' : 'red';

      return (
        <div className="card">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-600">\${price.toFixed(2)}</p>

          {/* Renderizado condicional legible */}
          <span style={{ color: statusColor }}>
            {inStock ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      );
    }

// Arrow function syntax (muy común en equipos modernos)
const Header = ({ user }) => (
    <header>Hola, {user.name}</header>
  );`,
      codeTs: `// TypeScript
// Contexto: Tipado estricto para prevenir errores de precio o nulos

interface ProductProps {
  title: string;
  price: number;     // Evita pasar strings como "20.5"
  inStock: boolean;
  tags?: string[];   // Prop opcional
}

// React.FC es opcional, pero explícito sobre el retorno
export const ProductCard = ({ title, price, inStock }: ProductProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>\${price.toFixed(2)}</p>
      {inStock ? <button>Comprar</button> : <span>Sin Stock</span>}
    </div>
  );
}; `,
      syntaxDescription: "Imagina que un componente es una fábrica de sellos. Las 'props' son el diseño que le entregas (color, texto), y el 'retorno' es el sello estampado en el papel (la pantalla). Tú le das datos, y él te devuelve interfaz.",
      useCases: [
        {
          title: "Botón de Sistema de Diseño",
          description: "Componente base altamente reutilizable con variantes visuales.",
          codeJs: `// JavaScript
// Un botón flexible que se adapta a diferentes contextos (acción primaria o secundaria)

function Button({ label, onClick, variant = 'primary', disabled = false }) {
  // Clases dinámicas basadas en props
  const baseClass = "px-4 py-2 rounded transition-colors";
  const variantClass = variant === 'primary'
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button
      className={\`\${baseClass} \${variantClass}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}`,
          codeTs: `// TypeScript
// Definimos un conjunto cerrado de variantes permitidas
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant; // Opcional, tiene valor por defecto
  disabled?: boolean;
}

const Button = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}: ButtonProps) => {
  return (
    <button className={\`btn-base btn-\${variant}\`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};`
        }
      ]
    }
  ]
};
