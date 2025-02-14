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
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog';
import { useScroll } from '@/hooks/useScrollBottom';
import { ImagePreview } from '@/components/Chat/ImagePreview';
import { useEnterLeaveHandler } from '@/hooks/useEnterLeaveHandler';

const OpinionChatPage = () => {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isExitDialogOpen, setExitDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isReminded, setIsReminded] = useState(false);

  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const { subscribe, sendMessage } = useSocketStore();
  const memberId = localStorage.getItem('member_id');
  const location = useLocation();
  const opinionType = location.state?.opinionType || '';
  const lastChatId = location.state?.lastChatId || 0;

  const handleMessageReceive = useCallback(
    (message: ChatMessage) => {
      if (message.roomType === 'OPINION' && message.opinionId === Number(roomId)) {
        const newChat = {
          type: message.adminId === Number(memberId) ? ChatType.SEND : ChatType.RECEIVE,
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
        const res = await api.get(`/api/opinions/${roomId}`);
        setIsReminded(res.data.isReminded);
        const response = await api.get(`/api/opinions/${roomId}/chat`, {
          params: { chatId: lastChatId, scroll: 'INITIAL' },
        });
        console.log('채팅 데이터:', response);
        const formattedData = formatChatData(response.data, true);
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
  }, [roomId, handleMessageReceive, subscribe]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage('OPINION', Number(roomId), message, images, true);
      setMessage('');
      handleImageDelete(-1);
      setIsReminded(false);
    },
    [roomId, sendMessage],
  );

  const { elementRef, useScrollOnUpdate } = useScroll<HTMLDivElement>();
  // chatData가 업데이트될 때마다 스크롤
  useScrollOnUpdate(chatData);

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

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title={opinionType}
        rightIconSrc="/src/assets/icons/close.svg"
        onLeftIconClick={() => {
          navigate(-1);
        }}
        onRightIconClick={() => {
          setExitDialogOpen(true);
        }}
      />

      <S.ChatList ref={elementRef}>
        {chatData.map((chat, index) => {
          if (chat.type === ChatType.RECEIVE) {
            const chatData = chat as ReceiveChatData;
            return (
              <ReceiverChat
                chatId={chatData.chatId}
                key={index}
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
                key={index}
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
                onImageClick={(imageUrl) => handleImageClick(imageUrl, chatData.images || [])}
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
        {isReminded ? (
          <TextBadge text="답변을 기다리고 있어요" backgroundColor="#FF4B4B" textColor="#fff" />
        ) : null}
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

export default OpinionChatPage;
