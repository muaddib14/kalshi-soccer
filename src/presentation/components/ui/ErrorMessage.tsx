'use client';

import React from 'react';
import { Button } from '@/presentation/components/ui/Button';

interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onDismiss }) => {
  return (
    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-red-700">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={onDismiss}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;