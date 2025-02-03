// import React from 'react';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import BannerImg from '@/assets/imgs/school_banner.png';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigationItemProps } from '@/components/bottom-navigation/BottomNavigationItem';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  //   const [chatRooms, setChatRooms] = useState<ChatListCardData[]>([]);

  const mockData = [
    {
      roomId: '1',
      dday: 'D-2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme?.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 0,
      isInProgress: true,
    },
    {
      roomId: '2',
      dday: 'D-7',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 0,
      isInProgress: true,
    },
    {
      roomId: '3',
      dday: 'D+2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 2,
      isInProgress: false,
    },
    {
      roomId: '4',
      dday: 'D+2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 5,
      isInProgress: false,
    },
    {
      roomId: '5',
      dday: 'D+2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수요 조사',
      numOfJoin: 21,
      isInProgress: false,
    },
  ];

  useEffect(() => {
    // setChatRooms(mockData);
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
        onRightIconClick={() => {}}
      />
      {/* <S.ContentContainer>
        <S.BannerContainer>
          <S.TextContainer>
            <S.TitleText variant="heading1">함께 만들어 나가요</S.TitleText>
            <S.SubText variant="body3">학생회의 답변을 확인할 수 있어요.</S.SubText>
          </S.TextContainer>
          <S.BannerImage src={BannerImg} />
        </S.BannerContainer>

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
              <textarea
                style={{ width: '100%' }}
                value="안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
              />
              {/* <S.EmptyText variant="heading4">현재 개설된 채팅방이 없습니다.</S.EmptyText> */}
      {/* </S.EmptyTextWrapper> */}
      {/* )} */}
      {/* </S.ChatRoomList> */}
      {/* </S.ContentContainer> */}

      <BottomNavigation startDestination="my" destinations={bottomItems} />
    </S.Container>
  );
};

export default MyPage;
