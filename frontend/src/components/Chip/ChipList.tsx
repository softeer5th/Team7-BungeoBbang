import styled from 'styled-components';
import { ChipListItem, ChipListItemProps } from './ChipListItem';
import { useState } from 'react';
import { BorderProps } from '../border/BorderProps';

interface ChipListProps {
  /**
   * 초기 선택된 아이템의 ID
   * @default undefined
   */
  startItem?: string;

  /**
   * 전체 ChipList의 배경색
   * @example "#FFFFFF"
   */
  backgroundColor?: string;

  /**
   * 개별 Chip 아이템의 기본 배경색
   * @example "#F4F4F4"
   */
  itemBackgroundColor?: string;

  /**
   * 선택된 Chip 아이템의 배경색
   * @example "#1F87FF"
   */
  itemSelectedBackgroundColor?: string;

  /**
   * Chip 아이템의 기본 텍스트 색상
   * @example "#262626"
   */
  itemTextColor?: string;

  /**
   * 선택된 Chip 아이템의 텍스트 색상
   * @example "#FFFFFF"
   */
  itemSelectedTextColor?: string;

  /**
   * Chip 아이템의 테두리 스타일 (BorderProps 사용)
   */
  itemBorder?: BorderProps;

  /**
   * Chip 아이템 클릭 시 호출되는 콜백 함수
   * @param chipId 클릭된 Chip의 ID
   */
  onChipClick: (chipId: string) => void;

  /**
   * Chip 리스트에 표시할 아이템 목록
   */
  items: (ChipListItemProps & { itemId: string })[];

  /**
   * Chip 리스트의 좌우 패딩
   * @example "16px"
   */
  sidePadding?: string;
}

export const ChipList: React.FC<ChipListProps> = ({
  startItem,
  backgroundColor = '#FFFFFF',
  itemBackgroundColor = '#F4F4F4',
  itemSelectedBackgroundColor = '#E8F3FF',
  itemTextColor = '#A8A8A8',
  itemSelectedTextColor = '#1F87FF',
  itemBorder,
  onChipClick = () => {},
  items,
  sidePadding = '0px',
}) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(startItem);

  return (
    <ChipListContainer backgroundColor={backgroundColor} sidePadding={sidePadding}>
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
  sidePadding: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  padding: 0px ${(props) => props.sidePadding} 0px ${(props) => props.sidePadding};
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
