import React, { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: { backgroundColor: '#e2e8f0', color: '#1a202c' },
  success: { backgroundColor: '#c6f6d5', color: '#22543d' },
  warning: { backgroundColor: '#fefcbf', color: '#744210' },
  danger: { backgroundColor: '#fed7d7', color: '#822727' },
  info: { backgroundColor: '#bee3f8', color: '#2a4365' },
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`badge badge-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
