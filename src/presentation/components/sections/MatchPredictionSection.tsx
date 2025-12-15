'use client';

import React from 'react';
import { MatchPrediction } from '@/lib/types';
import MatchForecastCard from '@/presentation/components/features/forecast/MatchForecastCard';
import { Button } from '@/presentation/components/ui/Button';
import { LoadingSpinner, MatchPredictionSkeleton } from '@/presentation/components/ui/Loading';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface MatchPredictionSectionProps {
  prediction?: MatchPrediction | null;
  isLoading: boolean;
  selectedFixture?: any;
  onRefresh: () => void;
}

const MatchPredictionSection: React.FC<MatchPredictionSectionProps> = ({
  prediction,
  isLoading,
  selectedFixture,
  onRefresh
}) => {
  return (
    <section id="forecast">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Match Forecast</h2>
        {prediction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        )}
      </div>
      
      {isLoading && !prediction ? (
        <MatchPredictionSkeleton />
      ) : prediction ? (
        <MatchForecastCard prediction={prediction} />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Prediction Yet</h3>
          <p className="text-slate-600">Select teams above to get started with AI-powered predictions.</p>
        </div>
      )}
    </section>
  );
};

export default MatchPredictionSection;