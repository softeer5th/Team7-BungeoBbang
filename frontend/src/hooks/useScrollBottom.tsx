import { useRef, useCallback, useEffect } from 'react';
import { ChatData } from '@/domains/student/pages/chat-page/ChatData';

export const useScroll = <T extends HTMLElement>() => {
  const previousScrollHeight = useRef<number | null>(null);
  const elementRef = useRef<T>(null);

  // Scroll to the bottom
  const scrollToBottom = useCallback(() => {
    if (elementRef.current) {
      console.log('scrollToBottom', elementRef.current, previousScrollHeight.current);
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, []);

  // Scroll to the top
  const scrollToTop = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = 0;
    }
  }, []);

  // Retain the current scroll position when data is added at the top
  const remainCurrentScroll = useCallback(() => {
    if (elementRef.current) {
      const currentHeight = elementRef.current.scrollHeight;

      const previousHeight = previousScrollHeight.current ?? currentHeight;
      const scrollTop = elementRef.current.scrollTop + (currentHeight - previousHeight);

      elementRef.current.scrollTop = scrollTop;
      previousScrollHeight.current = currentHeight;
    }
  }, []);

  // Automatically handle scroll adjustments on dependency change
  const useScrollOnUpdate = (dependency: ChatData[]) => {
    useEffect(() => {
      scrollToBottom();
    }, [dependency]);
  };

  return {
    elementRef,
    scrollToBottom,
    scrollToTop,
    remainCurrentScroll,
    useScrollOnUpdate,
  };
};
