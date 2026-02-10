export const actionsFormsCategory = {
  title: "7. Actions & Forms",
  topics: [
    {
      id: "form-actions",
      title: "Form Actions",
      content: [
        {
          title: "¿Qué es?",
          text: "React 19 extiende el elemento HTML <form> permitiendo pasar funciones (Server Actions) directamente al prop 'action', en lugar de una URL string. Esto simplifica enormemente el manejo de envíos de formularios, gestionando el ciclo de vida de la petición automáticamente."
        },
        {
          title: "¿Por qué es importante?",
          text: "Permite 'Progressive Enhancement': el formulario funciona incluso si JavaScript no ha cargado (como petición POST estándar). Además, elimina la necesidad de `onSubmit`, `preventDefault` y estados manuales de carga."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Siempre que manejes formularios que envían datos al servidor (mutaciones), especialmente en frameworks full-stack como Next.js."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "El 'Action' puede ejecutarse en el servidor ('use server') o en el cliente, pero la API es la misma: recibes un `FormData`.",
          code: "const action = async (formData) => {\n  'use server'; // Corre en Node.js\n  console.log(formData.get('field'));\n};"
        },
        {
          type: "error",
          title: "Error común",
          content: "Olvidar que los inputs necesitan un atributo `name` para aparecer en el `FormData`.",
          code: "// ❌ formData.get('email') será null\n<input type=\"email\" />\n\n// ✅ formData.get('email') 'test@test.com'\n<input type=\"email\" name=\"email\" />"
        },
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Usa `useActionState` junto con el action para manejar los errores de validación que devuelve el servidor.",
          code: "const [state, action] = useActionState(serverFn, initialState);\nreturn <p className=\"error\">{state.error}</p>;"
        }
      ],
      description: "Acciones integradas en formularios.",
      codeJs: `// JavaScript
function Formulario() {
  async function handleSubmit(formData) {
    'use server';
    const nombre = formData.get('nombre');
  }
  
  return <form action={handleSubmit}><input name="nombre" /></form>;
}`,
      codeTs: `// TypeScript
function Formulario(): JSX.Element {
  async function handleSubmit(formData: FormData): Promise<void> {
    'use server';
    const nombre = formData.get('nombre') as string;
  }
  
  return <form action={handleSubmit}><input name="nombre" /></form>;
}`,
      syntaxDescription: "Es como ponerle una dirección de destino a un sobre. El navegador sabe exactamente a dónde enviar la carta (datos del form) y cómo hacerlo, incluso si el cartero (JavaScript) está en huelga (desactivado o cargando).",
      useCases: [
        {
          title: "Formularios Progresivos",
          description: "Formulario que funciona con y sin JavaScript activo.",
          codeJs: `// JavaScript
// Action definido en servidor
async function saveContact(formData) {
  'use server';
  await db.contacts.create({
    email: formData.get('email')
  });
}

function ContactForm() {
  return (
    // 'action' acepta la función directamente
    <form action={saveContact}>
      <label>Email: 
        <input type="email" name="email" required />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
}`,
          codeTs: `// TypeScript
async function saveContact(formData: FormData): Promise<void> {
  'use server';
  await db.contacts.create({
    email: formData.get('email') as string
  });
}

function ContactForm(): JSX.Element {
  return (
    <form action={saveContact}>
      <label>Email: <input type="email" name="email" /></label>
      <button type="submit">Guardar</button>
    </form>
  );
}`
        }
      ]
    },
    {
      id: "use-form-status",
      title: "useFormStatus",
      content: [
        {
          title: "¿Qué es?",
          text: "useFormStatus es un hook auxiliar que permite acceder al estado del envío del formulario padre (si está pendiente, qué datos se enviaron) desde un componente hijo."
        },
        {
          title: "¿Por qué es importante?",
          text: "Permite crear componentes de UI inteligentes (ej. botón de submit con spinner) que se encapsulan a sí mismos, sin necesidad de recibir props `isLoading` desde el padre."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Exclusivamente dentro de componentes que están anidados dentro de un `<form>`."
        }
      ],
      tips: [
        {
          type: "error",
          title: "Error común",
          content: "Intentar llamar a `useFormStatus` en el mismo componente que declara el `<form>`. Solo funciona en componentes *hijos* del form.",
          code: "// ❌ Siempre pending: false\nfunction Form() { \n  const { pending } = useFormStatus(); \n  return <form>...</form>; \n}\n\n// ✅ Correcto\nfunction Form() { return <form><SubmitBtn /></form>; }\nfunction SubmitBtn() { const { pending } = useFormStatus(); ... }"
        }
      ],
      description: "Estado de formulario.",
      codeJs: `// JavaScript
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Enviar</button>;
}`,
      codeTs: `// TypeScript
import { useFormStatus } from 'react-dom';

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Enviar</button>;
}`,
      syntaxDescription: "Es como el número de seguimiento de tu paquete. Te permite preguntar '¿Ya llegó?' o '¿Sigue en camino?' (pending) desde cualquier lugar dentro del proceso de envío, sin tener que llamar a la oficina central.",
      useCases: [
        {
          title: "Botón de Envío Inteligente",
          description: "Botón reutilizable que muestra estado de carga automáticamente.",
          codeJs: `// JavaScript
import { useFormStatus } from 'react-dom';

function SmartSubmit({ label }) {
  // Debe renderizarse DENTRO del form
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? (
        <>
          <span className="spinner" /> Enviando...
        </>
      ) : label}
    </button>
  );
}

// Uso: <form action={...}><SmartSubmit label="Guardar" /></form>`,
          codeTs: `// TypeScript
import { useFormStatus } from 'react-dom';

function SmartSubmit({ label }: { label: string }): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : label}
    </button>
  );
}`
        }
      ]
    }
  ]
};
