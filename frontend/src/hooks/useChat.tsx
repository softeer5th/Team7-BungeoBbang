import { useEffect, useState, useCallback } from 'react';
import { useSocketStore, ChatMessage } from '@/store/socketStore';

export const useChat = (type: 'OPINION' | 'AGENDA', roomId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const subscribe = useSocketStore((state) => state.subscribe);
  const sendMessage = useSocketStore((state) => state.sendMessage);
  // 메시지 수신 핸들러
  const handleMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // 웹소켓 구독 설정
  useEffect(() => {
    const unsubscribe = subscribe(type, roomId, handleMessage);
    return () => {
      unsubscribe();
    };
  }, [type, roomId, subscribe, handleMessage]);

  // 메시지 전송 함수
  const send = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage(type, roomId, message, images, false);
    },
    [type, roomId, sendMessage],
  );

  return {
    messages,
    send,
  };
};
