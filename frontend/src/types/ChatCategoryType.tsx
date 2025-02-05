export const ChatCategoryType = {
  ACADEMICS: {
    label: '학사',
    iconSrc: '/src/assets/icons/school.svg',
    iconBackground: '#D9FFD9',
  },
  FACILITIES: {
    label: '시설・환경',
    iconSrc: '/src/assets/icons/chair.svg',
    iconBackground: '#FFD9B3',
  },
  BUDGET: {
    label: '예산',
    iconSrc: '/src/assets/icons/money.svg',
    iconBackground: '#FFEFB3',
  },
  CLUBS: {
    label: '동아리',
    iconSrc: '/src/assets/icons/runner.svg',
    iconBackground: '#E8F3FF',
  },
  EVENTS: {
    label: '행사',
    iconSrc: '/src/assets/icons/party.svg',
    iconBackground: '#E3D0FF',
  },
  IT: {
    label: '정보・통신',
    iconSrc: '/src/assets/icons/laptop.svg',
    iconBackground: '#FFD9E0',
  },
  TRANSPORTATION: {
    label: '교통',
    iconSrc: '/src/assets/icons/traffic_light.svg',
    iconBackground: '#D9D9D9',
  },
  OTHER: {
    label: '기타',
    iconSrc: '/src/assets/icons/bubble.svg',
    iconBackground: '#FFB3B3',
  },
} as const;

export type ChatCategoryType = (typeof ChatCategoryType)[keyof typeof ChatCategoryType];
