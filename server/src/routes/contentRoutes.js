import { Router } from 'express';
import * as ctrl from '../controllers/contentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/places/:placeId/posts', requireAuth, ctrl.listPosts);
router.get('/places/:placeId/summary', requireAuth, ctrl.summary);

export default router;
