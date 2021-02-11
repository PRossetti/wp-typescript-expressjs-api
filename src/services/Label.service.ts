import Joi from 'joi';
import DbDocumentService from './DBDocument.service';

const LabelSchema = Joi.object({
  id: Joi.string().regex(/^\d+$/).required(),
  name: Joi.string().required(),
  distributor: Joi.string().allow(null).required(),
  region: Joi.string().valid('CA', 'UK', 'US').required(),
});

export default class LabelService extends DbDocumentService {
  static readonly collecionName = 'label';
  static readonly schema = LabelSchema;
}
