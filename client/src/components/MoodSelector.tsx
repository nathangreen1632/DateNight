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
      <label htmlFor="mood" className="block font-semibold mb-1">
        Choose a Mood
      </label>
      <div id="mood" className="flex flex-wrap gap-2">
        {moods.map((mood) => {
          const isActive = mood === selectedMood;
          const baseClasses = "px-3 py-1 rounded-full text-sm transition-colors";
          const activeClasses = "bg-sky-700 text-white";
          const inactiveClasses = "bg-sky-100 text-sky-700 hover:bg-sky-200";

          return (
            <button
              key={mood}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              onClick={() => handleClick(mood)}
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
