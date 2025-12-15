'use client';

import React from 'react';
import { Award, Database, CheckCircle, ExternalLink } from 'lucide-react';

const DataSourceInfo: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Official Premier League */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <Award className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold text-purple-800">Official Premier League</h4>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                Official
              </span>
            </div>
            <p className="text-sm text-purple-700 mb-3">
              Real-time fixture data and results directly from the official Premier League website
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-purple-600">
                <CheckCircle className="w-3 h-3 mr-2" />
                <span>Live match results</span>
              </div>
              <div className="flex items-center text-xs text-purple-600">
                <CheckCircle className="w-3 h-3 mr-2" />
                <span>Official schedules</span>
              </div>
              <div className="flex items-center text-xs text-purple-600">
                <CheckCircle className="w-3 h-3 mr-2" />
                <span>Broadcast information</span>
              </div>
            </div>
            <a
              href="https://www.premierleague.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800 transition-colors mt-3"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Visit Premier League</span>
            </a>
          </div>
        </div>
      </div>

      {/* OpenFootball Database */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-start space-x-3">
          <Database className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold text-green-800">OpenFootball Database</h4>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                Historical
              </span>
            </div>
            <p className="text-sm text-green-700 mb-3">
              Comprehensive historical football data for enhanced predictions and analysis
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-xs text-green-600">
                <CheckCircle className="w-3 h-3 mr-2" />
                <span>Historical statistics</span>
              </div>
              <div className="flex items-center text-xs text-green-600">
                <CheckCircle className="w-3 h-3 mr-2" />
                <span>Team performance data</span>
              </div>
              <div className="flex items-center text-xs text-green-600">
                <CheckCircle className="w-3 h-3 mr-2" />
                <span>Head-to-head records</span>
              </div>
            </div>
            <a
              href="https://github.com/openfootball/football.json"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-800 transition-colors mt-3"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourceInfo;