import styled, { useTheme } from 'styled-components';
import { ChatRoomListCardData } from './ChatRoomCardData';
import Typography from '@/styles/Typography';

interface ChatRoomListItemProps {
  cardData: ChatRoomListCardData;
}

export const ChatRoomListItem = ({ cardData }: ChatRoomListItemProps) => {
  const theme = useTheme();

  const alarmColor = cardData.isInProgress
    ? cardData.hasNew
      ? theme.colors.sementicMain
      : theme.colors.grayScale50
    : theme.colors.grayScale50;

  return (
    <CardContainer>
      <HeaderContainer>
        <AlarmContainer>
          <AlarmBox backgroundColor={alarmColor} />
          <AlarmText variant="caption1" textColor={alarmColor}>
            {cardData.isInProgress
              ? cardData.hasNew
                ? '새 의견'
                : '진행 전'
              : `${cardData.numOfJoin || 0}명 참여`}
          </AlarmText>
        </AlarmContainer>

        <MoreIcon src="/src/assets/icons/dot-vertical.svg" />
      </HeaderContainer>
      <BodyContainer>
        <IconBox></IconBox>
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

const CardContainer = styled.div`
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

const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 6px;
`;

const IconBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: blue;
  border-radius: 50%;
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
