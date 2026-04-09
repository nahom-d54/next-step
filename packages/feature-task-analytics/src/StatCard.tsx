import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

/**
 * StatCard - A presentational sub-component used within the AnalyticsDashboard.
 * Displays a single metric with optional trend indicator.
 */
export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend = 'neutral',
  trendValue,
}: StatCardProps) {
  const trendColors = {
    up: '#22543d',
    down: '#822727',
    neutral: '#718096',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <div
      className="stat-card"
      style={{
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        minWidth: '180px',
        flex: '1 1 0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 500 }}>
          {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
          {title}
        </span>
      </div>
      <div
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginTop: '8px',
          color: '#1a202c',
        }}
      >
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
        {trendValue && (
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: trendColors[trend] }}>
            {trendIcons[trend]} {trendValue}
          </span>
        )}
        {subtitle && (
          <span style={{ fontSize: '0.75rem', color: '#a0aec0' }}>{subtitle}</span>
        )}
      </div>
    </div>
  );
}
