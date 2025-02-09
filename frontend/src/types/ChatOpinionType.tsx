export const ChatOpinionType = {
  IMPROVEMENT: '개선되면 좋겠어요',
  NEED: '필요해요',
  SUGGESTION: '제안해요',
  INQUIRY: '궁금해요',
} as const;

export type ChatOpinionType = (typeof ChatOpinionType)[keyof typeof ChatOpinionType];
