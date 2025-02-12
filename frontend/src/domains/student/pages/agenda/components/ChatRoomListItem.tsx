import { forwardRef } from 'react';
import { ChatRoomListCardData } from '../data/ChatRoomListCardData.tsx';
import * as S from './styles.ts';

interface ChatRoomListItemProps {
  room: ChatRoomListCardData;
  onClick: () => void;
}

export const ChatRoomListItem = forwardRef<HTMLDivElement, ChatRoomListItemProps>(
  ({ room, onClick }, ref) => {
    return (
      <S.ChatRoomListItem ref={ref} key={room.roomId} onClick={() => onClick()}>
        <S.DDayTextContainer>
          <S.DDayText variant="heading2" isInProgress={room.isInProgress}>
            {room.dday}
          </S.DDayText>
        </S.DDayTextContainer>
        <S.ContentWrapper>
          <S.IconContainer>
            <S.IconBox backgroundColor={room.categoryType.iconBackground}>
              <img src={room.categoryType.iconSrc} width="17px" height="17px" />
            </S.IconBox>
          </S.IconContainer>
          <S.CardTitleText variant="heading2" isInProgress={room.isInProgress}>
            {room.title}
          </S.CardTitleText>
        </S.ContentWrapper>
        <S.JoinContainer>
          <S.JoinNumberText variant="caption1" isInProgress={room.isInProgress}>
            {room.numOfJoin}명
          </S.JoinNumberText>
          <S.ProgressText variant="caption1" isInProgress={room.isInProgress}>
            {room.isInProgress ? '참여 중' : '참여 완료'}
          </S.ProgressText>
        </S.JoinContainer>
      </S.ChatRoomListItem>
    );
  },
);
