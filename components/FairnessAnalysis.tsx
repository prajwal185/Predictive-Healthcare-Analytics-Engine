
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FairnessMetric } from '../types';

interface FairnessAnalysisProps {
  data: FairnessMetric;
}

const FairnessAnalysis: React.FC<FairnessAnalysisProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-slate-700 mb-1">Fairness-Aware ML</h3>
      <p className="text-sm text-slate-500 mb-4">Risk Distribution by {data.demographic}</p>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data.groups} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} label={{ value: 'Avg. Risk Score (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Average Risk"]}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', border: '1px solid #ccc' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="outcome" name="Average Risk Score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
       <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
        <h4 className="text-sm font-semibold text-slate-600">Interpretation</h4>
        <p className="text-sm text-slate-700 mt-1">This chart shows the average predicted risk score across different groups within the '{data.demographic}' demographic, ensuring predictions are equitable.</p>
      </div>
    </div>
  );
};

export default FairnessAnalysis;
