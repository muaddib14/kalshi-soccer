'use client';

import React from 'react';
import MatchPredictionSection from './MatchPredictionSection';
import AIAnalysisSection from './AIAnalysisSection';
import PredictionHistorySection from './PredictionHistorySection';
import NewsSection from './NewsSection';
import ErrorMessage from '@/presentation/components/ui/ErrorMessage';
import { MatchPrediction, AIAnalysis, PredictionHistory, AccuracyStats, NewsArticle } from '@/lib/types';

interface MainContentProps {
  currentPrediction?: MatchPrediction | null;
  aiAnalysis?: AIAnalysis | null;
  predictionHistory: PredictionHistory[];
  latestNews: NewsArticle[];
  accuracyStats?: AccuracyStats | null;
  isLoading: boolean;
  selectedFixture?: any;
  onRefresh: () => void;
  error?: string | null;
  onErrorDismiss: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  currentPrediction,
  aiAnalysis,
  predictionHistory,
  latestNews,
  accuracyStats,
  isLoading,
  selectedFixture,
  onRefresh,
  error,
  onErrorDismiss
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Error Message */}
      {error && (
        <ErrorMessage error={error} onDismiss={onErrorDismiss} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column - Prediction and AI Analysis */}
        <div className="lg:col-span-2 space-y-8">
          <MatchPredictionSection
            prediction={currentPrediction}
            isLoading={isLoading}
            selectedFixture={selectedFixture}
            onRefresh={onRefresh}
          />

          <AIAnalysisSection
            analysis={aiAnalysis}
            isLoading={isLoading}
          />

          <PredictionHistorySection
            history={predictionHistory}
            accuracyStats={accuracyStats}
          />
        </div>

        {/* Sidebar - News */}
        <div className="space-y-8">
          <NewsSection
            news={latestNews}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;