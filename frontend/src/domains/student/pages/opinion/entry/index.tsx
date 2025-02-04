import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import Typography from '@/styles/Typography';
import ArrowUp from '@/assets/icons/full-arrow-up.svg?react';
import SchoolIcon from '@/assets/imgs/img_school.svg?react';
import PersonIcon from '@/assets/imgs/img_person.svg?react';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

const OpinionEntryPage = () => {
  const destinations = [
    {
      itemId: 'home',
      iconSrc: '/src/assets/react.svg',
      title: '답해요',
    },
    {
      itemId: 'search',
      iconSrc: '/src/assets/react.svg',
      title: '말해요',
    },
    {
      itemId: 'profile',
      iconSrc: '/src/assets/react.svg',
      title: '내의견',
      hasAlarm: true,
    },
  ];

  const navigate = useNavigate();

  return (
    <S.OpinionEntryContainer>
      <TopAppBar
        leftIconSrc="/src/assets/icons/logo.svg"
        rightIconSrc="/src/assets/icons/logout.svg"
        backgroundColor="#51A2FF"
        foregroundColor="#ffffff"
      />

      <S.TitleInputContainer>
        <S.TitleWrapper>
          <Typography variant="display2">더 나은 학교를 위해</Typography>
          <Typography variant="display2">여러분의 생각을 들려주세요!</Typography>
        </S.TitleWrapper>
        <S.SubTitle>여러분의 의견에 대해 빠른 시일에 답변드리겠습니다.</S.SubTitle>
        <S.InputContainer
          onClick={() => {
            navigate('/opinion/category');
          }}
        >
          <S.Input />
          <S.SendButton>
            <ArrowUp fill="#ffffff" stroke="#ffffff" />
          </S.SendButton>
        </S.InputContainer>
      </S.TitleInputContainer>
      <S.StatisticWrapper>
        <S.StatisticContainer>
          <S.StatLabel>
            최근 30일
            <br />
            학생의 의견 수
          </S.StatLabel>
          <S.StatValue>
            15건
            <S.StatIcon>
              <SchoolIcon />
            </S.StatIcon>
          </S.StatValue>
        </S.StatisticContainer>
        <S.StatisticContainer>
          <S.StatLabel>
            최근 30일
            <br />
            학생회의 답변율
          </S.StatLabel>
          <S.StatValue>
            86%
            <S.StatIcon>
              <PersonIcon />
            </S.StatIcon>
          </S.StatValue>
        </S.StatisticContainer>
      </S.StatisticWrapper>
      <BottomNavigation startDestination="home" destinations={destinations} />
    </S.OpinionEntryContainer>
  );
};

export default OpinionEntryPage;
