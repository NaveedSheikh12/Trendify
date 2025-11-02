
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 my-20">
      <div className="w-24 h-24 rounded-full animate-spin"
           style={{
             background: 'conic-gradient(from 0deg at 50% 50%, #a855f7 0%, #6366f1 50%, #ec4899 100%)',
             padding: '8px',
             mask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #fff 0)',
             WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 8px), #fff 0)',
           }}>
      </div>
      <p className="text-xl text-purple-200/80 animate-pulse">Processing...</p>
    </div>
  );
};
