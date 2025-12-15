'use client';

import React from 'react';
import FixturesDisplay from '@/presentation/components/features/fixtures/FixturesDisplay';
import { type Fixture } from '@/lib/data/fixtures';

interface HeroSectionProps {
  onFixtureSelect?: (fixture: Fixture) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onFixtureSelect }) => {
  return (
    // UPDATED: bg-pitch-gradient defined in globals.css (Slate 900 -> Deep Green)
    <section className="bg-pitch-gradient text-white relative overflow-hidden">
      {/* Texture Overlay (optional subtle pattern) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading uppercase tracking-wide">
            AI-Powered Football
            {/* UPDATED: Accent color to Lime/Emerald */}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
              Betting Predictions
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto font-light">
            Get real-time forecasts for Premier League matches. Select a fixture below to unlock AI tactical analysis.
          </p>
          
          {/* Real Fixtures Display */}
          <div className="max-w-4xl mx-auto">
            {/* Added a glass border effect */}
            <FixturesDisplay 
              onFixtureSelect={onFixtureSelect}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;