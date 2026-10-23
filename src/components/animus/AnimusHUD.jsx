import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, Terminal, Cpu, Database, Eye } from 'lucide-react';
import { soundManager } from './SoundManager';

export default function AnimusHUD({ onNavigate, activeSection, onToggleAdmin }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const state = soundManager.toggleSound();
    setSoundEnabled(state);
    soundManager.playHudClick();
  };

  const navItems = [
    { id: 'overview', label: 'GENETIC OVERVIEW', icon: Cpu },
    { id: 'experiences', label: 'MEMORY SEQUENCES', icon: Terminal },
    { id: 'skills', label: 'SYNCHRONIZATION MASTERY', icon: Database },
    { id: 'projects', label: 'FIELD MISSIONS', icon: Shield },
    { id: 'certifications', label: 'CREDENTIAL MARKS', icon: Eye },
    { id: 'contact', label: 'COMMUNICATIONS UPLINK', icon: Terminal },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-animus-void/80 backdrop-blur-md border-b border-animus-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Assassin Crest Logo & Telemetry */}
        <div 
          onClick={() => {
            soundManager.playHudClick();
            onNavigate('hero');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-animus-cyan transition-transform group-hover:scale-110" strokeWidth="3">
              <polygon points="50,8 92,88 50,72 8,88" />
              <line x1="50" y1="8" x2="50" y2="72" stroke="#00F0FF" strokeWidth="2.5" />
            </svg>
          </div>
          <div>
            <div className="font-mono text-xs font-bold tracking-wider text-animus-cyan flex items-center gap-2">
              ANIMUS 4.0 // ARCHITECT
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="font-mono text-[9px] text-animus-silver/60 tracking-tight">
              SUBJECT: YASAR_ARAFATH // 8+_YR_BACKEND_SPECIALIST
            </div>
          </div>
        </div>

        {/* Navigation Sequences */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playHudClick();
                  onNavigate(item.id);
                }}
                className={`px-3 py-1.5 font-mono text-xs tracking-wider transition-all border ${
                  isActive 
                    ? 'border-animus-cyan text-animus-cyan bg-animus-cyan/10 shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
                    : 'border-transparent text-animus-silver hover:text-animus-white hover:border-animus-border'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Sound FX Toggle & Admin Terminal Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Animus Soundscape" : "Enable Animus Soundscape"}
            className="p-2 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-animus-cyan transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-animus-cyan" /> : <VolumeX className="w-4 h-4 text-animus-silver/40" />}
          </button>

          <button
            onClick={() => {
              soundManager.playHudClick();
              onToggleAdmin();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-animus-surface border border-animus-cyan text-animus-cyan hover:bg-animus-cyan hover:text-black font-mono text-xs font-semibold tracking-wider transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>[ ABSTERGO // ADMIN ]</span>
          </button>
        </div>

      </div>
    </header>
  );
}
