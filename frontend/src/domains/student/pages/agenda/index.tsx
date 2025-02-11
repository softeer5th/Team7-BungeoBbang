import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { ChatRoomListCardData } from './data/ChatRoomListCardData';
import { BannerContainer } from './components/Banner';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { ButtonProps } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@/components/Dialog/Dialog';
import api from '@/utils/api';
import { bottomItems } from '../destinations';
import { mapResponseToChatListCardData } from './util/ChatRoomCardMapper';

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

  const observer = useRef<IntersectionObserver | null>(null);

  const triggerItemRef = useRef<HTMLDivElement | null>(null);

  const setTriggerItemRef = (element: HTMLDivElement) => {
    if (observer.current && element) {
      observer.current.disconnect();
      observer.current.observe(element);
      triggerItemRef.current = element;
    }
  };

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

      const newRooms = response.data.map((data: any) =>
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

  useEffect(() => {
    fetchChatRooms();
    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchChatRooms();
        }
      });

      if (triggerItemRef.current) {
        observer.current.disconnect();
        observer.current.observe(triggerItemRef.current);
      }
    }

    return () => {
      if (observer.current && triggerItemRef.current) {
        observer.current.disconnect();
      }
    };
  }, []);

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
                  ref={isTriggerItem ? setTriggerItemRef : null}
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

interface ChatEnterDialogProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ChatEnterDialog: React.FC<ChatEnterDialogProps> = ({
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  const confirmButton: ButtonProps = {
    text: '입장하기',
  };

  const dismissButton: ButtonProps = {
    text: '취소',
    backgroundColor: theme.colors.grayScale10,
    textColor: theme.colors.grayScale40,
  };

  return (
    <Dialog
      body={`채팅방에 입장하시겠어요?<br/>
    입장한 채팅방의 알림은<br/>
    <span style="color: #1F87FF; font-weight: 700;">[내 의견]</span>에서 확인할 수 있습니다.`}
      onConfirm={() => onConfirm()}
      onDismiss={() => onDismiss()}
      confirmButton={confirmButton}
      dissmissButton={dismissButton}
    />
  );
};

export default AgendaPage;
