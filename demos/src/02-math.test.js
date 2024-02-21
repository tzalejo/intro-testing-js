const { sum, divide, multiply } = require('./02-math');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('should be 4', () => {
  const rta = multiply(2, 2);
  expect(rta).toBe(4);
});

test('should divide', () => {
  const rta = divide(6, 2);
  expect(rta).toBe(3);
});

test('should divide for zero', () => {
  const rta = divide(6, 0);
  expect(rta).toBeNull();
});
