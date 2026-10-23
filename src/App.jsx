import React, { useState, useEffect, Component } from 'react';
import AnimusLoadingCorridor from './components/animus/AnimusLoadingCorridor';
import AnimusConstellationBackground from './components/animus/AnimusConstellationBackground';
import AnimusHUD from './components/animus/AnimusHUD';
import HeroSection from './components/sections/HeroSection';
import GeneticOverview from './components/sections/GeneticOverview';
import MemorySequences from './components/sections/MemorySequences';
import MasteryTree from './components/sections/MasteryTree';
import FieldMissions from './components/sections/FieldMissions';
import SynchronizationMarks from './components/sections/SynchronizationMarks';
import UplinkContact from './components/sections/UplinkContact';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { apiClient } from './api/client';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Animus System Exception:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06090e] text-[#00F0FF] p-8 font-mono flex flex-col items-center justify-center">
          <div className="max-w-xl border border-red-500/60 p-6 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <h2 className="text-xl font-bold text-red-500 mb-2">// DESYNCHRONIZATION DETECTED //</h2>
            <p className="text-white text-xs mb-4">A rendering error was trapped by the Animus containment protocol:</p>
            <pre className="text-red-400 bg-black/60 p-3 text-xs overflow-auto max-h-48 border border-red-900/50">
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black text-xs font-bold"
            >
              [ REBOOT ANIMUS ]
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    profile: null,
    experiences: [],
    projects: [],
    skills: [],
    certifications: []
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [adminView, setAdminView] = useState(false); // 'login' | 'dashboard' | false
  const [adminToken, setAdminToken] = useState(localStorage.getItem('animus_token') || null);

  const fetchPortfolio = async () => {
    try {
      const data = await apiClient.getPortfolio();
      setPortfolioData(data);
    } catch (err) {
      console.warn('API sync fallback to default memory:', err);
    }
  };

  useEffect(() => {
    fetchPortfolio();

    // Scroll-Spy for active Animus HUD section
    const sections = ['overview', 'experiences', 'skills', 'projects', 'certifications', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 300) {
        setActiveSection('hero');
        return;
      }
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAdmin = () => {
    if (adminToken) {
      setAdminView('dashboard');
    } else {
      setAdminView('login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('animus_token');
    setAdminToken(null);
    setAdminView(false);
  };

  // If Admin view is active
  if (adminView === 'login') {
    return (
      <AdminLogin
        onLoginSuccess={(token) => {
          setAdminToken(token);
          setAdminView('dashboard');
        }}
        onBackToPortfolio={() => setAdminView(false)}
      />
    );
  }

  if (adminView === 'dashboard') {
    return (
      <AdminDashboard
        token={adminToken}
        onLogout={handleLogout}
        onBackToPortfolio={() => {
          setAdminView(false);
          fetchPortfolio();
        }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-animus-void text-animus-white relative selection:bg-animus-cyan selection:text-black">
        
        {/* 1. Dramatic Assassin's Creed Animus Loading Corridor */}
        {loading && (
          <AnimusLoadingCorridor onComplete={() => setLoading(false)} />
        )}

        {/* 2. Full Website Faded Animus Memory Constellation & Synapse Mesh */}
        <AnimusConstellationBackground />

        {/* 3. Animus HUD Header & Memory Nav */}
        <AnimusHUD
          onNavigate={handleNavigate}
          activeSection={activeSection}
          onToggleAdmin={handleToggleAdmin}
        />

        {/* 4. Main Portfolio Sequences Content */}
        <main className="relative z-10 pt-16">
          <HeroSection
            profile={portfolioData.profile}
            onExplore={handleNavigate}
            onContact={() => handleNavigate('contact')}
          />

          <GeneticOverview profile={portfolioData.profile} />

          <MemorySequences experiences={portfolioData.experiences} />

          <MasteryTree skills={portfolioData.skills} />

          <FieldMissions projects={portfolioData.projects} />

          <SynchronizationMarks certifications={portfolioData.certifications} />

          <UplinkContact profile={portfolioData.profile} />
        </main>

        {/* 5. Animus Footer */}
        <footer className="relative z-10 border-t border-animus-border/60 py-8 px-4 text-center font-mono text-xs text-animus-silver/50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-animus-cyan"></span>
              <span>ANIMUS 4.0 // CUBET TECHNO LABS NODE</span>
            </div>
            <div>
              8+ YEARS BACKEND ARCHITECTURE // LARAVEL &amp; PHP 8+ // MYSQL // DOCKER &amp; K8s
            </div>
            <button
              onClick={handleToggleAdmin}
              className="hover:text-animus-cyan transition-colors"
            >
              [ ADMIN ACCESS ]
            </button>
          </div>
        </footer>

        {/* Screen glitch scanlines overlay */}
        <div className="fixed inset-0 animus-scanlines pointer-events-none z-30" />
      </div>
    </ErrorBoundary>
  );
}
