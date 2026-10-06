import { Router } from 'express';
import * as ctrl from '../controllers/itineraryController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { generateItinerarySchema } from '../validators/itineraryValidator.js';

const router = Router();

router.post('/generate', requireAuth, validate(generateItinerarySchema), ctrl.generate);
router.get('/:id', requireAuth, ctrl.getById);
router.post('/:id/revise', requireAuth, ctrl.revise);
router.post('/:id/gamify', requireAuth, ctrl.gamify);

export default router;
