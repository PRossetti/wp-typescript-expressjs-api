import Joi from 'joi';
import DbDocumentService from './DBDocument.service';

const ArtistSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  spotifyId: Joi.string().allow('').required(),
  genres: Joi.array().items(Joi.string()).required(),
});

export default class ArtistService extends DbDocumentService {
  static readonly collecionName = 'artist';
  static readonly schema = ArtistSchema;
}
