import express, {Request, Response, Router} from 'express';
import { getIdeasFromOpenAI } from '../services/openaiService.js';

const router: Router = express.Router();

interface IdeasQuery {
  lat?: string;
  lon?: string;
  mood?: string | string[];
}

router.get('/', async (req: Request<{}, {}, {}, IdeasQuery>, res: Response): Promise<void> => {
  const { lat, lon, mood: rawMood } = req.query;

  let mood: string | undefined;

  if (Array.isArray(rawMood)) {
    if (typeof rawMood[0] === 'string') {
      mood = rawMood[0];
    }
  } else if (typeof rawMood === 'string') {
    mood = rawMood;
  }

  if (!lat || !lon) {
    res.status(400).json({ error: 'Missing lat/lon query parameters' });
    return;
  }

  const latitude: number = Number(lat);
  const longitude: number = Number(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    res.status(400).json({ error: 'Invalid lat/lon format. Must be numeric strings.' });
    return;
  }

  try {
    const ideas: string[] = await getIdeasFromOpenAI(latitude, longitude, mood);
    res.json({ ideas });
  } catch (err) {
    console.error('[OpenAI Error]', err);
    res.status(500).json({ error: 'Failed to fetch date ideas from OpenAI' });
  }
});

export default router;
