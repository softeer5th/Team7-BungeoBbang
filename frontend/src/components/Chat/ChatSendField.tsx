import { useRef, useState } from 'react';
import styled from 'styled-components';
import CameraIcon from '/src/assets/icons/camera.svg?react';
import ArrowUpIcon from '/src/assets/icons/arrow-up.svg?react';
import CloseIcon from '/src/assets/icons/close-2.svg?react';
import Typography from '../../styles/Typography';
import { BorderProps } from '../BorderProps';

interface ChatSendFieldProps {
  placeholder?: string;
  maxLength?: number;
  text?: string;
  backgroundColor?: string;
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
  textFieldBorder?: BorderProps;
  onChange?: (newValue: string) => void;
  onSendMessage?: (message: string, images: string[]) => void;
  images?: string[];
  setImageList?: (images: string[]) => void;
  onImageDelete?: (imageId: string) => void;
  maxLengthOfImages?: number;
  imageDisabled?: boolean;
  textDisabled?: boolean;
  sendDisabled?: boolean;
}

export const ChatSendField: React.FC<ChatSendFieldProps> = ({
  placeholder = '메시지를 입력하세요...',
  maxLength = 500,
  text = '',
  backgroundColor = '#FFFFFF',
  sendButtonBackgroundColor = '#1F87FF',
  sendButtonDisabledBackgroundColor = '#E0E0E0',
  sendButtonIconColor = '#FFFFFF',
  sendButtonDisabledIconColor = '#F4F4F4',
  imageButtonBackgroundColor = '#E0E0E0',
  imageButtonDisabledBackgroundColor = '#E0E0E0',
  imageButtonIconColor = '#8F8F8F',
  imageButtonDisabledIconColor = '#F4F4F4',
  placeholderColor = '#1F87FF',
  disabledPlaceholderColor = '#C6C6C6',
  textColor = '#3C3C3C',
  textFieldBorder = {
    borderWidth: '1px',
    borderColor: '#E0E0E0',
    disabledBorderColor: '#E0E0E0',
    borderRadius: '20px',
  },
  onChange = () => {},
  onSendMessage = () => {},
  images = [],
  setImageList = () => {},
  onImageDelete = (imageId: string) => {},
  maxLengthOfImages = 5,
  imageDisabled = false,
  textDisabled = false,
  sendDisabled = false,
}) => {
  const textAreaRef = useRef(null);

  let maxTextInputHeight = 174;
  if (images) maxTextInputHeight = 102;

  const handleTextInput = (newMessage) => {
    handleResizeHeight();

    let newValue = newMessage;
    if (newMessage.length >= maxLength) {
      newValue = newMessage.slice(0, maxLength);
    }
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
    if (text.trim()) {
      onSendMessage(text, images);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedImages = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages([...images, ...uploadedImages]);
      setImageList([...images, ...uploadedImages]);
    }
  };

  const isImageDisabled = images.length >= maxLengthOfImages || imageDisabled;

  return (
    <ChatSendContainer bcakgroundColor={backgroundColor}>
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
        <HiddenFileInput type="file" accept="image/*" multiple onChange={() => {}} />
      </ImageUploadBox>

      <TextFieldContainer>
        <CountText variant="caption2">
          {text.length}/{maxLength}
        </CountText>
        <TextFieldBox border={textFieldBorder}>
          {images && images.length > 0 && (
            <ImageList>
              {images.map((image, index) => (
                <ImageListItem key={index}>
                  <DeleteButtonBox onClick={() => onImageDelete(index)}>
                    <CloseIcon width="16px" height="16px" stroke="white" />
                  </DeleteButtonBox>
                  <ImageBox src={image} />
                </ImageListItem>
              ))}
            </ImageList>
          )}

          <TextFieldInputWrapper>
            <TextFieldInput
              rows={1}
              ref={textAreaRef}
              variant="body3"
              value={text}
              textColor={textColor}
              placeholder={placeholder}
              placeholderColor={textDisabled ? disabledPlaceholderColor : placeholderColor}
              onChange={(e) => handleTextInput(e.target.value)}
            />

            <SendButtonWrapper />
          </TextFieldInputWrapper>

          <SendButtonBox
            onClick={handleSend}
            backgroundColor={
              sendDisabled ? sendButtonDisabledBackgroundColor : sendButtonBackgroundColor
            }
          >
            <ArrowUpIcon
              width="24px"
              height="24px"
              fill={sendDisabled ? sendButtonDisabledIconColor : sendButtonIconColor}
              stroke={sendDisabled ? sendButtonDisabledIconColor : sendButtonIconColor}
            />
          </SendButtonBox>
        </TextFieldBox>
      </TextFieldContainer>
    </ChatSendContainer>
  );
};

const ChatSendContainer = styled.div<{
  bcakgroundColor: string;
}>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 8px 16px 8px 16px;
  background-color: ${(props) => props.bcakgroundColor};
  gap: 8px;
`;

const ImageUploadBox = styled.div<{ backgroundColor: string }>`
  padding: 10px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  display: none;
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
  border: BorderProps;
}>`
  width: 100%;
  max-height: 174px;
  padding: 6px 4px 6px 12px;
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
  width: 60px;
  height: 60px;
  border-radius: 16px;
  margin-top: 6px;
`;

const TextFieldInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextFieldInput = styled(Typography).attrs({ as: 'textarea' })<{
  placeholderColor: string;
  textColor: string;
}>`
  flex: 1;
  margin-right: 7px;
  color: ${(props) => (props.disabled ? '#C6C6C6' : props.textColor)};
  outline: none;
  border: none;
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
