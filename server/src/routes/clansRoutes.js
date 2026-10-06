import { Router } from 'express';
import * as ctrl from '../controllers/clanController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, ctrl.findByDestination);
router.post('/join', requireAuth, ctrl.join);
router.post('/:id/leave', requireAuth, ctrl.leave);

export default router;
