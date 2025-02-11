import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatRoomListCardData } from '../data/ChatRoomListCardData';

export const mapResponseToChatListCardData = (
  response: any,
  status: string,
): ChatRoomListCardData => {
  return {
    roomId: response.agenda.agendaId,
    dday: formatDate(response.agenda.endDate),
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

  // 날짜 차이 (밀리초)
  const diff = end.getTime() - today.getTime();

  // 밀리초를 일 단위로 변환
  const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return dDay === 0 ? 'D-Day' : dDay > 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`;
};
