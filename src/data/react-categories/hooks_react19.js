
export const hooksReact19Category = {
  title: "3. Hooks React 19",
  topics: [
    {
      id: "use-action-state",
      title: "useActionState",
      content: [
        {
          title: "¿Qué es?",
          text: "useActionState (antes conocido como useFormState) es un hook diseñado para manejar el estado de formularios y acciones asíncronas. Encapsula automáticamente el ciclo de vida de una petición (pendiente, éxito, error)."
        },
        {
          title: "¿Por qué es importante?",
          text: "Elimina la necesidad de crear manualmente estados para isLoading, error y data. Además, se integra nativamente con Server Actions, permitiendo formularios que funcionan incluso sin JavaScript habilitado (progressive enhancement) en frameworks como Next.js."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Siempre que manejes envíos de formularios o acciones que muten datos en el servidor y necesiten feedback visual."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Devuelve 3 valores: el estado actual, la acción para el <form>, y un booleano `isPending`.",
          code: "const [state, formAction, isPending] = useActionState(fn, initialState);\n// state: lo que devuelve fn\n// formAction: va en <form action={...}>\n// isPending: true mientras se ejecuta"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Úsalo junto con `useFormStatus` (en componentes hijos) para deshabilitar botones de envío automáticamente.",
          code: "// Componente hijo del form\nconst { pending } = useFormStatus();\nreturn <button disabled={pending}>...</button>;"
        }
      ],
      description: "Manejo automático de pending/error.",
      codeJs: `// JavaScript
import { useActionState } from 'react';

function Formulario() {
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    return { mensaje: 'Enviado' };
  }, { mensaje: '' });
}`,
      codeTs: `// TypeScript
import { useActionState } from 'react';

interface FormState {
  mensaje: string;
}

function Formulario(): JSX.Element {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState, formData) => {
      return { mensaje: 'Enviado' };
    },
    { mensaje: '' }
  );
}`,
      syntaxDescription: "Es como el piloto automático de un formulario. Le das la dirección (función action) y él se encarga de conducir, avisarte si hay tráfico (pending), si chocaron (error) o si llegaron bien (data), sin que tengas que mirar el mapa a cada segundo.",
      useCases: [
        {
          title: "Formulario de Login",
          description: "Autenticación completa con gestión de errores y estado de carga nativo.",
          codeJs: `// JavaScript
import { useActionState } from 'react';
import { loginUser } from './actions';

function LoginForm() {
  const [state, dispatch, isPending] = useActionState(loginUser, {
    error: null,
    user: null
  });

  return (
    <form action={dispatch}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      
      {state.error && (
        <p className="error">{state.error}</p>
      )}
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}

// actions.js (simulado)
async function loginUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validación simulada
  if (password === "secret") {
    return { 
      error: null, 
      user: { id: 1, email } 
    };
  }

  return {
    error: "Contraseña incorrecta (prueba 'secret')",
    user: null
  };
}`,
          codeTs: `// TypeScript
import { useActionState } from 'react';

interface LoginState {
  error: string | null;
  user: { id: string } | null;
}

// Simulacion de action
async function loginUser(state: LoginState, formData: FormData): Promise<LoginState> {
  return { error: 'Error simulado', user: null };
}

function LoginForm(): JSX.Element {
  const [state, dispatch, isPending] = useActionState<LoginState, FormData>(
    loginUser, 
    { error: null, user: null }
  );

  return (
    <form action={dispatch}>
      <input name="email" type="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '...' : 'Login'}
      </button>
    </form>
  );
}`
        }
      ]
    },
    {
      id: "use-optimistic",
      title: "useOptimistic",
      content: [
        {
          title: "¿Qué es?",
          text: "useOptimistic permite mostrar un estado 'predicho' o temporal en la UI mientras una acción asíncrona (como guardar en base de datos) se completa en segundo plano."
        },
        {
          title: "¿Por qué es importante?",
          text: "Hace que la aplicación se sienta instantánea. En lugar de esperar 500ms a que el servidor responda 'OK' para mostrar un mensaje, lo muestras inmediatamente al hacer click."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Para interacciones pequeñas y predecibles: likes, añadir a favoritos, enviar mensajes de chat, tareas de listas ('todo lists')."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Si la acción real falla, React revierte automáticamente el cambio optimista. ¡Sin código extra!",
          code: "// 1. Usuario da like (+1 optimista)\n// 2. Petición falla ❌\n// 3. React vuelve a mostrar likes originales ✅"
        }
      ],
      description: "Actualizaciones optimistas de UI.",
      codeJs: `// JavaScript
import { useOptimistic } from 'react';

function Lista({ items }) {
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem) => [...state, newItem]
  );
}`,
      codeTs: `// TypeScript
import { useOptimistic } from 'react';

interface Item {
  id: number;
  nombre: string;
}

function Lista({ items }: { items: Item[] }): JSX.Element {
  const [optimisticItems, addOptimisticItem] = useOptimistic<Item[], Item>(
    items,
    (state, newItem) => [...state, newItem]
  );
}`,
      syntaxDescription: "Es una 'mentira piadosa' para el usuario. Cuando das 'Me gusta', el corazón se pone rojo al instante (optimista) porque asumimos que el servidor dirá que sí. Si el servidor luego dice que no (error), pedimos perdón y quitamos el rojo automáticamente.",
      useCases: [
        {
          title: "Sistema de 'Me Gusta'",
          description: "Feedback instantáneo al dar like, antes de la respuesta del servidor.",
          codeJs: `// JavaScript
import { useOptimistic, useState } from 'react';

function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  
  // Estado optimista: se actualiza inmediatamente
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, amount) => currentLikes + amount
  );

  const handleLike = async () => {
    // 1. Mostrar cambio instantaneo
    addOptimisticLike(1);
    
    // 2. Realizar petición real
    // await api.likePost();
    // setLikes(l => l + 1);
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes} Likes
    </button>
  );
}`,
          codeTs: `// TypeScript
import { useOptimistic, useState } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }): JSX.Element {
  const [likes, setLikes] = useState<number>(initialLikes);
  
  const [optimisticLikes, addOptimisticLike] = useOptimistic<number, number>(
    likes,
    (currentLikes, amount) => currentLikes + amount
  );

  const handleLike = async (): Promise<void> => {
    addOptimisticLike(1);
    // await api.likePost();
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}`
        }
      ]
    },
    {
      id: "use-api",
      title: "use (Hook)",
      content: [
        {
          title: "¿Qué es?",
          text: "La API use es una función especial que permite leer el valor de un recurso asíncrono (como una Promesa) o un Contexto. A diferencia de los Hooks tradicionales, se puede llamar dentro de loops (if, for)."
        },
        {
          title: "¿Por qué es importante?",
          text: "Simplifica enormemente la carga de datos y el consumo de contexto condicional. Se integra con Suspense: si la promesa no está resuelta, el componente se 'suspende' y muestra el fallback (loading) más cercano."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "1. Para consumir Contexto de forma condicional.\n2. Para leer Promesas directamente en el renderizado (especialmente en Server Components o cliente con Suspense)."
        }
      ],
      tips: [
        {
          type: "error",
          title: "Error común",
          content: "No pases una promesa creada *dentro* del render a `use(promise)`. La promesa debe ser estable (creada fuera o cacheada).",
          code: "// ❌ Bucle infinito\nconst promesa = fetch('/data'); // Nueva promesa cada render\nconst data = use(promesa);\n\n// ✅ Usar librería (React Query) o crearla fuera"
        }
      ],
      description: "Leer recursos (Promises, Context).",
      codeJs: `// JavaScript
import { use } from 'react';

function Componente({ promesaDatos }) {
  const datos = use(promesaDatos);
  return <div>{datos.nombre}</div>;
}`,
      codeTs: `// TypeScript
import { use } from 'react';

interface Datos {
  nombre: string;
}

function Componente({ promesaDatos }: { promesaDatos: Promise<Datos> }): JSX.Element {
  const datos = use(promesaDatos);
  return <div>{datos.nombre}</div>;
}`,
      syntaxDescription: "Es como abrir un regalo (promesa). Normalmente tienes que esperar a que te lo den (then/await), pero `use` te permite intentar abrirlo dentro del componente. Si el regalo no ha llegado, React 'pausa' el componente hasta que llegue.",
      useCases: [
        {
          title: "Fetching de Usuario",
          description: "Carga de datos de usuario con Suspense (sin useEffect).",
          codeJs: `// JavaScript
import { use, Suspense } from 'react';

// Simulamos una promesa que viene de props o fetch
const userPromise = fetch('https://api.example.com/user')
  .then(res => res.json());

function UserProfile({ userPromise }) {
  // 'use' suspende el componente hasta que la promesa resuelve
  const user = use(userPromise);
  
  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<h1>Cargando perfil...</h1>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}`,
          codeTs: `// TypeScript
import { use, Suspense } from 'react';

interface User {
  name: string;
  email: string;
}

function UserProfile({ userPromise }: { userPromise: Promise<User> }): JSX.Element {
  const user = use(userPromise);
  
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  );
}`
        }
      ]
    }, {
      id: "use-transition",
      title: "useTransition",
      content: [
        {
          title: "¿Qué es?",
          text: "useTransition permite marcar una actualización de estado como 'no urgente' (transición)."
        },
        {
          title: "¿Por qué es importante?",
          text: "Por defecto, React prioriza todas las interacciones. Si actualizas un estado que causa un renderizado pesado (ej. filtrar una lista de 10,000 items), la interfaz se congela. Con useTransition, le dices a React: 'Muestra primero lo que escribí en el input, y calcula la lista en segundo plano, sin bloquear'."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Navegaciones, cambio de pestañas, filtrado de listas grandes o visualizaciones de datos complejas."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Permite que la UI siga siendo interactiva *mientras* ocurre un cambio pesado.",
          code: "startTransition(() => {\n  setTab('pesada'); // React hace esto en background\n});\n// El usuario puede seguir clicando otras cosas"
        }
      ],
      description: "Actualizaciones no urgentes.",
      codeJs: `// JavaScript
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  
  const handleClick = () => {
    startTransition(() => {
      // Actualización no urgente
    });
  };
}`,
      codeTs: `// TypeScript
import { useTransition } from 'react';

function App(): JSX.Element {
  const [isPending, startTransition] = useTransition();
  
  const handleClick = (): void => {
    startTransition(() => {
      // Actualización no urgente
    });
  };
}`,
      syntaxDescription: "Es como tener dos filas en el supermercado: una VIP (urgente) y otra normal (transición). `useTransition` marca ciertas tareas para la fila normal, asegurando que si alguien VIP (escribir en un input) llega, sea atendido primero sin que la caja registradora se bloquee.",
      useCases: [
        {
          title: "Navegación Fluida",
          description: "Cambio de pestaña sin bloquear la UI principal.",
          codeJs: `// JavaScript
import { useState, useTransition } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2'; // Supongamos que Tab2 es pesado

function TabContainer() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => selectTab('home')}>Home</button>
        <button onClick={() => selectTab('profile')}>Perfil</button>
      </div>
      
      {isPending && <span className="spinner">Cargando...</span>}
      
      <div className={isPending ? 'loading' : ''}>
        {tab === 'home' ? <Tab1 /> : <Tab2 />}
      </div>
    </div>
  );
}`,
          codeTs: `// TypeScript
import { useState, useTransition } from 'react';

function TabContainer(): JSX.Element {
  const [tab, setTab] = useState<string>('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (nextTab: string): void => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <button onClick={() => selectTab('home')}>Home</button>
      {isPending && <span>Cargando...</span>}
    </div>
  );
}`
        }
      ]
    },
    {
      id: "use-deferred-value",
      title: "useDeferredValue",
      content: [
        {
          title: "¿Qué es?",
          text: "useDeferredValue es similar a useTransition, pero se aplica a valores en lugar de a actualizaciones de estado. Crea una copia 'retrasada' de un valor que se actualiza con menor prioridad."
        },
        {
          title: "¿Por qué es importante?",
          text: "Es ideal cuando recibes un valor nuevo (como lo que el usuario escribe en un buscador) y necesitas usarlo para algo costoso (renderizar resultados), pero no quieres bloquear el input."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Específicamente para implementar patrones de tipo Debounce o Throttle de forma nativa en React, sin librerías externas."
        }
      ],
      tips: [
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Úsalo junto con `<Suspense>` o una opacidad visual para indicar que los resultados mostrados pueden estar 'stale' (anticuados) mientras se recalculan.",
          code: "const query = useDeferredValue(input);\nconst isStale = query !== input;\n<div style={{ opacity: isStale ? 0.5 : 1 }}>"
        }
      ],
      description: "Diferir actualizaciones de valores.",
      codeJs: `// JavaScript
import { useDeferredValue } from 'react';

function Busqueda({ query }) {
  const deferredQuery = useDeferredValue(query);
  return <Resultados query={deferredQuery} />;
}`,
      codeTs: `// TypeScript
import { useDeferredValue } from 'react';

function Busqueda({ query }: { query: string }): JSX.Element {
  const deferredQuery = useDeferredValue<string>(query);
  return <Resultados query={deferredQuery} />;
}`,
      syntaxDescription: "Es como ver un video en baja calidad mientras carga el HD. Te muestra una versión 'vieja' o 'borrosa' del valor mientras la versión nueva y pesada termina de procesarse, para que la interfaz nunca se quede congelada.",
      useCases: [
        {
          title: "Búsqueda Instantánea",
          description: "Mantiene el input responsivo mientras se filtran resultados pesados.",
          codeJs: `// JavaScript
import { useState, useDeferredValue } from 'react';
import ExpensiveList from './ExpensiveList';

function SearchPage() {
  const [query, setQuery] = useState('');
  // La lista usará esta versión diferida
  const deferredQuery = useDeferredValue(query);

  const isStale = query !== deferredQuery;

  return (
    <div>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <ExpensiveList query={deferredQuery} />
      </div>
    </div>
  );
}`,
          codeTs: `// TypeScript
import { useState, useDeferredValue } from 'react';
import ExpensiveList from './ExpensiveList';

function SearchPage(): JSX.Element {
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue<string>(query);

  const isStale = query !== deferredQuery;

  return (
    <div>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)}
      />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <ExpensiveList query={deferredQuery} />
      </div>
    </div>
  );
}`
        }
      ]
    },
    {
      id: "use-id",
      title: "useId",
      content: [
        {
          title: "¿Qué es?",
          text: "useId genera un identificador único y estable para accesibilidad."
        },
        {
          title: "¿Por qué es importante?",
          text: "Generar IDs con Math.random() falla en Server Side Rendering (SSR) porque el servidor y el cliente generan números distintos, causando errores de 'Hidratación'. useId garantiza que el ID sea idéntico en ambos lados."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Principalmente para Accesibilidad (a11y): vincular labels con inputs dentro de componentes reutilizables."
        }
      ],
      tips: [
        {
          type: "error",
          title: "Error común",
          content: "No uses \`useId\` para generar 'keys' en listas (\`key={id}\`). Las keys deben provenir de tus datos (IDs de base de datos), no del componente.",
          code: "// ❌ Mal: Las keys cambiarán si el orden cambia\nitems.map(i => <li key={useId()}>...</li>)\n\n// ✅ Bien\nitems.map(i => <li key={i.db_id}>...</li>)"
        }
      ],
      description: "Generar IDs únicos estables.",
      codeJs: `// JavaScript
import { useId } from 'react';

function FormField() {
  const id = useId();
  return <><label htmlFor={id}>Nombre</label><input id={id} /></>;
  return <><label htmlFor={id}>Nombre</label><input id={id} /></>;
}`,
      syntaxDescription: "Es como un expendedor de números de turno en el banco. Garantiza que cada cliente (componente) tenga un ticket único e irrepetible, sin importar cuántas sucursales (servidor/cliente) haya. Evita que llamen al número 5 y se levanten dos personas.",
      codeTs: `// TypeScript
import { useId } from 'react';

function FormField(): JSX.Element {
  const id = useId();
  return <><label htmlFor={id}>Nombre</label><input id={id} /></>;
}`,
      useCases: [
        {
          title: "Input Accesible",
          description: "Vinculación correcta de Label e Input para lectores de pantalla.",
          codeJs: `// JavaScript
import { useId } from 'react';

function AccessibleInput({ label, type = 'text' }) {
  const id = useId();
  const descriptionId = \`\${id}-desc\`;

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input 
        id={id} 
        type={type} 
        aria-describedby={descriptionId} 
      />
      <span id={descriptionId} className="help-text">
        Este campo es obligatorio.
      </span>
    </div>
  );
}`,
          codeTs: `// TypeScript
import { useId } from 'react';

interface InputProps {
  label: string;
  type?: string;
}

function AccessibleInput({ label, type = 'text' }: InputProps): JSX.Element {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}`
        }
      ]
    }
  ]
};
