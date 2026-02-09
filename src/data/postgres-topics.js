import { vocabularyCategory } from './postgres-categories/vocabulary';
import { fundamentosCategory } from './postgres-categories/fundamentos';
import { manipulacionCategory } from './postgres-categories/manipulacion';
import { consultasAvanzadasCategory } from './postgres-categories/consultas-avanzadas';
import { funcionesUtilidadesCategory } from './postgres-categories/funciones-utilidades';
import { objetosDbCategory } from './postgres-categories/objetos-db';
import { programacionServidorCategory } from './postgres-categories/programacion-servidor';
import { especialesCategory } from './postgres-categories/especiales';
import { administracionCategory } from './postgres-categories/administracion';
import { flashcardsCategory } from './postgres-categories/flashcards';

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
