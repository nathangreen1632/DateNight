import { saveFavorite } from '../utils/saveFavorite';
import { toast } from 'react-hot-toast';

interface DateIdeaCardProps {
  idea: string;
  onRefresh: () => void;
  mood?: string;
}

function DateIdeaCard({ idea, onRefresh, mood }: Readonly<DateIdeaCardProps>) {
  const handleSave = async () => {
    const result = await saveFavorite(idea, mood);
    if (result.success) {
      toast.success('Date idea saved to favorites!');
    } else {
      toast.error('Failed to save date idea.');
      console.error('Save failed:', result.error);
    }
  };

  const match = RegExp(/\*\*(.*?)\*\*\s*(.+)/s).exec(idea);
  const title = match?.[1] ?? idea;
  const description = match?.[2] ?? '';

  return (
    <div className="bg-black p-4 rounded shadow-inner text-center">
      <h2 className="text-lg font-bold text-red-400 mb-2">{title}</h2>
      <p className="text-base text-white mb-4">{description}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Save
        </button>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-emerald-500 text-black rounded hover:bg-emerald-600"
        >
          Spin Again
        </button>
      </div>
    </div>
  );
}

export default DateIdeaCard;
