import React, { useState } from 'react';
import { Send, Terminal, CheckCircle2, AlertCircle, Mail, MapPin, Building } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import GlitchText from '../ui/GlitchText';
import AnimusButton from '../ui/AnimusButton';
import { apiClient } from '../../api/client';

export default function UplinkContact({ profile }) {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await apiClient.submitContact(formData);
      setStatus('success');
      setFormData({ sender_name: '', sender_email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-12 border-b border-animus-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-animus-cyan tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-animus-cyan"></span>
            MEMORY BLOCK 06 // TRANSMISSION CHANNEL
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide mt-1">
            <GlitchText text="Communications Uplink" />
          </h2>
        </div>
        <div className="font-mono text-xs text-animus-silver/60">
          SECURE CHANNEL // 256-BIT ENCRYPTED
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <HolographicCard glowColor="cyan">
            <h3 className="font-mono text-sm text-animus-cyan font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>DIRECT CONTACT CHANNELS</span>
            </h3>

            <p className="text-animus-silver text-sm leading-relaxed mb-6">
              Initiate transmission for architectural consultation, high-throughput backend collaboration, senior engineering leadership roles, or technical speaking inquiries.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-3 p-3 bg-animus-dark/80 border border-animus-border">
                <Building className="w-4 h-4 text-animus-gold" />
                <div>
                  <div className="text-animus-silver/60 text-[10px]">CURRENT ANCHOR</div>
                  <div className="text-white font-semibold">{profile?.current_company || "Cubet Techno Labs Pvt. Ltd."}</div>
                </div>
              </div>

              {profile?.email && (
                <div className="flex items-center gap-3 p-3 bg-animus-dark/80 border border-animus-border">
                  <Mail className="w-4 h-4 text-animus-cyan" />
                  <div>
                    <div className="text-animus-silver/60 text-[10px]">ELECTRONIC MAIL</div>
                    <div className="text-white font-semibold">{profile.email}</div>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-center gap-3 p-3 bg-animus-dark/80 border border-animus-border">
                  <MapPin className="w-4 h-4 text-animus-red" />
                  <div>
                    <div className="text-animus-silver/60 text-[10px]">COORDINATES</div>
                    <div className="text-white font-semibold">{profile.location}</div>
                  </div>
                </div>
              )}
            </div>
          </HolographicCard>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <HolographicCard glowColor="cyan">
            <h3 className="font-mono text-sm text-white font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-animus-cyan" />
              <span>TRANSMIT DISPATCH PACKET</span>
            </h3>

            {status === 'success' && (
              <div className="p-4 mb-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>UPLINK TRANSMISSION DELIVERED TO ARCHITECT DATABASE.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 mb-6 bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>COMMUNICATION PACKET DROPPED. PLEASE TRY AGAIN.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-animus-silver mb-1 uppercase tracking-wider">
                    OPERATIVE NAME / CALLSIGN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    placeholder="e.g. Leonardo da Vinci"
                    className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-animus-silver mb-1 uppercase tracking-wider">
                    RETURN FREQUENCY (EMAIL) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-animus-silver mb-1 uppercase tracking-wider">
                  DISPATCH SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Enterprise Architecture Consultation / Collaboration"
                  className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-animus-silver mb-1 uppercase tracking-wider">
                  PAYLOAD MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your operational inquiry or architecture scope..."
                  className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none transition-colors"
                />
              </div>

              <AnimusButton
                type="submit"
                variant="cyan"
                disabled={submitting}
                className="w-full py-3"
              >
                {submitting ? "TRANSMITTING PACKET..." : "SEND UPLINK DISPATCH"}
              </AnimusButton>
            </form>
          </HolographicCard>
        </div>

      </div>
    </section>
  );
}
