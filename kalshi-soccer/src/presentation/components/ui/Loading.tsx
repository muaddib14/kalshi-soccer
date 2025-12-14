import React from 'react';
import { cn } from '@/lib/utils/helpers';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('animate-spin', sizeClasses[size], className)}>
      <svg fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// Skeleton loading component
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  width, 
  height 
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200 rounded',
        className
      )}
      style={{ width, height }}
    />
  );
};

// Skeleton for match prediction card
const MatchPredictionSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="grid grid-cols-3 gap-6 items-center">
        {/* Home Team */}
        <div className="text-center">
          <Skeleton className="w-20 h-20 mx-auto mb-3 rounded-full" />
          <Skeleton className="h-6 w-24 mx-auto mb-2" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
        
        {/* Match Info */}
        <div className="text-center">
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-24 mx-auto mb-4" />
          <Skeleton className="h-6 w-32 mx-auto" />
        </div>
        
        {/* Away Team */}
        <div className="text-center">
          <Skeleton className="w-20 h-20 mx-auto mb-3 rounded-full" />
          <Skeleton className="h-6 w-24 mx-auto mb-2" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
      </div>
      
      {/* Probability bars */}
      <div className="mt-6 space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Home Win</span>
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Draw</span>
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Away Win</span>
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Skeleton for AI analysis
const AIAnalysisSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-50 rounded-xl border-l-4 border-blue-500 p-6">
      <div className="flex items-center mb-4">
        <Skeleton className="w-5 h-5 mr-2" />
        <Skeleton className="h-6 w-32" />
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  );
};

// Skeleton for news items
const NewsSkeleton: React.FC = () => {
  return (
    <div className="flex space-x-4 p-4 border-b border-slate-200 last:border-b-0">
      <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
};

export { 
  LoadingSpinner, 
  Skeleton, 
  MatchPredictionSkeleton, 
  AIAnalysisSkeleton, 
  NewsSkeleton 
};