import React, { useState } from 'react';
import { Lock, Shield, KeyRound, ArrowLeft } from 'lucide-react';
import { apiClient } from '../../api/client';
import AnimusButton from '../ui/AnimusButton';

export default function AdminLogin({ onLoginSuccess, onBackToPortfolio }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('animus2026!');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.login(username, password);
      localStorage.setItem('animus_token', data.access_token);
      onLoginSuccess(data.access_token);
    } catch (err) {
      setError(err.message || 'Synchronization credentials rejected');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-animus-void">
      <div className="max-w-md w-full bg-animus-surface border border-animus-cyan p-8 animus-corner-border relative shadow-[0_0_30px_rgba(0,240,255,0.2)]">
        
        <button
          onClick={onBackToPortfolio}
          className="flex items-center gap-2 text-xs font-mono text-animus-silver hover:text-animus-cyan mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO LIVE PORTFOLIO</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 border border-animus-cyan flex items-center justify-center text-animus-cyan bg-animus-dark shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-mono text-base font-bold text-white tracking-widest uppercase">
            ABSTERGO // ANIMUS ACCESS
          </h2>
          <p className="font-mono text-xs text-animus-silver/70 mt-1">
            MASTER ARCHITECT PROTOCOL
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-animus-silver mb-1 uppercase tracking-wider">
              OPERATIVE IDENTIFIER
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-animus-silver mb-1 uppercase tracking-wider">
              CYBERNETIC PASSPHRASE
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
            />
          </div>

          <AnimusButton
            type="submit"
            variant="cyan"
            disabled={loading}
            className="w-full py-3"
          >
            {loading ? "DECRYPTING MATRIX..." : "SYNCHRONIZE SESSION"}
          </AnimusButton>
        </form>

        <div className="mt-6 text-center font-mono text-[10px] text-animus-silver/50">
          DEFAULT ACCESS: admin / animus2026!
        </div>
      </div>
    </div>
  );
}
