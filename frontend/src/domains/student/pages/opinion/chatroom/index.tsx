import * as S from '@/domains/student/pages/chat-page/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState } from 'react';
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

const OpinionChatPage = () => {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [isExitDialogOpen, setExitDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await api.post('/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.urls;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return [];
    }
  };

  const handleImageUpload = async (files: FileList) => {
    const oversizedFiles = Array.from(files).filter((file) => file.size > 10 * 1024 * 1024);

    if (oversizedFiles.length > 0) {
      setShowDialog(true);
      return;
    }

    const uploadedUrls = await uploadImages(Array.from(files));
    setImages((prev) => {
      const combined = [...prev, ...uploadedUrls];
      return combined.slice(0, 5);
    });
  };

  const handleSendMessage = async () => {
    // const messageData = {
    //   content: message,
    //   images: images,
    // };

    try {
      //소켓으로 메세지 전송
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/opinions/${roomId}`);
        const formattedData = formatChatData(response.data);
        setChatData(formattedData);
      } catch (error) {
        console.error('채팅 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [roomId]);

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
      {showDialog && (
        <Dialog
          body="10MB 이하의 이미지만 업로드할 수 있습니다."
          onConfirm={() => setShowDialog(false)}
          onDismiss={() => setShowDialog(false)}
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
