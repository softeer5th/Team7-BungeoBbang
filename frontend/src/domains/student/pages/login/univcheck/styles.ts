import styled from 'styled-components';
import * as C from '../check-styles.ts';

export const Container = C.Container;
export const BackButton = C.BackButton;
export const Title = C.Title;
export const Subtitle = C.Subtitle;
export const SubmitButton = C.SubmitButton;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.32);
  z-index: 10;
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

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;

  &::after {
    content: '▼';
    font-size: 12px;
  }
`;

export const BottomSheet = styled.div<{ isOpen: boolean }>`
  padding: 24px 16px;
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
  margin-bottom: 20px;
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

export const UniversityItem = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 16px 10px;
  border-radius: 12px;
  background-color: ${({ selected }) => (selected ? '#F4F4F4' : '#FFFFFF')};
  border: none;
  text-align: left;
  font-size: 16px;

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
