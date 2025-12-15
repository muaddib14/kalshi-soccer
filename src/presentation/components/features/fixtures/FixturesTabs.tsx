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
    <div className="flex items-center space-x-2 mb-6 bg-slate-100/50 p-1 rounded-xl w-fit">
      {[
        { id: 'upcoming', label: 'Upcoming Matches' },
        { id: 'today', label: `Today ${todayFixturesCount > 0 ? `(${todayFixturesCount})` : ''}` },
        { id: 'results', label: 'Recent Results' }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedTab === tab.id
              // UPDATED: Active state is now Emerald with shadow
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/10'
              : 'text-slate-600 hover:bg-white hover:text-emerald-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FixturesTabs;