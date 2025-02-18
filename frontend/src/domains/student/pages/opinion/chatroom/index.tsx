import * as S from '@/domains/student/pages/agenda/chat/chat-page/styles.ts';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState, useCallback, useLayoutEffect, useRef } from 'react';
import {
  ChatData,
  ChatType,
  // InfoChatData,
  // MoreChatData,
  ReceiveChatData,
  SendChatData,
} from '../../agenda/chat/chat-page/ChatData.tsx';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
// import MoreChatButton from '../../agenda/chat/chat-page/MoreChatButton.tsx';
import { ExitDialog } from '../../agenda/chat/chat-page/Exitdialog.tsx';
import api from '@/utils/api.ts';
import { addDateDivider, formatChatData } from '@/utils/chat/formatChatData.ts';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { useSocketManager } from '@/hooks/useSocketManager.ts';
import { useScroll } from '@/hooks/useScrollBottom.tsx';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler.ts';
import { ChatRoomInfo } from '../../agenda/chat/chat-page/index.tsx';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import { ChatToast } from '@/components/ChatToast.tsx';
import {
  FIRST_REMAIN_ITEMS,
  LAST_REMAIN_ITEMS,
  MAX_CHAT_DATA_LENGTH,
  MAX_CHAT_PAGE_DATA,
  RECENT_CHAT_ID,
} from '@/utils/chat/chat_const.ts';
import { Dialog } from '@/components/Dialog/Dialog.tsx';

const OpinionChatPage = () => {
  const chatSendFieldRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMeesage] = useState<string | null>(null);

  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isExitDialogOpen, setExitDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isRemindEnabled, setIsRemindEnabled] = useState(false);
  const [isReminded, setIsReminded] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const { subscribe, sendMessage } = useSocketStore();
  const memberId = localStorage.getItem('member_id');
  // const { socket } = useSocketStore();
  const socketManager = useSocketManager();
  const location = useLocation();
  const lastChatId = location.state?.lastChatId || '000000000000000000000000';

  const handleMessageReceive = useCallback(
    (message: ChatMessage) => {
      if (message.roomType === 'OPINION' && message.opinionId === Number(roomId)) {
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
        if (newChat.type === ChatType.RECEIVE) {
          setIsRemindEnabled(false);
          setIsReminded(false);
        }
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

  const checkLastThreeChats = useCallback(
    (count: number) => {
      if (chatData.length < count) return false;

      const actualChats = chatData.filter(
        (chat) => chat.type === ChatType.SEND || chat.type === ChatType.RECEIVE,
      );

      if (actualChats.length < count) {
        return false;
      }

      const lastTwoChats = actualChats.slice(-count);
      const isAllStudentMessages = lastTwoChats.every((chat) => chat.type === ChatType.SEND);
      return isAllStudentMessages;
    },
    [chatData],
  );

  const handleSendRemind = async () => {
    !isReminded && (await api.patch(`/student/opinions/${roomId}/remind`));
    setIsRemindEnabled(false);
    setIsReminded(true);
    setDialogText('학생회에 리마인드 알림을 전송했어요.');
  };

  useEffect(() => {
    const unsubscribe = subscribe('OPINION', Number(roomId), handleMessageReceive);

    return () => unsubscribe();
  }, [roomId, subscribe, handleMessageReceive]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage('OPINION', Number(roomId), message, images, false);
      setMessage('');
      handleImageDelete(-1);
    },
    [roomId, sendMessage, checkLastThreeChats, handleImageDelete],
  );

  useEffect(() => {
    setIsRemindEnabled(checkLastThreeChats(3));
  }, [chatData, checkLastThreeChats]);

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

  useEnterLeaveHandler('OPINION', 'STUDENT');

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
      const [response, enterResponse] = await Promise.all([
        api.get(`/api/opinions/${roomId}/chat`, {
          params: {
            chatId: lastUpChatId.current,
            scroll: 'INITIAL',
          },
        }),
        api.get(`/api/opinions/${roomId}`),
      ]);

      const formattedData = formatChatData(response.data, false);

      setChatData(formattedData);
      enterResponse.data.isReminded && setIsReminded(true);

      setChatRoomInfo({
        title: '',
        adminName: `${enterResponse.data.universityName} 총학생회`,
      });
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

      const formattedData = formatChatData(response.data, false);

      setHasDownMore(false);
      setChatData(formattedData);
      enterResponse.data.isReminded && setIsReminded(true);
      setChatRoomInfo({
        title: '',
        adminName: `${enterResponse.data.universityName} 총학생회`,
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

  const getMoreUpChatData = async () => {
    try {
      isUpDirection.current = true;
      const response = await api.get(`/api/opinions/${roomId}/chat`, {
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

        if (MAX_CHAT_DATA_LENGTH - formattedData.length < prev.length) {
          setHasDownMore(true);
          return [...formattedData, ...prev.slice(0, MAX_CHAT_DATA_LENGTH - formattedData.length)];
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
      const response = await api.get(`/api/opinions/${roomId}/chat`, {
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
  }, [chatData]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title={chatRoomInfo.adminName}
        rightIconSrc="/src/assets/icons/exit.svg"
        onLeftIconClick={() => {
          location.state?.from === 'opinion' ? navigate('/opinion/entry') : navigate(-1);
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
                  receiverName={curChatData.name}
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
                  onImageClick={(imageUrl) => handleImageClick(imageUrl, curChatData.images || [])}
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
        onChange={setMessage}
        onSendMessage={isRemindEnabled ? handleSendRemind : handleSendMessage}
        images={images}
        onImageDelete={handleImageDelete}
        onImageUpload={handleImageUpload}
        maxLength={500}
        textDisabled={isRemindEnabled || isReminded}
        disabledPlaceHolder={
          isReminded ? '리마인드를 전송한 상태입니다.' : '답장이 없을 시 리마인드 버튼을 눌러주세요'
        }
        isRemindMode={isRemindEnabled || isReminded}
        isReminded={isReminded}
      />

      {isExitDialogOpen && (
        <ExitDialog
          onConfirm={async () => {
            setExitDialogOpen(false);
            try {
              await api.delete(`/student/opinions/${roomId}`);
              socketManager('OPINION', 'DELETE', Number(roomId), 'STUDENT');
              navigate('/my');
            } catch (error) {
              console.error('채팅방 삭제 실패:', error);
            }
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
          onClick={() => getInitialChatDataFromRecent()}
          onDismiss={() => setToastMeesage(null)}
        />
      )}
      {dialogText.length > 0 && (
        <Dialog
          body={dialogText}
          onConfirm={() => setDialogText('')}
          onDismiss={() => setDialogText('')}
          confirmButton={{
            text: '확인',
            children: '확인',
            backgroundColor: '#1F87FF',
            textColor: '#FFFFFF',
          }}
        />
      )}
    </S.Container>
  );
};

export default OpinionChatPage;
