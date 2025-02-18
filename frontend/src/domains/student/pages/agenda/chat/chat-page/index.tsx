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
import { addDateDivider, formatChatData } from '@/utils/chat/formatChatData.ts';
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { useSocketStore, ChatMessage } from '@/store/socketStore.ts';
// import { useScroll } from '@/hooks/useScrollBottom';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import { useScroll } from '@/hooks/useScrollBottom.tsx';
import { useSocketManager } from '@/hooks/useSocketManager.ts';
import { ChatToast } from '@/components/ChatToast.tsx';
import {
  FIRST_REMAIN_ITEMS,
  LAST_REMAIN_ITEMS,
  MAX_CHAT_DATA_LENGTH,
  MAX_CHAT_PAGE_DATA,
  RECENT_CHAT_ID,
} from '@/utils/chat/chat_const.ts';

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
    const chatSendFieldRef = useRef<HTMLDivElement>(null);
    const [toastMessage, setToastMeesage] = useState<string | null>(null);
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
            getInitialChatDataFromRecent();
          } else {
            if (!getHasDownMore()) {
              isLiveReceive.current = true;
              setChatData((prev) => {
                if (MAX_CHAT_DATA_LENGTH - prev.length > 1) {
                  return [...prev.slice(prev.length - MAX_CHAT_DATA_LENGTH + 1), newChat];
                }
                return [...prev, newChat];
              });
            }
            setToastMeesage('새로운 채팅이 도착했습니다.');
          }
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

    const [chatData, setChatData] = useState<ChatData[]>([]);

    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
      title: '',
      adminName: '총학생회',
    });

    const lastUpChatId = useRef<string>(lastChatId);
    const lastDownChatId = useRef<string>(lastChatId);
    const isInitialTopLoading = useRef<boolean>(true);
    const isInitialRecentLoading = useRef<boolean>(true);
    const isUpDirection = useRef<boolean>(false);
    const isDownDirection = useRef<boolean>(false);
    // const isLive = useRef<boolean>(false);
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
      if (lastUpChatId.current === RECENT_CHAT_ID) {
        getInitialChatDataFromRecent();
      } else {
        getInitialChatDataFromTop();
      }
    };

    const getInitialChatDataFromTop = async () => {
      try {
        isInitialTopLoading.current = true;
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

        setChatRoomInfo({
          title: chatInfo.data.title,
          adminName: chatInfo.data.adminName,
        });
      } catch (error) {
        console.error('fail to get chat data', error);
      }
    };

    const getInitialChatDataFromRecent = async () => {
      try {
        isInitialRecentLoading.current = true;
        const [response, chatInfo] = await Promise.all([
          api.get(`/student/agendas/${roomId}/chat`, {
            params: {
              chatId: RECENT_CHAT_ID,
              scroll: 'INITIAL',
            },
          }),
          api.get(`/student/agendas/${roomId}`),
        ]);
        console.log('responsesseee', response);

        const formattedData = formatChatData(response.data, true);

        setHasDownMore(false);
        setChatData(formattedData);
        setChatRoomInfo({
          title: chatInfo.data.title,
          adminName: chatInfo.data.adminName,
        });
      } catch (error) {
        console.error('fail to get chat data', error);
      }
    };

    const getMoreUpChatData = async () => {
      try {
        isUpDirection.current = true;
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'UP',
          },
        });
        console.log('up!!', response.data);
        const formattedData = formatChatData(response.data, false);

        setChatData((prev: ChatData[]) => {
          if (response.data.length < MAX_CHAT_PAGE_DATA) {
            setHasUpMore(false);
          }

          if (MAX_CHAT_DATA_LENGTH - formattedData.length < prev.length) {
            setHasDownMore(true);
            return [
              ...formattedData,
              ...prev.slice(0, MAX_CHAT_DATA_LENGTH - formattedData.length),
            ];
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
          if (response.data.length < MAX_CHAT_PAGE_DATA) {
            setHasDownMore(false);
          }

          if (MAX_CHAT_DATA_LENGTH - formattedData.length < prev.length) {
            return [...prev.slice(formattedData.length - MAX_CHAT_DATA_LENGTH), ...formattedData];
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
      if (!elementRef.current) return;
      console.log('getchasdata', chatData);

      if (isInitialTopLoading.current === true) {
        scrollToTop();

        isInitialTopLoading.current = false;
        return;
      }

      if (isInitialRecentLoading.current === true) {
        scrollToBottom();

        isInitialRecentLoading.current = false;
        return;
      }

      if (isUpDirection.current === true) {
        remainCurrentScroll();

        isUpDirection.current = false;
        return;
      }

      if (isDownDirection.current) {
        rememberCurrentScrollHeight();
        isDownDirection.current = false;
      }

      // if(isLiveReceive.current){

      // }

      // if (isLive.current) {
      //   console.log('live', isLive.current, isLiveReceive.current);
      //   if (isLiveReceive.current) {
      //     isLiveReceive.current = false;
      //     return;
      //   }
      //   scrollToBottom();
      // }
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
              const curChatData = chat as ReceiveChatData;

              if (upLastItemId.length === 0) upLastItemId = curChatData.chatId;
              downLastItemId = curChatData.chatId;

              return (
                <>
                  {(() => {
                    const date = addDateDivider(
                      curChatData,
                      chatIndex > 0 ? chatData[chatIndex - 1] : null,
                    );

                    return date ? <TextBadge text={date} /> : null;
                  })()}
                  <ReceiverChat
                    key={curChatData.chatId}
                    chatId={curChatData.chatId}
                    ref={
                      isUpTriggerItem
                        ? (el) => {
                            if (el) {
                              if (isUpTriggerItem) {
                                lastUpChatId.current = upLastItemId;
                                setTriggerUpItem(el);
                              }
                            }
                          }
                        : isDownTriggerItem
                          ? (el) => {
                              if (el) {
                                if (isDownTriggerItem) {
                                  lastDownChatId.current = downLastItemId;
                                  setTriggerDownItem(el);
                                }
                              }
                            }
                          : null
                    }
                    receiverName={chatRoomInfo.adminName}
                    message={curChatData.message}
                    images={curChatData.images}
                    timeText={curChatData.time}
                    onImageClick={(imageUrl) =>
                      handleImageClick(imageUrl, curChatData.images || [])
                    }
                  />
                </>
              );
            } else if (chat.type === ChatType.SEND) {
              const curChatData = chat as SendChatData;
              if (upLastItemId.length === 0) upLastItemId = curChatData.chatId;
              downLastItemId = curChatData.chatId;

              return (
                <>
                  {(() => {
                    const date = addDateDivider(
                      curChatData,
                      chatIndex > 0 ? chatData[chatIndex - 1] : null,
                    );

                    return date ? <TextBadge text={date} /> : null;
                  })()}
                  <SenderChat
                    key={curChatData.chatId}
                    chatId={curChatData.chatId}
                    ref={
                      isUpTriggerItem
                        ? (el) => {
                            if (el) {
                              if (isUpTriggerItem) {
                                lastUpChatId.current = upLastItemId;
                                setTriggerUpItem(el);
                              }
                            }
                          }
                        : isDownTriggerItem
                          ? (el) => {
                              if (el) {
                                if (isDownTriggerItem) {
                                  lastDownChatId.current = downLastItemId;
                                  setTriggerDownItem(el);
                                }
                              }
                            }
                          : null
                    }
                    message={curChatData.message}
                    images={curChatData.images}
                    timeText={curChatData.time}
                    onImageClick={(imageUrl) =>
                      handleImageClick(imageUrl, curChatData.images || [])
                    }
                  />
                </>
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
          ref={chatSendFieldRef}
          disabledPlaceHolder="이미 종료된 채팅방입니다."
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
        {toastMessage && (
          <ChatToast
            message={toastMessage}
            bottom={(chatSendFieldRef.current?.offsetHeight ?? 0) + 15}
            onDismiss={() => setToastMeesage(null)}
          />
        )}
      </S.Container>
    );
  },
);

export default ChatPage;
