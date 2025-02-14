import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import ChatPage from '../../chat-page';

const AgendaChatPage = () => {
  const { roomId } = useParams();

  const [searchParams] = useSearchParams();

  const isEnd = searchParams.get('isEnd') === 'true';
  const isParticipate = searchParams.get('isParticipate') === 'true';
  const lastChatId = useLocation().state?.lastChatId;

  return (
    <ChatPage
      roomId={Number(roomId)}
      isEnd={isEnd}
      isParticipate={isParticipate}
      lastChatId={lastChatId}
    />
  );
};

export default AgendaChatPage;
