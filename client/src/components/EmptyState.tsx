function EmptyState({ message = 'Nothing to display.' }: Readonly<{ message?: string }>) {
  return (
    <div className="text-center text-gray-400 italic">{message}</div>
  );
}

export default EmptyState;
