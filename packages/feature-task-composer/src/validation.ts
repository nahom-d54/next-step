import type {
  TaskComposerFieldErrors,
  TaskComposerValidationResult,
  TaskComposerValues,
} from './types';

export function validateTaskComposerValues(
  values: TaskComposerValues,
): TaskComposerValidationResult {
  const errors: TaskComposerFieldErrors = {};

  const title = values.title.trim();
  if (title.length === 0) {
    errors.title = 'Title is required';
  } else if (title.length > 120) {
    errors.title = 'Title must be 120 characters or fewer';
  }

  const description = values.description.trim();
  if (description.length > 2000) {
    errors.description = 'Description must be 2000 characters or fewer';
  }

  if (
    values.priority !== 'low' &&
    values.priority !== 'medium' &&
    values.priority !== 'high' &&
    values.priority !== 'urgent'
  ) {
    errors.priority = 'Priority must be low, medium, high, or urgent';
  }

  const dueDate = values.dueDate.trim();
  if (dueDate.length > 0 && Number.isNaN(Date.parse(dueDate))) {
    errors.dueDate = 'Due date must be a valid date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
