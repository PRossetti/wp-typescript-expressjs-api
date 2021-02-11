import { Router } from 'express';
import ArtistController from './artist.controller';
import releaseData from './releaseData/releaseData.routes';

const router = Router();

router.use('/release-data', releaseData);
router.get(['/:id', '/id/:id', '/name/:name', '/id/:id/name/:name'], ArtistController.get);
router.get('/id/:id', ArtistController.get);
router.get('/', ArtistController.getMany);
router.post('/', ArtistController.post);

export default router;
