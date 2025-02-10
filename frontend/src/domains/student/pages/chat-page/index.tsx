import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState } from 'react';
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

interface ChatPageProps {
  roomId: number;
  isEnd: boolean;
  isParticipate: boolean;
}

const ChatPage = ({ roomId, isEnd, isParticipate }: ChatPageProps) => {
  const [chatData, setChatData] = useState<ChatData[]>([]);

  const [isExitDialogOpen, setExitDialogOpen] = useState(false);

  // const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
  //   useImageUpload(10, 5);

  const navigate = useNavigate();

  const getChatData = async () => {
    try {
      const response = await api.get(`/student/agendas/${roomId}/chat`);

      const formattedData = formatChatData(response.data);
      setChatData(formattedData);
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  const exitChatRoom = async () => {
    try {
      await api.delete(`/student/agendas/${roomId}`);
    } catch (error) {
      console.error('fail to exit chat room', error);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc={isParticipate ? '/src/assets/icons/logout.svg' : undefined}
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

      <ChatSendField sendDisabled={isEnd} textDisabled={isEnd} imageDisabled={isEnd} />

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
    </S.Container>
  );
};

export default ChatPage;
