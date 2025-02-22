import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CameraIcon from '@/assets/icons/camera.svg?react';
import ArrowUpIcon from '@/assets/icons/full-arrow-up.svg?react';
import CloseIcon from '@/assets/icons/close-2.svg?react';
import Typography from '../../styles/Typography';
import { BorderProps } from '../border/BorderProps';
import { ImagePreview } from './ImagePreview';
import { getDefaultBorderStyle } from '../border/getBorderType';

interface ChatSendFieldProps {
  /**
   * 입력 필드의 기본 플레이스홀더 텍스트
   * @default "메시지를 입력하세요..."
   */
  placeholder?: string;

  /**
   * 입력이 비활성화된 경우 표시될 플레이스홀더 텍스트
   * @default "텍스트를 입력할 수 없습니다."
   */
  disabledPlaceHolder?: string;

  /**
   * 입력 가능한 최대 문자 길이
   * @default 500
   */
  maxLength?: number;

  /**
   * 초기 입력값
   */
  initialText?: string;

  /**
   * 전체 배경색
   * @example "#FFFFFF"
   */
  backgroundColor?: string;

  /**
   * 입력 필드의 배경색
   * @example "#FFFFFF"
   */
  textFieldBackgroundColor?: string;

  /**
   * 입력 필드가 비활성화되었을 때의 배경색
   * @example "#F4F4F4"
   */
  textFieldDisabledBackgroundColor?: string;

  /**
   * 전송 버튼의 배경색
   * @example "#1F87FF"
   */
  sendButtonBackgroundColor?: string;

  /**
   * 비활성화된 전송 버튼의 배경색
   * @example "#E0E0E0"
   */
  sendButtonDisabledBackgroundColor?: string;

  /**
   * 전송 버튼 아이콘 색상
   * @example "#FFFFFF"
   */
  sendButtonIconColor?: string;

  /**
   * 비활성화된 전송 버튼 아이콘 색상
   * @example "#F4F4F4"
   */
  sendButtonDisabledIconColor?: string;

  /**
   * 이미지 업로드 버튼의 배경색
   * @example "#E0E0E0"
   */
  imageButtonBackgroundColor?: string;

  /**
   * 비활성화된 이미지 업로드 버튼의 배경색
   * @example "#E0E0E0"
   */
  imageButtonDisabledBackgroundColor?: string;

  /**
   * 이미지 업로드 버튼 아이콘 색상
   * @example "#8D8D8D"
   */
  imageButtonIconColor?: string;

  /**
   * 비활성화된 이미지 업로드 버튼 아이콘 색상
   * @example "#F4F4F4"
   */
  imageButtonDisabledIconColor?: string;

  /**
   * 플레이스홀더 텍스트 색상
   * @example "#1F87FF"
   */
  placeholderColor?: string;

  /**
   * 비활성화된 플레이스홀더 텍스트 색상
   * @example "#C6C6C6"
   */
  disabledPlaceholderColor?: string;

  /**
   * 입력된 텍스트 색상
   * @example "#262626"
   */
  textColor?: string;

  /**
   * 비활성화된 상태의 입력 텍스트 색상
   * @example "#C6C6C6"
   */
  disabledTextColor?: string;

  /**
   * 입력 필드의 테두리 스타일 (BorderProps 사용)
   */
  textFieldBorder?: BorderProps;

  /**
   * 입력값이 변경될 때 호출되는 콜백 함수
   * @param newValue 변경된 텍스트 값
   */
  onChange?: (newValue: string) => void;

  /**
   * 메시지 전송 시 호출되는 콜백 함수
   * @param message 전송된 메시지 텍스트
   * @param images 첨부된 이미지 목록
   */
  onSendMessage?: (message: string, images: string[]) => void;

  /**
   * 첨부된 이미지 리스트
   */
  images?: string[];

  /**
   * 이미지 삭제 시 호출되는 콜백 함수
   * @param imageId 삭제할 이미지의 ID (인덱스)
   */
  onImageDelete?: (imageId: number) => void;

  /**
   * 이미지 업로드 시 호출되는 콜백 함수
   * @param files 업로드된 파일 리스트
   */
  onImageUpload?: (files: FileList) => void;

  /**
   * 첨부할 수 있는 최대 이미지 개수
   * @default 5
   */
  maxLengthOfImages?: number;

  /**
   * 이미지 업로드 비활성화 여부
   * @default false
   */
  imageDisabled?: boolean;

  /**
   * 텍스트 입력 비활성화 여부
   * @default false
   */
  textDisabled?: boolean;

  /**
   * 전송 버튼 비활성화 여부
   * @default false
   */
  sendDisabled?: boolean;

  /**
   * 리마인드 모드 활성화 여부
   * @default false
   */
  isRemindMode?: boolean;

  /**
   * 이미 리마인드된 상태인지 여부
   * @default false
   */
  isReminded?: boolean;
}

export const ChatSendField = forwardRef<HTMLDivElement, ChatSendFieldProps>(
  (
    {
      placeholder = '메시지를 입력하세요...',
      disabledPlaceHolder = '텍스트를 입력할 수 없습니다.',
      maxLength = 500,
      initialText = '',
      backgroundColor = '#FFFFFF',
      textFieldBackgroundColor = '#FFFFFF',
      textFieldDisabledBackgroundColor = '#F4F4F4',
      sendButtonBackgroundColor = '#1F87FF',
      sendButtonDisabledBackgroundColor = '#E0E0E0',
      sendButtonIconColor = '#FFFFFF',
      sendButtonDisabledIconColor = '#F4F4F4',
      imageButtonBackgroundColor = '#E0E0E0',
      imageButtonDisabledBackgroundColor = '#E0E0E0',
      imageButtonIconColor = '#8D8D8D',
      imageButtonDisabledIconColor = '#F4F4F4',
      placeholderColor = '#1F87FF',
      disabledPlaceholderColor = '#C6C6C6',
      textColor = '#262626',
      disabledTextColor = '#C6C6C6',
      textFieldBorder = {
        ...getDefaultBorderStyle(),
        borderWidth: '1px',
        borderColor: '#E0E0E0',
        disabledBorderColor: '#E0E0E0',
        borderRadius: '20px',
      },
      onChange = () => {},
      onSendMessage = () => {},
      images = [],
      onImageDelete = () => {},
      onImageUpload = () => {},
      maxLengthOfImages = 5,
      imageDisabled = false,
      textDisabled = false,
      sendDisabled = false,
      isRemindMode = false,
      isReminded = false,
    },
    ref,
  ) => {
    const [message, setMessage] = useState(initialText);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    let maxTextInputHeight = 174;
    if (images) maxTextInputHeight = 85;

    const handleTextInput = (newMessage: string) => {
      let newValue = newMessage;
      if (newMessage.length >= maxLength) {
        newValue = newMessage.slice(0, maxLength);
      }
      setMessage(newValue);
      onChange(newValue);
    };

    const handleResizeHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        let scrollHeight = textAreaRef.current.scrollHeight;
        if (scrollHeight >= maxTextInputHeight) {
          scrollHeight = maxTextInputHeight;
        }

        textAreaRef.current.style.height = scrollHeight + 'px';
      }
    };

    const handleSend = () => {
      if (sendDisabled) return;
      if (message.trim() || textDisabled) {
        onSendMessage(message, images);
        setMessage('');
      }
    };

    const handleImageChange = (newIndex: number) => {
      setSelectedImageIndex(newIndex);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        onImageUpload(event.target.files);
        // 파일 입력 초기화
        event.target.value = '';
      }
    };

    const isImageDisabled = images.length >= maxLengthOfImages || imageDisabled;

    useEffect(() => {
      setMessage(initialText);
    }, [initialText]);

    useEffect(() => {
      handleResizeHeight();
    }, [message, handleResizeHeight]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        if (e.nativeEvent.isComposing) return;

        if (e.shiftKey) {
          return;
        }

        e.preventDefault();
        handleSend();
      }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) {
        setMessage('');
      }
    };

    return (
      <>
        <ChatSendContainer ref={ref} bcakgroundColor={backgroundColor}>
          <ImageUploadBox
            backgroundColor={
              isImageDisabled ? imageButtonDisabledBackgroundColor : imageButtonBackgroundColor
            }
          >
            <CameraIcon
              width="20px"
              height="20px"
              fill={isImageDisabled ? imageButtonDisabledIconColor : imageButtonIconColor}
              stroke={isImageDisabled ? imageButtonDisabledIconColor : imageButtonIconColor}
            />
            <HiddenFileInput
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={isImageDisabled}
            />
          </ImageUploadBox>

          <TextFieldContainer>
            <CountText variant="caption2">
              {textDisabled ? 0 : message.length}/{maxLength}
            </CountText>
            <TextFieldBox
              backgroundColor={
                textDisabled ? textFieldDisabledBackgroundColor : textFieldBackgroundColor
              }
              border={textFieldBorder}
            >
              {images && images.length > 0 && !textDisabled && (
                <ImageList>
                  {images.map((image, index) => (
                    <ImageListItem key={index}>
                      <DeleteButtonBox onClick={() => onImageDelete(index)}>
                        <CloseIcon width="16px" height="16px" stroke="white" />
                      </DeleteButtonBox>
                      <ImageBox
                        src={image}
                        onClick={() => {
                          setSelectedImageIndex(index);
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}

              <TextFieldInputWrapper>
                <TextFieldInput
                  rows={1}
                  ref={textAreaRef}
                  variant="body3"
                  value={textDisabled ? '' : message}
                  textColor={textDisabled ? disabledTextColor : textColor}
                  placeholder={textDisabled ? disabledPlaceHolder : placeholder}
                  placeholderColor={textDisabled ? disabledPlaceholderColor : placeholderColor}
                  onChange={(e) => {
                    handleTextInput(e.target.value);
                  }}
                  disabled={textDisabled}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                />

                <SendButtonWrapper />
              </TextFieldInputWrapper>

              <SendButtonBox
                onClick={handleSend}
                backgroundColor={
                  sendDisabled ? sendButtonDisabledBackgroundColor : sendButtonBackgroundColor
                }
                disabled={sendDisabled || message.length === 0}
              >
                {isRemindMode ? (
                  <RemindIcon isReminded={isReminded}>
                    <Typography variant="body4">Re</Typography>
                  </RemindIcon>
                ) : (
                  <ArrowUpIcon
                    width="24px"
                    height="24px"
                    fill={sendDisabled ? sendButtonDisabledIconColor : sendButtonIconColor}
                    stroke={sendDisabled ? sendButtonDisabledIconColor : sendButtonIconColor}
                  />
                )}
              </SendButtonBox>
            </TextFieldBox>
          </TextFieldContainer>
        </ChatSendContainer>
        {selectedImageIndex !== null && (
          <ImagePreview
            // imageUrl={images[selectedImageIndex]}
            onClose={() => setSelectedImageIndex(null)}
            currentIndex={selectedImageIndex}
            totalImages={images.length}
            onChangeImage={handleImageChange}
            imageList={images}
          />
        )}
      </>
    );
  },
);

const ChatSendContainer = styled.div<{
  bcakgroundColor: string;
}>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 8px 16px 8px 16px;
  background-color: ${(props) => props.bcakgroundColor};
  gap: 8px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 15px);
`;

const ImageUploadBox = styled.div<{ backgroundColor: string }>`
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HiddenFileInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

const TextFieldContainer = styled.div`
  width: calc(100% - 40px - 6px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 6px;
`;

const CountText = styled(Typography)`
  color: #a8a8a8;
`;

const TextFieldBox = styled.div<{
  backgroundColor: string;
  border: BorderProps;
}>`
  width: 100%;
  max-height: 174px;
  padding: 6px 4px 6px 12px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) =>
    `${props.border?.borderWidth || '1px'} solid ${props.border?.borderColor || '#E0E0E0'}`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const ImageList = styled.div`
  width: 100%;
  flex-wrap: no-wrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  gap: 4px;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageListItem = styled.div`
  min-width: 64px;
  max-width: 64px;
  min-height: 66px;
  max-height: 66px;
  position: relative;
  width: fit-content;
`;

const DeleteButtonBox = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c3c3c;
  border: 2px solid #ffffff;
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  top: -2px;
  right: -2px;
`;

const ImageBox = styled.img`
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
  max-height: 60px;
  border-radius: 16px;
  margin-top: 6px;
`;

const TextFieldInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  resize: none;
`;

const TextFieldInput = styled(Typography).attrs({ as: 'textarea' })<{
  placeholderColor: string;
  textColor: string;
}>`
  flex: 1;
  margin-right: 7px;
  color: ${(props) => props.textColor};
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;

  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;

const SendButtonWrapper = styled.div`
  width: 30px;
  height: 30px;
`;

const SendButtonBox = styled.div<{ backgroundColor: string; disabled?: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (!props.disabled ? props.backgroundColor : '#e0e0e0')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 4px;
  bottom: 6px;
  transition: background-color 0.3s cubic-bezier(0.65, 0, 0.35, 1);
`;

const RemindIcon = styled.div<{ isReminded?: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.isReminded ? 'rgba(224, 224, 224, 1)' : '#1f87ff')};
  color: ${(props) => (props.isReminded ? 'rgba(244, 244, 244, 1)' : '#ffffff')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
