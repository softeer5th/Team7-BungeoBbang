import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems } from '../destinations';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatRoomListCardData } from './components/ChatRoomCardData';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { EmptyContent } from '@/components/EmptyContent';
import api from '@/utils/api';
import { mapResponseToChatRoomListCardData, ServerData } from './util/ChatRoomMapper';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@/components/Dialog/Dialog';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { AgendaEndDialog } from './components/ChatEndDialog';
import { AgendaDeleteDialog } from './components/AgendaDeleteDialog';

const AgendaPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const bottomNavRef = useRef<HTMLDivElement>(null);
  const [bottomPx, setBottomPx] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const [tabContents, setTabContents] = useState<Record<string, ChatRoomListCardData[]>>({});

  const [isLogoutDialogShow, setLogoutDialogShow] = useState(false);
  const [isDeleteDialogShow, setDeleteDialogShow] = useState(false);
  const [isEndDialogShow, setEndDialogShow] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<ChatRoomListCardData | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const width = containerRef.current?.offsetWidth || 375;
    const threshold = width / 2;

    const deltaX = e.changedTouches[0].clientX - startX;

    let newIndex = activeIndex;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0 && activeIndex < tabItems.length - 1) {
        newIndex = activeIndex + 1;
      } else if (deltaX > 0 && activeIndex > 0) {
        newIndex = activeIndex - 1;
      }
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (bottomNavRef) {
      setBottomPx(bottomNavRef.current?.offsetHeight || 17);
    }
  }, [bottomPx]);

  useEffect(() => {
    const scrollLeft = containerRef.current?.scrollLeft || 0;

    const width = containerRef.current?.offsetWidth || 375;

    setTranslateX(scrollLeft + -activeIndex * width);
  }, [activeIndex]);

  useEffect(() => {
    getAllChatRooms();
  }, []);

  const getAllChatRooms = async () => {
    const result: Record<string, ChatRoomListCardData[]> = {
      inProgress: [],
      complete: [],
    };

    try {
      const [active, upcoming, closed] = await Promise.all([
        api.get('/admin/agendas', { params: { status: 'ACTIVE' } }),
        api.get('/admin/agendas', { params: { status: 'UPCOMING' } }),
        api.get('/admin/agendas', { params: { status: 'CLOSED' } }),
      ]);

      result.inProgress = [
        ...active.data.map((data: ServerData) => mapResponseToChatRoomListCardData(data)),
        ...upcoming.data.map((data: ServerData) => mapResponseToChatRoomListCardData(data)),
      ];

      result.complete = [
        ...closed.data.map((data: ServerData) => mapResponseToChatRoomListCardData(data)),
      ];

      setTabContents(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getProgressChatRooms = async () => {
    try {
      const [active, upcoming] = await Promise.all([
        api.get('/admin/agendas', { params: { status: 'ACTIVE' } }),
        api.get('/admin/agendas', { params: { status: 'UPCOMING' } }),
      ]);

      setTabContents((prev) => ({
        ...prev,
        inProgress: [
          ...active.data.map(mapResponseToChatRoomListCardData),
          ...upcoming.data.map(mapResponseToChatRoomListCardData),
        ],
      }));
    } catch (error) {
      console.error('Error fetching progress chat rooms:', error);
    }
  };

  const getCompleteChatRooms = async () => {
    try {
      const closed = await api.get('/admin/agendas', { params: { status: 'CLOSED' } });

      setTabContents((prev) => ({
        ...prev,
        complete: closed.data.map(mapResponseToChatRoomListCardData),
      }));
    } catch (error) {
      console.error('Error fetching complete chat rooms:', error);
    }
  };

  const handleEndRoom = async () => {
    try {
      if (!selectedCardData) return;

      await api.patch(`/admin/agendas/${selectedCardData?.roomId}/close`);
      getAllChatRooms();
    } catch (error) {
      console.error('채팅방 삭제 실패', error);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      if (!selectedCardData) return;

      await api.delete(`/admin/agendas/${selectedCardData?.roomId}`);
      activeIndex === 0 ? getProgressChatRooms() : getCompleteChatRooms();
    } catch (error) {
      console.error('채팅방 삭제 실패', error);
    }
  };

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        onRightIconClick={() => setLogoutDialogShow(true)}
      />
      <TabBar
        currentDestination={tabItems[activeIndex].itemId}
        items={tabItems}
        onItemClick={(itemId) =>
          setActiveIndex(tabItems.findIndex((item) => item.itemId === itemId))
        }
      />
      <S.TabContainer
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {tabItems.map((tab) => {
          const content = tabContents[tab.itemId] || [];
          return (
            <S.TabContent key={tab.itemId} transX={translateX}>
              {content.length > 0 ? (
                <S.ChatPreviewList>
                  {content.map((c) => (
                    <ChatRoomListItem
                      key={c.roomId}
                      cardData={c}
                      onCardEdit={() => navigate(`/agenda/create/${c.roomId}`)}
                      onCardEnd={() => {
                        setSelectedCardData(c);
                        setEndDialogShow(true);
                      }}
                      onCardDelete={() => {
                        setSelectedCardData(c);
                        setDeleteDialogShow(true);
                      }}
                    />
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
        <S.FloatingActionButton bottom={bottomPx} onClick={() => navigate(`/agenda/create/-1`)}>
          <img src="/src/assets/icons/plus.svg" />
        </S.FloatingActionButton>
      </S.TabContainer>
      <BottomNavigation
        ref={bottomNavRef}
        startDestination={bottomItems[0].itemId}
        setAlarm={true}
        destinations={bottomItems}
      />
      {isLogoutDialogShow && (
        <LogoutDialog
          onDismiss={() => setLogoutDialogShow(false)}
          onConfirm={() => setLogoutDialogShow(false)}
        />
      )}
      {isEndDialogShow && (
        <AgendaEndDialog
          title={selectedCardData?.title}
          onConfirm={() => {
            handleEndRoom();
            setEndDialogShow(false);
          }}
          onDismiss={() => setEndDialogShow(false)}
        />
      )}
      {isDeleteDialogShow && (
        <AgendaDeleteDialog
          title={selectedCardData?.title}
          onConfirm={() => {
            handleDeleteRoom();
            setDeleteDialogShow(false);
          }}
          onDismiss={() => setDeleteDialogShow(false)}
        />
      )}
    </S.Container>
  );
};

export default AgendaPage;
