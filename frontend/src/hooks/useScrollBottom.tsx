import { useRef, useCallback, useEffect } from 'react';

export const useScrollBottom = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);

  const scrollToBottom = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, []);

  const useScrollOnUpdate = (dependency) => {
    useEffect(() => {
      scrollToBottom();
    }, [dependency]);
  };

  return {
    elementRef,
    scrollToBottom,
    useScrollOnUpdate,
  };
};
