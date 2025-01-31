import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TabBarItem, TabBarItemProps } from './TabBarItem';

interface TabBarProps {
  startDestination: string;
  items: TabBarItemProps[];
  backgroundColor?: string;
  selectedItembackgroundColor?: string;
  indicatorColor?: string;
  textColor?: string;
  selectedTextColor?: string;
  onItemClick?: (itemId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  startDestination,
  items,
  backgroundColor = '#FFFFFF',
  selectedItembackgroundColor = '#FFFFFF',
  indicatorColor = '#1F87FF',
  textColor = '#C6C6C6',
  selectedTextColor = '#1F87FF',
  onItemClick = () => {},
}) => {
  const [selectedItem, setSelectedItem] = useState(startDestination);

  const selectedIndex = items.findIndex((item) => item.itemId === selectedItem);

  const [itemWidth, setItemWidth] = useState(0);
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabBarRef.current) {
      setItemWidth(tabBarRef.current.offsetWidth / items.length);
    }
  }, [items.length, tabBarRef]);

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
