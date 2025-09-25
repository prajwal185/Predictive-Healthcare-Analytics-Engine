
import React from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import type { AnalysisResult } from '../types';

interface ClinicalRecommendationsProps {
  recommendations: AnalysisResult['recommendations'];
}

const ClinicalRecommendations: React.FC<ClinicalRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-slate-700 mb-4">Clinical Decision Support</h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
            <div className="flex-shrink-0 pt-1">
              <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{rec.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{rec.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalRecommendations;
