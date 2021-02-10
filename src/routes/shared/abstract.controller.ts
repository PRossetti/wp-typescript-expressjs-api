import { Request, Response, NextFunction } from 'express';

const AbstractControllerWrapper = (dbDocumentService: { getOne(a); insert(a); getMany(a) }) => {
  abstract class AbstractController {
    // TODO: we could add a decorator here to handle the error
    static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const {
          params: { id, name },
        } = req;

        const query = { id, name };

        const result = await dbDocumentService.getOne(query);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }

    static async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { query } = req;
        const result = await dbDocumentService.getMany(query);
        res.json(result);
      } catch (err) {
        next(err);
      }
    }

    static async post(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const { body } = req;
        const result = await dbDocumentService.insert(body);
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

  return AbstractController;
};

export default AbstractControllerWrapper;
