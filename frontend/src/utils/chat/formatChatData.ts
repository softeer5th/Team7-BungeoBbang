// import React from 'react';
import {
  ChatData,
  ChatType,
  // InfoChatData,
  ReceiveChatData,
  SendChatData,
} from '@/domains/student/pages/agenda/chat/chat-page/ChatData';

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
      memberId: item.memberId,
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
      createdAt: item.createdAt,
    };

    if (item.isAdmin) {
      return {
        ...baseChat,
        name: adminName,
      } as ReceiveChatData;
    }

    return baseChat as SendChatData;
  });

  return formattedChats;
  // 날짜 구분선 추가
  // const chatsWithDateDividers: ChatData[] = [];
  // let currentDate = '';

  // formattedChats.forEach((chat) => {
  //   const chatMessage = (chat as ReceiveChatData | SendChatData).message;
  //   const originalChat = sortedData.find((item) => item.chat === chatMessage);

  //   if (!originalChat) return;

  //   const chatDate = new Date(originalChat.createdAt).toLocaleDateString('ko-KR', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     weekday: 'long',
  //   });

  //   if (currentDate !== chatDate) {
  //     chatsWithDateDividers.push({
  //       chatId: '',
  //       type: ChatType.INFO,
  //       message: chatDate,
  //     });
  //     currentDate = chatDate;
  //   }

  //   chatsWithDateDividers.push(chat);
  // });

  // return chatsWithDateDividers;
};

export const addDateDivider = (currentChatData: ChatData, previousChatData: ChatData | null) => {
  if (!currentChatData) return null;

  const currentChatDate = new Date(
    (currentChatData as ReceiveChatData | SendChatData).createdAt,
  ).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });

  if (!previousChatData) {
    return currentChatDate;
  }

  const previousChatDate = new Date(
    (previousChatData as ReceiveChatData | SendChatData).createdAt,
  ).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });

  if (currentChatDate !== previousChatDate) {
    return currentChatDate;
  }

  return null;
};
