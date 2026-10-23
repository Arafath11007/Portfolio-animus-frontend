import React, { useState, useEffect } from 'react';
import { 
  User, Briefcase, Layers, Cpu, Award, MessageSquare, 
  LogOut, ArrowLeft, RefreshCw, Eye 
} from 'lucide-react';
import { apiClient } from '../../api/client';
import ProfileEditor from './ProfileEditor';
import ExperienceEditor from './ExperienceEditor';
import ProjectEditor from './ProjectEditor';
import SkillEditor from './SkillEditor';
import CertificateEditor from './CertificateEditor';
import MessagesViewer from './MessagesViewer';
import AnimusButton from '../ui/AnimusButton';

export default function AdminDashboard({ token, onLogout, onBackToPortfolio }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState({
    profile: null,
    experiences: [],
    projects: [],
    skills: [],
    certifications: [],
    messages: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [portfolioData, messages] = await Promise.all([
        apiClient.getPortfolio(),
        apiClient.getMessages(token).catch(() => []),
      ]);
      setData({
        profile: portfolioData.profile,
        experiences: portfolioData.experiences || [],
        projects: portfolioData.projects || [],
        skills: portfolioData.skills || [],
        certifications: portfolioData.certifications || [],
        messages: messages || [],
      });
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [token]);

  const tabs = [
    { id: 'profile', label: 'GENETIC PROFILE', icon: User },
    { id: 'experiences', label: 'MEMORY SEQUENCES', icon: Briefcase, count: data.experiences.length },
    { id: 'projects', label: 'FIELD MISSIONS', icon: Layers, count: data.projects.length },
    { id: 'skills', label: 'MASTERY TREE', icon: Cpu, count: data.skills.length },
    { id: 'certifications', label: 'CREDENTIAL MARKS', icon: Award, count: data.certifications.length },
    { 
      id: 'messages', 
      label: 'TRANSMISSIONS', 
      icon: MessageSquare, 
      count: data.messages.filter(m => !m.is_read).length,
      alert: data.messages.some(m => !m.is_read)
    },
  ];

  return (
    <div className="min-h-screen bg-animus-void text-animus-white font-sans flex flex-col">
      {/* Admin Top Bar */}
      <header className="h-16 border-b border-animus-border bg-animus-surface/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToPortfolio}
            className="flex items-center gap-2 text-xs font-mono text-animus-cyan hover:text-white border border-animus-border px-3 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>VIEW LIVE ANIMUS</span>
          </button>
          <div className="h-4 w-[1px] bg-animus-border hidden sm:block" />
          <div className="font-mono text-xs text-animus-silver font-bold uppercase tracking-wider hidden sm:block">
            ABSTERGO ARCHITECT CONTROL PANEL // CUBET TECHNO LABS NODE
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            title="Reload Data"
            className="p-2 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-mono text-red-400 hover:text-white border border-red-500/40 hover:border-red-500 px-3 py-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar */}
        <aside className="md:col-span-3 space-y-1 font-mono text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 border transition-all text-left ${
                  isActive
                    ? 'bg-animus-cyan text-black border-animus-cyan font-bold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-animus-surface/60 text-animus-silver border-animus-border hover:border-animus-cyan/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-none text-[10px] ${
                    tab.alert ? 'bg-red-500 text-white animate-pulse' : isActive ? 'bg-black text-animus-cyan' : 'bg-animus-dark text-animus-silver'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 font-mono text-[10px] text-animus-silver/50 p-2">
            <div>// STATUS: SECURE_SYNC</div>
            <div>// ARCHITECT: 10_YRS_EXP</div>
            <div>// TARGET: CUBET_PORTFOLIO</div>
          </div>
        </aside>

        {/* Right Editor Pane */}
        <main className="md:col-span-9 bg-animus-surface/80 border border-animus-border p-6 animus-corner-border min-h-[600px]">
          {loading ? (
            <div className="flex items-center justify-center h-64 font-mono text-animus-cyan text-xs">
              SYNCHRONIZING TELEMETRY STREAM...
            </div>
          ) : (
            <>
              {activeTab === 'profile' && (
                <ProfileEditor
                  token={token}
                  profile={data.profile}
                  onSaved={fetchAllData}
                />
              )}
              {activeTab === 'experiences' && (
                <ExperienceEditor
                  token={token}
                  experiences={data.experiences}
                  onRefresh={fetchAllData}
                />
              )}
              {activeTab === 'projects' && (
                <ProjectEditor
                  token={token}
                  projects={data.projects}
                  onRefresh={fetchAllData}
                />
              )}
              {activeTab === 'skills' && (
                <SkillEditor
                  token={token}
                  skills={data.skills}
                  onRefresh={fetchAllData}
                />
              )}
              {activeTab === 'certifications' && (
                <CertificateEditor
                  token={token}
                  certifications={data.certifications}
                  onRefresh={fetchAllData}
                />
              )}
              {activeTab === 'messages' && (
                <MessagesViewer
                  token={token}
                  messages={data.messages}
                  onRefresh={fetchAllData}
                />
              )}
            </>
          )}
        </main>

      </div>
    </div>
  );
}
