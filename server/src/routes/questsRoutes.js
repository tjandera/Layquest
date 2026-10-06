import { Router } from 'express';
import * as ctrl from '../controllers/questController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, ctrl.listMine);
router.get('/:id', requireAuth, ctrl.getById);
router.post('/:id/checkpoints/:checkpointId/arrive', requireAuth, ctrl.arriveAtCheckpoint);
router.get('/:id/encounters', requireAuth, ctrl.nearbyEncounters);
router.post('/:id/encounters/:encounterId/catch', requireAuth, ctrl.catchEncounter);

export default router;
