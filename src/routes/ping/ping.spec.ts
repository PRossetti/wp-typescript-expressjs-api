import supertest from 'supertest';
import { server } from '@root/index';
import DataBaseService from '@services/DataBase.service';

describe('Ping tests suite case', () => {
  beforeAll((done) => {
    server.on('listening', () => done());
  });

  afterAll((done) => {
    server.close(async () => {
      await DataBaseService.close();
      done();
    });
  });

  it('ping endpoint should return pong', async () => {
    const { status, text } = await supertest(server).get('/ping').set('Host', 'localhost').expect(200);
    expect(status).toEqual(200);
    expect(text).toEqual('pong');
  });
});
