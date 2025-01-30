import { useState } from 'react';
import styled from 'styled-components';
import CameraIcon from '/src/assets/icons/camera.svg?react';
import ArrowUpIcon from '/src/assets/icons/arrow_up.svg?react';
import Typography from '../styles/Typography';
import { BorderProps } from './BorderProps';

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
  textFieldBorder?: {
    borderWidth?: string;
    borderColor?: string;
    disabledBorderColor?: string;
    borderRadius?: string;
  };
  setTextFieldDisabled?: (isDisabled: boolean) => void;
  onSendMessage?: (message: string, images: string[]) => void;
  imageList?: string[];
  setImageList?: (images: string[]) => void;
  addImage?: (image: string) => void;
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
  textFieldBorder = {
    borderWidth: '1px',
    borderColor: '#E0E0E0',
    disabledBorderColor: '#E0E0E0',
    borderRadius: '20px',
  },
  setTextFieldDisabled = () => {},
  onSendMessage = () => {},
  imageList = [],
  setImageList = () => {},
  addImage = () => {},
  onImageDelete = () => {},
  maxLengthOfImages = 5,
  imageDisabled = false,
  textDisabled = false,
  sendDisabled = false,
}) => {
  const [message, setMessage] = useState(text);
  const [images, setImages] = useState<string[]>(imageList);

  // const handleTextInput (newMessage) => {
  //   handleResizeHeight();
  //   setMessage(newMessage);
  // };
  // const handleResizeHeight = () => {
  //   textarea.current.style.height = 'auto'; //height 초기화
  //   textarea.current.style.height = textarea.current.scrollHeight + 'px';
  // };

  const handleSend = () => {
    if (message.trim() || images.length > 0) {
      onSendMessage(message, images);
      setMessage('');
      setImages([]);
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

  const isImageDisabled = images.length >= 5 || imageDisabled;

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
          {message.length}/{maxLength}
        </CountText>
        <TextFieldBox border={textFieldBorder}>
          {/* <TextFieldInput
            variant="body3"
            value={message}
            placeholder={placeholder}
            placeholderColor={textDisabled ? disabledPlaceholderColor : placeholderColor}
            onChange={(e) => handleTextInput(e.target.value)}
          /> */}

          <SendButtonBox
            onClick={handleSend}
            disabled={sendDisabled}
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
  flex: 1;
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
  padding: 6px 4px 6px 12px;
  box-sizing: border-box;
  border: ${(props) =>
    `${props.border?.borderWidth || '1px'} solid ${props.border?.borderColor || '#E0E0E0'}`};
  border-radius: ${(props) => props.border?.borderRadius || '12px'};
  display: flex;
  justify-content: space-between;
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

  rows: 10;
  // max-height: 102px;
  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
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
`;
