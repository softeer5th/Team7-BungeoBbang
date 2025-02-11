import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatOpinionType } from '@/types/ChatOpinionType';

export interface Opinion {
  id: string;
  category: {
    label: string;
    type: string;
    iconSrc: string;
    iconBackground: string;
  };
  title: string;
  text: string;
  time: string;
  iconColor: string;
  hasAlarm: boolean;
}

export interface OpinionResponse {
  opinion: {
    id: number;
    categoryType: keyof typeof ChatCategoryType;
    opinionType: keyof typeof ChatOpinionType;
  };
  lastChat: {
    content: string;
    createdAt: string;
  };
  hasNewChat: boolean;
}
