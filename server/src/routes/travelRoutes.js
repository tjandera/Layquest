import { Router } from 'express';
import * as ctrl from '../controllers/travelController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/visa', requireAuth, ctrl.visaRequirements);
router.get('/flights', requireAuth, ctrl.flightOptions);

export default router;
