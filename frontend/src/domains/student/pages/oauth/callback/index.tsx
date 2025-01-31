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
        const code = decodeURIComponent(encodedCode);

        const { data } = await api.post(`/student/auth/${provider}/login`, {
          code,
        });

        console.log(data);

        await JWTManager.setTokens(data);
        //if (data.isNew) navigate('/home');
        //else
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
