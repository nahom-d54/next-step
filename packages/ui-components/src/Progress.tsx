import React from 'react';

export interface ProgressProps {
  /** Current value (0-100) */
  value: number;
  /** Maximum value, defaults to 100 */
  max?: number;
  /** Text label displayed alongside the bar */
  label?: string;
  /** Color of the progress fill */
  color?: string;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  color = '#6366f1',
  className = '',
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`progress-container ${className}`} style={{ width: '100%' }}>
      {label && (
        <div
          className="progress-label"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
            fontSize: '0.875rem',
          }}
        >
          <span>{label}</span>
          <span style={{ fontWeight: 600 }}>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="progress-track"
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e2e8f0',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: '9999px',
            transition: 'width 0.4s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
