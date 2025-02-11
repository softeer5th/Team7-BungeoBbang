import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { useRef, useState } from 'react';
import { ChatRoomListCardData } from './data/ChatRoomListCardData';
import { BannerContainer } from './components/Banner';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import { bottomItems } from '../destinations';
import { mapResponseToChatListCardData, ServerData } from './util/ChatRoomCardMapper';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { ChatEnterDialog } from './components/ChatEnterDialog';

const AgendaPage = () => {
  const MAX_PAGE_ITEMS = 6;
  const TRIGGER_REST_ITEMS = 3;

  const theme = useTheme();
  const navigate = useNavigate();

  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [selectedChatRoomEnter, setSelectedChatRoomEnter] = useState<number | null>(null);

  const lastChatRoom = useRef<[string, number] | null>(null);

  const hasMore = useRef<boolean>(true);
  const isInProgessEnd = useRef<boolean>(false);
  const [chatRooms, setChatRooms] = useState<ChatRoomListCardData[]>([]);

  const fetchChatRooms = async () => {
    if (!hasMore.current) return;

    try {
      const status = isInProgessEnd.current ? 'CLOSED' : 'ACTIVE';
      const params = {
        status: status,
        ...(lastChatRoom.current
          ? { endDate: lastChatRoom.current[0], agendaId: lastChatRoom.current[1] }
          : {}),
      };

      const response = await api.get('/student/agendas', {
        params: params,
      });

      const newRooms = response.data.map((data: ServerData) =>
        mapResponseToChatListCardData(data, status),
      );

      setChatRooms((prev) => [...prev, ...newRooms]);

      if (newRooms.length < MAX_PAGE_ITEMS) {
        if (!isInProgessEnd.current) {
          isInProgessEnd.current = true;
        } else {
          hasMore.current = false;
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const enterChatRoom = async () => {
    try {
      await api.post(`/student/agendas/${selectedChatRoomEnter}`);

      navigate(`/agenda/chat/${selectedChatRoomEnter}?isEnd=false&isParticipate=true`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const { setTriggerItem } = useInfiniteScroll({
    fetchMore: fetchChatRooms,
    hasMore: isInProgessEnd.current == false || hasMore.current === true,
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
                <ChatRoomListItem
                  key={room.roomId}
                  ref={isTriggerItem ? setTriggerItem : null}
                  room={room}
                  onClick={() => {
                    const isEnd = !room.isInProgress;
                    const isParticipate = room.isParticipate;
                    if (isEnd || isParticipate) {
                      navigate(
                        `/agenda/chat/${room.roomId}?isEnd=${isEnd}&isParticipate=${isParticipate}`,
                      );
                    }
                    setSelectedChatRoomEnter(room.roomId);
                  }}
                />
              );
            })}
          </S.ChatRoomList>
        ) : (
          <S.EmptyTextWrapper>
            <S.EmptyText variant="heading4">현재 개설된 채팅방이 없습니다.</S.EmptyText>
          </S.EmptyTextWrapper>
        )}
      </S.BodyContainer>

      <BottomNavigation startDestination="agenda" destinations={bottomItems} />

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
