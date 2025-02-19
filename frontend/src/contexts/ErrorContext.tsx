import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '@/components/Toast';
import { ApiError } from '@/types/error';

interface ErrorContextType {
  showError: (error: ApiError | Error | string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<ApiError | null>(null);

  const showError = useCallback((err: ApiError | Error | string) => {
    if (err instanceof ApiError) {
      setError(err);
    } else if (err instanceof Error) {
      setError(new ApiError(500, err.message));
    } else {
      setError(new ApiError(500, err));
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      {error && <Toast message={error.message} onClose={clearError} />}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
