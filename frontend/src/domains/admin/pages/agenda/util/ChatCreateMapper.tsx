import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatCreateData } from '../create';

const findCategory = (type: string) => {
  return Object.values(ChatCategoryType).find((category) => category.type === type) ?? null;
};

export const mapToChatCreateData = (data: any): ChatCreateData => ({
  roomId: data.agendaId ?? null,
  title: data.title ?? '',
  category: findCategory(data.categoryType),
  startDate: data.startDate ? new Date(data.startDate) : null,
  endDate: data.endDate ? new Date(data.endDate) : null,
  description: data.content ?? '',
  images: data.images ?? [],
});
