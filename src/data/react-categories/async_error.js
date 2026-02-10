
export const asyncErrorCategory = {
  title: "9. Async & Error Handling",
  topics: [
    {
      id: "suspense",
      title: "Suspense",
      content: [
        {
          title: "¿Qué es?",
          text: "Suspense permite orquestar estados de carga (loading states) de manera declarativa. React 'suspende' el renderizado de un componente que espera datos y muestra un fallback (ej. spinner) hasta que esté listo."
        },
        {
          title: "¿Por qué es importante?",
          text: "Simplifica la lógica de UI, evitando variables booleanas `isLoading` por todos lados y eliminando parpadeos (waterfalls) al coordinar la carga de múltiples componentes."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Al usar `React.lazy`, el hook `use` para promesas, o librerías de fetching compatibles con Suspense (como Next.js o React Query)."
        }
      ],
      tips: [
        {
          type: "idea",
          title: "Idea clave",
          content: "Puedes anidar múltiples fronteras de Suspense para cargar partes de la página independientemente (ej. Header carga rápido, Feed carga lento).",
          code: "<Suspense fallback={<HeaderSkeleton />}>\n  <Header />\n  <Suspense fallback={<FeedSkeleton />}>\n    <Feed />\n  </Suspense>\n</Suspense>"
        }
      ],
      description: "Manejo declarativo de carga asíncrona.",
      codeJs: `// JavaScript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ComponenteAsincrono />
    </Suspense>
  );
}`,
      codeTs: `// TypeScript
import { Suspense } from 'react';

function App(): JSX.Element {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ComponenteAsincrono />
    </Suspense>
  );
}`,
      syntaxDescription: "Es como el telón de un teatro. Mientras los actores (datos/componentes) se cambian de ropa o preparan el escenario detrás, `Suspense` mantiene el telón cerrado (o muestra un cartel de 'Cargando...') para que el público no vea el caos. Cuando todo está listo, abre el telón.",
      useCases: [
        {
          title: "Streaming de Componentes",
          description: "Carga progresiva de diferentes secciones de la página.",
          codeJs: `// JavaScript
import { Suspense } from 'react';
import { UserProfile, UserPosts, UserFriends } from './components';

export default function UserPage() {
  return (
    <div className="layout">
      {/* Carga rápida */}
      <nav>Sidebar</nav>
      
      <main>
        {/* Secciones independientes con sus propios loaders */}
        
        <Suspense fallback={<SkeletonProfile />}>
          <UserProfile />
        </Suspense>
        
        <div className="content-grid">
          <Suspense fallback={<Spinner />}>
            <UserPosts />
          </Suspense>
          
          <Suspense fallback={<Spinner />}>
            <UserFriends />
          </Suspense>
        </div>
      </main>
    </div>
  );
}`,
          codeTs: `// TypeScript
import { Suspense } from 'react';
import { UserProfile } from './components';

export default function UserPage(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}`
        }
      ]
    },
    {
      id: "lazy",
      title: "lazy",
      content: [
        {
          title: "¿Qué es?",
          text: "React.lazy permite renderizar una importación dinámica como un componente regular, habilitando el 'Code Splitting' automático."
        },
        {
          title: "¿Por qué es importante?",
          text: "Reduce el tamaño inicial de la aplicación. El navegador solo descarga el JavaScript de un componente cuando el usuario realmente lo necesita (ej. al abrir un modal o cambiar de ruta)."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Para rutas pesadas (Páginas de Admin) o componentes grandes que no son visibles al inicio (Modales complejos, Gráficos)."
        }
      ],
      tips: [
        {
          type: "goodPractice",
          title: "Buenas prácticas",
          content: "Úsalo siempre con el Router. Divide tu app por rutas para que el usuario solo descargue lo que ve.",
          code: "const Home = lazy(() => import('./Home'));\n// ...\n<Route path=\"/\" element={<Home />} />"
        }
      ],
      description: "Lazily loading components.",
      codeJs: `// JavaScript
import { lazy, Suspense } from 'react';

const ComponentePesado = lazy(() => import('./ComponentePesado'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ComponentePesado />
    </Suspense>
  );
}`,
      codeTs: `// TypeScript
import { lazy, Suspense } from 'react';

const ComponentePesado = lazy(() => import('./ComponentePesado'));

function App(): JSX.Element {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ComponentePesado />
    </Suspense>
  );
}`,
      syntaxDescription: "Es como no comprar toda la comida del mes en una sola visita al súper. `lazy` te permite ir a comprar (descargar código) solo la cena de hoy cuando tengas hambre. Si nunca vas a comer pescado, nunca lo compras (o descargas).",
      useCases: [
        {
          title: "Rutas Diferidas (Code Splitting)",
          description: "Carga de páginas solo cuando el usuario navega a ellas.",
          codeJs: `// JavaScript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Estos archivos NO se descargan en el bundle inicial
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function AppRouter() {
  return (
    <BrowserRouter>
      {/* Suspense maneja el estado mientras descarga el chunk JS */}
      <Suspense fallback={<div className="page-loader" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
          codeTs: `// TypeScript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`
        }
      ]
    },
    {
      id: "error-boundaries",
      title: "Error Boundaries",
      content: [
        {
          title: "¿Qué es?",
          text: "Los Error Boundaries son componentes que capturan errores de JavaScript en sus hijos, registran el error y muestran una UI de repuesto en lugar de colapsar toda la app."
        },
        {
          title: "¿Por qué es importante?",
          text: "Sin ellos, un error en un botón pequeño podría poner la pantalla en blanco (White Screen of Death). Aíslan los fallos para que el resto de la app siga funcionando."
        },
        {
          title: "¿Cuándo usarlo?",
          text: "Envuelve widgets individuales de terceros o secciones principales de la ruta para contener daños."
        }
      ],
      tips: [
        {
          type: "error",
          title: "Error común",
          content: "Los Error Boundaries NO capturan errores en: Event Handlers (usa try/catch), código asíncrono (setTimeout), o Server Side Rendering.",
          code: "// ❌ El ErrorBoundary no lo verá\nconst onClick = () => {\n  throw new Error('Boom'); \n};\n\n// ✅ Usa try/catch para eventos\nconst onClick = () => {\n  try { ... } catch (e) { setError(e); }\n};"
        },
        {
          type: "recommendation",
          title: "Recomendación",
          content: "Usa la librería `react-error-boundary` para una API más moderna basada en hooks y componentes funcionales.",
          code: "<ErrorBoundary \n  FallbackComponent={ErrorPage}\n  onReset={() => resetState()}\n>\n  <Component />\n</ErrorBoundary>"
        }
      ],
      description: "Captura de errores.",
      codeJs: `// JavaScript
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  
  render() {
    if (this.state.hasError) return <h1>Error</h1>;
    return this.props.children;
  }
}`,
      codeTs: `// TypeScript
import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.log("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto personalizada
      return this.props.fallback;
    }

    return this.props.children;
  }
}`,
      syntaxDescription: "Es como un airbag o una red de seguridad. Si un acróbata (componente hijo) se cae (error), la red lo atrapa y el show continúa. Sin el cartel, la caída del acróbata detendría todo el circo (pantalla blanca).",
      useCases: [
        {
          title: "Protección de Widgets",
          description: "Aislar fallos en componentes secundarios para no romper la app principal.",
          codeJs: `// JavaScript
import ErrorBoundary from './ErrorBoundary';

function Dashboard() {
  return (
    <div className="dashboard-grid">
      <div className="main-content">
        <MainStats />
      </div>
      
      <div className="sidebar-widgets">
        {/* Si WidgetClima falla, muestra el fallback, 
            pero MainStats sigue visible */}
        <ErrorBoundary fallback={<p>Clima no disponible</p>}>
          <WidgetClima />
        </ErrorBoundary>

        <ErrorBoundary fallback={<p>Bolsa no disponible</p>}>
          <WidgetBolsa />
        </ErrorBoundary>
      </div>
    </div>
  );
}`,
          codeTs: `// TypeScript
import ErrorBoundary from './ErrorBoundary';

function Dashboard(): JSX.Element {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <WidgetClima />
      </ErrorBoundary>
    </div>
  );
}`
        }
      ]
    }
  ]
};
