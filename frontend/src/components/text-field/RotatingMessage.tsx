import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Typography from '@/styles/Typography';
import styled from 'styled-components';

const messages = [
  '어떤 점을 개선하면 좋을까요?',
  '더 나은 학교를 위해 \n 여러분의 생각을 들려주세요!',
  `더 즐거운 학교생활을 위해\n 어떤 것이 필요한가요?`,
  '여러분의 목소리를 기다립니다',
  '학교를 더 좋게 만들 \n아이디어가 있나요?',
];

export const RotatingMessages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimateWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <StyledTypography variant="display2">{messages[currentIndex]}</StyledTypography>
        </motion.div>
      </AnimatePresence>
    </AnimateWrapper>
  );
};

const AnimateWrapper = styled.div`
  height: 76px;
  display: flex;
  align-items: center;
`;
const StyledTypography = styled(Typography)`
  white-space: pre-line;
  text-align: center;
`;
