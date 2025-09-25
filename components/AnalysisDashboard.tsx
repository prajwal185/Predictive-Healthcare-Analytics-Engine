
import React from 'react';
import type { AnalysisResult } from '../types';
import PredictionCard from './PredictionCard';
import SurvivalAnalysisChart from './SurvivalAnalysisChart';
import FairnessAnalysis from './FairnessAnalysis';
import ClinicalRecommendations from './ClinicalRecommendations';

interface AnalysisDashboardProps {
  result: AnalysisResult;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result }) => {
  return (
    <div className="space-y-8">
      <PredictionCard prediction={result.prediction} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <SurvivalAnalysisChart data={result.survivalAnalysis.data} summary={result.survivalAnalysis.summary} />
        <FairnessAnalysis data={result.fairness} />
      </div>
      <ClinicalRecommendations recommendations={result.recommendations} />
    </div>
  );
};

export default AnalysisDashboard;
