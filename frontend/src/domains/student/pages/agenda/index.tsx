// import React from 'react';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigationItemProps } from '@/components/bottom-navigation/BottomNavigationItem';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import { ChatListCardData } from './ChatRoomListCardData.tsx';
import { ChatRoomListItem } from './chat-room-list-item/ChatRoomListItem.tsx';
import { useNavigate } from 'react-router-dom';
import { BannerContainer } from './Banner.tsx';

const AgendaPage = () => {
  const theme = useTheme();

  const navigate = useNavigate();

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
      iconSrc: '/assets/icons/message.svg',
      title: '답해요',
    },
    {
      itemId: 'opinion',
      iconSrc: '/assets/icons/home.svg',
      title: '말해요',
    },
    {
      itemId: 'my',
      iconSrc: '/assets/icons/profile.svg',
      title: '내 의견',
    },
  ];

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/assets/icons/logo.svg"
        rightIconSrc="/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        backgroundColor={theme.colors.grayScale10}
        onRightIconClick={() => {}}
      />
      <S.BodyContainer>
        <BannerContainer />
        <S.ChatRoomList>
          {chatRooms && chatRooms.length > 0 ? (
            chatRooms.map((room) => (
              <ChatRoomListItem
                room={room}
                onCardClick={() => {
                  navigate(`/agenda/chat/${room.roomId}`);
                }}
              />
            ))
          ) : (
            <S.EmptyTextWrapper>
              <S.EmptyText variant="heading4">현재 개설된 채팅방이 없습니다.</S.EmptyText>
            </S.EmptyTextWrapper>
          )}
        </S.ChatRoomList>
      </S.BodyContainer>

      <BottomNavigation startDestination="agenda" destinations={bottomItems} />
    </S.Container>
  );
};

export default AgendaPage;
