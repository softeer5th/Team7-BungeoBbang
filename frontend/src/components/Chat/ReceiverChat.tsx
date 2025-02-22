import styled from 'styled-components';
import Typography from '../../styles/Typography';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ReceiverChatProps {
  /**
   * 채팅 메시지의 고유 ID
   * @example "chat_12345"
   */
  chatId: string;

  /**
   * 메시지를 보낸 사람의 이름 (선택 사항)
   * @example "총학생회"
   */
  receiverName?: string;

  /**
   * 수신자의 아이콘 이미지 URL (선택 사항)
   * @example "https://example.com/icon.png"
   */
  receiverIconSrc?: string;

  /**
   * 수신자의 아이콘 배경 색상 (선택 사항)
   * @example "#FFE0F7"
   */
  receiverIconBackgroundColor?: string;

  /**
   * 채팅 메시지의 내용
   * @example "안녕하세요, 소중한 의견을 보내주셔서 감사합니다."
   */
  message: string;

  /**
   * 첨부된 이미지 URL 배열 (선택 사항)
   * @example ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
   */
  images?: string[];

  /**
   * 메시지의 전송 시간 텍스트
   * @example "오후 01:20"
   */
  timeText: string;

  /**
   * 수신자 이름의 텍스트 색상 (선택 사항)
   * @example "#1F87FF"
   */
  nameTextColor?: string;

  /**
   * 채팅 메시지의 배경 색상 (선택 사항)
   * @example "#F4F4F4"
   */
  backgroundColor?: string;

  /**
   * 채팅 메시지의 텍스트 색상 (선택 사항)
   * @example "#393939"
   */
  textColor?: string;

  /**
   * 메시지 시간 텍스트의 색상 (선택 사항)
   * @example "#C6C6C6"
   */
  timeTextColor?: string;

  /**
   * 이미지 클릭 시 호출되는 콜백 함수 (선택 사항)
   * @param imageUrl 클릭한 이미지의 URL
   */
  onImageClick?: (imageUrl: string) => void;
}

const AnimatedImageWrapper = styled(motion.div)`
  flex-shrink: 0; // 이미지가 축소되지 않도록 설정
`;

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
        <motion.div
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
            delay: 0.05,
          }}
        >
          <NameContainer>
            {receiverName && (
              <NameText variant="body2" nameTextColor={nameTextColor}>
                {receiverName}
              </NameText>
            )}
            {receiverIconSrc && (
              <IconBox backgroundColor={receiverIconBackgroundColor}>
                <img width="17px" height="17px" src={receiverIconSrc} />
              </IconBox>
            )}
          </NameContainer>
        </motion.div>
        {images && (
          <ImageContainer>
            {images.map((image, index) => {
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
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.45, 0, 0.21, 1],
            delay: 0.05,
          }}
        >
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
        </motion.div>
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
  overflow-wrap: break-word;
  color: ${(props) => props.textColor};
`;
