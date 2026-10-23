import React from 'react';
import { Calendar, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import GlitchText from '../ui/GlitchText';

export default function MemorySequences({ experiences = [] }) {
  return (
    <section id="experiences" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 border-b border-animus-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-animus-cyan tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-animus-cyan"></span>
            MEMORY BLOCK 02 // CHRONOLOGICAL TIMELINE
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mt-1">
            <GlitchText text="Memory Sequences" />
          </h2>
        </div>
        <div className="font-mono text-xs text-animus-silver/60">
          CAREER SYNCHRONIZATION // 2014 — PRESENT
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l border-animus-border/70 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        
        {experiences.map((exp, idx) => {
          const isCubet = exp.company.toLowerCase().includes('cubet');
          const techList = exp.technologies ? exp.technologies.split(',').map(t => t.trim()) : [];

          return (
            <div key={exp.id || idx} className="relative group">
              
              {/* Timeline Node Point (Animus Shard Marker) */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 border flex items-center justify-center transition-transform group-hover:scale-125 ${
                exp.is_current 
                  ? 'border-animus-cyan bg-animus-void shadow-[0_0_12px_rgba(0,240,255,0.6)] text-animus-cyan' 
                  : 'border-animus-border bg-animus-void text-animus-silver/60'
              }`}>
                <div className={`w-2 h-2 ${exp.is_current ? 'bg-animus-cyan animate-ping' : 'bg-animus-border'}`} />
              </div>

              {/* Memory Sequence Card */}
              <HolographicCard glowColor={exp.is_current ? 'cyan' : 'gold'}>
                
                {/* Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] px-2 py-0.5 bg-animus-dark border border-animus-border text-animus-cyan font-bold">
                      SEQ 0{idx + 1}
                    </span>
                    {exp.is_current && (
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-semibold uppercase">
                        Active Memory Sequence
                      </span>
                    )}
                    {isCubet && (
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-animus-gold/10 border border-animus-gold/40 text-animus-gold font-semibold uppercase">
                        Current Anchor
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xs text-animus-silver/80 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-animus-cyan" />
                    <span>{exp.start_date} — {exp.end_date || (exp.is_current ? 'PRESENT' : '')}</span>
                  </div>
                </div>

                {/* Role and Company */}
                <div className="mb-4">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-animus-cyan transition-colors">
                    {exp.role}
                  </h3>
                  <div className="font-mono text-sm text-animus-gold font-semibold flex items-center gap-2 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-animus-silver/50 text-xs">({exp.location})</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-animus-silver text-sm leading-relaxed mb-6 whitespace-pre-line">
                  {exp.description}
                </p>

                {/* Technologies Tag Array */}
                {techList.length > 0 && (
                  <div className="pt-4 border-t border-animus-border/40">
                    <div className="font-mono text-[10px] text-animus-silver/60 uppercase tracking-widest mb-2">
                      // DEPLOYED PROTOCOLS &amp; TECH MATRIX:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {techList.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-xs px-2.5 py-1 bg-animus-dark border border-animus-border text-animus-white group-hover:border-animus-cyan/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </HolographicCard>
            </div>
          );
        })}

      </div>
    </section>
  );
}
