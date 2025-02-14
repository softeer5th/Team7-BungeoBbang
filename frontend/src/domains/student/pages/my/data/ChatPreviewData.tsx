import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatOpinionType } from '@/types/ChatOpinionType';

export interface ChatPreviewData {
  roomId: number;
  roomName?: string;
  opinionType?: ChatOpinionType;
  categoryType: ChatCategoryType;
  lastSendTime: string;
  lastMessage: string;
  numOfJoin?: number;
  isInProgress?: boolean;
  hasNewChat: boolean;
  lastChatId: string;
}
