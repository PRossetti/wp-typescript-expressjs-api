import Joi from 'joi';
import DbDocumentService from './DBDocument.service';

const ReleaseSchema = Joi.object({
  title: Joi.string().required(),
  release_date: Joi.date().required(),
  track_count: Joi.number().allow(null).required(),
  upc: Joi.string().regex(/^\d+$/).required(),
  artists: Joi.array().items(Joi.string()).required(),
  label: Joi.string().allow(null).required(),
  type: Joi.string().valid('album', 'single').required(),
});

export default class ReleaseService extends DbDocumentService {
  static readonly collecionName = 'release';
  static readonly schema = ReleaseSchema;
}
