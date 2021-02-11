import supertest from 'supertest';
import { app } from '@root/index';
import DatabaseService from '@services/Database.service';
const request = supertest.agent(app);

describe('::: Artist Release Data test suite (with empty DB) :::', () => {
  beforeAll((done) => {
    DatabaseService.emitter.on('connected', () => done());
  });

  afterAll(async (done) => {
    await DatabaseService.close();
    done();
  });

  it('GET /artist/release-data with empty database should return empty array', async () => {
    const { status, body } = await request.get('/artist/release-data');
    expect(status).toEqual(200);
    expect(body).toEqual([]);

    const response = await request.get('/artist/release-data?ids=123&names=AAA&upc=123&type=album&labelId=123');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('GET /artist/release-data with empty database should return empty array', async () => {
    const { status, body } = await request.get('/artist/release-data/1');
    expect(status).toEqual(200);
    expect(body).toEqual(null);
  });

  it('GET /artist/release-data?ids=1234,5678 should not pass query validation and return 400', async () => {
    const response = await request.get('/artist/release-data?ids=1234,5678');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      'ValidationError: "ids" with value "1234,5678" fails to match the required pattern: /^[\\d\\|]+$/',
    );
  });

  it('GET /artist/id/asd123 should not pass query validation and return 400', async () => {
    const response = await request.get('/artist/release-data/id/asd123');
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      'ValidationError: "id" with value "asd123" fails to match the required pattern: /^\\d+$/',
    );
  });

  it('GET /artists/release-data should return 404', async () => {
    const response = await request.get('/artists/release-data');
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('No resource found for your request');
  });
});
