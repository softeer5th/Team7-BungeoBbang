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
import { Dialog } from '@/components/Dialog/Dialog.tsx';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { useSocketStore } from '@/store/socketStore';

interface ChatMessage {
  roomType: 'OPINION' | 'AGENDA';
  event: 'CHAT';
  opinionId?: number;
  agendaId?: number;
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

  const handleMessageReceive = useCallback(
    (message: ChatMessage) => {
      if (message.roomType === 'OPINION' && message.opinionId === Number(roomId)) {
        const newChat = {
          type: message.memberId === 1 ? ChatType.SEND : ChatType.RECEIVE, // TODO: memberId 수정
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
    [roomId],
  );

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      try {
        const enterResponse = await api.get(`/api/opinions/${roomId}`);
        console.log(enterResponse.data);
        const response = await api.get(`/api/opinions/${roomId}/chat`);
        console.log(response.data);
        const formattedData = formatChatData(response.data);
        setChatData(formattedData);
      } catch (error) {
        console.error('채팅 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) {
      console.log('No roomId provided');
      return;
    }

    const unsubscribe = subscribe('OPINION', Number(roomId), handleMessageReceive);
    return () => unsubscribe();
  }, [roomId, subscribe, handleMessageReceive]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      if (!roomId || !message.trim()) return;

      sendMessage('OPINION', Number(roomId), message, images);
      setMessage('');
    },
    [roomId, sendMessage],
  );

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc="/src/assets/icons/logout.svg"
        onLeftIconClick={() => {
          navigate(-1);
        }}
        onRightIconClick={() => {
          setExitDialogOpen(true);
        }}
      />
      <S.ChatList>
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
          onConfirm={() => {
            setExitDialogOpen(false);
          }}
          onDismiss={() => {
            setExitDialogOpen(false);
          }}
        />
      )}
      {showSizeDialog && (
        <Dialog
          body="10MB 이하의 이미지만 업로드할 수 있습니다."
          onConfirm={closeSizeDialog}
          onDismiss={closeSizeDialog}
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
