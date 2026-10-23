import React, { useState } from 'react';
import { Upload, Save, Check } from 'lucide-react';
import { apiClient } from '../../api/client';
import AnimusButton from '../ui/AnimusButton';

export default function ProfileEditor({ token, profile, onSaved }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    tagline: profile?.tagline || '',
    current_company: profile?.current_company || 'Cubet Techno Labs Pvt. Ltd.',
    years_experience: profile?.years_experience || 10,
    bio: profile?.bio || '',
    avatar_url: profile?.avatar_url || '',
    resume_url: profile?.resume_url || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    github_url: profile?.github_url || '',
    linkedin_url: profile?.linkedin_url || '',
    twitter_url: profile?.twitter_url || '',
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await apiClient.uploadFile(token, file);
      setFormData(prev => ({ ...prev, [field]: res.url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const updated = await apiClient.updateProfile(token, formData);
      setMsg('Profile synchronized successfully!');
      if (onSaved) onSaved(updated);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-animus-border pb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase">Profile &amp; Genetic Identity</h3>
          <p className="text-animus-silver/70 text-[11px]">Update your public title, Cubet Techno Labs position, bio and links</p>
        </div>
        <AnimusButton type="submit" variant="cyan" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </AnimusButton>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-animus-silver mb-1">FULL NAME</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-animus-silver mb-1">PROFESSIONAL TITLE</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-animus-silver mb-1">CURRENT COMPANY</label>
          <input
            type="text"
            value={formData.current_company}
            onChange={(e) => setFormData({ ...formData, current_company: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-animus-silver mb-1">YEARS OF EXPERIENCE</label>
          <input
            type="number"
            value={formData.years_experience}
            onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) || 0 })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-animus-silver mb-1">HERO TAGLINE</label>
        <input
          type="text"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-animus-silver mb-1">SYNCHRONIZED BIOGRAPHY</label>
        <textarea
          rows={5}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-animus-silver mb-1">AVATAR / PROFILE PHOTO (URL or Upload)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              className="flex-1 bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
            />
            <label className="cursor-pointer px-3 py-2 bg-animus-surface border border-animus-border hover:border-animus-cyan flex items-center gap-1 text-animus-silver hover:text-white">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'avatar_url')} />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-animus-silver mb-1">RESUME / DOSSIER FILE (URL or Upload)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.resume_url}
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              className="flex-1 bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
            />
            <label className="cursor-pointer px-3 py-2 bg-animus-surface border border-animus-border hover:border-animus-cyan flex items-center gap-1 text-animus-silver hover:text-white">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'resume_url')} />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-animus-silver mb-1">EMAIL ADDRESS</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-animus-silver mb-1">LOCATION</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-animus-silver mb-1">GITHUB URL</label>
          <input
            type="text"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-animus-silver mb-1">LINKEDIN URL</label>
          <input
            type="text"
            value={formData.linkedin_url}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            className="w-full bg-animus-dark border border-animus-border p-2.5 text-white focus:border-animus-cyan focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
}
