// jest fn es quien nos deja hace mock, test d comportamiento, simular y espiar..
const mockGetAll = jest.fn();
const request = require('supertest');
const { generateManyBooks } = require('./../src/fakes/books.fake');
const createApp = require('../src/app');

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => { },
})));

describe('test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // await server.close();
  });

  describe('Test for [GET] /api/v1/books', () => {
    test('should return Hello word!!', async () => {
      // Arrange
      const fakeBooks = generateManyBooks(5);
      mockGetAll.mockResolvedValue(fakeBooks); // aca estoy diciendo q resuelva el faceBooks

      const { body } = await request(app).get('/api/v1/books');
      // console.log(body);
      expect(body.length).toEqual(fakeBooks.length);
    });
  });
});


