type BudgetSelectorProps = {
  budgets: string[];
};

function BudgetSelector({ budgets }: Readonly<BudgetSelectorProps>) {
  return (
    <div>
      <label htmlFor="budget" className="block font-semibold mb-1">
        Budget
      </label>
      <div className="flex gap-2">
        {budgets.map((cost) => (
          <button
            key={cost}
            className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-100"
          >
            {cost}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BudgetSelector;
