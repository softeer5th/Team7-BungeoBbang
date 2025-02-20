import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { useEffect, useRef, useState, useCallback } from 'react';
import { TabBar } from '@/components/tab-bar/TabBar';
import { TabBarItemProps } from '@/components/tab-bar/TabBarItem';
import { ChatPreviewData } from './data/ChatPreviewData.tsx';
import { ChatPreviewItem } from './components/ChatPreviewItem.tsx';
import api from '@/utils/api.ts';
import {
  AgendaServerData,
  mapAgendaResponseToChatPreviewData,
  mapOpinionResponseToChatPreviewData,
  OpinionServerData,
} from './util/AgendaChatRoomMapper.tsx';
import { bottomItems, moveToDestination } from '../destinations.tsx';
import { useNavigate } from 'react-router-dom';
import { EmptyContent } from '@/components/EmptyContent.tsx';
import { useSocketStore, ChatMessage } from '@/store/socketStore.ts';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog.tsx';

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

const MyPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { subscribe } = useSocketStore();

  const [activeIndex, setActiveIndex] = useState(() => {
    return Number(sessionStorage.getItem('activeTabIndex')) || 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [tabBarContent, setTabBarContent] = useState<Record<string, ChatPreviewData[]>>({});
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

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
      setTabBarContent(result);
    } catch (error) {
      console.error('fail to fetch agenda data', error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
    scrollTabContent(activeIndex);
  }, []);

  const handleTabContentScroll = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  const handleTabItemClick = (itemId: string) => {
    const newActiveIndex = tabItems.findIndex((item) => item.itemId === itemId);

    setActiveIndex(newActiveIndex);

    scrollTabContent(newActiveIndex);
  };

  const scrollTabContent = (index: number) => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current?.scrollLeft;
      const width = containerRef.current?.offsetWidth;

      setTranslateX(scrollLeft + -index * width);

      sessionStorage.setItem('activeTabIndex', String(index));
    }
  };

  const handleNewMessage = useCallback((message: ChatMessage) => {
    setTabBarContent((prev) => {
      const newContent = { ...prev };

      // 메시지 타입에 따라 opinion/agenda 구분
      const type = message.roomType.toLowerCase();
      const currentContent = newContent[type] || [];

      // 해당 채팅방 찾기
      const targetRoomId = message.roomType === 'OPINION' ? message.opinionId : message.agendaId;
      const roomIndex = currentContent.findIndex((item) => item.roomId === targetRoomId);

      if (roomIndex !== -1) {
        // 기존 채팅방이 있으면 최신 메시지로 업데이트하고 맨 위로 이동
        const updatedRoom = {
          ...currentContent[roomIndex],
          lastMessage: message.message,
          lastSendTime: message.createdAt,
          hasNewChat: true,
        };

        // 해당 채팅방을 제거하고 맨 앞에 추가
        currentContent.splice(roomIndex, 1);
        newContent[type] = [updatedRoom, ...currentContent];
      }

      return newContent;
    });
  }, []);

  useEffect(() => {
    const unsubscribeOpinion = subscribe('OPINION', -1, handleNewMessage);
    const unsubscribeAgenda = subscribe('AGENDA', -1, handleNewMessage);

    return () => {
      unsubscribeOpinion();
      unsubscribeAgenda();
    };
  }, [subscribe, handleNewMessage]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        onRightIconClick={() => setLogoutDialogOpen(true)}
      />
      <TabBar
        currentDestination={tabItems[activeIndex].itemId}
        items={tabItems}
        onItemClick={handleTabItemClick}
      />
      <S.TabContentContainer ref={containerRef} onScroll={handleTabContentScroll}>
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
      <BottomNavigation
        startDestination="my"
        destinations={bottomItems}
        onItemClick={(itemId) => navigate(moveToDestination(itemId))}
      />
      {isLogoutDialogOpen && (
        <LogoutDialog
          onDismiss={() => setLogoutDialogOpen(false)}
          onConfirm={() => setLogoutDialogOpen(false)}
        />
      )}
    </S.Container>
  );
};

export default MyPage;
