import type { Meta, StoryObj } from '@storybook/react';
import { ReceiverChat } from '@/components/Chat/ReceiverChat';

const receiveMeta: Meta<typeof ReceiverChat> = {
  title: 'Components/Chat/Receive',
  component: ReceiverChat,
  argTypes: {
    backgroundColor: { control: 'color' }, // 전체 배경색 변경 가능
    textColor: { control: 'color' }, // Chip 배경색 변경 가능
    timeTextColor: { control: 'color' }, // 선택된 Chip 배경색 변경 가능
  },
  args: {
    chatId: '',
  },
  tags: ['autodocs'],
};

export default receiveMeta;
type ReceiveStory = StoryObj<typeof ReceiverChat>;

export const ReceiverDefault: ReceiveStory = {
  args: {
    receiverName: '00대학교 총학생회',
    message: `안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림`,
    timeText: '오후 01:20',
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6',
  },
};

export const ReceiverWithImage: ReceiveStory = {
  args: {
    receiverName: '00대학교 총학생회',
    message: `안녕하세요, 총학생회입니다.

소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.

감사합니다.
총학생회 드림`,
    timeText: '오후 01:20',
    images: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
    ],
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6',
  },
};

export const ReceiverWithIcon: ReceiveStory = {
  args: {
    receiverIconBackgroundColor: '#FFE0F7',
    receiverIconSrc: '/assets/imgs/face1.png',

    message: `안녕하세요, 총학생회입니다.
  
  소중한 의견을 보내주셔서 감사합니다. 말씀해 주신 흡연실 위치 문제와 관련하여, 학생들이 다니는 길에 불편을 끼치고 있다는 점을 심각하게 인지하고 있습니다.
  현재 해당 사항은 관련 부서와 협의 중에 있으며, 흡연실의 위치를 재조정을 논의하고 있습니다.
  빠른 시일 내에 해결 방안을 마련하여 공지드리겠습니다.
  
  감사합니다.
  총학생회 드림`,
    timeText: '오후 01:20',
    images: [
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
      'https://picsum.photos/300/200',
    ],
    backgroundColor: '#F4F4F4',
    textColor: '#393939',
    timeTextColor: '#C6C6C6',
  },
};
