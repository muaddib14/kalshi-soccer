'use client';

import React, { useState } from 'react';
import { 
  getUpcomingFixtures, 
  getTodayFixtures, 
  getRecentResults,
  type Fixture 
} from '@/lib/data/fixtures';
import FixturesHeader from './FixturesHeader';
import FixturesTabs from './FixturesTabs';
import FixturesGrid from './FixturesGrid';
import DataSourceInfo from './DataSourceInfo';
import IntegrationSummary from './IntegrationSummary';

interface FixturesDisplayProps {
  onFixtureSelect?: (fixture: Fixture) => void;
  className?: string;
}

const FixturesDisplay: React.FC<FixturesDisplayProps> = ({ 
  onFixtureSelect, 
  className 
}) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'today' | 'results'>('upcoming');
  const upcomingFixtures = getUpcomingFixtures(8);
  const todayFixtures = getTodayFixtures();
  const recentResults = getRecentResults(5);

  const getDisplayFixtures = (): Fixture[] => {
    switch (selectedTab) {
      case 'today':
        return todayFixtures.map(fixture => ({
          ...fixture,
          homeTeam: {
            name: fixture.homeTeam,
            shortName: fixture.homeTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.homeTeam.substring(0, 2)}`,
            color: 'from-blue-400 to-blue-600'
          },
          awayTeam: {
            name: fixture.awayTeam,
            shortName: fixture.awayTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.awayTeam.substring(0, 2)}`,
            color: 'from-red-400 to-red-600'
          },
          venue: fixture.venue,
          status: fixture.status.toUpperCase() as Fixture['status'], // Normalize status to uppercase
          matchweek: 16,
          actualDate: fixture.date,
          actualTime: fixture.time,
          hasResult: !!fixture.score,
          result: fixture.score,
          broadcast: fixture.broadcast
        }));
      case 'results':
        return recentResults.map(fixture => ({
          ...fixture,
          homeTeam: {
            name: fixture.homeTeam,
            shortName: fixture.homeTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.homeTeam.substring(0, 2)}`,
            color: 'from-blue-400 to-blue-600'
          },
          awayTeam: {
            name: fixture.awayTeam,
            shortName: fixture.awayTeam.substring(0, 3).toUpperCase(),
            logo: `/api/placeholder/60/60?text=${fixture.awayTeam.substring(0, 2)}`,
            color: 'from-red-400 to-red-600'
          },
          venue: fixture.venue,
          status: 'completed',
          matchweek: 16,
          actualDate: fixture.date,
          actualTime: fixture.time,
          hasResult: true,
          result: fixture.score
        }));
      default:
        return upcomingFixtures;
    }
  };

  const displayFixtures = getDisplayFixtures();

  const handleFixtureClick = (fixture: Fixture) => {
    if (onFixtureSelect) {
      onFixtureSelect(fixture);
    }
  };

  return (
    <div className={className}>
      <FixturesHeader />
      
      <FixturesTabs
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        todayFixturesCount={todayFixtures.length}
      />
      
      <FixturesGrid
        fixtures={displayFixtures}
        selectedTab={selectedTab}
        onFixtureClick={handleFixtureClick}
      />

      <DataSourceInfo />
      <IntegrationSummary />
    </div>
  );
};

export default FixturesDisplay;