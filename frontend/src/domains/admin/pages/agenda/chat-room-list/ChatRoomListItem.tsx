import styled, { useTheme } from 'styled-components';
import { ChatRoomListCardData, ProgressState } from './ChatRoomCardData';
import Typography from '@/styles/Typography';
import { CategoryIcon } from '@/components/CategoryIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatRoomListItemProps {
  cardData: ChatRoomListCardData;
}

export const ChatRoomListItem = ({ cardData }: ChatRoomListItemProps) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [isMoreContentVisible, setMoreContentVisible] = useState(false);

  const alarmColor =
    cardData.progressState != 1
      ? cardData.hasNew
        ? theme.colors.sementicMain
        : theme.colors.grayScale50
      : theme.colors.grayScale50;

  return (
    <CardContainer isBeforeProgress={cardData.progressState === ProgressState.BEFORE}>
      <HeaderContainer>
        <AlarmContainer>
          {!(cardData.progressState === ProgressState.IN_PROGRESS && !cardData.hasNew) && (
            <>
              <AlarmBox backgroundColor={alarmColor} />
              <AlarmText variant="caption1" textColor={alarmColor}>
                {cardData.progressState === ProgressState.FINISHED
                  ? `${cardData.numOfJoin || 0}명 참여`
                  : cardData.progressState === ProgressState.BEFORE
                    ? '진행 전'
                    : '새 의견'}
              </AlarmText>
            </>
          )}
        </AlarmContainer>

        <MoreIcon
          src="/src/assets/icons/dot-vertical.svg"
          onClick={() => setMoreContentVisible((v) => !v)}
        />
        <MoreContent visible={isMoreContentVisible}>
          <MoreContentItem>
            <ItemIcon src="/src/assets/icons/edit.svg" />
            <ItemText variant="body1" textColor={theme.colors.grayScale90}>
              수정
            </ItemText>
          </MoreContentItem>
          <MoreContentItem>
            <ItemIcon src="/src/assets/icons/trash.svg" />
            <ItemText variant="body1" textColor={theme.colors.red}>
              종료
            </ItemText>
          </MoreContentItem>
          <MoreContentItem>
            <ItemIcon src="/src/assets/icons/power.svg" />
            <ItemText variant="body1" textColor={theme.colors.red}>
              삭제
            </ItemText>
          </MoreContentItem>
        </MoreContent>
      </HeaderContainer>
      <BodyContainer onClick={() => navigate(`/agenda/chat/${cardData.roomId}`)}>
        <CategoryIcon type={cardData.chatCategoryType} iconWidth={17} padding={6} />
        <TitleText variant="heading3">{cardData.title}</TitleText>
        <DateContainer>
          <DateIcon src="/src/assets/icons/calendar.svg" />
          <DateText variant="caption2">
            {cardData.startDate}~{cardData.endDate}
          </DateText>
        </DateContainer>
      </BodyContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<{
  isBeforeProgress: boolean;
}>`
  opacity: ${(props) => (props.isBeforeProgress ? 0.6 : 1)};
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 20px;
  width: 100%;
  aspect-ratio: 1/1;
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const AlarmContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-start;
  align-items: center;
`;

const AlarmBox = styled.div<{
  backgroundColor: string;
}>`
  width: 6px;
  height: 6px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
`;

const AlarmText = styled(Typography)<{
  textColor: string;
}>`
  color: ${(props) => props.textColor};
`;

const MoreIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MoreContent = styled.div<{
  visible: boolean;
}>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  position: absolute;
  top: 38px;
  right: 0px;
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

const BodyContainer = styled.div<{
  isBeforeProgress: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 6px;
  pointer-events: ${(props) => (props.isBeforeProgress ? 'none' : 'auto')};
`;

const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale100};
`;

const DateContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.grayScale40};
  gap: 4px;
`;

const DateIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const DateText = styled(Typography)``;
