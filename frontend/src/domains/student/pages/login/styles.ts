import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: white;
`;

export const Logo = styled.img`
  width: 97px;
  height: 28px;
  margin-top: 60px;
  margin-bottom: 20px;
`;

export const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 500;
  margin-bottom: 7px;
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
