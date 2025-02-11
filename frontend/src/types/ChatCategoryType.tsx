export const ChatCategoryType = {
  ACADEMICS: {
    label: '학사',
    iconSrc: '/src/assets/icons/school.svg',
    iconBackground: '#DFFFE1',
    type: 'ACADEMICS',
  },
  FACILITIES: {
    label: '시설・환경',
    iconSrc: '/src/assets/icons/chair.svg',
    iconBackground: '#FFE8D2',
    type: 'FACILITIES',
  },
  BUDGET: {
    label: '예산',
    iconSrc: '/src/assets/icons/money.svg',
    iconBackground: '#FFEDC0',
    type: 'BUDGET',
  },
  CLUBS: {
    label: '동아리',
    iconSrc: '/src/assets/icons/runner.svg',
    iconBackground: '#E8F3FF',
    type: 'CLUBS',
  },
  EVENTS: {
    label: '행사',
    iconSrc: '/src/assets/icons/party.svg',
    iconBackground: '#EEE8FF',
    type: 'EVENTS',
  },
  IT: {
    label: '정보・통신',
    iconSrc: '/src/assets/icons/laptop.svg',
    iconBackground: '#FFE0F7',
    type: 'IT',
  },
  TRANSPORTATION: {
    label: '교통',
    iconSrc: '/src/assets/icons/traffic_light.svg',
    iconBackground: '#E0E0E0',
    type: 'TRANSPORTATION',
  },
  OTHER: {
    label: '기타',
    iconSrc: '/src/assets/icons/bubble.svg',
    iconBackground: '#FFDBD8',
    type: 'OTHER',
  },
} as const;

export type ChatCategoryType = (typeof ChatCategoryType)[keyof typeof ChatCategoryType];
