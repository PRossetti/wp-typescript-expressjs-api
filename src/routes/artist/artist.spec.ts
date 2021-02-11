import supertest from 'supertest';
import { app } from '@root/index';
import DatabaseService from '@services/Database.service';
const request = supertest.agent(app);

describe('::: Artist test suite :::', () => {
  beforeAll((done) => {
    DatabaseService.emitter.on('connected', () => done());
  });

  afterAll(async (done) => {
    await DatabaseService.close();
    done();
  });

  it('GET /artist with empty database should return empty array', async () => {
    const { status, body } = await request.get('/artist');
    expect(status).toEqual(200);
    expect(body).toEqual([]);
  });

  it('GET /artist/id/123456/name/harry with empty database should return null', async () => {
    const response = await request.get('/artist/id/123456/name/harry');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(null);
  });

  it('GET /artist/1 with empty database should return empty array', async () => {
    const { status, body } = await request.get('/artist/1');
    expect(status).toEqual(200);
    expect(body).toEqual(null);
  });

  it('POST /artist with a payload not matching schema should return 400', async () => {
    const artist = {
      id: '111122',
      name: 'Ed Sheeran',
      spotifyId: null,
      genres: ['pop', 'uk pop'],
    };
    const response = await request.post('/artist').send(artist);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('ValidationError: "spotifyId" must be a string');
  });

  it('POST /artist with a payload matching schema should return 200', async () => {
    const artist = {
      id: '111122',
      name: 'Ed Sheeran',
      spotifyId: '',
      genres: ['pop', 'uk pop'],
    };
    const response = await request.post('/artist').send(artist);
    expect(response.status).toEqual(200);
    expect(response.body.insertedCount).toEqual(1);
  });
});
