import React from 'react';
import { MatchPrediction } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { formatPercentage, getConfidenceColor, getGradientFromColor, getTeamColor } from '@/lib/utils/helpers';
import { TrendingUp, Activity, Target } from 'lucide-react';

interface MatchForecastCardProps {
  prediction: MatchPrediction;
  className?: string;
}

const MatchForecastCard: React.FC<MatchForecastCardProps> = ({ 
  prediction, 
  className 
}) => {
  const { 
    match, 
    homeWinPercentage, 
    awayWinPercentage, 
    drawPercentage,
    overUnder,
    confidence,
    algorithm,
    lastUpdated 
  } = prediction;

  const homeTeamColor = getTeamColor(match.homeTeam.name);
  const awayTeamColor = getTeamColor(match.awayTeam.name);
  
  const maxProbability = Math.max(homeWinPercentage, awayWinPercentage, drawPercentage);
  const predictedWinner = maxProbability === homeWinPercentage ? 'home' : 
                         maxProbability === awayWinPercentage ? 'away' : 'draw';

  return (
    <Card className={`${className} transition-all duration-300 hover:shadow-lg`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Match Oracle
          </CardTitle>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(confidence)}`}>
            {confidence.toUpperCase()} CONFIDENCE
          </div>
        </div>
        <p className="text-sm text-slate-600">
          {algorithm} • Updated {lastUpdated.toLocaleTimeString()}
        </p>
      </CardHeader>

      <CardContent>
        {/* Team vs Team Display */}
        <div className="grid grid-cols-3 gap-6 items-center mb-8">
          {/* Home Team */}
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-3 rounded-full ${getGradientFromColor(homeTeamColor)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {match.homeTeam.shortName}
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{match.homeTeam.name}</h3>
            <p className="text-sm text-slate-600">{match.homeTeam.league}</p>
          </div>

          {/* Match Score Prediction */}
          <div className="text-center">
            <div className="bg-slate-100 rounded-lg p-4 mb-4">
              <div className="text-4xl font-bold text-slate-900 font-mono">
                {predictedWinner === 'home' ? '2' : '1'} - {predictedWinner === 'away' ? '2' : '1'}
              </div>
              <div className="text-sm text-slate-600 mt-1">Predicted Score</div>
            </div>
            <div className="text-sm text-slate-500">
              {match.date.toLocaleDateString()}
            </div>
          </div>

          {/* Away Team */}
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-3 rounded-full ${getGradientFromColor(awayTeamColor)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {match.awayTeam.shortName}
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{match.awayTeam.name}</h3>
            <p className="text-sm text-slate-600">{match.awayTeam.league}</p>
          </div>
        </div>

        {/* Win Probability Bars */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Win Probabilities
          </h4>
          
          {/* Home Win */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Home Win</span>
              <span className="font-bold text-green-600">{formatPercentage(homeWinPercentage)}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${homeWinPercentage}%` }}
              />
            </div>
          </div>

          {/* Draw */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Draw</span>
              <span className="font-bold text-yellow-600">{formatPercentage(drawPercentage)}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${drawPercentage}%` }}
              />
            </div>
          </div>

          {/* Away Win */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Away Win</span>
              <span className="font-bold text-blue-600">{formatPercentage(awayWinPercentage)}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${awayWinPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Over/Under Goals */}
        <div className="mt-8">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Over/Under Goals
          </h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-900">{formatPercentage(overUnder.over15)}</div>
              <div className="text-sm text-slate-600">Over 1.5</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-900">{formatPercentage(overUnder.over25)}</div>
              <div className="text-sm text-slate-600">Over 2.5</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-900">{formatPercentage(overUnder.over35)}</div>
              <div className="text-sm text-slate-600">Over 3.5</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchForecastCard;