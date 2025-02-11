import { useEffect, useRef } from 'react';

interface InfiniteScrollOptions {
  threshold?: number;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
}

const useInfiniteScroll = ({ threshold = 1.0, fetchMore, hasMore }: InfiniteScrollOptions) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const setTriggerItem = (element: HTMLDivElement) => {
    if (observer.current && element) {
      observer.current.disconnect();
      observer.current.observe(element);
      triggerRef.current = element;
    }
  };

  useEffect(() => {
    fetchMore();
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          console.log('!!!!', entry.isIntersecting, hasMore);
          if (entry.isIntersecting && hasMore) {
            fetchMore();
          }
        },
        { threshold },
      );

      if (triggerRef.current) {
        observer.current.disconnect();
        observer.current.observe(triggerRef.current);
      }
    }

    return () => {
      if (observer.current && triggerRef.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { setTriggerItem };
};

export default useInfiniteScroll;
