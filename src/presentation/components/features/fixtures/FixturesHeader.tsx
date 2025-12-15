'use client';

import React from 'react';
import { CheckCircle, Database, BarChart3, Target, TrendingUp, Award } from 'lucide-react';
import { getMatchStatistics } from '@/lib/data/fixtures';

const FixturesHeader: React.FC = () => {
  const matchStats = getMatchStatistics();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Premier League Fixtures</h2>
          <p className="text-slate-600">Official data from Premier League + OpenFootball database</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Official Data
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium flex items-center">
            <Database className="w-3 h-3 mr-1" />
            Enhanced
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{matchStats.totalMatches}</div>
              <div className="text-sm text-slate-600">Recent Matches</div>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{matchStats.totalGoals}</div>
              <div className="text-sm text-slate-600">Total Goals</div>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{matchStats.avgGoalsPerMatch.toFixed(1)}</div>
              <div className="text-sm text-slate-600">Avg Goals/Match</div>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{matchStats.highScoringMatches}</div>
              <div className="text-sm text-slate-600">High-Scoring (4+)</div>
            </div>
            <Award className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixturesHeader;