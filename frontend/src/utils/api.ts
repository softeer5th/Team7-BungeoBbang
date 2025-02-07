import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AUTH_CONFIG } from '@/config/auth';
import JWTManager from './jwtManager';

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
    console.log('Error:?');
    const originalRequest = error.config as CustomAxiosRequestConfig;
    console.log(originalRequest);

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
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
          console.log('Token refresh failed:', refreshError);
          await JWTManager.clearTokens();
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
