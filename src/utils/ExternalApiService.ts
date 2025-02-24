
interface ExternalApiMetrics {
  domainAuthority: number;
  backlinks: number;
  toxicBacklinks: number;
  keywordDifficulty: number;
}

interface LighthouseMetrics {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

export class ExternalApiService {
  private static async fetchSemrushData(domain: string): Promise<Partial<ExternalApiMetrics>> {
    // Simulação de dados do SEMrush
    return {
      domainAuthority: Math.floor(Math.random() * 100),
      backlinks: Math.floor(Math.random() * 10000),
      toxicBacklinks: Math.floor(Math.random() * 100)
    };
  }

  private static async fetchAhrefsData(domain: string): Promise<Partial<ExternalApiMetrics>> {
    // Simulação de dados do Ahrefs
    return {
      keywordDifficulty: Math.floor(Math.random() * 100),
      backlinks: Math.floor(Math.random() * 12000)
    };
  }

  private static async fetchLighthouseData(url: string): Promise<LighthouseMetrics> {
    // Simulação de dados do Lighthouse
    return {
      performance: Math.floor(Math.random() * 100),
      accessibility: Math.floor(Math.random() * 100),
      seo: Math.floor(Math.random() * 100),
      bestPractices: Math.floor(Math.random() * 100)
    };
  }

  static async getComprehensiveAnalysis(url: string): Promise<{
    metrics: ExternalApiMetrics;
    lighthouse: LighthouseMetrics;
  }> {
    const domain = new URL(url).hostname;
    
    const [semrush, ahrefs, lighthouse] = await Promise.all([
      this.fetchSemrushData(domain),
      this.fetchAhrefsData(domain),
      this.fetchLighthouseData(url)
    ]);

    const metrics: ExternalApiMetrics = {
      domainAuthority: semrush.domainAuthority || 0,
      backlinks: Math.max(semrush.backlinks || 0, ahrefs.backlinks || 0),
      toxicBacklinks: semrush.toxicBacklinks || 0,
      keywordDifficulty: ahrefs.keywordDifficulty || 0
    };

    return {
      metrics,
      lighthouse
    };
  }
}
