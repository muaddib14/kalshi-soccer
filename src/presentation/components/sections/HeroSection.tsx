'use client';

import React from 'react';
import FixturesDisplay from '@/presentation/components/features/fixtures/FixturesDisplay';
import { type Fixture } from '@/lib/data/fixtures';

interface HeroSectionProps {
  onFixtureSelect?: (fixture: Fixture) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onFixtureSelect }) => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            AI-Powered Football
            <span className="block text-blue-400">Betting Predictions</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Get AI-powered predictions for real Premier League matches. Click on any upcoming fixture below to get detailed forecasts and analysis.
          </p>
          
          {/* Real Fixtures Display */}
          <div className="max-w-4xl mx-auto">
            <FixturesDisplay 
              onFixtureSelect={onFixtureSelect}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;