import styled from 'styled-components';
import Typography from '../../styles/Typography';

interface SenderChatProps {
  message: string;
  images?: string[];
  timeText: string;
  backgroundColor?: string;
  textColor?: string;
  timeTextColor?: string;
}

export const SenderChat: React.FC<SenderChatProps> = ({
  message,
  images,
  timeText,
  backgroundColor = '#1F87FF',
  textColor = '#FFFFFF',
  timeTextColor = '#C6C6C6',
}) => {
  return (
    <SenderChatContainer>
      {images && images.length > 0 && (
        <ImageContainer>
          {images.map((image, index) => {
            return <ImageBox src={image} key={`${image}${index}`} />;
          })}
        </ImageContainer>
      )}
      <MessageContainer>
        <TimeText variant="caption3" timeTextColor={timeTextColor}>
          {timeText}
        </TimeText>
        <ChatContainer backgroundColor={backgroundColor}>
          <ChatMessageText variant="body1" textColor={textColor}>
            {message}
          </ChatMessageText>
        </ChatContainer>
      </MessageContainer>
    </SenderChatContainer>
  );
};

const SenderChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
  padding-right: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-left: 16px;
  overflow-x: auto;
  direction: rtl;

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
  justify-content: flex-end;
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
  color: ${(props) => props.textColor};
`;
