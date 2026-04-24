import React from 'react';
import { Modal, Badge } from '@next-step/ui-components';

export interface VersionDiffProps<T extends Record<string, any>> {
  isOpen: boolean;
  onClose: () => void;
  original: T | null;
  modified: T | null;
  title?: string;
}

export function VersionDiff<T extends Record<string, any>>({
  isOpen,
  onClose,
  original,
  modified,
  title = 'Version Comparison',
}: VersionDiffProps<T>) {
  const allKeys = Array.from(
    new Set([...Object.keys(original || {}), ...Object.keys(modified || {})])
  );

  const renderValue = (val: any) => {
    if (val === null || val === undefined) return <em style={{ color: '#666' }}>None</em>;
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #333' }}>
              <th style={{ padding: '8px' }}>Field</th>
              <th style={{ padding: '8px' }}>Original</th>
              <th style={{ padding: '8px' }}>Modified</th>
            </tr>
          </thead>
          <tbody>
            {allKeys.map((key) => {
              const oldVal = original?.[key];
              const newVal = modified?.[key];
              const isDifferent = JSON.stringify(oldVal) !== JSON.stringify(newVal);

              return (
                <tr
                  key={key}
                  style={{
                    borderBottom: '1px solid #222',
                    backgroundColor: isDifferent ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>{key}</td>
                  <td
                    style={{
                      padding: '8px',
                      textDecoration: isDifferent ? 'line-through' : 'none',
                      color: isDifferent ? '#ef4444' : '#ccc',
                    }}
                  >
                    {renderValue(oldVal)}
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      color: isDifferent ? '#22c55e' : '#ccc',
                    }}
                  >
                    {renderValue(newVal)}
                    {isDifferent && (
                      <Badge
                        variant="info"
                        style={{ marginLeft: '8px', fontSize: '0.7rem' }}
                      >
                        Changed
                      </Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
