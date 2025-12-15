'use client';

import React from 'react';
import { AccuracyStats } from '@/lib/types';
import { TrendingUp, Search } from 'lucide-react';

interface StatsOverviewProps {
  accuracyStats?: AccuracyStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ accuracyStats }) => {
  if (!accuracyStats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Total Predictions</p>
            <p className="text-2xl font-bold text-slate-900">{accuracyStats.totalPredictions}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Overall Accuracy</p>
            <p className="text-2xl font-bold text-green-600">{accuracyStats.accuracyRate}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Recent Accuracy</p>
            <p className="text-2xl font-bold text-blue-600">{accuracyStats.recentAccuracy}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm">Best Algorithm</p>
            <p className="text-lg font-bold text-slate-900">{accuracyStats.bestPerformingAlgorithm}</p>
          </div>
          <Search className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;