
interface SeoMetrics {
  title: string;
  description: string;
  h1Count: number;
  imagesWithoutAlt: number;
  brokenLinks: number;
}

interface ContentGap {
  topic: string;
  competitor: string;
  relevance: number;
}

export class SeoAnalysisService {
  static async analyzePage(url: string): Promise<SeoMetrics> {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const title = doc.title || '';
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const h1Count = doc.querySelectorAll('h1').length;
      const imagesWithoutAlt = Array.from(doc.querySelectorAll('img')).filter(img => !img.alt).length;
      const brokenLinks = 0; // Implementar verificação assíncrona de links quebrados

      return {
        title,
        description,
        h1Count,
        imagesWithoutAlt,
        brokenLinks
      };
    } catch (error) {
      console.error('Error analyzing page:', error);
      throw new Error('Failed to analyze page');
    }
  }

  static async analyzeCompetitors(keyword: string): Promise<ContentGap[]> {
    // Simulação de análise de concorrentes
    return [
      { topic: "Guia completo de SEO", competitor: "competitor1.com", relevance: 0.9 },
      { topic: "Melhores práticas de SEO", competitor: "competitor2.com", relevance: 0.8 },
      { topic: "SEO para iniciantes", competitor: "competitor3.com", relevance: 0.7 }
    ];
  }
}
