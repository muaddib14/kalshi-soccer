/**
 * Real Premier League fixture data service
 * Integrates OpenFootball data sources for authentic fixtures and historical data
 */

import premierLeague2025 from '../../data/premier-league-2025-26.json';
import premierLeague2024 from '../../data/premier-league-2023-24.json';
import premierLeague2023 from '../../data/premier-league-2022-23.json';

export interface RealFixture {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score: {
    ht?: number[];
    ft?: number[];
  };
}

export interface TeamStats {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  winRate: number;
  avgGoalsFor: number;
  avgGoalsAgainst: number;
}

export interface FixtureAnalysis {
  homeTeam: string;
  awayTeam: string;
  homeStats: TeamStats;
  awayStats: TeamStats;
  headToHead: {
    total: number;
    homeWins: number;
    awayWins: number;
    draws: number;
  };
  recentForm: {
    home: string[];
    away: string[];
  };
}

class RealFixtureService {
  private currentSeasonData = premierLeague2025;
  private historicalData = [
    premierLeague2024,
    premierLeague2023
  ];

  /**
   * Get upcoming fixtures for the current season
   */
  getUpcomingFixtures(limit: number = 10): RealFixture[] {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    
    return this.currentSeasonData.matches
      .filter((match: RealFixture) => {
        // Include matches from today onwards (no scores means upcoming)
        return match.date >= currentDate || (match.score.ft === undefined || match.score.ft.length === 0);
      })
      .slice(0, limit);
  }

  /**
   * Get all teams from current season
   */
  getCurrentTeams(): string[] {
    const teams = new Set<string>();
    this.currentSeasonData.matches.forEach((match: RealFixture) => {
      teams.add(match.team1);
      teams.add(match.team2);
    });
    return Array.from(teams).sort();
  }

  /**
   * Calculate team statistics from historical data
   */
  calculateTeamStats(teamName: string, seasons: number = 2): TeamStats {
    let totalMatches = 0;
    let totalWins = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let totalGoalsFor = 0;
    let totalGoalsAgainst = 0;

    // Process historical seasons
    for (let i = 0; i < Math.min(seasons, this.historicalData.length); i++) {
      const seasonData = this.historicalData[i];
      const teamMatches = seasonData.matches.filter((match: RealFixture) => 
        match.team1 === teamName || match.team2 === teamName
      );

      teamMatches.forEach((match: RealFixture) => {
        if (match.score.ft && match.score.ft.length === 2) {
          totalMatches++;
          const isHome = match.team1 === teamName;
          const teamGoals = isHome ? match.score.ft[0] : match.score.ft[1];
          const opponentGoals = isHome ? match.score.ft[1] : match.score.ft[0];
          
          totalGoalsFor += teamGoals;
          totalGoalsAgainst += opponentGoals;

          if (teamGoals > opponentGoals) {
            totalWins++;
          } else if (teamGoals === opponentGoals) {
            totalDraws++;
          } else {
            totalLosses++;
          }
        }
      });
    }

    const totalPoints = (totalWins * 3) + totalDraws;
    const winRate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;
    const avgGoalsFor = totalMatches > 0 ? totalGoalsFor / totalMatches : 0;
    const avgGoalsAgainst = totalMatches > 0 ? totalGoalsAgainst / totalMatches : 0;

    return {
      team: teamName,
      played: totalMatches,
      won: totalWins,
      drawn: totalDraws,
      lost: totalLosses,
      goalsFor: totalGoalsFor,
      goalsAgainst: totalGoalsAgainst,
      goalDifference: totalGoalsFor - totalGoalsAgainst,
      points: totalPoints,
      winRate: Math.round(winRate * 100) / 100,
      avgGoalsFor: Math.round(avgGoalsFor * 100) / 100,
      avgGoalsAgainst: Math.round(avgGoalsAgainst * 100) / 100
    };
  }

  /**
   * Get head-to-head statistics
   */
  getHeadToHead(team1: string, team2: string, seasons: number = 3) {
    let totalMatches = 0;
    let team1Wins = 0;
    let team2Wins = 0;
    let draws = 0;

    // Process all available historical data
    for (let i = 0; i < Math.min(seasons, this.historicalData.length); i++) {
      const seasonData = this.historicalData[i];
      const h2hMatches = seasonData.matches.filter((match: RealFixture) =>
        (match.team1 === team1 && match.team2 === team2) ||
        (match.team1 === team2 && match.team2 === team1)
      );

      h2hMatches.forEach((match: RealFixture) => {
        if (match.score.ft && match.score.ft.length === 2) {
          totalMatches++;
          const team1Goals = match.team1 === team1 ? match.score.ft[0] : match.score.ft[1];
          const team2Goals = match.team1 === team1 ? match.score.ft[1] : match.score.ft[0];

          if (team1Goals > team2Goals) {
            team1Wins++;
          } else if (team2Goals > team1Goals) {
            team2Wins++;
          } else {
            draws++;
          }
        }
      });
    }

    return {
      total: totalMatches,
      homeWins: team1Wins,
      awayWins: team2Wins,
      draws: draws
    };
  }

  /**
   * Get recent form for a team (last 5 matches)
   */
  getRecentForm(teamName: string, matches: number = 5): string[] {
    const allMatches: Array<RealFixture & { result: string }> = [];

    // Collect all matches from historical data
    this.historicalData.forEach(seasonData => {
      seasonData.matches.forEach((match: RealFixture) => {
        if (match.team1 === teamName || match.team2 === teamName) {
          if (match.score.ft && match.score.ft.length === 2) {
            const isHome = match.team1 === teamName;
            const teamGoals = isHome ? match.score.ft[0] : match.score.ft[1];
            const opponentGoals = isHome ? match.score.ft[1] : match.score.ft[0];
            
            let result = 'D';
            if (teamGoals > opponentGoals) result = 'W';
            else if (teamGoals < opponentGoals) result = 'L';
            
            allMatches.push({
              ...match,
              result
            });
          }
        }
      });
    });

    // Sort by date and return last N matches
    return allMatches
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, matches)
      .map(match => match.result);
  }

  /**
   * Get detailed fixture analysis
   */
  getFixtureAnalysis(homeTeam: string, awayTeam: string): FixtureAnalysis {
    const homeStats = this.calculateTeamStats(homeTeam);
    const awayStats = this.calculateTeamStats(awayTeam);
    const headToHead = this.getHeadToHead(homeTeam, awayTeam);
    
    return {
      homeTeam,
      awayTeam,
      homeStats,
      awayStats,
      headToHead,
      recentForm: {
        home: this.getRecentForm(homeTeam),
        away: this.getRecentForm(awayTeam)
      }
    };
  }

  /**
   * Get fixture by ID or team combination
   */
  getFixture(homeTeam: string, awayTeam: string): RealFixture | null {
    return this.currentSeasonData.matches.find((match: RealFixture) =>
      match.team1 === homeTeam && match.team2 === awayTeam
    ) || null;
  }

  /**
   * Get data source information
   */
  getDataSourceInfo() {
    return {
      name: "OpenFootball Database",
      url: "https://github.com/openfootball/football.json",
      description: "Free, open, public domain football data",
      license: "CC0-1.0 Public Domain",
      seasons: {
        current: this.currentSeasonData.name,
        historical: this.historicalData.map(data => data.name)
      },
      lastUpdated: new Date().toISOString(),
      coverage: "English Premier League 2022/23 - 2025/26"
    };
  }
}

export const realFixtureService = new RealFixtureService();