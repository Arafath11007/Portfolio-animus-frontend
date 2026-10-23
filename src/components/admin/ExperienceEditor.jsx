import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { apiClient } from '../../api/client';
import AnimusButton from '../ui/AnimusButton';

export default function ExperienceEditor({ token, experiences = [], onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    technologies: '',
    order: 0,
  });

  const startNew = () => {
    setFormData({
      company: '',
      role: '',
      location: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      technologies: '',
      order: experiences.length + 1,
    });
    setIsNew(true);
    setEditingId('new');
  };

  const startEdit = (exp) => {
    setFormData({ ...exp });
    setIsNew(false);
    setEditingId(exp.id);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await apiClient.createExperience(token, formData);
      } else {
        await apiClient.updateExperience(token, editingId, formData);
      }
      setEditingId(null);
      setIsNew(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error saving experience: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this memory sequence entry?')) return;
    try {
      await apiClient.deleteExperience(token, id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-animus-border pb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase">Work Experience Sequences</h3>
          <p className="text-animus-silver/70 text-[11px]">Manage your career timeline including Cubet Techno Labs roles</p>
        </div>
        {!editingId && (
          <AnimusButton variant="cyan" onClick={startNew}>
            + Add Experience
          </AnimusButton>
        )}
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="p-4 bg-animus-dark border border-animus-cyan space-y-4">
          <div className="font-bold text-animus-cyan text-sm uppercase">
            {isNew ? 'Create New Sequence' : `Edit Sequence #${editingId}`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-animus-silver mb-1">COMPANY *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">ROLE / TITLE *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">START DATE (e.g. 2021) *</label>
              <input
                type="text"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">END DATE (e.g. Present)</label>
              <input
                type="text"
                value={formData.end_date || ''}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_current"
              checked={formData.is_current}
              onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
              className="accent-animus-cyan"
            />
            <label htmlFor="is_current" className="text-animus-silver">CURRENT POSITION (Active Memory Sequence)</label>
          </div>

          <div>
            <label className="block text-animus-silver mb-1">DESCRIPTION &amp; IMPACT</label>
            <textarea
              rows={4}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-animus-surface border border-animus-border p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-animus-silver mb-1">TECHNOLOGIES (Comma separated)</label>
            <input
              type="text"
              value={formData.technologies || ''}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="PHP, Laravel, Python, FastAPI, Docker, PostgreSQL"
              className="w-full bg-animus-surface border border-animus-border p-2 text-white"
            />
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
              Save Sequence
            </AnimusButton>
          </div>
        </form>
      )}

      {/* Experience List */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 bg-animus-surface border border-animus-border flex items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{exp.role}</span>
                <span className="text-animus-gold">@ {exp.company}</span>
                {exp.is_current && (
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px]">
                    CURRENT
                  </span>
                )}
              </div>
              <div className="text-animus-silver/60 text-[11px] mt-0.5">
                {exp.start_date} — {exp.end_date || (exp.is_current ? 'Present' : '')} | {exp.technologies}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startEdit(exp)}
                className="p-2 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-animus-cyan"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 border border-animus-border hover:border-red-500 text-animus-silver hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
