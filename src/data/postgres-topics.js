import { vocabularyCategory } from './postgres-categories/vocabulary.js';
import { fundamentosCategory } from './postgres-categories/fundamentos.js';
import { manipulacionCategory } from './postgres-categories/manipulacion.js';
import { consultasAvanzadasCategory } from './postgres-categories/consultas-avanzadas.js';
import { funcionesUtilidadesCategory } from './postgres-categories/funciones-utilidades.js';
import { objetosDbCategory } from './postgres-categories/objetos-db.js';
import { programacionServidorCategory } from './postgres-categories/programacion-servidor.js';
import { especialesCategory } from './postgres-categories/especiales.js';
import { administracionCategory } from './postgres-categories/administracion.js';
import { flashcardsCategory } from './postgres-categories/flashcards.js';

export const categories = [
    vocabularyCategory,
    fundamentosCategory,
    manipulacionCategory,
    consultasAvanzadasCategory,
    funcionesUtilidadesCategory,
    objetosDbCategory,
    programacionServidorCategory,
    especialesCategory,
    administracionCategory,
    flashcardsCategory
];
