
import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SparkleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.36 7.18h7.64l-6.18 4.45 2.36 7.18-6.18-4.45-6.18 4.45 2.36-7.18-6.18-4.45h7.64z" />
    </svg>
);


export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex items-center gap-3 bg-purple-600 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg shadow-purple-500/40 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 transition-all duration-300"
      >
        <SparkleIcon />
        Generate
      </button>
    </div>
  );
};
