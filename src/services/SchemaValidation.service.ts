import Joi from 'joi';
import ApiError from '@utils/ApiError';

export default class SchemaValidationService {
  static validate(schema: Joi.ObjectSchema<any>, data: any): void {
    const validation = schema.validate(data);
    if (validation.error) {
      const { stack: message, details } = validation.error;
      throw new ApiError({ message, details, code: 400 });
    }
  }
}
