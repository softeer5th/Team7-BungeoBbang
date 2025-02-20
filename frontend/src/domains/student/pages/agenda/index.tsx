import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { useRef, useState, useCallback } from 'react';
import { ChatRoomListCardData } from './data/ChatRoomListCardData';
import { BannerContainer } from './components/Banner';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import { bottomItems, moveToDestination } from '../destinations';
import { mapResponseToChatListCardData, ServerData } from './util/ChatRoomCardMapper';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ChatEnterDialog } from './components/ChatEnterDialog';
import { useSocketManager } from '@/hooks/useSocketManager';
import { motion } from 'framer-motion';
import { useQuery } from '@/hooks/useQuery';
import { useCacheStore } from '@/store/cacheStore';

const AgendaPage = () => {
  const MAX_PAGE_ITEMS = 6;
  const TRIGGER_REST_ITEMS = 3;

  const theme = useTheme();
  const navigate = useNavigate();
  const socketManager = useSocketManager();
  const { invalidateQueries } = useCacheStore();

  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [selectedChatRoomEnter, setSelectedChatRoomEnter] = useState<number | null>(null);

  const lastChatRoom = useRef<[string, number] | null>(null);
  const hasMore = useRef<boolean>(true);
  const isInProgessEnd = useRef<boolean>(false);
  const isFirstUpcoming = useRef<boolean>(false);

  const [chatRooms, setChatRooms] = useState<ChatRoomListCardData[]>([]);

  const fetchChatRooms = useCallback(async () => {
    if (!hasMore.current) return;

    const status = isInProgessEnd.current ? 'CLOSED' : 'ACTIVE';
    const params =
      status === 'ACTIVE'
        ? {
            status: status,
            ...(lastChatRoom.current
              ? { endDate: lastChatRoom.current[0], agendaId: lastChatRoom.current[1] }
              : {}),
          }
        : {
            status: status,
            ...(lastChatRoom.current && !isFirstUpcoming.current
              ? { endDate: lastChatRoom.current[0], agendaId: lastChatRoom.current[1] }
              : {}),
          };

    if (status === 'CLOSED') isFirstUpcoming.current = false;

    return api.get('/student/agendas', { params: params });
  }, []);

  const { isLoading, data } = useQuery('studentAgendas', fetchChatRooms, {
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    onSuccess: (response: { data: ServerData[] }) => {
      const status = isInProgessEnd.current ? 'CLOSED' : 'ACTIVE';
      const newRooms = response.data.map((data) => mapResponseToChatListCardData(data, status));

      setChatRooms((prev) => [...prev, ...newRooms]);

      if (newRooms.length < MAX_PAGE_ITEMS) {
        if (!isInProgessEnd.current) {
          isInProgessEnd.current = true;
        } else {
          setHasMore(false);
        }
      }
    },
  });

  const enterChatRoom = async () => {
    try {
      const selectedRoom = chatRooms.find((room) => room.roomId === selectedChatRoomEnter);
      await api.post(`/student/agendas/${selectedChatRoomEnter}`);
      socketManager('AGENDA', 'PARTICIPATE', selectedChatRoomEnter || -1, 'STUDENT');

      // 채팅방 입장 시 캐시 무효화
      invalidateQueries('studentAgendas');

      navigate(`/agenda/chat/${selectedChatRoomEnter}?isEnd=false&isParticipate=true`, {
        state: { lastChatId: selectedRoom?.lastChatId },
      });
    } catch (error) {
      console.error('채팅방 입장 실패:', error);
    }
  };

  const { setTriggerDownItem: setTriggerItem, setHasDownMore: setHasMore } = useInfiniteScroll({
    initialFetch: fetchChatRooms,
    fetchDownMore: fetchChatRooms,
  });

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        backgroundColor={theme.colors.grayScale10}
        onRightIconClick={() => setLogoutDialogOpen(true)}
      />
      <S.BodyContainer>
        <BannerContainer />
        {chatRooms && chatRooms.length > 0 ? (
          <S.ChatRoomList>
            {chatRooms.map((room, index) => {
              const isTriggerItem = index === chatRooms.length - TRIGGER_REST_ITEMS;
              const isLastItem = index === chatRooms.length - 1;
              if (isLastItem) {
                lastChatRoom.current = [room.endDate, room.roomId];
              }

              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    y: {
                      duration: 0.5,
                      ease: [0.45, 0, 0.21, 1],
                      delay: (index + 1) % 2 === 1 ? (0.2 * (index + 1)) / 2 : (0.2 * index) / 2,
                    },
                    opacity: {
                      duration: 0.8,
                      ease: [0.45, 0, 0.21, 1],
                      delay: (index + 1) % 2 === 1 ? (0.2 * (index + 1)) / 2 : (0.2 * index) / 2,
                    },
                  }}
                >
                  <ChatRoomListItem
                    key={room.roomId}
                    ref={isTriggerItem ? setTriggerItem : null}
                    room={room}
                    onClick={() => {
                      const isEnd = !room.isInProgress;
                      const isParticipate = room.isParticipate;
                      console.log(isEnd, isParticipate);
                      if (isEnd || isParticipate) {
                        console.log('여기', room.lastChatId);
                        navigate(
                          `/agenda/chat/${room.roomId}?isEnd=${isEnd}&isParticipate=${isParticipate}`,
                          {
                            state: { lastChatId: room.lastChatId },
                          },
                        );
                      } else {
                        setSelectedChatRoomEnter(room.roomId);
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </S.ChatRoomList>
        ) : (
          <S.EmptyTextWrapper>
            <S.EmptyText variant="heading4">현재 개설된 채팅방이 없습니다.</S.EmptyText>
          </S.EmptyTextWrapper>
        )}
      </S.BodyContainer>

      <BottomNavigation
        startDestination="agenda"
        destinations={bottomItems}
        onItemClick={(itemId) => navigate(moveToDestination(itemId))}
      />

      {isLogoutDialogOpen && (
        <LogoutDialog
          onDismiss={() => setLogoutDialogOpen(false)}
          onConfirm={() => setLogoutDialogOpen(false)}
        />
      )}

      {selectedChatRoomEnter && (
        <ChatEnterDialog
          onConfirm={() => {
            enterChatRoom();
          }}
          onDismiss={() => setSelectedChatRoomEnter(null)}
        />
      )}
    </S.Container>
  );
};

export default AgendaPage;
