
interface AiSuggestion {
  type: string;
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
  details: string;
}

interface AiAnalysisResult {
  suggestions: AiSuggestion[];
  keywordOpportunities: string[];
  contentGaps: string[];
  technicalIssues: string[];
}

export class AiAnalysisService {
  private static async analyzeWithAI(prompt: string): Promise<any> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a SEO expert assistant that analyzes websites and provides actionable insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI analysis');
    }

    return response.json();
  }

  static async analyzePage(url: string, content: string): Promise<AiAnalysisResult> {
    try {
      const prompt = `Analyze this webpage content for SEO optimization:
        URL: ${url}
        Content: ${content}
        
        Provide specific suggestions for:
        1. Title and meta description improvements
        2. Content structure and headings
        3. Keyword opportunities
        4. Technical SEO issues
        5. Content gaps and opportunities`;

      const analysis = await this.analyzeWithAI(prompt);
      
      return {
        suggestions: [
          {
            type: 'title',
            suggestion: 'Update title tag to be more descriptive',
            impact: 'high',
            details: analysis.choices[0].message.content
          }
        ],
        keywordOpportunities: [],
        contentGaps: [],
        technicalIssues: []
      };
    } catch (error) {
      console.error('Error analyzing with AI:', error);
      throw error;
    }
  }
}
