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
    // UPDATED: Border color to Emerald
    <Card className={`${className} bg-white border-l-4 border-emerald-500 shadow-md`}>
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-slate-800 font-heading text-xl">
            {/* UPDATED: Icon color */}
            <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
            AI Match Analysis
          </CardTitle>
          <div className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-500">
            {formatRelativeTime(generatedAt)}
          </div>
        </div>
        <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mt-1">
          Powered by {model}
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* Main Analysis Content */}
        <div className="prose prose-sm max-w-none text-slate-600">
          {content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="text-lg font-bold text-slate-900 mb-2 mt-4 font-heading uppercase">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return (
                <h4 key={index} className="font-semibold text-emerald-700 mb-1 mt-2">
                  {paragraph.replace(/\*\*/g, '')}
                </h4>
              );
            } else if (paragraph.trim()) {
              return (
                <p key={index} className="mb-2 leading-relaxed">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Tactical Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Key Insights */}
          <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
              <h4 className="font-bold text-slate-900 font-heading uppercase text-sm">Key Insights</h4>
            </div>
            <ul className="space-y-2">
              {keyInsights.map((insight, index) => (
                <li key={index} className="flex items-start text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Analysis */}
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
            <div className="flex items-center mb-3">
              <Brain className="w-4 h-4 mr-2 text-indigo-600" />
              <h4 className="font-bold text-slate-900 font-heading uppercase text-sm">Tactics</h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{tacticalAnalysis}</p>
          </div>
        </div>

        {/* Player Recommendations */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
            <h4 className="font-bold text-slate-900 font-heading uppercase text-sm">Players to Watch</h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {playerRecommendations.map((rec, index) => (
              <div key={index} className="flex items-center bg-white p-2 rounded border border-emerald-100/50 shadow-sm">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs mr-3">
                   {index + 1}
                 </div>
                 <span className="text-sm font-medium text-slate-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
            <h4 className="font-bold text-slate-900 font-heading uppercase text-sm">Risk Assessment</h4>
          </div>
          <ul className="space-y-2">
            {riskFactors.map((risk, index) => (
              <li key={index} className="flex items-start text-sm text-slate-700">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisCard;