import styled from 'styled-components';
import Typography from '../../styles/Typography';

interface SenderChatProps {
  message: string;
  timeText: string;
  backgroundColor?: string;
  textColor?: string;
  timeTextColor?: string;
}

export const SenderChat: React.FC<SenderChatProps> = ({
  message,
  timeText,
  backgroundColor = '#1F87FF',
  textColor = '#FFFFFF',
  timeTextColor = '#C6C6C6',
}) => {
  return (
    <SenderChatContainer>
      <TimeText variant="caption3" timeTextColor={timeTextColor}>
        {timeText}
      </TimeText>
      <ChatContainer backgroundColor={backgroundColor}>
        <ChatMessageText variant="body1" textColor={textColor}>
          {message}
        </ChatMessageText>
      </ChatContainer>
    </SenderChatContainer>
  );
};

const SenderChatContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
`;

const TimeText = styled(Typography)<{
  timeTextColor: string;
}>`
  color: ${(props) => props.timeTextColor};
`;

const ChatContainer = styled.div<{
  backgroundColor: string;
}>`
  width: 277px;
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
