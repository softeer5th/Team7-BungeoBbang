import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react';
import * as S from '@/domains/student/pages/agenda/chat/chat-page/styles';
import { TopAppBar } from '@/components/TopAppBar';
import {
  ChatData,
  ChatType,
  ReceiveChatData,
  SendChatData,
} from '@/domains/student/pages/agenda/chat/chat-page/ChatData';
import { ChatSendField } from '@/components/Chat/ChatSendField';
import { ReceiverChat } from '@/components/Chat/ReceiverChat';
import { SenderChat } from '@/components/Chat/SenderChat';
import { TextBadge } from '@/components/Chat/TextBadge';
import api from '@/utils/api';
import { addDateDivider, formatChatData } from '@/utils/chat/formatChatData';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog';
import { useScroll } from '@/hooks/useScrollBottom';
import { ImagePreview } from '@/components/Chat/ImagePreview';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatToast } from '@/components/ChatToast';
import {
  FIRST_REMAIN_ITEMS,
  LAST_REMAIN_ITEMS,
  MAX_CHAT_DATA_LENGTH,
  MAX_CHAT_PAGE_DATA,
  RECENT_CHAT_ID,
} from '@/utils/chat/chat_const';

const OpinionChatPage = () => {
  const chatSendFieldRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMeesage] = useState<string | null>(null);

  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [message, setMessage] = useState('');
  const [isReminded, setIsReminded] = useState(false);

  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const { subscribe, sendMessage, socket, connect } = useSocketStore();
  const memberId = localStorage.getItem('member_id');
  const location = useLocation();
  const opinionType = location.state?.opinionType || '';
  const categoryType =
    (location.state?.categoryType as ChatCategoryType) || ChatCategoryType.ACADEMICS;

  const lastChatId = location.state?.lastChatId || 0;

  const handleMessageReceive = useCallback(
    (message: ChatMessage) => {
      if (message.roomType === 'OPINION' && message.opinionId === Number(roomId)) {
        console.log('message1213', getHasDownMore());
        // const newChat = {
        //   type: message.adminId === Number(memberId) ? ChatType.SEND : ChatType.RECEIVE,
        //   message: message.message,
        //   time: new Date(message.createdAt).toLocaleTimeString('ko-KR', {
        //     hour: '2-digit',
        //     minute: '2-digit',
        //   }),
        //   images: message.images || [],
        //   createdAt: message.createdAt,
        // };

        if (message.adminId === Number(memberId)) {
          getInitialChatDataFromRecent();
        } else {
          if (!getHasDownMore() && isWatchingBottom()) {
            getReloadChatDataFromRecent();
          }
          setToastMeesage('새로운 채팅이 도착했습니다.');
        }
      }
    },
    [roomId, memberId],
  );

  useEffect(() => {
    if (!socket) {
      connect(true); // true for admin
    }
  }, [socket, connect]);

  useEffect(() => {
    if (!roomId || !socket) return;

    const unsubscribe = subscribe('OPINION', Number(roomId), handleMessageReceive);
    return () => unsubscribe();
  }, [roomId, handleMessageReceive, subscribe, socket]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage('OPINION', Number(roomId), message, images, true);
      setMessage('');
      handleImageDelete(-1);
      setIsReminded(false);
    },
    [roomId, sendMessage],
  );

  // 이미지 클릭 시 이미지 프리뷰 열기
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

  useEnterLeaveHandler('OPINION', 'ADMIN');

  const lastUpChatId = useRef<string>(lastChatId);
  const lastDownChatId = useRef<string>(lastChatId);
  const isInitialTopLoading = useRef<boolean>(false);
  const isInitialRecentLoading = useRef<boolean>(false);
  const isUpDirection = useRef<boolean>(false);
  const isDownDirection = useRef<boolean>(false);

  let upLastItemId: string = '';
  let downLastItemId: string = '';

  const isUpOverflow = useRef<boolean>(false);
  const isDownOverflow = useRef<boolean>(false);

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
      const [response, enterResponse] = await Promise.all([
        api.get(`/api/opinions/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'INITIAL',
          },
        }),
        api.get(`/api/opinions/${roomId}`),
      ]);

      const formattedData = formatChatData(response.data, true);

      setChatData(formattedData);

      enterResponse.data.isReminded && setIsReminded(true);
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const getInitialChatDataFromRecent = async () => {
    try {
      isInitialRecentLoading.current = true;
      const [response, enterResponse] = await Promise.all([
        api.get(`/api/opinions/${roomId}/chat`, {
          params: {
            chatId: RECENT_CHAT_ID,
            scroll: 'INITIAL',
          },
        }),
        api.get(`/api/opinions/${roomId}`),
      ]);
      console.log('responsesseee', response);

      const formattedData = formatChatData(response.data, true);

      // setHasDownMore(false);
      setChatData(formattedData);
      enterResponse.data.isReminded && setIsReminded(true);
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const getReloadChatDataFromRecent = async () => {
    try {
      isInitialRecentLoading.current = true;
      const response = await api.get(`/api/opinions/${roomId}/chat`, {
        params: {
          chatId: RECENT_CHAT_ID,
          scroll: 'INITIAL',
        },
      });

      console.log('responsesseee', response);

      const formattedData = formatChatData(response.data, true);

      // setHasDownMore(false);
      setChatData(formattedData);
      // enterResponse.data.isReminded && setIsReminded(true);
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const getMoreUpChatData = async () => {
    try {
      if (isUpDirection.current) return;
      isUpDirection.current = true;
      const response = await api.get(`/api/opinions/${roomId}/chat`, {
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
      if (isDownDirection.current) return;
      isDownDirection.current = true;
      const response = await api.get(`/api/opinions/${roomId}/chat`, {
        params: {
          chatId: lastDownChatId.current,
          scroll: 'DOWN',
        },
      });

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

  const handleImageChange = (newIndex: number) => {
    if (selectedImage && currentImageList.length > 0) {
      setSelectedImage({
        url: currentImageList[newIndex],
        index: newIndex,
      });
    }
  };

  const { setTriggerUpItem, setTriggerDownItem, getHasDownMore, setHasUpMore, setHasDownMore } =
    useInfiniteScroll({
      initialFetch: getInitialChatData,
      fetchUpMore: getMoreUpChatData,
      fetchDownMore: getMoreDownChatData,
    });

  useLayoutEffect(() => {
    if (!elementRef.current || chatData.length === 0) return;
    console.log('getchasdata', chatData);

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
    }

    if (isDownDirection.current) {
      if (isDownOverflow.current === true) {
        // console.log("down 호출");
        restoreScrollTopFromDown();
        isDownOverflow.current = false;
        isDownDirection.current = false;
        return;
      }

      rememberCurrentScrollHeight();

      if (MAX_CHAT_DATA_LENGTH < chatData.length) {
        isDownOverflow.current = true;
        // console.log("slice!!");

        setHasUpMore(true);
        setChatData((prev) => prev.slice(chatData.length - MAX_CHAT_DATA_LENGTH));
        return;
      }

      isDownDirection.current = false;
    }
  }, [chatData]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title={opinionType}
        onLeftIconClick={() => {
          navigate(-1);
        }}
      />

      <S.ChatList ref={elementRef}>
        {chatData.map((chat, index) => {
          const isUpTriggerItem = index === FIRST_REMAIN_ITEMS;
          const isDownTriggerItem = index === chatData.length - LAST_REMAIN_ITEMS;

          if (chat.type === ChatType.RECEIVE) {
            const curChatData = chat as ReceiveChatData;
            if (upLastItemId.length === 0) upLastItemId = curChatData.chatId;
            downLastItemId = curChatData.chatId;

            return (
              <>
                {(() => {
                  const date = addDateDivider(curChatData, index > 0 ? chatData[index - 1] : null);

                  return date ? <TextBadge text={date} /> : null;
                })()}
                <ReceiverChat
                  chatId={curChatData.chatId}
                  key={index}
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
                  receiverIconBackgroundColor={categoryType.iconBackground}
                  receiverIconSrc={categoryType.iconSrc}
                  message={curChatData.message}
                  images={curChatData.images}
                  timeText={curChatData.time}
                  onImageClick={(imageUrl) => handleImageClick(imageUrl, curChatData.images || [])}
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
                  const date = addDateDivider(curChatData, index > 0 ? chatData[index - 1] : null);

                  return date ? <TextBadge text={date} /> : null;
                })()}
                <SenderChat
                  chatId={curChatData.chatId}
                  key={index}
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
                  onImageClick={(imageUrl) => handleImageClick(imageUrl, curChatData.images || [])}
                />
              </>
            );
          }
          return null;
        })}
        {isReminded ? (
          <TextBadge text="답변을 기다리고 있어요" backgroundColor="#FF4B4B" textColor="#fff" />
        ) : null}
      </S.ChatList>

      <ChatSendField
        ref={chatSendFieldRef}
        initialText={message}
        onChange={setMessage}
        onSendMessage={handleSendMessage}
        images={images}
        onImageDelete={handleImageDelete}
        onImageUpload={handleImageUpload}
        maxLength={500}
      />

      {showSizeDialog && (
        <ImageFileSizeDialog onConfirm={closeSizeDialog} onDismiss={closeSizeDialog} />
      )}
      {selectedImage && (
        <ImagePreview
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
          onClick={() => getInitialChatDataFromRecent()}
          onDismiss={() => setToastMeesage(null)}
        />
      )}
    </S.Container>
  );
};

export default OpinionChatPage;
