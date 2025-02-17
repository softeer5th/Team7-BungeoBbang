import ChatPage from './chat-page';
import { useParams, useSearchParams } from 'react-router-dom';

const AgendaChatPage = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();

  const isEnd = searchParams.get('isEnd') === 'true';
  const lastReadChatId = searchParams.get('lastReadChatId');

  return (
    <ChatPage
      roomId={Number(roomId)}
      isEnd={isEnd}
      lastChatId={lastReadChatId ?? '000000000000000000000000'}
    />
  );
};

export default AgendaChatPage;
