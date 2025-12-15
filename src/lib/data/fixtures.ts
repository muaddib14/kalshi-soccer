// Enhanced Premier League Fixtures Data using Multiple Official Sources
import { realFixtureService } from './realFixtureData';
import { officialPremierLeagueService } from './officialPremierLeague';

// Enhanced team information mapping
const TEAM_INFO = {
  'Liverpool FC': { shortName: 'LIV', venue: 'Anfield', color: 'from-red-400 to-red-600' },
  'AFC Bournemouth': { shortName: 'BOU', venue: 'Vitality Stadium', color: 'from-red-500 to-yellow-500' },
  'Aston Villa FC': { shortName: 'AVL', venue: 'Villa Park', color: 'from-yellow-400 to-purple-500' },
  'Newcastle United FC': { shortName: 'NEW', venue: 'St. James\' Park', color: 'from-black to-white' },
  'Brighton & Hove Albion FC': { shortName: 'BRI', venue: 'Amex Stadium', color: 'from-blue-400 to-blue-600' },
  'Fulham FC': { shortName: 'FUL', venue: 'Craven Cottage', color: 'from-white to-black' },
  'Sunderland AFC': { shortName: 'SUN', venue: 'Stadium of Light', color: 'from-red-600 to-white' },
  'West Ham United FC': { shortName: 'WHU', venue: 'London Stadium', color: 'from-claret to-blue' },
  'Tottenham Hotspur FC': { shortName: 'TOT', venue: 'Tottenham Hotspur Stadium', color: 'from-white to-gray-200' },
  'Burnley FC': { shortName: 'BUR', venue: 'Turf Moor', color: 'from-claret to-blue' },
  'Wolverhampton Wanderers FC': { shortName: 'WOL', venue: 'Molineux Stadium', color: 'from-yellow-500 to-black' },
  'Manchester City FC': { shortName: 'MCI', venue: 'Etihad Stadium', color: 'from-blue-400 to-blue-600' },
  'Nottingham Forest FC': { shortName: 'FOR', venue: 'City Ground', color: 'from-red-600 to-white' },
  'Brentford FC': { shortName: 'BRE', venue: 'Gtech Community Stadium', color: 'from-red-500 to-yellow-500' },
  'Chelsea FC': { shortName: 'CHE', venue: 'Stamford Bridge', color: 'from-blue-500 to-blue-700' },
  'Crystal Palace FC': { shortName: 'CRY', venue: 'Selhurst Park', color: 'from-blue-500 to-red-500' },
  'Manchester United FC': { shortName: 'MUN', venue: 'Old Trafford', color: 'from-red-600 to-black' },
  'Arsenal FC': { shortName: 'ARS', venue: 'Emirates Stadium', color: 'from-red-500 to-amber-500' },
  'Leeds United FC': { shortName: 'LEE', venue: 'Elland Road', color: 'from-white to-blue' },
  'Everton FC': { shortName: 'EVE', venue: 'Goodison Park', color: 'from-blue-400 to-blue-600' }
};

// Official team name mapping for Premier League data
const OFFICIAL_TEAM_MAPPING = {
  'Liverpool': 'Liverpool FC',
  'Bournemouth': 'AFC Bournemouth',
  'Aston Villa': 'Aston Villa FC',
  'Newcastle United': 'Newcastle United FC',
  'Brighton and Hove Albion': 'Brighton & Hove Albion FC',
  'Fulham': 'Fulham FC',
  'Sunderland': 'Sunderland AFC',
  'West Ham United': 'West Ham United FC',
  'Tottenham Hotspur': 'Tottenham Hotspur FC',
  'Burnley': 'Burnley FC',
  'Wolverhampton Wanderers': 'Wolverhampton Wanderers FC',
  'Manchester City': 'Manchester City FC',
  'Nottingham Forest': 'Nottingham Forest FC',
  'Brentford': 'Brentford FC',
  'Chelsea': 'Chelsea FC',
  'Crystal Palace': 'Crystal Palace FC',
  'Manchester United': 'Manchester United FC',
  'Arsenal': 'Arsenal FC',
  'Leeds United': 'Leeds United FC',
  'Everton': 'Everton FC'
};

// Convert official fixture to website format
const convertOfficialFixture = (fixture: any, index: number) => {
  const homeTeamName = OFFICIAL_TEAM_MAPPING[fixture.homeTeam as keyof typeof OFFICIAL_TEAM_MAPPING] || fixture.homeTeam;
  const awayTeamName = OFFICIAL_TEAM_MAPPING[fixture.awayTeam as keyof typeof OFFICIAL_TEAM_MAPPING] || fixture.awayTeam;
  
  const homeTeamInfo = TEAM_INFO[homeTeamName as keyof typeof TEAM_INFO];
  const awayTeamInfo = TEAM_INFO[awayTeamName as keyof typeof TEAM_INFO];
  
  return {
    id: `official-${fixture.date}-${fixture.homeTeam}-${fixture.awayTeam}`,
    date: `${fixture.date}T${fixture.time || '15:00'}:00Z`,
    homeTeam: {
      name: homeTeamName,
      shortName: homeTeamInfo?.shortName || fixture.homeTeam.substring(0, 3).toUpperCase(),
      logo: `/api/placeholder/60/60?text=${homeTeamInfo?.shortName || fixture.homeTeam.substring(0, 2)}`,
      color: homeTeamInfo?.color || 'from-gray-400 to-gray-600'
    },
    awayTeam: {
      name: awayTeamName,
      shortName: awayTeamInfo?.shortName || fixture.awayTeam.substring(0, 3).toUpperCase(),
      logo: `/api/placeholder/60/60?text=${awayTeamInfo?.shortName || fixture.awayTeam.substring(0, 2)}`,
      color: awayTeamInfo?.color || 'from-gray-400 to-gray-600'
    },
    venue: fixture.venue || homeTeamInfo?.venue || 'TBD',
    status: fixture.status === 'completed' ? 'completed' : 'scheduled',
    matchweek: fixture.date.includes('2025-12-20') || fixture.date.includes('2025-12-21') || fixture.date.includes('2025-12-22') ? 17 : 16,
    actualDate: fixture.date,
    actualTime: fixture.time,
    hasResult: !!fixture.score,
    result: fixture.score ? {
      home: fixture.score.home,
      away: fixture.score.away
    } : null,
    broadcast: fixture.broadcast,
    dataSource: 'official-pl' as const
  };
};

// Get enhanced fixtures combining official and OpenFootball data
const getEnhancedFixtures = (limit: number = 15) => {
  const officialFixtures = officialPremierLeagueService.getUpcomingOfficialFixtures(limit);
  const openFootballFixtures = realFixtureService.getUpcomingFixtures(limit);
  
  // Convert official fixtures to website format
  const convertedOfficial = officialFixtures.map((fixture, index) => 
    convertOfficialFixture({
      ...fixture,
      venue: fixture.venue || 'TBD'
    }, index)
  );
  
  // Convert OpenFootball fixtures
  const convertedOpenFootball = openFootballFixtures.map((fixture, index) => ({
    id: `openfootball-${fixture.round}-${fixture.team1}-${fixture.team2}`,
    date: `${fixture.date}T${fixture.time}:00Z`,
    homeTeam: {
      name: fixture.team1,
      shortName: TEAM_INFO[fixture.team1 as keyof typeof TEAM_INFO]?.shortName || fixture.team1.substring(0, 3).toUpperCase(),
      logo: `/api/placeholder/60/60?text=${TEAM_INFO[fixture.team1 as keyof typeof TEAM_INFO]?.shortName || fixture.team1.substring(0, 2)}`,
      color: TEAM_INFO[fixture.team1 as keyof typeof TEAM_INFO]?.color || 'from-gray-400 to-gray-600'
    },
    awayTeam: {
      name: fixture.team2,
      shortName: TEAM_INFO[fixture.team2 as keyof typeof TEAM_INFO]?.shortName || fixture.team2.substring(0, 3).toUpperCase(),
      logo: `/api/placeholder/60/60?text=${TEAM_INFO[fixture.team2 as keyof typeof TEAM_INFO]?.shortName || fixture.team2.substring(0, 2)}`,
      color: TEAM_INFO[fixture.team2 as keyof typeof TEAM_INFO]?.color || 'from-gray-400 to-gray-600'
    },
    venue: TEAM_INFO[fixture.team1 as keyof typeof TEAM_INFO]?.venue || 'TBD',
    status: fixture.score.ft && fixture.score.ft.length > 0 ? 'completed' : 'scheduled',
    matchweek: parseInt(fixture.round.replace('Matchday ', '')),
    actualDate: fixture.date,
    actualTime: fixture.time,
    hasResult: fixture.score.ft && fixture.score.ft.length > 0,
    result: fixture.score.ft ? {
      home: fixture.score.ft[0],
      away: fixture.score.ft[1],
      halfTime: fixture.score.ht ? {
        home: fixture.score.ht[0],
        away: fixture.score.ht[1]
      } : null
    } : null,
    dataSource: 'openfootball' as const
  }));
  
  // Combine and prioritize official data
  const combined = [...convertedOfficial, ...convertedOpenFootball];
  
  // Remove duplicates and sort by date
  const unique = combined.filter((fixture, index, self) => 
    index === self.findIndex(f => 
      f.homeTeam.name === fixture.homeTeam.name && 
      f.awayTeam.name === fixture.awayTeam.name && 
      f.actualDate === fixture.actualDate
    )
  );
  
  return unique
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
};

// Enhanced fixtures with multiple data sources
export const premierLeagueFixtures = getEnhancedFixtures(15);

// Multi-source data information
export const DATA_SOURCES = {
  official: {
    name: "Official Premier League Website",
    url: "https://www.premierleague.com/",
    description: "Official Premier League fixture data and results",
    license: "Official Premier League Data",
    coverage: "Current Season 2025/26 - Matchweeks 16-17",
    features: ["Real-time results", "Official schedules", "Broadcast info"]
  },
  openfootball: {
    name: "OpenFootball Database",
    url: "https://github.com/openfootball/football.json",
    description: "Free, open, public domain football data",
    license: "CC0-1.0 Public Domain",
    coverage: "English Premier League 2022/23 - 2025/26",
    features: ["Historical data", "Complete fixtures", "Team statistics"]
  }
};

export const DATA_SOURCE = {
  name: "Enhanced Multi-Source Integration",
  url: "https://www.premierleague.com/ & https://github.com/openfootball/football.json",
  description: "Combined official Premier League + OpenFootball database",
  license: "Official PL Data + CC0-1.0 Public Domain",
  coverage: "Current fixtures + Historical analysis",
  lastUpdated: new Date().toISOString(),
  sources: Object.keys(DATA_SOURCES).length
};

// Get all current teams
export const getCurrentTeams = () => {
  return realFixtureService.getCurrentTeams();
};

// Enhanced helper functions
export const getUpcomingFixtures = (limit: number = 8) => {
  const now = new Date();
  return premierLeagueFixtures
    .filter(fixture => new Date(fixture.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
};

export const getFixturesByDate = (date: string) => {
  return premierLeagueFixtures.filter(fixture => 
    fixture.actualDate === date
  );
};

export const formatFixtureDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en', { month: 'short' }),
    time: date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
    weekday: date.toLocaleDateString('en', { weekday: 'short' })
  };
};

export const getMatchWeekFixtures = (matchWeek: number) => {
  return premierLeagueFixtures.filter(fixture => fixture.matchweek === matchWeek);
};

// Get official fixtures only
export const getOfficialFixtures = (limit: number = 10) => {
  return officialPremierLeagueService.getUpcomingOfficialFixtures(limit);
};

// Get recent official results
export const getRecentResults = (limit: number = 5) => {
  return officialPremierLeagueService.getRecentResults(limit);
};

// Get today's fixtures from official source
export const getTodayFixtures = () => {
  return officialPremierLeagueService.getTodayFixtures();
};

// Get enhanced fixture analysis
export const getFixtureAnalysis = (homeTeam: string, awayTeam: string) => {
  return realFixtureService.getFixtureAnalysis(homeTeam, awayTeam);
};

// Get team statistics
export const getTeamStats = (teamName: string) => {
  return realFixtureService.calculateTeamStats(teamName);
};

// Get head-to-head statistics
export const getHeadToHead = (team1: string, team2: string) => {
  return realFixtureService.getHeadToHead(team1, team2);
};

// Get recent form
export const getRecentForm = (teamName: string, matches: number = 5) => {
  return realFixtureService.getRecentForm(teamName, matches);
};

// Get match statistics from official results
export const getMatchStatistics = () => {
  return officialPremierLeagueService.getMatchStatistics();
};

// Get data source summary
export const getDataSourceSummary = () => {
  return officialPremierLeagueService.getCombinedDataSources();
};