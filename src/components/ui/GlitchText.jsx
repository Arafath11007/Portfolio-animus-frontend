import React from 'react';

export default function GlitchText({ text, as: Component = 'span', className = '', cyan = true }) {
  return (
    <Component className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 -z-10 select-none opacity-0 group-hover:opacity-100 transition-opacity translate-x-[2px] translate-y-[-1px] ${
          cyan ? 'text-animus-cyan' : 'text-red-500'
        }`}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 -z-10 select-none opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-2px] translate-y-[1px] text-red-500"
      >
        {text}
      </span>
    </Component>
  );
}
