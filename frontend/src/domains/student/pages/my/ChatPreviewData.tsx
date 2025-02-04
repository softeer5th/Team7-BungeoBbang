export interface ChatPreviewData {
  roomId: string;
  roomName?: string;
  opinionType?: ChatOpinionType;
  categoryType: ChatCategoryType;
  lastSendTime: string;
  lastMessage: string;
  numOfJoin?: number;
  isInProgress?: boolean;
  isUnread: boolean;
}

export const ChatOpinionType = {
  IMPROVEMENT: '개선되면 좋겠어요',
  NEED: '필요해요',
  SUGGESTION: '제안해요',
  INQUIRY: '궁금해요',
} as const;

export const ChatCategoryType = {
  ACADEMICS: {
    label: '학사',
    iconSrc: '/assets/icons/school.svg',
    iconBackground: '#D9FFD9',
  },
  FACILITIES: {
    label: '시설・환경',
    iconSrc: '/assets/icons/chair.svg',
    iconBackground: '#FFD9B3',
  },
  BUDGET: {
    label: '예산',
    iconSrc: '/assets/icons/money.svg',
    iconBackground: '#FFEFB3',
  },
  CLUBS: {
    label: '동아리',
    iconSrc: '/assets/icons/runner.svg',
    iconBackground: '#E8F3FF',
  },
  EVENTS: {
    label: '행사',
    iconSrc: '/assets/icons/party.svg',
    iconBackground: '#E3D0FF',
  },
  IT: {
    label: '정보・통신',
    iconSrc: '/assets/icons/laptop.svg',
    iconBackground: '#FFD9E0',
  },
  TRANSPORTATION: {
    label: '교통',
    iconSrc: '/assets/icons/traffic_light.svg',
    iconBackground: '#D9D9D9',
  },
  OTHER: {
    label: '기타',
    iconSrc: '/assets/icons/bubble.svg',
    iconBackground: '#FFB3B3',
  },
} as const;

export type ChatOpinionType = (typeof ChatOpinionType)[keyof typeof ChatOpinionType];
export type ChatCategoryType = (typeof ChatCategoryType)[keyof typeof ChatCategoryType];
