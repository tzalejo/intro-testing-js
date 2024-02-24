const { faker } = require('@faker-js/faker');

const generateOneBook = () => {
  return {
    _id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    urlBook: faker.image.url(),
    image: faker.image.avatar(),
  };
}
const generateManyBooks= (size) =>  {
  const limit = size ?? 10;
  let fakeBooks = [];
  for (let i = 0; i < limit; i++) {
    fakeBooks.push(generateOneBook());
  }
  return [...fakeBooks];
}

module.exports = { generateOneBook, generateManyBooks };
