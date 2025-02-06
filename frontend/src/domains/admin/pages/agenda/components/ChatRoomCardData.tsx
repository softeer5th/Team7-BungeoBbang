import { ChatCategoryType } from '@/types/ChatCategoryType';

export interface ChatRoomListCardData {
  roomId: string;
  hasNew: boolean;
  progressState: ProgressState;
  numOfJoin?: number;
  chatCategoryType: ChatCategoryType;
  title: string;
  startDate: string;
  endDate: string;
}

export enum ProgressState {
  BEFORE = -1,
  IN_PROGRESS = 0,
  FINISHED = 1,
}
