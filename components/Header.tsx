
import React from 'react';
import StethoscopeIcon from './icons/StethoscopeIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StethoscopeIcon className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Predictive Healthcare Analytics
            </h1>
            <p className="text-sm text-slate-500">AI-Powered Clinical Decision Support</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
