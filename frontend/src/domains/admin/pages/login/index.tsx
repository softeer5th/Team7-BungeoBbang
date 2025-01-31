import { Container, Logo, WelcomeText, SocialButton } from './styles';
const LoginPage = () => {
  return (
    <Container>
      <Logo
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6NcEJKno88d9ewGXptE3jcQYrDT6bE.png"
        alt="ON:U Logo"
      />
      <WelcomeText>
        <h1>간편로그인 후 이용이 가능합니다.</h1>
      </WelcomeText>

      <SocialButton className="kakao" onClick={onKakaoLogin}>
        <img src="/kakao-icon.png" alt="Kakao" />
        카카오 로그인
      </SocialButton>

      <SocialButton className="google" onClick={onGoogleLogin}>
        <img src="/google-icon.png" alt="Google" />
        구글 로그인
      </SocialButton>
    </Container>
  );
};

export default LoginPage;
