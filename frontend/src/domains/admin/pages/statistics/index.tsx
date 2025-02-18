'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TopAppBar } from '@/components/TopAppBar';
import { TabBar } from '@/components/tab-bar/TabBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems, moveToDestination } from '../destinations';
import { useNavigate } from 'react-router-dom';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import api from '@/utils/api';

interface StatisticsData {
  opinionCount: number;
  answerCount: number;
  answerRate: number;
  categoryTypeCounts: {
    ACADEMICS: number;
    FACILITIES: number;
    BUDGET: number;
    EVENTS: number;
  };
  opinionTypeCounts: {
    IMPROVEMENT: number;
    NEED: number;
    SUGGESTION: number;
    INQUIRY: number;
  };
}
interface AgendaStatisticsData {
  agendaCount: number;
  participateCount: number;
  categoryStats: Array<{
    categoryType: string;
    count: number;
  }>;
}

const StatisticsPage = () => {
  const [currentTab, setCurrentTab] = useState('ask');
  const [isMonthly, setIsMonthly] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [statsData, setStatsData] = useState<StatisticsData | null>(null);
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [agendaStats, setAgendaStats] = useState<AgendaStatisticsData | null>(null);

  const fetchData = async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

      if (currentTab === 'ask') {
        // 말해요(opinion) 통계
        const endpoint = isMonthly
          ? `/admin/opinions/statistics/month?yearMonth=${yearMonth}`
          : `/admin/opinions/statistics/year?year=${year}`;
        const response = await api.get(endpoint);
        setStatsData(response.data);
      } else {
        const [baseStats, categoryStats] = await Promise.all([
          api.get(
            isMonthly
              ? `/admin/agendas/statistics/month?year=${year}&month=${month}`
              : `/admin/agendas/statistics/year?year=${year}`,
          ),
          api.get(
            isMonthly
              ? `/admin/agendas/statistics/month/category?year=${year}&month=${month}`
              : `/admin/agendas/statistics/year/category?year=${year}`,
          ),
        ]);
        setAgendaStats({
          ...baseStats.data,
          categoryStats: categoryStats.data,
        });
      }
    } catch (error) {
      console.error('통계 데이터 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentDate, isMonthly, currentTab]);

  const handleDateChange = (increment: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (isMonthly) {
        newDate.setMonth(prev.getMonth() + increment);
      } else {
        newDate.setFullYear(prev.getFullYear() + increment);
      }
      return newDate;
    });
  };

  const tabItems = [
    { itemId: 'ask', title: '말해요' },
    { itemId: 'answer', title: '답해요' },
  ];

  // 카테고리 이름 변환 함수
  const getCategoryName = (key: string) => {
    const names: Record<string, string> = {
      ACADEMICS: '학사',
      FACILITIES: '시설·환경',
      BUDGET: '예산',
      EVENTS: '행사',
    };
    return names[key] || key;
  };

  // 의견 유형 이름 변환 함수
  const getOpinionTypeName = (key: string) => {
    const names: Record<string, string> = {
      IMPROVEMENT: '개선',
      NEED: '필요',
      SUGGESTION: '제안',
      INQUIRY: '문의',
    };
    return names[key] || key;
  };

  const canIncrement = () => {
    const today = new Date();
    if (isMonthly) {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(currentDate.getMonth() + 1);
      return nextMonth <= today;
    } else {
      return currentDate.getFullYear() < today.getFullYear();
    }
  };

  return (
    <Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        foregroundColor="rgba(22, 22, 22, 1)"
        titleColor="rgba(31, 135, 255, 1)"
        onRightIconClick={() => setLogoutDialogOpen(true)}
      />

      <TabBar
        currentDestination={currentTab}
        items={tabItems}
        onItemClick={setCurrentTab}
        backgroundColor="#FFFFFF"
        indicatorColor="#1F87FF"
        selectedTextColor="#1F87FF"
      />

      <Content>
        <PeriodSelector>
          <ArrowButton onClick={() => handleDateChange(-1)}>{'<'}</ArrowButton>
          <Period>
            {isMonthly
              ? `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`
              : `${currentDate.getFullYear()}년`}
          </Period>
          <ArrowButton onClick={() => handleDateChange(1)} disabled={!canIncrement()}>
            {'>'}
          </ArrowButton>
          <ToggleGroup>
            <ToggleButton active={isMonthly} onClick={() => setIsMonthly(true)}>
              월간
            </ToggleButton>
            <ToggleButton active={!isMonthly} onClick={() => setIsMonthly(false)}>
              연간
            </ToggleButton>
          </ToggleGroup>
        </PeriodSelector>
        {currentTab === 'ask' ? (
          <>
            <StatsCard>
              <StatsTitle>말해요</StatsTitle>
              <StatsGrid>
                <StatItem>
                  <StatValue>{statsData?.opinionCount || 0}</StatValue>
                  <StatLabel>의견 수</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{statsData?.answerCount || 0}</StatValue>
                  <StatLabel>답변 수</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{statsData?.answerRate || 0}%</StatValue>
                  <StatLabel>답변률</StatLabel>
                </StatItem>
              </StatsGrid>
            </StatsCard>

            <StatsCard>
              <StatsTitle>의견 종류</StatsTitle>
              <CategoryList>
                {statsData &&
                  Object.entries(statsData.opinionTypeCounts).map(([key, count]) => (
                    <CategoryItem key={key}>
                      <CategoryName>{getOpinionTypeName(key)}</CategoryName>
                      <CategoryCount>{count}</CategoryCount>
                    </CategoryItem>
                  ))}
              </CategoryList>
            </StatsCard>

            <StatsCard>
              <StatsTitle>카테고리</StatsTitle>
              <CategoryList>
                {statsData &&
                  Object.entries(statsData.categoryTypeCounts).map(([key, count]) => (
                    <CategoryItem key={key}>
                      <CategoryName>{getCategoryName(key)}</CategoryName>
                      <CategoryCount>{count}</CategoryCount>
                    </CategoryItem>
                  ))}
              </CategoryList>
            </StatsCard>
          </>
        ) : (
          <>
            <StatsCard>
              <StatsTitle>답해요</StatsTitle>
              <StatsGrid>
                <StatItem>
                  <StatValue>{agendaStats?.agendaCount || 0}</StatValue>
                  <StatLabel>개설한 채팅방</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{agendaStats?.participateCount || 0}</StatValue>
                  <StatLabel>참여자 수</StatLabel>
                </StatItem>
              </StatsGrid>
            </StatsCard>

            <StatsCard>
              <StatsTitle>카테고리별 통계</StatsTitle>
              <CategoryList>
                {agendaStats?.categoryStats.map((stat) => (
                  <CategoryItem key={stat.categoryType}>
                    <CategoryName>{getCategoryName(stat.categoryType)}</CategoryName>
                    <CategoryCount>{stat.count}</CategoryCount>
                  </CategoryItem>
                ))}
              </CategoryList>
            </StatsCard>
          </>
        )}
      </Content>

      <BottomNavigation
        startDestination="statistics"
        destinations={bottomItems}
        onItemClick={(itemId) => navigate(moveToDestination(itemId))}
      />
      {logoutDialogOpen && (
        <LogoutDialog
          onDismiss={() => setLogoutDialogOpen(false)}
          onConfirm={() => setLogoutDialogOpen(false)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  max-height: 100svh;
  background-color: #f5f5f5;
  overflow: hidden;
`;

const Content = styled.main`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const PeriodSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? 'rgba(198, 198, 198, 1)' : 'rgba(57, 57, 57, 1)')};
  font-size: 24px;
  padding: 8px;

  &:disabled {
    color: rgba(198, 198, 198, 1);
  }
`;

const Period = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const ToggleGroup = styled.div`
  margin-left: auto;
  display: flex;
  background: #eeeeee;
  border-radius: 20px;
  padding: 4px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  background: ${(props) => (props.active ? '#FFFFFF' : 'transparent')};
  font-size: 14px;
  cursor: pointer;
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatsTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1f87ff;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666666;
  margin-top: 4px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// const CategoryIcon = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background: #f5f5f5;
// `;

const CategoryName = styled.span`
  flex: 1;
  font-size: 14px;
`;

const CategoryCount = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export default StatisticsPage;
