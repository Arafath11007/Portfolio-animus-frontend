import React from 'react';
import { soundManager } from '../animus/SoundManager';

export default function AnimusButton({ 
  children, 
  onClick, 
  variant = 'cyan', 
  className = '', 
  type = 'button',
  disabled = false
}) {
  const handleClick = (e) => {
    soundManager.playHudClick();
    if (onClick) onClick(e);
  };

  const variants = {
    cyan: 'border-animus-cyan text-animus-cyan hover:bg-animus-cyan hover:text-black shadow-[0_0_12px_rgba(0,240,255,0.2)]',
    white: 'border-white text-white hover:bg-white hover:text-black',
    gold: 'border-animus-gold text-animus-gold hover:bg-animus-gold hover:text-black shadow-[0_0_12px_rgba(234,179,8,0.2)]',
    red: 'border-animus-red text-animus-red hover:bg-animus-red hover:text-white',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest border transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        variants[variant] || variants.cyan
      } ${className}`}
    >
      {children}
    </button>
  );
}
