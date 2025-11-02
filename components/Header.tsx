
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center mb-10 px-4">
    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter" style={{ textShadow: '0 0 15px rgba(167, 139, 250, 0.6), 0 0 5px rgba(196, 181, 253, 0.4)' }}>
      Trendify AI
    </h1>
    <p className="mt-4 text-lg md:text-xl text-purple-200/80">
      Turn Your Selfie Into Viral AI Art.
    </p>
  </header>
);
