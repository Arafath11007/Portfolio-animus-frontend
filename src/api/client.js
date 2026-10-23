// Base backend URL: defaults to empty string in production/docker (using reverse proxy / relative paths),
// or reads VITE_API_URL when frontend and backend are hosted separately (e.g. Vercel + Render).
export const BACKEND_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = `${BACKEND_URL}/api/v1`;

/**
 * Helper to resolve media and asset URLs (e.g. /uploads/image.png)
 * Returns the full backend URL when VITE_API_URL is configured, or leaves relative otherwise.
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BACKEND_URL}${cleanPath}`;
};

export const apiClient = {
  // Public
  getPortfolio: async () => {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (!res.ok) throw new Error('Failed to fetch portfolio data');
    return res.json();
  },

  submitContact: async (messageData) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    if (!res.ok) throw new Error('Failed to send transmission');
    return res.json();
  },

  // Auth
  login: async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Authentication failed');
    }
    return res.json();
  },

  // Admin Profile
  getAdminProfile: async (token) => {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin profile');
    return res.json();
  },

  updateProfile: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Admin Experiences
  getExperiences: async (token) => {
    const res = await fetch(`${API_BASE}/admin/experiences`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  createExperience: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateExperience: async (token, id, data) => {
    const res = await fetch(`${API_BASE}/admin/experiences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteExperience: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/experiences/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Admin Projects
  getProjects: async (token) => {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  createProject: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProject: async (token, id, data) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProject: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Admin Skills
  getSkills: async (token) => {
    const res = await fetch(`${API_BASE}/admin/skills`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  createSkill: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateSkill: async (token, id, data) => {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteSkill: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Admin Certifications
  getCertifications: async (token) => {
    const res = await fetch(`${API_BASE}/admin/certifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  createCertification: async (token, data) => {
    const res = await fetch(`${API_BASE}/admin/certifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateCertification: async (token, id, data) => {
    const res = await fetch(`${API_BASE}/admin/certifications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteCertification: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/certifications/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Admin Messages
  getMessages: async (token) => {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  markMessageRead: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  deleteMessage: async (token, id) => {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Media Upload
  uploadFile: async (token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error('File upload failed');
    return res.json();
  },
};
