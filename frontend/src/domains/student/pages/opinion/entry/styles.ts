import styled from 'styled-components';

export const OpinionEntryContainer = styled.div`
  height: 100dvh;
  background-color: #51a2ff;
  padding: 16px;
`;

export const TitleInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 92px;
  color: #fff;
`;

export const SubTitle = styled.div`
  color: var(--Default-Gray-White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 15.6px */
  letter-spacing: -0.24px;
  opacity: 0.4;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.div`
  width: 100%;
  height: 92px;
  border-radius: 26px;
  box-shadow: 0px 0px 24.3px 0px rgba(0, 0, 0, 0.04);
  background: white;
  border: none;
  padding: 0 50px 0 20px;
`;

export const SendButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 0;
  transform: translateY(-50%);
  display: flex;
  width: 30px;
  height: 30px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #1f87ff;
  border: none;
  cursor: pointer;
`;
