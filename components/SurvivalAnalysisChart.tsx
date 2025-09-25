
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SurvivalDataPoint } from '../types';

interface SurvivalAnalysisChartProps {
  data: SurvivalDataPoint[];
  summary: string;
}

const SurvivalAnalysisChart: React.FC<SurvivalAnalysisChartProps> = ({ data, summary }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-slate-700 mb-1">Survival Analysis</h3>
      <p className="text-sm text-slate-500 mb-4">(Kaplan-Meier Estimator)</p>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" type="number" domain={[0, 'dataMax']} label={{ value: 'Time (Months)', position: 'insideBottom', offset: -10 }} />
            <YAxis domain={[0, 1]} label={{ value: 'Survival Probability', angle: -90, position: 'insideLeft' }} />
            <Tooltip
                formatter={(value: number) => [value.toFixed(2), "Probability"]}
                labelFormatter={(label: number) => `Month: ${label}`}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="survivalProbability" name="Survival Probability" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
        <h4 className="text-sm font-semibold text-slate-600">Summary</h4>
        <p className="text-sm text-slate-700 mt-1">{summary}</p>
      </div>
    </div>
  );
};

export default SurvivalAnalysisChart;
