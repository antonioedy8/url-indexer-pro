
interface IndexingResponse {
  success: boolean;
  error?: string;
  urlNotificationMetadata?: {
    url: string;
    latestUpdate: {
      notifyTime: string;
      type: string;
    };
  };
}

export class GoogleIndexingService {
  private static async getAccessToken(): Promise<string> {
    const token = await ApiKeyService.getAvailableKey('google', 'default-site');
    if (!token) {
      throw new Error('No Google API key available');
    }
    return token;
  }

  static async submitUrl(url: string): Promise<IndexingResponse> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          url: url,
          type: 'URL_UPDATED'
        })
      });

      if (!response.ok) {
        throw new Error(`Google Indexing API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        urlNotificationMetadata: data
      };
    } catch (error) {
      console.error('Error submitting URL to Google:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async getUrlStatus(url: string): Promise<IndexingResponse> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Google Indexing API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        urlNotificationMetadata: data
      };
    } catch (error) {
      console.error('Error checking URL status:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
