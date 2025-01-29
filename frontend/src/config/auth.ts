export const AUTH_CONFIG = {
  KAKAO: {
    CLIENT_ID: import.meta.env.VITE_KAKAO_CLIENT_ID,
    REDIRECT_URI: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    AUTH_URL: 'https://kauth.kakao.com/oauth/authorize',
  },
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
  },
  GOOGLE: {
    CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  },
};
