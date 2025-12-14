import React, { useState } from 'react';
import { premierLeagueFixtures, getUpcomingFixtures, formatFixtureDate, DATA_SOURCE, type Fixture } from '@/lib/data/fixtures';
import { Button } from '@/presentation/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Clock, MapPin, Target, TrendingUp, Database, ExternalLink } from 'lucide-react';
import { getTeamColor, getGradientFromColor } from '@/lib/utils/helpers';

interface FixturesDisplayProps {
  onFixtureSelect?: (fixture: Fixture) => void;
  className?: string;
}

const FixturesDisplay: React.FC<FixturesDisplayProps> = ({ 
  onFixtureSelect, 
  className 
}) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'today'>('upcoming');
  const upcomingFixtures = getUpcomingFixtures(8);
  const todayFixtures = premierLeagueFixtures.filter(fixture => {
    const today = new Date().toISOString().split('T')[0];
    return fixture.date.startsWith(today);
  });

  const displayFixtures = selectedTab === 'upcoming' ? upcomingFixtures : todayFixtures;

  const handleFixtureClick = (fixture: Fixture) => {
    if (onFixtureSelect) {
      onFixtureSelect(fixture);
    }
  };

  return (
    <div className={className}>
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

                  {/* VS and Quick Stats */}
                  <div className="flex flex-col items-center px-4">
                    <div className="text-2xl font-bold text-slate-400 mb-2">VS</div>
                    <div className="text-xs text-slate-500 text-center">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Get Prediction</span>
                      </div>
                    </div>
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

      {/* Data Source Information */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <Database className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold text-green-800">Real Data Integration</h4>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                Enhanced
              </span>
            </div>
            <p className="text-sm text-green-700 mb-3">
              Fixture data sourced from <strong>{DATA_SOURCE.name}</strong> - {DATA_SOURCE.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-green-600">
                <div>Coverage: {DATA_SOURCE.coverage}</div>
                <div>License: {DATA_SOURCE.license}</div>
              </div>
              <a
                href={DATA_SOURCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-800 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View Source</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixturesDisplay;