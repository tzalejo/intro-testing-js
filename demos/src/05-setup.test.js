describe('Set', () => {
  // beforeAll(): se ejecuta antes de todas las pruebas.
  beforeAll(() => {
    console.log('levantar algo o correr otro servicio antes de los test');
  });

  // se ejecuta después de todas las pruebas Nota: Todas estas funciones se ejecutan dentro del alcance del scope.
  afterAll(() => {
    console.log('corre luego de correr todo lo que contiene el describe');
  });

  // beforeEach(): se ejecuta antes de cada prueba.
  beforeEach(() => {
    console.log('Corre antes de cada test q se este por ejecutar');
  });

  // afterEach(): se ejecuta después de cada prueba.
  afterEach(() => {
    console.log('Corre despues de cada test q se ejecuto');
  });

  test('case 1', () => {
    console.log('case 1');
    expect(1 + 1).toBe(2);
  });

  test('case 2', () => {
    console.log('case 2');
    expect(1 + 2).toBe(3);
  });

  describe('Other group', () => {
    test('case 3', () => {
      console.log('case 3');
      expect(1 + 1).toBe(2);
    });

    test('case 4', () => {
      console.log('case 4');
      expect(1 + 2).toBe(3);
    });
  });
});
