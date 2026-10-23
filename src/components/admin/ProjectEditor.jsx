import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import { apiClient } from '../../api/client';
import AnimusButton from '../ui/AnimusButton';

export default function ProjectEditor({ token, projects = [], onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    architecture_details: '',
    tags: '',
    image_url: '',
    demo_url: '',
    repo_url: '',
    featured: true,
    order: 0,
  });

  const startNew = () => {
    setFormData({
      title: '',
      tagline: '',
      description: '',
      architecture_details: '',
      tags: '',
      image_url: '',
      demo_url: '',
      repo_url: '',
      featured: true,
      order: projects.length + 1,
    });
    setIsNew(true);
    setEditingId('new');
  };

  const startEdit = (proj) => {
    setFormData({ ...proj });
    setIsNew(false);
    setEditingId(proj.id);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await apiClient.uploadFile(token, file);
      setFormData(prev => ({ ...prev, image_url: res.url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await apiClient.createProject(token, formData);
      } else {
        await apiClient.updateProject(token, editingId, formData);
      }
      setEditingId(null);
      setIsNew(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error saving project: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this field mission?')) return;
    try {
      await apiClient.deleteProject(token, id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-animus-border pb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase">Field Missions &amp; Projects</h3>
          <p className="text-animus-silver/70 text-[11px]">Showcase your high-performance backend platforms and APIs</p>
        </div>
        {!editingId && (
          <AnimusButton variant="cyan" onClick={startNew}>
            + Add Project
          </AnimusButton>
        )}
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="p-4 bg-animus-dark border border-animus-cyan space-y-4">
          <div className="font-bold text-animus-cyan text-sm uppercase">
            {isNew ? 'Create New Mission' : `Edit Mission #${editingId}`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-animus-silver mb-1">PROJECT TITLE *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">TAGLINE</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-animus-silver mb-1">DESCRIPTION</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-animus-surface border border-animus-border p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-animus-silver mb-1">ARCHITECTURE DETAILS &amp; TOPOLOGY</label>
            <textarea
              rows={2}
              value={formData.architecture_details || ''}
              onChange={(e) => setFormData({ ...formData, architecture_details: e.target.value })}
              placeholder="e.g. FastAPI, Asyncio, Redis Streams, Docker, PostgreSQL partitioning"
              className="w-full bg-animus-surface border border-animus-border p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-animus-silver mb-1">TECH TAGS (Comma separated)</label>
            <input
              type="text"
              value={formData.tags || ''}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Python, FastAPI, Redis, Microservices"
              className="w-full bg-animus-surface border border-animus-border p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-animus-silver mb-1">IMAGE URL / UPLOAD</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="flex-1 bg-animus-surface border border-animus-border p-2 text-white"
              />
              <label className="cursor-pointer px-3 py-2 bg-animus-surface border border-animus-border hover:border-animus-cyan flex items-center gap-1 text-animus-silver">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-animus-silver mb-1">GITHUB / REPO URL</label>
              <input
                type="text"
                value={formData.repo_url || ''}
                onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">LIVE DEMO URL</label>
              <input
                type="text"
                value={formData.demo_url || ''}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-4 py-2 border border-animus-border text-animus-silver hover:text-white"
            >
              Cancel
            </button>
            <AnimusButton type="submit" variant="cyan">
              Save Mission
            </AnimusButton>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 bg-animus-surface border border-animus-border flex flex-col justify-between"
          >
            <div>
              <div className="font-bold text-white text-sm mb-1">{proj.title}</div>
              <div className="text-animus-gold text-xs mb-2">{proj.tagline}</div>
              <div className="text-animus-silver/70 text-[11px] line-clamp-2">{proj.description}</div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-animus-border/40">
              <span className="text-animus-cyan text-[10px]">{proj.tags}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(proj)}
                  className="p-1.5 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-animus-cyan"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-1.5 border border-animus-border hover:border-red-500 text-animus-silver hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
