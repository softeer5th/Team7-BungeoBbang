import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatRoomListCardData, ProgressState } from '../components/ChatRoomCardData';

export interface ServerData {
  agenda: {
    agendaId: number;
    categoryType: string;
    title: string;
    startDate: string;
    endDate: string;
    count: number;
  };
  hasNewMessage: boolean;
  lastReadChatId: string;
}

export const mapResponseToChatRoomListCardData = (response: ServerData): ChatRoomListCardData => {
  return {
    roomId: response.agenda.agendaId,
    hasNew: response.hasNewMessage,
    lastReadChatId: response.lastReadChatId,
    progressState: getProgressState(response.agenda.startDate, response.agenda.endDate),
    numOfJoin: response.agenda.count,
    chatCategoryType: findChatCategoryType(response.agenda.categoryType),
    title: response.agenda.title,
    startDate: formatServerDate(response.agenda.startDate),
    endDate: formatServerDate(response.agenda.endDate),
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

export const formatDate = (date: string): string => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};

const formatServerDate = (date: string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatServerDataFromDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
