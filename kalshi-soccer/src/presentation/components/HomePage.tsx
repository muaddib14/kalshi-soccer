'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/presentation/components/layout/Header';
import Footer from '@/presentation/components/layout/Footer';
import HeroSection from '@/presentation/components/sections/HeroSection';
import StatsOverview from '@/presentation/components/sections/StatsOverview';
import MainContent from '@/presentation/components/sections/MainContent';
import ErrorMessage from '@/presentation/components/ui/ErrorMessage';
import { useMatchStore } from '@/store/match-store';
import { type Fixture } from '@/lib/data/fixtures';

const HomePage: React.FC = () => {
  const {
    currentPrediction,
    aiAnalysis,
    predictionHistory,
    latestNews,
    accuracyStats,
    isLoading,
    error,
    loadMatchPrediction,
    loadPredictionHistory,
    loadLatestNews,
    loadAccuracyStats,
    setError
  } = useMatchStore();

  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // Load initial data
  useEffect(() => {
    loadPredictionHistory();
    loadLatestNews();
    loadAccuracyStats();
  }, []);

  const handleFixtureSelect = async (fixture: Fixture) => {
    setSelectedFixture(fixture);
    setIsPredicting(true);
    try {
      await loadMatchPrediction(fixture.homeTeam.name, fixture.awayTeam.name);
    } finally {
      setIsPredicting(false);
    }
  };

  const handlePrediction = async () => {
    if (!selectedFixture) return;
    
    setIsPredicting(true);
    try {
      await loadMatchPrediction(selectedFixture.homeTeam.name, selectedFixture.awayTeam.name);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleRefresh = () => {
    if (currentPrediction && selectedFixture) {
      loadMatchPrediction(
        selectedFixture.homeTeam.name,
        selectedFixture.awayTeam.name
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <HeroSection onFixtureSelect={handleFixtureSelect} />

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ErrorMessage error={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsOverview accuracyStats={accuracyStats} />
      </div>

      <MainContent
        currentPrediction={currentPrediction}
        aiAnalysis={aiAnalysis}
        predictionHistory={predictionHistory}
        latestNews={latestNews}
        accuracyStats={accuracyStats}
        isLoading={isLoading || isPredicting}
        selectedFixture={selectedFixture}
        onRefresh={handleRefresh}
        error={error}
        onErrorDismiss={() => setError(null)}
      />

      <Footer />
    </div>
  );
};

export default HomePage;