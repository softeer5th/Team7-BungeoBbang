import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  min-height: 100dvh;
  overflow: hidden;
`;

export const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  gap: 20px;
  margin-top: 224px;
`;

export const Logo = styled.img`
  width: 97px;
  height: 28px;
`;

export const WelcomeText = styled.div`
  color: var(--Default-Gray-80, #393939);
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.52px;
`;

export const SocialButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 24px;
  margin-bottom: 37px;
`;
export const SocialButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;

  color: var(--Default-Gray-80, #393939);

  /* 온유/Heading 4 l SB */
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 20.8px */
  letter-spacing: -0.32px;
  cursor: pointer;

  &.kakao {
    background-color: #fbe850;
    color: #000000;
  }

  &.google {
    background-color: #f4f4f4;
    color: #000000;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;
