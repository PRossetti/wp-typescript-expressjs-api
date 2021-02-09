import Joi from 'joi';

const LabelSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  distributor: Joi.string().allow(null),
  region: Joi.string().required(),
});

export default LabelSchema;
