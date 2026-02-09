export const testingCategory = {
  title: "10. Pruebas Unitarias",
  topics: [
    {
      id: "ng-unit-tests",
      title: "Unit Testing con TestBed",
      content: [
        {
          title: "¿Qué es?",
          text: "Es la práctica de escribir código para probar que las pequeñas unidades de tu aplicación (como un método de un servicio) funcionan como se espera."
        },
        {
          title: "¿Por qué es importante?",
          text: "Da seguridad al desarrollador. Permite hacer cambios grandes en el futuro (refactorizar) con la confianza de que nada se rompió."
        },
        {
          title: "¿Qué problema real resuelve?",
          text: "Evita que subas a producción errores obvios que habrías detectado si hubieras probado ese componente de forma automática."
        },
        {
          title: "¿Cuándo conviene usarlo y cuándo no?",
          text: "Conviene en proyectos empresariales y de largo plazo. No siempre es obligatorio en prototipos rápidos o MVPs de aprendizaje muy inicial."
        },
        {
          title: "¿Qué conocimientos previos requiere?",
          text: "Domino de TypeScript y lógica del componente a probar."
        }
      ],
      syntaxDescription: "Un test unitario es como un control de calidad en una fábrica de tornillos: compruebas uno por uno si cumplen con la medida exacta antes de enviarlos a montar el coche entero (la aplicación).",
      description: "Garantía de calidad mediante pruebas automáticas.",
      code: `it('debería sumar correctamente', () => {
  const service = inject(MathService);
  expect(service.add(2, 2)).toBe(4);
});`,
      useCases: [
        {
          title: "Probar un Pipe",
          description: "Verificar que el pipe de traducción devuelva 'Hola' cuando recibe 'Hello'.",
          code: `const pipe = new TraduccionPipe(); \n expect(pipe.transform('Hello')).toBe('Hola');`
        },
        {
          title: "Simular Clic",
          description: "Probar que al hacer clic en el botón del HTML, se llame a la función del código TypeScript.",
          code: `fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null); \n expect(spy).toHaveBeenCalled();`
        }
      ]
    }
  ]
};
