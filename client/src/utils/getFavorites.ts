import { type Favorite } from '../types/DateIdea';

export async function getFavorites(): Promise<Favorite[]> {
  try {
    const res = await fetch('/api/favorites', {
      headers: {
        'user-id': 'demo-user-123', // replace with real ID when auth is added
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch favorites');
      return [];
    }

    const data = await res.json();
    return Array.isArray(data.favorites) ? data.favorites : [];
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}
