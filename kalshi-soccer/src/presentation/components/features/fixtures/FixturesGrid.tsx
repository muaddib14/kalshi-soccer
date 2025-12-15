'use client';

import React from 'react';
import FixtureCard from './FixtureCard';
import { Target } from 'lucide-react';
import { type Fixture } from '@/lib/data/fixtures';

interface FixturesGridProps {
  fixtures: Fixture[];
  selectedTab: 'upcoming' | 'today' | 'results';
  onFixtureClick: (fixture: Fixture) => void;
}

const FixturesGrid: React.FC<FixturesGridProps> = ({ 
  fixtures, 
  selectedTab, 
  onFixtureClick 
}) => {
  return (
    <>
      {/* Fixtures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fixtures.map((fixture) => (
          <FixtureCard
            key={fixture.id}
            fixture={fixture}
            onClick={onFixtureClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {fixtures.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No {selectedTab === 'today' ? 'today\'s' : 'upcoming'} matches
          </h3>
          <p className="text-slate-600">
            {selectedTab === 'today' 
              ? 'Check back tomorrow for today\'s Premier League fixtures.'
              : 'All matches for this period have been completed.'
            }
          </p>
        </div>
      )}

      {/* Match Count */}
      {fixtures.length > 0 && (
        <div className="mt-6 text-center text-sm text-slate-500">
          Showing {fixtures.length} {selectedTab === 'today' ? 'today\'s' : 'upcoming'} Premier League matches
        </div>
      )}
    </>
  );
};

export default FixturesGrid;