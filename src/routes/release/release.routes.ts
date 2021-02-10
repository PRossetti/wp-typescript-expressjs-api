import { Router } from 'express';
import ReleaseController from './release.controller';

const router = Router();

router.get('/', ReleaseController.getMany);
router.post('/', ReleaseController.post);

export default router;
