import type { ChangeEvent } from 'react';

import type { PrioritySelectorProps, TaskComposerPriority } from '../types';

const PRIORITY_OPTIONS: readonly TaskComposerPriority[] = [
  'low',
  'medium',
  'high',
  'urgent',
];

function formatPriorityLabel(priority: TaskComposerPriority): string {
  return priority[0].toUpperCase() + priority.slice(1);
}

export function PrioritySelector({
  value,
  onChange,
  name,
  disabled,
  id,
  invalid,
  ariaDescribedBy,
}: PrioritySelectorProps) {
  return (
    <label style={{ display: 'grid', gap: '6px' }}>
      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Priority</span>
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={ariaDescribedBy}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const next = event.target.value;
          if (
            next === 'low' ||
            next === 'medium' ||
            next === 'high' ||
            next === 'urgent'
          ) {
            onChange(next);
          }
        }}
        style={{
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          padding: '10px 12px',
          fontSize: '0.95rem',
          lineHeight: 1.2,
        }}
      >
        {PRIORITY_OPTIONS.map((priority) => (
          <option key={priority} value={priority}>
            {formatPriorityLabel(priority)}
          </option>
        ))}
      </select>
    </label>
  );
}
