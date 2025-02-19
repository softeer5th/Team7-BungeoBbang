import type { Meta, StoryObj } from '@storybook/react';
import { SenderChat } from '@/components/Chat/SenderChat';

const sendMeta: Meta<typeof SenderChat> = {
  title: 'Components/Chat',
  component: SenderChat,
  argTypes: {
    backgroundColor: { control: 'color' }, // 전체 배경색 변경 가능
    textColor: { control: 'color' }, // Chip 배경색 변경 가능
    timeTextColor: { control: 'color' }, // 선택된 Chip 배경색 변경 가능
  },
  args: {
    chatId: '',
  },
};

export default sendMeta;
type SendStory = StoryObj<typeof SenderChat>;

export const SenderDefault: SendStory = {
  args: {
    message:
      '안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.',
    timeText: '오후 01:20',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    timeTextColor: '#C6C6C6',
  },
};

export const SenderWithImage: SendStory = {
  args: {
    message:
      '안녕하세요. 최근 학교에서 흡연실을 옮겼는데, 해당 위치가 학생들이 다니는 길이라 냄새가 심합니다. 위치 변경해주세요.',

    images: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
    ],
    timeText: '오후 01:20',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    timeTextColor: '#C6C6C6',
  },
};
