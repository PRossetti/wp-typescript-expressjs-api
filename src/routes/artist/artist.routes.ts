import { Router } from 'express';
import ArtistController from './artist.controller';

const router = Router();

router.get(['/:id', '/id/:id', '/name/:name', '/id/:id/name/:name'], ArtistController.get);
router.get('/id/:id', ArtistController.get);
router.get('/', ArtistController.getMany);
router.post('/', ArtistController.post);

export default router;
