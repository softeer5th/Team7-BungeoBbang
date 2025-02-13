import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChatPage, { ChatRoomInfo } from '../../chat-page';
import { useParams, useSearchParams } from 'react-router-dom';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import api from '@/utils/api.ts';
import { ChatData, ChatType } from '../../chat-page/ChatData';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const AgendaChatPage = () => {
  const MAX_CHAT_DATA = 10;

  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const lastReadChatId = searchParams.get('lastReadChatId');

  const [chatData, setChatData] = useState<ChatData[]>([]);

  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
    title: '',
    adminName: '총학생회',
  });

  const lastUpChatId = useRef<string | null>(lastReadChatId);
  const lastDownChatId = useRef<string | null>(lastReadChatId);
  const chatListRef = useRef<HTMLDivElement>(null);

  const findLastChatId = () => {
    const chat = chatData.find(
      (chat) => chat.type !== ChatType.INFO && chat.chatId === lastReadChatId,
    );
    return (
      chat?.chatId ?? (lastReadChatId === '000000000000000000000000' ? chatData[0].chatId : null)
    );
  };

  const focusChatItemId = useRef<string | null | undefined>(findLastChatId());

  const getInitialChatData = async () => {
    try {
      const [response, chatInfo] = await Promise.all([
        api.get(`/admin/agendas/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
          },
        }),
        api.get(`/admin/agendas/${roomId}`),
      ]);
      console.log('initial!!!', response);
      const formattedData = formatChatData(response.data, true);
      setChatData(formattedData);
      setChatRoomInfo({
        title: chatInfo.data.title,
        adminName: chatInfo.data.adminName,
      });
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const getMoreChatData = async (direction: string) => {
    try {
      const response = await api.get(`/admin/agendas/${roomId}/chat`, {
        params: {
          chatId: direction === 'UP' ? lastUpChatId.current : lastDownChatId.current,
          scroll: direction,
        },
      });

      console.log('up!!!', response);
      const formattedData = formatChatData(response.data, true);

      setChatData((prev: ChatData[]) => {
        if (direction === 'UP') {
          if (formatChatData.length < MAX_CHAT_DATA) {
            setHasUpMore(false);
          }
          return [...formattedData, ...prev];
        } else {
          if (formatChatData.length < MAX_CHAT_DATA) {
            setHasDownMore(false);
          }
          return [...prev, ...formattedData];
        }
      });
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const { setTriggerUpItem, setTriggerDownItem, setHasUpMore, setHasDownMore } = useInfiniteScroll({
    initialFetch: getInitialChatData,
    fetchUpMore: () => getMoreChatData('UP'),
    fetchDownMore: () => getMoreChatData('DOWN'),
  });

  useLayoutEffect(() => {
    const lastChatElement = document.querySelector(`#id${focusChatItemId.current}`);

    console.log('last', lastChatElement);
    if (lastChatElement) {
      lastChatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      clearInterval(interval);
    }
  }, [chatData]);

  return (
    <ChatPage
      ref={chatListRef}
      chatData={chatData}
      chatRoomInfo={chatRoomInfo}
      onUpLastItemChange={(lastItemRef, lastChatId: string) => {
        lastUpChatId.current = lastChatId;

        focusChatItemId.current = lastItemRef.id;
        console.log('uplats', lastItemRef, lastChatId);
        setTriggerUpItem(lastItemRef);
      }}
      onDownLastItemChange={(lastItemRef, lastChatId) => {
        lastDownChatId.current = lastChatId;
        console.log('downlast', lastItemRef, lastChatId);

        setTriggerDownItem(lastItemRef);
      }}
    />
  );
};

export default AgendaChatPage;
