import * as S from '@/domains/student/pages/chat-page/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState, useCallback } from 'react';
import {
  ChatData,
  ChatType,
  InfoChatData,
  MoreChatData,
  ReceiveChatData,
  SendChatData,
} from '../../chat-page/ChatData';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import MoreChatButton from '../../chat-page/MoreChatButton.tsx';
import { ExitDialog } from '../../chat-page/Exitdialog.tsx';
import api from '@/utils/api.ts';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { useSocketManager } from '@/hooks/useSocketManager.ts';
import { useScrollBottom } from '@/hooks/useScrollBottom.tsx';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';

const OpinionChatPage = () => {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isExitDialogOpen, setExitDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const { subscribe, sendMessage } = useSocketStore();
  const memberId = localStorage.getItem('member_id');
  const { socket } = useSocketStore();
  const socketManager = useSocketManager();

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
        };
        setChatData((prev) => [...prev, newChat]);
      }
    },
    [roomId, memberId],
  );

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      try {
        const enterResponse = await api.get(`/api/opinions/${roomId}`);
        console.log('채팅방 정보:', enterResponse);
        const response = await api.get(`/api/opinions/${roomId}/chat`, {
          params: { chatId: '000000000000000000000000' },
        });
        const formattedData = formatChatData(response.data, false);
        setChatData(formattedData);
      } catch (error) {
        console.error('채팅 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [roomId, socket]);

  useEffect(() => {
    const unsubscribe = subscribe('OPINION', Number(roomId), handleMessageReceive);
    return () => unsubscribe();
  }, [roomId, subscribe, handleMessageReceive]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage('OPINION', Number(roomId), message, images, false);
      setMessage('');
    },
    [roomId, sendMessage],
  );

  const { elementRef, useScrollOnUpdate } = useScrollBottom<HTMLDivElement>();

  useScrollOnUpdate(chatData);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc="/src/assets/icons/logout.svg"
        onLeftIconClick={() => {
          navigate(-1);
          socketManager('OPINION', 'LEAVE', Number(roomId));
        }}
        onRightIconClick={() => {
          setExitDialogOpen(true);
        }}
      />
      <S.ChatList ref={elementRef}>
        {chatData.map((chat) => {
          if (chat.type === ChatType.RECEIVE) {
            const chatData = chat as ReceiveChatData;
            return (
              <ReceiverChat
                receiverName={chatData.name}
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
              />
            );
          } else if (chat.type === ChatType.SEND) {
            const chatData = chat as SendChatData;
            return (
              <SenderChat
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
              />
            );
          } else if (chat.type === ChatType.INFO) {
            const chatData = chat as InfoChatData;
            return <TextBadge text={chatData.message} />;
          } else if (chat.type === ChatType.MORE) {
            const chatData = chat as MoreChatData;
            return (
              <MoreChatButton
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
        initialText={message}
        onChange={setMessage}
        onSendMessage={handleSendMessage}
        images={images}
        onImageDelete={handleImageDelete}
        onImageUpload={handleImageUpload}
        maxLength={500}
      />

      {isExitDialogOpen && (
        <ExitDialog
          onConfirm={async () => {
            setExitDialogOpen(false);
            try {
              socketManager('OPINION', 'EXIT', Number(roomId));
              await api.delete(`/student/opinion/${roomId}`);
              navigate('/opinion/entry');
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
    </S.Container>
  );
};

export default OpinionChatPage;
