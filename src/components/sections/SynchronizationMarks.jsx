import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import GlitchText from '../ui/GlitchText';

export default function SynchronizationMarks({ certifications = [] }) {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 border-b border-animus-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-animus-cyan tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-animus-cyan"></span>
            MEMORY BLOCK 05 // CREDENTIAL VERIFICATION
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mt-1">
            <GlitchText text="Synchronization Marks &amp; Honors" />
          </h2>
        </div>
        <div className="font-mono text-xs text-animus-silver/60">
          PROVEN COMPETENCY MARKS // CERTIFIED
        </div>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certifications.map((cert, idx) => (
          <HolographicCard 
            key={cert.id || idx} 
            glowColor="gold"
            className="flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 mb-4 border border-animus-gold/50 bg-animus-dark flex items-center justify-center text-animus-gold shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <Award className="w-5 h-5" />
              </div>

              <h3 className="font-display font-bold text-base text-white group-hover:text-animus-gold transition-colors mb-1">
                {cert.title}
              </h3>

              <div className="font-mono text-xs text-animus-cyan font-medium mb-3">
                {cert.issuer}
              </div>

              {cert.credential_id && (
                <div className="font-mono text-[10px] text-animus-silver/60">
                  ID: <span className="text-animus-silver">{cert.credential_id}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-animus-border/40 flex items-center justify-between font-mono text-[11px]">
              <span className="text-animus-silver/70">{cert.issue_date || 'Synchronized'}</span>
              
              {cert.credential_url ? (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-animus-gold hover:text-white transition-colors"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Valid</span>
                </span>
              )}
            </div>
          </HolographicCard>
        ))}
      </div>

    </section>
  );
}
