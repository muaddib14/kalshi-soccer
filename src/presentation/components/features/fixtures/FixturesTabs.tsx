'use client';

import React from 'react';

interface FixturesTabsProps {
  selectedTab: 'upcoming' | 'today' | 'results';
  onTabChange: (tab: 'upcoming' | 'today' | 'results') => void;
  todayFixturesCount: number;
}

const FixturesTabs: React.FC<FixturesTabsProps> = ({ 
  selectedTab, 
  onTabChange, 
  todayFixturesCount 
}) => {
  return (
    <div className="flex items-center space-x-1 mb-6">
      <button
        onClick={() => onTabChange('upcoming')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedTab === 'upcoming'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
        }`}
      >
        Upcoming Matches
      </button>
      <button
        onClick={() => onTabChange('today')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedTab === 'today'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
        }`}
      >
        Today {todayFixturesCount > 0 && `(${todayFixturesCount})`}
      </button>
      <button
        onClick={() => onTabChange('results')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedTab === 'results'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
        }`}
      >
        Recent Results
      </button>
    </div>
  );
};

export default FixturesTabs;