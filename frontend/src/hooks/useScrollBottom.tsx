import { useRef, useCallback, useEffect } from 'react';
import { ChatData } from '@/domains/student/pages/chat-page/ChatData';

export const useScrollBottom = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);

  const scrollToBottom = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, []);

  // ChatData[] 타입으로 제한
  const useScrollOnUpdate = (dependency: ChatData[]) => {
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
