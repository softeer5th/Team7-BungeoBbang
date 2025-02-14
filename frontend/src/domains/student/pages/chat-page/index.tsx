import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState, useCallback } from 'react';
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
import { useSocketManager } from '@/hooks/useSocketManager';
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';
import { useImageUpload } from '@/hooks/useImageUpload.ts';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog.tsx';
import { useSocketStore, ChatMessage } from '@/store/socketStore.ts';
import { useScroll } from '@/hooks/useScrollBottom';

interface ChatPageProps {
  roomId: number;
  isEnd: boolean;
  isParticipate: boolean;
  lastChatId: string;
}

const ChatPage = ({ roomId, isEnd, isParticipate, lastChatId }: ChatPageProps) => {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isExitDialogOpen, setExitDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; index: number } | null>(null);
  const [currentImageList, setCurrentImageList] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const navigate = useNavigate();

  const socketManager = useSocketManager();
  const { subscribe, sendMessage } = useSocketStore();
  const memberId = localStorage.getItem('member_id');

  const exitChatRoom = async () => {
    try {
      await api.delete(`/student/agendas/${roomId}`);
      navigate(-1);
    } catch (error) {
      console.error('fail to exit chat room', error);
    }
  };

  useEffect(() => {
    const getChatData = async () => {
      try {
        console.log('lastchatID', lastChatId);
        const response = await api.get(`/student/agendas/${roomId}/chat`, {
          params: { chatId: lastChatId },
        });

        const formattedData = formatChatData(response.data, false);
        setChatData(formattedData);
      } catch (error) {
        console.error('fail to get chat data', error);
      }
    };
    getChatData();
  }, []);

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
        setChatData((prev) => [...prev, newChat]);
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

  const { elementRef, useScrollOnUpdate } = useScroll<HTMLDivElement>();
  useScrollOnUpdate(chatData);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc={isParticipate ? '/src/assets/icons/logout.svg' : undefined}
        onLeftIconClick={() => {
          navigate(-1);
          socketManager('AGENDA', 'LEAVE', Number(roomId), 'STUDENT');
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
                chatId={chatData.chatId}
                receiverName={chatData.name}
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
                onImageClick={(imageUrl) => handleImageClick(imageUrl, chatData.images || [])}
              />
            );
          } else if (chat.type === ChatType.SEND) {
            const chatData = chat as SendChatData;
            return (
              <SenderChat
                chatId={chatData.chatId}
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
                onImageClick={(imageUrl) => handleImageClick(imageUrl, chatData.images || [])}
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
    </S.Container>
  );
};

export default ChatPage;
