import {
  ChatData,
  ChatType,
  ReceiveChatData,
  SendChatData,
} from '@/domains/student/pages/chat-page/ChatData';

interface ServerOpinionChatData {
  chatId: string;
  memberId: number;
  opinionId: number;
  chat: string;
  isAdmin: boolean;
  images: string[];
  createdAt: string;
}

interface ServerAgendaChatData {
  chatId: string;
  memberId: number;
  agendaId: number;
  chat: string;
  isAdmin: boolean;
  images: string[];
  createdAt: string;
}

export const formatChatData = (
  serverData: (ServerOpinionChatData | ServerAgendaChatData)[],
  fromAdminPage: boolean,
  adminName?: string,
): ChatData[] => {
  // 날짜순으로 정렬
  const sortedData = [...serverData].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  // 기본 채팅 데이터 포맷팅
  const formattedChats: ChatData[] = sortedData.map((item) => {
    const baseChat = {
      chatId: item.chatId,
      type: fromAdminPage
        ? item.isAdmin
          ? ChatType.SEND
          : ChatType.RECEIVE
        : !item.isAdmin
          ? ChatType.SEND
          : ChatType.RECEIVE,
      message: item.chat,
      time: new Date(item.createdAt).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      images: item.images || [],
    };

    if (item.isAdmin) {
      return {
        ...baseChat,
        name: adminName,
      } as ReceiveChatData;
    }

    return baseChat as SendChatData;
  });

  // 날짜 구분선 추가
  const chatsWithDateDividers: ChatData[] = [];
  let currentDate = '';

  formattedChats.forEach((chat) => {
    const chatMessage = (chat as ReceiveChatData | SendChatData).message;
    const originalChat = sortedData.find((item) => item.chat === chatMessage);

    if (!originalChat) return;

    const chatDate = new Date(originalChat.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    });

    if (currentDate !== chatDate) {
      chatsWithDateDividers.push({
        type: ChatType.INFO,
        message: chatDate,
      });
      currentDate = chatDate;
    }

    chatsWithDateDividers.push(chat);
  });

  return chatsWithDateDividers;
};
