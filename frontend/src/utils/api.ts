import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { AUTH_CONFIG } from '@/config/auth';
import JWTManager from './jwtManager';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: AUTH_CONFIG.API.BASE_URL,
  timeout: 50000,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await JWTManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await JWTManager.getAccessToken();
        if (token && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest as AxiosRequestConfig);
        }
      } catch (refreshError) {
        console.log('Refresh token error:', refreshError);
        await JWTManager.clearTokens();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
