import React, { useState } from 'react';
import { Database, Server, Cloud, Code, Wrench, Shield, Check } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import GlitchText from '../ui/GlitchText';

export default function MasteryTree({ skills = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'FULL MATRIX' },
    { id: 'backend', label: 'BACKEND SYSTEMS (PHP/PYTHON)', icon: Server },
    { id: 'database', label: 'DATABASES & CACHING', icon: Database },
    { id: 'cloud_devops', label: 'CLOUD & DEVOPS', icon: Cloud },
    { id: 'tools', label: 'TOOLS & ARCHITECTURE', icon: Wrench },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 border-b border-animus-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-animus-cyan tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-animus-cyan"></span>
            MEMORY BLOCK 03 // COMPETENCY MATRIX
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mt-1">
            <GlitchText text="Synchronization Mastery" />
          </h2>
        </div>
        <div className="font-mono text-xs text-animus-silver/60">
          LARAVEL &amp; PHP 8+: 8+_YRS // DOCKER &amp; K8s // MYSQL // DDD
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`font-mono text-xs px-3.5 py-2 border transition-all ${
              selectedCategory === cat.id
                ? 'bg-animus-cyan text-black border-animus-cyan font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                : 'bg-animus-surface/60 text-animus-silver border-animus-border hover:border-animus-cyan/50 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <HolographicCard 
            key={skill.id || skill.name} 
            glowColor={skill.highlight ? 'cyan' : 'gold'}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="font-display font-bold text-lg text-white group-hover:text-animus-cyan transition-colors">
                  {skill.name}
                </div>
                {skill.highlight && (
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-animus-cyan/15 border border-animus-cyan text-animus-cyan font-bold tracking-wider uppercase">
                    Core Anchor
                  </span>
                )}
              </div>

              <div className="flex justify-between font-mono text-xs text-animus-silver mb-2">
                <span>EXPERIENCE:</span>
                <span className="text-animus-gold font-semibold">{skill.years_experience} Years</span>
              </div>
            </div>

            {/* Proficiency Meter */}
            <div className="mt-4 pt-3 border-t border-animus-border/40">
              <div className="flex justify-between font-mono text-[10px] text-animus-silver/70 mb-1">
                <span>SYNCHRONIZATION:</span>
                <span className="text-animus-cyan font-bold">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-1.5 bg-animus-dark border border-animus-border">
                <div
                  className="h-full bg-gradient-to-r from-animus-cyan to-white"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          </HolographicCard>
        ))}
      </div>

    </section>
  );
}
