
export const portalsCategory = {
  title: "8. Portals",
  topics: [
    {
      id: "portals",
      title: "Portals",
      content: [
        {
          title: "¿Qué es?",
          text: "Los Portales proporcionan una forma de renderizar hijos en un nodo del DOM que existe fuera de la jerarquía del componente padre (ej. en `document.body`)."
        },
        {
          title: "¿Por qué es importante?",
          text: "Garantiza que elementos flotantes como Modales, Tooltips o Menús no se vean cortados por propiedades CSS como `overflow: hidden` o `z-index` en sus contenedores padres."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Indispensable para Modales, Diálogos, Notificaciones Toast y Tooltips."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Aunque el HTML se renderice lejos, el 'Bubbleo de Eventos' de React sigue funcionando como si fuera un hijo directo. Un click en el portal subirá al padre React.",
          code: "<div onClick={() => console.log('Click detectado')}>\n  {createPortal(<button>Click me</button>, document.body)}\n</div>"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Crea un componente wrapper `<Modal>` reutilizable que maneje la creación del portal internamente.",
          code: "function Modal({ children }) {\n  return createPortal(<div className=\"modal\">{children}</div>, document.body);\n}"
        }
      ],
      description: "Render fuera de DOM.",
      codeJs: `// JavaScript
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}`,
      codeTs: `// TypeScript
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

function Modal({ children }: { children: ReactNode }): JSX.Element {
  return createPortal(
    children,
    document.getElementById('modal-root')!
  );
}`,
      syntaxDescription: "Es como un portal de teletransporte de ciencia ficción. Tu componente está lógicamente en la 'Habitación A' (dentro de un div pequeño), pero visualmente aparece en la 'Habitación B' (el `body` del documento), escapando de las paredes (CSS overflow) de donde fue creado.",
      useCases: [
        {
          title: "Modal de Confirmación",
          description: "Ventana emergente que se superpone a todo el contenido.",
          codeJs: `// JavaScript
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
    document.body // Se renderiza en el body directamente
  );
}

// Uso
function App() {
  const [show, setShow] = useState(false);
  
  return (
    <div className="overflow-hidden-container">
      <button onClick={() => setShow(true)}>Abrir Modal</button>
      
      {/* Aunque el padre tenga overflow:hidden, el modal se ve completo */}
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <h2>¡Importante!</h2>
        <p>Este modal flota sobre todo lo demás.</p>
      </Modal>
    </div>
  );
}`,
          codeTs: `// TypeScript
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <button onClick={onClose}>X</button>
      {children}
    </div>,
    document.body
  );
}`
        }
      ]
    }
  ]
};
