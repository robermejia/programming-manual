
export const fundamentosCategory = {
    title: "1. Fundamentos",
    topics: [
        {
            id: "node-install",
            title: "1. Instalación de Node",
            videoUrl: "https://www.youtube.com/watch?v=P_NiUo6kItw",
            content: [
                {
                    title: "¿Qué es Node.js?",
                    text: "Node.js es un entorno de ejecución para JavaScript construido con el motor V8 de Chrome. Es el 'motor' que permite que React y sus herramientas de construcción (como Vite) funcionen en tu computadora."
                },
                {
                    title: "NPM (Node Package Manager)",
                    text: "Al instalar Node, obtienes NPM, el gestor de paquetes más grande del mundo. Con él descargarás React, librerías de estilos, enrutadores y todo lo necesario para tu proyecto."
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Versión LTS",
                    content: "Instala siempre la versión **LTS (Long Term Support)**. Es la más estable y la que garantiza compatibilidad con la mayoría de las librerías."
                },
                {
                    type: "idea",
                    title: "Verificación",
                    content: "Después de instalar, abre una terminal y escribe `node -v` y `npm -v` para confirmar que todo está listo.",
                    code: "node -v\nnpm -v"
                }
            ],
            description: "Setup indispensable: motor de ejecución y gestor de paquetes.",
            codeJs: "// No requiere código JS de cliente,\nse instala desde nodejs.org",
            syntaxDescription: "No escribes código Node directamente para React, pero su presencia es obligatoria para compilar y ejecutar tu entorno de desarrollo.",
            useCases: [
                {
                    title: "Entorno de Desarrollo",
                    description: "Ejecutar servidores locales para ver tus cambios en tiempo real."
                }
            ]
        },
        {
            id: "vsc-install",
            title: "2. Instalación de Visual Studio Code",
            videoUrl: "https://www.youtube.com/watch?v=yw_YAIY77uY",
            content: [
                {
                    title: "El Editor Estándar",
                    text: "Visual Studio Code (VS Code) es el editor preferido por la comunidad. Es ligero, gratuito y altamente personalizable mediante extensiones."
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Extensiones Vitales",
                    content: "Instala 'ES7+ React/Redux/React-Native snippets' para escribir código ultra rápido."
                }
            ],
            description: "Tu mesa de trabajo principal: configuración y personalización.",
            codeJs: "// Recomendación de extensiones:\n// 1. ES7+ React/Redux/React-Native snippets\n// 2. Prettier (Para formatear código)\n// 3. ESLint (Para detectar errores)",
            useCases: [
                {
                    title: "Escritura de Código",
                    description: "Edición profesional con autocompletado y depuración."
                }
            ]
        },
        {
            id: "que-es-react",
            title: "3. ¿Qué es React?",
            videoUrl: "https://www.youtube.com/watch?v=W5LasR8Bx4k",
            content: [
                {
                    title: "Declarativo vs Imperativo",
                    text: "En lugar de decirle al navegador 'crea un div, dale una clase, añade un texto' (Imperativo), en React dices 'aquí hay un componente que se ve así cuando tiene estos datos' (Declarativo)."
                },
                {
                    title: "Basado en Componentes",
                    text: "Construyes piezas pequeñas (botones, navbars, tarjetas) y las combinas para crear interfaces complejas."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Filosofía React",
                    content: "Piensa en componentes. Si un elemento se repite o es muy complejo, conviértelo en un componente independiente."
                }
            ],
            description: "Filosofía declarativa y arquitectura basada en componentes.",
            codeJs: `// Ejemplo de pensamiento declarativo
function Welcome({ name }) {
  return <h1>Hola, {name}</h1>;
}

// React se encarga de actualizar el DOM por ti
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Welcome name="Usuario" />);`,
            syntaxDescription: "Declaras qué quieres ver, y React se encarga de 'cómo' hacerlo en el navegador de forma eficiente.",
            useCases: [
                {
                    title: "SPAs (Single Page Applications)",
                    description: "Sitios web rápidos que no refrescan la página al navegar."
                }
            ]
        },
        {
            id: "create-project",
            title: "4. Creando un proyecto con Vite",
            videoUrl: "https://www.youtube.com/watch?v=v22XNhhTzmo",
            content: [
                {
                    title: "¿Por qué Vite?",
                    text: "Vite es la herramienta moderna que reemplazó a 'Create React App'. Es increíblemente rápida porque no recompila todo el proyecto en cada cambio, solo lo que necesitas."
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Comando Rápido",
                    content: "Usa `npm create vite@latest` y sigue las instrucciones para tener un proyecto listo en segundos.",
                    code: "npm create vite@latest mi-proyecto -- --template react"
                }
            ],
            description: "Inicialización profesional de proyectos React.",
            codeJs: `// Pasos en terminal:
// 1. npm create vite@latest
// 2. cd nombre-del-proyecto
// 3. npm install
// 4. npm run dev`,
            syntaxDescription: "Vite prepara toda la estructura: scripts de ejecución, servidor de desarrollo y configuración de compilación.",
            useCases: [
                {
                    title: "Nuevos Proyectos",
                    description: "Base sólida para cualquier aplicación React moderna."
                }
            ]
        },
        {
            id: "file-structure",
            title: "5. Reconocimiento de carpetas y archivos",
            videoUrl: "https://www.youtube.com/watch?v=E7MYDH7Xqcw",
            content: [
                {
                    title: "Estructura de un Proyecto React",
                    text: "• **node_modules**: Contiene todas las librerías instaladas (Vite, React, etc.). Nunca se edita manualmente.\n• **public**: Archivos estáticos que se sirven tal cual (ej. el favicon).\n• **src**: Aquí vive tu código. Es donde pasarás el 99% del tiempo.\n• **package.json**: El 'DNI' del proyecto. Lista las dependencias y los scripts (dev, build, preview)."
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "No borres el index.html",
                    content: "En un proyecto Vite, el `index.html` está en la raíz y es el punto de entrada. Si lo borras o mueves, la aplicación no arrancará."
                }
            ],
            description: "Análisis de la anatomía de un proyecto moderno de React.",
            codeJs: `// src/main.jsx - Punto de entrada de JS
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
            syntaxDescription: "La estructura separa la configuración del entorno (raíz) de la lógica de negocio y componentes (src).",
            useCases: [
                {
                    title: "Organización de Código",
                    description: "Mantener un proyecto limpio y escalable separando componentes, estilos y activos."
                }
            ]
        },
        {
            id: "hola-mundo",
            title: "6. Hola mundo en React",
            videoUrl: "https://www.youtube.com/watch?v=HPnGyh2zHy0",
            content: [
                {
                    title: "JSX: JavaScript XML",
                    text: "JSX es una extensión de sintaxis que parece HTML pero funciona dentro de JavaScript. Permite escribir la estructura de tu UI de forma visual e intuitiva."
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Etiqueta Única",
                    content: "Un componente solo puede retornar un único elemento padre. Si tienes varios, envuélvelos en un Fragment `<>...</>`.",
                    code: "return (\n  <>\n    <h1>Título</h1>\n    <p>Párrafo</p>\n  </>\n);"
                }
            ],
            description: "Tu primer componente y la sintaxis JSX.",
            codeJs: `function App() {
  return (
    <div className="container">
      <h1>Hola Mundo desde React</h1>
      <p>Aprendiendo la base de la UI moderna.</p>
    </div>
  );
}`,
            codeTs: `const App: React.FC = () => {
  return (
    <div>
      <h1>Hola Mundo (TS)</h1>
    </div>
  );
};`,
            syntaxDescription: "JSX transforma el código que parece HTML en llamadas a funciones de React que crean objetos en memoria (Virtual DOM).",
            useCases: [
                {
                    title: "Componentes Básicos",
                    description: "Creación de elementos estáticos iniciales."
                }
            ]
        },
        {
            id: "operadores-ternarios",
            title: "9. Operadores Ternarios en JSX",
            videoUrl: "https://www.youtube.com/watch?v=gl9lJw78lVY",
            content: [
                {
                    title: "Renderizado Condicional",
                    text: "El operador ternario (`condición ? true : false`) es la forma más limpia de decidir qué mostrar en pantalla dentro de JSX."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Operador &&",
                    content: "Si solo quieres mostrar algo cuando es true (y nada si es false), usa `&&`.",
                    code: "{estaLogueado && <LogoutButton />}"
                }
            ],
            description: "Lógica de decisión dentro de tu interfaz.",
            codeJs: `function Profile({ isAdmin }) {
  return (
    <div>
      {isAdmin 
        ? <button>Panel de Control</button> 
        : <p>Acceso Limitado</p>
      }
    </div>
  );
}`,
            syntaxDescription: "Sintaxis: `(condición) ? (si es verdad) : (si es mentira)`. Es vital porque dentro de las llaves `{}` de JSX no puedes usar `if/else` tradicionales.",
            useCases: [
                {
                    title: "Modo Oscuro",
                    description: "Cambiar clases o textos según el tema activo."
                }
            ]
        },
        {
            id: "css-styles",
            title: "10. Estilos CSS en React",
            videoUrl: "https://www.youtube.com/watch?v=PjJxdzgdF48",
            content: [
                {
                    title: "Formas de aplicar estilos",
                    text: "• **CSS Tradicional**: Importas archivos .css globales.\n• **Estilos en línea**: Usas el atributo `style` pasando un objeto JS.\n• **CSS Modules**: Archivos que generan clases únicas para evitar colisiones entre componentes."
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "CamelCase en Estilos",
                    content: "En `style={{}}`, las propiedades usan camelCase (ej: `backgroundColor` en lugar de `background-color`).",
                    code: "<div style={{ color: 'red', fontSize: '20px' }}>"
                }
            ],
            description: "Personalización visual de tus componentes.",
            codeJs: `// CSS Modules (Recomendado)
import styles from './App.module.css';

function App() {
  return <div className={styles.container}>Estilizado</div>;
}`,
            syntaxDescription: "JSX usa `className` en lugar de `class` porque `class` es una palabra reservada en JavaScript.",
            useCases: [
                {
                    title: "Diseño Visual",
                    description: "Aplicar la identidad visual de tu aplicación."
                }
            ]
        },
        {
            id: "tailwind-install",
            title: "11-12. Tailwind CSS en React",
            videoUrl: "https://www.youtube.com/watch?v=JCfpO3Cpi_Q",
            content: [
                {
                    title: "Utility-First CSS",
                    text: "Tailwind es el framework de moda. En lugar de escribir CSS aparte, aplicas clases de utilidad directamente en el HTML/JSX (ej: `flex`, `pt-4`, `text-blue-500`)."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "VS Code Extension",
                    content: "Instala 'Tailwind CSS IntelliSense' para ver sugerencias de clases mientras escribes."
                }
            ],
            description: "Acelera tu desarrollo con clases de utilidad predefinidas.",
            codeJs: `<div className="flex bg-gray-100 p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-indigo-600">Tailwind Power</h2>
</div>`,
            syntaxDescription: "Configuras Tailwind una vez y luego diseñas todo tu sitio sin salir de tu archivo JSX.",
            useCases: [
                {
                    title: "Desarrollo Ágil",
                    description: "Crear interfaces complejas rápidamente sin archivos CSS gigantes."
                }
            ]
        },
        {
            id: "js-map",
            title: "13-14. Renderizado de Listas y Objetos",
            videoUrl: "https://www.youtube.com/watch?v=-yw_4CkPPTk",
            content: [
                {
                    title: "Transformando Datos",
                    text: "En React, no usas bucles `for`. Usas `.map()` para transformar un array de datos en un array de elementos JSX."
                },
                {
                    title: "Manejo de Objetos",
                    text: "Casi siempre iterarás sobre arrays de objetos que vienen de una base de datos."
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "La Prop 'key'",
                    content: "React necesita una prop llamada `key` (única) para identificar cada elemento de la lista y saber cuál cambió.",
                    code: "<li key={user.id}>{user.name}</li>"
                }
            ],
            description: "Cómo mostrar colecciones de datos dinámicamente.",
            codeJs: `const users = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Pedro' }
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
            syntaxDescription: "`.map()` recibe una función que retorna el JSX para cada item del array.",
            useCases: [
                {
                    title: "Feed de Datos",
                    description: "Mostrar feeds de redes sociales, listas de tareas o catálogos."
                }
            ]
        },
        {
            id: "snippets",
            title: "18. Productividad con Snippets",
            videoUrl: "https://www.youtube.com/watch?v=yUFViXV1Sgw",
            content: [
                {
                    title: "Escribe menos, crea más",
                    text: "Los snippets son atajos de teclado que expanden bloques de código completos. Ejemplo: escribes `rfce` + Tab y se crea un componente funcional completo."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Snippets Comunes",
                    content: "• `rfce`: React Functional Component.\n• `useState`: Atajo para crear un estado."
                }
            ],
            description: "Trucos para triplicar tu velocidad de programación.",
            codeJs: `// Escribes: rafce
// Presionas: Tab
// Genera:
import React from 'react'

const MyComponent = () => {
  return (
    <div>MyComponent</div>
  )
}

export default MyComponent`,
            useCases: [
                {
                    title: "Eficiencia",
                    description: "Evitar escribir código repetitivo y boilerplate."
                }
            ]
        },
        {
            id: "local-images",
            title: "23-24. Gestión de Imágenes y Carga 'Lazy'",
            videoUrl: "https://www.youtube.com/watch?v=B42QO5JuZJs",
            content: [
                {
                    title: "Importando Imágenes",
                    text: "En React (con Vite), puedes importar imágenes como si fueran módulos JS para que el compilador gestione sus rutas correctamente."
                },
                {
                    title: "Lazy Loading",
                    text: "Añadir `loading=\"lazy\"` a tus imágenes permite que el navegador solo las descargue cuando el usuario esté cerca de verlas, acelerando la carga inicial."
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Directorio Assets",
                    content: "Guarda tus imágenes locales en `src/assets` para que Vite las optimice durante la construcción."
                }
            ],
            description: "Manejo eficiente de recursos gráficos.",
            codeJs: `import logo from './assets/react.svg';

function Logo() {
  return <img src={logo} alt="React Logo" loading="lazy" />;
}`,
            syntaxDescription: "Usamos `src={variable}` en lugar de `src=\"ruta\"` para que el gestor de paquetes resuelva el path final.",
            useCases: [
                {
                    title: "Optimización de Sitios",
                    description: "Mejorar el puntaje de Core Web Vitals y la experiencia de usuario."
                }
            ]
        }
    ]
};
