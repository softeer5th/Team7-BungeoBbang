import styled from 'styled-components';
import Typography from '../../styles/Typography';
import { forwardRef } from 'react';

interface ReceiverChatProps {
  chatId: string;
  receiverName?: string;
  receiverIconSrc?: string;
  receiverIconBackgroundColor?: string;
  message: string;
  images?: string[];
  timeText: string;
  nameTextColor?: string;
  backgroundColor?: string;
  textColor?: string;
  timeTextColor?: string;
  onImageClick?: (imageUrl: string) => void;
}

export const ReceiverChat = forwardRef<HTMLDivElement, ReceiverChatProps>(
  (
    {
      chatId,
      receiverName,
      receiverIconSrc,
      receiverIconBackgroundColor = '#FFEFB3',
      message,
      timeText,
      images,
      nameTextColor = '#393939',
      backgroundColor = '#F4F4F4',
      textColor = '#393939',
      timeTextColor = '#C6C6C6',
      onImageClick,
    },
    ref,
  ) => {
    return (
      <ReceiverChatContainer id={`id${chatId}`} ref={ref}>
        <NameContainer>
          {receiverName && (
            <NameText variant="body2" nameTextColor={nameTextColor}>
              {receiverName}
            </NameText>
          )}
          {receiverIconSrc && <IconBox backgroundColor={receiverIconBackgroundColor}>
              <img width = "17px" height = "17px" src = {receiverIconSrc}/>
            </IconBox>}
        </NameContainer>
        {images && (
          <ImageContainer>
            {images.map((image, index) => {
              return (
                <ImageBox
                  src={image}
                  key={`${image}${index}`}
                  onClick={() => onImageClick?.(image)}
                />
              );
            })}
          </ImageContainer>
        )}
        <MessageContainer>
          <ChatContainer backgroundColor={backgroundColor}>
            <ChatMessageText variant="body1" textColor={textColor}>
              {message}
            </ChatMessageText>
          </ChatContainer>
          <TimeText variant="caption3" timeTextColor={timeTextColor}>
            {timeText}
          </TimeText>
        </MessageContainer>
      </ReceiverChatContainer>
    );
  },
);

const ReceiverChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 16px;
`;

const NameContainer = styled.div``;

const NameText = styled(Typography)<{
  nameTextColor: string;
}>`
  color: ${(props) => props.nameTextColor};
`;

const IconBox = styled.div<{
  backgroundColor: string;
}>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-right: 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageBox = styled.img`
  width: 164px;
  height: 230px;
  border-radius: 16px;
  object-fit: cover;
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 4px;
  margin-top: 4px;
`;

const TimeText = styled(Typography)<{
  timeTextColor: string;
}>`
  color: ${(props) => props.timeTextColor};
`;

const ChatContainer = styled.div<{
  backgroundColor: string;
}>`
  max-width: 73%;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
  box-sizing: border-box;
`;

const ChatMessageText = styled(Typography)<{
  textColor: string;
}>`
  text-align: start;
  white-space: pre-line;
  color: ${(props) => props.textColor};
`;
