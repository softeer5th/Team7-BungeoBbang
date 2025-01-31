class JWTManager {
  private static instance: JWTManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private memberId: number | null = null;

  private constructor() {}

  public static getInstance(): JWTManager {
    if (!JWTManager.instance) {
      JWTManager.instance = new JWTManager();
    }
    return JWTManager.instance;
  }

  async setTokens(refreshToken: string, accessToken: string, memberID: number): Promise<void> {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.memberId = memberID;
  }

  async getAccessToken(): Promise<string | null> {
    return this.accessToken;
  }

  async getRefreshToken(): Promise<string | null> {
    return this.refreshToken;
  }

  async getMemberId(): Promise<number | null> {
    return this.memberId;
  }

  async clearTokens(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    this.memberId = null;
    window.location.href = '/';
  }
}

export default JWTManager.getInstance();
