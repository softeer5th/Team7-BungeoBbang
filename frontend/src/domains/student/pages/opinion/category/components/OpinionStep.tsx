import Typography from '@/styles/Typography';
import { ChipList } from '@/components/Chip/ChipList';
import * as S from '../styles';

interface OpinionStepProps {
  opinions: Array<{ itemId: string; text: string }>;
  onOpinionSelect: (chipId: string) => void;
}

export const OpinionStep = ({ opinions, onOpinionSelect }: OpinionStepProps) => {
  return (
    <S.Content>
      <S.TitleWrapper>
        <Typography variant="display1">어떤 걸 들려주실건가요?</Typography>
        <Typography variant="body2" style={{ color: '#1F87FF' }}>
          의견 종류를 선택해주세요.
        </Typography>
      </S.TitleWrapper>
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
    </S.Content>
  );
};
