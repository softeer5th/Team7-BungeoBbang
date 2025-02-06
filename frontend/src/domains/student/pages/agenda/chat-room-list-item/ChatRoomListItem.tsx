import { useNavigate } from 'react-router-dom';
import { ChatListCardData } from '../ChatRoomListCardData.tsx';
import * as S from './styles.ts';

interface ChatRoomListItemProps {
  room: ChatListCardData;
}

export const ChatRoomListItem = ({ room }: ChatRoomListItemProps) => {
  const navigate = useNavigate();

  return (
    <S.ChatRoomListItem
      key={room.roomId}
      onClick={() => {
        navigate(`/agenda/chat/${room.roomId}`);
      }}
    >
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
