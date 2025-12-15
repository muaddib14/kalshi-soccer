// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart2, Shield, Zap, Trophy } from 'lucide-react';
import Header from '@/presentation/components/layout/Header';
import Footer from '@/presentation/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8">
              <span className="animate-pulse w-2 h-2 bg-emerald-400 rounded-full mr-2" />
              Now tracking Premier League 2025/26 Season
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Predict the Beautiful Game with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">AI Precision</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Kalshi Soccer analyzes thousands of data points, player form, and historical trends to give you the winning edge in football betting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-emerald-600 rounded-lg hover:bg-emerald-700 hover:scale-105 shadow-lg shadow-emerald-500/25">
                Launch App
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-300 transition-all bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white">
                View Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Prediction Accuracy', value: '87%', icon: Target },
              { label: 'Matches Analyzed', value: '10k+', icon: BarChart2 },
              { label: 'Active Users', value: '2.5k', icon: Users },
              { label: 'ROI Yield', value: '+15%', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Kalshi Soccer?</h2>
            <p className="text-lg text-slate-600">Advanced tools for the modern bettor.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-500" />}
              title="Real-Time Live Data"
              desc="Instant updates on goals, cards, and momentum shifts directly from the Premier League feed."
            />
            <FeatureCard 
              icon={<BarChart2 className="w-8 h-8 text-blue-500" />}
              title="Deep Statistical Analysis"
              desc="Our algorithms process over 50 unique metrics per match including xG, possession maps, and player heatmaps."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-green-500" />}
              title="Risk Management"
              desc="Get confidence scores and bankroll management advice to bet smarter, not harder."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600">{desc}</p>
  </div>
);

// You'll need to import these icons from lucide-react
import { Target, Users, TrendingUp } from 'lucide-react';