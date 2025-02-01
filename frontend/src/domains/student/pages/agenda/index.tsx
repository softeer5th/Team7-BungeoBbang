// import React from 'react';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import BannerImg from '@/assets/imgs/school_banner.png';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigationItemProps } from '@/components/bottom-navigation/BottomNavigationItem';
import { useTheme } from 'styled-components';
import { useState } from 'react';

const AgendaPage = () => {
  const theme = useTheme();

  const [chatRooms, setChatRooms] = useState([
    {
      roomId: '1',
      dday: 'D-2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme?.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수오 조사',
      numOfJoin: 0,
      isInProgress: false,
    },
    {
      roomId: '2',
      dday: 'D-7',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수오 조사',
      numOfJoin: 0,
      isInProgress: false,
    },
    {
      roomId: '3',
      dday: 'D+2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수오 조사',
      numOfJoin: 2,
      isInProgress: true,
    },
    {
      roomId: '4',
      dday: 'D+2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수오 조사',
      numOfJoin: 2,
      isInProgress: true,
    },
    {
      roomId: '5',
      dday: 'D+2',
      iconSrc: '/src/assets/icons/school.svg',
      iconBackgroundColor: theme.colors.icnGreen,
      title: '2025학년도 1학기 수강 신청 수오 조사',
      numOfJoin: 21,
      isInProgress: true,
    },
  ]);

  const bottomItems: BottomNavigationItemProps[] = [
    {
      itemId: 'option',
      iconSrc: '/src/assets/icons/message.svg',
      title: '말해요',
    },
    {
      itemId: 'agenda',
      iconSrc: '/src/assets/icons/home.svg',
      title: '답해요',
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
            <S.ChatRoomListItem key={room.roomId}>
              <S.DDayTextContainer>
                <S.DDayText variant="heading2">{room.dday}</S.DDayText>
              </S.DDayTextContainer>
              <S.ContentWrapper>
                <S.IconContainer>
                  <S.IconBox backgroundColor={room.iconBackgroundColor}>
                    <img src={room.iconSrc} width="17px" height="17px" />
                  </S.IconBox>
                </S.IconContainer>
                <S.CardTitleText variant="heading2">{room.title}</S.CardTitleText>
              </S.ContentWrapper>
              <S.JoinContainer>
                <S.JoinNumberText variant="caption1">{room.numOfJoin}명</S.JoinNumberText>
                <S.ProgressText variant="caption1">
                  {room.isInProgress ? '참여중' : '참여 완료'}
                </S.ProgressText>
              </S.JoinContainer>
            </S.ChatRoomListItem>
          ))
        ) : (
          <S.EmptyTextWrapper>
            <S.EmptyText variant="heading4">현재 개설된 채팅방이 없습니다.</S.EmptyText>
          </S.EmptyTextWrapper>
        )}
      </S.ChatRoomList>

      <BottomNavigation startDestination="option" destinations={bottomItems} />
    </S.Container>
  );
};

export default AgendaPage;
