import React from 'react';
import { Container, Logo, WelcomeText, SocialButton } from './styles';
import { AUTH_CONFIG } from '../../../../config/auth';
import logoImage from '@/assets/icons/logo.png';
import kakaoIcon from '@/assets/icons/kakao-logo.png';
import googleIcon from '@/assets/icons/google-logo.png';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `${AUTH_CONFIG.KAKAO.AUTH_URL}?client_id=${AUTH_CONFIG.KAKAO.CLIENT_ID}&redirect_uri=${AUTH_CONFIG.KAKAO.REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Container>
      <Logo src={logoImage} alt="ON:U Logo" />
      <WelcomeText>
        <h1>간편로그인 후 이용이 가능합니다.</h1>
      </WelcomeText>

      <SocialButton className="kakao" onClick={handleKakaoLogin}>
        <img src={kakaoIcon} alt="Kakao" />
        카카오 로그인
      </SocialButton>

      <SocialButton className="google">
        <img src={googleIcon} alt="Google" />
        구글 로그인
      </SocialButton>
    </Container>
  );
};

export default LoginPage;
