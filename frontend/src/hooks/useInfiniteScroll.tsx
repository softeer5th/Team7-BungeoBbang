import { useEffect, useRef } from 'react';

interface InfiniteScrollOptions {
  threshold?: number;
  initialFetch: () => Promise<void>;
  fetchUpMore?: () => Promise<void>;
  fetchDownMore?: () => Promise<void>;
}

const useInfiniteScroll = ({
  threshold = 1.0,
  initialFetch,
  fetchUpMore,
  fetchDownMore,
}: InfiniteScrollOptions) => {
  const upTriggerRef = useRef<HTMLDivElement | null>(null);
  const downTriggerRef = useRef<HTMLDivElement | null>(null);
  const upObserver = useRef<IntersectionObserver | null>(null);
  const downObserver = useRef<IntersectionObserver | null>(null);
  const hasUpMore = useRef<boolean>(true);
  const hasDownMore = useRef<boolean>(true);

  const getHasUpMore = () => hasUpMore.current;
  const getHasDownMore = () => hasDownMore.current;

  const setHasUpMore = (newHasUpMore: boolean) => {
    hasUpMore.current = newHasUpMore;
  };

  const setHasDownMore = (newHasDownMore: boolean) => {
    hasDownMore.current = newHasDownMore;
  };

  const setTriggerUpItem = (element: HTMLDivElement) => {
    if (upObserver.current && element) {
      console.log("upitem", element);
      upObserver.current.disconnect();
      upObserver.current.observe(element);
      upTriggerRef.current = element;
    }
  };

  const setTriggerDownItem = (element: HTMLDivElement) => {
    if (downObserver.current && element) {
      // console.log('down item~~~', element);
      downObserver.current.disconnect();
      downObserver.current.observe(element);
      downTriggerRef.current = element;
    }
  };

  useEffect(() => {
    initialFetch();
    if (!upObserver.current) {
      upObserver.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasUpMore.current && fetchUpMore) {
            fetchUpMore();
          }
        },
        { threshold },
      );

      if (upTriggerRef.current) {
        upObserver.current.disconnect();
        upObserver.current.observe(upTriggerRef.current);
      }
    }

    if (!downObserver.current) {
      downObserver.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasDownMore.current && fetchDownMore) {
            fetchDownMore();
          }
        },
        { threshold },
      );

      if (downTriggerRef.current) {
        downObserver.current.disconnect();
        downObserver.current.observe(downTriggerRef.current);
      }
    }

    return () => {
      if (upObserver.current && upTriggerRef.current) {
        upObserver.current.disconnect();
      }

      if (downObserver.current && downTriggerRef.current) {
        downObserver.current.disconnect();
      }
    };
  }, []);

  return {
    setTriggerUpItem,
    setTriggerDownItem,
    getHasUpMore,
    getHasDownMore,
    setHasUpMore,
    setHasDownMore,
  };
};

export default useInfiniteScroll;
