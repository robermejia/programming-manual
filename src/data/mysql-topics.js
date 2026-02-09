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
                details: "MySQL es el sistema de gestión de bases de datos SQL de código abierto más popular, desarrollado y soportado por Oracle.",
                description: "Fundamentos de MySQL.",
                code: `-- Selección básica
SELECT * FROM usuarios WHERE activo = 1;`
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

