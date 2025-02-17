import { createPortal } from 'react-dom';
import parse from 'html-react-parser';
import styled, { useTheme } from 'styled-components';
import Typography from '@/styles/Typography';
import { Button } from '@/components/Button';

interface SendDialogProps {
  message: string;
  images?: string[];
  onConfirm: () => void;
  onDismiss: () => void;
}

export const SendDialog: React.FC<SendDialogProps> = ({
  message,
  images = [],
  onConfirm = () => {},
  onDismiss = () => {},
}) => {
  const theme = useTheme();

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) {
    return null;
  }

  const dialog = (
    <DialogOverlay onClick={onDismiss}>
      <DialogContainer>
        <TitleContainer>
          {images.length > 0 && (
            <ImageList>
              {images.map((image, index) => (
                <ImageListItem key={index}>
                  <ImageBox src={image} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <TitleText variant="body2">{message}</TitleText>
        </TitleContainer>
        <BodyText variant="body1">
          {parse('메시지를 전송하시나요?<br/>전송된 메시지는 삭제가 불가능합니다.')}
        </BodyText>
        <ButtonContainer>
          <Button
            text="취소"
            backgroundColor={theme.colors.grayScale10}
            textColor={theme.colors.grayScale40}
            onClick={() => onDismiss()}
          />
          <Button
            text="전송"
            backgroundColor={theme.colors.sementicMain}
            textColor={theme.colors.grayScaleWhite}
            onClick={() => onConfirm()}
          />
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
  align-items: center;
`;

const DialogContainer = styled.div`
  padding: 20px;
  width: 90%;
  max-width: 324px;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  max-height: 363px;
  padding: 12px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.grayScale10};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const ImageList = styled.div`
  width: 100%;
  flex-wrap: no-wrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  gap: 4px;
  margin-bottom: 6px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageListItem = styled.div`
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
  max-height: 60px;
  border-radius: 16px;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale80};
  overflow: scroll;
`;

const BodyText = styled(Typography)`
  color: ${(props) => props.theme.colors.grayScale70};
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
