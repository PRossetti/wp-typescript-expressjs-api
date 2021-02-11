/* eslint-disable no-restricted-syntax */
import Emitter from 'events';
import { Cursor, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { clearUndefines } from '@utils/helpers';

const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_NAME, MONGO_DB_MOCK } = process.env;
const dbEmmiter = new Emitter();

class DatabaseService {
  private uri: string;
  private connection: MongoClient;
  private db: Db;
  private collections: { name: string; uniqueField?: string }[];
  private mongoMemoryServer: MongoMemoryServer;
  public readonly emitter: Emitter;

  constructor() {
    if (MONGO_DB_MOCK === 'true') {
      this.mongoMemoryServer = new MongoMemoryServer();
    } else {
      this.uri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
    }
    this.collections = [];
    this.emitter = dbEmmiter;
  }

  setCollections(collections: { name: string; uniqueField?: string }[]) {
    this.collections = collections;
  }

  setUri(uri: string) {
    this.uri = uri;
  }

  get(collectionName: string, query: object) {
    const cleanQuery = clearUndefines(query);
    const collection = this.db.collection(collectionName);
    return collection.findOne(cleanQuery, { projection: { _id: 0 } });
  }

  getMany(collectionName: string, query: object): Cursor<any> {
    const cleanQuery = clearUndefines(query);
    const collection = this.db.collection(collectionName);
    return collection.find(cleanQuery, { projection: { _id: 0 } });
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

  async createCollections() {
    await Promise.all(
      this.collections.map(async ({ name, uniqueField }) => {
        const collection = await this.db.listCollections({ name }).next();
        if (collection) {
          console.log(`✅ Collection ${name} already existis`);
          return;
        }

        const createdCollection = await this.db.createCollection(name);
        if (uniqueField) {
          const createdIndex = await createdCollection.createIndex({ [uniqueField]: 1 }, { unique: true });
          console.log(`Created unique constraint for field ${uniqueField}`, createdIndex);
        }

        console.log(`✅ Collection ${name} created`);
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
      this.emitter.emit('connected');
      console.log(`🍃 Connected to ${this.db.databaseName} database ${this.mongoMemoryServer ? 'in memory' : ''}`);
    } catch (err) {
      console.error('❌ Error while trying to connect to mongodb, application will crash', err);
      process.exit(1); // Crash application if connection to mongodb fails
    }
  }

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
    if (this.mongoMemoryServer) {
      await this.mongoMemoryServer.stop();
    }
  }

  getCollection(collectionName: string) {
    return this.db.collection(collectionName);
  }
}

export default new DatabaseService();
