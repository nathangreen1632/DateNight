function ErrorState({ message }: Readonly<{ message: string }>) {
  return (
    <div className="text-center text-red-600 font-medium">{message}</div>
  );
}

export default ErrorState;
