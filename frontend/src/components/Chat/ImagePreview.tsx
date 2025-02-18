import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import Typography from '@/styles/Typography';

interface ImagePreviewProps {
  onClose: () => void;
  currentIndex: number;
  totalImages: number;
  onChangeImage?: (newIndex: number) => void;
  imageList: string[];
}

export const ImagePreview = ({
  onClose,
  currentIndex,
  totalImages,
  onChangeImage,
  imageList,
}: ImagePreviewProps) => {
  console.log(currentIndex);
  console.log(totalImages);
  const [dragDistance, setDragDistance] = useState(-currentIndex * window.innerWidth);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setDragDistance(-currentIndex * window.innerWidth);
  }, [currentIndex]);

  const animateDrag = (targetX: number) => {
    setDragDistance((prev) => prev + (targetX - prev) * 0.1);
    requestRef.current = requestAnimationFrame(() => animateDrag(targetX));
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    touchStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    cancelAnimationFrame(requestRef.current!);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragDistance(-currentIndex * window.innerWidth + (currentX - (touchStartX.current || 0)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const targetIndex = Math.round(-dragDistance / window.innerWidth);
    const newIndex = Math.max(0, Math.min(totalImages - 1, targetIndex));
    onChangeImage?.(newIndex);
    animateDrag(-newIndex * window.innerWidth);
  };

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
      <ImageContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        <ImageSlider
          style={{
            transform: `translateX(${dragDistance}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {imageList.map((img, index) => (
            <ImageWrapper key={index}>
              <PreviewImage src={img} alt={`Preview ${index + 1}`} loading="eager" />
            </ImageWrapper>
          ))}
        </ImageSlider>
      </ImageContainer>
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
  touch-action: pan-y pinch-zoom;
  overflow: hidden;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: black;
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

const ImageContainer = styled.div`
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
  position: relative;
  touch-action: pan-x;
`;

const ImageSlider = styled.div`
  display: flex;
  height: 100%;
  will-change: transform;
`;

const ImageWrapper = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;
