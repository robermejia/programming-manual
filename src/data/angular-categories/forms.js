export const formsCategory = {
  title: "6. Formularios",
  topics: [
    {
      id: "ng-forms-reactive",
      title: "Formularios Reactivos",
      content: [
        {
          title: "¿Qué es?",
          text: "Es un enfoque para manejar formularios donde el estado y las validaciones se controlan programáticamente desde el código TypeScript."
        },
        {
          title: "¿Por qué es importante?",
          text: "Es más robusto y escalable que el modelo de templates. Facilita las pruebas unitarias y permite validaciones complejas y asíncronas de forma sencilla."
        },
        {
          title: "¿Qué problema real resuelve?",
          text: "Permite reaccionar a cambios en tiempo real en campos específicos (como comprobar si un nombre de usuario ya existe mientras se escribe) sin ensuciar el HTML."
        },
        {
          title: "¿Cuándo conviene usarlo y cuándo no?",
          text: "Conviene para cualquier formulario que tenga lógica de validación o que crezca dinámicamente. No conviene para formularios extremadamente simples de uno o dos campos."
        },
        {
          title: "¿Qué conocimientos previos requiere?",
          text: "Manejo de Observables y clases en Angular."
        }
      ],
      syntaxDescription: "Un formulario reactivo es como un panel de control con indicadores de presión: cada campo tiene su propio sensor ('FormControl') sincronizado en tiempo real con una centralita ('FormGroup') en tu código TS.",
      description: "Formularios potentes controlados desde el código.",
      code: `form = inject(FormBuilder).group({
  email: ['', [Validators.required, Validators.email]]
});`,
      useCases: [
        {
          title: "Registro de Usuario",
          description: "Formulario con validaciones cruzadas (ej. confirmar que las dos contraseñas coincidan).",
          code: `this.fb.group({ pass: [''], confirm: [''] }, { validators: matchValidator });`
        },
        {
          title: "Formulario Dinámico",
          description: "Añadir o quitar campos de entrada (ej. agregar múltiples teléfonos) dinámicamente con FormArray.",
          code: `get phones() { return this.form.get('phones') as FormArray; } \n addPhone() { this.phones.push(this.fb.control('')); }`
        }
      ]
    },
    {
      id: "ng-forms-template",
      title: "Template-driven Forms",
      content: [
        {
          title: "¿Qué es?",
          text: "Es un modelo donde la lógica del formulario se define principalmente en el HTML usando directivas como ngModel."
        },
        {
          title: "¿Por qué es importante?",
          text: "Permite crear formularios básicos muy rápido con poco código TypeScript."
        },
        {
          title: "¿Qué problema real resuelve?",
          text: "Facilita la creación de prototipos rápidos o formularios de contacto sencillos donde no se requiere validación avanzada compleja."
        },
        {
          title: "¿Cuándo conviene usarlo y cuándo no?",
          text: "Conviene para formularios muy básicos. No conviene si el formulario es grande o requiere validaciones dinámicas dependientes entre campos."
        },
        {
          title: "¿Qué conocimientos previos requiere?",
          text: "HTML básico y directivas de Angular."
        }
      ],
      syntaxDescription: "Los formularios de template son como un cuaderno de notas: tú simplemente escribes en el papel (HTML) mediante [(ngModel)] y Angular se encarga de guardar y mostrar lo que escribiste sin que crees una base de datos compleja.",
      description: "Formularios rápidos basados en el HTML.",
      code: `<form #f="ngForm" (ngSubmit)="save(f)">
  <input name="user" ngModel required>
</form>`,
      useCases: [
        {
          title: "Buscador Simple",
          description: "Capturar el texto de una barra de búsqueda para filtrar una lista local.",
          code: `<input name="search" [(ngModel)]="term">`
        },
        {
          title: "Encuesta Rápida",
          description: "Recoger opciones de radio buttons o checkboxes en un formulario de opinión de un solo paso.",
          code: `<input type="radio" name="opt" ngModel value="A"> Opción A`
        }
      ]
    }
  ]
};
