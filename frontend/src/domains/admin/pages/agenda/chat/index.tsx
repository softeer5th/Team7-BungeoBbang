import { useRef, useState } from 'react';
import ChatPage, { ChatRoomInfo } from '../../chat-page';
import { useParams, useSearchParams } from 'react-router-dom';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import api from '@/utils/api.ts';
import { ChatData } from '../../chat-page/ChatData';
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

  const focusChatItem = useRef<HTMLDivElement | null>(null);

  const getInitialChatData = async () => {
    console.log('initititititit', chatListRef);
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
    s;

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

      // const newScrollHeight = chatListRef.current?.scrollHeight || 0;
      // const scrollDifference = newScrollHeight - prevScrollHeight;
      // console.log('scroll!!!', chatListRef.current, newScrollHeight);
      // if (chatListRef.current) {
      //   chatListRef.current.scrollTop = scrollDifference;
      // }
      scrollToLastChat();
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const { setTriggerUpItem, setTriggerDownItem, setHasUpMore, setHasDownMore } = useInfiniteScroll({
    initialFetch: getInitialChatData,
    fetchUpMore: () => getMoreChatData('UP'),
    fetchDownMore: () => getMoreChatData('DOWN'),
  });

  const scrollToLastChat = () => {
    if (!chatListRef.current) return;

    // // Find the element for lastChatId
    // if (focusChatItem.current) {
    //   const lastChatElement = document.querySelector(focusChatItem.current?.id);

    //   console.log('lastCHatElement', lastChatElement);

    //   focusChatItem.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center',
    //   });
    // }
  };

  return (
    <ChatPage
      ref={chatListRef}
      chatData={chatData}
      chatRoomInfo={chatRoomInfo}
      onUpLastItemChange={(lastItemRef, lastChatId: string) => {
        lastUpChatId.current = lastChatId;
        console.log('uplats', lastItemRef, lastChatId);
        setTriggerUpItem(lastItemRef);
      }}
      onDownLastItemChange={(lastItemRef, lastChatId) => {
        lastDownChatId.current = lastChatId;
        console.log('downlast', lastItemRef, lastChatId);

        focusChatItem.current = lastItemRef;
        setTriggerDownItem(lastItemRef);
      }}
    />
  );
};

export default AgendaChatPage;
