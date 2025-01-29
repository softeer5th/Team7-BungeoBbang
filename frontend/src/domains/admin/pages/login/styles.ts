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
  width: 120px;
  margin-top: 60px;
  margin-bottom: 20px;
`;

export const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;
