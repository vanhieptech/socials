import { decrypt, encrypt } from './encryption';

export class SecureFacebookClient {
  private static instance: SecureFacebookClient;
  private tokenCache: Map<string, { token: string; expires: number }>;

  private constructor() {
    this.tokenCache = new Map();
  }

  static getInstance(): SecureFacebookClient {
    if (!this.instance) {
      this.instance = new SecureFacebookClient();
    }
    return this.instance;
  }

  async getSecureToken(userId: string): Promise<string | null> {
    const cached = this.tokenCache.get(userId);
    if (cached && cached.expires > Date.now()) {
      return decrypt(cached.token);
    }
    return null;
  }

  async setSecureToken(userId: string, token: string, expiresIn: number): Promise<void> {
    const encryptedToken = encrypt(token);
    this.tokenCache.set(userId, {
      token: encryptedToken,
      expires: Date.now() + expiresIn * 1000
    });
  }
}