import supertest from 'supertest';
import { server } from '@root/index';

describe('Ping tests suite case', () => {
  afterEach(() => server.close());

  it('ping endpoint should return pong', async () => {
    const { status, text } = await supertest(server).get('/ping').set('Host', 'localhost').expect(200);
    expect(status).toEqual(200);
    expect(text).toEqual('pong');
  });
});
