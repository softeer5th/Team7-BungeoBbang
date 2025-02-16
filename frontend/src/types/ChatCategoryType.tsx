import schoolIcon from '@/assets/icons/school.svg?react';
import chairIcon from '@/assets/icons/chair.svg?react';
import moneyIcon from '@/assets/icons/money.svg?react';
import runnerIcon from '@/assets/icons/runner.svg?react';
import partyIcon from '@/assets/icons/party.svg?react';
import laptopIcon from '@/assets/icons/laptop.svg?react';
import trafficLightIcon from '@/assets/icons/traffic_light.svg?react';
import bubbleIcon from '@/assets/icons/bubble.svg?react';

export const ChatCategoryType = {
  ACADEMICS: {
    label: '학사',
    iconSrc: schoolIcon,
    iconBackground: '#DFFFE1',
    type: 'ACADEMICS',
  },
  FACILITIES: {
    label: '시설・환경',
    iconSrc: chairIcon,
    iconBackground: '#FFE8D2',
    type: 'FACILITIES',
  },
  BUDGET: {
    label: '예산',
    iconSrc: moneyIcon,
    iconBackground: '#FFEDC0',
    type: 'BUDGET',
  },
  CLUBS: {
    label: '동아리',
    iconSrc: runnerIcon,
    iconBackground: '#E8F3FF',
    type: 'CLUBS',
  },
  EVENTS: {
    label: '행사',
    iconSrc: partyIcon,
    iconBackground: '#EEE8FF',
    type: 'EVENTS',
  },
  IT: {
    label: '정보・통신',
    iconSrc: laptopIcon,
    iconBackground: '#FFE0F7',
    type: 'IT',
  },
  TRANSPORTATION: {
    label: '교통',
    iconSrc: trafficLightIcon,
    iconBackground: '#E0E0E0',
    type: 'TRANSPORTATION',
  },
  OTHER: {
    label: '기타',
    iconSrc: bubbleIcon,
    iconBackground: '#FFDBD8',
    type: 'OTHER',
  },
} as const;

export type ChatCategoryType = (typeof ChatCategoryType)[keyof typeof ChatCategoryType];
