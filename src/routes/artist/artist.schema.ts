import Joi from 'joi';

const ArtistSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  spotifyId: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).required,
});

export default ArtistSchema;
