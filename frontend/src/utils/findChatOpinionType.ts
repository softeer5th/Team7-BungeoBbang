import { ChatOpinionType } from '@/types/ChatOpinionType';

export const findChatOpinionType = (opinionType: string): ChatOpinionType => {
  return (
    Object.values(ChatOpinionType).find((type) => type.type === opinionType) ??
    ChatOpinionType.IMPROVEMENT
  );
};
