import { Router } from 'express';
import { getCacheStats} from '../lib/cache.js';

export const cacheRouter = Router();

// TODO (you): respond with { data: <the cache statistics> }.
cacheRouter.get('/cache/stats', (req, res) => {
  const stats = getCacheStats();
  res.json({ data: stats });
  // res.status(501).json({ error: { message: 'Not written yet: GET /api/cache/stats' } });
});
