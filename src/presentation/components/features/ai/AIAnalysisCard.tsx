import React from 'react';
import { AIAnalysis } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Sparkles, Brain, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/helpers';

interface AIAnalysisCardProps {
  analysis: AIAnalysis;
  className?: string;
}

const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({ 
  analysis, 
  className 
}) => {
  const { 
    content, 
    keyInsights, 
    tacticalAnalysis, 
    playerRecommendations, 
    riskFactors, 
    generatedAt,
    model 
  } = analysis;

  return (
    <Card className={`${className} bg-slate-50 border-l-4 border-blue-500`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-slate-800">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            AI Match Analysis
          </CardTitle>
          <div className="text-sm text-slate-600">
            Generated {formatRelativeTime(generatedAt)}
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Powered by {model}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Analysis Content */}
        <div className="prose prose-sm max-w-none">
          {content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="text-lg font-semibold text-slate-900 mb-3 mt-6 first:mt-0">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h4 key={index} className="font-semibold text-slate-800 mb-2 mt-4">
                  {paragraph.replace(/\*\*/g, '')}
                </h4>
              );
            } else if (paragraph.trim()) {
              return (
                <p key={index} className="text-slate-700 mb-3 leading-relaxed">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Key Insights */}
        <div>
          <div className="flex items-center mb-3">
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
            <h4 className="font-semibold text-slate-900">Key Insights</h4>
          </div>
          <div className="space-y-2">
            {keyInsights.map((insight, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-slate-700 text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Analysis */}
        <div>
          <div className="flex items-center mb-3">
            <Brain className="w-4 h-4 mr-2 text-purple-600" />
            <h4 className="font-semibold text-slate-900">Tactical Analysis</h4>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700 text-sm leading-relaxed">{tacticalAnalysis}</p>
          </div>
        </div>

        {/* Player Recommendations */}
        <div>
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
            <h4 className="font-semibold text-slate-900">Player Recommendations</h4>
          </div>
          <div className="space-y-2">
            {playerRecommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-slate-700 text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
            <h4 className="font-semibold text-slate-900">Risk Factors</h4>
          </div>
          <div className="space-y-2">
            {riskFactors.map((risk, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <p className="text-slate-700 text-sm">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisCard;