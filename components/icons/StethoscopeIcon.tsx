
import React from 'react';

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-2.586a1 1 0 01.293-.707l5.964-5.964A.5.5 0 0115.586 5H17a2 2 0 110 4h-1.414l-4.293 4.293a1 1 0 01-.707.293H10.5a2 2 0 01-2-2v-1a2 2 0 00-2-2H3.055a1 1 0 01-.707-1.707l1.414-1.414a1 1 0 011.414 0l.055.055" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11a1 1 0 011.414 0l.055.055" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
  </svg>
);

export default StethoscopeIcon;
