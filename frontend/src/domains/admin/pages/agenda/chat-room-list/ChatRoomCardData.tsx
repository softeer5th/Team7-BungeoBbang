import { ChatCategoryType } from '@/types/ChatCategoryType';

export interface ChatRoomListCardData {
  roomId: string;
  hasNew: boolean;
  isInProgress: boolean;
  numOfJoin?: number;
  chatCategoryType: ChatCategoryType;
  title: string;
  startDate: string;
  endDate: string;
}
