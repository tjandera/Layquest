import { Router } from 'express';
import * as ctrl from '../controllers/sideQuestController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/deck', requireAuth, ctrl.deck);
router.patch('/requests/:requestId', requireAuth, ctrl.respondToRequest);
router.post('/:id/swipe', requireAuth, ctrl.swipe);
router.post('/:id/requests', requireAuth, ctrl.requestToJoin);

export default router;
