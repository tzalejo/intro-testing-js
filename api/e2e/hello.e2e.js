
const request = require('supertest');
const createApp = require('../src/app');

describe('test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Test for [GET] /', () => {
    test('should return Hello word!!', async () => {
      /* return request(app)
        .get('/')
        .expect(200)
        .then((response) => {
          expect(response.text).toEqual('Hello Word!');
        }); */
      const response = await request(app).get('/');
      // console.log('response', response);
      expect(response.status).toBe(200);
      expect(response.text).toEqual('Hello World!');
    });
  });
});


