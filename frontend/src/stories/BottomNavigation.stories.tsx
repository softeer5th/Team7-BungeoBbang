import { BorderType } from '@/components/border/BorderProps';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  argTypes: {
    startDestination: {
      control: 'radio',
      options: ['message', 'home', 'my'],
    },

    backgroundColor: { control: 'color' },
    foregroundColor: { control: 'color' },
    selectedForegroundColor: { control: 'color' },
    alarmColor: { control: 'color' },
    setAlarm: { control: 'boolean' },
    onItemClick: { action: 'clicked' },
    border: { control: 'object' },
  },
  tags: ['autodocs'],
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
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState(args.startDestination || '');

    const handleItemClick = (itemId: string) => {
      setSelectedItem(itemId);
    };

    return (
      <BottomNavigation {...args} startDestination={selectedItem} onItemClick={handleItemClick} />
    );
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
