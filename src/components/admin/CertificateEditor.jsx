import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import { apiClient } from '../../api/client';
import AnimusButton from '../ui/AnimusButton';

export default function CertificateEditor({ token, certifications = [], onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    credential_id: '',
    credential_url: '',
    badge_image_url: '',
    order: 0,
  });

  const startNew = () => {
    setFormData({
      title: '',
      issuer: '',
      issue_date: '',
      credential_id: '',
      credential_url: '',
      badge_image_url: '',
      order: certifications.length + 1,
    });
    setIsNew(true);
    setEditingId('new');
  };

  const startEdit = (cert) => {
    setFormData({ ...cert });
    setIsNew(false);
    setEditingId(cert.id);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await apiClient.uploadFile(token, file);
      setFormData(prev => ({ ...prev, badge_image_url: res.url }));
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
        await apiClient.createCertification(token, formData);
      } else {
        await apiClient.updateCertification(token, editingId, formData);
      }
      setEditingId(null);
      setIsNew(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error saving certification: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this synchronization mark?')) return;
    try {
      await apiClient.deleteCertification(token, id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-animus-border pb-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase">Synchronization Marks &amp; Honors</h3>
          <p className="text-animus-silver/70 text-[11px]">Certificates, architectural achievements, and awards</p>
        </div>
        {!editingId && (
          <AnimusButton variant="cyan" onClick={startNew}>
            + Add Certificate
          </AnimusButton>
        )}
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="p-4 bg-animus-dark border border-animus-cyan space-y-4">
          <div className="font-bold text-animus-cyan text-sm uppercase">
            {isNew ? 'Create New Credential' : `Edit Credential #${editingId}`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-animus-silver mb-1">CERTIFICATE / AWARD TITLE *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">ISSUING ENTITY *</label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">DATE ISSUED</label>
              <input
                type="text"
                value={formData.issue_date || ''}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-animus-silver mb-1">CREDENTIAL ID</label>
              <input
                type="text"
                value={formData.credential_id || ''}
                onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                className="w-full bg-animus-surface border border-animus-border p-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-animus-silver mb-1">VERIFICATION URL</label>
            <input
              type="text"
              value={formData.credential_url || ''}
              onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
              className="w-full bg-animus-surface border border-animus-border p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-animus-silver mb-1">BADGE / IMAGE (URL or Upload)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.badge_image_url || ''}
                onChange={(e) => setFormData({ ...formData, badge_image_url: e.target.value })}
                className="flex-1 bg-animus-surface border border-animus-border p-2 text-white"
              />
              <label className="cursor-pointer px-3 py-2 bg-animus-surface border border-animus-border hover:border-animus-cyan flex items-center gap-1 text-animus-silver">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
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
              Save Credential
            </AnimusButton>
          </div>
        </form>
      )}

      {/* Certifications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 bg-animus-surface border border-animus-border flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white text-sm">{cert.title}</div>
              <div className="text-animus-gold text-xs">{cert.issuer}</div>
              <div className="text-animus-silver/60 text-[10px] mt-1">
                {cert.issue_date} {cert.credential_id ? `| ID: ${cert.credential_id}` : ''}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startEdit(cert)}
                className="p-1.5 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-animus-cyan"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-1.5 border border-animus-border hover:border-red-500 text-animus-silver hover:text-red-400"
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
