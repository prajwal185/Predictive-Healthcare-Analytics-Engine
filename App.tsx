
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PatientInputForm from './components/PatientInputForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import Loader from './components/Loader';
import { getHealthcareAnalysis } from './services/geminiService';
import type { PatientData, AnalysisResult } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysis = useCallback(async (patientData: PatientData) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getHealthcareAnalysis(patientData);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <PatientInputForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-2">
            {isLoading && (
              <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200 min-h-[400px]">
                <Loader />
                <p className="text-lg text-slate-600 mt-4 font-medium">Analyzing patient data...</p>
                <p className="text-sm text-slate-500 mt-2">This may take a moment. The AI is processing multi-modal inputs.</p>
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl shadow-md">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2">Analysis Failed</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}
            {analysisResult && !isLoading && (
              <AnalysisDashboard result={analysisResult} />
            )}
            {!analysisResult && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200 min-h-[400px]">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-700">Analytics Engine Ready</h2>
                    <p className="text-slate-500 mt-2 text-center">
                        Enter patient data on the left to begin the predictive analysis.
                    </p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
