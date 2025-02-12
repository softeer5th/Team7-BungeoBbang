import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import * as S from '@/domains/student/pages/chat-page/styles';
import { TopAppBar } from '@/components/TopAppBar';
import {
  ChatData,
  ChatType,
  InfoChatData,
  MoreChatData,
  ReceiveChatData,
  SendChatData,
} from '@/domains/student/pages/chat-page/ChatData';
import { ChatSendField } from '@/components/Chat/ChatSendField';
import { ReceiverChat } from '@/components/Chat/ReceiverChat';
import { SenderChat } from '@/components/Chat/SenderChat';
import { TextBadge } from '@/components/Chat/TextBadge';
import MoreChatButton from '@/domains/student/pages/chat-page/MoreChatButton';
import { ExitDialog } from '@/domains/student/pages/chat-page/Exitdialog';
import api from '@/utils/api';
import { formatChatData } from '@/utils/chat/formatChatData';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useSocketStore } from '@/store/socketStore';
import { useSocketManager } from '@/hooks/useSocketManager';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog';

interface ChatMessage {
  roomType: 'OPINION';
  event: 'CHAT';
  opinionId: number;
  message: string;
  images: string[];
  memberId: number;
  createdAt: string;
}

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
  const socketManager = useSocketManager();
  const location = useLocation();
  const opinionType = location.state?.opinionType || '';

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
        const response = await api.get(`/api/opinions/${roomId}/chat`);
        const formattedData = formatChatData(response.data, true);
        console.log('formattedData', response);
        setChatData(formattedData);
      } catch (error) {
        console.error('채팅 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [roomId]);

  useEffect(() => {
    const unsubscribe = subscribe('OPINION', Number(roomId), handleMessageReceive);
    return () => unsubscribe();
  }, [roomId, subscribe, handleMessageReceive]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage('OPINION', Number(roomId), message, images);
      setMessage('');
    },
    [roomId, sendMessage],
  );

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title={opinionType}
        rightIconSrc="/src/assets/icons/close.svg"
        onLeftIconClick={() => {
          navigate(-1);
          socketManager('OPINION', 'LEAVE', Number(roomId));
        }}
        onRightIconClick={() => {
          setExitDialogOpen(true);
        }}
      />

      <S.ChatList>
        {chatData.map((chat, index) => {
          if (chat.type === ChatType.RECEIVE) {
            const chatData = chat as ReceiveChatData;
            return (
              <ReceiverChat
                key={index}
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
                key={index}
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
              />
            );
          } else if (chat.type === ChatType.INFO) {
            const chatData = chat as InfoChatData;
            return <TextBadge key={index} text={chatData.message} />;
          } else if (chat.type === ChatType.MORE) {
            const chatData = chat as MoreChatData;
            return (
              <MoreChatButton
                key={index}
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
          onConfirm={() => {
            setExitDialogOpen(false);
            navigate(-1);
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
