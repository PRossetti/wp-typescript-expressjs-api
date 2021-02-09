import Joi from 'joi';

const ReleaseSchema = Joi.object({
  title: Joi.string().required(),
  ['release-date']: Joi.date(),
  ['track-count']: Joi.number().allow(null),
  upc: Joi.array().items(Joi.string()).required(),
  artists: Joi.array().items(Joi.string()).required(),
  label: Joi.string().allow(null),
  type: Joi.string().required(),
});

export default ReleaseSchema;
