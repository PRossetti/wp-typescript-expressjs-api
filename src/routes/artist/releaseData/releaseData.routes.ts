import { Router } from 'express';
import ReleaseDataController from './releaseData.controller';

const router = Router();

router.get(['/:id', '/id/:id', '/name/:name', '/id/:id/name/:name'], ReleaseDataController.get);
router.get('/id/:id', ReleaseDataController.get);
router.get('/', ReleaseDataController.getMany);

export default router;
