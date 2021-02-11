import supertest from 'supertest';
import { app } from '@root/index';
import DatabaseService from '@services/Database.service';
import populateDatabase from '@root/scripts/populateDatabase';
import { allArtistsReleaseData, artistsFilteredByUpcAndSingleType } from '@mocks/releaseData.mock';
const request = supertest.agent(app);

describe('::: Artist Release Data test suite :::', () => {
  beforeAll((done) => {
    DatabaseService.emitter.on('connected', async () => {
      await populateDatabase(true);
      done();
    });
  });

  afterAll(async (done) => {
    await DatabaseService.close();
    done();
  });

  it('GET /artist/release-data should return all artists with their related release data', async () => {
    const response = await request.get('/artist/release-data');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(allArtistsReleaseData);
  });

  it('GET /artist/release-data?upc=5050580590649&type=single should return some filtered artists', async () => {
    const response = await request.get('/artist/release-data?upc=5050580590649&type=single');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(artistsFilteredByUpcAndSingleType);
  });
});
