import supertest from 'supertest';
import { app } from '@root/index';
import DatabaseService from '@services/Database.service';
const request = supertest.agent(app);

describe('::: Ping test suite :::', () => {
  beforeAll((done) => {
    DatabaseService.emitter.on('connected', () => {
      done();
    });
  });

  afterAll(async (done) => {
    await DatabaseService.close();
    done();
  });

  it('ping endpoint should return pong', async () => {
    const { status, text } = await request.get('/ping');
    expect(status).toEqual(200);
    expect(text).toEqual('pong');
  });
});
