import styled from 'styled-components';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import Typography from '@/styles/Typography';

interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
  currentIndex: number;
  totalImages: number;
}

export const ImagePreview = ({
  imageUrl,
  onClose,
  currentIndex,
  totalImages,
}: ImagePreviewProps) => {
  return (
    <PreviewOverlay>
      <Header>
        <BackButton onClick={onClose}>
          <ArrowLeft width="24px" height="24px" stroke="#FFFFFF" fill="#FFFFFF" />
        </BackButton>
        <ImageCounter>
          <Typography variant="heading3" style={{ color: '#FFFFFF' }}>
            {currentIndex + 1}/{totalImages}
          </Typography>
        </ImageCounter>
      </Header>
      <PreviewImage src={imageUrl} onClick={(e) => e.stopPropagation()} />
    </PreviewOverlay>
  );
};

const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  z-index: 20000;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const ImageCounter = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: calc(100% - 56px);
  object-fit: contain;
`;
