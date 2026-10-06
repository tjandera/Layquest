import { Router } from 'express';
import * as ctrl from '../controllers/tripController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, ctrl.listMine);
router.post('/', requireAuth, ctrl.create);
router.get('/:id', requireAuth, ctrl.getById);
router.patch('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;
