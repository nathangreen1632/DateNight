type DateIdeaCardProps = {
  idea: string;
};

function DateIdeaCard({ idea }: Readonly<DateIdeaCardProps>) {
  return (
    <div className="bg-amber-50 p-4 rounded shadow-inner text-center">
      <p className="text-xl font-medium mb-4">{idea}</p>
      <div className="flex justify-center gap-3">
        <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          Save
        </button>
        <button className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-50">
          Spin Again
        </button>
      </div>
    </div>
  );
}

export default DateIdeaCard;
