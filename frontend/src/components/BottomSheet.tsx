import styled from 'styled-components';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen = false,
  onClose = () => {},
  children,
}) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <SheetContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        {children}
      </SheetContainer>
    </Overlay>
  );
};

export default BottomSheet;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${({ isOpen }) => (isOpen ? 0.5 : 0)});
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: transform 0.5s ease-in-out;
`;

const SheetContainer = styled.div<{ isOpen: boolean }>`
  width: 100%;
  max-width: 500px;
  background-color: ${(props) => props.theme.colors.grayScaleWhite};
  border-radius: 12px 12px 0 0;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease-in-out;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '100%')});
`;
