import React from 'react';
import { Card } from '@next-step/ui-components';
import { formatDate, timeAgo } from '@next-step/utils';
import { HistoryEntry } from '../types';

export interface HistoryPanelProps {
  entries: HistoryEntry<any>[];
  onRestore?: (entry: HistoryEntry<any>) => void;
  className?: string;
}

export function HistoryPanel({ entries, onRestore, className = '' }: HistoryPanelProps) {
  return (
    <Card title="Change History" className={`history-panel ${className}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {entries.length === 0 ? (
          <p style={{ color: '#718096', textAlign: 'center', padding: '1rem' }}>
            No history entries yet.
          </p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '0.75rem',
                borderLeft: '2px solid #e2e8f0',
                backgroundColor: '#f7fafc',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontWeight: 600, color: '#2d3748' }}>{entry.description}</span>
                <span style={{ fontSize: '0.75rem', color: '#718096' }}>
                  {timeAgo(entry.timestamp)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
                  {entry.action} • {formatDate(entry.timestamp)}
                </span>
                {onRestore && (
                  <button
                    onClick={() => onRestore(entry)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4299e1',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    Restore
                  </button>
                )}
              </div>
            </div>
          )).reverse()
        )}
      </div>
    </Card>
  );
}
