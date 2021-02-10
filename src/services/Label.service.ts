import Joi from 'joi';
import DbDocumentService from './DBDocument.service';

const LabelSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  distributor: Joi.string().allow(null).required(),
  region: Joi.string().required(),
});

export default class LabelService extends DbDocumentService {
  static readonly collecionName = 'label';
  static readonly schema = LabelSchema;
}
