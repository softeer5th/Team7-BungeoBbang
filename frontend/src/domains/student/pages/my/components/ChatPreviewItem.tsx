import React from 'react';
import * as S from './styles';
import { ChatPreviewData } from '../data/ChatPreviewData';
import { formatDate, formatTime } from '../util/AgendaChatRoomMapper';
import { useNavigate } from 'react-router-dom';
import { useSocketManager } from '@/hooks/useSocketManager';

interface ChatPreviewItemProps {
  chatData: ChatPreviewData;
}

export const ChatPreviewItem: React.FC<ChatPreviewItemProps> = ({
  chatData,
}: ChatPreviewItemProps) => {
  const navigate = useNavigate();
  const socketManager = useSocketManager();

  return (
    <S.ItemBox
      onClick={() => {
        const roomId = chatData.roomId;
        if (chatData.opinionType) {
          socketManager('OPINION', 'ENTER', Number(roomId), 'STUDENT');
          navigate(`/opinion/chat/${roomId}`);
        } else {
          socketManager('AGENDA', 'ENTER', Number(roomId), 'STUDENT');
          navigate(`/agenda/chat/${roomId}`);
        }
      }}
    >
      <S.HeaderContainer>
        <S.TitleContainer>
          <S.IconBox backgroundColor={chatData.categoryType.iconBackground}>
            <img width="17px" height="17px" src={chatData.categoryType.iconSrc} />
          </S.IconBox>
          <S.TitleTextContainer>
            {chatData.opinionType ? (
              <S.TitleText variant="heading3">{chatData.roomName}</S.TitleText>
            ) : (
              <>
                <S.TitleText variant="heading3">{chatData.roomName}</S.TitleText>
                <S.CountText variant="caption1">
                  <S.NumOfJoinText>{chatData.numOfJoin}명</S.NumOfJoinText>
                  <S.ProgressText>{chatData.isInProgress ? '참여 중' : '참여 완료'}</S.ProgressText>
                </S.CountText>
              </>
            )}
          </S.TitleTextContainer>
        </S.TitleContainer>
        <S.LastSendTimeText variant="caption2">
          {chatData.opinionType
            ? formatTime(chatData.lastSendTime)
            : formatDate(chatData.lastSendTime)}
        </S.LastSendTimeText>
      </S.HeaderContainer>
      <S.MessageBox>
        <S.MessageText variant="body3">{chatData.lastMessage}</S.MessageText>
        {chatData.hasNewChat ? (
          <S.UnreadAlarmBox>
            <S.UnreadText variant="caption1">N</S.UnreadText>
          </S.UnreadAlarmBox>
        ) : (
          <S.UnreadAlarmWrapper />
        )}
      </S.MessageBox>
    </S.ItemBox>
  );
};
