export const directivesPipesCategory = {
  title: "3. Directivas y Pipes",
  topics: [
    {
      id: "ng-directives",
      title: "Directivas de Atributo",
      content: [
        {
          title: "¿Qué es?",
          text: "Son clases que modifican el comportamiento o la apariencia de un elemento HTML, componente o directiva."
        },
        {
          title: "¿Por qué es importante?",
          text: "Permite reutilizar lógica de manipulación del DOM en múltiples lugares sin duplicar código."
        },
        {
          title: "¿Qué problema real resuelve?",
          text: "Evita tener que escribir el mismo código de estilo o eventos en cada elemento individualmente."
        },
        {
          title: "¿Cuándo conviene usarlo y cuándo no?",
          text: "Conviene para comportamientos visuales genéricos (ej. resaltar al pasar el mouse). No conviene si el comportamiento es exclusivo de un solo componente (mejor manejarlo dentro del componente)."
        },
        {
          title: "¿Qué conocimientos previos requiere?",
          text: "Manejo de decoradores y ElementRef."
        }
      ],
      syntaxDescription: "Una directiva de atributo es como un 'disfraz' que le pones a una etiqueta HTML normal para darle superpoderes. Con @Directive defines el disfraz, y con el selector [appLabel] eliges quién debe llevarlo puesto.",
      description: "Modifica el comportamiento o apariencia de elementos DOM.",
      code: `@Directive({ selector: '[appBold]', standalone: true })
export class BoldDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.fontWeight = 'bold';
  }
}`,
      useCases: [
        {
          title: "Subrayado al Pasar el Mouse",
          description: "Cambiar el estilo de un texto automáticamente cuando el usuario posiciona el cursor encima.",
          code: `@HostListener('mouseenter') onEnter() { this.el.nativeElement.style.textDecoration = 'underline'; }`
        },
        {
          title: "Restringir Entrada de Números",
          description: "Directiva que impide que el usuario escriba letras en un campo que solo debe aceptar números.",
          code: `@HostListener('keydown', ['$event']) onKey(e: KeyboardEvent) { if (!/[0-9]/.test(e.key)) e.preventDefault(); }`
        }
      ]
    },
    {
      id: "ng-pipes",
      title: "Pipes Personalizados",
      content: [
        {
          title: "¿Qué es?",
          text: "Son funciones que transforman datos en el template mediante el símbolo '|'."
        },
        {
          title: "¿Por qué es importante?",
          text: "Mantiene la lógica de transformación separada de la lógica de negocio y permite reutilizar formatos en toda la app."
        },
        {
          title: "¿Qué problema real resuelve?",
          text: "Evita tener funciones pesadas de formateo dentro de los componentes que se ejecutan innecesariamente en cada ciclo de vida."
        },
        {
          title: "¿Cuándo conviene usarlo y cuándo no?",
          text: "Conviene para transformaciones visuales simples. No conviene para filtrado de listas grandes (afecta el rendimiento, mejor filtrar en el TS)."
        },
        {
          title: "¿Qué conocimientos previos requiere?",
          text: "Interfaz PipeTransform."
        }
      ],
      syntaxDescription: "Un pipe es como un túnel de lavado para tus datos. Los datos entran 'sucios' por un lado (ej. un timestamp largo) y salen relucientes y formateados (ej. 'hace 5 min') por el otro mediante el símbolo '|'.",
      description: "Transformación de datos en el template.",
      code: `@Pipe({ name: 'traduccion', standalone: true })
export class TraduccionPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'Hello' ? 'Hola' : value;
  }
}`,
      useCases: [
        {
          title: "Formateador de Teléfono",
          description: "Convertir un número plano como 987654321 en un formato legible (987-654-321) en la vista.",
          code: `transform(v: string) { return v.replace(/(\\d{3})(\\d{3})(\\d{3})/, '$1-$2-$3'); }`
        },
        {
          title: "Ocultar Contraseña",
          description: "Pipe que reemplaza cualquier texto por asteriscos para mostrar una vista previa protegida.",
          code: `transform(v: string) { return '*'.repeat(v.length); }`
        }
      ]
    }
  ]
};
