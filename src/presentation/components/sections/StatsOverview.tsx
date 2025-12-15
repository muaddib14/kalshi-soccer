'use client';

import React from 'react';
import { AccuracyStats } from '@/lib/types';
import { TrendingUp, Search, Activity, Trophy } from 'lucide-react';

interface StatsOverviewProps {
  accuracyStats?: AccuracyStats | null;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ accuracyStats }) => {
  if (!accuracyStats) return null;

  const stats = [
    {
      label: 'Total Predictions',
      value: accuracyStats.totalPredictions,
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Overall Accuracy',
      value: `${accuracyStats.accuracyRate}%`,
      icon: Trophy,
      // UPDATED: Gold/Yellow for Trophy
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      label: 'Recent Form',
      value: `${accuracyStats.recentAccuracy}%`,
      icon: TrendingUp,
      // UPDATED: Emerald for "Good Form"
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Best Algorithm',
      value: accuracyStats.bestPerformingAlgorithm,
      icon: Search,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 font-heading">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;