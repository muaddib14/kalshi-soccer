import React from 'react';
import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h3 className="ml-3 text-xl font-bold">Kalshi Soccer</h3>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Advanced football betting predictions powered by machine learning and AI analysis. 
              Make informed decisions with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#forecast" className="hover:text-white transition-colors">
                  Match Forecast
                </a>
              </li>
              <li>
                <a href="#ai-analysis" className="hover:text-white transition-colors">
                  AI Analysis
                </a>
              </li>
              <li>
                <a href="#history" className="hover:text-white transition-colors">
                  Prediction History
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">
                  Football News
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Betting Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2025 Kalshi Soccer. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
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
          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <p className="text-xs text-slate-400 leading-relaxed">
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