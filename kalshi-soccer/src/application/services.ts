import { MatchPrediction, AIAnalysis, PredictionHistory, NewsArticle } from '@/lib/types';

// Application Layer - Use cases and business operations
export interface IPredictionService {
  getMatchPrediction(homeTeamName: string, awayTeamName: string): Promise<MatchPrediction>;
  getPredictionHistory(): Promise<PredictionHistory[]>;
}

export interface IAIService {
  generateMatchAnalysis(matchId: string): Promise<AIAnalysis>;
  getTeamInsights(teamId: string): Promise<string[]>;
}

export interface INewsService {
  getTeamNews(teamIds: string[]): Promise<NewsArticle[]>;
  getLatestNews(): Promise<NewsArticle[]>;
}

export interface IPredictionHistoryService {
  getAccuracyStats(): Promise<{
    totalPredictions: number;
    accuracyRate: number;
    recentAccuracy: number;
    bestPerformingAlgorithm: string;
  }>;
}

// Mock implementation of services
export class MockPredictionService implements IPredictionService {
  async getMatchPrediction(homeTeamName: string, awayTeamName: string): Promise<MatchPrediction> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { PredictionEngine } = await import('@/domain/prediction-engine');
    
    const homeTeam = {
      id: 'team-1',
      name: homeTeamName,
      shortName: homeTeamName.split(' ').map(word => word[0]).join(''),
      logo: `/api/placeholder/80/80?text=${homeTeamName[0]}`,
      league: 'Premier League'
    };
    
    const awayTeam = {
      id: 'team-2',
      name: awayTeamName,
      shortName: awayTeamName.split(' ').map(word => word[0]).join(''),
      logo: `/api/placeholder/80/80?text=${awayTeamName[0]}`,
      league: 'Premier League'
    };
    
    return PredictionEngine.calculateMatchPrediction(homeTeam, awayTeam);
  }
  
  async getPredictionHistory(): Promise<PredictionHistory[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        matchId: 'match-1',
        predictedResult: 'home_win',
        actualResult: 'home_win',
        accuracy: 95,
        predictionDate: new Date('2025-12-10'),
        actualDate: new Date('2025-12-12'),
        confidence: 85
      },
      {
        id: '2',
        matchId: 'match-2',
        predictedResult: 'away_win',
        actualResult: 'away_win',
        accuracy: 88,
        predictionDate: new Date('2025-12-08'),
        actualDate: new Date('2025-12-10'),
        confidence: 78
      },
      {
        id: '3',
        matchId: 'match-3',
        predictedResult: 'draw',
        actualResult: 'draw',
        accuracy: 92,
        predictionDate: new Date('2025-12-05'),
        actualDate: new Date('2025-12-07'),
        confidence: 82
      }
    ];
  }
}

export class MockAIService implements IAIService {
  async generateMatchAnalysis(matchId: string): Promise<AIAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: this.generateId(),
      matchId,
      content: this.generateAnalysisContent(),
      keyInsights: [
        'Home team has strong recent form with 4 wins in last 5 matches',
        'Away team struggles with away games, losing 60% of away fixtures',
        'Head-to-head record favors home team with 65% win rate',
        'Weather conditions favor attacking play - expect open game'
      ],
      tacticalAnalysis: 'Based on recent formations and player positioning, the home team is likely to play a 4-3-3 formation with emphasis on wing play. The away team may opt for a more defensive 5-4-1 setup to counter the home attack.',
      playerRecommendations: [
        'Home team striker shows excellent recent form - expect goals',
        'Midfield battle will be crucial - watch for home team dominance',
        'Away team left-back is injury concern - potential weakness',
        'Set pieces could be decisive - home team has height advantage'
      ],
      riskFactors: [
        'Key player uncertainty due to recent injury concerns',
        'Away team has good away defensive record this season',
        'Referee tends to be lenient with cards - physical game likely',
        'Weather may affect passing accuracy and ball control'
      ],
      generatedAt: new Date(),
      model: 'KalshiAI-v3.2'
    };
  }
  
  async getTeamInsights(teamId: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return [
      'Strong attacking record with 2.3 goals per game average',
      'Solid defensive structure, conceded only 0.8 goals per game',
      'Excellent home record with 85% win rate at home',
      'Recent injury concerns in key defensive positions',
      'Tactical flexibility with multiple formation options'
    ];
  }
  
  private generateAnalysisContent(): string {
    return `## Match Analysis

Based on comprehensive data analysis including recent form, head-to-head records, team statistics, and weather conditions, this match presents several key factors to consider.

**Key Observations:**
The home team enters this fixture with significant momentum, having secured 4 victories in their last 5 matches. Their attacking prowess has been particularly evident, averaging 2.3 goals per game during this period. The team's tactical approach has evolved to favor a more aggressive style, with increased possession and pressing intensity.

**Tactical Considerations:**
The away team's defensive solidity away from home has been noteworthy this season, with only 1.2 goals conceded per away fixture. However, their attacking output has been inconsistent, which could prove problematic against a confident home side.

**Statistical Indicators:**
Historical data suggests a 65% probability of a home victory in similar fixtures, with an average of 2.8 goals expected based on both teams' current form and defensive capabilities.

**Risk Assessment:**
While the home team appears favored, the away team's recent improvements in defensive structure cannot be overlooked. The potential absence of key home players due to injury concerns adds an element of uncertainty to the prediction.`;
  }
  
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export class MockNewsService implements INewsService {
  async getTeamNews(teamIds: string[]): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return [
      {
        id: 'news-1',
        title: 'Manchester United Secures Key Victory Against Arsenal',
        summary: 'Manchester United delivered an impressive performance against Arsenal, securing a 2-1 victory at Old Trafford.',
        content: 'Manchester United secured a crucial 2-1 victory over Arsenal at Old Trafford, with goals from Marcus Rashford and Bruno Fernandes...',
        author: 'Sports Desk',
        publishedAt: new Date('2025-12-14T10:30:00Z'),
        imageUrl: '/api/placeholder/300/200?text=Man+United+Victory',
        source: 'ESPN',
        teams: ['Manchester United', 'Arsenal'],
        tags: ['Premier League', 'Match Report', 'Victory'],
        url: '#'
      },
      {
        id: 'news-2',
        title: 'Liverpool Injury Update: Key Players Expected to Return',
        summary: 'Liverpool receives positive news as several key players are expected to return from injury for the upcoming fixture.',
        content: 'Liverpool manager Jurgen Klopp has confirmed that several key players are expected to return from injury...',
        author: 'Football Insider',
        publishedAt: new Date('2025-12-13T15:45:00Z'),
        imageUrl: '/api/placeholder/300/200?text=Liverpool+Update',
        source: 'BBC Sport',
        teams: ['Liverpool'],
        tags: ['Injury Update', 'Premier League'],
        url: '#'
      }
    ];
  }
  
  async getLatestNews(): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 'news-3',
        title: 'Transfer Window: Latest Signings and Rumors',
        summary: 'The latest updates from the winter transfer window, including confirmed signings and emerging rumors.',
        content: 'The winter transfer window continues to see significant activity across European football...',
        author: 'Transfer News',
        publishedAt: new Date('2025-12-14T08:00:00Z'),
        imageUrl: '/api/placeholder/300/200?text=Transfer+Window',
        source: 'Sky Sports',
        teams: ['Multiple'],
        tags: ['Transfer', 'Rumors', 'Winter Window'],
        url: '#'
      }
    ];
  }
}

export class MockPredictionHistoryService implements IPredictionHistoryService {
  async getAccuracyStats(): Promise<{
    totalPredictions: number;
    accuracyRate: number;
    recentAccuracy: number;
    bestPerformingAlgorithm: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalPredictions: 156,
      accuracyRate: 78.5,
      recentAccuracy: 82.3,
      bestPerformingAlgorithm: 'Kalshi ML v2.1'
    };
  }
}