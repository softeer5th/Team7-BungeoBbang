import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState, useCallback, forwardRef, useLayoutEffect, useRef } from 'react';
import {
  ChatData,
  ChatType,
  InfoChatData,
  MoreChatData,
  ReceiveChatData,
  SendChatData,
} from './ChatData.tsx';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import MoreChatButton from './MoreChatButton.tsx';
import { useNavigate } from 'react-router-dom';
import { ExitDialog } from './Exitdialog.tsx';
import api from '@/utils/api.ts';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { useSocketStore, ChatMessage } from '@/store/socketStore.ts';
// import { useScroll } from '@/hooks/useScrollBottom';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import { useScroll } from '@/hooks/useScrollBottom.tsx';
import { useSocketManager } from '@/hooks/useSocketManager.ts';

interface ChatPageProps {
  roomId: number;
  isEnd: boolean;
  isParticipate: boolean;
  lastChatId: string;
}

export interface ChatRoomInfo {
  title: string;
  adminName: string;
}

const ChatPage = forwardRef<HTMLDivElement, ChatPageProps>(
  (
    { roomId, isEnd, isParticipate, lastChatId },
    // ref,
  ) => {
    // const [chatData, setChatData] = useState<ChatData[]>([]);
    const [isExitDialogOpen, setExitDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);
    const [currentImageList, setCurrentImageList] = useState<string[]>([]);
    const [message, setMessage] = useState('');

    const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
      useImageUpload(10, 5);

    const navigate = useNavigate();

    const { subscribe, sendMessage } = useSocketStore();
    const memberId = localStorage.getItem('member_id');
    const socketManager = useSocketManager();

    // useEffect(() => {
    //   setChatData(apiChatData);
    // }, [apiChatData]);

    const exitChatRoom = async () => {
      try {
        await api.delete(`/student/agendas/${roomId}`);
        socketManager('AGENDA', 'EXIT', roomId, 'STUDENT');
        navigate(-1);
      } catch (error) {
        console.error('fail to exit chat room', error);
      }
    };

    const handleImageClick = (imageUrl: string, images: string[]) => {
      const clickedIndex = images.indexOf(imageUrl);
      setSelectedImage({
        url: imageUrl,
        index: clickedIndex,
      });
      setCurrentImageList(images);
    };

    const handleMessageReceive = useCallback(
      (message: ChatMessage) => {
        console.log('message', message);
        if (message.roomType === 'AGENDA' && message.agendaId === Number(roomId)) {
          const newChat = {
            type: message.memberId === Number(memberId) ? ChatType.SEND : ChatType.RECEIVE,
            message: message.message,
            time: new Date(message.createdAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            images: message.images || [],
          };
          if (message.memberId === Number(memberId)) {
            if (!getHasDownMore()) {
              isLive.current = true;
              setChatData((prev) => [...prev, newChat]);
            }
          } else {
            if (!getHasDownMore()) {
              isLiveReceive.current = true;
              setChatData((prev) => [...prev, newChat]);
            }
          }

          // setChatData((prev) => [...prev, newChat]);
          // if (message.memberId === Number(memberId)) {
          //   onMessageSend(newChat);
          // } else {
          //   onMessageReceive(newChat);
          // }
        }
      },

      [roomId, memberId],
    );

    useEffect(() => {
      const unsubscribe = subscribe('AGENDA', Number(roomId), handleMessageReceive);
      return () => unsubscribe();
    }, [roomId, handleMessageReceive, subscribe]);

    const handleSendMessage = useCallback(
      (message: string, images: string[] = []) => {
        sendMessage('AGENDA', Number(roomId), message, images, false);
        setMessage('');
        handleImageDelete(-1);
      },
      [roomId, sendMessage],
    );

    // const { elementRef, useScrollOnUpdate } = useScroll<HTMLDivElement>();
    // useScrollOnUpdate(chatData);

    useEnterLeaveHandler('AGENDA', 'STUDENT');

    const FIRST_REMAIN_ITEMS = 1;
    const LAST_REMAIN_ITEMS = 1;
    const MAX_CHAT_DATA = 10;

    const [chatData, setChatData] = useState<ChatData[]>([]);

    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
      title: '',
      adminName: '총학생회',
    });

    const lastUpChatId = useRef<string>(lastChatId);
    const lastDownChatId = useRef<string>(lastChatId);
    const isInitialLoading = useRef<boolean>(true);
    const isUpDirection = useRef<boolean>(false);
    const isDownDirection = useRef<boolean>(false);
    const isLive = useRef<boolean>(false);
    const isLiveReceive = useRef<boolean>(false);

    let upLastItemId: string = '';
    let downLastItemId: string = '';

    const {
      elementRef,
      scrollToTop,
      scrollToBottom,
      remainCurrentScroll,
      rememberCurrentScrollHeight,
    } = useScroll<HTMLDivElement>();

    const getInitialChatData = async () => {
      try {
        const [response, chatInfo] = await Promise.all([
          api.get(`/student/agendas/${roomId}/chat`, {
            params: {
              chatId: lastUpChatId.current,
              scroll: 'INITIAL',
            },
          }),
          api.get(`/student/agendas/${roomId}`),
        ]);
        console.log('responsesseee', response);
        const formattedData = formatChatData(response.data, false);
        if (lastUpChatId.current === 'ffffffffffffffffffffffff' && formattedData.length > 1) {
          setChatData([...formattedData.slice(formattedData.length - 2)]);
        } else {
          setChatData(formattedData);
        }

        // setChatData(formattedData);
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
      console.log('up!!!', isInitialLoading);
      // return;
      try {
        isUpDirection.current = true;
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'UP',
          },
        });
        console.log('up!!', response.data, MAX_CHAT_DATA);
        const formattedData = formatChatData(response.data, false);

        setChatData((prev: ChatData[]) => {
          if (response.data.length < MAX_CHAT_DATA) {
            console.log('???');
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
        isDownDirection.current = true;
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: {
            chatId: lastDownChatId.current,
            scroll: 'DOWN',
          },
        });

        const formattedData = formatChatData(response.data, false);

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
      if (!elementRef.current) return;

      if (isInitialLoading.current === true) {
        scrollToTop();
        return;
      }

      if (isUpDirection.current === true) {
        remainCurrentScroll();

        isUpDirection.current = false;
        return;
      }

      if (isLive.current) {
        if (isLiveReceive.current) {
          isLiveReceive.current = false;
          return;
        }
        scrollToBottom();
      }

      if (isDownDirection.current) {
        rememberCurrentScrollHeight();
        isDownDirection.current = false;
      }
    }, [chatData]);

    return (
      <S.Container>
        <TopAppBar
          leftIconSrc="/src/assets/icons/arrow-left.svg"
          title={chatRoomInfo.title}
          rightIconSrc={isParticipate ? '/src/assets/icons/exit.svg' : undefined}
          onLeftIconClick={() => {
            navigate(-1);
          }}
          onRightIconClick={() => {
            setExitDialogOpen(true);
          }}
        />
        <S.ChatList ref={elementRef}>
          {chatData.map((chat, chatIndex) => {
            const isUpTriggerItem = chatIndex === FIRST_REMAIN_ITEMS;
            const isDownTriggerItem = chatIndex === chatData.length - LAST_REMAIN_ITEMS;

            if (chat.type === ChatType.RECEIVE) {
              const chatData = chat as ReceiveChatData;

              if (upLastItemId.length === 0) upLastItemId = chatData.chatId;
              downLastItemId = chatData.chatId;

              return (
                <ReceiverChat
                  key={chatData.chatId}
                  chatId={chatData.chatId}
                  ref={
                    isUpTriggerItem || isDownTriggerItem
                      ? (el) => {
                          if (el) {
                            if (isUpTriggerItem) {
                              lastUpChatId.current = upLastItemId;
                              setTriggerUpItem(el);
                            }

                            if (isDownTriggerItem) {
                              lastDownChatId.current = downLatItemId;
                              setTriggerDownItem(el);
                            }
                          }
                        }
                      : null
                  }
                  receiverName={chatRoomInfo.adminName}
                  message={chatData.message}
                  images={chatData.images}
                  timeText={chatData.time}
                  onImageClick={(imageUrl) => handleImageClick(imageUrl, chatData.images || [])}
                />
              );
            } else if (chat.type === ChatType.SEND) {
              const chatData = chat as SendChatData;
              if (upLastItemId.length === 0) upLastItemId = chatData.chatId;
              downLastItemId = chatData.chatId;

              return (
                <SenderChat
                  key={chatData.chatId}
                  chatId={chatData.chatId}
                  ref={
                    isUpTriggerItem || isDownTriggerItem
                      ? (el) => {
                          if (el) {
                            if (isUpTriggerItem) {
                              lastUpChatId.current = upLastItemId;
                              setTriggerUpItem(el);
                            }

                            if (isDownTriggerItem) {
                              lastDownChatId.current = downLatItemId;
                              setTriggerDownItem(el);
                            }
                          }
                        }
                      : null
                  }
                  message={chatData.message}
                  images={chatData.images}
                  timeText={chatData.time}
                  onImageClick={(imageUrl) => handleImageClick(imageUrl, chatData.images || [])}
                />
              );
            } else if (chat.type === ChatType.INFO) {
              const chatData = chat as InfoChatData;
              return <TextBadge text={chatData.message} />;
            } else if (chat.type === ChatType.MORE) {
              const chatData = chat as MoreChatData;
              return (
                <MoreChatButton
                  key={chatIndex}
                  text={chatData.text}
                  iconSrc={chatData.iconSrc}
                  onClick={chatData.onMoreClick}
                />
              );
            }
            return null;
          })}
        </S.ChatList>

        <ChatSendField
          sendDisabled={isEnd}
          textDisabled={isEnd}
          imageDisabled={isEnd}
          images={images}
          onImageDelete={handleImageDelete}
          onImageUpload={handleImageUpload}
          onSendMessage={handleSendMessage}
          onChange={setMessage}
          initialText={message}
        />

        {isExitDialogOpen && (
          <ExitDialog
            onConfirm={() => {
              exitChatRoom();
              setExitDialogOpen(false);
            }}
            onDismiss={() => {
              setExitDialogOpen(false);
            }}
          />
        )}
        {showSizeDialog && (
          <ImageFileSizeDialog onConfirm={closeSizeDialog} onDismiss={closeSizeDialog} />
        )}
        {selectedImage && (
          <ImagePreview
            imageUrl={selectedImage.url}
            currentIndex={selectedImage.index}
            totalImages={currentImageList.length}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </S.Container>
    );
  },
);

export default ChatPage;
