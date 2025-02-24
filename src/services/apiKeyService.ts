
interface ApiKey {
  key: string;
  type: 'google' | 'bing';
  usageCount: number;
  lastUsed: Date;
}

export class ApiKeyService {
  private static STORAGE_KEY = 'indexer_api_keys';
  private static GOOGLE_DAILY_LIMIT = 200;
  private static BING_DAILY_LIMIT = 1000;

  static saveApiKey(key: string, type: 'google' | 'bing'): void {
    const keys = this.getStoredKeys();
    keys.push({
      key,
      type,
      usageCount: 0,
      lastUsed: new Date()
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(keys));
  }

  static getStoredKeys(): ApiKey[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getAvailableKey(type: 'google' | 'bing'): string | null {
    const keys = this.getStoredKeys();
    const today = new Date().toDateString();
    const dailyLimit = type === 'google' ? this.GOOGLE_DAILY_LIMIT : this.BING_DAILY_LIMIT;
    
    // Find a key that hasn't reached the daily limit
    const availableKey = keys.find(key => {
      const keyDate = new Date(key.lastUsed).toDateString();
      return key.type === type && 
        (keyDate !== today || key.usageCount < dailyLimit);
    });

    if (!availableKey) {
      return null;
    }

    // Reset count if it's a new day
    if (new Date(availableKey.lastUsed).toDateString() !== today) {
      availableKey.usageCount = 0;
    }

    return availableKey.key;
  }

  static incrementKeyUsage(key: string): void {
    const keys = this.getStoredKeys();
    const keyIndex = keys.findIndex(k => k.key === key);
    
    if (keyIndex !== -1) {
      keys[keyIndex].usageCount++;
      keys[keyIndex].lastUsed = new Date();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(keys));
    }
  }

  static getRemainingQuota(type: 'google' | 'bing'): number {
    const keys = this.getStoredKeys();
    const today = new Date().toDateString();
    const dailyLimit = type === 'google' ? this.GOOGLE_DAILY_LIMIT : this.BING_DAILY_LIMIT;
    
    const activeKeys = keys.filter(key => 
      key.type === type && 
      new Date(key.lastUsed).toDateString() === today
    );

    if (activeKeys.length === 0) return dailyLimit;

    const totalUsage = activeKeys.reduce((sum, key) => sum + key.usageCount, 0);
    return Math.max(0, dailyLimit - totalUsage);
  }
}
