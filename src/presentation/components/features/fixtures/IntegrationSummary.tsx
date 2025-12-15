'use client';

import React from 'react';

const IntegrationSummary: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="text-center">
        <h4 className="font-semibold text-slate-800 mb-2">Enhanced Multi-Source Integration</h4>
        <p className="text-sm text-slate-600 mb-3">
          Combining official Premier League data with comprehensive historical analysis for the most accurate predictions
        </p>
        <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span>Official Current Data</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Historical Analysis</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Enhanced Predictions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSummary;