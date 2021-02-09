/* eslint-disable no-restricted-syntax */
import { Cursor, Db, MongoClient } from 'mongodb';
import { clearUndefines } from '@utils/helpers';

const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME } = process.env;

class DataBaseService {
  private uri: string;
  private client: MongoClient;
  private db: Db;
  private collections: string[];

  constructor() {
    this.uri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
    this.collections = [];
  }

  setCollections(collections: string[]) {
    this.collections = collections;
  }

  get(collectionName: string, query: object) {
    const cleanQuery = clearUndefines(query);
    const collection = this.db.collection(collectionName);
    return collection.findOne(cleanQuery);
  }

  getMany(collectionName: string, query: object): Cursor<any> {
    const cleanQuery = clearUndefines(query);
    const collection = this.db.collection(collectionName);
    return collection.find(cleanQuery);
  }

  async insert(collectionName: string, data: object) {
    const value = clearUndefines(data);
    const collection = this.db.collection(collectionName);
    const { ops, insertedCount } = await collection.insertOne(value);

    return {
      data: ops,
      insertedCount,
    };
  }

  async update(collectionName: string, query: object, data: { [key: string]: any }, multi = false) {
    delete data._id;
    const cleanQuery = clearUndefines(query);
    const value = clearUndefines(data);
    const updateMethod = multi ? 'updateMany' : 'updateOne';
    const options = {
      upsert: false,
    };

    const collection = this.db.collection(collectionName);
    const update = {
      $set: value,
    };
    const { modifiedCount, upsertedId, upsertedCount, matchedCount } = await collection[updateMethod](
      cleanQuery,
      update,
      options,
    );

    return {
      modifiedCount,
      upsertedId,
      upsertedCount,
      matchedCount,
    };
  }

  async delete(collectionName, query, multi = false) {
    const cleanQuery = clearUndefines(query);
    const collection = this.db.collection(collectionName);

    const deleteMethod = multi ? 'deleteMany' : 'deleteOne';
    const { deletedCount } = await collection[deleteMethod](cleanQuery);

    return {
      deletedCount,
    };
  }

  createCollections() {
    this.collections.forEach((collectionName) => {
      this.db.listCollections({ name: collectionName }).next((err, collinfo) => {
        if (collinfo) {
          console.log(`✅ Collection ${collectionName} already existis`);
          return;
        }
        this.db.createCollection(collectionName, (err, _res) => {
          if (err) throw err;
          console.log(`✅ Collection ${collectionName} created`);
          this.close();
        });
      });
    });
  }

  async connect() {
    const { client } = this;
    try {
      await client.connect();
      this.db = client.db(MONGO_DB_NAME);
      this.createCollections(); // TODO: improve this to handle async if possible
      console.log(`🍃 Connected to ${this.db.databaseName} database`);
    } catch (err) {
      console.error('❌ Error while trying to connect to mongodb, application will crash', err);
      process.exit(1); // Crash application if connection to mongodb fails
    }
  }

  async close() {
    const { client } = this;
    client.close();
  }

  async getCollections() {
    const { client } = this;
    await client.connect();
    const db = client.db(MONGO_DB_NAME);
    const collections = await db.collections();
    client.close();
    return collections.map((collection) => collection.collectionName);
  }
}

export default new DataBaseService();
