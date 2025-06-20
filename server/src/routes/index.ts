import { Router } from 'express';
import ideasRoutes from './ideas.js';
import favoritesRoutes from './favorites.js';

const router: Router = Router();

router.use('/api/ideas', ideasRoutes);
router.use('/api/favorites', favoritesRoutes);


export default router;
