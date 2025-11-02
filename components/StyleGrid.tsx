
import React from 'react';
import type { Style } from '../types';

interface StyleGridProps {
  styles: Style[];
  selectedStyle: Style | null;
  onStyleSelect: (style: Style) => void;
}

export const StyleGrid: React.FC<StyleGridProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Choose a Style</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {styles.map((style) => (
          <div
            key={style.name}
            onClick={() => onStyleSelect(style)}
            className={`relative rounded-lg overflow-hidden cursor-pointer group transform hover:scale-105 transition-transform duration-300 ${selectedStyle?.name === style.name ? 'ring-4 ring-purple-500 shadow-lg shadow-purple-500/30' : 'ring-2 ring-transparent'}`}
          >
            <img src={style.previewPath} alt={style.name} className="w-full h-auto aspect-square object-cover" />
            <div className="absolute inset-0 bg-black/60 flex items-end p-2 transition-opacity duration-300">
              <p className="text-white text-sm font-semibold group-hover:opacity-100 opacity-100 md:opacity-0 transition-opacity">{style.name}</p>
            </div>
            {selectedStyle?.name === style.name && (
                <div className="absolute inset-0 bg-black/30"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
