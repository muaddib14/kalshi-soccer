'use client';

import React from 'react';
import { NewsItem } from '@/lib/types';
import NewsCard from '@/presentation/components/features/news/NewsCard';
import { LoadingSpinner, NewsSkeleton } from '@/presentation/components/ui/Loading';

interface NewsSectionProps {
  news: NewsItem[];
  isLoading: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, isLoading }) => {
  return (
    <section id="news">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Latest News</h2>
      
      {isLoading && news.length === 0 ? (
        <div className="space-y-4">
          <NewsSkeleton />
          <NewsSkeleton />
          <NewsSkeleton />
        </div>
      ) : (
        <NewsCard news={news} />
      )}
    </section>
  );
};

export default NewsSection;