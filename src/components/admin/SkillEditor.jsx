import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { apiClient } from '../../api/client';
import AnimusButton from '../ui/AnimusButton';

export default function SkillEditor({ token, skills = [], onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'backend',
    proficiency: 90,
    years_experience: 5,
    highlight: false,
    order: 0,
  });

  const startNew = () => {
    setFormData({
      name: '',
      category: 'backend',
      proficiency: 90,
      years_experience: 5,
      highlight: false,
      order: skills.length + 1,
    });
    setIsNew(true);
    setEditingId('new');
  };

  const startEdit = (skill) => {
    setFormData({ ...skill });
    setIsNew(false);
    setEditingId(skill.id);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await apiClient.createSkill(token, formData);
      } else {
        await apiClient.updateSkill(token, editingId, formData);
      }
      setEditingId(null);
      setIsNew(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error saving skill: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this mastery node?')) return;
    try {
      await apiClient.deleteSkill(token, id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-animus-border pb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase">Synchronization Mastery &amp; Skills</h3>
          <p className="text-animus-silver/70 text-[11px]">PHP, Python, Architecture, Database proficiencies</p>
        </div>
        {!editingId && (
          <AnimusButton variant="cyan" onClick={startNew}>
            + Add Skill Node
          </AnimusButton>
        )}
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="p-4 bg-animus-dark border border-animus-cyan space-y-4">
          <div className="font-bold text-animus-cyan text-sm uppercase">
            {isNew ? 'Create New Skill Node' : `Edit Skill #${editingId}`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-animus-silver mb-1">SKILL NAME *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">CATEGORY</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              >
                <option value="backend">Backend Systems (PHP/Python)</option>
                <option value="database">Databases &amp; Caching</option>
                <option value="cloud_devops">Cloud &amp; DevOps</option>
                <option value="tools">Tools &amp; Architecture</option>
                <option value="frontend">Frontend &amp; UI</option>
              </select>
            </div>
            <div>
              <label className="block text-animus-silver mb-1">PROFICIENCY (1-100) %</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 0 })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">YEARS OF EXPERIENCE</label>
              <input
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) || 0 })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="highlight"
              checked={formData.highlight}
              onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
              className="accent-animus-cyan"
            />
            <label htmlFor="highlight" className="text-animus-silver">CORE ANCHOR (Highlight on Portfolio)</label>
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
              Save Skill Node
            </AnimusButton>
          </div>
        </form>
      )}

      {/* Skills Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-3 bg-animus-surface border border-animus-border flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white text-xs">{skill.name}</div>
              <div className="text-[10px] text-animus-silver/60">
                {skill.category.toUpperCase()} | {skill.years_experience} YRS | {skill.proficiency}%
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => startEdit(skill)}
                className="p-1 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-animus-cyan"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1 border border-animus-border hover:border-red-500 text-animus-silver hover:text-red-400"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
