// src/infrastructure/api.ts
import { 
  IPredictionService, 
  IAIService, 
  INewsService, 
  IPredictionHistoryService 
} from '@/application/services';

// Infrastructure Layer - External data sources and API implementations
export class PredictionAPI implements IPredictionService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.kalshi-soccer.com';
  
  async getMatchPrediction(homeTeamName: string, awayTeamName: string) {
    try {
      const response = await fetch(`${this.baseURL}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        body: JSON.stringify({
          homeTeam: homeTeamName,
          awayTeam: awayTeamName
        })
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Prediction API error:', error);
      // Fallback to mock service
      const MockPredictionService = (await import('@/application/services')).MockPredictionService;
      const mockService = new MockPredictionService();
      return mockService.getMatchPrediction(homeTeamName, awayTeamName);
    }
  }
  
  async getPredictionHistory() {
    try {
      const response = await fetch(`${this.baseURL}/predictions/history`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('History API error:', error);
      const MockPredictionService = (await import('@/application/services')).MockPredictionService;
      const mockService = new MockPredictionService();
      return mockService.getPredictionHistory();
    }
  }
}

export class AIAnalysisAPI implements IAIService {
  // UPDATED: Point to your local Next.js API route
  private baseURL = '/api/ai'; 
  
  // UPDATED: Accept matchData to pass to the AI
  async generateMatchAnalysis(matchId: string, matchData?: any) {
    try {
      const response = await fetch(`${this.baseURL}/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No Authorization header needed for local API route
        },
        body: JSON.stringify({ 
          matchId,
          ...matchData // Pass the full context (teams, form, etc.)
        })
      });
      
      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI Analysis API error:', error);
      // Fallback to mock service
      const MockAIService = (await import('@/application/services')).MockAIService;
      const mockService = new MockAIService();
      return mockService.generateMatchAnalysis(matchId, matchData);
    }
  }
  
  async getTeamInsights(teamId: string) {
    try {
      // You can implement a similar route for insights if needed: /api/ai/insights
      const response = await fetch(`${this.baseURL}/insights?teamId=${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI Team Insights API error:', error);
      const MockAIService = (await import('@/application/services')).MockAIService;
      const mockService = new MockAIService();
      return mockService.getTeamInsights(teamId);
    }
  }
}

export class NewsAPI implements INewsService {
  private baseURL = process.env.NEXT_PUBLIC_NEWS_API_URL || 'https://api.newsapi.com';
  private apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  
  async getTeamNews(teamIds: string[]) {
    try {
      const teamQuery = teamIds.join(' OR ');
      const response = await fetch(
        `${this.baseURL}/v2/everything?q=${encodeURIComponent(teamQuery)}&sortBy=publishedAt&pageSize=10&apiKey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`News API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.transformNewsResponse(data.articles);
    } catch (error) {
      console.error('News API error:', error);
      const MockNewsService = (await import('@/application/services')).MockNewsService;
      const mockService = new MockNewsService();
      return mockService.getTeamNews(teamIds);
    }
  }
  
  async getLatestNews() {
    try {
      const response = await fetch(
        `${this.baseURL}/v2/top-headlines?country=us&category=sports&pageSize=10&apiKey=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`News API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.transformNewsResponse(data.articles);
    } catch (error) {
      console.error('News API error:', error);
      const MockNewsService = (await import('@/application/services')).MockNewsService;
      const mockService = new MockNewsService();
      return mockService.getLatestNews();
    }
  }
  
  private transformNewsResponse(articles: any[]) {
    if (!articles) return [];
    return articles.map((article, index) => ({
      id: `news-${Date.now()}-${index}`,
      title: article.title,
      summary: article.description || 'No summary available',
      content: article.content || article.description || '',
      author: article.author || 'Unknown',
      publishedAt: new Date(article.publishedAt),
      imageUrl: article.urlToImage || '/api/placeholder/300/200',
      source: article.source?.name || 'Unknown Source',
      teams: this.extractTeamsFromContent(article.title + ' ' + (article.description || '')),
      tags: this.extractTags(article.title + ' ' + (article.description || '')),
      url: article.url
    }));
  }
  
  private extractTeamsFromContent(content: string): string[] {
    const knownTeams = [
      'Manchester United', 'Manchester City', 'Arsenal', 'Chelsea', 'Liverpool',
      'Tottenham', 'Newcastle', 'Brighton', 'Aston Villa', 'West Ham'
    ];
    
    return knownTeams.filter(team => 
      content.toLowerCase().includes(team.toLowerCase())
    );
  }
  
  private extractTags(content: string): string[] {
    const tags = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('transfer') || lowerContent.includes('signing')) {
      tags.push('Transfer');
    }
    if (lowerContent.includes('injury') || lowerContent.includes('injured')) {
      tags.push('Injury');
    }
    if (lowerContent.includes('premier league')) {
      tags.push('Premier League');
    }
    if (lowerContent.includes('champions league')) {
      tags.push('Champions League');
    }
    
    return tags.length > 0 ? tags : ['General'];
  }
}

export class PredictionHistoryAPI implements IPredictionHistoryService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.kalshi-soccer.com';
  
  async getAccuracyStats() {
    try {
      const response = await fetch(`${this.baseURL}/predictions/stats`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Stats API error:', error);
      const MockPredictionHistoryService = (await import('@/application/services')).MockPredictionHistoryService;
      const mockService = new MockPredictionHistoryService();
      return mockService.getAccuracyStats();
    }
  }
}