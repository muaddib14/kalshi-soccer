import React from 'react';
import { Button } from '@/presentation/components/ui/Button';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={cn(
      'bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-slate-900">
                Kalshi Soccer
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#forecast" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              Match Forecast
            </a>
            <a href="#ai-analysis" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              AI Analysis
            </a>
            <a href="#history" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              History
            </a>
            <a href="#news" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              News
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="primary" size="sm">
              Place Bet
            </Button>
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
              <a
                href="#forecast"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Match Forecast
              </a>
              <a
                href="#ai-analysis"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Analysis
              </a>
              <a
                href="#history"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </a>
              <a
                href="#news"
                className="block px-3 py-2 text-slate-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="primary" size="sm" className="w-full">
                  Place Bet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;