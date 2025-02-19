import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AUTH_CONFIG } from '@/config/auth';
import JWTManager from './jwtManager';
import { handleApiError } from './errorHandler';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: AUTH_CONFIG.API.BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await JWTManager.getAccessToken();
    const refreshToken = await JWTManager.getRefreshToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['refresh-token'] = refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 에러이고 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await JWTManager.getRefreshToken();

      if (refreshToken) {
        try {
          const accessToken = await JWTManager.getAccessToken();
          if (accessToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // 리프레시 토큰도 만료된 경우
          await JWTManager.clearTokens();
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }
    }

    // 에러 처리
    const apiError = await handleApiError(error);
    return Promise.reject(apiError);
  },
);

export default api;
