import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { ChipList } from '@/components/Chip/ChipList';
import { EmptyState } from './EmptyState';
import { OpinionItem } from './OpinionItem';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import { ChatOpinionType } from '@/types/ChatOpinionType';
import { bottomItems } from '../../destinations.tsx';
import { Opinion, OpinionResponse } from './types';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

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
  const navigate = useNavigate();

  const handleChipClick = (chipId: string) => {
    setSelectedChip(chipId);
    console.log('chipId', chipId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin/opinions');
        console.log('response', response);
        const formattedOpinions = response.data.map((item: OpinionResponse) => ({
          id: String(item.opinion.id),
          category: ChatCategoryType[item.opinion.categoryType],
          title: ChatOpinionType[item.opinion.opinionType],
          text: item.lastChat.content,
          time: new Date(item.lastChat.createdAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            dayPeriod: undefined,
          }),
          iconColor: '#FFC107',
          hasAlarm: item.hasNewChat,
          createdAt: item.lastChat.createdAt,
          isReminded: item.opinioon.isReminded,
        }));

        setOpinions(formattedOpinions);
      } catch (error) {
        console.error('fail to get opinions', error);
      }
    };
    fetchData();
  }, []);

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
      />
      <S.TopAppBarBorder></S.TopAppBarBorder>
      <S.ChipListContainer>
        <ChipList
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
                onClick={() => navigate('/opinion/chat/' + opinion.id)}
                createdAt={opinion.createdAt}
              />
            ))}
          </S.OpinionList>
        ) : (
          <EmptyState />
        )}
      </S.OpinionEntryContainer>
      <BottomNavigation startDestination="home" destinations={bottomItems} />
    </S.Container>
  );
};

export default OpinionEntryPage;
