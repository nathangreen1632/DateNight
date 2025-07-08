import { useState } from "react";

interface MoodSelectorProps {
  moods: string[];
  onSelect: (mood: string) => Promise<void>;
}

function MoodSelector({ moods, onSelect }: Readonly<MoodSelectorProps>) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleClick = async (mood: string) => {
    setSelectedMood(mood);
    await onSelect(mood);
  };

  return (
    <div>
      <label htmlFor="mood" className="block font-semibold text-red-400 mb-1">
        Choose a Mood
      </label>
      <div id="mood" className="flex flex-wrap gap-2">
        {moods.map((mood) => {
          const isActive = mood === selectedMood;
          const baseClasses = "px-3 py-1 rounded-full text-sm transition-colors";
          const activeClasses = "bg-emerald-600 hover:bg-emerald-700 text-slate-100 border border-slate-200";
          const inactiveClasses = "bg-pink-500 text-slate-100 border border-slate-200 hover:bg-pink-600";

          return (
            <button
              key={mood}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              onClick={(): Promise<void> => handleClick(mood)}
            >
              {mood}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MoodSelector;
