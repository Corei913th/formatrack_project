export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-destructive text-sm p-2 rounded-md bg-destructive/10 text-center">
      {message}
    </div>
  );
};
