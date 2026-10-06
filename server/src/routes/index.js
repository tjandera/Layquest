import { Router } from 'express';
import { health } from '../controllers/healthController.js';
import authRoutes from './authRoutes.js';
import usersRoutes from './usersRoutes.js';
import placesRoutes from './placesRoutes.js';
import tripsRoutes from './tripsRoutes.js';
import itinerariesRoutes from './itinerariesRoutes.js';
import questsRoutes from './questsRoutes.js';
import passportsRoutes from './passportsRoutes.js';
import clansRoutes from './clansRoutes.js';
import advisoriesRoutes from './advisoriesRoutes.js';
import contentRoutes from './contentRoutes.js';
import chatRoutes from './chatRoutes.js';
import sidequestsRoutes from './sidequestsRoutes.js';
import travelRoutes from './travelRoutes.js';

const router = Router();

router.get('/health', health);

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/places', placesRoutes);
router.use('/trips', tripsRoutes);
router.use('/itineraries', itinerariesRoutes);
router.use('/quests', questsRoutes);
router.use('/passports', passportsRoutes);
router.use('/clans', clansRoutes);
router.use('/advisories', advisoriesRoutes);
router.use('/content', contentRoutes);
router.use('/chat', chatRoutes);
router.use('/sidequests', sidequestsRoutes);
router.use('/travel', travelRoutes);

export default router;
