import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  height: 100dvh;
  background-color: white;
  overflow: hidden;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-top: 26px;
  margin-bottom: 5px;
`;

export const Subtitle = styled.p`
  margin-bottom: 40px;
  color: var(--Default-Gray-40, #a8a8a8);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.28px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button<{ isValid: boolean }>`
  width: 90%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: ${(props) => (props.$isValid ? '#007AFF' : '#E1E1E1')};
  color: ${(props) => (props.$isValid ? 'white' : '#999')};
  font-size: 16px;
  font-weight: 500;
  position: fixed;
  bottom: 37px;
  left: 20px;
  right: 20px;
  cursor: ${(props) => (props.$isValid ? 'pointer' : 'default')};
`;

export const ErrorMessage = styled.p`
  color: #ff3b30;
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
`;
