'use client';

import { TopAppBar } from '@/components/TopAppBar';
import { BottomNavigation } from '@/components/bottom-navigation/BottomNavigation';
import ArrowUp from '@/assets/icons/full-arrow-up.svg?react';
import SchoolIcon from '@/assets/imgs/img_school.svg?react';
import PersonIcon from '@/assets/imgs/img_person.svg?react';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '@/utils/api';
import { motion } from 'framer-motion';
import { LogoutDialog as Logout } from '@/components/Dialog/LogoutDialog';
import { bottomItems, moveToDestination } from '../../destinations';
import { RotatingMessages } from '@/components/text-field/RotatingMessage';
import { useCheckNewMessages } from '@/hooks/useCheckNewMessages';
import { useQuery } from '@/hooks/useQuery';

const OpinionEntryPage = () => {
  const navigate = useNavigate();

  const [statistic, setStatistic] = useState({ opinionCount: 0, adminResponseRate: 0 });
  const [showStatistic, setShowStatistic] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useCheckNewMessages();

  const fetchStatistics = async () => {
    const response = await api.get('/student/opinions');
    return response.data;
  };

  useQuery('student-opinions-stats', fetchStatistics, {
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      if (data.opinionCount < 4) {
        setShowStatistic(false);
      } else {
        setShowStatistic(true);
        setStatistic(data);
      }
    },
    onError: () => {
      setShowStatistic(false);
    },
  });

  return (
    <>
      <S.OpinionEntryContainer>
        <TopAppBar
          leftIconSrc="/src/assets/icons/logo.svg"
          rightIconSrc="/src/assets/icons/logout.svg"
          backgroundColor="#51A2FF"
          foregroundColor="#ffffff"
          onRightIconClick={() => {
            setShowLogoutDialog(true);
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 57 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeInOut' }}
        >
          <S.TitleInputContainer>
            <S.TitleWrapper>
              <RotatingMessages />
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
        </motion.div>
        {showStatistic && (
          <S.StatisticWrapper>
            <motion.div
              initial={{ opacity: 0, y: 85 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              style={{ width: '100%' }}
            >
              <S.StatisticContainer>
                <S.StatLabel>
                  최근 30일
                  <br />
                  학생의 의견 수
                </S.StatLabel>
                <S.StatValue>
                  {statistic.opinionCount}건
                  <S.StatIcon>
                    <SchoolIcon />
                  </S.StatIcon>
                </S.StatValue>
              </S.StatisticContainer>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 85 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              style={{ width: '100%' }}
            >
              <S.StatisticContainer>
                <S.StatLabel>
                  최근 30일
                  <br />
                  학생회의 답변율
                </S.StatLabel>
                <S.StatValue>
                  {statistic.adminResponseRate}%
                  <S.StatIcon>
                    <PersonIcon />
                  </S.StatIcon>
                </S.StatValue>
              </S.StatisticContainer>
            </motion.div>
          </S.StatisticWrapper>
        )}
        <BottomNavigation
          startDestination="opinion"
          destinations={bottomItems}
          onItemClick={(itemId) => navigate(moveToDestination(itemId))}
        />
      </S.OpinionEntryContainer>
      {showLogoutDialog && (
        <Logout
          onDismiss={() => setShowLogoutDialog(false)}
          onConfirm={() => setShowLogoutDialog(true)}
        />
      )}
    </>
  );
};

export default OpinionEntryPage;
