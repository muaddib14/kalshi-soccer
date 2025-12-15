import { create } from 'zustand';
import { 
  MatchPrediction, 
  AIAnalysis, 
  PredictionHistory, 
  NewsArticle, 
  LoadingState 
} from '@/lib/types';
import { 
  IPredictionService,
  IAIService,
  INewsService,
  IPredictionHistoryService,
  MockPredictionService,
  MockAIService,
  MockNewsService,
  MockPredictionHistoryService
} from '@/application/services';

// Store Types
interface MatchState extends LoadingState {
  currentPrediction: MatchPrediction | null;
  aiAnalysis: AIAnalysis | null;
  predictionHistory: PredictionHistory[];
  latestNews: NewsArticle[];
  accuracyStats: {
    totalPredictions: number;
    accuracyRate: number;
    recentAccuracy: number;
    bestPerformingAlgorithm: string;
  } | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadMatchPrediction: (homeTeam: string, awayTeam: string) => Promise<void>;
  loadAIAnalysis: (matchId: string) => Promise<void>;
  loadPredictionHistory: () => Promise<void>;
  loadLatestNews: () => Promise<void>;
  loadAccuracyStats: () => Promise<void>;
}

// Service instances (Dependency Injection for SOLID)
let predictionService: IPredictionService;
let aiService: IAIService;
let newsService: INewsService;
let historyService: IPredictionHistoryService;

const initializeServices = () => {
  // In production, these would be real API services
  // For now, using mock services
  predictionService = new MockPredictionService();
  aiService = new MockAIService();
  newsService = new MockNewsService();
  historyService = new MockPredictionHistoryService();
};

// Zustand Store Implementation
export const useMatchStore = create<MatchState>((set, get) => ({
  // Initial state
  isLoading: false,
  error: null,
  currentPrediction: null,
  aiAnalysis: null,
  predictionHistory: [],
  latestNews: [],
  accuracyStats: null,
  
  // Actions
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  loadMatchPrediction: async (homeTeam: string, awayTeam: string) => {
    try {
      set({ isLoading: true, error: null });
      initializeServices();
      
      const prediction = await predictionService.getMatchPrediction(homeTeam, awayTeam);
      set({ currentPrediction: prediction, isLoading: false });
      
      // Auto-load AI analysis for the predicted match with match data
      const matchData = {
        homeTeam: prediction.match.homeTeam.name,
        awayTeam: prediction.match.awayTeam.name,
        league: prediction.match.league,
        homeForm: generateFormData(prediction.match.homeTeam.name),
        awayForm: generateFormData(prediction.match.awayTeam.name),
        h2h: generateH2HData(prediction.match.homeTeam.name, prediction.match.awayTeam.name),
        homeAdvantage: true
      };
      get().loadAIAnalysis(prediction.match.id, matchData);
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load prediction',
        isLoading: false 
      });
    }
  },
  
  loadAIAnalysis: async (matchId: string, matchData?: any) => {
    try {
      set({ isLoading: true, error: null });
      initializeServices();
      
      const analysis = await aiService.generateMatchAnalysis(matchId, matchData);
      set({ aiAnalysis: analysis, isLoading: false });
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load AI analysis',
        isLoading: false 
      });
    }
  },
  
  loadPredictionHistory: async () => {
    try {
      set({ isLoading: true, error: null });
      initializeServices();
      
      const history = await predictionService.getPredictionHistory();
      set({ predictionHistory: history, isLoading: false });
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load history',
        isLoading: false 
      });
    }
  },
  
  loadLatestNews: async () => {
    try {
      set({ isLoading: true, error: null });
      initializeServices();
      
      const news = await newsService.getLatestNews();
      set({ latestNews: news, isLoading: false });
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load news',
        isLoading: false 
      });
    }
  },
  
  loadAccuracyStats: async () => {
    try {
      set({ isLoading: true, error: null });
      initializeServices();
      
      const stats = await historyService.getAccuracyStats();
      set({ accuracyStats: stats, isLoading: false });
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load stats',
        isLoading: false 
      });
    }
  }
}));

// Helper functions for generating match data
const generateFormData = (teamName: string): string => {
  const forms = ['strong recent form with 4 wins in last 5 matches', 'mixed results with 2 wins in last 5', 'struggling form with only 1 win in last 5', 'excellent form with 5 consecutive wins'];
  return forms[Math.floor(Math.random() * forms.length)];
};

const generateH2HData = (homeTeam: string, awayTeam: string): string => {
  const h2hData = [
    `favors ${homeTeam} with 65% win rate in last 10 meetings`,
    `shows balanced record with 4 wins each in last 8 meetings`,
    `slightly favors ${awayTeam} with 55% win rate in last 10 meetings`,
    `recent meetings have been very close with 3 draws in last 6`
  ];
  return h2hData[Math.floor(Math.random() * h2hData.length)];
};

// Hook for specific data selectors (for performance)
export const usePrediction = () => useMatchStore(state => state.currentPrediction);
export const useAIAnalysis = () => useMatchStore(state => state.aiAnalysis);
export const usePredictionHistory = () => useMatchStore(state => state.predictionHistory);
export const useLatestNews = () => useMatchStore(state => state.latestNews);
export const useAccuracyStats = () => useMatchStore(state => state.accuracyStats);
export const useLoadingState = () => useMatchStore(state => ({
  isLoading: state.isLoading,
  error: state.error
}));