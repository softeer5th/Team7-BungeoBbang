import type { Meta, StoryObj } from '@storybook/react';
import { ButtonProps } from '@/components/Button';
import { DialogContainer } from '@/components/Dialog/DialogContainer';
import { BorderType } from '@/components/border/BorderProps';

const meta: Meta<typeof DialogContainer> = {
  title: 'Components/Dialog',
  component: DialogContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
    titleBackgroundColor: { control: 'color' },
    titleTextColor: { control: 'color' },
    bodyTextColor: { control: 'color' },
    border: { control: 'object' },
  },
  args: {
    onConfirm: () => {},
    onDismiss: () => {},
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DialogContainer>;

const confirmButton: ButtonProps = {
  text: 'Confirm',
};

const dismissButton: ButtonProps = {
  text: 'Cancel',
  backgroundColor: '#F4F4F4',
  textColor: '#A8A8A8',
};

export const Default: Story = {
  args: {
    title: 'Title',
    body: 'body Text',
    backgroundColor: '#FFFFFF',
    titleBackgroundColor: '#F4F4F4',
    titleTextColor: '#393939',
    bodyTextColor: '#525252',
    confirmButton: confirmButton,
    dissmissButton: dismissButton,
  },
};

export const NoTitle: Story = {
  args: {
    body: 'body Text',
    backgroundColor: '#FFFFFF',
    titleBackgroundColor: '#F4F4F4',
    titleTextColor: '#393939',
    bodyTextColor: '#525252',
    confirmButton: confirmButton,
  },
};

export const WarningDialog: Story = {
  args: {
    title: '학교 리모델링과 관련한 학생 의견 모집',
    body: `채팅방을 종료하시나요?
    종료된 채팅방은 종료 페이지로 이동되며,
  다시 개설이 되지 않습니다.`,
    backgroundColor: '#FFFFFF',
    titleBackgroundColor: '#F4F4F4',
    titleTextColor: '#393939',
    bodyTextColor: '#525252',
    confirmButton: {
      text: '종료',
      backgroundColor: '#FF4B4B',
      textColor: '#FFFFFF',
    },
    dissmissButton: {
      text: '취소',
      backgroundColor: '#F4F4F4',
      textColor: '#A8A8A8',
    },
  },
};

export const HTMLBodyDialog: Story = {
  args: {
    body: `채팅방에 입장하시겠어요?<br/>
        입장한 채팅방의 알림은<br/>
        <span style="color: #1F87FF; font-weight: 700;">[내 의견]</span>에서 확인할 수 있습니다.`,
    confirmButton: {
      text: '입장하기',
    },
    dissmissButton: {
      text: '취소',
      backgroundColor: '#F4F4F4',
      textColor: '#A8A8A8',
    },
  },
};

export const WithBorder: Story = {
  args: {
    title: 'Title',
    body: 'body',
    confirmButton: confirmButton,
    dissmissButton: dismissButton,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL,
    },
  },
};
