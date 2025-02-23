import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { TabBarItemProps } from './TabBarItem';
import { TabBar } from './TabBar';

export interface TabBarContainerProps {
  tabItems: TabBarItemProps[];
  contentBackgroundColor?: string;
  tabBarBackgroundColor?: string;
  selectedTabBarItembackgroundColor?: string;
  indicatorColor?: string;
  tabBarTextColor?: string;
  tabBarSelectedTextColor?: string;
  onTabItemClick?: (itemId: string) => void;
  contents: (index: number) => React.ReactNode;
}

export const TabBarContainer: React.FC<TabBarContainerProps> = ({
  tabItems,
  contentBackgroundColor = '#F4F4F4',
  tabBarBackgroundColor = '#FFFFFF',
  selectedTabBarItembackgroundColor = '#FFFFFF',
  indicatorColor = '#1F87FF',
  tabBarTextColor = '#C6C6C6',
  tabBarSelectedTextColor = '#1F87FF',
  onTabItemClick = () => {},
  contents,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const handleTabContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      e.stopPropagation();
      const width = containerRef.current.offsetWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      if (scrollLeft % width === 0) {
        setActiveIndex(index);
      }

      console.log('tab item slide', index);
    }
  };

  const handleTabItemClick = (itemId: string) => {
    const newActiveIndex = tabItems.findIndex((item) => item.itemId === itemId);

    setActiveIndex(newActiveIndex);

    scrollTabContent(newActiveIndex);
    onTabItemClick(itemId);
    console.log('tab item click', newActiveIndex);
  };

  const scrollTabContent = (index: number) => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current?.scrollLeft;
      const width = containerRef.current?.offsetWidth;

      setTranslateX(scrollLeft + -index * width);
    }
  };

  if (tabItems.length === 0) return;

  return (
    <>
      <TabBar
        currentDestination={tabItems[activeIndex].itemId}
        items={tabItems}
        onItemClick={handleTabItemClick}
        backgroundColor={tabBarBackgroundColor}
        selectedItembackgroundColor={selectedTabBarItembackgroundColor}
        indicatorColor={indicatorColor}
        textColor={tabBarTextColor}
        selectedTextColor={tabBarSelectedTextColor}
      />
      <TabContentContainer
        backgroundColor={contentBackgroundColor}
        ref={containerRef}
        onScroll={handleTabContentScroll}
      >
        {tabItems.map((tab, index) => {
          return (
            <TabContent key={tab.itemId} transX={translateX}>
              {contents(index)}
            </TabContent>
          );
        })}
      </TabContentContainer>
    </>
  );
};

const TabContentContainer = styled.div<{
  backgroundColor: string;
}>`
  flex: 1;
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  background-color: ${(props) => props.backgroundColor};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabContent = styled.div<{
  transX: number;
}>`
  min-width: 100%;
  max-width: 100%;

  scroll-snap-align: center;

  transform: translateX(${(props) => props.transX}px);
  transition: transform 0.3s ease;
`;
