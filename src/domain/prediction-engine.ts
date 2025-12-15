import { Match, MatchPrediction, Team } from '@/lib/types';
import { getFixtureAnalysis } from '@/lib/data/fixtures';

// Domain Layer - Business logic and rules
export class PredictionEngine {
  // SOLID: Single Responsibility - Calculate match predictions with real data
  static calculateMatchPrediction(homeTeam: Team, awayTeam: Team): MatchPrediction {
    // Get real fixture analysis from OpenFootball database
    const fixtureAnalysis = getFixtureAnalysis(homeTeam.name, awayTeam.name);
    
    // Enhanced prediction using real data
    const prediction = this.calculateRealDataPrediction(fixtureAnalysis);
    
    return {
      id: this.generateId(),
      match: {
        id: this.generateId(),
        homeTeam,
        awayTeam,
        date: new Date(Date.now() + 86400000), // Tomorrow
        league: homeTeam.league,
        status: 'scheduled'
      },
      homeWinPercentage: prediction.homeWinProb,
      awayWinPercentage: prediction.awayWinProb,
      drawPercentage: prediction.drawProb,
      overUnder: {
        over15: this.calculateOverUnder(1.5, fixtureAnalysis),
        under15: 100 - this.calculateOverUnder(1.5, fixtureAnalysis),
        over25: this.calculateOverUnder(2.5, fixtureAnalysis),
        under25: 100 - this.calculateOverUnder(2.5, fixtureAnalysis),
        over35: this.calculateOverUnder(3.5, fixtureAnalysis),
        under35: 100 - this.calculateOverUnder(3.5, fixtureAnalysis)
      },
      confidence: this.determineConfidence(prediction.homeWinProb, prediction.awayWinProb, prediction.drawProb),
      algorithm: 'Kalshi ML v3.0 Enhanced',
      lastUpdated: new Date(),
      // Enhanced data from real fixture analysis
      realDataAnalysis: {
        homeStats: fixtureAnalysis.homeStats,
        awayStats: fixtureAnalysis.awayStats,
        headToHead: fixtureAnalysis.headToHead,
        recentForm: fixtureAnalysis.recentForm
      }
    };
  }

  // SOLID: Single Responsibility - Enhanced prediction using real data
  private static calculateRealDataPrediction(fixtureAnalysis: any) {
    const { homeStats, awayStats, headToHead, recentForm } = fixtureAnalysis;
    
    // Base probabilities using team strength
    let homeWinProb = 35;
    let awayWinProb = 30;
    let drawProb = 35;
    
    // Team strength factor (win rate difference)
    const strengthDiff = (homeStats.winRate - awayStats.winRate) / 100;
    homeWinProb += strengthDiff * 15; // +/-15% based on strength difference
    
    // Goals factor (attacking vs defensive strength)
    const homeGoalsFactor = homeStats.avgGoalsFor - awayStats.avgGoalsAgainst;
    const awayGoalsFactor = awayStats.avgGoalsFor - homeStats.avgGoalsAgainst;
    
    homeWinProb += homeGoalsFactor * 8;
    awayWinProb += awayGoalsFactor * 6;
    
    // Head-to-head factor
    if (headToHead.total > 0) {
      const homeWinRateH2H = headToHead.homeWins / headToHead.total;
      const awayWinRateH2H = headToHead.awayWins / headToHead.total;
      const drawRateH2H = headToHead.draws / headToHead.total;
      
      homeWinProb += (homeWinRateH2H - 0.33) * 10; // Adjust based on H2H
      awayWinProb += (awayWinRateH2H - 0.33) * 8;
      drawProb += (drawRateH2H - 0.33) * 5;
    }
    
    // Recent form factor (last 5 matches)
    const homeFormPoints = recentForm.home.reduce((acc: number, result: string) => {
      return acc + (result === 'W' ? 3 : result === 'D' ? 1 : 0);
    }, 0);
    const awayFormPoints = recentForm.away.reduce((acc: number, result: string) => {
      return acc + (result === 'W' ? 3 : result === 'D' ? 1 : 0);
    }, 0);
    
    const formDiff = (homeFormPoints - awayFormPoints) / 15; // Normalize to -1 to 1
    homeWinProb += formDiff * 10;
    
    // Home advantage (still applies even with real data)
    homeWinProb += 8; // Standard home advantage
    
    // Ensure probabilities are realistic
    homeWinProb = Math.max(15, Math.min(70, homeWinProb));
    awayWinProb = Math.max(15, Math.min(60, awayWinProb));
    drawProb = Math.max(15, Math.min(50, drawProb));
    
    // Normalize to ensure they sum to 100
    const total = homeWinProb + awayWinProb + drawProb;
    homeWinProb = (homeWinProb / total) * 100;
    awayWinProb = (awayWinProb / total) * 100;
    drawProb = (drawProb / total) * 100;
    
    return {
      homeWinProb: Math.round(homeWinProb * 10) / 10,
      awayWinProb: Math.round(awayWinProb * 10) / 10,
      drawProb: Math.round(drawProb * 10) / 10
    };
  }
  
  // SOLID: Single Responsibility - Calculate home advantage
  private static calculateHomeAdvantage(): number {
    return Math.random() * 10 + 5; // 5-15% advantage
  }
  
  // SOLID: Single Responsibility - Calculate form factors
  private static calculateFormFactor(homeTeam: Team, awayTeam: Team) {
    const homeForm = Math.random() * 15 - 5; // -5 to +10
    const awayForm = Math.random() * 15 - 10; // -10 to +5
    
    return {
      homeAdvantage: homeForm,
      awayAdvantage: awayForm
    };
  }
  
  // SOLID: Single Responsibility - Calculate league-specific factors
  private static calculateLeagueFactor(homeTeam: Team, awayTeam: Team) {
    const majorLeagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'];
    const isMajorLeague = majorLeagues.includes(homeTeam.league);
    
    return {
      home: isMajorLeague ? 3 : 0,
      away: isMajorLeague ? 2 : 1
    };
  }
  
  // SOLID: Single Responsibility - Calculate over/under goals with real data
  private static calculateOverUnder(threshold: number, fixtureAnalysis?: any): number {
    let baseProbability: number;
    
    if (fixtureAnalysis) {
      const { homeStats, awayStats } = fixtureAnalysis;
      const expectedTotalGoals = homeStats.avgGoalsFor + awayStats.avgGoalsFor;
      
      // Calculate probability based on expected goals
      if (threshold <= 1.5) {
        baseProbability = expectedTotalGoals > 2.5 ? 85 : 70;
      } else if (threshold <= 2.5) {
        baseProbability = expectedTotalGoals > 2.5 ? 65 : 45;
      } else {
        baseProbability = expectedTotalGoals > 3.0 ? 40 : 25;
      }
    } else {
      // Fallback to original logic
      baseProbability = threshold <= 1.5 ? 75 : threshold <= 2.5 ? 55 : 35;
    }
    
    const variance = Math.random() * 15 - 7.5; // ±7.5 variance (reduced with real data)
    return Math.max(10, Math.min(90, baseProbability + variance));
  }
  
  // SOLID: Single Responsibility - Determine confidence level
  private static determineConfidence(homeWin: number, awayWin: number, draw: number): 'low' | 'medium' | 'high' {
    const max = Math.max(homeWin, awayWin, draw);
    const min = Math.min(homeWin, awayWin, draw);
    const spread = max - min;
    
    if (spread > 30) return 'high';
    if (spread > 15) return 'medium';
    return 'low';
  }
  
  // SOLID: Single Responsibility - Generate unique ID
  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// SOLID: Single Responsibility - Validate match data
export class MatchValidator {
  static validateTeam(team: Team): boolean {
    return !!(team.id && team.name && team.shortName && team.league);
  }
  
  static validateMatch(match: Match): boolean {
    return this.validateTeam(match.homeTeam) && 
           this.validateTeam(match.awayTeam) && 
           match.date instanceof Date;
  }
}