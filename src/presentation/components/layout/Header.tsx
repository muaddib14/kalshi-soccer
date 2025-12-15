'use client'; // <--- This was missing

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/presentation/components/ui/Button';
import { Search, Menu, X, LayoutDashboard, Home } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    // For dashboard links, check if pathname starts with /dashboard
    if (href.startsWith('/dashboard')) {
      return pathname.startsWith('/dashboard');
    }
    return pathname === href;
  };

  return (
    <header className={cn(
      'bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              {/* UPDATED: Green Gradient Logo */}
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <span className="text-white font-bold text-sm font-heading">K</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-heading uppercase tracking-tight">
                Kalshi Soccer
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={cn(
                "font-medium transition-colors flex items-center gap-2",
                isActiveLink('/') 
                  ? "text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md" 
                  : "text-slate-700 hover:text-emerald-600"
              )}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={cn(
                "font-medium transition-colors flex items-center gap-2",
                isActiveLink('/dashboard') 
                  ? "text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md" 
                  : "text-slate-700 hover:text-emerald-600"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link 
              href="/dashboard#ai-analysis" 
              className={cn(
                "font-medium transition-colors",
                isActiveLink('/dashboard') 
                  ? "text-emerald-600" 
                  : "text-slate-700 hover:text-emerald-600"
              )}
            >
              AI Analysis
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Link href="/dashboard">
              {/* UPDATED: High-vis action button */}
              <Button variant="action" size="sm">
                Launch App
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200">
              <Link
                href="/"
                className={cn(
                  "block px-3 py-2 font-medium rounded-md transition-colors",
                  isActiveLink('/') 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  "block px-3 py-2 font-medium rounded-md transition-colors",
                  isActiveLink('/dashboard') 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard#ai-analysis"
                className={cn(
                  "block px-3 py-2 font-medium rounded-md transition-colors",
                  isActiveLink('/dashboard') 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                AI Analysis
              </Link>
              <div className="px-3 py-2 space-y-2 mt-4 border-t border-slate-100 pt-4">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button variant="action" size="sm" className="w-full">
                    Launch App
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;