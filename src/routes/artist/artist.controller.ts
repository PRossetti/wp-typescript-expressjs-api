import { Request, Response, NextFunction } from 'express';
import ArtistService from '@services/Artist.service';
import ArtistSchema from './artist.schema';
import ApiError from '@utils/ApiError';

export default class ArtistController {
  // TODO: we could add a decorator here to handle the error
  static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id, name },
      } = req;

      const query = { id, name };

      const result = await ArtistService.getOne(query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query } = req;
      const result = await ArtistService.getMany(query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { body } = req;
      const validation = ArtistSchema.validate(body);
      if (validation.error) {
        const { stack: message, details } = validation.error;
        throw new ApiError({ message, details, code: 400 });
      }
      const result = await ArtistService.insert(body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static put(): void {
    throw new Error('method put fro class ArtistController not implemented');
  }

  static delete(): void {
    throw new Error('method delete fro class ArtistController not implemented');
  }
}
