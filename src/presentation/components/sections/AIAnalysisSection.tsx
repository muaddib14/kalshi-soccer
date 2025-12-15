'use client';

import React from 'react';
import { AIAnalysis } from '@/lib/types';
import AIAnalysisCard from '@/presentation/components/features/ai/AIAnalysisCard';
import { LoadingSpinner, AIAnalysisSkeleton } from '@/presentation/components/ui/Loading';
import { Search } from 'lucide-react';

interface AIAnalysisSectionProps {
  analysis?: AIAnalysis | null;
  isLoading: boolean;
}

const AIAnalysisSection: React.FC<AIAnalysisSectionProps> = ({ analysis, isLoading }) => {
  return (
    <section id="ai-analysis">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">AI Match Analysis</h2>
      
      {isLoading && !analysis ? (
        <AIAnalysisSkeleton />
      ) : analysis ? (
        <AIAnalysisCard analysis={analysis} />
      ) : (
        <div className="bg-slate-50 rounded-xl border-l-4 border-blue-500 p-8 text-center">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis Coming Soon</h3>
          <p className="text-slate-600">Make a match prediction to get detailed AI analysis and insights.</p>
        </div>
      )}
    </section>
  );
};

export default AIAnalysisSection;