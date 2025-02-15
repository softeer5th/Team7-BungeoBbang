import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChatPage, { ChatRoomInfo } from './chat-page';
import { useParams, useSearchParams } from 'react-router-dom';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import api from '@/utils/api.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ChatData } from './chat-page/ChatData';
import { useScroll } from '@/hooks/useScrollBottom';

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
  const isInitialLoading = useRef<boolean>(true);
  const isUpDirection = useRef<boolean>(false);
  const isLive = useRef<boolean>(false);

  const { elementRef, scrollToBottom, remainCurrentScroll } = useScroll<HTMLDivElement>();

  const getInitialChatData = async () => {
    try {
      const [response, chatInfo] = await Promise.all([
        api.get(`/admin/agendas/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'INITIAL',
          },
        }),
        api.get(`/admin/agendas/${roomId}`),
      ]);
      console.log('responsesseee', response);
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

  const getMoreUpChatData = async () => {
    try {
      isUpDirection.current = true;
      const response = await api.get(`/admin/agendas/${roomId}/chat`, {
        params: {
          chatId: lastUpChatId.current,
          scroll: 'UP',
        },
      });

      const formattedData = formatChatData(response.data, true);

      setChatData((prev: ChatData[]) => {
        if (response.data.length < MAX_CHAT_DATA) {
          setHasUpMore(false);
        }
        return [...formattedData, ...prev];
      });
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const getMoreDownChatData = async () => {
    try {
      const response = await api.get(`/admin/agendas/${roomId}/chat`, {
        params: {
          chatId: lastDownChatId.current,
          scroll: 'DOWN',
        },
      });

      const formattedData = formatChatData(response.data, true);

      setChatData((prev: ChatData[]) => {
        if (response.data.length < MAX_CHAT_DATA) {
          setHasDownMore(false);
        }
        return [...prev, ...formattedData];
      });
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const { setTriggerUpItem, setTriggerDownItem, getHasDownMore, setHasUpMore, setHasDownMore } =
    useInfiniteScroll({
      initialFetch: getInitialChatData,
      fetchUpMore: getMoreUpChatData,
      fetchDownMore: getMoreDownChatData,
    });

  useLayoutEffect(() => {
    console.log('getchasdata', chatData);
    if (!elementRef.current || isInitialLoading.current) return;

    if (isUpDirection.current === true) {
      remainCurrentScroll();

      isUpDirection.current = false;
      return;
    }

    console.log('isLive', isLive);
    if (isLive.current) {
      scrollToBottom();
    }
  }, [chatData]);

  return (
    <ChatPage
      ref={elementRef}
      apiChatData={chatData}
      chatRoomInfo={chatRoomInfo}
      onUpLastItemChange={(lastItemRef, lastChatId: string) => {
        lastUpChatId.current = lastChatId;
        setTriggerUpItem(lastItemRef);
      }}
      onDownLastItemChange={(lastItemRef, lastChatId) => {
        lastDownChatId.current = lastChatId;
        setTriggerDownItem(lastItemRef);
      }}
      onMessageSend={(data: ChatData) => {
        if (!getHasDownMore()) {
          isLive.current = true;
          setChatData((prev) => [...prev, data]);
        } else {
          isLive.current = false;
        }
      }}
      onMessageReceive={(data: ChatData) => {
        if (!getHasDownMore()) {
          setChatData((prev) => [...prev, data]);
        }
      }}
    />
  );
};

export default AgendaChatPage;
