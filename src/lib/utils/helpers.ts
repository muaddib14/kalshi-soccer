import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${Math.round(value * 10) / 10}%`;
}

// Format currency values
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
}

// Format dates
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

// Calculate confidence color
export function getConfidenceColor(confidence: 'low' | 'medium' | 'high'): string {
  switch (confidence) {
    case 'high':
      return 'text-green-600 bg-green-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// Calculate result color
export function getResultColor(result: 'home_win' | 'away_win' | 'draw' | 'pending'): string {
  switch (result) {
    case 'home_win':
      return 'text-green-600 bg-green-50';
    case 'away_win':
      return 'text-blue-600 bg-blue-50';
    case 'draw':
      return 'text-yellow-600 bg-yellow-50';
    case 'pending':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate random team colors for UI
export function getTeamColor(teamName: string): string {
  const colors = [
    'bg-blue-500',
    'bg-red-500', 
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500'
  ];
  
  const hash = teamName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

// Calculate prediction accuracy based on confidence and result
export function calculateAccuracyScore(
  confidence: number,
  predictedResult: 'home_win' | 'away_win' | 'draw',
  actualResult: 'home_win' | 'away_win' | 'draw' | 'pending'
): number {
  if (actualResult === 'pending') return 0;
  
  const resultMatch = predictedResult === actualResult ? 1 : 0;
  const confidenceMultiplier = confidence / 100;
  
  return Math.round((resultMatch * confidenceMultiplier) * 100);
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate gradient background
export function getGradientFromColor(baseColor: string): string {
  const colorMap: Record<string, string> = {
    'bg-blue-500': 'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-red-500': 'bg-gradient-to-br from-red-400 to-red-600',
    'bg-green-500': 'bg-gradient-to-br from-green-400 to-green-600',
    'bg-purple-500': 'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-yellow-500': 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-indigo-500': 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-pink-500': 'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-teal-500': 'bg-gradient-to-br from-teal-400 to-teal-600'
  };
  
  return colorMap[baseColor] || 'bg-gradient-to-br from-gray-400 to-gray-600';
}

// Calculate betting odds from probabilities
export function calculateOdds(probability: number): number {
  if (probability <= 0 || probability >= 1) return 0;
  return Math.round((1 / probability) * 100) / 100;
}

// Sort array of objects by date
export function sortByDate<T extends { date: Date | string }>(
  array: T[], 
  ascending: boolean = false
): T[] {
  return array.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Create placeholder image URL
export function createPlaceholderImage(text: string, width: number = 300, height: number = 200): string {
  // Use a public placeholder service instead of local API
  return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
}