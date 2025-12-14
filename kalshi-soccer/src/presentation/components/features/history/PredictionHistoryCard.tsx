import React from 'react';
import { PredictionHistory } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Activity, CheckCircle, XCircle, Minus, TrendingUp } from 'lucide-react';
import { getResultColor, formatDate } from '@/lib/utils/helpers';

interface PredictionHistoryCardProps {
  history: PredictionHistory[];
  accuracyStats?: {
    totalPredictions: number;
    accuracyRate: number;
    recentAccuracy: number;
    bestPerformingAlgorithm: string;
  };
  className?: string;
}

const PredictionHistoryCard: React.FC<PredictionHistoryCardProps> = ({ 
  history, 
  accuracyStats,
  className 
}) => {
  const getResultIcon = (result: 'home_win' | 'away_win' | 'draw' | 'pending') => {
    switch (result) {
      case 'home_win':
      case 'away_win':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'draw':
        return <Minus className="w-4 h-4 text-yellow-600" />;
      case 'pending':
        return <Activity className="w-4 h-4 text-gray-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getResultText = (result: 'home_win' | 'away_win' | 'draw' | 'pending') => {
    switch (result) {
      case 'home_win':
        return 'Home Win';
      case 'away_win':
        return 'Away Win';
      case 'draw':
        return 'Draw';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Prediction History
          </CardTitle>
          {accuracyStats && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg text-slate-900">{accuracyStats.totalPredictions}</div>
                <div className="text-slate-600">Total</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-green-600">{accuracyStats.accuracyRate}%</div>
                <div className="text-slate-600">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-blue-600">{accuracyStats.recentAccuracy}%</div>
                <div className="text-slate-600">Recent</div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {/* Accuracy Stats Summary */}
        {accuracyStats && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-semibold text-blue-900">Performance Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Best Algorithm:</span>
                <span className="ml-2 font-medium text-slate-900">{accuracyStats.bestPerformingAlgorithm}</span>
              </div>
              <div>
                <span className="text-slate-600">Recent Trend:</span>
                <span className="ml-2 font-medium text-green-600">
                  {accuracyStats.recentAccuracy > accuracyStats.accuracyRate ? '↗ Improving' : '↘ Declining'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* History List */}
        <div className="space-y-4">
          {history.map((prediction) => (
            <div 
              key={prediction.id} 
              className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getResultIcon(prediction.actualResult)}
                  <div>
                    <div className="font-medium text-slate-900">
                      {getResultText(prediction.predictedResult)} → {getResultText(prediction.actualResult)}
                    </div>
                    <div className="text-sm text-slate-600">
                      Predicted {formatDate(prediction.predictionDate)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getResultColor(prediction.actualResult)}`}>
                    {prediction.accuracy}% Match
                  </div>
                  {prediction.actualDate && (
                    <div className="text-xs text-slate-600 mt-1">
                      Actual {formatDate(prediction.actualDate)}
                    </div>
                  )}
                </div>
              </div>

              {/* Confidence and Accuracy Bars */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Prediction Confidence</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Actual Accuracy</span>
                    <span>{prediction.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        prediction.accuracy >= 80 ? 'bg-green-500' : 
                        prediction.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${prediction.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {history.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No prediction history available yet.</p>
            <p className="text-sm">Make a prediction to see your accuracy stats!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionHistoryCard;