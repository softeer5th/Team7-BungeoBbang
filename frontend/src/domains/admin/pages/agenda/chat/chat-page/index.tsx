import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import {
  ChatData,
  ChatType,
  InfoChatData,
  // MoreChatData,
  ReceiveChatData,
  SendChatData,
} from './ChatData.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { forwardRef, useCallback, useState, useEffect } from 'react';
// import { getDefaultBorderStyle } from '@/components/border/getBorderType.tsx';
// import { BorderType } from '@/components/border/BorderProps.tsx';
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler.ts';
import { useTheme } from 'styled-components';

interface ChatPageProps {
  apiChatData: ChatData[];
  chatRoomInfo: ChatRoomInfo;
  onUpLastItemChange?: (lastItemRef: HTMLDivElement, lastItemId: string) => void;
  onDownLastItemChange?: (lastItemRef: HTMLDivElement, lastItemId: string) => void;
  onMessageSend: (data: ChatData) => void;
  onMessageReceive: (data: ChatData) => void;
}

export interface ChatRoomInfo {
  title: string;
  adminName: string;
}

const ChatPage = forwardRef<HTMLDivElement, ChatPageProps>(
  (
    {
      apiChatData,
      chatRoomInfo,
      onUpLastItemChange = () => {},
      onDownLastItemChange = () => {},
      onMessageSend = () => {},
      onMessageReceive = () => {},
    },
    ref,
  ) => {
    const [isToolTipVisible, setToolTipVisible] = useState(false);
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

    const randomIcon = [
      '/src/assets/imgs/face1.png',
      '/src/assets/imgs/face2.png',
      '/src/assets/imgs/face3.png',
      '/src/assets/imgs/face4.png',
      '/src/assets/imgs/face5.png',
      '/src/assets/imgs/face6.png',
      '/src/assets/imgs/face7.png',
      '/src/assets/imgs/face8.png'
    ];

    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState<ChatData[]>([]);

    useEffect(() => {
      setChatData(apiChatData);
    }, [apiChatData]);

    const memberId = localStorage.getItem('member_id');
    const { roomId } = useParams();

    const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
      useImageUpload(10, 5);

    const navigate = useNavigate();

    const FIRST_REMAIN_ITEMS = 1;
    const LAST_REMAIN_ITEMS = 1;

    let upLastItemId: string = '';
    let downLatItemId: string = '';

    const { subscribe, sendMessage } = useSocketStore();

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
          };
          if (message.adminId === Number(memberId)) {
            onMessageSend(newChat);
          } else {
            onMessageReceive(newChat);
          }
        }
      },
      [roomId, memberId],
    );

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
            console.log('Clic!!');
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
        <S.ChatList ref={ref}>
          {chatData.map((chat, chatIndex) => {
            const isUpTriggerItem = chatIndex === FIRST_REMAIN_ITEMS;
            const isDownTriggerItem = chatIndex === chatData.length - LAST_REMAIN_ITEMS;

            if (chat.type === ChatType.RECEIVE) {
              const chatData = chat as ReceiveChatData;
              if (upLastItemId.length === 0) upLastItemId = chatData.chatId;
              downLatItemId = chatData.chatId;

              const randomColor = randomBackgroundColor[Math.floor(Math.random() * randomBackgroundColor.length)];
              const randomImg = randomIcon[Math.floor(Math.random() * randomIcon.length)];
              
              return (
                <ReceiverChat
                  chatId={chatData.chatId}
                  ref={
                    isUpTriggerItem
                      ? (el) => {
                          if (el) {
                            onUpLastItemChange(el, upLastItemId);
                          }
                        }
                      : isDownTriggerItem
                        ? (el) => {
                            if (el) {
                              onDownLastItemChange(el, downLatItemId);
                            }
                          }
                        : null
                  }
                  receiverIconBackgroundColor={randomColor}
                  receiverIconSrc={randomImg}
                  message={chatData.message}
                  images={chatData.images}
                  timeText={chatData.time}
                />
              );
            } else if (chat.type === ChatType.SEND) {
              const chatData = chat as SendChatData;
              if (upLastItemId.length === 0) upLastItemId = chatData.chatId;
              downLatItemId = chatData.chatId;

              return (
                <SenderChat
                  chatId={chatData.chatId}
                  ref={
                    isUpTriggerItem
                      ? (el) => {
                          if (el) {
                            onUpLastItemChange(el, upLastItemId);
                          }
                        }
                      : isDownTriggerItem
                        ? (el) => {
                            if (el) {
                              onDownLastItemChange(el, downLatItemId);
                            }
                          }
                        : null
                  }
                  message={chatData.message}
                  images={chatData.images}
                  timeText={chatData.time}
                />
              );
            } else if (chat.type === ChatType.INFO) {
              const chatData = chat as InfoChatData;
              return <TextBadge text={chatData.message} />;
            }
            return null;
          })}
        </S.ChatList>

        <ChatSendField
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
      </S.Container>
    );
  },
);

export default ChatPage;
