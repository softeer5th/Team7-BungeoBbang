import styled from 'styled-components';
import Typography from '../../styles/Typography';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface SenderChatProps {
  chatId: string;
  message: string;
  images?: string[];
  timeText: string;
  backgroundColor?: string;
  textColor?: string;
  timeTextColor?: string;
  onImageClick?: (imageUrl: string) => void;
}

const AnimatedImageWrapper = styled(motion.div)`
  flex-shrink: 0;
`;

export const SenderChat = forwardRef<HTMLDivElement, SenderChatProps>(
  (
    {
      chatId,
      message,
      images,
      timeText,
      backgroundColor = '#1F87FF',
      textColor = '#FFFFFF',
      timeTextColor = '#C6C6C6',
      onImageClick,
    },
    ref,
  ) => {
    return (
      <SenderChatContainer id={`id${chatId}`} ref={ref}>
        {images && images.length > 0 && (
          <ImageContainer>
            {[...images].reverse().map((image, index) => {
              return (
                <AnimatedImageWrapper
                  key={`${image}${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.4,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.45, 0, 0.21, 1],
                    delay: 0.2 * index, // 각 이미지마다 순차적으로 애니메이션 적용
                  }}
                >
                  <ImageBox
                    src={image}
                    key={`${image}${index}`}
                    onClick={() => onImageClick?.(image)}
                  />
                </AnimatedImageWrapper>
              );
            })}
          </ImageContainer>
        )}
        <motion.div
          style={{ width: '100%' }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.45, 0, 0.21, 1],
            delay: 0.05,
          }}
        >
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
        </motion.div>
      </SenderChatContainer>
    );
  },
);

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
  object-fit: cover;
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
  margin-top: 4px;
  word-break: break-word;
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
  overflow-wrap: break-word;
  color: ${(props) => props.textColor};
`;
