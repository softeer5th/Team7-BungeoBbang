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
  placeholder?: string;
  disabledPlaceHolder?: string;
  maxLength?: number;
  initialText?: string;
  backgroundColor?: string;
  textFieldBackgroundColor?: string;
  textFieldDisabledBackgroundColor?: string;
  sendButtonBackgroundColor?: string;
  sendButtonDisabledBackgroundColor?: string;
  sendButtonIconColor?: string;
  sendButtonDisabledIconColor?: string;
  imageButtonBackgroundColor?: string;
  imageButtonDisabledBackgroundColor?: string;
  imageButtonIconColor?: string;
  imageButtonDisabledIconColor?: string;
  placeholderColor?: string;
  disabledPlaceholderColor?: string;
  textColor?: string;
  disabledTextColor?: string;
  textFieldBorder?: BorderProps;
  onChange?: (newValue: string) => void;
  onSendMessage?: (message: string, images: string[]) => void;
  images?: string[];
  onImageDelete?: (imageId: number) => void;
  onImageUpload?: (files: FileList) => void;
  maxLengthOfImages?: number;
  imageDisabled?: boolean;
  textDisabled?: boolean;
  sendDisabled?: boolean;
  isRemindMode?: boolean;
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
      if (selectedImage && currentImageList.length > 0) {
        setSelectedImage({
          url: currentImageList[newIndex],
          index: newIndex,
        });
      }
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

const SendButtonBox = styled.div<{ backgroundColor: string }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 4px;
  bottom: 6px;
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
