import React from 'react';
import * as S from './styles';
import { ChatPreviewData } from '../data/ChatPreviewData';
import { useNavigate } from 'react-router-dom';
import { formatLastChatTime } from '@/utils/chat/lastChatTime';

interface ChatPreviewItemProps {
  chatData: ChatPreviewData;
}

export const ChatPreviewItem: React.FC<ChatPreviewItemProps> = ({
  chatData,
}: ChatPreviewItemProps) => {
  console.log('chatData', chatData);
  const navigate = useNavigate();

  return (
    <S.ItemBox
      onClick={() => {
        const roomId = chatData.roomId;
        if (chatData.opinionType) {
          navigate(`/opinion/chat/${roomId}`, {
            state: {
              lastChatId: chatData.lastChatId,
              opinionType: chatData.opinionType.label,
              categoryType: chatData.categoryType.type,
              title: chatData.opinionType.label,
            },
          });
        } else {
          const isEnd = !chatData.isInProgress;
          navigate(`/agenda/chat/${roomId}?isEnd=${isEnd}&isParticipate=true `, {
            state: { lastChatId: chatData.lastChatId },
          });
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
          {formatLastChatTime(chatData.lastSendTime)}
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
