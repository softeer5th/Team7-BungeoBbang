import Typography from '@/styles/Typography';
import { ChipList } from '@/components/Chip/ChipList';
import * as S from '../styles';
import { motion, AnimatePresence } from 'framer-motion';

interface OpinionStepProps {
  opinions: Array<{ itemId: string; text: string }>;
  onOpinionSelect: (chipId: string) => void;
}

export const OpinionStep = ({ opinions, onOpinionSelect }: OpinionStepProps) => {
  return (
    <S.Content>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, easeInOut: [0.45, 0, 0.55, 1] }}
        >
          <S.TitleWrapper>
            <Typography variant="display1">어떤 걸 들려주실건가요?</Typography>
            <Typography variant="body2" style={{ color: '#1F87FF' }}>
              의견 종류를 선택해주세요.
            </Typography>
          </S.TitleWrapper>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, easeInOut: [0.45, 0, 0.55, 1], delay: 0.1 }}
        >
          <S.ChipListWrapper>
            <ChipList
              items={opinions}
              onChipClick={onOpinionSelect}
              backgroundColor="#FFFFFF"
              itemBackgroundColor="#F5F5F5"
              itemSelectedBackgroundColor="#E8F3FF"
              itemTextColor="#A8A8A8"
              itemSelectedTextColor="#1F87FF"
              itemBorder={{
                borderWidth: '1px',
                borderColor: '#E0E0E0',
                selectedBorderColor: '#1F87FF',
                borderRadius: '100px',
              }}
            />
          </S.ChipListWrapper>
        </motion.div>
      </AnimatePresence>
    </S.Content>
  );
};
