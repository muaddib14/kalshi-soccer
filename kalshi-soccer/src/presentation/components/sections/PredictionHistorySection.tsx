'use client';

import React from 'react';
import { PredictionHistory, AccuracyStats } from '@/lib/types';
import PredictionHistoryCard from '@/presentation/components/features/history/PredictionHistoryCard';

interface PredictionHistorySectionProps {
  history: PredictionHistory[];
  accuracyStats?: AccuracyStats;
}

const PredictionHistorySection: React.FC<PredictionHistorySectionProps> = ({ 
  history, 
  accuracyStats 
}) => {
  return (
    <section id="history">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Prediction History</h2>
      <PredictionHistoryCard 
        history={history} 
        accuracyStats={accuracyStats}
      />
    </section>
  );
};

export default PredictionHistorySection;