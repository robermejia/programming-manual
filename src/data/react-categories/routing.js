
export const routingCategory = {
    title: "6. Routing (Navegación)",
    topics: [
        {
            id: "routing-intro",
            title: "Introducción a React Router",
            videoUrl: "https://www.youtube.com/watch?v=dRMxIhjAEdY",
            content: [
                {
                    title: "¿Qué es el enrutamiento?",
                    text: "En una Single Page Application (SPA), el navegador nunca recarga la página por completo. El enrutamiento es el proceso de cambiar lo que se ve en pantalla basándose en la URL actual sin parpadeos ni esperas."
                },
                {
                    title: "React Router DOM",
                    text: "Es la librería estándar. Permite mapear URLs a componentes de forma declarativa."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "SPA vs Multi-page",
                    content: "En una SPA, la navegación se siente como una aplicación móvil: instantánea y fluida."
                }
            ],
            description: "Conceptos base de navegación sin recarga de página.",
            codeJs: "npm install react-router-dom",
            syntaxDescription: "Instala la librería y envuelve tu app con un Router.",
            useCases: [
                {
                    title: "Navegación Web",
                    description: "Crear sitios complejos con múltiples secciones."
                }
            ]
        },
        {
            id: "assign-routes",
            title: "Configuración de Rutas",
            videoUrl: "https://www.youtube.com/watch?v=EkUToy29dBY",
            content: [
                {
                    title: "Estructura Base",
                    text: "• **BrowserRouter**: Activa el historial de navegación.\n• **Routes**: El cerebro que decide qué ruta coincide con la URL.\n• **Route**: Empareja un `path` con un `element` (tu componente)."
                }
            ],
            tips: [
                {
                    type: "goodPractice",
                    title: "Ruta 404",
                    content: "Crea siempre una ruta con `path=\"*\"` para mostrar una página de error amigable si el usuario escribe mal la URL."
                }
            ],
            description: "Cómo definir el mapa de navegación de tu sitio.",
            codeJs: `import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`,
            syntaxDescription: "El componente `element` es una instancia del componente JSX.",
            useCases: [
                {
                    title: "Apps Multi-vista",
                    description: "Estructurar el flujo de navegación principal."
                }
            ]
        },
        {
            id: "link-navigation",
            title: "Enlaces e Interacción (Link)",
            videoUrl: "https://www.youtube.com/watch?v=4Qh8gvI1Y6w",
            content: [
                {
                    title: "Adiós a <a>",
                    text: "La etiqueta `<a>` clásica rompe la 'magia' de React al recargar la página. `<Link>` permite saltar entre rutas instantáneamente manteniendo el estado de la app."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Estilos Activos",
                    content: "Usa `<NavLink>` para crear menús donde el botón de la página actual se ilumina automáticamente usando la prop `isActive`."
                }
            ],
            description: "Cómo crear menús y enlaces que no refresquen el sitio.",
            codeJs: `import { Link, NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <Link to="/perfil">Perfil</Link>
      <NavLink 
        to="/blog" 
        style={({isActive}) => ({ color: isActive ? 'blue' : 'black' })}
      >
        Blog
      </NavLink>
    </nav>
  );
}`,
            syntaxDescription: "Usa el atributo `to` en lugar de `href`.",
            useCases: [
                {
                    title: "Sistemas de Menús",
                    description: "Navegación de usuario entre categorías o perfiles."
                }
            ]
        },
        {
            id: "use-navigate",
            title: "Control Programático (useNavigate)",
            videoUrl: "https://www.youtube.com/watch?v=gY9wM-J9-Gk",
            content: [
                {
                    title: "Navegar por Código",
                    text: "A veces no quieres que el usuario haga clic, sino que la app lo mueva automáticamente (ej: después de que un pago sea exitoso o tras loguearse)."
                }
            ],
            tips: [
                {
                    type: "recommendation",
                    title: "Redirección Atrás",
                    content: "Usa `navigate(-1)` para imitar el botón 'Atrás' del navegador.",
                    code: "<button onClick={() => navigate(-1)}>Volver</button>"
                }
            ],
            description: "Forzar cambios de URL desde la lógica de tus funciones.",
            codeJs: `import { useNavigate } from 'react-router-dom';

function CheckOut() {
  const navigate = useNavigate();

  const handleFinish = () => {
    saveOrder();
    navigate('/success'); // Redirección automática
  };

  return <button onClick={handleFinish}>Pagar</button>;
}`,
            syntaxDescription: "El hook devuelve una función que puedes llamar con la ruta de destino.",
            useCases: [
                {
                    title: "Workflows de Usuario",
                    description: "Redirecciones lógicas tras procesos exitosos o fallidos."
                }
            ]
        },
        {
            id: "nested-routes",
            title: "Rutas Anidadas y <Outlet />",
            videoUrl: "https://www.youtube.com/watch?v=oK-K_CTaAd0",
            content: [
                {
                    title: "Heredando Estructuras",
                    text: "Permiten mantener partes de la UI fijas (como un sidebar lateral) mientras solo cambia una parte central. El componente padre define dónde aparecerán sus hijos usando `<Outlet />`."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Index Routes",
                    content: "Si quieres que un componente aparezca por defecto cuando entras a la ruta padre, usa la prop `index`.",
                    code: "<Route index element={<DashboardHome />} />"
                }
            ],
            description: "Arquitecturas complejas con layouts compartidos.",
            codeJs: `// 1. Configuración
<Route path="/admin" element={<AdminLayout />}>
  <Route path="users" element={<UserList />} />
  <Route path="settings" element={<Settings />} />
</Route>

// 2. En AdminLayout.jsx
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-grid">
      <Sidebar />
      <main>
        <Outlet /> {/* Aquí se renderizarán los componentes hijos */}
      </main>
    </div>
  );
}`,
            syntaxDescription: "Encapsulas rutas dentro de otras rutas en el mapa principal.",
            useCases: [
                {
                    title: "Paneles de Administración",
                    description: "Sistemas con menús laterales fijos y contenido dinámico."
                }
            ]
        },
        {
            id: "dynamic-routes",
            title: "Parámetros Dinámicos (useParams)",
            videoUrl: "https://www.youtube.com/watch?v=FypQ59oYYXk",
            content: [
                {
                    title: "URLs con Variables",
                    text: "Permiten crear una plantilla única para miles de páginas (ej: `/post/123`). Definimos la variable en la ruta con `:`."
                }
            ],
            tips: [
                {
                    type: "error",
                    title: "Tipado en useParams",
                    content: "useParams siempre devuelve strings. Si esperas un número, acuérdate de convertirlo.",
                    code: "const { id } = useParams();\nconst numericId = parseInt(id);"
                }
            ],
            description: "Crear páginas que dependan de un ID o nombre en la URL.",
            codeJs: `// Configuración: <Route path="/post/:slug" element={<SinglePost />} />

import { useParams } from 'react-router-dom';

function SinglePost() {
  const { slug } = useParams();
  return <div>Viendo el artículo: {slug}</div>;
}`,
            syntaxDescription: "El ':' marca el inicio de una variable dinámica en la ruta.",
            useCases: [
                {
                    title: "Vistas de Ítem",
                    description: "Páginas de artículos, productos o perfiles individuales."
                }
            ]
        },
        {
            id: "search-params",
            title: "Query Strings (useSearchParams)",
            videoUrl: "https://www.youtube.com/watch?v=X0_2Ksbu8Vw",
            content: [
                {
                    title: "Filtros en la URL",
                    text: "Maneja datos que no forman parte de la ruta principal sino de la búsqueda (ej: `/tienda?categoria=electronics&sort=asc`)."
                }
            ],
            tips: [
                {
                    type: "idea",
                    title: "Persistencia",
                    content: "Usar SearchParams es genial porque los filtros se guardan en la URL; si el usuario refresca o comparte el link, los filtros seguirán ahí."
                }
            ],
            description: "Manejo de filtros y ordenamiento mediante query strings.",
            codeJs: `import { useSearchParams } from 'react-router-dom';

function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get('categoria');

  return (
    <button onClick={() => setSearchParams({ categoria: 'ropa' })}>
      Filtrar por Ropa
    </button>
  );
}`,
            syntaxDescription: "Funciona de forma parecida a useState pero sincronizado con la URL.",
            useCases: [
                {
                    title: "Filtros de Búsqueda",
                    description: "Buscadores, filtrado de catálogos y sistemas de ordenamiento."
                }
            ]
        }
    ]
};
