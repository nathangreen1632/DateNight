import { type Favorite } from '../types/DateIdea';

interface FavoritesListProps {
  favorites: Favorite[];
  onRemove: (id: string) => Promise<void>;
}

function FavoritesList({ favorites, onRemove }: Readonly<FavoritesListProps>) {
  if (!favorites.length) {
    return <p className="text-center text-gray-500">No saved favorites yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {favorites.map((fav) => {
        const match = RegExp(/\*\*(.*?)\*\*\s*(.+)/s).exec(fav.idea);
        const title = match?.[1] ?? fav.idea;
        const description = match?.[2] ?? '';

        return (
          <li key={fav.id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold text-slate-800 mb-1">{title}</h2>
            <p className="text-base text-slate-700 mb-2">{description}</p>

            <div className="text-sm text-gray-500 mb-2">
              {fav.mood && <span>Mood: {fav.mood} • </span>}
              {fav.budget && <span>Budget: {fav.budget}</span>}
            </div>

            <button
              className="text-sm text-red-500 hover:underline"
              onClick={(): Promise<void> => onRemove(fav.id)}
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default FavoritesList;
