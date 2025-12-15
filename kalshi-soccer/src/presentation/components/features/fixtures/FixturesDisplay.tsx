import React, { useState } from 'react';
import { 
  premierLeagueFixtures, 
  getUpcomingFixtures, 
  formatFixtureDate, 
  DATA_SOURCES, 
  getOfficialFixtures, 
  getRecentResults, 
  getTodayFixtures,
  getMatchStatistics,
  getDataSourceSummary,
  type Fixture 
} from '@/lib/data/fixtures';
import { Button } from '@/presentation/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Clock, MapPin, Target, TrendingUp, Database, ExternalLink, Award, BarChart3, CheckCircle } from 'lucide-react';
import { getTeamColor, getGradientFromColor } from '@/lib/utils/helpers';

interface FixturesDisplayProps {
  onFixtureSelect?: (fixture: Fixture) => void;
  className?: string;
}

const FixturesDisplay: React.FC<FixturesDisplayProps> = ({ 
  onFixtureSelect, 
  className 
}) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'today' | 'results'>('upcoming');
  const upcomingFixtures = getUpcomingFixtures(8);
  const todayFixtures = getTodayFixtures();
  const recentResults = getRecentResults(5);
  const matchStats = getMatchStatistics();
  const dataSummary = getDataSourceSummary();

  const getDisplayFixtures = () => {
    switch (selectedTab) {
      case 'today':
        return todayFixtures.map(fixture => ({
          ...fixture,
          homeTeam: {
            name: fixture.homeTeam,
            shortName: fixture.homeTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.homeTeam.substring(0, 2)}`,
            color: 'from-blue-400 to-blue-600'
          },
          awayTeam: {
            name: fixture.awayTeam,
            shortName: fixture.awayTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.awayTeam.substring(0, 2)}`,
            color: 'from-red-400 to-red-600'
          },
          venue: fixture.venue,
          status: fixture.status,
          matchweek: 16,
          actualDate: fixture.date,
          actualTime: fixture.time,
          hasResult: !!fixture.score,
          result: fixture.score,
          broadcast: fixture.broadcast
        }));
      case 'results':
        return recentResults.map(fixture => ({
          ...fixture,
          homeTeam: {
            name: fixture.homeTeam,
            shortName: fixture.homeTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.homeTeam.substring(0, 2)}`,
            color: 'from-blue-400 to-blue-600'
          },
          awayTeam: {
            name: fixture.awayTeam,
            shortName: fixture.awayTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.awayTeam.substring(0, 2)}`,
            color: 'from-red-400 to-red-600'
          },
          venue: fixture.venue,
          status: 'completed',
          matchweek: 16,
          actualDate: fixture.date,
          actualTime: fixture.time,
          hasResult: true,
          result: fixture.score
        }));
      default:
        return upcomingFixtures;
    }
  };

  const displayFixtures = getDisplayFixtures();

  const handleFixtureClick = (fixture: Fixture) => {
    if (onFixtureSelect) {
      onFixtureSelect(fixture);
    }
  };

  return (
    <div className={className}>
      {/* Enhanced Header with Data Sources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Premier League Fixtures</h2>
            <p className="text-slate-600">Official data from Premier League + OpenFootball database</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Official Data
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium flex items-center">
              <Database className="w-3 h-3 mr-1" />
              Enhanced
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{matchStats.totalMatches}</div>
                <div className="text-sm text-slate-600">Recent Matches</div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{matchStats.totalGoals}</div>
                <div className="text-sm text-slate-600">Total Goals</div>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{matchStats.avgGoalsPerMatch.toFixed(1)}</div>
                <div className="text-sm text-slate-600">Avg Goals/Match</div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-900">{matchStats.highScoringMatches}</div>
                <div className="text-sm text-slate-600">High-Scoring (4+)</div>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 mb-6">
        <button
          onClick={() => setSelectedTab('upcoming')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Upcoming Matches
        </button>
        <button
          onClick={() => setSelectedTab('today')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'today'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Today {todayFixtures.length > 0 && `(${todayFixtures.length})`}
        </button>
        <button
          onClick={() => setSelectedTab('results')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'results'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Recent Results
        </button>
      </div>

      {/* Fixtures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayFixtures.map((fixture) => {
          const formattedDate = formatFixtureDate(fixture.date);
          
          return (
            <Card 
              key={fixture.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500"
              onClick={() => handleFixtureClick(fixture)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{formattedDate.weekday}</span>
                    <span>{formattedDate.day} {formattedDate.month}</span>
                    <span>{formattedDate.time}</span>
                  </div>
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                    MW {fixture.matchweek}
                  </div>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{fixture.venue}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Teams Display */}
                <div className="flex items-center justify-between mb-4">
                  {/* Home Team */}
                  <div className="flex-1 text-center">
                    <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${getGradientFromColor(fixture.homeTeam.color)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {fixture.homeTeam.shortName}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight">
                      {fixture.homeTeam.name}
                    </h3>
                  </div>

                  {/* VS and Quick Stats or Score */}
                  <div className="flex flex-col items-center px-4">
                    {fixture.status === 'completed' && fixture.result ? (
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-900 mb-2">
                          {fixture.result.home} - {fixture.result.away}
                        </div>
                        <div className="text-xs text-green-600 font-medium">FT</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-slate-400 mb-2">VS</div>
                        <div className="text-xs text-slate-500 text-center">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Get Prediction</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 text-center">
                    <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${getGradientFromColor(fixture.awayTeam.color)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {fixture.awayTeam.shortName}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight">
                      {fixture.awayTeam.name}
                    </h3>
                  </div>
                </div>

                {/* Action Button */}
                {fixture.status === 'scheduled' ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFixtureClick(fixture);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2"
                    size="sm"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Get AI Prediction
                  </Button>
                ) : (
                  <div className="w-full bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                    <div className="text-xs text-green-700 font-medium">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Match Completed
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {displayFixtures.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No {selectedTab === 'today' ? 'today\'s' : 'upcoming'} matches
          </h3>
          <p className="text-slate-600">
            {selectedTab === 'today' 
              ? 'Check back tomorrow for today\'s Premier League fixtures.'
              : 'All matches for this period have been completed.'
            }
          </p>
        </div>
      )}

      {/* Match Count */}
      <div className="mt-6 text-center text-sm text-slate-500">
        Showing {displayFixtures.length} {selectedTab === 'today' ? 'today\'s' : 'upcoming'} Premier League matches
      </div>

      {/* Enhanced Data Source Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Official Premier League */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-start space-x-3">
            <Award className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-purple-800">Official Premier League</h4>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                  Official
                </span>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                Real-time fixture data and results directly from the official Premier League website
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-purple-600">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Live match results</span>
                </div>
                <div className="flex items-center text-xs text-purple-600">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Official schedules</span>
                </div>
                <div className="flex items-center text-xs text-purple-600">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Broadcast information</span>
                </div>
              </div>
              <a
                href="https://www.premierleague.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800 transition-colors mt-3"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Visit Premier League</span>
              </a>
            </div>
          </div>
        </div>

        {/* OpenFootball Database */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Database className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-green-800">OpenFootball Database</h4>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Historical
                </span>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Comprehensive historical football data for enhanced predictions and analysis
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Historical statistics</span>
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Team performance data</span>
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Head-to-head records</span>
                </div>
              </div>
              <a
                href="https://github.com/openfootball/football.json"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-800 transition-colors mt-3"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Summary */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <h4 className="font-semibold text-slate-800 mb-2">Enhanced Multi-Source Integration</h4>
          <p className="text-sm text-slate-600 mb-3">
            Combining official Premier League data with comprehensive historical analysis for the most accurate predictions
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Official Current Data</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Historical Analysis</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Enhanced Predictions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixturesDisplay;