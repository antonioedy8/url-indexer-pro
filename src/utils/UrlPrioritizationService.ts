
interface UrlMetrics {
  url: string;
  traffic: number;
  lastUpdated: Date;
  isProductPage: boolean;
}

export class UrlPrioritizationService {
  static calculateUrlScore(metrics: UrlMetrics): number {
    const now = new Date();
    const daysSinceUpdate = (now.getTime() - metrics.lastUpdated.getTime()) / (1000 * 3600 * 24);
    
    let score = 0;
    
    // Traffic score (0-40 points)
    score += Math.min(metrics.traffic / 100, 40);
    
    // Recency score (0-30 points)
    score += Math.max(30 - daysSinceUpdate, 0);
    
    // Page type score (0-30 points)
    if (metrics.isProductPage) {
      score += 30;
    }
    
    return Math.min(score, 100);
  }

  static prioritizeUrls(urls: UrlMetrics[]): UrlMetrics[] {
    return urls
      .map(url => ({
        ...url,
        score: this.calculateUrlScore(url)
      }))
      .sort((a, b) => (b as any).score - (a as any).score);
  }

  static isEmergencyUrl(url: string): boolean {
    // Identifica URLs críticas que precisam de indexação imediata
    const emergencyPatterns = [
      /\/produto\/novo\//i,
      /\/lancamento\//i,
      /\/promocao\//i
    ];
    
    return emergencyPatterns.some(pattern => pattern.test(url));
  }
}
