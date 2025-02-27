
interface ApiKey {
  id: string;
  key: string;
  type: 'google' | 'bing';
  siteId: string;
  usageCount: number;
  lastUsed: Date;
}

export class ApiKeyService {
  private static STORAGE_KEY = 'indexer_api_keys';
  private static GOOGLE_DAILY_LIMIT = 200;
  private static BING_DAILY_LIMIT = 1000;

  static saveApiKey(key: string, type: 'google' | 'bing', siteId: string): void {
    const keys = this.getStoredKeys();
    keys.push({
      id: Date.now().toString(),
      key,
      type,
      siteId,
      usageCount: 0,
      lastUsed: new Date()
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(keys));
  }

  static getStoredKeys(): ApiKey[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getAvailableKey(type: 'google' | 'bing', siteId: string): string | null {
    const keys = this.getStoredKeys();
    const today = new Date().toDateString();
    const dailyLimit = type === 'google' ? this.GOOGLE_DAILY_LIMIT : this.BING_DAILY_LIMIT;
    
    const availableKey = keys.find(key => 
      key.type === type && 
      key.siteId === siteId &&
      (new Date(key.lastUsed).toDateString() !== today || key.usageCount < dailyLimit)
    );

    if (!availableKey) return null;

    if (new Date(availableKey.lastUsed).toDateString() !== today) {
      availableKey.usageCount = 0;
    }

    return availableKey.key;
  }

  static deleteApiKey(id: string): void {
    const keys = this.getStoredKeys();
    const filteredKeys = keys.filter(key => key.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredKeys));
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
