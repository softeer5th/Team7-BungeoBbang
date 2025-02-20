import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TabBarItemProps } from './TabBarItem';
import { TabBar } from './TabBar';

export interface TabBarContainerProps {
  tabItems: TabBarItemProps[];
  currentTabSelectedIndex: number;
  backgroundColor?: string;
  onTabItemClick?: (itemId: string) => void;
  contents: (index: number) => React.ReactNode;
}

export const TabBarContainer: React.FC<TabBarContainerProps> = ({
  tabItems,
  currentTabSelectedIndex,
  backgroundColor = '#F4F4F4',
  onTabItemClick = () => {},
  contents,
}) => {
  console.log('currentTabSelectedIndex');

  const [activeIndex, setActiveIndex] = useState(currentTabSelectedIndex);

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const handleTabContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      e.stopPropagation();
      const width = containerRef.current.offsetWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  const handleTabItemClick = (itemId: string) => {
    const newActiveIndex = tabItems.findIndex((item) => item.itemId === itemId);

    setActiveIndex(newActiveIndex);

    scrollTabContent(newActiveIndex);
    onTabItemClick(itemId);
  };

  const scrollTabContent = (index: number) => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current?.scrollLeft;
      const width = containerRef.current?.offsetWidth;

      setTranslateX(scrollLeft + -index * width);

      sessionStorage.setItem('activeTabIndex', String(index));
    }
  };

  useEffect(() => {
    scrollTabContent(activeIndex);
  }, []);

  useEffect(() => {
    const newActiveIndex = currentTabSelectedIndex ?? (tabItems[0].itemId || 0);
    setActiveIndex(newActiveIndex);

    scrollTabContent(newActiveIndex);
  }, [currentTabSelectedIndex]);

  return (
    <>
      <TabBar
        currentDestination={tabItems[activeIndex].itemId}
        items={tabItems}
        onItemClick={handleTabItemClick}
      />
      <TabContentContainer
        backgroundColor={backgroundColor}
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
