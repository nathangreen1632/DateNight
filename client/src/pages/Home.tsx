import MoodSelector from '../components/MoodSelector';
import BudgetSelector from '../components/BudgetSelector';
import DateIdeaCard from '../components/DateIdeaCard';

function Home() {
  const moods = ['Chill', 'Romantic', 'Adventurous', 'Fun', 'Creative', 'Cozy'];
  const budgets = ['Free', '$', '$$', '$$$'];
  const currentIdea = 'Take a scenic drive';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-2">DateNight</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        Shake up your routine, one idea at a time. Choose your mood and budget to get a unique date suggestion.
      </p>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 space-y-4">
        <MoodSelector moods={moods} />
        <BudgetSelector budgets={budgets} />
        <DateIdeaCard idea={currentIdea} />
      </div>
    </div>
  );
}

export default Home;
