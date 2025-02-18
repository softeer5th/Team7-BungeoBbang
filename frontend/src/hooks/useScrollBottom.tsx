import { useRef, useCallback, useEffect } from 'react';
import { ChatData } from '@/domains/student/pages/agenda/chat/chat-page/ChatData';

export const useScroll = <T extends HTMLElement>() => {
  const previousScrollHeight = useRef<number | null>(null);
  const elementRef = useRef<T>(null);
  const previousScrollTop = useRef<number|null>(null);

  // Scroll to the bottom
  const scrollToBottom = useCallback(() => {
    if (elementRef.current) {
      // console.log('scrollToBottom', elementRef.current?.scrollHeight, previousScrollHeight.current);
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
      previousScrollHeight.current = elementRef.current.scrollHeight;
    }
  }, []);

  // Scroll to the top
  const scrollToTop = useCallback(() => {
    console.log('scrolltotop');
    if (elementRef.current) {
      elementRef.current.scrollTop = 0;

      previousScrollHeight.current = elementRef.current.scrollHeight;
    }
  }, []);

  const remainCurrentScroll = () => {
    console.log('remain', elementRef.current?.scrollHeight, previousScrollHeight.current);
    if (elementRef.current) {
      const currentHeight = elementRef.current.scrollHeight;

      const previousHeight = previousScrollHeight.current ?? currentHeight;
      const scrollTop = elementRef.current.scrollTop + (currentHeight - previousHeight);

      elementRef.current.scrollTop = scrollTop;
      previousScrollTop.current = scrollTop;
      previousScrollHeight.current = currentHeight;
    }
  };

  const restoreScrollTop = () => {
    if(elementRef.current && previousScrollTop.current){
      elementRef.current.scrollTop = previousScrollTop.current;
      previousScrollHeight.current = elementRef.current.scrollHeight;
    }
  }

  const rememberCurrentScrollHeight = () => {
    if (elementRef.current) {
      console.log('remember!!!', elementRef.current.scrollHeight);
      previousScrollHeight.current = elementRef.current.scrollHeight;
    }
  };

  const isWatchingBottom = () => {
    if (!elementRef.current) return false;
  
    const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
  
    // 스크롤이 거의 맨 아래에 있을 경우 (여유값 5px 설정)
    return scrollTop + clientHeight >= scrollHeight - 5;
  };
  
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
    rememberCurrentScrollHeight,
    restoreScrollTop,
    isWatchingBottom,
  };
};
