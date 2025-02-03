import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import Typography from '@/styles/Typography';
import ArrowUp from '@/assets/icons/full-arrow-up.svg?react';
import * as S from './styles';
const OpinionEntryPage = () => {
  const destinations = [
    {
      itemId: 'home',
      iconSrc: '/src/assets/react.svg',
      title: 'Home',
    },
    {
      itemId: 'search',
      iconSrc: '/src/assets/react.svg',
      title: 'Search',
    },
    {
      itemId: 'profile',
      iconSrc: '/src/assets/react.svg',
      title: 'Profile',
      hasAlarm: true,
    },
  ];

  return (
    <S.OpinionEntryContainer>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        backgroundColor="#51A2FF"
        foregroundColor="#ffffff"
      />
      <S.TitleInputContainer>
        <Typography variant="display2">
          더 나은 학교를 위해 <br />
        </Typography>
        <Typography variant="display2">여러분의 생각을 들려주세요!</Typography>

        <S.SubTitle>여러분의 의견에 대해 빠른 시일에 답변드리겠습니다.</S.SubTitle>
        <S.InputContainer>
          <S.Input />
          <S.SendButton>
            <ArrowUp fill="#ffffff" stroke="#ffffff" />
          </S.SendButton>
        </S.InputContainer>
      </S.TitleInputContainer>
      {/* <S.StatisticContainer>
        <S.OpinionNumber></S.OpinionNumber>
        <S.AnswerRate></S.AnswerRate>
      </S.StatisticContainer> */}
      <BottomNavigation startDestination="home" destinations={destinations} />
    </S.OpinionEntryContainer>
  );
};

export default OpinionEntryPage;
