// Domain Types - Core business entities
export interface Team {
  id: string;
  name: string;
  logo: string;
  shortName: string;
  league: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
  league: string;
  status: 'scheduled' | 'live' | 'finished';
  venue?: string;
}

export interface MatchPrediction {
  id: string;
  match: Match;
  homeWinPercentage: number;
  awayWinPercentage: number;
  drawPercentage: number;
  overUnder: {
    over15: number;
    under15: number;
    over25: number;
    under25: number;
    over35: number;
    under35: number;
  };
  confidence: 'low' | 'medium' | 'high';
  algorithm: string;
  lastUpdated: Date;
}

export interface AIAnalysis {
  id: string;
  matchId: string;
  content: string;
  keyInsights: string[];
  tacticalAnalysis: string;
  playerRecommendations: string[];
  riskFactors: string[];
  generatedAt: Date;
  model: string;
}

export interface PredictionHistory {
  id: string;
  matchId: string;
  predictedResult: 'home_win' | 'away_win' | 'draw';
  actualResult: 'home_win' | 'away_win' | 'draw' | 'pending';
  accuracy: number;
  predictionDate: Date;
  actualDate?: Date;
  confidence: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: Date;
  imageUrl: string;
  source: string;
  teams: string[];
  tags: string[];
  url: string;
}

// UI Types
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface MatchStats {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
}