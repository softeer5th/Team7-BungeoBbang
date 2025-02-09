import axios from 'axios';
import { AUTH_CONFIG } from '@/config/auth';
class JWTManager {
  private static instance: JWTManager;
  private accessToken: string | null = null;
  private memberId: number | null = null;
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly MEMBER_ID_KEY = 'member_id';

  private constructor() {
    this.accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const storedMemberId = localStorage.getItem(this.MEMBER_ID_KEY);
    this.memberId = storedMemberId ? Number(storedMemberId) : null;
  }

  static getInstance(): JWTManager {
    if (!JWTManager.instance) {
      JWTManager.instance = new JWTManager();
    }
    return JWTManager.instance;
  }

  async setTokens(refreshToken: string, accessToken: string, memberId: number): Promise<void> {
    this.accessToken = accessToken;
    this.memberId = memberId;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.MEMBER_ID_KEY, memberId.toString());
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      if (!this.accessToken) {
        const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
        if (refreshToken) {
          await this.refreshAccessToken(refreshToken);
        } else {
          await this.clearTokens();
        }
      }
    }
    return this.accessToken;
  }

  async getRefreshToken(): Promise<string | null> {
    const refresh = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refresh) {
      await this.clearTokens();
      return null;
    } else {
      return refresh;
    }
  }

  async getMemberId(): Promise<number | null> {
    if (!this.memberId) {
      const storedMemberId = localStorage.getItem(this.MEMBER_ID_KEY);
      this.memberId = storedMemberId ? Number(storedMemberId) : null;
    }
    return this.memberId;
  }

  private async refreshAccessToken(refreshToken: string): Promise<void> {
    try {
      const response = await axios.post(
        `${AUTH_CONFIG.API.BASE_URL}/student/auth/login/extend`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'refresh-token': refreshToken,
          },
        },
      );

      if (response.data?.accessToken) {
        this.accessToken = response.data.accessToken;
        localStorage.setItem(this.ACCESS_TOKEN_KEY, response.data.accessToken);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.clearTokens();
      throw error;
    }
  }

  async clearTokens(): Promise<void> {
    this.accessToken = null;
    this.memberId = null;
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.MEMBER_ID_KEY);
  }
}

export default JWTManager.getInstance();
