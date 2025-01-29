import styled from 'styled-components';
import { BorderProps } from '../BorderProps';
import { Button, ButtonProps } from './Button';
import parse from 'html-react-parser';

interface DialogProps {
  title?: string;
  body: string;
  onConfirm: () => void;
  onDismiss: () => void;
  backgroundColor?: string;
  titleBackgroundColor?: string;
  titleTextColor?: string;
  bodyTextColor?: string;
  confirmButton: ButtonProps;
  dissmissButton?: ButtonProps;
  border?: BorderProps;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  body = '',
  onConfirm = () => {},
  onDismiss = () => {},
  backgroundColor = '#FFFFFF',
  titleBackgroundColor = '#F4F4F4',
  titleTextColor = '#000000',
  bodyTextColor = '#000000',
  confirmButton,
  dissmissButton,
  border,
}) => {
  return (
    <DialogContainer backgroundColor={backgroundColor} border={border}>
      {title && (
        <TitleContainer titleBackgroundColor={titleBackgroundColor}>
          <TitleText titleTextColor={titleTextColor}>{title}</TitleText>
        </TitleContainer>
      )}
      <BodyText bodyTextColor={bodyTextColor}> {parse(body)}</BodyText>
      <ButtonContainer>
        {dissmissButton && (
          <Button {...dissmissButton} onClick={() => onDismiss()}>
            {dissmissButton?.text}
          </Button>
        )}
        <Button {...confirmButton} onClick={() => onConfirm()}>
          {confirmButton?.text}
        </Button>
      </ButtonContainer>
    </DialogContainer>
  );
};

const DialogContainer = styled.div<{
  backgroundColor?: string;
  border?: BorderProps;
}>`
  padding: 24px 12px 12px 12px;
  background-color: ${(props) => props.backgroundColor || '#FFFFFF'};
  border: ${(props) =>
    props.border
      ? `${props.border?.borderWidth || '1px'} solid ${props.border?.borderColor || '#E0E0E0'}`
      : 'non'};
  border-radius: ${(props) => props.border?.borderRadius || '14px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div<{
  titleBackgroundColor?: string;
}>`
  width: 100%;
  padding: 9px 22px 9px 22px;
  box-sizing: border-box;
  background-color: ${(props) => props.titleBackgroundColor || '#F4F4F4'};
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;

const TitleText = styled.p<{
  titleTextColor?: string;
}>`
  font-size: 14px;
  line-height: 150%;
  font-weight: bold;
  color: ${(props) => props.titleTextColor || '#393939'};
`;

const BodyText = styled.p<{
  bodyTextColor?: string;
}>`
  font-size: 16px;
  line-height: 130%;
  color: ${(props) => props.bodyTextColor || '#525252'};
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;
