import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState, useCallback, forwardRef, useLayoutEffect, useRef } from 'react';
import { ChatData, ChatType, ReceiveChatData, SendChatData } from './ChatData.tsx';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import { useNavigate } from 'react-router-dom';
import { ExitDialog } from './Exitdialog.tsx';
import api from '@/utils/api.ts';
import { addDateDivider, formatChatData } from '@/utils/chat/formatChatData.ts';
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { useSocketStore, ChatMessage } from '@/store/socketStore.ts';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import { useScroll } from '@/hooks/useScrollBottom.tsx';
import { useSocketManager } from '@/hooks/useSocketManager.ts';
import { ChatToast } from '@/components/Toast/ChatToast.tsx';
import {
  FIRST_REMAIN_ITEMS,
  LAST_REMAIN_ITEMS,
  MAX_CHAT_DATA_LENGTH,
  MAX_CHAT_PAGE_DATA,
  RECENT_CHAT_ID,
} from '@/utils/chat/chat_const.ts';
import { Dialog } from '@/components/Dialog/Dialog.tsx';

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
    const chatSendFieldRef = useRef<HTMLDivElement>(null);
    const [toastMessage, setToastMeesage] = useState<string | null>(null);
    const [isExitDialogOpen, setExitDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);
    const [currentImageList, setCurrentImageList] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [forbiddenDialog, setForbiddenDialog] = useState(false);

    const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
      useImageUpload(10, 5);

    const navigate = useNavigate();

    const subscribe = useSocketStore((state) => state.subscribe);
    const sendMessage = useSocketStore((state) => state.sendMessage);

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

    const handleImageChange = (newIndex: number) => {
      if (selectedImage && currentImageList.length > 0) {
        setSelectedImage({
          url: currentImageList[newIndex],
          index: newIndex,
        });
      }
    };

    const handleMessageReceive = useCallback(
      (message: ChatMessage) => {
        if (message.code === 7) {
          setForbiddenDialog(true);
          return;
        }
        if (message.roomType === 'AGENDA' && message.agendaId === Number(roomId)) {
          const newChat = {
            type: message.memberId === Number(memberId) ? ChatType.SEND : ChatType.RECEIVE,
            message: message.message,
            time: new Date(message.createdAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            images: message.images || [],
            createdAt: message.createdAt,
          };

          if (message.memberId === Number(memberId)) {
            if (!getHasDownMore() && isWatchingBottom()) {
              isLiveSendChatAdded.current = true;
              addNewSocketData(newChat);
            } else {
              getReloadChatDataFromRecent();
            }
          } else {
            if (!getHasDownMore()) {
              if (isWatchingBottom()) {
                isLiveReceiveChatAdded.current = true;
              } else {
                setToastMeesage('새로운 채팅이 도착했습니다.');
              }
              addNewSocketData(newChat);
              return;
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

    useEnterLeaveHandler('AGENDA', 'STUDENT');

    const [chatData, setChatData] = useState<ChatData[]>([]);

    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
      title: '',
      adminName: '총학생회',
    });

    const lastUpChatId = useRef<string>(lastChatId);
    const lastDownChatId = useRef<string>(lastChatId);
    const isInitialTopLoading = useRef<boolean>(false);
    const isInitialRecentLoading = useRef<boolean>(false);
    const isUpDirection = useRef<boolean>(false);
    const isDownDirection = useRef<boolean>(false);

    const isLiveSendChatAdded = useRef<boolean>(false);
    const isLiveReceiveChatAdded = useRef<boolean>(false);

    const isUpOverflow = useRef<boolean>(false);
    const isDownOverflow = useRef<boolean>(false);
    const isLiveSendOverflow = useRef<boolean>(false);
    const isLiveReceiveOverflow = useRef<boolean>(false);

    let upLastItemId: string = '';
    let downLastItemId: string = '';

    const {
      elementRef,
      scrollToTop,
      scrollToBottom,
      remainCurrentScroll,
      rememberCurrentScrollHeight,
      restoreScrollTopFromUp,
      restoreScrollTopFromDown,
      isWatchingBottom,
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
        const formattedData = formatChatData(response.data, false);
        setChatData(formattedData);
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
        const formattedData = formatChatData(response.data, false);

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

    const getReloadChatDataFromRecent = async () => {
      try {
        isInitialRecentLoading.current = true;
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: {
            chatId: RECENT_CHAT_ID,
            scroll: 'INITIAL',
          },
        });

        const formattedData = formatChatData(response.data, false);

        setHasUpMore(true);
        setHasDownMore(false);
        setChatData(formattedData);
      } catch (error) {
        console.error('fail to get chat data', error);
      }
    };

    const getMoreUpChatData = async () => {
      try {
        if (isUpDirection.current) return;

        isUpDirection.current = true;
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'UP',
          },
        });
        const formattedData = formatChatData(response.data, false);

        setChatData((prev: ChatData[]) => {
          if (response.data.length < MAX_CHAT_PAGE_DATA) {
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
        if (isDownDirection.current || isUpDirection.current) return;

        isDownDirection.current = true;
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: {
            chatId: lastDownChatId.current,
            scroll: 'DOWN',
          },
        });

        if (isUpDirection.current) {
          //동시 요청 후 렌더링 막음
          isDownDirection.current = false;
          return;
        }

        const formattedData = formatChatData(response.data, false);

        setChatData((prev: ChatData[]) => {
          if (response.data.length < MAX_CHAT_PAGE_DATA) {
            setHasDownMore(false);
          }

          return [...prev, ...formattedData];
        });
      } catch (error) {
        console.error('fail to get chat data', error);
      }
    };

    const addNewSocketData = (newChat: ChatData) => {
      setChatData((prev) => [...prev, newChat]);
    };

    const {
      setTriggerUpItem,
      setTriggerDownItem,
      getHasUpMore,
      getHasDownMore,
      setHasUpMore,
      setHasDownMore,
    } = useInfiniteScroll({
      initialFetch: getInitialChatData,
      fetchUpMore: getMoreUpChatData,
      fetchDownMore: getMoreDownChatData,
    });

    useLayoutEffect(() => {
      if (!elementRef.current || chatData.length === 0) return;

      if (isInitialTopLoading.current === true) {
        scrollToTop();
        isInitialTopLoading.current = false;
        return;
      } else if (isInitialRecentLoading.current === true) {
        scrollToBottom();
        isInitialRecentLoading.current = false;
        return;
      }

      if (isUpDirection.current === true) {
        if (isUpOverflow.current === true) {
          restoreScrollTopFromUp();
          isUpOverflow.current = false;
          isUpDirection.current = false;
          return;
        }

        remainCurrentScroll();

        if (MAX_CHAT_DATA_LENGTH < chatData.length) {
          isUpOverflow.current = true;

          setHasDownMore(true);
          setChatData((prev) => prev.slice(0, MAX_CHAT_DATA_LENGTH));
          return;
        }

        isUpDirection.current = false;
        return;
      } else if (isDownDirection.current) {
        if (isDownOverflow.current === true) {
          restoreScrollTopFromDown();
          isDownOverflow.current = false;
          isDownDirection.current = false;
          return;
        }

        rememberCurrentScrollHeight();
        if (MAX_CHAT_DATA_LENGTH < chatData.length) {
          isDownOverflow.current = true;

          setHasUpMore(true);
          setChatData((prev) => prev.slice(chatData.length - MAX_CHAT_DATA_LENGTH));
          return;
        }

        isDownDirection.current = false;
        return;
      }

      if (isLiveSendChatAdded.current) {
        if (isLiveSendOverflow.current === true) {
          scrollToBottom();
          isLiveSendOverflow.current = false;
          isLiveSendChatAdded.current = false;
          return;
        }

        scrollToBottom();

        if (MAX_CHAT_DATA_LENGTH < chatData.length) {
          isLiveSendOverflow.current = true;

          setHasUpMore(true);
          setChatData((prev) => prev.slice(chatData.length - MAX_CHAT_DATA_LENGTH));
          return;
        }

        isLiveSendChatAdded.current = false;
      } else if (isLiveReceiveChatAdded.current) {
        if (isLiveReceiveOverflow.current === true) {
          scrollToBottom();
          isLiveReceiveOverflow.current = false;
          isLiveReceiveChatAdded.current = false;
          return;
        }

        scrollToBottom();

        if (MAX_CHAT_DATA_LENGTH < chatData.length) {
          isLiveReceiveOverflow.current = true;

          setHasUpMore(true);
          setChatData((prev) => prev.slice(chatData.length - MAX_CHAT_DATA_LENGTH));
          return;
        }

        isLiveReceiveChatAdded.current = false;
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
            const isUpTriggerItem = chatIndex === FIRST_REMAIN_ITEMS && getHasUpMore();
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
            // imageUrl={selectedImage.url}
            currentIndex={selectedImage.index}
            totalImages={currentImageList.length}
            onClose={() => setSelectedImage(null)}
            onChangeImage={handleImageChange}
            imageList={currentImageList}
          />
        )}
        {toastMessage && (
          <ChatToast
            message={toastMessage}
            bottom={(chatSendFieldRef.current?.offsetHeight ?? 0) + 15}
            onClick={() => getReloadChatDataFromRecent()}
            onDismiss={() => setToastMeesage(null)}
          />
        )}
        {forbiddenDialog && (
          <Dialog
            body={'금칙어가 발견됐습니다.\n더 나은 학교를 위해\n금칙어는 자제해주세요.'}
            onConfirm={() => setForbiddenDialog(false)}
            onDismiss={() => setForbiddenDialog(false)}
            confirmButton={{
              text: '확인',
              backgroundColor: '#1F87FF',
              textColor: '#FFFFFF',
            }}
          />
        )}
      </S.Container>
    );
  },
);

export default ChatPage;
