import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatPreviewData } from '../data/ChatPreviewData';
import { findChatOpinionType } from '@/utils/findChatOpinionType';

export interface AgendaServerData {
  agenda: {
    id: number;
    title: string;
    categoryType: string;
    count: number;
    isEnd: boolean;
  };
  lastChat: {
    content: string;
    createdAt: string;
  };
  hasNewChat: boolean;
}

export interface OpinionServerData {
  opinion: {
    id: number;
    opinionType: string;
    categoryType: string;
  };
  lastChat: {
    content: string;
    createdAt: string; // ISO date string
  };
  hasNewChat: boolean;
}

export const mapOpinionResponseToChatPreviewData = (
  response: OpinionServerData,
): ChatPreviewData => {
  return {
    roomId: response.opinion.id,
    roomName: findChatOpinionType(response.opinion.opinionType).label,
    opinionType: findChatOpinionType(response.opinion.opinionType),
    categoryType: findChatCategoryType(response.opinion.categoryType),
    lastSendTime: response.lastChat.createdAt,
    lastMessage: response.lastChat.content,
    hasNewChat: response.hasNewChat,
  };
};

export const mapAgendaResponseToChatPreviewData = (response: AgendaServerData): ChatPreviewData => {
  return {
    roomId: response.agenda.id,
    roomName: response.agenda.title,
    categoryType: findChatCategoryType(response.agenda.categoryType),
    lastSendTime: response.lastChat.createdAt,
    lastMessage: response.lastChat.content,
    numOfJoin: response.agenda.count,
    isInProgress: response.agenda.isEnd,
    hasNewChat: response.hasNewChat,
  };
};

const findChatCategoryType = (categoryType: string): ChatCategoryType => {
  return (
    Object.values(ChatCategoryType).find((type) => type.type === categoryType) ??
    ChatCategoryType.ACADEMICS
  );
};

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  return `${month} ${day}`;
};
