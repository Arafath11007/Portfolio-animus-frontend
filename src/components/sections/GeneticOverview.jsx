import React from 'react';
import { User, MapPin, Mail, Phone, Calendar, Briefcase, Download, ExternalLink } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import GlitchText from '../ui/GlitchText';
import AnimusButton from '../ui/AnimusButton';

export default function GeneticOverview({ profile }) {
  const currentCompany = profile?.current_company || "Cubet Techno Labs Pvt. Ltd.";

  return (
    <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 border-b border-animus-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-animus-cyan tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-animus-cyan"></span>
            MEMORY BLOCK 01 // PROFILE MATRIX
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mt-1">
            <GlitchText text="Genetic Overview" />
          </h2>
        </div>
        <div className="font-mono text-xs text-animus-silver/60">
          SUBJECT_ID: CTL-SE-ARCHITECT // 10_YRS_EXP
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Bio & Core Narrative */}
        <div className="lg:col-span-8 space-y-6">
          <HolographicCard glowColor="cyan">
            <h3 className="font-mono text-sm text-animus-cyan font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>SYNCHRONIZED BIOGRAPHY &amp; CAPABILITIES</span>
            </h3>

            <p className="text-animus-silver leading-relaxed text-sm sm:text-base whitespace-pre-line mb-6">
              {profile?.bio || (
                "Results-driven Senior Software Engineer with over 8 years of experience architecting, building, and maintaining high-performance backend systems and enterprise web applications using PHP 8+ and Laravel (10+).\n\n" +
                "Proven track record designing scalable RESTful APIs, optimizing complex MySQL schemas, and deploying containerized applications with Docker and Kubernetes. Expert in modern software design principles including Domain-Driven Design (DDD), Customer-Driven Development (CDD), and SOLID principles."
              )}
            </p>

            {/* Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-animus-border/50">
              <div className="bg-animus-dark/60 p-3 border border-animus-border/60">
                <div className="font-mono text-xs text-animus-cyan font-semibold mb-1">// ENTERPRISE ARCHITECTURE (DDD &amp; SOLID)</div>
                <div className="text-xs text-animus-silver">Domain-Driven Design (DDD), Customer-Driven Development (CDD), Clean Architecture &amp; RESTful API standards.</div>
              </div>
              <div className="bg-animus-dark/60 p-3 border border-animus-border/60">
                <div className="font-mono text-xs text-animus-gold font-semibold mb-1">// HIGH-SCALE DATABASE OPTIMIZATION</div>
                <div className="text-xs text-animus-silver">Complex MySQL schema design, query indexing, caching with Redis, and automated PHPUnit test suites.</div>
              </div>
            </div>
          </HolographicCard>
        </div>

        {/* Right Column: Telemetry Specs & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          <HolographicCard glowColor="gold">
            <h3 className="font-mono text-xs text-animus-gold font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>TELEMETRY METRICS</span>
            </h3>

            <ul className="space-y-3 font-mono text-xs text-animus-silver">
              <li className="flex justify-between border-b border-animus-border/40 pb-2">
                <span className="text-animus-silver/70">CURRENT ROLE:</span>
                <span className="text-white font-semibold">{profile?.title || "Senior Software Engineer"}</span>
              </li>
              <li className="flex justify-between border-b border-animus-border/40 pb-2">
                <span className="text-animus-silver/70">ORGANIZATION:</span>
                <span className="text-animus-cyan font-semibold">{currentCompany}</span>
              </li>
              <li className="flex justify-between border-b border-animus-border/40 pb-2">
                <span className="text-animus-silver/70">EXPERIENCE:</span>
                <span className="text-animus-gold font-bold">{profile?.years_experience || 10} Years</span>
              </li>
              <li className="flex justify-between border-b border-animus-border/40 pb-2">
                <span className="text-animus-silver/70">LOCATION:</span>
                <span className="text-white">{profile?.location || "Kochi, Kerala, India"}</span>
              </li>
              <li className="flex justify-between border-b border-animus-border/40 pb-2">
                <span className="text-animus-silver/70">STATUS:</span>
                <span className="text-emerald-400 font-bold">ACTIVE DEPLOYMENT</span>
              </li>
            </ul>

            {/* Social & Contact Direct Links */}
            <div className="pt-6 space-y-2">
              {profile?.email && (
                <div className="flex items-center gap-2 text-xs font-mono text-animus-silver hover:text-animus-cyan">
                  <Mail className="w-3.5 h-3.5 text-animus-cyan" />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile?.location && (
                <div className="flex items-center gap-2 text-xs font-mono text-animus-silver">
                  <MapPin className="w-3.5 h-3.5 text-animus-gold" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Resume / Dossier Button */}
            {profile?.resume_url && (
              <div className="pt-4">
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-animus-dark border border-animus-cyan text-animus-cyan hover:bg-animus-cyan hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Dossier (Resume)
                </a>
              </div>
            )}
          </HolographicCard>
        </div>

      </div>
    </section>
  );
}
