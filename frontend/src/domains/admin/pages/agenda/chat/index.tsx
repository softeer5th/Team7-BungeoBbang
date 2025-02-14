import { useLayoutEffect, useRef, useState } from 'react';
import ChatPage, { ChatRoomInfo } from '../../chat-page';
import { useParams, useSearchParams } from 'react-router-dom';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import api from '@/utils/api.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ChatData } from '../../chat-page/ChatData';

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
  const isInitialLoading = useRef<boolean>(true);
  const isUpDirection = useRef<boolean>(false);

  const previousScrollHeight = useRef<number | null>(null);

  const focusChatItemId = useRef<string | null | undefined>(lastReadChatId);

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
      isInitialLoading.current = false;
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const getMoreChatData = async (direction: string) => {
    try {
      // previousScrollHeight.current = chatListRef.current?.scrollHeight ?? 0;

      if (direction === 'UP') isUpDirection.current = true;
      const response = await api.get(`/admin/agendas/${roomId}/chat`, {
        params: {
          chatId: direction === 'UP' ? lastUpChatId.current : lastDownChatId.current,
          scroll: direction,
        },
      });

      console.log('!!!! ', direction, response);
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

      // if (chatListRef.current) {
      //   const newScrollHeight = chatListRef.current.scrollHeight;
      //   const scrollDifference = newScrollHeight - previousScrollHeight.current;
      //   chatListRef.current.scrollTo(top: previousScrollHeight,) += scrollDifference;
      // }
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
    if (!chatListRef.current || isInitialLoading.current) return;

    if (isUpDirection.current === true) {
      const previousHeight = previousScrollHeight.current ?? chatListRef.current.scrollHeight;
      const currentHeight = chatListRef.current.scrollHeight;
      const scrollTop = chatListRef.current.scrollTop + (currentHeight - previousHeight);

      chatListRef.current.scrollTop = scrollTop;
      previousScrollHeight.current = currentHeight;
      console.log('Adjusted scrollTop for UP direction:', scrollTop);

      // Reset the direction flag to avoid repeated adjustments
      isUpDirection.current = false;
    } else {
      // Update the previous height for future calculations
      previousScrollHeight.current = chatListRef.current.scrollHeight;
    }
  }, [chatData]);

  return (
    <ChatPage
      ref={chatListRef}
      apiChatData={chatData}
      chatRoomInfo={chatRoomInfo}
      onUpLastItemChange={(lastItemRef, lastChatId: string) => {
        lastUpChatId.current = lastChatId;

        if (!isInitialLoading) focusChatItemId.current = lastItemRef.id;
        console.log('uplats', lastItemRef, lastChatId);

        setTriggerUpItem(lastItemRef);
      }}
      onDownLastItemChange={(lastItemRef, lastChatId) => {
        lastDownChatId.current = lastChatId;
        // console.log('downlast', lastItemRef, lastChatId);

        setTriggerDownItem(lastItemRef);
      }}
    />
  );
};

export default AgendaChatPage;
