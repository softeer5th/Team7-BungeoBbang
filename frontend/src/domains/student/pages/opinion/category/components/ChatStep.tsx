import Typography from '@/styles/Typography';
import * as S from '../styles';

export const ChatStep = () => {
  return (
    <S.Content>
      <S.TitleWrapper>
        <Typography variant="display1">말씀해주세요.</Typography>
        <Typography variant="body2" style={{ color: '#1F87FF' }}>
          학생회에 전달할 내용을 작성해주세요.
        </Typography>
      </S.TitleWrapper>
    </S.Content>
  );
}; 