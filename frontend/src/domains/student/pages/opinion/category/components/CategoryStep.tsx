import Typography from '@/styles/Typography';
import { ChipList } from '@/components/Chip/ChipList';
import * as S from '../styles';

interface CategoryStepProps {
  categories: Array<{ itemId: string; text: string }>;
  onCategorySelect: (chipId: string) => void;
  selectedOpinion: string;
}

export const CategoryStep = ({ categories, onCategorySelect, selectedOpinion }: CategoryStepProps) => {
  return (
    <S.Content>
      <S.TitleWrapper>
        <Typography variant="display1">어떤 내용인가요?</Typography>
        <Typography variant="body2" style={{ color: '#1F87FF' }}>
          카테고리를 선택해주세요.
        </Typography>
      </S.TitleWrapper>
      <S.ChipListWrapper>
        <ChipList
          key={selectedOpinion}
          items={categories}
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
        />
      </S.ChipListWrapper>
    </S.Content>
  );
}; 