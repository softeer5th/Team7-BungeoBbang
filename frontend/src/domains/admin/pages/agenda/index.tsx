import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems } from '../destinations';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatRoomListCardData } from './chat-room-list/ChatRoomCardData';
import { ChatRoomListItem } from './chat-room-list/ChatRoomListItem';
import { EmptyContent } from '@/components/EmptyContent';
import { ChatCategoryType } from '@/types/ChatCategoryType';

const AgendaPage: React.FC = () => {
  const theme = useTheme();

  const [currentItem, setCurrentItem] = useState(0);
  const [tabContents, setTabContents] = useState<Record<string, ChatRoomListCardData[]>>({});

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
        isInProgress: true,
        numOfJoin: 5,
        chatCategoryType: ChatCategoryType.ACADEMICS,
        title: '진행 중인 채팅방 1',
        startDate: '2024-02-01',
        endDate: '2024-02-15',
      },
      {
        roomId: 'room2',
        hasNew: false,
        isInProgress: true,
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
        isInProgress: false,
        numOfJoin: 8,
        chatCategoryType: ChatCategoryType.CLUBS,
        title: '완료된 채팅방 1',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      },
      {
        roomId: 'room4',
        hasNew: false,
        isInProgress: false,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room5',
        hasNew: false,
        isInProgress: false,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room6',
        hasNew: false,
        isInProgress: false,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room6',
        hasNew: false,
        isInProgress: false,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room6',
        hasNew: false,
        isInProgress: false,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room6',
        hasNew: false,
        isInProgress: false,
        numOfJoin: 10,
        chatCategoryType: ChatCategoryType.EVENTS,
        title: '완료된 채팅방 2',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
      },
      {
        roomId: 'room6',
        hasNew: false,
        isInProgress: false,
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
  }, []);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
      />

      <TabBar
        currentDestination={tabItems[currentItem].itemId}
        items={tabItems}
        onItemClick={(itemId) =>
          setCurrentItem(tabItems.findIndex((item) => item.itemId === itemId))
        }
      />

      <S.TabContainer>
        {tabItems.map((tab) => {
          const content = tabContents[tab.itemId] || [];
          console.log('content', tab, content);
          return (
            <S.TabContent key={tab.itemId}>
              {content.length > 0 ? (
                <S.ChatPreviewList>
                  {content.map((c) => (
                    // <div>{c.title}</div>
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
      </S.TabContainer>
      <BottomNavigation startDestination={bottomItems[0].itemId} destinations={bottomItems} />
    </S.Container>
  );
};

export default AgendaPage;
