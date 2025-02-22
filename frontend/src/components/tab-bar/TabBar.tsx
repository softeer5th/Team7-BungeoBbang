import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TabBarItem, TabBarItemProps } from './TabBarItem';

export interface TabBarProps {
  /**
   * 현재 선택된 탭의 ID
   * @example "home"
   */
  currentDestination: string;

  /**
   * 탭 항목 리스트
   */
  items: TabBarItemProps[];

  /**
   * 탭 바의 배경 색상 (선택 사항)
   * @default "#FFFFFF"
   * @example "#F4F4F4"
   */
  backgroundColor?: string;

  /**
   * 선택된 탭의 배경 색상 (선택 사항)
   * @default "#FFFFFF"
   * @example "#E0E0E0"
   */
  selectedItembackgroundColor?: string;

  /**
   * 탭 인디케이터 색상 (선택 사항)
   * @default "#1F87FF"
   * @example "#FF0000"
   */
  indicatorColor?: string;

  /**
   * 기본 탭 텍스트 색상 (선택 사항)
   * @default "#A8A8A8"
   * @example "#000000"
   */
  textColor?: string;

  /**
   * 선택된 탭의 텍스트 색상 (선택 사항)
   * @default "#1F87FF"
   * @example "#FFFFFF"
   */
  selectedTextColor?: string;

  /**
   * 탭 항목 클릭 시 호출되는 콜백 함수 (선택 사항)
   * @param itemId 클릭한 탭의 ID
   */
  onItemClick?: (itemId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  currentDestination,
  items,
  backgroundColor = '#FFFFFF',
  selectedItembackgroundColor = '#FFFFFF',
  indicatorColor = '#1F87FF',
  textColor = '#C6C6C6',
  selectedTextColor = '#1F87FF',
  onItemClick = () => {},
}) => {
  const [selectedItem, setSelectedItem] = useState(currentDestination || items[0]?.itemId);

  const selectedIndex = items.findIndex((item) => item.itemId === selectedItem);

  const [itemWidth, setItemWidth] = useState(0);
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentDestination) {
      setSelectedItem(currentDestination);
    }
  }, [currentDestination]);

  useEffect(() => {
    if (tabBarRef.current) {
      setItemWidth(tabBarRef.current.offsetWidth / items.length);
    }
  }, [items.length]);

  return (
    <TabBarContainer ref={tabBarRef}>
      {items.map((item) => (
        <TabBarItem
          key={item.itemId}
          itemId={item.itemId}
          title={item.title}
          backgroundColor={backgroundColor}
          selectedBackroundColor={selectedItembackgroundColor}
          textColor={textColor}
          selectedTextColor={selectedTextColor}
          selected={item.itemId === selectedItem}
          onItemClick={(itemId) => {
            setSelectedItem(itemId);
            onItemClick(itemId);
          }}
        />
      ))}
      <IndicatorBox
        $indicatorColor={indicatorColor}
        $indicatorWidth={itemWidth}
        $selectedIndex={selectedIndex}
      />
    </TabBarContainer>
  );
};

const TabBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IndicatorBox = styled.div<{
  $indicatorColor: string;
  $indicatorWidth: number;
  $selectedIndex: number;
}>`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 2px;
  width: ${(props) => `${props.$indicatorWidth}px`};
  background-color: ${(props) => props.$indicatorColor};
  transition: transform 0.3s ease;
  transform: ${(props) => `translateX(calc(${props.$selectedIndex} * ${props.$indicatorWidth}px))`};
`;
