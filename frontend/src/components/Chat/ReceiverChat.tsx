import styled from 'styled-components';
import Typography from '../../styles/Typography';

interface SenderChatProps {
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
}

export const ReceiverChat: React.FC<SenderChatProps> = ({
  receiverName,
  receiverIconSrc,
  receiverIconBackgroundColor = '#FFEFB3',
  message,
  timeText,
  images,
  nameTextColor = '#3C3C3C',
  backgroundColor = '#F4F4F4',
  textColor = '#3C3C3C',
  timeTextColor = '#C6C6C6',
}) => {
  return (
    <ReceiverChatContainer>
      <NameContainer>
        {receiverName && (
          <NameText variant="body2" nameTextColor={nameTextColor}>
            {receiverName}
          </NameText>
        )}
        {receiverIconSrc && <IconBox backgroundColor={receiverIconBackgroundColor}></IconBox>}
      </NameContainer>
      {images && (
        <ImageContainer>
          {images.map((image, index) => {
            return <ImageBox src={image} key={`${image}${index}`} />;
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
};

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
`;

const MessageContainer = styled.div`
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
