
export interface PatientData {
  age: string;
  gender: string;
  bloodPressure: string;
  cholesterol: string;
  vitals: string; // Time-series data
  medicalImage?: {
    base64: string;
    mimeType: string;
  };
}

export interface SurvivalDataPoint {
  time: number; // e.g., days, months
  survivalProbability: number;
}

export interface FairnessMetricGroup {
  name: string; // e.g., '20-40'
  outcome: number; // e.g., probability of high risk
}

export interface FairnessMetric {
  demographic: string; // e.g., 'Age Group'
  groups: FairnessMetricGroup[];
}

export interface AnalysisResult {
  prediction: {
    outcome: string; // 'High Risk', 'Moderate Risk', 'Low Risk'
    riskScore: number;
    explanation: string;
  };
  survivalAnalysis: {
    data: SurvivalDataPoint[];
    summary: string;
  };
  fairness: FairnessMetric;
  recommendations: {
    title: string;
    details: string;
  }[];
}
