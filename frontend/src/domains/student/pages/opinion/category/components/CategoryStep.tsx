import Typography from '@/styles/Typography';
import { ChipList } from '@/components/Chip/ChipList';
import * as S from '../styles';
import { motion } from 'framer-motion';
import { ChatCategoryType } from '@/types/ChatCategoryType';

interface CategoryStepProps {
  onCategorySelect: (chipId: string) => void;
  selectedOpinion: string;
}

export const CategoryStep = ({ onCategorySelect, selectedOpinion }: CategoryStepProps) => {
  return (
    <S.Content>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, easeInOut: [0.45, 0, 0.55, 1] }}
      >
        <S.TitleWrapper>
          <Typography variant="display1">어떤 내용인가요?</Typography>
          <Typography variant="body2" style={{ color: '#1F87FF' }}>
            카테고리를 선택해주세요.
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
            key={selectedOpinion}
            items={Object.entries(ChatCategoryType).map(([itemId, { label }]) => ({
              itemId,
              text: label,
            }))}
            onChipClick={onCategorySelect}
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
            sidePadding="43px"
          />
        </S.ChipListWrapper>
      </motion.div>
    </S.Content>
  );
};
