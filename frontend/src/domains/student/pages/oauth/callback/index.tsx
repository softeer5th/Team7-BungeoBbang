import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import JWTManager from '@/utils/jwtManager';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const provider = window.location.pathname.includes('kakao') ? 'kakao' : 'google';

      if (!code) {
        navigate('/');
        return;
      }

      try {
        const { data } = await api.post(`/student/auth/${provider}/login`, {
          code: code,
        });

        await JWTManager.setTokens(data);
        navigate('/main');
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
