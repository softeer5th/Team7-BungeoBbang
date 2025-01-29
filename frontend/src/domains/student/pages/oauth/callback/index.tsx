import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      // URL에서 인가 코드 추출
      const code = new URL(window.location.href).searchParams.get('code');

      if (!code) {
        navigate('/');
        return;
      }

      try {
        // 백엔드 API 호출하여 토큰 받기
        const response = await fetch('backend-api/auth/kakao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/main');
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    handleKakaoCallback();
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default OAuthCallback;
