type MoodSelectorProps = {
  moods: string[];
};

function MoodSelector({ moods }: Readonly<MoodSelectorProps>) {
  return (
    <div>
      <label htmlFor="mood" className="block font-semibold mb-1">
        Choose a Mood
      </label>
      <div id="mood" className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood}
            className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm hover:bg-sky-200"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
