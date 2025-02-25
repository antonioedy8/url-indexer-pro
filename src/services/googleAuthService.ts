
interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}

export class GoogleAuthService {
  private static config: GoogleAuthConfig = {
    clientId: "seu-client-id",
    clientSecret: "seu-client-secret",
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/webmasters.readonly'
    ]
  };

  static getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope.join(' '),
      access_type: 'offline',
      prompt: 'consent'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  static async handleCallback(code: string): Promise<void> {
    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri,
          grant_type: 'authorization_code',
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Falha ao obter token');
      }

      const tokenData = await tokenResponse.json();
      localStorage.setItem('google_access_token', tokenData.access_token);
      localStorage.setItem('google_refresh_token', tokenData.refresh_token);
      localStorage.setItem('google_token_expiry', (Date.now() + tokenData.expires_in * 1000).toString());
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw error;
    }
  }

  static async refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem('google_refresh_token');
    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar token');
      }

      const data = await response.json();
      localStorage.setItem('google_access_token', data.access_token);
      localStorage.setItem('google_token_expiry', (Date.now() + data.expires_in * 1000).toString());

      return data.access_token;
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      throw error;
    }
  }

  static async getValidAccessToken(): Promise<string> {
    const accessToken = localStorage.getItem('google_access_token');
    const tokenExpiry = localStorage.getItem('google_token_expiry');

    if (!accessToken || !tokenExpiry) {
      throw new Error('Não autenticado');
    }

    if (Date.now() > parseInt(tokenExpiry)) {
      return this.refreshAccessToken();
    }

    return accessToken;
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('google_access_token');
  }

  static logout(): void {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_refresh_token');
    localStorage.removeItem('google_token_expiry');
  }
}
