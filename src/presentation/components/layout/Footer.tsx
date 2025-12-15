import React from 'react';
import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    // UPDATED: Use the dark pitch color instead of slate-900
    <footer className="bg-emerald-950 text-white mt-16 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {/* UPDATED: Logo colors */}
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/50">
                <span className="text-white font-bold text-sm font-heading">K</span>
              </div>
              <h3 className="ml-3 text-xl font-bold font-heading uppercase tracking-wide">Kalshi Soccer</h3>
            </div>
            <p className="text-emerald-100/70 mb-4 max-w-md font-light">
              Advanced football betting predictions powered by machine learning and AI analysis. 
              Make informed decisions with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-emerald-400 hover:text-lime-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-emerald-400 hover:text-lime-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-emerald-400 hover:text-lime-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>
                <Link href="/dashboard#forecast" className="hover:text-lime-400 transition-colors">
                  Match Forecast
                </Link>
              </li>
              <li>
                <Link href="/dashboard#ai-analysis" className="hover:text-lime-400 transition-colors">
                  AI Analysis
                </Link>
              </li>
              <li>
                <Link href="/dashboard#history" className="hover:text-lime-400 transition-colors">
                  Prediction History
                </Link>
              </li>
              <li>
                <Link href="/dashboard#news" className="hover:text-lime-400 transition-colors">
                  Football News
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4 font-heading">Resources</h4>
            <ul className="space-y-2 text-emerald-100/70">
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  Betting Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-emerald-900 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-emerald-100/50 text-sm mb-4 md:mb-0">
              © 2025 Kalshi Soccer. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-emerald-100/50">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center">
                Disclaimer
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-emerald-900/50 rounded-lg border border-emerald-800">
            <p className="text-xs text-emerald-100/60 leading-relaxed">
              <strong>Disclaimer:</strong> The predictions and analysis provided are for informational purposes only. 
              Gambling involves risk, and you should never bet more than you can afford to lose. 
              Past performance does not guarantee future results. Please gamble responsibly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;