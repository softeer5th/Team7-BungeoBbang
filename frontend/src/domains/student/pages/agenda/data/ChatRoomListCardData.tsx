import { ChatCategoryType } from '@/types/ChatCategoryType';

export interface ChatRoomListCardData {
  roomId: number;
  dday: string;
  startDate: string;
  endDate: string;
  categoryType: ChatCategoryType;
  title: string;
  numOfJoin: number;
  isInProgress: boolean;
  isParticipate: boolean;
  lastChatId: string;
}
