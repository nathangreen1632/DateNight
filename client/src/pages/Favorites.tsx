import { useEffect, useState } from 'react';
import { getFavorites } from '../utils/getFavorites';
import { removeFavorite } from '../utils/removeFavorite';
import { type Favorite } from '../types/DateIdea';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Navbar from '../components/Navbar';

function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const favs = await getFavorites();
      setFavorites(favs);
      setLoading(false);
    })();
  }, []);


  const handleRemove = async (id: string) => {
    const success = await removeFavorite(id);
    if (success) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } else {
      setError('Failed to remove favorite.');
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 text-slate-800">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-300">Your Saved Ideas</h1>

      {loading && <Spinner />}
      {error && <ErrorState message={error} />}
      {!loading && !favorites.length && <EmptyState message="No favorites saved yet." />}
      {!loading && !!favorites.length && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((fav: Favorite) => {
            const match = /\*\*(.*?)\*\*\s*(.+)/s.exec(fav.idea);
            const title: string = match?.[1] ?? fav.idea;
            const description: string = match?.[2] ?? '';

            return (
              <div key={fav.id} className="bg-black p-4 rounded shadow-inner text-center flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-indigo-500 mb-2">{title}</h2>
                   <p className="text-base text-white mb-4">{description}</p>
                  <div className="text-sm text-slate-300">
                    {fav.mood && <span>Mood: {fav.mood} • </span>}
                    {fav.budget && <span>Budget: {fav.budget}</span>}
                  </div>
                </div>
                <button
                  className="mt-4 text-sm text-red-500 hover:underline"
                  onClick={() => handleRemove(fav.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
