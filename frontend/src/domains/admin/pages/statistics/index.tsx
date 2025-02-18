import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TopAppBar } from '@/components/TopAppBar';
import { TabBar } from '@/components/tab-bar/TabBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import { bottomItems, moveToDestination } from '../destinations';
import { useNavigate } from 'react-router-dom';
import { LogoutDialog } from '@/components/Dialog/LogoutDialog';
import api from '@/utils/api';
import leftArrowIcon from '@/assets/icons/chevron-left.svg';
import rightArrowIcon from '@/assets/icons/chevron-right.svg';
import Typography from '@/styles/Typography';
import { ChatCategoryType } from '@/types/ChatCategoryType';

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

  const getCategoryInfo = (key: string) => {
    const category = ChatCategoryType[key as keyof typeof ChatCategoryType];
    return (
      category || {
        label: key,
        iconSrc: '/assets/icons/bubble.svg',
        iconBackground: '#FFDBD8',
      }
    );
  };

  // 의견 유형 이름 변환 함수
  const getOpinionTypeName = (key: string) => {
    const names: Record<string, string> = {
      IMPROVEMENT: '개선',
      NEED: '필요',
      SUGGESTION: '제안',
      INQUIRY: '궁금',
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
          <ArrowButton onClick={() => handleDateChange(-1)}>
            <img src={leftArrowIcon} alt="이전" />
          </ArrowButton>
          <Typography variant="display2">
            {isMonthly
              ? `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`
              : `${currentDate.getFullYear()}년`}
          </Typography>
          <ArrowButton onClick={() => handleDateChange(1)} disabled={!canIncrement()}>
            <img src={rightArrowIcon} alt="다음" />
          </ArrowButton>
          <ToggleGroup>
            <ToggleButton active={isMonthly} onClick={() => setIsMonthly(true)}>
              <Typography variant="heading4">월간</Typography>
            </ToggleButton>
            <ToggleButton active={!isMonthly} onClick={() => setIsMonthly(false)}>
              <Typography variant="heading4">연간</Typography>
            </ToggleButton>
          </ToggleGroup>
        </PeriodSelector>
        {currentTab === 'ask' ? (
          <>
            <StatsCard>
              <StatsTitle>말해요</StatsTitle>
              <StatsGrid currentTab={currentTab}>
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
              <OpinionKindWrapper>
                <OpinionKind>
                  {statsData &&
                    Object.entries(statsData.opinionTypeCounts).map(([key, count]) => (
                      <OpinionItem key={key}>
                        <CategoryCount>
                          <Typography variant="heading1">{count}</Typography>
                        </CategoryCount>
                        <OpinionName>
                          <Typography variant="body4">{getOpinionTypeName(key)}</Typography>
                        </OpinionName>
                      </OpinionItem>
                    ))}
                </OpinionKind>
              </OpinionKindWrapper>
            </StatsCard>

            <StatsCard>
              <StatsTitle>카테고리</StatsTitle>
              <CategoryList>
                {statsData &&
                  Object.entries(statsData.categoryTypeCounts).map(([key, count]) => {
                    const categoryInfo = getCategoryInfo(key);
                    return (
                      <CategoryItem key={key}>
                        <CategoryIcon background={categoryInfo.iconBackground}>
                          <img src={categoryInfo.iconSrc} alt={categoryInfo.label} />
                        </CategoryIcon>
                        <CategoryName>{categoryInfo.label}</CategoryName>
                        <CategoryCount>{count}</CategoryCount>
                      </CategoryItem>
                    );
                  })}
              </CategoryList>
            </StatsCard>
          </>
        ) : (
          <>
            <StatsCard>
              <StatsTitle>답해요</StatsTitle>
              <StatsGrid currentTab={currentTab}>
                <StatItem>
                  <StatValue>{agendaStats?.agendaCount || 0}</StatValue>
                  <StatLabel>개설된 채팅방수</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{agendaStats?.participateCount || 0}</StatValue>
                  <StatLabel>의견 수</StatLabel>
                </StatItem>
              </StatsGrid>
            </StatsCard>

            <StatsCard>
              <StatsTitle>카테고리</StatsTitle>
              <CategoryList>
                {agendaStats?.categoryStats.map((stat) => {
                  const categoryInfo = getCategoryInfo(stat.categoryType);
                  return (
                    <CategoryItem key={stat.categoryType}>
                      <CategoryIcon background={categoryInfo.iconBackground}>
                        <img src={categoryInfo.iconSrc} alt={categoryInfo.label} />
                      </CategoryIcon>
                      <CategoryName>{categoryInfo.label}</CategoryName>
                      <CategoryCount>{stat.count}</CategoryCount>
                    </CategoryItem>
                  );
                })}
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
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const PeriodSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? 'rgba(198, 198, 198, 1)' : 'rgba(57, 57, 57, 1)')};
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    filter: ${({ disabled }) =>
      disabled
        ? 'brightness(0) saturate(100%) invert(91%) sepia(0%) saturate(42%) hue-rotate(223deg) brightness(90%) contrast(87%)'
        : 'brightness(0) saturate(100%) invert(23%) sepia(0%) saturate(0%) hue-rotate(246deg) brightness(98%) contrast(84%)'};
  }
`;

const ToggleGroup = styled.div`
  margin-left: auto;
  display: flex;
  background: #eeeeee;
  border-radius: 20px;
  padding: 2px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  border: none;
  padding: 10px 16px;
  border-radius: 99px;
  background: ${(props) => (props.active ? '#FFFFFF' : 'transparent')};
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#222222' : '#C6C6C6')};
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

const StatsGrid = styled.div<{ currentTab: string }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.currentTab === 'ask' ? 3 : 2)}, 1fr);
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
const OpinionKindWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OpinionKind = styled.div`
  display: flex;
  gap: 2px;
`;

const OpinionItem = styled.div`
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OpinionName = styled.div`
  font-size: 14px;
  display: flex;
  min-width: 26px;
  align-items: center;
  justify-content: center;
  color: #8d8d8d;
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
  padding: 8px 0;
`;

const CategoryIcon = styled.div<{ background: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.background};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

const CategoryName = styled.span`
  flex: 1;
  font-size: 14px;
`;

const CategoryCount = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export default StatisticsPage;
