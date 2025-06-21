import { Router } from 'express';
import ideasRoutes from './ideas.js';
import favoritesRoutes from './favorites.js';

const router: Router = Router();

router.use('/ideas', ideasRoutes);
router.use('/favorites', favoritesRoutes);


export default router;
