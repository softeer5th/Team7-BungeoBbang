import { useState, useCallback } from 'react';
import { ApiError } from '@/types/error';

export const useError = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof ApiError) {
      setError(err);
    } else if (err instanceof Error) {
      setError(new ApiError(500, err.message));
    } else {
      setError(new ApiError(500, '알 수 없는 오류가 발생했습니다.'));
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};
