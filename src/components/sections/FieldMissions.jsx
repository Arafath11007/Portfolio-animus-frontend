import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Server, ShieldCheck, X } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import GlitchText from '../ui/GlitchText';
import AnimusButton from '../ui/AnimusButton';
import { getAssetUrl } from '../../api/client';

export default function FieldMissions({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 border-b border-animus-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-animus-cyan tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-animus-cyan"></span>
            MEMORY BLOCK 04 // OPERATIONAL ARCHITECTURE
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mt-1">
            <GlitchText text="Field Missions &amp; Projects" />
          </h2>
        </div>
        <div className="font-mono text-xs text-animus-silver/60">
          DEPLOYED SOLUTIONS // HIGH-SCALE BACKENDS
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => {
          const tags = proj.tags ? proj.tags.split(',').map(t => t.trim()) : [];

          return (
            <HolographicCard 
              key={proj.id || idx} 
              glowColor="cyan"
              className="flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Optional Project Screenshot / Banner */}
                {proj.image_url && (
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden border-b border-animus-border">
                    <img 
                      src={getAssetUrl(proj.image_url)} 
                      alt={proj.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-animus-surface via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 right-3 font-mono text-[9px] px-2 py-0.5 bg-animus-dark/80 border border-animus-cyan text-animus-cyan uppercase font-bold">
                      MISSION 0{idx + 1}
                    </div>
                  </div>
                )}

                {/* Project Title and Tagline */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-animus-cyan transition-colors mb-1">
                  {proj.title}
                </h3>
                {proj.tagline && (
                  <div className="font-mono text-xs text-animus-gold font-semibold mb-3">
                    // {proj.tagline}
                  </div>
                )}

                <p className="text-animus-silver text-sm leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Architecture Highlights Callout */}
                {proj.architecture_details && (
                  <div className="p-3 bg-animus-dark/80 border border-animus-border/70 mb-4 font-mono text-xs text-animus-silver/90">
                    <span className="text-animus-cyan font-bold block mb-1">SYSTEM TOPOLOGY:</span>
                    {proj.architecture_details}
                  </div>
                )}
              </div>

              {/* Footer Tags & Links */}
              <div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-animus-border/40">
                    {tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[11px] px-2 py-0.5 bg-animus-dark border border-animus-border text-animus-silver group-hover:border-animus-cyan/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <AnimusButton 
                    variant="cyan" 
                    className="flex-1 text-center"
                    onClick={() => setSelectedProject(proj)}
                  >
                    View Dossier
                  </AnimusButton>
                  
                  {proj.repo_url && (
                    <a
                      href={proj.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-white transition-colors"
                      title="Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demo_url && (
                    <a
                      href={proj.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-white transition-colors"
                      title="Live Uplink"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </HolographicCard>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-animus-surface border border-animus-cyan p-6 sm:p-8 animus-corner-border shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 text-animus-silver hover:text-animus-cyan border border-animus-border hover:border-animus-cyan transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-mono text-xs text-animus-cyan font-bold uppercase mb-2">
              FIELD DOSSIER // DECLASSIFIED TELEMETRY
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              {selectedProject.title}
            </h3>
            {selectedProject.tagline && (
              <p className="font-mono text-xs text-animus-gold font-semibold mb-4">
                {selectedProject.tagline}
              </p>
            )}

            <div className="text-animus-silver text-sm leading-relaxed space-y-4 mb-6">
              <p>{selectedProject.description}</p>
              
              {selectedProject.architecture_details && (
                <div className="p-4 bg-animus-dark border border-animus-border font-mono text-xs">
                  <div className="text-animus-cyan font-bold uppercase mb-1">Architectural Blueprints:</div>
                  <div className="text-animus-silver/90">{selectedProject.architecture_details}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-animus-border">
              <AnimusButton variant="white" onClick={() => setSelectedProject(null)}>
                Close Dossier
              </AnimusButton>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
