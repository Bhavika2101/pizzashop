const app = require('./app');
const debug = require('debug')('app:test');
const request = require('supertest');

describe('Express app', () => {
  let server;
  const port = 3000;

  beforeAll((done) => {
    server = app.listen(port, () => debug(`Express is listening on port ${port}...`));
    done();
  });

  afterAll((done) => {
    server.close(done);
  });

  test('should start and respond on the defined port', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  test('should return 404 on undefined routes', async () => {
    await request(server)
      .get('/undefined_route')
      .expect(404);
  });
});
