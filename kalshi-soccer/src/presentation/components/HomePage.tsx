'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/presentation/components/layout/Header';
import Footer from '@/presentation/components/layout/Footer';
import FixturesDisplay from '@/presentation/components/features/fixtures/FixturesDisplay';
import MatchForecastCard from '@/presentation/components/features/forecast/MatchForecastCard';
import AIAnalysisCard from '@/presentation/components/features/ai/AIAnalysisCard';
import PredictionHistoryCard from '@/presentation/components/features/history/PredictionHistoryCard';
import NewsCard from '@/presentation/components/features/news/NewsCard';
import { Button } from '@/presentation/components/ui/Button';
import { LoadingSpinner, MatchPredictionSkeleton, AIAnalysisSkeleton, NewsSkeleton } from '@/presentation/components/ui/Loading';
import { useMatchStore } from '@/store/match-store';
import { type Fixture } from '@/lib/data/fixtures';
import { Search, RefreshCw, TrendingUp } from 'lucide-react';

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
      
      {/* Hero Section */}
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
                onFixtureSelect={handleFixtureSelect}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-red-700">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        {accuracyStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Total Predictions</p>
                  <p className="text-2xl font-bold text-slate-900">{accuracyStats.totalPredictions}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Overall Accuracy</p>
                  <p className="text-2xl font-bold text-green-600">{accuracyStats.accuracyRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Recent Accuracy</p>
                  <p className="text-2xl font-bold text-blue-600">{accuracyStats.recentAccuracy}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Best Algorithm</p>
                  <p className="text-lg font-bold text-slate-900">{accuracyStats.bestPerformingAlgorithm}</p>
                </div>
                <Search className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - Prediction and AI Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Match Prediction */}
            <section id="forecast">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Match Forecast</h2>
                {currentPrediction && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                )}
              </div>
              
              {isLoading && !currentPrediction ? (
                <MatchPredictionSkeleton />
              ) : currentPrediction ? (
                <MatchForecastCard prediction={currentPrediction} />
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Prediction Yet</h3>
                  <p className="text-slate-600">Select teams above to get started with AI-powered predictions.</p>
                </div>
              )}
            </section>

            {/* AI Analysis */}
            <section id="ai-analysis">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">AI Match Analysis</h2>
              
              {isLoading && !aiAnalysis ? (
                <AIAnalysisSkeleton />
              ) : aiAnalysis ? (
                <AIAnalysisCard analysis={aiAnalysis} />
              ) : (
                <div className="bg-slate-50 rounded-xl border-l-4 border-blue-500 p-8 text-center">
                  <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis Coming Soon</h3>
                  <p className="text-slate-600">Make a match prediction to get detailed AI analysis and insights.</p>
                </div>
              )}
            </section>

            {/* Prediction History */}
            <section id="history">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Prediction History</h2>
              <PredictionHistoryCard 
                history={predictionHistory} 
                accuracyStats={accuracyStats}
              />
            </section>
          </div>

          {/* Sidebar - News */}
          <div className="space-y-8">
            <section id="news">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest News</h2>
              
              {isLoading && latestNews.length === 0 ? (
                <div className="space-y-4">
                  <NewsSkeleton />
                  <NewsSkeleton />
                  <NewsSkeleton />
                </div>
              ) : (
                <NewsCard news={latestNews} />
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;