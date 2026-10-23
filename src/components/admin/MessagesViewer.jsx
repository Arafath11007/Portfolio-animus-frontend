import React, { useState } from 'react';
import { Mail, Check, Trash2, Clock } from 'lucide-react';
import { apiClient } from '../../api/client';

export default function MessagesViewer({ token, messages = [], onRefresh }) {
  const [markingId, setMarkingId] = useState(null);

  const handleMarkRead = async (id) => {
    setMarkingId(id);
    try {
      await apiClient.markMessageRead(token, id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error updating: ' + err.message);
    } finally {
      setMarkingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dispatch packet?')) return;
    try {
      await apiClient.deleteMessage(token, id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="border-b border-animus-border pb-4">
        <h3 className="text-base font-bold text-white uppercase">Communications Array &amp; Inquiries</h3>
        <p className="text-animus-silver/70 text-[11px]">Messages transmitted by visitors and prospective partners</p>
      </div>

      {messages.length === 0 ? (
        <div className="p-8 text-center bg-animus-surface border border-animus-border text-animus-silver/60">
          No transmissions in queue.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 bg-animus-surface border ${
                msg.is_read ? 'border-animus-border' : 'border-animus-cyan shadow-[0_0_10px_rgba(0,240,255,0.15)]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{msg.sender_name}</span>
                  <span className="text-animus-cyan">({msg.sender_email})</span>
                  {!msg.is_read && (
                    <span className="px-1.5 py-0.5 bg-animus-cyan/20 border border-animus-cyan text-animus-cyan text-[9px] font-bold">
                      NEW UPLINK
                    </span>
                  )}
                </div>
                <div className="text-animus-silver/60 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                </div>
              </div>

              {msg.subject && (
                <div className="text-animus-gold font-semibold mb-2">
                  SUBJECT: {msg.subject}
                </div>
              )}

              <p className="text-animus-silver bg-animus-dark p-3 border border-animus-border/60 whitespace-pre-line mb-3">
                {msg.message}
              </p>

              <div className="flex justify-end gap-2">
                {!msg.is_read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    disabled={markingId === msg.id}
                    className="px-3 py-1 border border-animus-border hover:border-animus-cyan text-animus-silver hover:text-animus-cyan"
                  >
                    Mark As Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-3 py-1 border border-animus-border hover:border-red-500 text-animus-silver hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
