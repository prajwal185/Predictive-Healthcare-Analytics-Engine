
import React from 'react';
import type { AnalysisResult } from '../types';
import HeartbeatIcon from './icons/HeartbeatIcon';

interface PredictionCardProps {
  prediction: AnalysisResult['prediction'];
}

const getRiskColor = (outcome: string) => {
  switch (outcome.toLowerCase()) {
    case 'high risk':
      return 'text-red-500 border-red-500 bg-red-50';
    case 'moderate risk':
      return 'text-yellow-500 border-yellow-500 bg-yellow-50';
    case 'low risk':
      return 'text-green-500 border-green-500 bg-green-50';
    default:
      return 'text-gray-500 border-gray-500 bg-gray-50';
  }
};

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const riskColorClasses = getRiskColor(prediction.outcome);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <HeartbeatIcon className="w-7 h-7 text-blue-600" />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-bold text-slate-700">Primary Prediction</h2>
          <div className="mt-2 flex items-baseline space-x-4">
            <p className={`px-3 py-1 text-sm font-bold rounded-full ${riskColorClasses}`}>
              {prediction.outcome}
            </p>
            <p className="text-4xl font-bold text-slate-800">{prediction.riskScore}<span className="text-2xl text-slate-500">%</span></p>
            <p className="text-sm text-slate-500">Risk Score</p>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border">
            <h4 className="text-sm font-semibold text-slate-600">AI-Generated Explanation</h4>
            <p className="text-sm text-slate-700 mt-1">
              {prediction.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
