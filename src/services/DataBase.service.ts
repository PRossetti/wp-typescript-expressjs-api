/* eslint-disable no-restricted-syntax */
import { Cursor, Db, MongoClient } from 'mongodb';
import { clearUndefines } from '@utils/helpers';
import { MongoMemoryServer } from 'mongodb-memory-server';

const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME, MONGO_DB_MOCK } = process.env;

class DataBaseService {
  private uri: string;
  private connection: MongoClient;
  private db: Db;
  private collections: string[];
  private mongoMemoryServer: MongoMemoryServer;

  constructor() {
    if (MONGO_DB_MOCK === 'true') {
      this.mongoMemoryServer = new MongoMemoryServer();
    } else {
      this.uri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
    }
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

  async createCollections() {
    await Promise.all(
      this.collections.map(async (collectionName) => {
        const collection = await this.db.listCollections({ name: collectionName }).next();
        if (collection) {
          console.log(`✅ Collection ${collectionName} already existis`);
          return;
        }

        await this.db.createCollection(collectionName);
        console.log(`✅ Collection ${collectionName} created`);
      }),
    );
  }

  async connect() {
    if (this.mongoMemoryServer) {
      this.uri = await this.mongoMemoryServer.getUri();
    }

    try {
      this.connection = await MongoClient.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.db = this.connection.db(MONGO_DB_NAME);
      await this.createCollections();
      console.log(`🍃 Connected to ${this.db.databaseName} database ${this.mongoMemoryServer ? 'in memory' : ''}`);
    } catch (err) {
      console.error('❌ Error while trying to connect to mongodb, application will crash', err);
      process.exit(1); // Crash application if connection to mongodb fails
    }
  }

  async close() {
    if (this.connection) await this.connection.close();
    if (this.mongoMemoryServer) await this.mongoMemoryServer.stop();
  }

  async getCollections() {
    const { connection } = this;
    await connection.connect();
    const db = connection.db(MONGO_DB_NAME);
    const collections = await db.collections();
    connection.close();
    return collections.map((collection) => collection.collectionName);
  }
}

export default new DataBaseService();
