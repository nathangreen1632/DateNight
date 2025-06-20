import express, { Request, Response, Router, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

interface Favorite {
  id: string;
  idea: string;
  mood?: string;
  location?: string;
}

const userFavorites = new Map<string, Favorite[]>();
const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction): void => {
  const userId = req.header("user-id");
  if (!userId) {
    res.status(401).json({ error: "Missing user-id header" });
    return;
  }
  req.userId = userId;
  next();
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(500).json({ error: "User ID not set on request" });
    return;
  }

  const favorites: Favorite[] = userFavorites.get(userId) || [];
  res.json({ favorites });
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(500).json({ error: "User ID not set on request" });
    return;
  }

  const { idea, mood, location } = req.body;

  if (typeof idea !== "string" || !idea.trim()) {
    res.status(400).json({ error: 'Invalid or missing "idea"' });
    return;
  }

  const newFavorite: Favorite = {
    id: uuidv4(),
    idea: idea.trim(),
    mood,
    location,
  };

  const favorites: Favorite[] = userFavorites.get(userId) || [];
  favorites.push(newFavorite);
  userFavorites.set(userId, favorites);

  res.status(201).json({ favorite: newFavorite });
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(500).json({ error: "User ID not set on request" });
    return;
  }

  const { id } = req.params;

  const favorites: Favorite[] = userFavorites.get(userId) || [];
  const index = favorites.findIndex((fav) => fav.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Favorite not found" });
    return;
  }

  favorites.splice(index, 1);
  userFavorites.set(userId, favorites);

  res.status(204).end();
});

export default router;
