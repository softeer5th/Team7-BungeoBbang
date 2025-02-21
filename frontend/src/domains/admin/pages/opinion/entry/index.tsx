import { useState, useEffect, useCallback } from 'react';
import api from '@/utils/api';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { ChipList } from '@/components/Chip/ChipList';
import { EmptyState } from './EmptyState';
import { OpinionItem } from './OpinionItem';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatOpinionType } from '@/types/ChatOpinionType';
import { Opinion, OpinionResponse } from './types';
import * as S from './styles';
import { bottomItems, moveToDestination } from '../../destinations';
import { useNavigate } from 'react-router-dom';
import { findChatCategoryType } from '@/utils/findChatCategoryType';
import { useSocketManager } from '@/hooks/useSocketManager';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import { formatLastChatTime } from '@/utils/chat/lastChatTime';
import { useSocketStore, ChatMessage } from '@/store/socketStore';
import { useQuery } from '@/hooks/useQuery';
import { useCacheStore } from '@/store/cacheStore';

const chipItems = [
  { itemId: 'ALL', text: '전체' },
  ...Object.keys(ChatCategoryType).map((key) => ({
    itemId: key,
    text: ChatCategoryType[key as keyof typeof ChatCategoryType].label,
  })),
];

const OpinionEntryPage: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState('ALL');
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { subscribe } = useSocketStore();
  const { invalidateQueries } = useCacheStore();
  const [isFirstOpinion, setIsFirstOpinion] = useState(false);

  const navigate = useNavigate();
  const socketManager = useSocketManager();

  const handleChipClick = (chipId: string) => {
    setSelectedChip(chipId);
  };

  const fetchOpinions = useCallback(async () => {
    const response = await api.get('/admin/opinions');

    return response.data;
  }, []);

  // const { isLoading } =
  useQuery('adminOpinions', fetchOpinions, {
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    onSuccess: (data: OpinionResponse[]) => {
      const formattedOpinions = data.map((item) => ({
        id: String(item.opinion.id),
        category: findChatCategoryType(item.opinion.categoryType),
        title: ChatOpinionType[item.opinion.opinionType]?.label,
        text: item.lastChat.content,
        time: formatLastChatTime(item.lastChat.createdAt),
        iconColor: '#FFC107',
        hasAlarm: item.hasNewChat,
        createdAt: new Date(item.lastChat.createdAt),
        isReminded: item.opinion.isReminded,
        lastChatId: item.lastReadChatId,
      }));

      setOpinions(formattedOpinions);
      setIsFirstOpinion(true);
    },
  });

  const handleNewMessage = useCallback(
    (message: ChatMessage) => {
      // 새 메시지가 오면 캐시 무효화
      invalidateQueries('adminOpinions');

      setOpinions((prev) => {
        const opinionIndex = prev.findIndex((opinion) => Number(opinion.id) === message.opinionId);

        if (opinionIndex !== -1) {
          const updatedOpinions = [...prev];
          updatedOpinions[opinionIndex] = {
            ...updatedOpinions[opinionIndex],
            text: message.message,
            time: formatLastChatTime(message.createdAt),
            hasAlarm: true,
          };

          const [updatedOpinion] = updatedOpinions.splice(opinionIndex, 1);
          console.log('dsds', updatedOpinions);
          return [updatedOpinion, ...updatedOpinions];
        }

        return prev;
      });
    },
    [invalidateQueries],
  );

  useEffect(() => {
    const unsubscribeOpinion = subscribe('OPINION', -2, handleNewMessage);

    return () => {
      unsubscribeOpinion();
    };
  }, [subscribe, handleNewMessage]);

  const filteredOpinions =
    selectedChip === 'ALL'
      ? opinions
      : opinions.filter((opinion) => opinion.category.type === selectedChip);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        foregroundColor="rgba(22, 22, 22, 1)"
        titleColor="rgba(31, 135, 255, 1)"
        onRightIconClick={() => setLogoutDialogOpen(true)}
      />
      <S.TopAppBarBorder></S.TopAppBarBorder>
      <S.ChipListContainer>
        <ChipList
          startItem="ALL"
          itemBackgroundColor="#fff"
          onChipClick={handleChipClick}
          items={chipItems}
          sidePadding="16px"
        />
      </S.ChipListContainer>
      <S.OpinionEntryContainer>
        {filteredOpinions.length !== 0 ? (
          <S.OpinionList>
            {filteredOpinions.map((opinion) => (
              <OpinionItem
                key={opinion.id}
                category={opinion.category}
                title={opinion.title}
                text={opinion.text}
                time={opinion.time}
                hasAlarm={opinion.hasAlarm}
                onClick={() => {
                  navigate('/opinion/chat/' + opinion.id, {
                    state: {
                      opinionType: opinion.title,
                      lastChatId: opinion.lastChatId,
                      categoryType: opinion.category,
                    },
                  });
                  invalidateQueries('adminOpinions');
                  socketManager('OPINION', 'ENTER', Number(opinion.id), 'ADMIN');
                }}
                createdAt={opinion.createdAt}
                isReminded={opinion.isReminded}
              />
            ))}
          </S.OpinionList>
        ) : (
          isFirstOpinion && <EmptyState />
        )}
      </S.OpinionEntryContainer>

      <BottomNavigation
        startDestination="opinion"
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

export default OpinionEntryPage;
