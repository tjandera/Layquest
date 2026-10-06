import { Router } from 'express';
import * as ctrl from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.patch('/me', requireAuth, ctrl.updateMe);
router.post('/me/verify', requireAuth, ctrl.requestVerification);
router.get('/:id', requireAuth, ctrl.getPublicProfile);

export default router;
