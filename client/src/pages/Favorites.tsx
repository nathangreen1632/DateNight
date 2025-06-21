import { useEffect, useState } from 'react';
import { getFavorites } from '../utils/getFavorites';
import { removeFavorite } from '../utils/removeFavorite';
import {type Favorite } from '../types/DateIdea';
import FavoritesList from '../components/FavoritesList';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Navbar from '../components/Navbar';

function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const favs = await getFavorites();
      setFavorites(favs);
      setLoading(false);
    }
    load();
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
    <div className="min-h-screen bg-slate-500 p-6 text-slate-800">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center text-slate-300">Your Saved Ideas</h1>

      {loading && <Spinner />}
      {error && <ErrorState message={error} />}
      {!loading && !favorites.length && <EmptyState message="No favorites saved yet." />}
      {!loading && !!favorites.length && (
        <FavoritesList favorites={favorites} onRemove={handleRemove} />
      )}
    </div>
  );
}

export default Favorites;
