import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems, moveToDestination } from '../destinations';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatRoomListCardData } from './components/ChatRoomCardData';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { EmptyContent } from '@/components/EmptyContent';
import api from '@/utils/api';
import { mapResponseToChatRoomListCardData, ServerData } from './util/ChatRoomMapper';
import { useNavigate } from 'react-router-dom';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { AgendaEndDialog } from './components/ChatEndDialog';
import { AgendaDeleteDialog } from './components/AgendaDeleteDialog';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useSocketManager } from '@/hooks/useSocketManager';
import plusIcon from '@/assets/icons/plus.svg';
import { motion } from 'framer-motion';
import { TabBarContainer } from '@/components/tab-bar/TabBarCotainer';
import { useQuery } from '@/hooks/useQuery';
import { useCacheStore } from '@/store/cacheStore';

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
  const { invalidateQueries } = useCacheStore();

  const bottomNavRef = useRef<HTMLDivElement>(null);
  const [bottomPx, setBottomPx] = useState(0);

  const [tabContents, setTabContents] = useState<Record<string, ChatRoomListCardData[]>>({});

  const [isLogoutDialogShow, setLogoutDialogShow] = useState(false);
  const [isDeleteDialogShow, setDeleteDialogShow] = useState(false);
  const [isEndDialogShow, setEndDialogShow] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<ChatRoomListCardData | null>(null);

  const isInProgessEnd = useRef<boolean>(false);
  const isFirstUpcoming = useRef<boolean>(true);

  const lastChatRoom = useRef<[string | null, number | null][]>(tabItems.map(() => [null, null]));
  const socketManager = useSocketManager();

  const fetchProgressChatRooms = useCallback(async () => {
    const status = isInProgessEnd.current ? 'UPCOMING' : 'ACTIVE';
    const params =
      status === 'ACTIVE'
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

    return api.get('/admin/agendas', { params: params });
  }, []);

  // const { isLoading: isProgressLoading, refetch: refetchProgress } =
  useQuery('adminAgendasProgress', fetchProgressChatRooms, {
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    onSuccess: (response: { data: ServerData[] }) => {
      const status = isInProgessEnd.current ? 'UPCOMING' : 'ACTIVE';
      const newRooms = response.data.map((res) => mapResponseToChatRoomListCardData(res, status));

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

      if (status === 'UPCOMING') {
        isFirstUpcoming.current = false;
      }
    },
  });

  const fetchCompleteChatRooms = useCallback(async () => {
    const params = {
      status: 'CLOSED',
      ...(lastChatRoom.current
        ? { endDate: lastChatRoom.current[1][0], agendaId: lastChatRoom.current[1][1] }
        : {}),
    };
    return api.get('/admin/agendas', { params: params });
  }, []);

  const { refetch: refetchComplete } = useQuery('adminAgendasComplete', fetchCompleteChatRooms, {
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    onSuccess: (response: { data: ServerData[] }) => {
      const newRooms = response.data.map((res) => mapResponseToChatRoomListCardData(res, 'CLOSED'));

      setTabContents((prev) => ({
        ...prev,
        complete: [...(prev.complete ?? []), ...newRooms],
      }));

      if (newRooms.length < MAX_PAGE_ITEMS) {
        setCompleteHasMore(false);
      }
    },
  });

  const refetchCompleteChatRooms = async () => {
    lastChatRoom.current[1] = [null, null];
    setCompleteHasMore(true);
    await refetchComplete();
  };

  const handleEndRoom = async () => {
    try {
      if (!selectedCardData) return;

      await api.patch(`/admin/agendas/${selectedCardData?.roomId}/close`);
      socketManager('AGENDA', 'CLOSE', selectedCardData?.roomId, 'ADMIN');

      // 캐시 무효화
      invalidateQueries('adminAgendas');

      setTabContents((prev) => ({
        ...prev,
        inProgress: prev.inProgress.filter((room) => room.roomId !== selectedCardData.roomId),
      }));
      refetchCompleteChatRooms();
    } catch (error) {
      console.error('채팅방 종료 실패', error);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      if (!selectedCardData) return;

      await api.delete(`/admin/agendas/${selectedCardData?.roomId}`);
      socketManager('AGENDA', 'DELETE', selectedCardData?.roomId, 'ADMIN');

      // 캐시 무효화
      invalidateQueries('adminAgendas');

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

  useEffect(() => {
    if (bottomNavRef) {
      setBottomPx(bottomNavRef.current?.offsetHeight || 17);
    }
  }, [bottomPx]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        onRightIconClick={() => setLogoutDialogShow(true)}
        onLeftIconClick={() => {
          navigate(-1);
        }}
      />
      <TabBarContainer
        tabItems={tabItems}
        currentTabSelectedIndex={Number(sessionStorage.getItem('activeTabIndex')) || 0}
        contents={(index) => {
          const tab = tabItems[index];
          const content = tabContents[tab.itemId] || [];
          return content.length > 0 ? (
            <S.ChatPreviewList>
              {content.map((c, contentIndex) => {
                const isTriggerItem = contentIndex === content.length - TRIGGER_REST_ITEMS;
                const isLastItem = contentIndex === content.length - 1;

                if (isLastItem) {
                  lastChatRoom.current[index] = [c.endDate, c.roomId];
                }

                return (
                  <motion.div
                    key={c.roomId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      y: {
                        duration: 0.5,
                        ease: [0.45, 0, 0.21, 1],
                        delay:
                          (contentIndex + 1) % 2 === 1
                            ? (0.2 * (contentIndex + 1)) / 2
                            : (0.2 * contentIndex) / 2,
                      },
                      opacity: {
                        duration: 0.8,
                        ease: [0.45, 0, 0.21, 1],
                        delay:
                          (contentIndex + 1) % 2 === 1
                            ? (0.2 * (contentIndex + 1)) / 2
                            : (0.2 * contentIndex) / 2,
                      },
                    }}
                  >
                    <ChatRoomListItem
                      ref={
                        isTriggerItem
                          ? index === 0
                            ? setProgressTriggerItem
                            : setCompleteTriggerItem
                          : null
                      }
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
                  </motion.div>
                );
              })}
            </S.ChatPreviewList>
          ) : (
            !isFirstUpcoming && (
              <EmptyContent
                showIcon={true}
                text={
                  tab.itemId === tabItems[0].itemId
                    ? `현재 진행중인 채팅방이 없습니다.\n채팅방을 개설해주세요!`
                    : '현재 종료된 채팅방이 없습니다.'
                }
              />
            )
          );
        }}
      />
      <S.FloatingActionButton bottom={bottomPx} onClick={() => navigate(`/agenda/create`)}>
        <img src={plusIcon} />
      </S.FloatingActionButton>
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
