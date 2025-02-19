import { BorderType } from '@/components/border/BorderProps';
import { Button } from '@/components/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    border: { control: 'object' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ✅ 기본 버튼 (Primary)
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    disabled: false,
  },
};

// ✅ Secondary 버튼
export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    backgroundColor: '#FF4B4B',
    textColor: '#FFFFFF',
    disabled: false,
  },
};

// ✅ Disabled 버튼
export const Dismiss: Story = {
  args: {
    text: 'Dismiss Button',
    backgroundColor: '#F4F4F4',
    textColor: '#A8A8A8',
    disabled: false,
  },
};

// ✅ Disabled 버튼
export const WithBorder: Story = {
  args: {
    text: 'Primary Button',
    backgroundColor: '#1F87FF',
    textColor: '#FFFFFF',
    disabled: false,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL,
    },
  },
};
