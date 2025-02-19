import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BorderType } from '@/components/border/BorderProps';
import { ChipList } from '@/components/Chip/ChipList';

const meta: Meta<typeof ChipList> = {
  title: 'Components/ChipList',
  component: ChipList,
  argTypes: {
    startItem: { control: 'text' }, // 기본 선택 아이템 설정 가능
    backgroundColor: { control: 'color' }, // 전체 배경색 변경 가능
    itemBackgroundColor: { control: 'color' }, // Chip 배경색 변경 가능
    itemSelectedBackgroundColor: { control: 'color' }, // 선택된 Chip 배경색 변경 가능
    itemTextColor: { control: 'color' }, // 기본 텍스트 색상 변경 가능
    itemSelectedTextColor: { control: 'color' }, // 선택된 텍스트 색상 변경 가능
    sidePadding: { control: 'text' }, // 좌우 패딩 조정 가능
    itemBorder: { control: 'object' }, // 테두리 스타일 변경 가능
  },
};

export default meta;
type Story = StoryObj<typeof ChipList>;

// ✅ 기본 ChipList (사용자가 선택 가능)
export const Default: Story = {
  args: {
    startItem: 'chip1',
    backgroundColor: '#FFFFFF',
    itemBackgroundColor: '#F4F4F4',
    itemSelectedBackgroundColor: '#E8F3FF',
    itemTextColor: '#A8A8A8',
    itemSelectedTextColor: '#1F87FF',
    sidePadding: '16px',
    items: [
      { itemId: 'chip1', text: 'Option 1' },
      { itemId: 'chip2', text: 'Option 2' },
      { itemId: 'chip3', text: 'Option 3' },
    ],
  },
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState(args.startItem || '');

    const handleChipClick = (chipId: string) => {
      setSelectedItem(chipId);
      args.onChipClick(chipId); // ✅ Storybook UI에서 클릭 이벤트 확인 가능
    };

    return (
      <ChipList
        {...args}
        startItem={selectedItem}
        onChipClick={handleChipClick} // ✅ 클릭 이벤트 반영
      />
    );
  },
};

export const WithBorder: Story = {
  args: {
    startItem: 'chip1',
    backgroundColor: '#FFFFFF',
    itemBackgroundColor: '#F4F4F4',
    itemSelectedBackgroundColor: '#E8F3FF',
    itemTextColor: '#A8A8A8',
    itemSelectedTextColor: '#1F87FF',
    sidePadding: '16px',
    items: [
      { itemId: 'chip1', text: 'Option 1' },
      { itemId: 'chip2', text: 'Option 2' },
      { itemId: 'chip3', text: 'Option 3' },
    ],
    itemBorder: {
      borderWidth: '5px',
      borderColor: 'red',
      selectedBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL,
    },
  },
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState(args.startItem || '');

    const handleChipClick = (chipId: string) => {
      setSelectedItem(chipId);
      args.onChipClick(chipId); // ✅ Storybook UI에서 클릭 이벤트 확인 가능
    };

    return (
      <ChipList
        {...args}
        startItem={selectedItem}
        onChipClick={handleChipClick} // ✅ 클릭 이벤트 반영
      />
    );
  },
};
