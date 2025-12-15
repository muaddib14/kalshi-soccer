import { Match, MatchPrediction, Team } from '@/lib/types';
import { getFixtureAnalysis } from '@/lib/data/fixtures';

// Domain Layer - Business logic and rules
export class PredictionEngine {
  // SOLID: Single Responsibility - Calculate match predictions
  static calculateMatchPrediction(homeTeam: Team, awayTeam: Team): MatchPrediction {
    // Get real fixture analysis from OpenFootball database (or mocks)
    const fixtureAnalysis = getFixtureAnalysis(homeTeam.name, awayTeam.name);
    
    // NEW: Calculate robust probabilities
    const probabilities = this.calculateSmartProbabilities(homeTeam.name, awayTeam.name, fixtureAnalysis);
    
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
      // Use the calculated smart probabilities
      homeWinPercentage: probabilities.homeWin,
      awayWinPercentage: probabilities.awayWin,
      drawPercentage: probabilities.draw,
      
      overUnder: {
        over15: this.calculateOverUnder(1.5, fixtureAnalysis),
        under15: 100 - this.calculateOverUnder(1.5, fixtureAnalysis),
        over25: this.calculateOverUnder(2.5, fixtureAnalysis),
        under25: 100 - this.calculateOverUnder(2.5, fixtureAnalysis),
        over35: this.calculateOverUnder(3.5, fixtureAnalysis),
        under35: 100 - this.calculateOverUnder(3.5, fixtureAnalysis)
      },
      confidence: this.determineConfidence(probabilities.homeWin, probabilities.awayWin, probabilities.draw),
      algorithm: 'Kalshi ML v3.0 Enhanced',
      lastUpdated: new Date(),
      realDataAnalysis: {
        homeStats: fixtureAnalysis.homeStats,
        awayStats: fixtureAnalysis.awayStats,
        headToHead: fixtureAnalysis.headToHead,
        recentForm: fixtureAnalysis.recentForm
      }
    };
  }

  // --- NEW LOGIC: SMART PROBABILITIES ---
  private static calculateSmartProbabilities(homeName: string, awayName: string, analysis?: any) {
    // 1. Define "Power Teams" (Big 6 + Giants)
    const strongTeams = [
      'Manchester City', 'Arsenal', 'Liverpool', 'Real Madrid', 'Barcelona', 
      'Bayern Munich', 'Paris Saint-Germain', 'Inter Milan', 'Manchester United', 
      'Chelsea', 'Tottenham Hotspur', 'Juventus', 'Atletico Madrid'
    ];
    
    let homeStrength = 50; // Base strength
    let awayStrength = 50;

    // Boost for strong teams
    if (strongTeams.some(t => homeName.includes(t))) homeStrength += 25;
    if (strongTeams.some(t => awayName.includes(t))) awayStrength += 25;

    // 2. Add Analysis Data Influence (if available)
    if (analysis) {
        // Win rate contribution (0-10 pts)
        homeStrength += (analysis.homeStats.winRate / 10); 
        awayStrength += (analysis.awayStats.winRate / 10);
        
        // Form contribution (Recent wins add strength)
        const homeRecentWins = analysis.recentForm.home.filter((r: string) => r === 'W').length;
        const awayRecentWins = analysis.recentForm.away.filter((r: string) => r === 'W').length;
        homeStrength += homeRecentWins * 3;
        awayStrength += awayRecentWins * 3;
    }

    // 3. Home Advantage (+15%)
    const homeFieldAdvantage = 15;
    const adjustedHomeStrength = homeStrength + homeFieldAdvantage;

    // 4. Calculate Differential
    const diff = adjustedHomeStrength - awayStrength;

    // 5. Base Probabilities
    let homeWin = 35; 
    let draw = 30;
    let awayWin = 35;

    // Shift based on differential
    // If Home is stronger (diff > 0), HomeWin goes UP, AwayWin goes DOWN
    homeWin += diff * 0.6; 
    awayWin -= diff * 0.6;

    // Draw logic: Draw is most likely when teams are equal (diff ~ 0)
    // Draw probability drops as the mismatch gets bigger
    draw = 30 - (Math.abs(diff) * 0.15);

    // 6. Clamp values (Keep them realistic, between 5% and 90%)
    homeWin = Math.max(5, Math.min(90, homeWin));
    awayWin = Math.max(5, Math.min(90, awayWin));
    draw = Math.max(5, Math.min(90, draw));

    // 7. NORMALIZE (Crucial: Ensure sum is exactly 100%)
    const total = homeWin + awayWin + draw;
    
    const finalHome = Math.round((homeWin / total) * 100);
    const finalAway = Math.round((awayWin / total) * 100);
    const finalDraw = 100 - finalHome - finalAway; // Remainder

    return {
      homeWin: finalHome,
      awayWin: finalAway,
      draw: finalDraw
    };
  }

  // Calculate over/under goals
  private static calculateOverUnder(threshold: number, fixtureAnalysis?: any): number {
    let baseProbability: number;
    
    if (fixtureAnalysis) {
      const { homeStats, awayStats } = fixtureAnalysis;
      const expectedTotalGoals = homeStats.avgGoalsFor + awayStats.avgGoalsFor;
      
      if (threshold <= 1.5) {
        baseProbability = expectedTotalGoals > 2.5 ? 85 : 70;
      } else if (threshold <= 2.5) {
        baseProbability = expectedTotalGoals > 2.5 ? 65 : 45;
      } else {
        baseProbability = expectedTotalGoals > 3.0 ? 40 : 25;
      }
    } else {
      baseProbability = threshold <= 1.5 ? 75 : threshold <= 2.5 ? 55 : 35;
    }
    
    const variance = Math.random() * 10 - 5;
    return Math.max(10, Math.min(90, Math.round(baseProbability + variance)));
  }
  
  // Determine confidence level
  private static determineConfidence(homeWin: number, awayWin: number, draw: number): 'low' | 'medium' | 'high' {
    const max = Math.max(homeWin, awayWin, draw);
    if (max > 60) return 'high';
    if (max > 45) return 'medium';
    return 'low';
  }
  
  // Generate unique ID
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