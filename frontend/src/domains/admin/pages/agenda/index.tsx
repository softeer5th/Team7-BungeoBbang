import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems } from '../destinations';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatRoomListCardData, ProgressState } from './chat-room-list/ChatRoomCardData';
import { ChatRoomListItem } from './chat-room-list/ChatRoomListItem';
import { EmptyContent } from '@/components/EmptyContent';
import { ChatCategoryType } from '@/types/ChatCategoryType';

const AgendaPage: React.FC = () => {
  const theme = useTheme();

  const bottomNavRef = useRef<HTMLDivElement>(null);
  const [bottomPx, setBottomPx] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [tabContents, setTabContents] = useState<Record<string, ChatRoomListCardData[]>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const tabItems: TabBarItemProps[] = [
    {
      itemId: 'inProgress',
      title: '진행 중',
    },
    {
      itemId: 'complete',
      title: '종료',
    },
  ];

  const mockData: Record<string, ChatRoomListCardData[]> = {
    inProgress: [
      {
        roomId: 'room1',
        hasNew: true,
        progressState: ProgressState.IN_PROGRESS,
        numOfJoin: 5,
        chatCategoryType: ChatCategoryType.ACADEMICS,
        title: '진행 중인 채팅방 1',
        startDate: '2024-02-01',
        endDate: '2024-02-15',
      },
      {
        roomId: 'room2',
        hasNew: false,
        progressState: ProgressState.IN_PROGRESS,
        numOfJoin: 3,
        chatCategoryType: ChatCategoryType.BUDGET,
        title: '진행 중인 채팅방 3',
        startDate: '2024-02-05',
        endDate: '2024-02-20',
      },
      {
        roomId: 'room2',
        hasNew: false,
        progressState: ProgressState.BEFORE,
        numOfJoin: 3,
        chatCategoryType: ChatCategoryType.BUDGET,
        title: '진행 중인 채팅방 2',
        startDate: '2024-02-05',
        endDate: '2024-02-20',
      },
    ],
    complete: [
      {
        roomId: 'room3',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 8,
        chatCategoryType: ChatCategoryType.CLUBS,
        title: '완료된 채팅방 1',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      },
      {
        roomId: 'room4',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room5',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room6',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room7',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room8',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room9',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room10',
        hasNew: false,
        progressState: ProgressState.FINISHED,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
    ],
  };

  useEffect(() => {
    setTabContents(mockData);
    if (bottomNavRef) {
      setBottomPx(bottomNavRef.current?.offsetHeight || 17);
    }
  }, []);

  useEffect(() => {
    const scrollLeft = containerRef.current?.scrollLeft || 0;

    const width = containerRef.current?.offsetWidth || 375;

    setTranslateX(scrollLeft + -activeIndex * width);
  }, [activeIndex]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
      />
      <TabBar
        currentDestination={tabItems[activeIndex].itemId}
        items={tabItems}
        onItemClick={(itemId) =>
          setActiveIndex(tabItems.findIndex((item) => item.itemId === itemId))
        }
      />
      <S.TabContainer ref={containerRef}>
        {tabItems.map((tab) => {
          const content = tabContents[tab.itemId] || [];
          return (
            <S.TabContent key={tab.itemId} transX={translateX}>
              {content.length > 0 ? (
                <S.ChatPreviewList>
                  {content.map((c) => (
                    <ChatRoomListItem key={c.roomId} cardData={c} />
                  ))}
                </S.ChatPreviewList>
              ) : (
                <EmptyContent
                  showIcon={true}
                  text={
                    tab.itemId === tabItems[0].itemId
                      ? `현재 진행중인 채팅방이 없습니다.
                       채팅방을 개설해주세요!`
                      : '현재 종료된 채팅방이 없습니다.'
                  }
                />
              )}
            </S.TabContent>
          );
        })}
        <S.FloatingActionButton bottom={bottomPx}>
          <img src="/src/assets/icons/plus.svg" />
        </S.FloatingActionButton>
      </S.TabContainer>
      <BottomNavigation
        ref={bottomNavRef}
        startDestination={bottomItems[0].itemId}
        setAlarm={true}
        destinations={bottomItems}
      />
    </S.Container>
  );
};

export default AgendaPage;
