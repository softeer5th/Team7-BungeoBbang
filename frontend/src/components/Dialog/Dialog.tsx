import styled from 'styled-components';
import parse from 'html-react-parser';
import { createPortal } from 'react-dom';
import { Button, ButtonProps } from '../Button';
import { BorderProps } from '../border/BorderProps';
import Typography from '@/styles/Typography';
import { getBorderStyle } from '../border/getBorderType';

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
  titleTextColor = '#393939',
  bodyTextColor = '#525252',
  confirmButton,
  dissmissButton,
  border,
}) => {
  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) {
    return null;
  }

  const dialog = (
    <DialogOverlay onClick={onDismiss}>
      <DialogContainer backgroundColor={backgroundColor} border={border}>
        {title && (
          <TitleContainer titleBackgroundColor={titleBackgroundColor}>
            <TitleText variant="body2" titleTextColor={titleTextColor}>
              {title}
            </TitleText>
          </TitleContainer>
        )}
        <BodyText variant="body1" bodyTextColor={bodyTextColor}>
          {parse(body)}
        </BodyText>
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
    </DialogOverlay>
  );
  return createPortal(dialog, portalRoot);
};

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  justify-content: center;
`;

const DialogContainer = styled.div<{
  backgroundColor: string;
  border?: BorderProps;
}>`
  position: fixed;
  top: 214px;
  padding: 24px 12px 12px 12px;
  width: 90%;
  max-width: 324px;
  background-color: ${(props) => props.backgroundColor};
  ${(props) => (props.border ? getBorderStyle(props.border) : 'border: none;')}
  border-radius: ${(props) => props.border?.borderRadius || '14px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div<{
  titleBackgroundColor: string;
}>`
  width: 100%;
  padding: 9px 22px 9px 22px;
  margin-bottom: 18px;
  box-sizing: border-box;
  background-color: ${(props) => props.titleBackgroundColor};
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled(Typography)<{
  titleTextColor: string;
}>`
  color: ${(props) => props.titleTextColor};
`;

const BodyText = styled(Typography)<{
  bodyTextColor: string;
}>`
  color: ${(props) => props.bodyTextColor};
  text-align: center;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;
