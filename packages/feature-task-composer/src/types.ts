import type { FormEvent } from 'react';

export type TaskComposerPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskComposerValues {
  title: string;
  description: string;
  priority: TaskComposerPriority;
  dueDate: string;
}

export type TaskComposerInitialValues = Partial<TaskComposerValues>;

export type TaskComposerSubmitHandler = (
  values: TaskComposerValues,
) => void | Promise<void>;

export interface TaskFormProps {
  initialValues?: TaskComposerInitialValues;
  onSubmit?: TaskComposerSubmitHandler;
  onCancel?: () => void;
  disabled?: boolean;
  submitLabel?: string;
  title?: string;
}

export interface PrioritySelectorProps {
  value: TaskComposerPriority;
  onChange: (priority: TaskComposerPriority) => void;
  disabled?: boolean;
  id?: string;
}

export interface DueDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  min?: string;
  max?: string;
}

export type TaskComposerFieldName = keyof TaskComposerValues;

export type TaskComposerFieldErrors = Partial<
  Record<TaskComposerFieldName, string>
>;

export interface TaskComposerValidationResult {
  isValid: boolean;
  errors: TaskComposerFieldErrors;
}

export interface UseTaskFormOptions {
  initialValues?: TaskComposerInitialValues;
  onSubmit?: TaskComposerSubmitHandler;
  validate?: (values: TaskComposerValues) => TaskComposerValidationResult;
}

export interface UseTaskFormReturn {
  values: TaskComposerValues;
  errors: TaskComposerFieldErrors;
  isSubmitting: boolean;
  updateField: <K extends TaskComposerFieldName>(
    field: K,
    value: TaskComposerValues[K],
  ) => void;
  reset: () => void;
  handleSubmit: (event?: FormEvent<HTMLFormElement>) => Promise<boolean>;
}
