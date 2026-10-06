import { Router } from 'express';
import * as ctrl from '../controllers/placeController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, ctrl.search);
router.get('/nearby', requireAuth, ctrl.nearby);
router.get('/:id', requireAuth, ctrl.getById);

export default router;
