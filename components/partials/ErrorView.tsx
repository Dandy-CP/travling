import React from 'react';
import { Button } from '../ui/button';

interface ErrorViewProps {
  message?: string;
  refetch: () => void;
}

const ErrorView = ({
  message = 'Opps Something Wrong',
  refetch,
}: ErrorViewProps) => {
  return (
    <div className="bg-muted rounded-md flex flex-col justify-center gap-8 p-8 w-full h-[300px]">
      <h1 className="text-center font-bold text-2xl">{message}</h1>

      <Button
        className="p-6"
        onClick={() => {
          refetch();
        }}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorView;
