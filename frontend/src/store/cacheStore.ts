import { create } from 'zustand';

interface CacheData {
  data: any;
  timestamp: number;
  staleTime: number;
}

interface CacheStore {
  cache: Record<string, CacheData>;
  setCache: (key: string, data: any, staleTime?: number) => void;
  getCache: (key: string) => any | null;
  invalidateCache: (key: string) => void;
  invalidateQueries: (prefix: string) => void;
}

export const useCacheStore = create<CacheStore>((set, get) => ({
  cache: {},

  setCache: (key: string, data: any, staleTime = 5 * 60 * 1000) => {  // 기본 5분
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: {
          data,
          timestamp: Date.now(),
          staleTime,
        },
      },
    }));
  },

  getCache: (key: string) => {
    const cacheData = get().cache[key];
    if (!cacheData) return null;

    const isStale = Date.now() - cacheData.timestamp > cacheData.staleTime;
    if (isStale) {
      get().invalidateCache(key);
      return null;
    }

    return cacheData.data;
  },

  invalidateCache: (key: string) => {
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    });
  },

  invalidateQueries: (prefix: string) => {
    set((state) => {
      const newCache = { ...state.cache };
      Object.keys(newCache).forEach((key) => {
        if (key.startsWith(prefix)) {
          delete newCache[key];
        }
      });
      return { cache: newCache };
    });
  },
}));
