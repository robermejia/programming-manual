
export const contextRefsCategory = {
  title: "6. Context & Refs",
  topics: [
    {
      id: "create-context",
      title: "createContext",
      content: [
        {
          title: "¿Qué es?",
          text: "Context es la solución nativa de React para compartir datos entre componentes que no tienen una relación directa padre-hijo, evitando el tedioso 'prop drilling' (pasar props capa por capa). createContext define el objeto de contexto y un componente 'Provider' que envuelve la parte del árbol donde los datos deben estar disponibles."
        },
        {
          title: "¿Por qué es importante?",
          text: "En aplicaciones grandes, pasar props capa por capa ensucia el código. Context limpia tu árbol de componentes al permitir que los datos 'salten' niveles, facilitando el mantenimiento."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Es fundamental para datos globales como el usuario autenticado, el tema visual (oscuro/claro) o la configuración de idioma."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Piensa en Context como 'Inyección de Dependencias' o variables globales para un sub-árbol de componentes.",
          code: "// Proveedor en la raíz, consumidor en la hoja\n<AuthProvider>\n  <UserProfile /> {/* Usa useAuth() internamente */}\n</AuthProvider>"
        },
        {
          type: "error",
          title: "Error común",
          content: "Usar Context para evitar pasar props solo un nivel. Si la relación es directa (Padre -> Hijo), las props son más explícitas y mejores.",
          code: "// ❌ Excesivo\n<Context.Provider value={color}><Button /></Context.Provider>\n\n// ✅ Mejor\n<Button color={color} />"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Divide el estado. En lugar de un gran 'AppContext', usa contextos específicos (`AuthContext`, `ThemeContext`) para evitar que todo se re-renderice cuando algo cambia.",
          code: "// ❌ Si cambia theme, el usuario se re-renderiza innecesariamente\nconst AppContext = createContext({ user, theme });\n\n// ✅ Separación de intereses\nconst AuthContext = createContext(user);\nconst ThemeContext = createContext(theme);"
        }
      ],
      description: "Crear contexto.",
      codeJs: `// JavaScript
import { createContext } from 'react';

const MiContexto = createContext(valorDefault);

function Provider({ children }) {
  return <MiContexto.Provider value={valor}>{children}</MiContexto.Provider>;
}`,
      codeTs: `// TypeScript
import { createContext, ReactNode } from 'react';

interface ContextType {
  valor: string;
}

const MiContexto = createContext<ContextType>({ valor: 'default' });

function Provider({ children }: { children: ReactNode }): JSX.Element {
  return <MiContexto.Provider value={{ valor: 'actual' }}>{children}</MiContexto.Provider>;
}`,
      syntaxDescription: "Imagina que el `Context` es una señal de WiFi. El `createContext` es el router. El `Provider` es la antena que emite la señal. Cualquiera que esté dentro del rango (componentes hijos) y tenga la contraseña (useContext) puede conectarse y recibir datos.",
      useCases: [
        {
          title: "Gestión de Usuario Global",
          description: "Compartir el estado de autenticación a toda la app.",
          codeJs: `// JavaScript
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simular checkeo de sesión al inicio
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) setUser(JSON.parse(session));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}`,
          codeTs: `// TypeScript
import { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}`
        }
      ]
    },
    {
      id: "forward-ref",
      title: "forwardRef",
      content: [
        {
          title: "¿Qué es?",
          text: "Por defecto, no puedes pasar una referencia (ref) a un componente funcional. forwardRef es una utilidad que permite a un componente recibir una ref de su padre y 'reenviarla' a un hijo (generalmente un elemento DOM)."
        },
        {
          title: "¿Por qué es importante?",
          text: "Es esencial para construir componentes reutilizables (Inputs, Botones) que necesitan comportarse como elementos nativos, permitiendo controlar el foco, la selección de texto o las animaciones desde fuera."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Cuando necesitas exponer el nodo DOM subyacente de tu componente personalizado al padre (ej. para llamar a .focus() en un input custom)."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Rompe la encapsulación del componente para exponer su DOM interno al padre.",
          code: "// Permite que el padre haga focus()\nconst FancyInput = forwardRef((props, ref) => <input ref={ref} />);"
        },
        {
          type: "error",
          title: "Error común",
          content: "Olvidar asignar la `ref` recibida al elemento DOM interno. Si no la pasas, el padre recibirá `null`.",
          code: "const Input = forwardRef((props, ref) => {\n  // ❌ Si olvidas `ref={ref}`, no funciona\n  return <input {...props} />;\n});"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Usa `useImperativeHandle` si quieres limitar lo que el padre puede hacer con la ref (ej. solo permitir `focus()` y no acceso total al DOM).",
          code: "useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current.focus(),\n  // No expone .style, .value, etc\n}));"
        }
      ],
      description: "Pasar refs (forwarding).",
      codeJs: `// JavaScript
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});`,
      codeTs: `// TypeScript
import { forwardRef } from 'react';

interface Props {
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
});`,
      syntaxDescription: "Es como instalar un tubo de comunicación entre el capitán del barco (padre) y la sala de máquinas (hijo). Normalmente el capitán no puede tocar los motores directamente, pero con `forwardRef`, el hijo le da permiso explícito para conectar ese tubo y controlar algo interno.",
      useCases: [
        {
          title: "Input Personalizado Enfocable",
          description: "Componente Input custom que permite ser enfocado desde el padre.",
          codeJs: `// JavaScript
import { forwardRef, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  return (
    <div className="custom-input-wrapper">
      <span className="icon">🔍</span>
      <input ref={ref} className="styled-input" {...props} />
    </div>
  );
});

// Componente Padre
function Parent() {
  const inputRef = useRef(null);

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Buscar..." />
      <button onClick={() => inputRef.current.focus()}>
        Enfocar Buscador
      </button>
    </div>
  );
}`,
          codeTs: `// TypeScript
import { forwardRef, useRef } from 'react';

interface InputProps {
  placeholder: string;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="wrapper">
      <input ref={ref} {...props} />
    </div>
  );
});

function Parent() {
  const ref = useRef<HTMLInputElement>(null);
  return <CustomInput ref={ref} placeholder="Test" />;
}`
        }
      ]
    }
  ]
};
