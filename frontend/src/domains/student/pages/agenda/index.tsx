import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigationItemProps } from '@/components/bottom-navigation/BottomNavigationItem';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import { ChatListCardData } from './data/ChatRoomListCardData';
import { BannerContainer } from './components/Banner';
import { ChatRoomListItem } from './components/ChatRoomListItem';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { ButtonProps } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@/components/Dialog/Dialog';

const AgendaPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [selectedChatRoomEnter, setSelectedChatRoomEnter] = useState<string | null>(null);

  const [chatRooms, setChatRooms] = useState<ChatListCardData[]>([]);

  const mockData = [
    {
      roomId: '1',
      dday: 'D-2',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme?.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 0,
      isInProgress: true,
    },
    {
      roomId: '11',
      dday: 'D-2',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme?.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 0,
      isInProgress: true,
    },
    {
      roomId: '12',
      dday: 'D-2',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme?.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 0,
      isInProgress: true,
    },
    {
      roomId: '2',
      dday: 'D-7',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 0,
      isInProgress: true,
    },
    {
      roomId: '3',
      dday: 'D+2',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 2,
      isInProgress: false,
    },
    {
      roomId: '4',
      dday: 'D+2',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 5,
      isInProgress: false,
    },
    {
      roomId: '5',
      dday: 'D+2',
      iconSrc: '/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 21,
      isInProgress: false,
    },
  ];

  useEffect(() => {
    setChatRooms(mockData);
  }, []);

  const bottomItems: BottomNavigationItemProps[] = [
    {
      itemId: 'agenda',
      iconSrc: '/src/assets/icons/message.svg',
      title: '답해요',
    },
    {
      itemId: 'opinion',
      iconSrc: '/src/assets/icons/home.svg',
      title: '말해요',
    },
    {
      itemId: 'my',
      iconSrc: '/src/assets/icons/profile.svg',
      title: '내 의견',
    },
  ];

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
            {chatRooms.map((room) => (
              <ChatRoomListItem room={room} onClick={() => setSelectedChatRoomEnter(room.roomId)} />
            ))}
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
          onConfirm={() => {
            //logout 요청
            setLogoutDialogOpen(false);
          }}
        />
      )}

      {selectedChatRoomEnter && (
        <ChatEnterDialog
          onConfirm={() => {
            navigate(`/agenda/chat/${selectedChatRoomEnter}`);
            setSelectedChatRoomEnter(null);
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
