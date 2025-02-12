import { useState } from 'react';
import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { ChipList } from '@/components/Chip/ChipList';
import { EmptyState } from './EmptyState';
import { OpinionItem } from './OpinionItem';
import * as S from './styles';
import { bottomItems, moveToDestination } from '../../destinations';
import { useNavigate } from 'react-router-dom';

const OpinionEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChip, setSelectedChip] = useState('1');
  const [hasOpinions, setHasOpinions] = useState(1); // 실제로는 API 응답에 따라 설정

  const chipItems = [
    { itemId: '1', text: '전체' },
    { itemId: '2', text: '학사' },
    { itemId: '3', text: '시설환경' },
    { itemId: '4', text: '예산' },
    { itemId: '5', text: '동아리' },
    { itemId: '6', text: '행사' },
  ];

  // 예시 데이터 - 실제로는 API에서 받아올 것
  const opinions = [
    {
      id: '1',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요. 추가...',
      time: '14:50',
      iconColor: '#E8F3FF',
    },
    {
      id: '2',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요...',
      time: '14:02',
      iconColor: '#E8F3FF',
    },
    {
      id: '1',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요. 추가...',
      time: '14:50',
      iconColor: '#E8F3FF',
    },
    {
      id: '2',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요...',
      time: '14:02',
      iconColor: '#E8F3FF',
    },
    {
      id: '1',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요. 추가...',
      time: '14:50',
      iconColor: '#E8F3FF',
    },
    {
      id: '2',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요...',
      time: '14:02',
      iconColor: '#E8F3FF',
    },
    {
      id: '1',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요. 추가...',
      time: '14:50',
      iconColor: '#E8F3FF',
    },
    {
      id: '2',
      category: '학사',
      title: '제안할께요',
      text: '전공 필수 과목 수업을 들어야 졸업을 하는데, 수강신청에서 너무 빨리 마감됐어요...',
      time: '14:02',
      iconColor: '#E8F3FF',
    },
  ];

  const handleChipClick = (chipId: string) => {
    setSelectedChip(chipId);

    //for lint
    console.log(selectedChip);
    setHasOpinions(1);

    // 여기서 필터링된 의견 목록을 가져오는 API 호출
  };

  return (
    <>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        backgroundColor="#ffffff"
        foregroundColor="rgba(22, 22, 22, 1)"
        titleColor="rgba(31, 135, 255, 1)"
      />
      <S.TopAppBarBorder></S.TopAppBarBorder>

      <S.OpinionEntryContainer>
        <S.ChipListContainer>
          <ChipList onChipClick={handleChipClick} items={chipItems} sidePadding="16px" />
        </S.ChipListContainer>

        {hasOpinions ? (
          <S.OpinionList>
            {opinions.map((opinion) => (
              <OpinionItem
                key={opinion.id}
                // category={opinion.category}
                title={opinion.title}
                text={opinion.text}
                time={opinion.time}
                iconColor={opinion.iconColor}
              />
            ))}
          </S.OpinionList>
        ) : (
          <EmptyState />
        )}
      </S.OpinionEntryContainer>

      <BottomNavigation
        startDestination="opinion"
        destinations={bottomItems}
        onItemClick={(itemId) => navigate(moveToDestination(itemId))}
      />
    </>
  );
};

export default OpinionEntryPage;
