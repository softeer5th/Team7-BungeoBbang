import Typography from '@/styles/Typography';
import styled, { useTheme } from 'styled-components';

interface MoreContentProps {
  onEditClick: () => void;
  onEndClick: () => void;
  onDeleteClick: () => void;
}

export const MoreContent = ({
  onEditClick = () => {},
  onEndClick = () => {},
  onDeleteClick = () => {},
}: MoreContentProps) => {
  const theme = useTheme();

  return (
    <Container>
      <MoreContentItem onClick = {onEditClick}>
        <ItemIcon src="/src/assets/icons/edit.svg" />
        <ItemText variant="body1" textColor={theme.colors.grayScale90}>
          수정
        </ItemText>
      </MoreContentItem>
      <MoreContentItem onClick = {onEndClick}>
        <ItemIcon src="/src/assets/icons/trash.svg" />
        <ItemText variant="body1" textColor={theme.colors.red}>
          종료
        </ItemText>
      </MoreContentItem>
      <MoreContentItem onClick = {onDeleteClick}>
        <ItemIcon src="/src/assets/icons/power.svg" />
        <ItemText variant="body1" textColor={theme.colors.red}>
          삭제
        </ItemText>
      </MoreContentItem>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 52px;
  right: 14px;
  padding: 4px 8px 4px 8px;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 13px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px #0000001a;

  & > * + * {
    /* 첫 번째 요소를 제외한 모든 요소 앞에 적용 */
    position: relative;
  }

  & > * + *::before {
    content: '';
    height: 1px; /* Divider 크기 */
    width: 100%;
    background-color: ${(props) => props.theme.colors.grayScale10};
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MoreContentItem = styled.div`
  width: 100%;
  padding: 8px 12px 8px 12px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const ItemIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const ItemText = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
`;
