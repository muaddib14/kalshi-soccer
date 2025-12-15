'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Clock, MapPin, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { formatFixtureDate, getGradientFromColor } from '@/lib/data/fixtures';
import { type Fixture } from '@/lib/data/fixtures';

interface FixtureCardProps {
  fixture: Fixture;
  onClick: (fixture: Fixture) => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onClick }) => {
  const formattedDate = formatFixtureDate(fixture.date);

  return (
    <Card 
      key={fixture.id}
      className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500"
      onClick={() => onClick(fixture)}
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
              onClick(fixture);
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
};

export default FixtureCard;