import type { Meta, StoryObj } from '@storybook/react';
// import { CategoryIcon } from './CategoryIcon';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import { CategoryIcon } from '@/components/CategoryIcon';

const meta: Meta<typeof CategoryIcon> = {
  title: 'Components/CategoryIcon',
  component: CategoryIcon,
  argTypes: {
    boxSize: { control: 'number' },
    iconWidth: { control: 'number' },
    textVariant: { control: 'text' },
    showText: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryIcon>;

// ✅ 더미 데이터: 카테고리 유형 정의
const categorySample: ChatCategoryType = {
  label: '시설・환경',
  iconSrc: '/assets/icons/chair.svg',
  iconBackground: '#FFE8D2',
  type: 'FACILITIES',
};

// ✅ 기본 아이콘
export const Default: Story = {
  args: {
    boxSize: 48,
    iconWidth: 24,
    type: categorySample,
    showText: true,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    boxSize: 48,
    iconWidth: 24,
    type: categorySample,
    showText: false,
    selected: true,
  },
};

export const WithText: Story = {
  args: {
    boxSize: 70,
    iconWidth: 24,
    type: categorySample,
    showText: true,
    textVariant: 'caption2',
    selected: false,
  },
};
