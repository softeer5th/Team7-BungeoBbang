import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import * as S from './styles';
import { TopAppBar } from '@/components/TopAppBar';
import { useTheme } from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
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
import { TabBarContainer } from '@/components/tab-bar/TabBarCotainer.tsx';
import { useQuery } from '@/hooks/useQuery';
import { useCacheStore } from '@/store/cacheStore';

const tabItems: TabBarItemProps[] = [
  { itemId: 'opinion', title: '말해요' },
  { itemId: 'agenda', title: '답해요' },
];

const MyPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { subscribe } = useSocketStore();
  const { invalidateQueries } = useCacheStore();

  const [tabContents, setTabContents] = useState<Record<string, ChatPreviewData[]>>({
    opinion: [],
    agenda: [],
  });
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const fetchOpinions = useCallback(async () => {
    const response = await api.get('/student/opinions/my');
    return response.data.map((data: OpinionServerData) =>
      mapOpinionResponseToChatPreviewData(data),
    );
  }, []);

  const fetchAgendas = useCallback(async () => {
    const response = await api.get('/student/agendas/my');
    return response.data.map((data: AgendaServerData) => mapAgendaResponseToChatPreviewData(data));
  }, []);

  const handleOpinionSuccess = useCallback((data: ChatPreviewData[]) => {
    setTabContents((prev) => ({ ...prev, opinion: data }));
  }, []);

  const handleAgendaSuccess = useCallback((data: ChatPreviewData[]) => {
    setTabContents((prev) => ({ ...prev, agenda: data }));
  }, []);

  const { refetch: refetchOpinions } = useQuery('my-opinions', fetchOpinions, {
    staleTime: 3 * 60 * 1000,
    onSuccess: handleOpinionSuccess,
  });

  const { refetch: refetchAgendas } = useQuery('my-agendas', fetchAgendas, {
    staleTime: 3 * 60 * 1000,
    onSuccess: handleAgendaSuccess,
  });

  const handleNewMessage = useCallback(
    (message: ChatMessage) => {
      const type = message.roomType.toLowerCase();
      const targetRoomId = message.roomType === 'OPINION' ? message.opinionId : message.agendaId;

      setTabContents((prev) => {
        const currentContent = [...(prev[type] || [])];
        const roomIndex = currentContent.findIndex((item) => item.roomId === targetRoomId);

        if (roomIndex === -1) return prev;

        const updatedRoom = {
          ...currentContent[roomIndex],
          lastMessage: message.message,
          lastSendTime: message.createdAt,
          hasNewChat: true,
        };

        currentContent.splice(roomIndex, 1);
        const newContent = [updatedRoom, ...currentContent];

        // 캐시 업데이트
        if (type === 'opinion') {
          invalidateQueries('my-opinions');
        } else {
          invalidateQueries('my-agendas');
        }

        return {
          ...prev,
          [type]: newContent,
        };
      });
    },
    [invalidateQueries],
  );

  useEffect(() => {
    const unsubscribeOpinion = subscribe('OPINION', -1, handleNewMessage);
    const unsubscribeAgenda = subscribe('AGENDA', -1, handleNewMessage);

    return () => {
      unsubscribeOpinion();
      unsubscribeAgenda();
    };
  }, [subscribe, handleNewMessage]);

  useEffect(() => {
    refetchOpinions();
    refetchAgendas();
  }, [refetchOpinions, refetchAgendas]);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        titleColor={theme.colors.sementicMain}
        onRightIconClick={() => setLogoutDialogOpen(true)}
      />
      <TabBarContainer
        tabItems={tabItems}
        currentTabSelectedIndex={Number(sessionStorage.getItem('activeTabIndex')) || 0}
        contents={(index) => {
          const tab = tabItems[index];
          const content = tabContents[tab.itemId] || [];
          return content.length > 0 ? (
            <S.ChatPreviewList>
              {content.map((c) => (
                <ChatPreviewItem key={c.roomId} chatData={c} />
              ))}
            </S.ChatPreviewList>
          ) : (
            <EmptyContent showIcon={true} text={'현재 개설된 채팅방이 없습니다.'} />
          );
        }}
      />
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
