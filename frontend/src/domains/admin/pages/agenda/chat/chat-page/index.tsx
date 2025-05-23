import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import { ChatData, ChatType, ReceiveChatData, SendChatData } from './ChatData.tsx';
import { useNavigate } from 'react-router-dom';
import { forwardRef, useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler.ts';
import { useTheme } from 'styled-components';
import api from '@/utils/api.ts';
import { addDateDivider, formatChatData } from '@/utils/chat/formatChatData.ts';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import { useScroll } from '@/hooks/useScrollBottom.tsx';
import { useCacheStore } from '@/store/cacheStore.ts';
import face1 from '@/assets/imgs/face1.png';
import face2 from '@/assets/imgs/face2.png';
import face3 from '@/assets/imgs/face3.png';
import face4 from '@/assets/imgs/face4.png';
import face5 from '@/assets/imgs/face5.png';
import face6 from '@/assets/imgs/face6.png';
import face7 from '@/assets/imgs/face7.png';
import face8 from '@/assets/imgs/face8.png';
import { ChatToast } from '@/components/Toast/ChatToast.tsx';
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';
import { SendDialog } from '../../components/SendDialog.tsx';
import {
  FIRST_REMAIN_ITEMS,
  LAST_REMAIN_ITEMS,
  MAX_CHAT_DATA_LENGTH,
  MAX_CHAT_PAGE_DATA,
  RECENT_CHAT_ID,
} from '@/utils/chat/chat_const.ts';

interface ChatPageProps {
  roomId: number;
  isEnd?: boolean;
  lastChatId: string;
}

export interface ChatRoomInfo {
  title: string;
  adminName: string;
}

const ChatPage = forwardRef<HTMLDivElement, ChatPageProps>(
  ({ roomId, isEnd = false, lastChatId }) => {
    const [isToolTipVisible, setToolTipVisible] = useState(false);
    const chatSendFieldRef = useRef<HTMLDivElement>(null);
    const [toastMessage, setToastMeesage] = useState<string | null>(null);
    const [showSendDialog, setShowSendDialog] = useState<boolean>(false);

    const theme = useTheme();
    const randomBackgroundColor = [
      theme.colors.icnOrange,
      theme.colors.icnRed,
      theme.colors.icnPurple,
      theme.colors.icnGreen,
      theme.colors.blueScale10,
      theme.colors.icnYellow,
      theme.colors.icnPink,
      theme.colors.icnGray,
    ];

    const randomIcon = [face1, face2, face3, face4, face5, face6, face7, face8];

    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<ChatData[]>([]);

    const memberId = localStorage.getItem('member_id');

    const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
      useImageUpload(10, 5);

    const navigate = useNavigate();

    const subscribe = useSocketStore((state) => state.subscribe);
    const sendMessage = useSocketStore((state) => state.sendMessage);

    const handleMessageReceive = useCallback(
      (message: ChatMessage) => {
        console.log('message', message);
        if (message.roomType === 'AGENDA' && message.agendaId === Number(roomId)) {
          const newChat = {
            type: message.adminId === Number(memberId) ? ChatType.SEND : ChatType.RECEIVE,
            message: message.message,
            time: new Date(message.createdAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            images: message.images || [],
            createdAt: message.createdAt,
          };

          if (message.adminId === Number(memberId)) {
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

    const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);
    const [currentImageList, setCurrentImageList] = useState<string[]>([]);

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

    useEnterLeaveHandler('AGENDA', 'ADMIN');

    useEffect(() => {
      const unsubscribe = subscribe('AGENDA', Number(roomId), handleMessageReceive);
      return () => unsubscribe();
    }, [roomId, handleMessageReceive, subscribe]);

    const handleSendMessage = useCallback(
      (message: string, images: string[] = []) => {
        sendMessage('AGENDA', Number(roomId), message, images, true);
        setMessage('');
        handleImageDelete(-1);
      },
      [roomId, sendMessage],
    );

    let upLastItemId: string = '';
    let downLastItemId: string = '';

    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
      title: '',
      adminName: '총학생회',
    });

    const lastUpChatId = useRef<string | null>(lastChatId);
    const lastDownChatId = useRef<string | null>(lastChatId);
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
          api.get(`/admin/agendas/${roomId}/chat`, {
            params: {
              chatId: lastUpChatId.current,
              scroll: 'INITIAL',
            },
          }),
          api.get(`/admin/agendas/${roomId}`),
        ]);
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

    const getInitialChatDataFromRecent = async () => {
      try {
        isInitialRecentLoading.current = true;
        const [response, chatInfo] = await Promise.all([
          api.get(`/admin/agendas/${roomId}/chat`, {
            params: {
              chatId: RECENT_CHAT_ID,
              scroll: 'INITIAL',
            },
          }),
          api.get(`/admin/agendas/${roomId}`),
        ]);

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

    const getReloadChatDataFromRecent = async () => {
      try {
        isInitialRecentLoading.current = true;
        const response = await api.get(`/admin/agendas/${roomId}/chat`, {
          params: {
            chatId: RECENT_CHAT_ID,
            scroll: 'INITIAL',
          },
        });

        const formattedData = formatChatData(response.data, true);

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
        const response = await api.get(`/admin/agendas/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'UP',
          },
        });

        const formattedData = formatChatData(response.data, true);
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
        const response = await api.get(`/admin/agendas/${roomId}/chat`, {
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

        const formattedData = formatChatData(response.data, true);

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
      } else if (isDownDirection.current === true) {
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

    const colorMap = useRef(new Map<number, string>());
    const iconMap = useRef(new Map<number, string>());

    const getRandomValue = (map: Map<number, string>, memberId: number, values: string[]) => {
      if (map.has(memberId)) {
        return map.get(memberId);
      } else {
        const randomValue = values[Math.floor(Math.random() * values.length)];
        map.set(memberId, randomValue);
        return randomValue;
      }
    };

    return (
      <S.Container>
        <TopAppBar
          leftIconSrc="/src/assets/icons/arrow-left.svg"
          title={chatRoomInfo.title}
          rightIconSrc="/src/assets/icons/information-circle-contained.svg"
          onLeftIconClick={() => {
            navigate(-1);
          }}
          onRightIconClick={() => {
            setToolTipVisible((prev) => !prev);
          }}
        />
        {isToolTipVisible && (
          <S.ToolTip>
            <S.ToolTipText variant="caption1">
              안건에 대해 학생의 이야기를 듣고 학생회가 답변을 할 수 있어요.
            </S.ToolTipText>
          </S.ToolTip>
        )}
        <S.ChatList ref={elementRef}>
          {chatData.map((chat, chatIndex) => {
            const isUpTriggerItem = chatIndex === FIRST_REMAIN_ITEMS && getHasUpMore();
            const isDownTriggerItem = chatIndex === chatData.length - LAST_REMAIN_ITEMS;

            if (chat.type === ChatType.RECEIVE) {
              const curChatData = chat as ReceiveChatData;
              if (upLastItemId.length === 0) upLastItemId = curChatData.chatId;
              downLastItemId = curChatData.chatId;

              const randomColor = getRandomValue(
                colorMap.current,
                curChatData.memberId,
                randomBackgroundColor,
              );
              const randomImg = getRandomValue(iconMap.current, curChatData.memberId, randomIcon);

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
                    chatId={curChatData.chatId}
                    key={curChatData.chatId}
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
                    receiverIconBackgroundColor={randomColor}
                    receiverIconSrc={randomImg}
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
          initialText={message}
          disabledPlaceHolder="종료된 채팅방입니다."
          textDisabled={isEnd}
          sendDisabled={isEnd}
          imageDisabled={isEnd}
          onChange={setMessage}
          onSendMessage={() => setShowSendDialog(true)}
          images={images}
          onImageDelete={handleImageDelete}
          onImageUpload={handleImageUpload}
          maxLength={500}
        />
        {showSendDialog && (
          <SendDialog
            message={message}
            images={images}
            onConfirm={() => {
              handleSendMessage(message, images);
              setShowSendDialog(false); // 얘 나중에 삭제
              const invalidateQueries = useCacheStore.getState().invalidateQueries;
              invalidateQueries('my-agendas');
            }}
            onDismiss={() => setShowSendDialog(false)}
          />
        )}
        {showSizeDialog && (
          <ImageFileSizeDialog onConfirm={closeSizeDialog} onDismiss={closeSizeDialog} />
        )}

        {selectedImage && (
          <ImagePreview
            // imageUrl={selectedImage.url}
            onClose={() => setSelectedImage(null)}
            currentIndex={selectedImage.index}
            totalImages={currentImageList.length}
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
      </S.Container>
    );
  },
);

export default ChatPage;
