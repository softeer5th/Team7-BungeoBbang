import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems, moveToDestination } from '../destinations';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatRoomListCardData } from './components/ChatRoomCardData';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { EmptyContent } from '@/components/EmptyContent';
import api from '@/utils/api';
import { mapResponseToChatRoomListCardData } from './util/ChatRoomMapper';
import { useNavigate } from 'react-router-dom';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { AgendaEndDialog } from './components/ChatEndDialog';
import { AgendaDeleteDialog } from './components/AgendaDeleteDialog';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import JwtManager from '@/utils/jwtManager';

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

const AgendaPage: React.FC = () => {
  const MAX_PAGE_ITEMS = 6;
  const TRIGGER_REST_ITEMS = 3;

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

  const isInProgessEnd = useRef<boolean>(false);
  const isFirstUpcoming = useRef<boolean>(true);

  const lastChatRoom = useRef<[string | null, number | null][]>(tabItems.map(() => [null, null]));

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

  const fetchProgressChatRooms = async () => {
    try {
      const status = isInProgessEnd.current ? 'UPCOMING' : 'ACTIVE';
      const access = await JwtManager.getAccessToken();
      console.log('access', access);
      const params =
        status == 'ACTIVE'
          ? {
              status: status,
              ...(lastChatRoom.current
                ? { endDate: lastChatRoom.current[0][0], agendaId: lastChatRoom.current[0][1] }
                : {}),
            }
          : {
              status: status,
              ...(lastChatRoom.current && !isFirstUpcoming.current
                ? { endDate: lastChatRoom.current[0][0], agendaId: lastChatRoom.current[0][1] }
                : {}),
            };

      if (status == 'UPCOMING') isFirstUpcoming.current = false;

      const response = await api.get('/admin/agendas', { params: params });

      const newRooms = response.data.map(mapResponseToChatRoomListCardData);

      setTabContents((prev) => ({
        ...prev,
        inProgress: [...(prev.inProgress ?? []), ...newRooms],
      }));

      if (newRooms.length < MAX_PAGE_ITEMS) {
        if (!isInProgessEnd.current) {
          isInProgessEnd.current = true;
        } else {
          setProgressHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching progress chat rooms:', error);
    }
  };

  const fetchCompleteChatRooms = async () => {
    try {
      const params = {
        status: 'CLOSED',
        ...(lastChatRoom.current
          ? { endDate: lastChatRoom.current[1][0], agendaId: lastChatRoom.current[1][1] }
          : {}),
      };
      const closed = await api.get('/admin/agendas', { params: params });

      const newRooms = closed.data.map(mapResponseToChatRoomListCardData);

      console.log('newrooms', closed);
      setTabContents((prev) => ({
        ...prev,
        complete: [...(prev.complete ?? []), ...newRooms],
      }));

      if (newRooms.length < MAX_PAGE_ITEMS) {
        setCompleteHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching complete chat rooms:', error);
    }
  };

  const refetchCompleteChatRooms = async () => {
    lastChatRoom.current[1] = [null, null];
    setCompleteHasMore(true);

    try {
      const params = {
        status: 'CLOSED',
        ...(lastChatRoom.current
          ? { endDate: lastChatRoom.current[1][0], agendaId: lastChatRoom.current[1][1] }
          : {}),
      };
      const closed = await api.get('/admin/agendas', { params: params });

      const newRooms = closed.data.map(mapResponseToChatRoomListCardData);

      setTabContents((prev) => ({
        ...prev,
        complete: newRooms,
      }));

      if (newRooms.length < MAX_PAGE_ITEMS) {
        setCompleteHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching complete chat rooms:', error);
    }
  };

  const handleEndRoom = async () => {
    try {
      if (!selectedCardData) return;

      await api.patch(`/admin/agendas/${selectedCardData?.roomId}/close`);

      setTabContents((prev) => ({
        ...prev,
        inProgress: prev.inProgress.filter((room) => room.roomId !== selectedCardData.roomId),
      }));
      refetchCompleteChatRooms();
    } catch (error) {
      console.error('채팅방 삭제 실패', error);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      if (!selectedCardData) return;

      await api.delete(`/admin/agendas/${selectedCardData?.roomId}`);

      setTabContents((prev) => {
        const updatedTabs = { ...prev };

        Object.keys(updatedTabs).forEach((tabKey) => {
          updatedTabs[tabKey] = updatedTabs[tabKey].filter(
            (room) => room.roomId !== selectedCardData.roomId,
          );
        });

        return updatedTabs;
      });
    } catch (error) {
      console.error('채팅방 삭제 실패', error);
    }
  };

  const { setTriggerDownItem: setProgressTriggerItem, setHasDownMore: setProgressHasMore } =
    useInfiniteScroll({
      initialFetch: fetchProgressChatRooms,
      fetchDownMore: fetchProgressChatRooms,
    });

  const { setTriggerDownItem: setCompleteTriggerItem, setHasDownMore: setCompleteHasMore } =
    useInfiniteScroll({
      initialFetch: fetchCompleteChatRooms,
      fetchDownMore: fetchCompleteChatRooms,
    });

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        onRightIconClick={() => setLogoutDialogShow(true)}
        onLeftIconClick={() => {
          navigate(-1);
          socketManager('OPINION', 'LEAVE', Number(roomId), 'ADMIN');
        }}
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
        {tabItems.map((tab, tabIndex) => {
          const content = tabContents[tab.itemId] || [];
          return (
            <S.TabContent key={tab.itemId} transX={translateX}>
              {content.length > 0 ? (
                <S.ChatPreviewList>
                  {content.map((c, contentIndex) => {
                    const isTriggerItem = contentIndex === content.length - TRIGGER_REST_ITEMS;
                    const isLastItem = contentIndex === content.length - 1;

                    if (isLastItem) {
                      lastChatRoom.current[tabIndex] = [c.endDate, c.roomId];
                    }

                    return (
                      <ChatRoomListItem
                        ref={
                          isTriggerItem
                            ? tabIndex == 0
                              ? setProgressTriggerItem
                              : setCompleteTriggerItem
                            : null
                        }
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
                    );
                  })}
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
        <S.FloatingActionButton bottom={bottomPx} onClick={() => navigate(`/agenda/create`)}>
          <img src="/src/assets/icons/plus.svg" />
        </S.FloatingActionButton>
      </S.TabContainer>
      <BottomNavigation
        ref={bottomNavRef}
        startDestination={bottomItems[0].itemId}
        setAlarm={true}
        destinations={bottomItems}
        onItemClick={(itemId) => navigate(moveToDestination(itemId))}
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
