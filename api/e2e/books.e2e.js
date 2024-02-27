// jest fn es quien nos deja hace mock, test d comportamiento, simular y espiar..
const request = require('supertest');
const { MongoClient } = require('mongodb')
const createApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;


describe('test for hello endpoint', () => {
  let app = null;
  // let server = null;
  beforeAll(async () => {
    app = createApp();
    // server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await database.dropDatabase();
    /* await client.close(true);
    await server.close(); */
  });

  describe('Test for [GET] /api/v1/books', () => {
    test('should return in database test!!', async () => {
      // Arrange
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book1',
          years: 1998,
          author: 'alejo',
        },
        {
          name: 'Book2',
          years: 1982,
          author: 'naty',
        }
      ]);
      // Act
      const { body } = await request(app).get('/api/v1/books');
      // console.log(body);
      // console.log(seedData);
      expect(body.length).toEqual(seedData.insertedCount);
    });
  });
});


