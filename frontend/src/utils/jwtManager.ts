interface Tokens {
  access: string;
  refresh: string;
}

class JWTManager {
  private static instance: JWTManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {}

  public static getInstance(): JWTManager {
    if (!JWTManager.instance) {
      JWTManager.instance = new JWTManager();
    }
    return JWTManager.instance;
  }

  async setTokens({ access, refresh }: Tokens): Promise<void> {
    this.accessToken = access;
    this.refreshToken = refresh;
  }

  async getAccessToken(): Promise<string | null> {
    return this.accessToken;
  }

  async getRefreshToken(): Promise<string | null> {
    return this.refreshToken;
  }

  async clearTokens(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    window.location.href = '/';
  }
}

export default JWTManager.getInstance();
