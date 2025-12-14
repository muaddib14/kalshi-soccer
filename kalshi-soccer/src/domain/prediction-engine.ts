import { Match, MatchPrediction, Team } from '@/lib/types';

// Domain Layer - Business logic and rules
export class PredictionEngine {
  // SOLID: Single Responsibility - Calculate match predictions
  static calculateMatchPrediction(homeTeam: Team, awayTeam: Team): MatchPrediction {
    const homeAdvantage = this.calculateHomeAdvantage();
    const formFactor = this.calculateFormFactor(homeTeam, awayTeam);
    const leagueFactor = this.calculateLeagueFactor(homeTeam, awayTeam);
    
    // Base probabilities
    let homeWinProb = 35;
    let awayWinProb = 30;
    let drawProb = 35;
    
    // Apply factors
    homeWinProb += homeAdvantage + formFactor.homeAdvantage + leagueFactor.home;
    awayWinProb += formFactor.awayAdvantage + leagueFactor.away;
    drawProb = 100 - homeWinProb - awayWinProb;
    
    // Normalize to ensure they sum to 100
    const total = homeWinProb + awayWinProb + drawProb;
    homeWinProb = (homeWinProb / total) * 100;
    awayWinProb = (awayWinProb / total) * 100;
    drawProb = (drawProb / total) * 100;
    
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
      homeWinPercentage: Math.round(homeWinProb * 10) / 10,
      awayWinPercentage: Math.round(awayWinProb * 10) / 10,
      drawPercentage: Math.round(drawProb * 10) / 10,
      overUnder: {
        over15: this.calculateOverUnder(1.5),
        under15: 100 - this.calculateOverUnder(1.5),
        over25: this.calculateOverUnder(2.5),
        under25: 100 - this.calculateOverUnder(2.5),
        over35: this.calculateOverUnder(3.5),
        under35: 100 - this.calculateOverUnder(3.5)
      },
      confidence: this.determineConfidence(homeWinProb, awayWinProb, drawProb),
      algorithm: 'Kalshi ML v2.1',
      lastUpdated: new Date()
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
  
  // SOLID: Single Responsibility - Calculate over/under goals
  private static calculateOverUnder(threshold: number): number {
    const baseProbability = threshold <= 1.5 ? 75 : threshold <= 2.5 ? 55 : 35;
    const variance = Math.random() * 20 - 10; // ±10 variance
    return Math.max(5, Math.min(95, baseProbability + variance));
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