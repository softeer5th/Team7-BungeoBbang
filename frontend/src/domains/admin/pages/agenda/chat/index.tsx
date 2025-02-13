import { useEffect, useState } from 'react';
import ChatPage from '../../chat-page';
import { useParams } from 'react-router-dom';
import { formatChatData } from '@/utils/chat/formatChatData.ts';
import api from '@/utils/api.ts';
import { ChatData } from '../../chat-page/ChatData';

const AgendaChatPage = () => {
  const roomId = useParams();

  const [chatData, setChatData] = useState<ChatData[]>([]);

  const getChatData = async () => {
    try {
      const response = await api.get(`/admin/agendas/${roomId}/chat`);
      const formattedData = formatChatData(response.data, true);
      setChatData(formattedData);
    } catch (error) {
      console.error('fail to get chat data', error);
    }
  };

  useEffect(() => {
    getChatData();
  }, []);
  return <ChatPage chatData={chatData} />;
};

export default AgendaChatPage;
