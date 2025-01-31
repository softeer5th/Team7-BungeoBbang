import styled from 'styled-components';
import { ChipListItem, ChipListItemProps } from './ChipListItem';
import { useState } from 'react';
import { BorderProps } from '../BorderProps';

interface ChipListProps {
  backgroundColor?: string;
  itemBackgroundColor?: string;
  itemSelectedBackgroundColor?: string;
  itemTextColor?: string;
  itemSelectedTextColor?: string;
  itemBorder?: BorderProps;
  onChipClick: (chipId: string) => void;
  items: (ChipListItemProps & { itemId: string })[]; // 🔥 `itemId` 추가
}

export const ChipList: React.FC<ChipListProps> = ({
  backgroundColor = '#FFFFFF',
  itemBackgroundColor = '#F5F5F5',
  itemSelectedBackgroundColor = '#E8F3FF',
  itemTextColor = '#A8A8A8',
  itemSelectedTextColor = '#1F87FF',
  itemBorder,
  onChipClick = () => {},
  items,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <ChipListContainer backgroundColor={backgroundColor}>
      {items.map((item) => (
        <ChipListItem
          key={item.itemId}
          itemId={item.itemId}
          text={item.text}
          backgroundColor={itemBackgroundColor}
          selectedBackgroundColor={itemSelectedBackgroundColor}
          textColor={itemTextColor}
          selectedTextColor={itemSelectedTextColor}
          border={itemBorder}
          onChipClick={() => {
            setSelectedItem(item.itemId);
            onChipClick(item.itemId);
          }}
          selected={item.itemId === selectedItem}
        />
      ))}
    </ChipListContainer>
  );
};

const ChipListContainer = styled.div<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  padding: 0px 43px 0px 43px;
  overflow: scroll;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
