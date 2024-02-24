const BooksService = require('./books.service');

// jest fn es quien nos deja hace mock, test d comportamiento, simular y espiar..
const mockGetAll = jest.fn();

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
/* const MongoLibStub = {
  getAll:  mockGetAll, // para espiar
  create: () => { },
}; */

// Se utilizo el método jest.mock, al cual se le indica la clase que va
// suplantar (lib/mongo.lib) por  MongoLibSub
// el cual MongoLibSub ya tiene los metodos con respuestas ya preparada
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));


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
      // como tenemos q espiar en el metodo getAll
      mockGetAll.mockResolvedValue(fakeBooks); // aca estoy diciendo q resuelva el faceBooks

      // act
      const books = await service.getBooks({});
      console.log(books);

      // assert
      expect(books.length).toEqual(1);
      expect(mockGetAll).toHaveBeenCalled();
      // books viene del servicio, y  {} de la instancia d arriba
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return a list books old name', async () => {
      // Arrange: aca le estoy dando otro dato al mokegetall
      //  osea que resuelva este  []
      mockGetAll.mockResolvedValue([
        {
          _id: 1,
          name: 'Harry Potter II',
        },
        {
          _id: 2,
          name: 'Superman',
        },
        {
          _id: 3,
          name: 'Batman',
        },
      ]);

      // act
      const books = await service.getBooks({});

      // assert
      expect(books[0].name).toEqual('Harry Potter II');
      expect(books.length).toEqual(3);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
    });

  });
});
