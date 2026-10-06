import { Router } from 'express';
import * as ctrl from '../controllers/advisoryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, ctrl.getForLocation);
router.get('/map', requireAuth, ctrl.getSeverityMap);

export default router;
