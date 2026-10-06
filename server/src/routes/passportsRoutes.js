import { Router } from 'express';
import * as ctrl from '../controllers/passportController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, ctrl.getMine);
router.patch('/me/cover', requireAuth, ctrl.updateCover);
router.get('/:userId', requireAuth, ctrl.getPublic);

export default router;
