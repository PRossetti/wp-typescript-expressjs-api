/**** For this script to work, the express server must be running ****/
/************************* npm run post-data *************************/
import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { isJunk } from '@utils/helpers';

const { PORT, API_BASE_PATH = '/', PROTOCOL = 'http', BASE_URL = 'localhost' } = process.env;

const endpointNames = {
  'artists.json': '/artist',
  'labels.json': '/label',
  'releases.json': '/release',
};

const postDataIntoDB = async (): Promise<void> => {
  const filesPath = path.join(__dirname, '../..', '/data');
  const fileNames = ['artists.json', 'labels.json', 'releases.json'];
  for (const fileName of fileNames) {
    const filePath = path.join(filesPath, fileName);
    const fileBuffer = fs.readFileSync(filePath);
    const { data: documents }: { data: any[] } = JSON.parse(fileBuffer.toString());

    const apiPath = endpointNames[fileName];
    const endpoint = `${PROTOCOL}://${BASE_URL}:${PORT}${API_BASE_PATH}${apiPath}`;

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
          await axios.post(endpoint, bestVersion);
          console.log(`✅ ${fileName} document posted`);
        } catch (err) {
          const { data } = err.response || {};
          const { id, name, title } = bestVersion;
          console.error('❌  Error trying to insert document', { err: data, id, name, title });
        }
      }),
    );
  }
};

postDataIntoDB();
