import { vocabularyCategory } from './mysql-categories/vocabulary';
import { ddlCategory } from './mysql-categories/ddl';
import { crudCategory } from './mysql-categories/crud';
import { advancedQueryingCategory } from './mysql-categories/advanced_querying';
import { functionsCategory } from './mysql-categories/functions';
import { programmabilityCategory } from './mysql-categories/programmability';
import { administrationCategory } from './mysql-categories/administration';
import { flashcardsCategory } from './mysql-categories/flashcards';

export const categories = [
    vocabularyCategory,
    {
        title: "1. Introducción a MySQL",
        topics: [
            {
                id: "mysql-basics",
                title: "¿Qué es MySQL?",
                videoUrl: "https://www.youtube.com/watch?v=gGD585WL0iE",
                content: [
                    {
                        title: "Fundamentos",
                        text: "MySQL es un sistema de gestión de bases de datos relacionales (RDBMS) basado en SQL (Structured Query Language). Es de código abierto, extremadamente rápido y escalable."
                    },
                    {
                        title: "El Modelo Relacional",
                        text: "Organiza los datos en tablas con filas y columnas, relacionadas entre sí mediante llaves (claves). Es ideal para datos estructurados y aplicaciones que requieren alta integridad."
                    }
                ],
                tips: [
                    {
                        type: "idea",
                        title: "¿Por qué MySQL?",
                        content: "Es el estándar de la industria para aplicaciones web, utilizado por gigantes como Facebook, Twitter y YouTube."
                    }
                ],
                description: "Introducción histórica y funcional a MySQL y el modelo relacional.",
                code: "-- MySQL usa SQL estándar\nSELECT VERSION();",
                useCases: [
                    {
                        title: "Sitios Web Dinámicos",
                        description: "Gestión de usuarios y contenido en blogs, e-commerce y redes sociales."
                    }
                ]
            },
            {
                id: "mysql-install",
                title: "Instalación y Configuración",
                videoUrl: "https://www.youtube.com/watch?v=IR9evKlxnFQ",
                content: [
                    {
                        title: "Instalación Multiplataforma",
                        text: "MySQL puede instalarse en Windows (vía MSI), MacOS (vía DMG o Homebrew) y Linux (vía repositorios apt/yum)."
                    },
                    {
                        title: "Herramientas de Cliente",
                        text: "Puedes interactuar con el servidor usando la consola (MySQL Shell) o interfaces gráficas como MySQL Workbench."
                    }
                ],
                tips: [
                    {
                        type: "warning",
                        title: "Seguridad Inicial",
                        content: "Después de instalar, corre siempre `mysql_secure_installation` para remover usuarios anónimos y bases de datos de prueba."
                    }
                ],
                description: "Guía básica para poner en marcha el servidor MySQL en tu sistema.",
                code: "# Versión en Linux\nsudo apt install mysql-server",
                useCases: [
                    {
                        title: "Entorno Local",
                        description: "Configurar un servidor de base de datos para desarrollo."
                    }
                ]
            },
            {
                id: "mysql-connection",
                title: "Conexión al Servidor",
                videoUrl: "https://www.youtube.com/watch?v=RJGNU9e_Z40",
                content: [
                    {
                        title: "Estableciendo el Enlace",
                        text: "Para conectar necesitas un host (ej. localhost), un puerto (defecto 3306), un usuario y una contraseña."
                    }
                ],
                description: "Cómo autenticarse y abrir una sesión en el servidor MySQL.",
                code: "mysql -u root -p",
                useCases: [
                    {
                        title: "Acceso Remoto",
                        description: "Configurar el servidor para permitir conexiones desde otras IPs (ajustando bind-address)."
                    }
                ]
            }
        ]
    },
    ddlCategory,
    crudCategory,
    advancedQueryingCategory,
    functionsCategory,
    programmabilityCategory,
    administrationCategory,
    flashcardsCategory
];

