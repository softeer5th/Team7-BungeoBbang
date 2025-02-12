// import React from 'react';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatPreviewData } from './data/ChatPreviewData.tsx';
import { ChatPreviewItem } from './components/ChatPreviewItem.tsx';
import { ChatOpinionType } from '@/types/ChatOpinionType.tsx';
import { ChatCategoryType } from '@/types/ChatCategoryType.tsx';
import { EmptyContent } from '@/components/EmptyContent.tsx';
import { bottomItems } from '../destinations.tsx';
import api from '@/utils/api.ts';
import { getDefaultBorderStyle } from '@/components/border/getBorderType.tsx';
import { BorderType } from '@/components/border/BorderProps.tsx';
import { Button } from '@/components/Button.tsx';
import { TextField } from '@/components/text-field/TextField.tsx';
import { CountTextField } from '@/components/text-field/CountTextField.tsx';
import {
  AgendaServerData,
  mapAgendaResponseToChatPreviewData,
  mapOpinionResponseToChatPreviewData,
  OpinionServerData,
} from './util/AgendaChatRoomMapper.tsx';

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

  const fetchChatRooms = async () => {
    const result: Record<string, ChatPreviewData[]> = {
      opinion: [],
      agenda: [],
    };

    try {
      const [opinion, agenda] = await Promise.all([
        api.get('/student/opinions/my'),
        api.get('/student/agendas/my'),
      ]);

      result.opinion = opinion.data.map((data: OpinionServerData) =>
        mapOpinionResponseToChatPreviewData(data),
      );

      result.agenda = agenda.data.map((data: AgendaServerData) =>
        mapAgendaResponseToChatPreviewData(data),
      );

      console.log('response', result);
      setTabBarContent(result);
    } catch (error) {
      console.error('fail to fetch agenda data', error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

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
    const scrollLeft = containerRef.current?.scrollLeft || 0;

    const width = containerRef.current?.offsetWidth || 375;

    setTranslateX(scrollLeft + -activeIndex * width);
  }, [activeIndex]);

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
                <EmptyContent showIcon={true} text={'현재 개설된 채팅방이 없습니다.'} />
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
