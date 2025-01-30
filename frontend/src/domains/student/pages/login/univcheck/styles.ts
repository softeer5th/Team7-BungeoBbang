import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
`;

export const Header = styled.div`
  padding: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
`;

export const SelectButton = styled.button`
  width: calc(100% - 40px);
  margin: 20px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e5e5ea;
  border-radius: 12px;
  font-size: 16px;
  text-align: left;
  color: #8e8e93;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '▼';
    font-size: 12px;
  }
`;

export const BottomSheet = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
`;

export const BottomSheetHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e5ea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BottomSheetTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const UniversityList = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

export const UniversityItem = styled.button`
  width: 100%;
  padding: 16px;
  background: none;
  border: none;
  text-align: left;
  font-size: 16px;
  border-bottom: 1px solid #e5e5ea;

  &:last-child {
    border-bottom: none;
  }
`;

export const NextButton = styled.button<{ disabled: boolean }>`
  width: calc(100% - 40px);
  padding: 16px;
  background: ${({ disabled }) => (disabled ? '#E5E5EA' : '#007AFF')};
  color: ${({ disabled }) => (disabled ? '#8E8E93' : 'white')};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  margin: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
