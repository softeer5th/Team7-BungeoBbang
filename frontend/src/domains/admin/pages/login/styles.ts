import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background-color: #ffffff;
  position: relative;
`;

export const LogoContainer = styled.div`
  margin: 60px 0;
  text-align: center;
`;

export const Logo = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto -5px;
  background-image: url('/src/assets/icons/school.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const AdminText = styled.div`
  padding: 4px 30px;
  background-color: ${({ theme }) => theme.colors.blueScale50};
  color: ${({ theme }) => theme.colors.grayScaleWhite};
  border-radius: 99px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.28px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

export const InputContainer = styled.div`
  margin-bottom: 8px;
`;

export const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 14px;
  border: 1px solid ${({ error }) => (error ? '#FF0000' : '#E5E5EA')};
  border-radius: 12px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${({ error }) => (error ? '#FF0000' : '#007AFF')};
  }
`;

export const ErrorText = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 4px;
`;

export const LoginButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 16px;
  background-color: ${({ disabled }) => (disabled ? '#E5E5EA' : '#007AFF')};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-top: 24px;
`;

export const OnuLogoWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
`;
