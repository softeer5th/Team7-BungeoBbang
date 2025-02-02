import { ChatListCardData } from '../ChatListCardData.tsx';
import * as S from './styles.ts';

interface ChatRoomListItemProps{
  room : ChatListCardData;
  onCardClick: () => void;
};

export const ChatRoomListItem = ({ room , onCardClick = () => {}}: ChatRoomListItemProps) => {
  return (
    <S.ChatRoomListItem key={room.roomId} onClick = {() => onCardClick()}>
      <S.DDayTextContainer>
        <S.DDayText variant="heading2" isInProgress={room.isInProgress}>
          {room.dday}
        </S.DDayText>
      </S.DDayTextContainer>
      <S.ContentWrapper>
        <S.IconContainer>
          <S.IconBox backgroundColor={room.iconBackgroundColor}>
            <img src={room.iconSrc} width="17px" height="17px" />
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
};
