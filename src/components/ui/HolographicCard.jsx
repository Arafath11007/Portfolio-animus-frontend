import React from 'react';

export default function HolographicCard({ children, className = '', glowColor = 'cyan' }) {
  const glowStyles = {
    cyan: 'border-animus-border hover:border-animus-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
    gold: 'border-animus-border hover:border-animus-gold hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]',
    red: 'border-animus-border hover:border-animus-red hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]',
  };

  return (
    <div
      className={`relative bg-animus-surface/85 backdrop-blur-md border p-6 transition-all duration-300 animus-corner-border group ${
        glowStyles[glowColor] || glowStyles.cyan
      } ${className}`}
    >
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-animus-cyan/30 to-transparent" />
      {children}
    </div>
  );
}
