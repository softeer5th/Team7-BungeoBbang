// import React from 'react';
import * as S from './styles';
import { AUTH_CONFIG } from '../../../../config/auth';
import logoImage from '@/assets/icons/logo.png';
import kakaoIcon from '@/assets/icons/kakao-logo.png';
import googleIcon from '@/assets/icons/google-logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `${AUTH_CONFIG.KAKAO.AUTH_URL}?client_id=${AUTH_CONFIG.KAKAO.CLIENT_ID}&redirect_uri=${AUTH_CONFIG.KAKAO.REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };
  const handleGoogleLogin = () => {
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = {
      client_id: AUTH_CONFIG.GOOGLE.CLIENT_ID,
      redirect_uri: AUTH_CONFIG.GOOGLE.REDIRECT_URI,
      response_type: 'code',
      scope: 'email profile',
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.href = `${GOOGLE_AUTH_URL}?${queryString}`;
  };

  useEffect(() => {
    const AccessToken = localStorage.getItem('access_token');
    AccessToken ? navigate('/opinion/entry') : null;
  }, [navigate]);

  return (
    <S.Container>
      <S.LogoTextWrapper>
        <S.Logo src={logoImage} alt="ON:U Logo" />
        <S.WelcomeText>
          간편로그인 후 <br /> 이용이 가능합니다.
        </S.WelcomeText>
      </S.LogoTextWrapper>

      <S.SocialButtonWrapper>
        <S.SocialButton className="kakao" onClick={handleKakaoLogin}>
          <img src={kakaoIcon} alt="Kakao" />
          카카오 로그인
        </S.SocialButton>

        <S.SocialButton className="google" onClick={handleGoogleLogin}>
          <img src={googleIcon} alt="Google" />
          구글 로그인
        </S.SocialButton>
      </S.SocialButtonWrapper>
    </S.Container>
  );
};

export default LoginPage;
