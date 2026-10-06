import { Router } from 'express';
import * as ctrl from '../controllers/chatController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/conversations', requireAuth, ctrl.listConversations);
router.get('/conversations/:id/messages', requireAuth, ctrl.listMessages);
router.post('/conversations/:id/messages', requireAuth, ctrl.sendMessage);

export default router;
