import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatOpinionType } from '@/types/ChatOpinionType';

export interface Opinion {
  id: string;
  category: ChatCategoryType;
  title: string;
  text: string;
  time: string;
  iconColor: string;
  hasAlarm: boolean;
  isReminded: boolean;
  createdAt: Date;
  lastChatId: string;
}

export interface OpinionResponse {
  opinion: {
    id: number;
    categoryType: keyof typeof ChatCategoryType;
    opinionType: keyof typeof ChatOpinionType;
    isReminded: boolean;
  };
  lastChat: {
    content: string;
    createdAt: string;
  };
  lastReadChatId: string;
  hasNewChat: boolean;
}
