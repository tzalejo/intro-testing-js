const BooksService = require('./books.service');

// para simular datos que devolveria una base de datos..
const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
];

// esto estaria suplantando a nuestra clase MongoLib
// para ello hay q suplantar todo los comportamiento,
// es decir, todo los que BooksService este utilizando
// en este casoi .getAll y .create
const MongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => { },
};

// Se utilizo el método jest.mock, al cual se le indica la clase que va
// suplantar (lib/mongo.lib) por  MongoLibSub
// el cual MongoLibSub ya tiene los metodos con respuestas ya preparada
jest.mock('./../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    // para cada prueba , va craer una instancia nueva
    service = new BooksService();
    jest.clearAllMocks();
  });

  describe('Test for getBooks', () => {
    test('should return a list books', async () => {
      // Arrange: aca tengo mokear todo las funcionalidades que implica ir a la bd

      // act
      const books = await service.getBooks({});

      // assert
      expect(books.length).toEqual(1);
    });

    test('should return a list books 2', async () => {
      // Arrange: aca tengo mokear todo las funcionalidades que implica ir a la bd

      // y traer informacion, osea los servicios externos.

      // act
      const books = await service.getBooks({});

      // assert
      expect(books[0].name).toEqual('Harry Potter');
    });

  });
});
