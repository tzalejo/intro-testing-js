const Person = require('./06-person');

describe('Test for Person', () => {
  let person;

  beforeAll(() => {
    person = new Person('Alejo', 45, 1.7);
  });

  test('should return down', () => {
    person.weight = 45;
    const imc = person.calcIMC();
    expect(imc).toBe('down');
  });

  test('should return normal', () => {
    person.weight = 59;
    const imc = person.calcIMC();

    expect(imc).toBe('normal');
  });


  test('should return overweight', () => {
    person.weight = 65;
    const imc = person.calcIMC();

    expect(imc).toBe('overweight');
  });
});
