import Joi from 'joi';
import ArtistService from '@services/Artist.service';
import SchemaValidation from '@services/SchemaValidation.service';
import { clearUndefines } from '@utils/helpers';

const QuerySchema = Joi.object({
  id: Joi.string().regex(/^\d+$/),
  name: Joi.string(),
  spotifyId: Joi.string().allow(''),
  upc: Joi.string().regex(/^\d+$/),
  type: Joi.string().valid('album', 'single'),
  labelId: Joi.string().regex(/^\d+$/),
  ids: Joi.string().regex(/^[\d\|]+$/),
  names: Joi.string(),
});

export type queryMany = {
  id: string;
  name: string;
  spotifyId: string;
  upc: string;
  type: 'album' | 'single';
  labelId: string;
  ids: string;
  names: string;
};

const buildMatch = (query: queryMany) => {
  let artist: any = {};
  let release: any = {};
  let label: any = {};

  for (const key in query) {
    const value = query[key];

    switch (key) {
      case 'name':
      case 'spotifyId':
      case 'id': {
        artist = {
          ...artist,
          [key]: value,
        };
        break;
      }
      case 'ids': {
        const ids = value.split('|');
        artist = {
          ...artist,
          id: { $in: ids },
        };
        break;
      }
      case 'names': {
        const names = value.split('|');
        artist = {
          ...artist,
          name: { $in: names },
        };
        break;
      }
      case 'upc': {
        release = {
          ...release,
          'releases.upc': value,
        };
        break;
      }
      case 'type': {
        release = {
          ...release,
          'releases.type': value,
        };
        break;
      }
      case 'labelId': {
        label = {
          ...label,
          'releases.label.id': value,
        };
        break;
      }
    }
  }

  return {
    artist: clearUndefines(artist),
    release: clearUndefines(release),
    label: clearUndefines(label),
  };
};

export default class ArtistReleaseData {
  static async get(query: queryMany) {
    SchemaValidation.validate(QuerySchema, query);
    const artistCollection = ArtistService.getCollection();
    const { upc, type } = query;

    const match = buildMatch(query);

    const artistsWithReleases = await artistCollection
      .aggregate([
        { $match: match.artist },
        {
          $lookup: {
            from: 'release',
            foreignField: 'artists',
            localField: 'id',
            as: 'releases',
          },
        },
        { $match: match.release },
        {
          $lookup: {
            from: 'label',
            foreignField: 'id',
            localField: 'releases.label',
            as: 'labels',
          },
        },
        { $addFields: { 'releases.label': { $arrayElemAt: ['$labels', 0] } } },
        { $match: match.label },
        { $project: { _id: 0, 'releases._id': 0, 'releases.label._id': 0, labels: 0 } },
      ])
      .toArray();

    for (const artistReleaseData of artistsWithReleases) {
      if (upc || type) {
        artistReleaseData.releases = artistReleaseData.releases.filter(
          (release) => (!upc || release.upc === upc) && (!type || release.type === type),
        );
      }
    }

    return artistsWithReleases;
  }

  static async getOne(query) {
    const [artist] = await this.get(query);
    return artist;
  }

  static async getMany(query: queryMany) {
    return this.get(query);
  }
}
