// import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChatPage from './chat-page';
import { useParams, useSearchParams } from 'react-router-dom';
// import { formatChatData } from '@/utils/chat/formatChatData.ts';
// import api from '@/utils/api.ts';
// import useInfiniteScroll from '@/hooks/useInfiniteScroll';
// import { ChatData } from './chat-page/ChatData';
// import { useScroll } from '@/hooks/useScrollBottom';

const AgendaChatPage = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const isEnd = searchParams.get('isEnd');
  const lastReadChatId = searchParams.get('lastReadChatId');

  return (
    <ChatPage
      roomId={Number(roomId)}
      isEnd={isEnd}
      lastChatId={lastReadChatId ?? '000000000000000000000000'}
    />
  );
};

export default AgendaChatPage;
