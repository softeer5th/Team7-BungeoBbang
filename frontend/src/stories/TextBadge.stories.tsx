import type { Meta, StoryObj } from '@storybook/react';
import { TextBadge } from '@/components/Chat/TextBadge';

const meta: Meta<typeof TextBadge> = {
  title: 'Components/TextBadge',
  component: TextBadge,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextBadge>;

export const Default: Story = {
  args: {
    text: '2025.01.18 화요일',
  },
};

export const Remind: Story = {
  args: {
    text: '답변을 기다리고 있어요',
    backgroundColor: '#FF4B4B',
    textColor: '#FFFFFF',
  },
};
