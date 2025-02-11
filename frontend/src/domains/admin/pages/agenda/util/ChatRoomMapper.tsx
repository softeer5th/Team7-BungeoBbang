import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatRoomListCardData, ProgressState } from '../components/ChatRoomCardData';

export const mapResponseToChatRoomListCardData = (response: any): ChatRoomListCardData => {
  return {
    roomId: response.agenda.agendaId,
    hasNew: response.hasNewMessage,
    progressState: getProgressState(response.agenda.startDate, response.agenda.endDate),
    numOfJoin: response.agenda.count,
    chatCategoryType: findChatCategoryType(response.agenda.categoryType),
    title: response.agenda.title,
    startDate: formatDate(response.agenda.startDate),
    endDate: formatDate(response.agenda.endDate),
  };
};

const getProgressState = (startDate: string, endDate: string): ProgressState => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return ProgressState.BEFORE;
  if (now > end) return ProgressState.FINISHED;
  return ProgressState.IN_PROGRESS;
};

const findChatCategoryType = (categoryType: string): ChatCategoryType => {
  return (
    Object.values(ChatCategoryType).find((type) => type.type === categoryType) ??
    ChatCategoryType.ACADEMICS
  );
};

const formatDate = (date: string): string => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};
