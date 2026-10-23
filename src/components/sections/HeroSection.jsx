import React from 'react';
import { Terminal, Shield, ArrowDown, ExternalLink, Code2, Database } from 'lucide-react';
import GlitchText from '../ui/GlitchText';
import AnimusButton from '../ui/AnimusButton';
import { getAssetUrl } from '../../api/client';

export default function HeroSection({ profile, onExplore, onContact }) {
  const currentCompany = profile?.current_company || "Cubet Techno Labs Pvt. Ltd.";
  const title = profile?.title || "Senior Software Engineer";
  const yearsExp = profile?.years_experience || 10;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center md:text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Mission Briefing */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Animus Status Tag */}
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-animus-surface/90 border border-animus-border font-mono text-xs text-animus-cyan">
            <span className="w-2 h-2 rounded-full bg-animus-cyan animate-ping"></span>
            <span>MEMORY ACTIVE: {yearsExp}_YEARS_BACKEND_EXCELLENCE</span>
            <span className="text-animus-silver/40">|</span>
            <span className="text-animus-gold">{currentCompany}</span>
          </div>

          {/* Main Title & Glitch Heading */}
          <div className="space-y-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-animus-silver/80">
              // IDENTIFICATION: {profile?.name || "SENIOR BACKEND ARCHITECT"}
            </h2>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white leading-tight">
              <GlitchText text={title} />
            </h1>
            <p className="font-mono text-sm sm:text-base text-animus-cyan tracking-wide">
              Specializing in High-Throughput Laravel (10+), PHP 8+, MySQL Schema Tuning &amp; Cloud Platforms
            </p>
          </div>

          {/* Tagline / Mission Statement */}
          <p className="text-animus-silver text-sm sm:text-base max-w-2xl leading-relaxed">
            {profile?.tagline || (
              "Over 8 years of specialized engineering experience architecting high-performance backend systems, scalable RESTful APIs, and cloud deployments. Currently engineering resilient platforms at Cubet Techno Labs Pvt. Ltd."
            )}
          </p>

          {/* Action Uplinks */}
          <div className="pt-2 flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <AnimusButton variant="cyan" onClick={() => onExplore('experiences')}>
              Access Memory Sequences
            </AnimusButton>
            <AnimusButton variant="white" onClick={() => onExplore('projects')}>
              Inspect Field Missions
            </AnimusButton>
            <AnimusButton variant="gold" onClick={onContact}>
              Initiate Uplink
            </AnimusButton>
          </div>

          {/* Key Metric Gauges */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg border-t border-animus-border/60">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-animus-cyan">{yearsExp}+</div>
              <div className="font-mono text-[10px] text-animus-silver/70 uppercase">Years Backend XP</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-white">Laravel 10+</div>
              <div className="font-mono text-[10px] text-animus-silver/70 uppercase">Core Mastery</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-black text-animus-gold">Docker &amp; K8s</div>
              <div className="font-mono text-[10px] text-animus-silver/70 uppercase">Cloud &amp; DevOps</div>
            </div>
          </div>

        </div>

        {/* Right Column: Animus Profile Hologram Avatar / Insignia */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 p-2 bg-animus-surface/70 border border-animus-border animus-corner-border flex items-center justify-center group">
            {/* Tech Scanlines */}
            <div className="absolute inset-0 animus-scanlines pointer-events-none" />

            {/* Concentric Rotating Animus Spiral Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              {/* Outer Cyan Orbital Spiral Ring */}
              <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-animus-cyan/30 animate-spin-slow" />
              {/* Counter-rotating Gold Data Ring */}
              <div className="absolute w-[220px] h-[220px] rounded-full border border-dotted border-animus-gold/30 animate-spin-reverse" />
              {/* Inner Pulsing Radar Ring */}
              <div className="absolute w-[180px] h-[180px] rounded-full border border-animus-cyan/20 animate-pulse-slow" />
            </div>

            {/* Glowing Assassin Crest background */}
            <div className="absolute inset-4 opacity-25 group-hover:opacity-40 transition-opacity">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-animus-cyan" strokeWidth="2">
                <polygon points="50,5 95,90 50,75 5,90" />
                <line x1="50" y1="5" x2="50" y2="75" stroke="#00F0FF" strokeWidth="2" />
              </svg>
            </div>

            {/* Avatar or Placeholder */}
            {profile?.avatar_url && !profile.avatar_url.includes('avatar.jpg') ? (
              <img
                src={getAssetUrl(profile.avatar_url)}
                alt={profile.name}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 border border-animus-border"
              />
            ) : (
              <div className="text-center p-6 space-y-3 z-10">
                <div className="w-16 h-16 mx-auto rounded-none border border-animus-cyan flex items-center justify-center bg-animus-void shadow-[0_0_15px_rgba(0,240,255,0.4)] relative">
                  <Code2 className="w-8 h-8 text-animus-cyan animate-pulse" />
                  <div className="absolute -inset-1 border border-animus-gold/40 animate-ping pointer-events-none" />
                </div>
                <div className="font-mono text-xs font-bold text-white tracking-widest">
                  CUBET TECHNO LABS
                </div>
                <div className="font-mono text-[10px] text-animus-cyan tracking-wider">
                  // SENIOR_ENGINEER //
                </div>
                <div className="font-mono text-[9px] text-animus-silver/60">
                  DNA_LOCUS: CTL-SE-2026
                </div>
              </div>
            )}

            {/* Animated Target Reticle Corners */}
            <div className="absolute top-1 left-1 text-[8px] font-mono text-animus-cyan/60">SYS::SYNCHRONIZED</div>
            <div className="absolute bottom-1 right-1 text-[8px] font-mono text-animus-gold/60">NODE::ACTIVE</div>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div 
        onClick={() => onExplore('overview')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer font-mono text-[10px] text-animus-silver/50 hover:text-animus-cyan transition-colors"
      >
        <span>SCROLL FOR GENETIC DATA</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-animus-cyan" />
      </div>
    </section>
  );
}
