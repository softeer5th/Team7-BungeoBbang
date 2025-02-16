import { ChatOpinionType } from '@/types/ChatOpinionType';

export const findChatOpinionType = (opinionType: string): ChatOpinionType => {
  return (
    Object.values(ChatOpinionType).find((type) => type.type === opinionType) ??
    ChatOpinionType.IMPROVEMENT
  );
};

export const findChatOpinionTypeByLabel = (label: string): ChatOpinionType => {
  return (
    Object.values(ChatOpinionType).find((type) => type.label === label) ??
    ChatOpinionType.IMPROVEMENT
  );
};
