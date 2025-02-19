import { BorderType } from '@/components/border/BorderProps';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
// import { BottomNavigationItem } from '@/components/bottom-navigation/BottomNavigationItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation', // Storybook에서 "Components" 폴더 안에 표시됨
  component: BottomNavigation,
  argTypes: {
    startDestination: {
      control: 'radio',
      options: ['message', 'home', 'my'], // 선택 가능한 옵션
    },

    backgroundColor: { control: 'color' }, // 배경색 변경 가능
    foregroundColor: { control: 'color' }, // 아이콘 기본 색상 변경 가능
    selectedForegroundColor: { control: 'color' }, // 선택된 아이콘 색상 변경 가능
    alarmColor: { control: 'color' }, // 알람 색상 변경 가능
    setAlarm: { control: 'boolean' }, // 알람 표시 여부 토글
    onItemClick: { action: 'clicked' }, // 클릭 이벤트 감지
    border: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {
    startDestination: 'home',
    destinations: [
      { itemId: 'message', title: '답해요', iconSrc: '/src/assets/icons/message.svg' },
      { itemId: 'home', title: '말해요', iconSrc: '/src/assets/icons/home.svg' },
      { itemId: 'my', title: '내 질문', iconSrc: '/src/assets/icons/profile.svg' },
    ],
    backgroundColor: '#FFFFFF',
    foregroundColor: '#A8A8A8',
    selectedForegroundColor: '#1F87FF',
    alarmColor: '#FF0000',
    setAlarm: false,
  },
};

export const WithBorder: Story = {
  args: {
    startDestination: 'home',
    destinations: [
      { itemId: 'message', title: '답해요', iconSrc: '/src/assets/icons/message.svg' },
      { itemId: 'home', title: '말해요', iconSrc: '/src/assets/icons/home.svg' },
      { itemId: 'my', title: '내 질문', iconSrc: '/src/assets/icons/profile.svg' },
    ],
    backgroundColor: '#FFFFFF',
    foregroundColor: '#A8A8A8',
    selectedForegroundColor: '#1F87FF',
    alarmColor: '#FF0000',
    border: {
      borderWidth: '2px',
      borderColor: 'red',
      selectedBorderColor: 'blue',
      borderType: BorderType.BOTTOM,
      borderRadius: '40px',
    },
    setAlarm: false,
  },
};
