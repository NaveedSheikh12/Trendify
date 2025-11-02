
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="custom-prompt" className="block text-center text-lg font-medium text-purple-200 mb-2">
        Or Describe Your Own Edit
      </label>
      <textarea
        id="custom-prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 'Add a retro filter' or 'Make it look like an oil painting'"
        className="w-full bg-black/30 border-2 border-purple-400/50 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 h-24 resize-none"
      />
    </div>
  );
};
