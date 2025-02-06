import Typography from '@/styles/Typography';
import * as S from '../styles';
import { motion } from 'framer-motion';

export const ChatStep = () => {
  return (
    <S.Content>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, easeInOut: [0.45, 0, 0.55, 1] }}
      >
        <S.TitleWrapper>
          <Typography variant="display1">말씀해주세요.</Typography>
          <Typography variant="body2" style={{ color: '#1F87FF' }}>
            학생회에 전달할 내용을 작성해주세요.
          </Typography>
        </S.TitleWrapper>
      </motion.div>
    </S.Content>
  );
};
