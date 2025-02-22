import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TabBarItemProps } from './TabBarItem';
import { TabBar } from './TabBar';

export interface TabBarContainerProps {
  /**
   * 탭 항목 리스트
   */
  tabItems: TabBarItemProps[];

  /**
   * 현재 선택된 탭의 인덱스
   * @example 0
   */
  currentTabSelectedIndex: number;

  /**
   * 컨텐츠 영역의 배경 색상 (선택 사항)
   * @default "#F4F4F4"
   * @example "#FFFFFF"
   */
  contentBackgroundColor?: string;

  /**
   * 탭 바의 배경 색상 (선택 사항)
   * @default "#FFFFFF"
   * @example "#F8F9FA"
   */
  tabBarBackgroundColor?: string;

  /**
   * 선택된 탭의 배경 색상 (선택 사항)
   * @default "#FFFFFF"
   * @example "#E0E0E0"
   */
  selectedTabBarItembackgroundColor?: string;

  /**
   * 탭 인디케이터 색상 (선택 사항)
   * @default "#1F87FF"
   * @example "#FF5722"
   */
  indicatorColor?: string;

  /**
   * 기본 탭 텍스트 색상 (선택 사항)
   * @default "#C6C6C6"
   * @example "#212121"
   */
  tabBarTextColor?: string;

  /**
   * 선택된 탭의 텍스트 색상 (선택 사항)
   * @default "#1F87FF"
   * @example "#000000"
   */
  tabBarSelectedTextColor?: string;

  /**
   * 탭 항목 클릭 시 호출되는 콜백 함수 (선택 사항)
   * @param itemId 클릭한 탭의 ID
   */
  onTabItemClick?: (itemId: string) => void;

  /**
   * 각 탭의 인덱스를 기반으로 렌더링될 컨텐츠를 반환하는 함수
   * @param index 현재 선택된 탭의 인덱스
   * @returns 해당 탭에 맞는 React 노드
   */
  contents: (index: number) => React.ReactNode;
}

export const TabBarContainer: React.FC<TabBarContainerProps> = ({
  tabItems,
  currentTabSelectedIndex,
  contentBackgroundColor = '#F4F4F4',
  tabBarBackgroundColor = '#FFFFFF',
  selectedTabBarItembackgroundColor = '#FFFFFF',
  indicatorColor = '#1F87FF',
  tabBarTextColor = '#C6C6C6',
  tabBarSelectedTextColor = '#1F87FF',
  onTabItemClick = () => {},
  contents,
}) => {
  const [activeIndex, setActiveIndex] = useState(currentTabSelectedIndex || 0);

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
