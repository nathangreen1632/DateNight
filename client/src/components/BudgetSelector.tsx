import { useState } from "react";

type BudgetSelectorProps = {
  budgets: string[];
  onSelect: (budget: string) => Promise<void>;
};

function BudgetSelector({ budgets, onSelect }: Readonly<BudgetSelectorProps>) {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const handleClick = async (budget: string) => {
    setSelectedBudget(budget);
    await onSelect(budget);
  };

  return (
    <div>
      <label htmlFor="budget" className="block font-semibold mb-1">
        Budget
      </label>
      <div className="flex gap-2">
        {budgets.map((cost) => {
          const isActive = cost === selectedBudget;
          const baseClasses = "px-3 py-1 rounded text-sm border transition-colors";
          const activeClasses = "bg-emerald-600 hover:bg-emerald-700 text-white border-slate-800";
          const inactiveClasses = "bg-white text-slate-700 border-slate-300 hover:bg-slate-100";

          return (
            <button
              key={cost}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              onClick={() => handleClick(cost)}
            >
              {cost}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetSelector;
