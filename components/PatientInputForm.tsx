
import React, { useState, useCallback } from 'react';
import type { PatientData } from '../types';
import UploadIcon from './icons/UploadIcon';

interface PatientInputFormProps {
  onAnalyze: (data: PatientData) => void;
  isLoading: boolean;
}

const PatientInputForm: React.FC<PatientInputFormProps> = ({ onAnalyze, isLoading }) => {
  const [formData, setFormData] = useState<Omit<PatientData, 'medicalImage'>>({
    age: '55',
    gender: 'Male',
    bloodPressure: '140/90',
    cholesterol: '220',
    vitals: '72, 75, 71, 73, 76',
  });
  const [image, setImage] = useState<{ file: File; preview: string; base64: string; mimeType: string; } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError('Image size cannot exceed 4MB.');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({
          file,
          preview: URL.createObjectURL(file),
          base64: base64String,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const data: PatientData = { ...formData };
    if (image) {
      data.medicalImage = { base64: image.base64, mimeType: image.mimeType };
    }
    onAnalyze(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-slate-700 border-b pb-2">Patient Data Input</h2>
      
      {/* EHR Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">Blood Pressure (Systolic/Diastolic)</label>
          <input type="text" name="bloodPressure" id="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-700">Cholesterol (mg/dL)</label>
          <input type="number" name="cholesterol" id="cholesterol" value={formData.cholesterol} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
        </div>
      </div>
      
      {/* Time-series Data */}
      <div>
        <label htmlFor="vitals" className="block text-sm font-medium text-gray-700">Time-Series Vitals (e.g., heart rate)</label>
        <textarea name="vitals" id="vitals" rows={2} value={formData.vitals} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., 72, 75, 71, 73, 76" />
        <p className="mt-1 text-xs text-gray-500">Enter comma-separated values.</p>
      </div>

      {/* Medical Imaging */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Medical Imaging (Optional)</label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            {image ? (
                <img src={image.preview} alt="Medical scan preview" className="mx-auto h-24 w-24 object-cover rounded-md" />
            ) : (
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600 justify-center">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                <span>{image ? 'Change image' : 'Upload an image'}</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
              </label>
            </div>
            <p className="text-xs text-gray-500">{image ? image.file.name : 'PNG, JPG, WEBP up to 4MB'}</p>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Run Predictive Analysis'}
      </button>
    </form>
  );
};

export default PatientInputForm;
