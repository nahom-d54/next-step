import type { ChangeEvent } from 'react';

import type { DueDatePickerProps } from '../types';

export function DueDatePicker({
  value,
  onChange,
  name,
  disabled,
  id,
  invalid,
  ariaDescribedBy,
  min,
  max,
}: DueDatePickerProps) {
  return (
    <label style={{ display: 'grid', gap: '6px' }}>
      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Due date</span>
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={ariaDescribedBy}
        min={min}
        max={max}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }}
        style={{
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          padding: '10px 12px',
          fontSize: '0.95rem',
          lineHeight: 1.2,
        }}
      />
    </label>
  );
}
