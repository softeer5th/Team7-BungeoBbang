// import React from 'react';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigationItemProps } from '@/components/bottom-navigation/BottomNavigationItem';
import { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import EmptyIcon from '/src/assets/imgs/message.png';
import { ChatOpinionType, ChatCategoryType, ChatPreviewData } from './ChatPreviewData';
import { ChatPreviewItem } from './chat-preview/ChatPreviewItem.tsx';

const MyPage = () => {
  const theme = useTheme();

  //   const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [tabBarContent, setTabBarContent] = useState<Record<string, ChatPreviewData[]>>({});

  const tabItems: TabBarItemProps[] = [
    {
      itemId: 'opinion',
      title: '말해요',
    },
    {
      itemId: 'agenda',
      title: '답해요',
    },
  ];

  const mockData: Record<string, ChatPreviewData[]> = {
    opinion: [
      {
        roomId: '1',
        opinionType: ChatOpinionType.NEED,
        categoryType: ChatCategoryType.CLUBS,
        lastSendTime: '13:20',
        lastMessage:
          '안녕하세요, 귀한 의견 감사드립니다. 말씀 주신 기숙사에서 A역 또는 B역으로 가는 노선 추가 요청은 ',
        isUnread: true,
      },
      {
        roomId: '2',
        opinionType: ChatOpinionType.SUGGESTION,
        categoryType: ChatCategoryType.ACADEMICS,
        lastSendTime: '09:45',
        lastMessage: '수업시간 조정에 대한 건의사항이 있습니다. 기존 시간대보다...',
        isUnread: false,
      },
      {
        roomId: '3',
        opinionType: ChatOpinionType.IMPROVEMENT,
        categoryType: ChatCategoryType.FACILITIES,
        lastSendTime: '17:10',
        lastMessage: '기숙사 내 와이파이 연결이 자주 끊깁니다. 개선이 필요할 것 같아요.',
        isUnread: true,
      },
      {
        roomId: '4',
        opinionType: ChatOpinionType.NEED,
        categoryType: ChatCategoryType.IT,
        lastSendTime: '20:30',
        lastMessage: '학생 포털 사이트에서 오류가 발생하는 문제가 있습니다.',
        isUnread: false,
      },
    ],
    agenda: [
      {
        roomId: '5',
        roomName: '총학생회 생활 불편 관련 2월 달 건의함입니다.',
        categoryType: ChatCategoryType.TRANSPORTATION,
        lastSendTime: 'Jan 13',
        lastMessage: '셔틀버스 배차 간격을 줄이는 것에 대한 논의가 필요합니다.',
        numOfJoin: 21,
        isInProgress: true,
        isUnread: false,
      },
      {
        roomId: '6',
        roomName: '건의함',
        categoryType: ChatCategoryType.EVENTS,
        lastSendTime: 'Jan 13',
        lastMessage: '학교 축제에서 학생 참여형 프로그램을 추가하면 어떨까요?',
        numOfJoin: 21,
        isInProgress: true,
        isUnread: false,
      },
      {
        roomId: '7',
        roomName: '2025학년도 등록금 인상 조사',
        categoryType: ChatCategoryType.BUDGET,
        lastSendTime: 'Jan 13',
        lastMessage:
          '학생회 예산 분배 방식에 대한 투명성이 필요합니다.학생회 예산 분배 방식에 대한 투명성이 필요합니다.학생회 예산 분배 방식에 대한 투명성이 필요합니다.학생회 예산 분배 방식에 대한 투명성이 필요합니다.학생회 예산 분배 방식에 대한 투명성이 필요합니다.s',
        numOfJoin: 21,
        isInProgress: false,
        isUnread: false,
      },
      {
        roomId: '8',
        roomName: '학생 의견 수렴',
        categoryType: ChatCategoryType.OTHER,
        lastSendTime: 'Jan 13',
        lastMessage: '졸업 관련 절차에 대해 문의하고 싶습니다.',
        numOfJoin: 21,
        isInProgress: true,
        isUnread: true,
      },
    ],
  };

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
    setTabBarContent(mockData);
  }, []);

  useEffect(() => {
    const scrollLeft = containerRef.current?.scrollLeft || 0;

    const width = containerRef.current?.offsetWidth || 375;

    setTranslateX(scrollLeft + -activeIndex * width);
  }, [activeIndex]);

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
        onRightIconClick={() => {}}
      />
      <TabBar
        currentDestination={tabItems[activeIndex].itemId}
        items={tabItems}
        onItemClick={(itemId) =>
          setActiveIndex(tabItems.findIndex((item) => item.itemId === itemId))
        }
      />
      <S.TabContentContainer
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {tabItems.map((tab) => {
          const content = tabBarContent[tab.itemId] || [];
          return (
            <S.TabContent key={tab.itemId} transX={translateX}>
              {content.length > 0 ? (
                <S.ChatPreviewList>
                  {content.map((c) => (
                    <ChatPreviewItem key={c.roomId} chatData={c} />
                  ))}
                </S.ChatPreviewList>
              ) : (
                <S.EmptyTextWrapper>
                  <S.EmpytIcon src={EmptyIcon} />
                  <S.EmptyText variant="heading4">현재 개설된 채팅방이 없습니다.</S.EmptyText>
                </S.EmptyTextWrapper>
              )}
            </S.TabContent>
          );
        })}
      </S.TabContentContainer>
      <BottomNavigation startDestination="my" destinations={bottomItems} />
    </S.Container>
  );
};

export default MyPage;
