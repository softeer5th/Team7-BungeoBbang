import Typography from '@/styles/Typography';
import styled, { useTheme } from 'styled-components';
import { ProgressState } from './ChatRoomCardData';
import { forwardRef } from 'react';
import editIcon from '@/assets/icons/edit.svg';
import powerIcon from '@/assets/icons/power.svg';
import trashIcon from '@/assets/icons/trash.svg';

interface MoreContentProps {
  progressState: ProgressState;
  onEditClick: () => void;
  onEndClick: () => void;
  onDeleteClick: () => void;
}

export const MoreContent = forwardRef<HTMLDivElement, MoreContentProps>(
  (
    { progressState, onEditClick = () => {}, onEndClick = () => {}, onDeleteClick = () => {} },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Container ref={ref}>
        {progressState === ProgressState.BEFORE && (
          <MoreContentItem onClick={onEditClick}>
            <ItemIcon src={editIcon} />
            <ItemText variant="body1" textColor={theme.colors.grayScale90}>
              수정
            </ItemText>
          </MoreContentItem>
        )}

        {progressState === ProgressState.IN_PROGRESS && (
          <>
            <MoreContentItem onClick={onEditClick}>
              <ItemIcon src={editIcon} />
              <ItemText variant="body1" textColor={theme.colors.grayScale90}>
                수정
              </ItemText>
            </MoreContentItem>
            <MoreContentItem onClick={onEndClick}>
              <ItemIcon src={trashIcon} />
              <ItemText variant="body1" textColor={theme.colors.red}>
                종료
              </ItemText>
            </MoreContentItem>
          </>
        )}

        <MoreContentItem onClick={onDeleteClick}>
          <ItemIcon src={powerIcon} />
          <ItemText variant="body1" textColor={theme.colors.red}>
            삭제
          </ItemText>
        </MoreContentItem>
      </Container>
    );
  },
);

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
