export const routingGuardsCategory = {
    title: "5. Routing y Guards",
    topics: [
        {
            id: "ng-routing",
            title: "Configuración de Rutas",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Es el sistema que mapea las URLs del navegador con componentes específicos de Angular."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Es fundamental para crear SPAs (Single Page Applications) donde la navegación es fluida y no requiere recargar la página."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Permite usar el historial del navegador (atrás/adelante) y permite que los usuarios compartan URLs directas a secciones específicas de la app."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene en casi cualquier aplicación. No conviene si solo tienes una vista única muy simple."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Comprensión de rutas web y componentes Angular."
                }
            ],
            syntaxDescription: "El 'Router' es como un mapa de carreteras para tu aplicación. Las 'Routes' definen qué 'camino' (URL) te lleva a qué 'ciudad' (Componente).",
            description: "Navegación dinámica entre vistas.",
            code: `export const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'perfil/:id', component: UserComponent }
];`,
            useCases: [
                {
                    title: "Dashboard de Usuario",
                    description: "Configurar una ruta principal que cargue el panel de control cuando el usuario entra a la web.",
                    code: `{ path: 'dashboard', component: DashboardComponent }`
                },
                {
                    title: "Página 404",
                    description: "Ruta comodín que atrapa cualquier URL inexistente y redirige a una página de 'No encontrado'.",
                    code: `{ path: '**', component: NotFoundComponent }`
                }
            ]
        },
        {
            id: "ng-guards",
            title: "Guards Funcionales",
            content: [
                {
                    title: "¿Qué es?",
                    text: "Son funciones que deciden si una ruta puede activarse o no (por ejemplo, verificando si el usuario está logueado)."
                },
                {
                    title: "¿Por qué es importante?",
                    text: "Proporciona una capa de seguridad en el front-end, evitando que usuarios accedan a vistas privadas."
                },
                {
                    title: "¿Qué problema real resuelve?",
                    text: "Previene errores al intentar cargar componentes que requieren datos de usuario que no están disponibles porque el usuario no inició sesión."
                },
                {
                    title: "¿Cuándo conviene usarlo y cuándo no?",
                    text: "Conviene para cualquier panel de administración o sección privada. No debe ser la única medida de seguridad; la API también debe estar protegida."
                },
                {
                    title: "¿Qué conocimientos previos requiere?",
                    text: "Sistemas de autenticación y servicios."
                }
            ],
            syntaxDescription: "Un 'Guard' es como un agente de seguridad en el aeropuerto: revisa tu documentación (sesión) antes de dejarte pasar por la puerta de embarque (ruta).",
            description: "Protección de rutas ante accesos no autorizados.",
            code: `export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLogged() || inject(Router).createUrlTree(['/login']);
};`,
            useCases: [
                {
                    title: "Zona de Administración",
                    description: "Impedir que un usuario común entre a las rutas de configuración de la empresa.",
                    code: `{ path: 'admin', canActivate: [() => inject(UserService).isAdmin()] }`
                },
                {
                    title: "Confirmar Salida",
                    description: "Mostrar un mensaje de '¿Estás seguro de salir sin guardar?' usando CanDeactivate.",
                    code: `{ path: 'editor', canDeactivate: [() => confirm('¿Salir?')] }`
                }
            ]
        }
    ]
};
