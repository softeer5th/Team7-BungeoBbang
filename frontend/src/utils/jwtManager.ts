import axios from 'axios';
import { AUTH_CONFIG } from '@/config/auth';

class JWTManager {
  private static instance: JWTManager;
  private accessToken: string | null = null;
  private memberId: number | null = null;
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';

  private constructor() {
    // 초기화 시 localStorage에서 refresh token 복원
    const savedRefreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (savedRefreshToken) {
      this.refreshAccessToken(savedRefreshToken);
    }
  }

  public static getInstance(): JWTManager {
    if (!JWTManager.instance) {
      JWTManager.instance = new JWTManager();
    }
    return JWTManager.instance;
  }

  async setTokens(refreshToken: string, accessToken: string, memberID: number): Promise<void> {
    this.accessToken = accessToken;
    this.memberId = memberID;
    // refresh token을 localStorage에 저장
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.accessToken) {
      // access token이 없으면 refresh token으로 재발급 시도
      const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (refreshToken) {
        await this.refreshAccessToken(refreshToken);
      }
    }
    return this.accessToken;
  }

  async getRefreshToken(): Promise<string | null> {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  async getMemberId(): Promise<number | null> {
    return this.memberId;
  }

  private async refreshAccessToken(refreshToken: string): Promise<void> {
    try {
      const { data } = await axios.post(
        `${AUTH_CONFIG.API.BASE_URL}/auth/refresh`,
        { refresh: refreshToken },
        { withCredentials: true },
      );
      this.accessToken = data.accessToken;
    } catch (error) {
      console.log(error);
      console.log('this erreoe');
      await this.clearTokens();
      throw error;
    }
  }

  async clearTokens(): Promise<void> {
    this.accessToken = null;
    this.memberId = null;
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    window.location.href = '/';
  }
}

export default JWTManager.getInstance();
