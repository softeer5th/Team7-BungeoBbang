import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
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

interface ChatPageProps {
  chatData: ChatData[];
}

const ChatPage = ({ chatData }: ChatPageProps) => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc="/src/assets/icons/information-circle-contained.svg"
        onLeftIconClick={() => {
          navigate(-1);
        }}
        onRightIconClick={() => {}}
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

      <ChatSendField />
    </S.Container>
  );
};

export default ChatPage;
