import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChatPage, { ChatRoomInfo } from './chat-page';
import { useParams, useSearchParams } from 'react-router-dom';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import api from '@/utils/api.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ChatData } from './chat-page/ChatData';
import { useScroll } from '@/hooks/useScrollBottom';

const AgendaChatPage = () => {
 
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const lastReadChatId = searchParams.get('lastReadChatId');

  return (
    <ChatPage
      roomId = {Number(roomId)}
      lastChatId = {lastReadChatId ?? '000000000000000000000000'}
      // onUpLastItemChange={(lastItemRef, lastChatId: string) => {
      //   lastUpChatId.current = lastChatId;
      //   setTriggerUpItem(lastItemRef);
      // }}
      // onDownLastItemChange={(lastItemRef, lastChatId) => {
      //   lastDownChatId.current = lastChatId;
      //   setTriggerDownItem(lastItemRef);
      // }}
      // onMessageSend={(data: ChatData) => {
      //   if (!getHasDownMore()) {
      //     isLive.current = true;
      //     setChatData((prev) => [...prev, data]);
      //   } else {
      //     isLive.current = false;
      //   }
      // }}
      // onMessageReceive={(data: ChatData) => {
      //   if (!getHasDownMore()) {
      //     isLiveReceive.current = true;
      //     setChatData((prev) => [...prev, data]);
      //   }
      // }}
    />
  );
};

export default AgendaChatPage;
