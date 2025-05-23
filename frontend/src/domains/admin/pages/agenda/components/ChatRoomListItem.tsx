import styled, { useTheme } from 'styled-components';
import { ChatRoomListCardData, ProgressState } from './ChatRoomCardData';
import Typography from '@/styles/Typography';
import { CategoryIcon } from '@/components/CategoryIcon';
import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreContent } from './MoreContent';
import { formatDate } from '../util/ChatRoomMapper';
import dotVertical from '@/assets/icons/dot-vertical.svg';
import calendar from '@/assets/icons/calendar.svg';

interface ChatRoomListItemProps {
  cardData: ChatRoomListCardData;
  onCardEdit: () => void;
  onCardEnd: () => void;
  onCardDelete: () => void;
}

export const ChatRoomListItem = forwardRef<HTMLDivElement, ChatRoomListItemProps>(
  ({ cardData, onCardEdit = () => {}, onCardEnd = () => {}, onCardDelete = () => {} }, ref) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isMoreContentVisible, setMoreContentVisible] = useState(false);

    const alarmColor =
      cardData.progressState != ProgressState.FINISHED
        ? cardData.hasNew && cardData.progressState == ProgressState.IN_PROGRESS
          ? theme.colors.sementicMain
          : theme.colors.grayScale50
        : theme.colors.grayScale50;

    return (
      <CardWrapper ref={ref}>
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
            <MoreIcon src={dotVertical} onClick={() => setMoreContentVisible((v) => !v)} />
          </HeaderContainer>
          <BodyContainer
            isBeforeProgress={cardData.progressState === ProgressState.BEFORE}
            onClick={() => {
              const isEnd = cardData.progressState === ProgressState.FINISHED;
              navigate(
                `/agenda/chat/${cardData.roomId}?isEnd=${isEnd}&lastReadChatId=${cardData.lastReadChatId}`,
              );
            }}
          >
            <CategoryIcon type={cardData.chatCategoryType} boxSize={30} iconWidth={17} />
            <TitleText variant="heading3">{cardData.title}</TitleText>
            <DateContainer>
              <DateIcon src={calendar} />
              <DateText variant="caption2">
                {formatDate(cardData.startDate)} ~ {formatDate(cardData.endDate)}
              </DateText>
            </DateContainer>
          </BodyContainer>
        </CardContainer>
        {isMoreContentVisible && (
          <MoreContent
            progressState={cardData.progressState}
            onEditClick={onCardEdit}
            onEndClick={onCardEnd}
            onDeleteClick={onCardDelete}
          />
        )}
      </CardWrapper>
    );
  },
);

const CardWrapper = styled.div`
  position: relative;
`;

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
  opacity: 1;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  width: 100%;
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
