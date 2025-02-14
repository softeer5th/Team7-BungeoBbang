import * as S from '@/domains/student/pages/chat-page/styles';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState, useCallback, useRef } from 'react';
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
import { ImagePreview } from '@/components/Chat/ImagePreview.tsx';

const OpinionChatPage = () => {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isExitDialogOpen, setExitDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isRemindEnabled, setIsRemindEnabled] = useState(false);
  const [isReminded, setIsReminded] = useState(false);
  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const { subscribe, sendMessage } = useSocketStore();
  const memberId = localStorage.getItem('member_id');
  const { socket } = useSocketStore();
  const socketManager = useSocketManager();
  const lastChatId = useLocation().state?.lastChatId || '000000000000000000000000';

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

  const checkLastThreeChats = useCallback(() => {
    if (chatData.length < 3) return false;

    const lastThreeChats = chatData.slice(-3);
    const isAllStudentMessages = lastThreeChats.every((chat) => chat.type === ChatType.SEND);
    return isAllStudentMessages;
  }, [chatData]);

  const handleSendRemind = async () => {
    await api.patch(`/student/opinions/${roomId}/remind`);
    setIsReminded(true);
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      try {
        const enterResponse = await api.get(`/api/opinions/${roomId}`);
        enterResponse.data.isReminded && setIsReminded(true);
        const response = await api.get(`/api/opinions/${roomId}/chat`, {
          params: { chatId: lastChatId },
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

  // chatData가 변경될 때마다 버튼 상태 업데이트
  useEffect(() => {
    setIsRemindEnabled(checkLastThreeChats());
  }, [chatData, checkLastThreeChats]);

  const handleSendMessage = useCallback(
    (message: string, images: string[] = []) => {
      sendMessage('OPINION', Number(roomId), message, images, false);
      setMessage('');
      handleImageDelete(-1);
    },
    [roomId, sendMessage],
  );

  const { elementRef, useScrollOnUpdate } = useScrollBottom<HTMLDivElement>();
  useScrollOnUpdate(chatData);

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

  //모바일 뒤로가기 스와이프 시 채팅방 나가기
  const hasLeft = useRef(false);

  const handleLeave = useCallback(() => {
    if (!hasLeft.current) {
      socketManager('AGENDA', 'LEAVE', Number(localStorage.getItem('member_id')), 'ADMIN');
      hasLeft.current = true;
    }
  }, [socketManager]);

  useEffect(() => {
    return () => {
      handleLeave();
    };
  }, [handleLeave]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc="/src/assets/icons/logout.svg"
        onLeftIconClick={() => {
          navigate(-1);
          handleLeave();
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
        initialText={message}
        onChange={setMessage}
        onSendMessage={isRemindEnabled ? handleSendRemind : handleSendMessage}
        images={images}
        onImageDelete={handleImageDelete}
        onImageUpload={handleImageUpload}
        maxLength={500}
        // sendDisabled={isRemindEnabled}
        textDisabled={isRemindEnabled}
        disabledPlaceHolder={
          isReminded ? '리마인드를 전송한 상태입니다.' : '답장이 없을 시 리마인드 버튼을 눌러주세요'
        }
      />

      {isExitDialogOpen && (
        <ExitDialog
          onConfirm={async () => {
            setExitDialogOpen(false);
            try {
              socketManager('OPINION', 'EXIT', Number(roomId), 'STUDENT');
              await api.delete(`/student/opinions/${roomId}`);
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
