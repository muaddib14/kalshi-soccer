import { useState, useEffect } from 'react';
import { useMatchStore } from '@/store/match-store';
import { type Fixture } from '@/lib/types';

export const useHomePage = () => {
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
  }, [loadPredictionHistory, loadLatestNews, loadAccuracyStats]);

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

  return {
    currentPrediction,
    aiAnalysis,
    predictionHistory,
    latestNews,
    accuracyStats,
    isLoading,
    error,
    selectedFixture,
    isPredicting,
    handleFixtureSelect,
    handlePrediction,
    setError
  };
};