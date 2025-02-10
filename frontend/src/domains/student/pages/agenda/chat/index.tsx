import { useParams, useSearchParams } from 'react-router-dom';
import ChatPage from '../../chat-page';

const AgendaChatPage = () => {
  const { roomId } = useParams();

  const [searchParams] = useSearchParams();

  const isEnd = searchParams.get('isEnd') === 'true'; // 쿼리 파라미터
  const isParticipate = searchParams.get('isParticipate') === 'true';

  return <ChatPage roomId={roomId} isEnd={isEnd} isParticipate={isParticipate} />;
};

export default AgendaChatPage;
