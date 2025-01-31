import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import JWTManager from '@/utils/jwtManager';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const encodedCode = new URL(window.location.href).searchParams.get('code');
      const provider = window.location.pathname.includes('kakao') ? 'kakao' : 'google';

      if (!encodedCode) {
        navigate('/');
        return;
      }

      try {
        const response = await api.post(`/student/auth/${provider}/login`, {
          code: decodeURIComponent(encodedCode),
        });
        const accessToken = response.headers['access-token'];
        const refreshToken = response.headers['refresh-token'];
        const memberID = response.data.memberId;

        if (!accessToken || !refreshToken || !memberID) {
          throw new Error(' token or member id not found in headers');
        }

        await JWTManager.setTokens(refreshToken, accessToken, memberID);
        reponse.data.isEmailVerified ? navigate('/main') : navigate('/email');
        navigate('/univ');
      } catch (error) {
        console.error('Login failed:', error);
        navigate('/');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default OAuthCallback;
