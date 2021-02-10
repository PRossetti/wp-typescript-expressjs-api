/**** For this script to work, the mongodb database has to be up ****/
/**** but there is no need for the express api to be running ********/
/**** This first version of the script doesn't make validations *****/
/**** regarding which is the best version of the duplicates records */

import 'module-alias/register';
import fs from 'fs';
import path from 'path';
import DatabaseService from '@services/Database.service';
import ArtistService from '@services/Artist.service';

// Change here your mongodb database info
const MONGO_DB_HOST = 'localhost';
const MONGO_DB_PORT = 27017;
const MONGO_DB_NAME = 'mydb';

// TODO
const collectionsNames = {
  'artists.json': ArtistService,
};

const populateDatabase = async (dbConnected: boolean): Promise<void> => {
  if (!dbConnected) {
    DatabaseService.setCollections([
      { name: 'artist', uniqueField: 'id' },
      { name: 'label', uniqueField: 'id' },
      { name: 'release', uniqueField: 'label' },
    ]);
    DatabaseService.setUri(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`);
    await DatabaseService.connect();
  }

  const filesPath = path.join(__dirname, '../..', '/data');
  const fileNames = ['artists.json', 'labels.json', 'releases.json'];
  for (const name of fileNames) {
    const filePath = path.join(filesPath, name);
    const fileBuffer = fs.readFileSync(filePath);
    const { data: documents }: { data: any[] } = JSON.parse(fileBuffer.toString());
    const DataService = collectionsNames[name];
    for (const document of documents) {
      try {
        await DataService.insert(document);
        console.log(`✅ ${name} document inserted`);
      } catch (err) {
        const { id, name, title } = document;
        console.error('❌ Error while trying to insert document', { err, id, name, title });
      }
    }
  }
};

export default populateDatabase;
