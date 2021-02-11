import Joi from 'joi';
import { Collection } from 'mongodb';
import DatabaseService from './Database.service';
import SchemaValidationService from './SchemaValidation.service';

export default abstract class DbDocumentService {
  static collecionName: string;
  static schema: Joi.ObjectSchema<any>;

  static getOne(query: object): Promise<any> {
    return DatabaseService.get(this.collecionName, query);
  }

  static getMany(query = {}): Promise<any[]> {
    const cursor = DatabaseService.getMany(this.collecionName, query);
    return cursor.toArray();
  }

  static insert(body: object): Promise<any> {
    SchemaValidationService.validate(this.schema, body);
    return DatabaseService.insert(this.collecionName, body);
  }

  static getCollection(): Collection<any> {
    return DatabaseService.getCollection(this.collecionName);
  }
}
