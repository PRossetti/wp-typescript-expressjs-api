import { Router } from 'express';
import LabelController from './label.controller';

const router = Router();

router.get(['/:id', '/id/:id', '/name/:name', '/id/:id/name/:name'], LabelController.get);
router.get('/id/:id', LabelController.get);
router.get('/', LabelController.getMany);
router.post('/', LabelController.post);

export default router;
