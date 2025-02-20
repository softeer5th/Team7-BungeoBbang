import { useState, useEffect, useCallback, useRef } from 'react';
import { useCacheStore } from '@/store/cacheStore';

interface QueryOptions {
  staleTime?: number;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useQuery = (
  queryKey: string,
  queryFn: () => Promise<any>,
  options: QueryOptions = {},
) => {
  const { staleTime = 5 * 60 * 1000, enabled = true, onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { getCache, setCache } = useCacheStore();
  const isMounted = useRef(true);

  const fetchData = useCallback(
    async (skipCache = false) => {
      try {
        if (!isMounted.current) return;

        if (!skipCache) {
          const cachedData = getCache(queryKey);
          if (cachedData) {
            onSuccess?.(cachedData);
            return cachedData;
          }
        }

        setIsLoading(true);
        setError(null);

        const result = await queryFn();
        if (isMounted.current) {
          setCache(queryKey, result, staleTime);
          onSuccess?.(result);
        }

        return result;
      } catch (err) {
        if (isMounted.current) {
          setError(err);
          onError?.(err);
        }
        throw err;
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    },
    [queryKey, queryFn, staleTime, onSuccess, onError, getCache, setCache],
  );

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [enabled, queryKey]);

  return {
    isLoading,
    error,
    refetch,
  };
};
