const BooksService = require('./books.service');


// jest fn es quien nos deja hace mock, test d comportamiento, simular y espiar..
const mockGetAll = jest.fn();

const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
];

const MongoLibStub = {
  getAll: mockGetAll, //() => [...fakeBooks],
  create: () => { },
};

jest.mock('./../lib/mongo.lib', () => jest.fn().mockImplementation(() => {
  return {
    getAll: mockGetAll, //() => [...fakeBooks],
    create: () => { },

  };
}));

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    service = new BooksService();
  });

  describe('Test for Books Service', () => {
    test('should return a list books', async () => {
      // Arrange: aca tengo mokear todo las funcionalidades que implica ir a la bd
      mockGetAll.mockResolvedValue(fakeBooks);

      // y traer informacion, osea los servicios externos.


      // act
      const books = await service.getBooks({});

      // assert
      expect(books.length).toEqual(1);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledWith('books', {});

    });


    test('should return a list books 2', async () => {
      // Arrange: aca tengo mokear todo las funcionalidades que implica ir a la bd
      mockGetAll.mockResolvedValue([{
        _id: 1,
        name: 'Harry Potter II',
      },
      ]);

      // y traer informacion, osea los servicios externos.


      // act
      const books = await service.getBooks({});

      // assert
      expect(books[0].name).toEqual('Harry Potter II');
    });
  })
});
