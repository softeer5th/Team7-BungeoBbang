import React from 'react';
import styled from 'styled-components';

interface BottomSheetProps {
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose = () => {}, children }) => {
  return (
    <Overlay onClick={onClose}>
      <SheetContainer onClick={(e) => e.stopPropagation()}>{children}</SheetContainer>
    </Overlay>
  );
};

export default BottomSheet;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
`;

const SheetContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px 12px 0 0;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform:  translateY(0)';
`;
