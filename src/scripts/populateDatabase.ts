/**** For this script to work, the mongodb database has to be up ****/
/**** but there is no need for the express api to be running ********/
/**** This first version of the script doesn't make validations *****/
/**** regarding which is the best version of the duplicates records */

import 'module-alias/register';
import fs from 'fs';
import path from 'path';
import DatabaseService from '@services/Database.service';
import ArtistService from '@services/Artist.service';
import ReleaseService from '@services/Release.service';
import LabelService from '@services/Label.service';
import collectionsMetada from '@root/config/collections';
import { isJunk } from '@utils/helpers';

// TODO: Change here your mongodb database info if necessary
const MONGO_DB_HOST = 'localhost';
const MONGO_DB_PORT = 27017;
const MONGO_DB_NAME = 'music';

const collectionsNames = {
  'artists.json': ArtistService,
  'releases.json': ReleaseService,
  'labels.json': LabelService,
};

const populateDatabase = async (dbConnected: boolean): Promise<void> => {
  if (!dbConnected) {
    DatabaseService.setCollections(collectionsMetada);
    DatabaseService.setUri(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`);
    await DatabaseService.connect();
  }

  const filesPath = path.join(__dirname, '../..', '/data');
  const fileNames = ['artists.json', 'labels.json', 'releases.json'];
  for (const fileName of fileNames) {
    const filePath = path.join(filesPath, fileName);
    const fileBuffer = fs.readFileSync(filePath);
    const { data: documents }: { data: any[] } = JSON.parse(fileBuffer.toString());
    const DataService = collectionsNames[fileName];

    const groupedVersions = {};
    for (const document of documents) {
      if (/artist|label/.test(fileName)) {
        if (groupedVersions[document.id]) {
          groupedVersions[document.id].push(document);
        } else {
          groupedVersions[document.id] = [document];
        }
      } else {
        if (groupedVersions[document.title]) {
          groupedVersions[document.title].push(document);
        } else {
          groupedVersions[document.title] = [document];
        }
      }
    }

    await Promise.all(
      Object.entries(groupedVersions).map(async ([key, duplicates]: [string, any[]]) => {
        console.log(`${key} has ${duplicates.length} versions`);
        duplicates.forEach((copy: any) => {
          const copyEntries = Object.entries(copy);
          let junkFields = 0;
          const fields = copyEntries.length;

          const auxCopy = { ...copy };
          copy.arrayLength = 0;
          for (const attr in auxCopy) {
            if (/-/.test(attr)) {
              const newKey = attr.replace(/-/g, '_');
              copy[newKey] = copy[attr];
              delete copy[attr];
            }

            if (isJunk(copy[attr])) {
              junkFields += 1;
            } else if (Array.isArray(copy[attr])) {
              copy.arrayLength = copy[attr].length;
            }
          }

          copy.cleanFields = fields - junkFields;
        });
        duplicates.sort((a, b) => {
          const result = b.cleanFields - a.cleanFields;
          if (result === 0) {
            return b.arrayLength - a.arrayLength;
          }
          return result;
        });
        const [bestVersion] = duplicates;
        delete bestVersion.cleanFields;
        delete bestVersion.arrayLength;
        console.log('The best version is', bestVersion);
        try {
          await DataService.insert(bestVersion);
          console.log(`✅ ${fileName} document posted`);
        } catch (err) {
          const { data } = err.response || {};
          const { id, name, title } = bestVersion;
          console.error('❌  Error trying to insert document', { err: data || err, id, name, title });
        }
      }),
    );
  }
};

export default populateDatabase;
