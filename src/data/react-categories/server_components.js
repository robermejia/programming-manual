
export const serverComponentsCategory = {
  title: "5. Server Components",
  topics: [
    {
      id: "rsc",
      title: "Server Components",
      content: [
        {
          title: "¿Qué es?",
          text: "Los React Server Components (RSC) permiten que los componentes se rendericen exclusivamente en el servidor. Su código nunca se envía al navegador, reduciendo drásticamente el tamaño del bundle de JavaScript."
        },
        {
          title: "¿Por qué es importante?",
          text: "A diferencia del SSR tradicional (que hidrata todo en el cliente), los RSC envían un formato serializado que React interpreta sin descargar nuevo código JS. Esto permite una carga inicial más rápida y acceso directo a bases de datos."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Ideales para componentes no interactivos (sin useState/useEffect) que consumen datos del backend (listas de productos, detalles de blog)."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "El código de un Server Component NO se incluye en el bundle del cliente. Puedes importar librerías pesadas (ej. formateadores de fecha, parsers markdown) sin costo para el usuario."
        },
        {
          type: "error",
          title: "Error común",
          content: "Intentar usar hooks como `useState` o `useEffect` en un Server Component. Esto lanzará un error porque no hay 'estado' en el servidor.",
          code: "// ❌ Error: ReactServerComponentsError\nexport default async function Page() {\n  const [state, setState] = useState(); // 🔥\n}"
        }
      ],
      description: "Componentes server-only.",
      codeJs: `// JavaScript
// app/componente.server.js
export default async function ServerComponent() {
  const datos = await fetch('api/datos');
  return <div>{datos}</div>;
}`,
      codeTs: `// TypeScript
// app/componente.server.tsx
export default async function ServerComponent(): Promise<JSX.Element> {
  const datos = await fetch('api/datos');
  return <div>{datos}</div>;
}`,
      syntaxDescription: "Imagina que el Servidor es la Cocina y el Cliente es la Mesa del comensal. Los Server Components son los Chefs que preparan el plato completamente en la cocina y solo envían la comida lista a la mesa. El comensal no necesita ver la receta ni los utensilios (código JS), solo disfruta el plato.",
      useCases: [
        {
          title: "Acceso Directo a Base de Datos",
          description: "Consulta segura a la base de datos sin exponer credenciales al cliente.",
          codeJs: `// JavaScript
// app/products/page.js
import db from '../lib/db';

// Este componente solo corre en el servidor
export default async function ProductList() {
  // Acceso directo a DB - Seguro
  const products = await db.query('SELECT * FROM products');

  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p>\${p.price}</p>
        </div>
      ))}
    </div>
  );
}`,
          codeTs: `// TypeScript
// app/products/page.tsx
import db from '../lib/db';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default async function ProductList(): Promise<JSX.Element> {
  const products = await db.query<Product>('SELECT * FROM products');

  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}`
        }
      ]
    },
    {
      id: "server-actions",
      title: "Server Actions",
      content: [
        {
          title: "¿Qué es?",
          text: "Las Server Actions son funciones asíncronas que se ejecutan en el servidor pero pueden ser invocadas directamente desde el cliente. Eliminan la necesidad de crear endpoints API manuales para mutar datos."
        },
        {
          title: "¿Por qué es importante?",
          text: "React gestiona automáticamente la comunicación de red (RPC) y la serialización. Funcionan con 'Progressive Enhancement' si se usan en formularios, operando incluso sin JS."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Para cualquier mutación de datos: enviar formularios, botones de 'like', borrar items, etc."
        }
      ],
      tips: [
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Valida siempre los datos en la Server Action (usando Zod o similar), nunca confíes en lo que viene del cliente.",
          code: "import { z } from 'zod';\nconst schema = z.object({ email: z.string().email() });\n\nexport async function subscribe(formData) {\n  const result = schema.safeParse({ email: formData.get('email') });\n  if (!result.success) throw new Error(\"Email inválido\");\n}"
        }
      ],
      description: "Funciones de servidor.",
      codeJs: `// JavaScript
'use server';

export async function crearTodo(formData) {
  const titulo = formData.get('titulo');
  await db.insert({ titulo });
}`,
      codeTs: `// TypeScript
'use server';

export async function crearTodo(formData: FormData): Promise<void> {
  const titulo = formData.get('titulo') as string;
  await db.insert({ titulo });
}`,
      syntaxDescription: "Son tuberías directas desde tu botón en el navegador hasta tu base de datos. En lugar de construir una carretera compleja (crear API REST, configurar fetch, manejar JSON), React construye un tubo neumático donde tiras el formulario y aparece mágicamente en el servidor.",
      useCases: [
        {
          title: "Suscripción a Newsletter",
          description: "Envío de formulario sin endpoint API explícito.",
          codeJs: `// JavaScript
// actions.js
'use server';

export async function subscribe(formData) {
  const email = formData.get('email');
  await db.subscribers.create({ email });
  // Revalidar caché si es necesario
}

// Newsletter.js
import { subscribe } from './actions';

export default function Newsletter() {
  return (
    <form action={subscribe}>
      <input type="email" name="email" required />
      <button type="submit">Suscribirse</button>
    </form>
  );
}`,
          codeTs: `// TypeScript
// actions.ts
'use server';

export async function subscribe(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;
  await db.subscribers.create({ email });
}

// Newsletter.tsx
export default function Newsletter(): JSX.Element {
  return (
    <form action={subscribe}>
      <input type="email" name="email" required />
      <button type="submit">Suscribirse</button>
    </form>
  );
}`
        }
      ]
    },
    {
      id: "directives",
      title: "Directivas",
      content: [
        {
          title: "¿Qué es?",
          text: "Las directivas 'use client' y 'use server' definen los límites entre el código que corre en el servidor y el que corre en el navegador."
        },
        {
          title: "¿Por qué es importante?",
          text: "'use client' marca un archivo como punto de entrada al cliente (habilitando hooks e interactividad). 'use server' marca funciones que deben ejecutarse en el servidor."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Pon 'use client' solo en las 'hojas' de tu árbol de componentes que necesitan interactividad (botones, inputs). Deja el resto como Server Components por defecto."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Un componente 'use client' puede renderizar Server Components como hijos (pasándolos como `children`). Esto evita que todo el árbol se convierta en cliente.",
          code: "// ✅ ClientWrapper.js ('use client')\nexport default function ClientWrapper({ children }) {\n  return <div onClick={...}>{children}</div>;\n}\n\n// Page.js (Server)\n<ClientWrapper>\n  <ServerContent /> {/* Sigue siendo Server Component */}\n</ClientWrapper>"
        }
      ],
      description: "use client / use server.",
      codeJs: `// JavaScript
'use client';

import { useState } from 'react';

export default function Contador() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
      codeTs: `// TypeScript
'use client';

import { useState } from 'react';

export default function Contador(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
      syntaxDescription: "Son las señales de tráfico de tu código. 'use client' es un cartel que dice '¡Atención! Aquí empieza territorio interactivo (navegador)'. Sin el cartel, React asume por defecto que todo se queda en el servidor para ser más rápido.",
      useCases: [
        {
          title: "Isla Interactiva",
          description: "Componente cliente dentro de una página de servidor.",
          codeJs: `// JavaScript
// SearchBar.js (Cliente)
'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  return (
    <input 
      value={term} 
      onChange={e => {
        setTerm(e.target.value);
        onSearch(e.target.value);
      }} 
    />
  );
}

// Page.js (Servidor)
import SearchBar from './SearchBar';

export default function Page() {
  return (
    <div>
      <h1>Título (Server Rendered)</h1>
      <SearchBar /> 
    </div>
  );
}`,
          codeTs: `// TypeScript
// SearchBar.tsx
'use client';
import { useState } from 'react';

export default function SearchBar(): JSX.Element {
  const [term, setTerm] = useState('');
  return <input value={term} onChange={e => setTerm(e.target.value)} />;
}

// Page.tsx
import SearchBar from './SearchBar';
export default function Page() {
  return <SearchBar />;
}`
        }
      ]
    }
  ]
};
