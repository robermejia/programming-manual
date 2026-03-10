export const componentsCategory = {
  title: "2. Componentes",
  topics: [
    {
      id: "functional-components",
      title: "Componentes Funcionales",
      videoUrl: "https://www.youtube.com/watch?v=4tjVUswlCss", // 7. Export default vs export const (Contexto componentes)
      content: [
        {
          title: "¿Qué es?",
          text: "Los componentes funcionales son la forma moderna y preferida de construir la interfaz de usuario en React. Son funciones de JavaScript que aceptan 'props' (propiedades) como argumento y devuelven elementos de React que describen lo que debería aparecer en la pantalla."
        },
        {
          title: "¿Por qué son importantes?",
          text: "Son más simples de leer y escribir que los componentes de clase, especialmente con la introducción de los Hooks. Fomentan un código más modular y reutilizable, y son más fáciles de probar."
        },
        {
          title: "¿Cuándo usarlos?",
          text: "Siempre que sea posible. Son el estándar actual para la creación de componentes en React. Solo recurrirías a componentes de clase en casos muy específicos de código legado o si necesitas funcionalidades muy concretas que aún no tienen un equivalente en Hooks (lo cual es raro hoy en día)."
        },
        {
          title: "JavaScript vs TypeScript",
          text: "TypeScript brilla en los componentes funcionales al permitir tipar las 'props' de manera explícita, lo que mejora la autocompletado, la detección de errores en tiempo de desarrollo y la claridad del código."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Un componente funcional es simplemente una función que devuelve JSX. Su nombre debe empezar con mayúscula.",
          code: "function MiComponente() {\n  return <h1>Hola Mundo</h1>;\n}"
        },
        {
          type: "error",
          title: "Error común",
          content: "Olvidar que los componentes funcionales deben ser 'puros' en su renderizado. No deben modificar variables fuera de su scope ni realizar efectos secundarios directamente en el cuerpo de la función (para eso están los Hooks como `useEffect`).",
          code: "// MAL ❌\nfunction BadComponent({ count }) {\n  // Esto es un efecto secundario directo en el render\n  document.title = `Contador: ${count}`;\n  return <h1>{count}</h1>;\n}\n\n// BIEN ✅\nfunction GoodComponent({ count }) {\n  useEffect(() => {\n    document.title = `Contador: ${count}`;\n  }, [count]);\n  return <h1>{count}</h1>;\n}"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Desestructura las props directamente en la firma de la función para mayor claridad y concisión.",
          code: "// MAL\nfunction UserCard(props) {\n  return <div>{props.name}</div>;\n}\n\n// BIEN\nfunction UserCard({ name, age }) {\n  return <div>{name} ({age})</div>;\n}"
        }
      ],
      description: "La forma moderna y preferida de construir la interfaz de usuario en React.",
      codeJs: `// JavaScript
// Contexto: Un componente simple que muestra un saludo
function Saludo({ nombre }) {
  return (
    <div>
      <h1>¡Hola, {nombre}!</h1>
      <p>Bienvenido a tu primer componente funcional.</p>
    </div>
  );
}

// Uso del componente
function App() {
  return (
    <div>
      <Saludo nombre="Mundo" />
      <Saludo nombre="React" />
    </div>
  );
}
`,
      codeTs: `// TypeScript
// Contexto: Un componente tipado que muestra información de usuario
interface UserProps {
  name: string;
  age: number;
  isStudent?: boolean; // Prop opcional
}

function UserProfile({ name, age, isStudent = false }: UserProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Edad: {age}</p>
      {isStudent && <p>Es estudiante</p>}
    </div>
  );
}

// Uso del componente con tipado
function App() {
  return (
    <div>
      <UserProfile name="Ana" age={25} isStudent={true} />
      <UserProfile name="Pedro" age={30} /> {/* isStudent es opcional */}
    </div>
  );
}
`,
      syntaxDescription: "Imagina un componente funcional como una pequeña máquina de hacer sándwiches. Le das ingredientes (props) y ella te devuelve un sándwich listo (JSX). No guarda los ingredientes para después, ni cambia la cocina mientras trabaja; solo hace su sándwich y lo entrega.",
      useCases: [
        {
          title: "Componentes de Presentación (Dumb Components)",
          description: "Componentes que solo reciben props y renderizan UI, sin lógica de estado interna.",
          codeJs: `// JavaScript
function Button({ onClick, label }) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

function App() {
  const handleClick = () => alert('Botón clickeado!');
  return <Button onClick={handleClick} label="Haz clic" />;
}`,
          codeTs: `// TypeScript
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

function Button({ onClick, label, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

function App() {
  return <Button onClick={() => console.log('TS Click')} label="TS Button" disabled={false} />;
}`
        }
      ]
    }
  ]
};

export const hooksBasicCategory = {
  title: "3. Hooks Básicos",
  topics: [
    {
      id: "use-state",
      title: "useState",
      videoUrl: "https://www.youtube.com/watch?v=4IT4eLINWIM",
      content: [
        {
          title: "¿Qué es?",
          text: "useState es el corazón de la interactividad en React. Permite que un componente 'recuerde' información (estado) entre renderizados, como si un checkbox está marcado, el texto en un input o los datos de un usuario."
        },
        {
          title: "¿Por qué es importante?",
          text: "En React, la interfaz (UI) es un reflejo del estado. No modificas el DOM directamente (como document.getElementById('div').innerText = 'Hola'); en su lugar, actualizas el estado y React se encarga de pintar la pantalla por ti."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Úsalo cuando tengas datos que cambien con el tiempo y esos cambios deban reflejarse visualmente en la pantalla."
        },
        {
          title: "JavaScript vs TypeScript",
          text: "TypeScript infiere automáticamente el tipo según el valor inicial. Sin embargo, para estados que comienzan como null o tienen tipos complejos (uniones), definir el tipo explícitamente es crucial."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Trata el estado como inmutable. Nunca hagas `state.value = 5`; usa siempre la función 'setter' (`setState(5)`).",
          code: "// MAL ❌\nuser.name = \"Pedro\";\n// BIEN ✅\nsetUser({ ...user, name: \"Pedro\" });"
        },
        {
          type: "error",
          title: "Error común",
          content: "Intentar leer el valor del estado inmediatamente después de actualizarlo (ej. `setCount(1); console.log(count)`). La actualización es asíncrona; el nuevo valor estará disponible en el siguiente renderizado.",
          code: "setCount(count + 1);\nconsole.log(count); // ⚠ Imprime el valor VIEJO\n\nuseEffect(() => {\n  console.log(count); // ✅ Aquí sí tienes el nuevo\n}, [count]);"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Usa múltiples `useState` para variables independientes en lugar de un solo objeto gigante, a menos que los datos estén fuertemente relacionados.",
          code: "// MAL\nconst [state, setState] = useState({ modal: false, user: null, theme: 'dark' });\n\n// BIEN\nconst [isModalOpen, setModalOpen] = useState(false);\nconst [user, setUser] = useState(null);"
        }
      ],
      description: "Añade memoria a tus componentes. Es el mecanismo principal para manejar datos cambiantes.",
      codeJs: `// JavaScript
// Contexto: Un contador simple con funcionalidad de reinicio
import { useState } from 'react';

function Counter() {
  // [valorActual, funcionParaActualizar]
  const [count, setCount] = useState(0);

  return (
    <div className="counter-card">
      <span className="text-2xl">{count}</span>
      
      <div className="actions">
        {/* Actualización basada en el valor anterior (segura) */}
        <button onClick={() => setCount(prev => prev + 1)}>Incrementar</button>
        
        {/* Actualización directa */}
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}`,
      codeTs: `// TypeScript
// Contexto: Un contador simple con funcionalidad de reinicio
import { useState } from 'react';

function Counter() {
  // TypeScript infiere que 'count' es de tipo 'number'
  // [valorActual, funcionParaActualizar]
  const [count, setCount] = useState<number>(0); 

  return (
    <div className="counter-card">
      <span className="text-2xl">{count}</span>
      
      <div className="actions">
        {/* Actualización basada en el valor anterior (segura) */}
        <button onClick={() => setCount((prev: number) => prev + 1)}>Incrementar</button>
        
        {/* Actualización directa */}
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}`,
      syntaxDescription: "Piensa en `useState` como una pizarra mágica en la mano de tu componente. Puede escribir cosas (datos) y recordarlas aunque mire a otro lado, pero para cambiar lo escrito, debe usar un borrador especial (la función `set`) que avisa a todos: '¡Oigan, esto cambió, miren de nuevo!'.",
      useCases: [
        {
          title: "Formulario de Registro",
          description: "Manejo de múltiples campos de entrada controlados.",
          codeJs: `// JavaScript
import { useState } from 'react';

function RegisterForm() {
  // Agrupando estado relacionado en un objeto
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Spread operator (...) es vital para mantener los otros campos
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="Usuario" 
      />
      {/* ... otros inputs */}
    </form>
  );
}`,
          codeTs: `// TypeScript
import { useState, ChangeEvent } from 'react';

interface RegisterData {
  username: string;
  email: string;
}

function RegisterForm() {
  const [data, setData] = useState<RegisterData>({
    username: '',
    email: ''
  });

  // Tipado del evento de cambio
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return <input name="username" onChange={handleChange} />;
}`
        }
      ]
    },
    {
      id: "use-effect",
      title: "useEffect",
      videoUrl: "https://www.youtube.com/watch?v=mWay6tubcak",
      content: [
        {
          title: "¿Qué es?",
          text: "useEffect es tu 'operador de efectos secundarios'. Permite ejecutar código arbitrario después de que el componente se haya renderizado. Es el lugar para todo lo que no es pintar la UI: llamadas a APIs, suscripciones, timers o manipular el DOM manualmente."
        },
        {
          title: "¿Por qué es importante?",
          text: "Los componentes de React deben ser puros (sin efectos secundarios durante el render). useEffect proporciona un escape seguro para interactuar con el mundo exterior (browser APIs, servidores) sin bloquear la actualización visual."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Úsalo para sincronizar tu componente con un sistema externo (ej. conectarse a un chat, escuchar eventos del teclado). \n❌ No lo uses para transformar datos para el renderizado (usa variables normales o useMemo) o para manejar eventos de usuario (usa event handlers como onClick)."
        },
        {
          title: "JavaScript vs TypeScript",
          text: "TS no cambia mucho la sintaxis del efecto en sí, pero ayuda enormemente a tipar las respuestas de las APIs que llamas dentro del efecto."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "El array de dependencias `[]` es tu control. Le dice a React: 'Solo vuelve a ejecutar este efecto si ESTAS variables cambiaron'.",
          code: "useEffect(() => {\n  console.log(\"Usuario cambió\");\n}, [userId]); // 👈 Si userId cambia, ejecuto."
        },
        {
          type: "error",
          title: "Error común",
          content: "Olvidar la función de limpieza (`cleanup`). Si creas un intervalo o suscripción, debes destruirlo para evitar fugas de memoria (memory leaks).",
          code: "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id); // ✅ ¡Limpieza obligatoria!\n}, []);"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Mantén tus efectos cortos y enfocados. Si tienes mucha lógica, extráela a Custom Hooks."
        }
      ],
      description: "Maneja el ciclo de vida y la sincronización con sistemas externos.",
      codeJs: `// JavaScript
// Contexto: Cargar datos de perfil al montar el componente
import { useEffect, useState } from 'react';

function Profile({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true; // Prevención de "Race Conditions"

    async function fetchData() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const json = await response.json();
      
      if (active) {
        setData(json);
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup: se ejecuta si el componente se desmonta o userId cambia
    return () => {
      active = false;
    };
  }, [userId]); // Dependencia crítica: si cambia el ID, recarga

  if (loading) return <div>Cargando...</div>;
  return <div>{data.name}</div>;
}`,
      codeTs: `// TypeScript
// Contexto: Cargar datos de perfil al montar el componente de forma segura
import { useEffect, useState } from 'react';

// Tipado de las Props esperadas
interface ProfileProps {
  userId: string;
}

// Tipado de la respuesta de la API
interface UserData {
  id: string;
  name: string;
}

function Profile({ userId }: ProfileProps) {
  // useState con tipos explícitos para datos que pueden ser nulos al inicio
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true; // Prevención de "Race Conditions"

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const json: UserData = await response.json(); // Asignación de tipo a la respuesta
        
        if (active) {
          setData(json);
          setLoading(false);
        }
      } catch (error) {
        if (active) {
          console.error("Error fetching data", error);
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup: se ejecuta si el componente se desmonta o userId cambia
    return () => {
      active = false; // Ignora los resultados en vuelo si el usuario navegó a otra vista
    };
  }, [userId]); // Dependencia crítica: si cambia el ID, re-ejecuta el efecto

  if (loading) return <div>Cargando...</div>;
  return <div>{data?.name ?? 'Usuario no encontrado'}</div>;
}`,
      syntaxDescription: "Imagina que `useEffect` es un mayordomo que pones a vigilar una ventana. Le dices: 'Cada vez que el sol (una variable) entre por ahí, cierra las cortinas'. Si no le dices qué vigilar, lo hará todo el tiempo. Si le dices 'nada' (array vacío), solo lo hará la primera vez que entres a la casa.",
      useCases: [
        {
          title: "Escuchar Eventos Globales",
          description: "Detectar pulsaciones de teclado (ej. tecla 'Escape' para cerrar modal).",
          codeJs: `// JavaScript
import { useEffect } from 'react';

function Modal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // ¡CRÍTICO! Eliminar el listener
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return <div className="modal">...</div>;
}`,
          codeTs: `// TypeScript
import { useEffect } from 'react';

function WindowResizer() {
  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      console.log(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null;
}`
        }
      ]
    },
    {
      id: "use-context",
      title: "useContext",
      content: [
        {
          title: "¿Qué es?",
          text: "useContext es como un 'túnel de teletransportación' para tus datos. Permite pasar información (como el usuario autenticado, el tema visual o el idioma) desde un componente abuelo hasta un nieto lejano sin tener que pasarla manualmente por cada nivel intermedio (lo que llamamos 'Prop Drilling')."
        },
        {
          title: "¿Por qué es importante?",
          text: "En aplicaciones grandes, pasar props capa por capa ensucia el código y hace que los componentes intermedios conozcan datos que no necesitan. Context limpia tu árbol de componentes."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Úsalo para datos que son verdaderamente globales o compartidos por una rama entera de componentes (Tema, Auth, Configuración).\n⚠️ No abuses de él para evitar pasar props simples; pasar props explícitamente hace el flujo de datos más fácil de rastrear."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Context = Inyección de Dependencias.",
          code: "// El bisnieto pide datos y el abuelo se los da.\nconst { theme } = useContext(ThemeContext);"
        },
        {
          type: "error",
          title: "Error común",
          content: "Olvidar envolver la app en el `Provider`. Si usas `useContext` fuera de un provider, obtendrás el valor por defecto (que a menudo es `undefined` o null).",
          code: "// Error común en consola:\n// \"Cannot read property 'name' of undefined\"\n// Causa: <App> no tiene <AuthProvider> rodeándolo."
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Crea un 'Custom Provider' y un Custom Hook (ej. `useAuth`) para encapsular la lógica del contexto y no exponer `useContext` directamente.",
          code: "export const useAuth = () => {\n  const context = useContext(AuthContext);\n  if (!context) throw new Error(\"Falta AuthProvider\");\n  return context;\n};"
        }
      ],
      description: "Accede a datos globales sin pasar props manualmente por cada nivel.",
      codeJs: `// JavaScript
// 1. Crear el contexto
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

// 2. Crear un Provider personalizado (Encapsulamiento)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consumir el contexto
export function Switcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
    </button>
  );
}`,
      codeTs: `// TypeScript
import { createContext, useContext } from 'react';

// Definir la forma del contexto
interface AuthContextType {
  user: { name: string } | null;
  login: () => void;
}

// Inicializar con null forzando el tipo
const AuthContext = createContext<AuthContextType | null>(null);

// Custom Hook para consumo seguro
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};`,
      syntaxDescription: "Es como el sistema de megafonía de un aeropuerto. No vas susurrando el mensaje pasajero por pasajero (props). Simplemente lo anuncias por los altavoces (Provider) y cualquiera en la terminal (componentes hijos) que esté escuchando puede oírlo, sin importar cuán lejos esté.",
      useCases: [
        {
          title: "Gestión de Sesión (Auth)",
          description: "Compartir el estado del usuario logueado en toda la app.",
          codeJs: `// JavaScript
// Uso del hook personalizado creado anteriormente
function Navbar() {
  // Acceso directo a los datos sin recibir props
  const { user, logout } = useAuth();

  if (!user) return <LoginButton />;

  return (
    <nav>
      <span>Hola, {user.name}</span>
      <button onClick={logout}>Salir</button>
    </nav>
  );
}`,
          codeTs: `// TypeScript
// Ejemplo de consumo tipado
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Redirect to="/login" />;

  return <>{children}</>;
}`
        }
      ]
    },
    {
      id: "use-ref",
      title: "useRef",
      content: [
        {
          title: "¿Qué es?",
          text: "useRef es una 'caja fuerte' que persiste valores entre renderizados, pero con un superpoder clave: actualizarla NO provoca un re-renderizado."
        },
        {
          title: "¿Por qué es importante?",
          text: "A veces necesitas guardar un valor (como un ID de temporizador) o acceder directamente a un elemento del DOM real (como un <input> para darle foco), pero no quieres que React vuelva a dibujar la pantalla cuando lo haces. useState dispararía un render; useRef no."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "1. Para acceder a elementos del DOM (foco, scroll, canvas).\n2. Para guardar valores mutables que no afectan la visualización (ids de setTimeout, valores previos para comparaciones)."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "`ref.current` es mutable. Puedes cambiarlo libremente.",
          code: "const count = useRef(0);\ncount.current = 10; // ✅ No provoca re-render"
        },
        {
          type: "error",
          title: "Error común",
          content: "Usarlo para datos que SÍ se muestran en pantalla. Si muestras `{ref.current}` en tu JSX, React no sabrá cuándo actualizar la vista si cambia.",
          code: "// MAL ❌\nreturn <div>Vistas: {viewsRef.current}</div>\n// La pantalla no se moverá aunque viewsRef cambie."
        }
      ],
      description: "Referencia mutable que no dispara re-renderizados (DOM, timers).",
      codeJs: `// JavaScript
// Caso: Enfocar un input automáticamente
import { useRef } from 'react';

function SearchBar() {
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    // Acceso imperativo al DOM real
    inputRef.current.focus();
    inputRef.current.style.border = '2px solid blue';
  };

  return (
    <>
      <input ref={inputRef} placeholder="Busca algo..." />
      <button onClick={handleSearchClick}>🔍 Focus</button>
    </>
  );
}`,
      codeTs: `// TypeScript
import { useRef, useEffect } from 'react';

function VideoPlayer() {
  // Especificar el elemento HTML exacto facilita el autocompletado
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    // TS sabe que .play() existe en HTMLVideoElement
    videoRef.current?.play();
  };

  return <video ref={videoRef} src="video.mp4" />;
}`,
      syntaxDescription: "Es como el bolsillo secreto de tu pantalón. Puedes meter y sacar cosas (datos) rápidamente sin que nadie se entere (sin re-renderizar). O como señalar con el dedo un objeto real en la habitación (elemento DOM) para decir 'ese de ahí'.",
      useCases: [
        {
          title: "Guardar valores anteriores",
          description: "Comparar props o estado actual con el anterior.",
          codeJs: `// JavaScript
import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  // Se ejecuta DESPUÉS del render, guardando el valor para la PRÓXIMA vez
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}`,
          codeTs: `// TypeScript
import { useEffect, useRef } from 'react';

function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>(0);

  useEffect(() => {
    // Guardamos el valor actual para el futuro
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      Ahora: {count}, Antes: {prevCountRef.current}
    </div>
  );
}`
        }
      ]
    },
    {
      id: "use-memo",
      title: "useMemo",
      content: [
        {
          title: "¿Qué es?",
          text: "useMemo es tu herramienta de optimización. 'Memoriza' (cachea) el resultado de un cálculo costoso y solo lo recalcula si sus dependencias cambian."
        },
        {
          title: "¿Por qué es importante?",
          text: "Si tienes una función que tarda 200ms en ejecutarse (ej. filtrar una lista de 10k items) y está en el cuerpo de tu componente, se ejecutará en cada render, bloqueando la UI. useMemo evita esto."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Solo cuando tengas problemas de rendimiento reales o para garantizar estabilidad referencial de objetos/arrays.\n⚠️ No optimices prematuramente. useMemo tiene su propio coste de memoria."
        }
      ],
      tips: [
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Usa el profiler de React para ver qué componentes son lentos antes de envolver todo en `useMemo`.",
          code: "// Solo optimiza si ves algo rojo en el Profiler.\nconst val = useMemo(() => calc(a, b), [a, b]);"
        }
      ],
      description: "Cachea resultados de cálculos costosos para optimizar rendimiento.",
      codeJs: `// JavaScript
import { useMemo, useState } from 'react';

function ExpensiveList({ items, filter }) {
  // Solo filtramos si 'items' o 'filter' cambian.
  // Si cambia otro estado (ej. un booleano 'darkMode'), no recalculamos.
  const visibleItems = useMemo(() => {
    console.log("Filtrando (lento)...");
    return items.filter(i => i.name.includes(filter));
  }, [items, filter]);

  return <ul>{visibleItems.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`,
      codeTs: `// TypeScript
import { useMemo } from 'react';

interface Props {
  data: number[];
}

function Stats({ data }: Props) {
  const total = useMemo<number>(() => {
    return data.reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  return <div>Total: {total}</div>;
}`,
      syntaxDescription: "Imagina que tienes que multiplicar 234 x 876. Es difícil, ¿verdad? `useMemo` es como anotar el resultado en un post-it. La próxima vez que te pregunten lo mismo, no vuelves a calcular, solo lees el post-it. Solo calculas de nuevo si cambian los números.",
      useCases: [
        {
          title: "Evitar re-render de hijos",
          description: "Pasar objetos estables a componentes hijos memorizados.",
          codeJs: `// JavaScript
// Si pasamos {{ color: 'red' }} directamente, es un objeto nuevo cada vez.
// useMemo asegura que sea la MISMA referencia en memoria.
const style = useMemo(() => ({ color: theme }), [theme]);
return <Child style={style} />;`,
          codeTs: `// TypeScript
// Mismo principio aplicado en TS
const config = useMemo<Config>(() => ({
  mode: debug ? 'dev' : 'prod'
}), [debug]);`
        }
      ]
    },
    {
      id: "use-callback",
      title: "useCallback",
      content: [
        {
          title: "¿Qué es?",
          text: "useCallback es el hermano de useMemo, pero para funciones. Memoriza la definición de una función para que sea estable entre renderizados."
        },
        {
          title: "¿Por qué es importante?",
          text: "En JavaScript, function() {} !== function() {}. Cada render crea una función 'nueva'. Si pasas funciones a componentes hijos optimizados con React.memo, el hijo detectará una 'nueva prop' y se renderizará innecesariamente. useCallback soluciona esto manteniendo la misma función mientras las dependencias no cambien."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Casi exclusivamente cuando pasas funciones como props a componentes hijos memoizados (React.memo) o cuando la función es dependencia de un useEffect."
        }
      ],
      description: "Memoriza funciones para evitar re-renderizados innecesarios en componentes hijos.",
      codeJs: `// JavaScript
import { useCallback, useState } from 'react';
import MemoizedChild from './Child';

function Parent() {
  const [count, setCount] = useState(0);

  // Sin useCallback, esta función es 'nueva' en cada click
  // causando que MemoizedChild se vuelva a dibujar.
  const handleClick = useCallback(() => {
    console.log('Click en hijo');
  }, []); // [] = Función estable para siempre

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Re-render Padre</button>
      <MemoizedChild onClick={handleClick} />
    </>
  );
}`,
      codeTs: `// TypeScript
import { useCallback } from 'react';

function Form() {
  const handleSubmit = useCallback((data: FormData) => {
    api.post('/form', data);
  }, []); // Dependencias vacías
  
  return <ExpensiveForm onSubmit={handleSubmit} />;
}`,
      syntaxDescription: "`useCallback` es como plastificar una tarjeta de presentación. Sin él, estarías imprimiendo una tarjeta nueva idéntica cada vez que saludas a alguien (cada render). Con él, usas la misma tarjeta plastificada una y otra vez, ahorrando papel y tiempo.",
      useCases: [
        {
          title: "Dependencia de useEffect",
          description: "Cuando un efecto depende de una función externa.",
          codeJs: `// JavaScript
// Si fetchData no tuviera useCallback, el useEffect entraría en bucle infinito
// porque fetchData cambiaría en cada render, disparando el efecto de nuevo.
const fetchData = useCallback(async () => {
  const data = await api.get(\`/items/\${type}\`);
  setItems(data);
}, [type]);

useEffect(() => {
  fetchData();
}, [fetchData]);`,
          codeTs: `// TypeScript
// El patrón es idéntico en TS
const validate = useCallback((val: string): boolean => {
  return val.length > minLength;
}, [minLength]);`
        }
      ]
    },
    {
      id: "use-reducer",
      title: "useReducer",
      content: [
        {
          title: "¿Qué es?",
          text: "useReducer es el hermano mayor de useState. En lugar de actualizar el estado directamente, envías ('dispatch') 'acciones' a una función 'reducer' que decide cómo calcular el siguiente estado. Sigue el mismo patrón que Redux."
        },
        {
          title: "¿Por qué es importante?",
          text: "Ayuda a organizar lógica de estado compleja, especialmente cuando el siguiente estado depende de múltiples factores o cuando tienes muchas sub-variables relacionadas (ej. un formulario multi-paso con validación)."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "1. Cuando useState se vuelve difícil de manejar (muchos setState juntos).\n2. Cuando la lógica de estado es reutilizable.\n3. Para máquinas de estado (ej. idle -> loading -> success)."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Separa el 'qué pasó' (Acción) del 'cómo reaccionar' (Reducer).",
          code: "dispatch({ type: 'deleted', id: 1 });\n// El componente solo dice \"se borró\".\n// El reducer decide cómo afecta eso al estado."
        }
      ],
      description: "Gestión de estado avanzada basada en acciones y reducers (patrón Redux).",
      codeJs: `// JavaScript
import { useReducer } from 'react';

// El reducer es una función pura: (estado, acción) => nuevoEstado
function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, total: state.total + action.price };
    case 'clear':
      return { total: 0 };
    default:
      throw new Error('Acción desconocida');
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { total: 0 });

  return (
    <>
      Total: \${state.total}
      <button onClick={() => dispatch({ type: 'add', price: 10 })}>
        + Agregar $10
      </button>
    </>
  );
}`,
      codeTs: `// TypeScript
// TS brilla aquí: autocompletado de acciones y validación de tipos
interface State {
  count: number;
}

type Action = 
  | { type: 'increment'; payload: number } 
  | { type: 'decrement'; payload: number }
  | { type: 'reset' };

  }
}`,
      syntaxDescription: "Es como una cocina de restaurante. Los clientes (componentes) no cocinan, solo pasan 'comandos' (acciones) al chef (reducer). El chef tiene un libro de recetas estricto y decide cómo cambia el plato (estado) según el comando recibido.",
      useCases: [
        {
          title: "Carga de Datos (Fetch State)",
          description: "Manejar estados complejos de carga, error y datos en una sola estructura.",
          codeJs: `// JavaScript
// Patrón muy común para evitar tener 3 useStates separados (loading, error, data)
const initialState = { loading: false, error: null, data: null };

function fetchReducer(state, action) {
  switch (action.type) {
    case 'INIT': return { loading: true, error: null, data: null };
    case 'SUCCESS': return { loading: false, error: null, data: action.payload };
    case 'ERROR': return { loading: false, error: action.payload, data: null };
  }
}

// Uso en componente:
// dispatch({ type: 'INIT' });
// fetch(...).then(res => dispatch({ type: 'SUCCESS', payload: res }));`,
          codeTs: `// TypeScript
// El mismo patrón tipado garantiza que no puedas asignar data cuando hay error
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

// Esto permite hacer "Pattern Matching" en el render:
// if (state.status === 'success') { ... }`
        }
      ]
    }
  ]
};

