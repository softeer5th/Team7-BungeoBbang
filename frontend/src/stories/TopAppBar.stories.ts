import { BorderType } from '@/components/border/BorderProps';
import { TopAppBar } from '@/components/TopAppBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TopAppBar> = {
  title: 'Components/TopAppBar',
  component: TopAppBar,
  argTypes: {
    backgroundColor: { control: 'color' },
    foregroundColor: { control: 'color' },
    titleColor: { control: 'color' },
    border: { control: 'object' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const Primary: Story = {
  args: {
    leftIconSrc: '/src/assets/icons/arrow-left.svg',
    rightIconSrc: '/src/assets/icons/logout.svg',
    title: 'Title',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#262626',
  },
};

export const TitleColor: Story = {
  args: {
    leftIconSrc: '/src/assets/icons/logo.svg',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#262626',
    titleColor: '#1F87FF',
  },
};

// ✅ 앱 바 텍스트가 길 경우
export const TitleOverflow: Story = {
  args: {
    title:
      'Title is Very Very Very Very Very Very  Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Long',
    rightIconSrc: '/src/assets/icons/logout.svg',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#262626',
  },
};

// ✅ 테두리 존재
export const WithBorder: Story = {
  args: {
    title: 'With Border',
    backgroundColor: '#1F87FF',
    foregroundColor: '#FFFFFF',
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      borderRadius: '0px',
      borderType: BorderType.BOTTOM,
    },
  },
};
