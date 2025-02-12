import { BottomNavigationItemProps } from '@/components/bottom-navigation/BottomNavigationItem';

export const bottomItems: BottomNavigationItemProps[] = [
  {
    itemId: 'agenda',
    iconSrc: '/src/assets/icons/message.svg',
    title: '답해요',
  },
  {
    itemId: 'opinion',
    iconSrc: '/src/assets/icons/home.svg',
    title: '말해요',
  },
  {
    itemId: 'my',
    iconSrc: '/src/assets/icons/profile.svg',
    title: '내 질문',
  },
];

export const moveToDestination = (itemId: string): string => {
  switch (itemId) {
    case 'agenda':
      return '/agenda';
    case 'opinion':
      return '/opinion/entry';
    case 'my':
      return '/my';
    default:
      return '/';
  }
};
