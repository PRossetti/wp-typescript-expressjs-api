import { Request, Response, NextFunction } from 'express';
import AritstReleaseDataService, { queryMany } from '@services/ArtistReleaseData.service';

class ArtistReleaseDataController {
  static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id, name },
      } = req;
      const query = { id, name };
      const result = await AritstReleaseDataService.getOne(query);
      res.json(result || null);
    } catch (err) {
      next(err);
    }
  }

  static async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { query } = req;
      const result = await AritstReleaseDataService.getMany(query as queryMany);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default ArtistReleaseDataController;
