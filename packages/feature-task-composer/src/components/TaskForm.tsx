import type { ChangeEvent, FormEvent } from 'react';

import { useTaskForm } from '../hooks/useTaskForm';
import type { TaskFormProps } from '../types';
import { DueDatePicker } from './DueDatePicker';
import { PrioritySelector } from './PrioritySelector';

export function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  disabled,
  submitLabel = 'Save task',
  title = 'Task details',
}: TaskFormProps) {
  const { values, errors, isSubmitting, updateField, handleSubmit } = useTaskForm({
    initialValues,
    onSubmit,
  });

  const submitDisabled = disabled || isSubmitting;

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(event);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      style={{
        display: 'grid',
        gap: '12px',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: '16px',
        backgroundColor: '#ffffff',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{title}</h3>

      <label style={{ display: 'grid', gap: '6px' }}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Title</span>
        <input
          type="text"
          value={values.title}
          disabled={submitDisabled}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateField('title', event.target.value);
          }}
          placeholder="What needs to be done?"
          style={{
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            padding: '10px 12px',
            fontSize: '0.95rem',
            lineHeight: 1.2,
          }}
        />
        {errors.title ? (
          <span style={{ color: '#b91c1c', fontSize: '0.8rem' }}>{errors.title}</span>
        ) : null}
      </label>

      <label style={{ display: 'grid', gap: '6px' }}>
        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Description</span>
        <textarea
          value={values.description}
          disabled={submitDisabled}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            updateField('description', event.target.value);
          }}
          rows={4}
          placeholder="Optional details"
          style={{
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            padding: '10px 12px',
            fontSize: '0.95rem',
            lineHeight: 1.4,
            resize: 'vertical',
          }}
        />
        {errors.description ? (
          <span style={{ color: '#b91c1c', fontSize: '0.8rem' }}>
            {errors.description}
          </span>
        ) : null}
      </label>

      <PrioritySelector
        value={values.priority}
        disabled={submitDisabled}
        onChange={(priority) => {
          updateField('priority', priority);
        }}
      />
      {errors.priority ? (
        <span style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '-6px' }}>
          {errors.priority}
        </span>
      ) : null}

      <DueDatePicker
        value={values.dueDate}
        disabled={submitDisabled}
        onChange={(value) => {
          updateField('dueDate', value);
        }}
      />
      {errors.dueDate ? (
        <span style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '-6px' }}>
          {errors.dueDate}
        </span>
      ) : null}

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        {onCancel ? (
          <button
            type="button"
            disabled={submitDisabled}
            onClick={onCancel}
            style={{
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              padding: '8px 12px',
              backgroundColor: '#ffffff',
              cursor: submitDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={submitDisabled}
          style={{
            borderRadius: '8px',
            border: '1px solid #0f766e',
            padding: '8px 12px',
            backgroundColor: '#0f766e',
            color: '#ffffff',
            fontWeight: 600,
            cursor: submitDisabled ? 'not-allowed' : 'pointer',
            opacity: submitDisabled ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
