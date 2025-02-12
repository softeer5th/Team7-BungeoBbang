export const ChatOpinionType = {
  IMPROVEMENT: {
    label: '개선되면 좋겠어요',
    type: 'IMPROVEMENT',
  },
  NEED: {
    label: '필요해요',
    type: 'NEED',
  },
  SUGGESTION: {
    label: '제안해요',
    type: 'SUGGESTION',
  },
  INQUIRY: {
    label: '궁금해요',
    type: 'INQUIRY',
  },
} as const;

export type ChatOpinionType = (typeof ChatOpinionType)[keyof typeof ChatOpinionType];
