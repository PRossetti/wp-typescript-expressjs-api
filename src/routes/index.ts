import { Router } from 'express';
import artist from './artist/artist.routes';
import label from './label/label.routes';
import release from './release/release.routes';
import ping from './ping/ping.routes';

const router = Router();

router.use('/ping', ping);
router.use('/artist', artist);
router.use('label', label);
router.use('/release', release);

export default router;
