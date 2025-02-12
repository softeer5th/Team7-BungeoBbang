import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatRoomListCardData } from '../data/ChatRoomListCardData';

export interface ServerData {
  agenda: {
    agendaId: number;
    categoryType: string;
    title: string;
    startDate: string;
    endDate: string;
    count: number;
  };
  isParticipate: boolean;
}

export const mapResponseToChatListCardData = (
  response: ServerData,
  status: string,
): ChatRoomListCardData => {
  return {
    roomId: response.agenda.agendaId,
    dday: formatDate(response.agenda.endDate),
    startDate: response.agenda.startDate,
    endDate: response.agenda.endDate,
    categoryType: findChatCategoryType(response.agenda.categoryType),
    title: response.agenda.title,
    numOfJoin: response.agenda.count,
    isInProgress: status == 'ACTIVE',
    isParticipate: response.isParticipate,
  };
};

const findChatCategoryType = (categoryType: string): ChatCategoryType => {
  return (
    Object.values(ChatCategoryType).find((type) => type.type === categoryType) ??
    ChatCategoryType.ACADEMICS
  );
};

const formatDate = (date: string): string => {
  const today = new Date();
  const end = new Date(date);

  const diff = end.getTime() - today.getTime();
  const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return dDay === 0 ? 'D-Day' : dDay > 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`;
};
