
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import type { PatientData, AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prediction: {
            type: Type.OBJECT,
            properties: {
                outcome: { type: Type.STRING, description: "Predicted risk level, e.g., 'High Risk', 'Moderate Risk', 'Low Risk'." },
                riskScore: { type: Type.NUMBER, description: "A numerical risk score from 0 to 100." },
                explanation: { type: Type.STRING, description: "A brief, clear explanation for the prediction." }
            }
        },
        survivalAnalysis: {
            type: Type.OBJECT,
            properties: {
                data: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            time: { type: Type.INTEGER, description: "Time point (e.g., months)." },
                            survivalProbability: { type: Type.NUMBER, description: "Survival probability from 0.0 to 1.0." }
                        }
                    }
                },
                summary: { type: Type.STRING, description: "A concise summary of the survival analysis." }
            }
        },
        fairness: {
            type: Type.OBJECT,
            properties: {
                demographic: { type: Type.STRING, description: "The demographic being analyzed, e.g., 'Gender'." },
                groups: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING, description: "The name of the demographic group, e.g., 'Male'." },
                            outcome: { type: Type.NUMBER, description: "The average predicted risk score for this group." }
                        }
                    }
                }
            }
        },
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A short title for the recommendation." },
                    details: { type: Type.STRING, description: "Detailed clinical decision support recommendation." }
                }
            }
        }
    }
};

const fileToGenerativePart = (base64: string, mimeType: string) => {
    return {
      inlineData: {
        data: base64,
        mimeType
      },
    };
};

export const getHealthcareAnalysis = async (patientData: PatientData): Promise<AnalysisResult> => {
    const model = 'gemini-2.5-flash';

    const patientDataString = JSON.stringify({
        age: patientData.age,
        gender: patientData.gender,
        bloodPressure: patientData.bloodPressure,
        cholesterol: patientData.cholesterol,
        vitals: patientData.vitals,
    }, null, 2);

    const prompt = `
        You are a sophisticated Predictive Healthcare Analytics Engine. Your purpose is to analyze patient data, predict outcomes, and provide clinical decision support.
        
        Based on the provided multi-modal patient data, generate a comprehensive analysis.
        
        Patient Data:
        ${patientDataString}
        
        The user has also provided a medical image. Analyze it in conjunction with the structured data.
        
        Your analysis must include:
        1.  **Prediction:** A clear risk assessment (High, Moderate, Low), a numerical score, and a brief explanation.
        2.  **Survival Analysis:** Generate data for a Kaplan-Meier plot for the next 60 months and a summary. The survival probability should realistically decrease over time.
        3.  **Fairness Analysis:** Provide a fairness metric comparing risk across the patient's demographic (e.g., if gender is 'Female', compare against 'Male').
        4.  **Clinical Recommendations:** Provide at least two actionable recommendations with clear titles and details.
        
        Return the entire analysis in the specified JSON format.
    `;

    const contents = patientData.medicalImage
        ? { parts: [ { text: prompt }, fileToGenerativePart(patientData.medicalImage.base64, patientData.medicalImage.mimeType) ] }
        : prompt;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model,
        contents,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        }
    });

    const jsonString = response.text;
    try {
        return JSON.parse(jsonString) as AnalysisResult;
    } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", jsonString);
        throw new Error("The AI returned an invalid data format. Please try again.");
    }
};
