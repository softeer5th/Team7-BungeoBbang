import axios, { AxiosError, AxiosInstance } from 'axios';
import { AUTH_CONFIG } from '@/config/auth';
import JWTManager from './jwtManager';

const api: AxiosInstance = axios.create({
  baseURL: AUTH_CONFIG.API.BASE_URL,
  timeout: 50000,
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  async (config) => {
    const token = await JWTManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await JWTManager.getRefreshToken();
        const { data } = await axios.post(
          `${AUTH_CONFIG.API.BASE_URL}/auth/refresh`,
          { refresh: refreshToken },
          { withCredentials: true },
        );

        await JWTManager.setTokens({
          access: data.accessToken,
          refresh: refreshToken as string,
        });

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        await JWTManager.clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
