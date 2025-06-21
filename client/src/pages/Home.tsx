import MoodSelector from '../components/MoodSelector';
import BudgetSelector from '../components/BudgetSelector';
import DateIdeaCard from '../components/DateIdeaCard';
import { useIdeaGenerator } from '../hooks/useIdeaGenerator';
import { useAppStore } from '../store/useAppStore';
import Navbar from '../components/Navbar';

const moods = ['Chill', 'Romantic', 'Adventurous', 'Fun', 'Creative', 'Cozy'];
const budgets = ['Free', '$', '$$', '$$$'];

function Home() {
  const { idea, loading, error, refresh, setSelectedBudget } = useIdeaGenerator();
  const setMood = useAppStore((state) => state.setMood);
  const setBudget = useAppStore((state) => state.setBudget);

  return (
    <div className="min-h-screen bg-slate-500 text-slate-800 p-6">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">DateNight</h1>
        <p className="text-lg mb-6 text-center text-slate-300 max-w-md">
          Shake up your routine, one idea at a time. Choose your mood and budget to get a unique date suggestion.
        </p>

        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 space-y-4">
          <MoodSelector
            moods={moods}
            onSelect={async (mood: string): Promise<void> => {
              setMood(mood);
              await refresh(mood);
            }}
          />

          <BudgetSelector
            budgets={budgets}
            onSelect={async (budget: string): Promise<void> => {
              setBudget(budget);
              await setSelectedBudget(budget);
            }}
          />

          {loading && <p className="text-center text-sm text-gray-500">Finding your perfect idea...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && idea && (
            <DateIdeaCard idea={idea} onRefresh={() => refresh()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
