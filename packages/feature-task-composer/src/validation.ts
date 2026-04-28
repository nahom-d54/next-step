import type {
  TaskComposerFieldErrors,
  TaskComposerValidationOptions,
  TaskComposerValidationResult,
  TaskComposerValues,
} from './types';

const DATE_INPUT_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateInput(value: string): boolean {
  if (!DATE_INPUT_PATTERN.test(value)) {
    return false;
  }

  const [yearPart, monthPart, dayPart] = value.split('-');
  const year = Number(yearPart);
  const month = Number(monthPart);
  const day = Number(dayPart);

  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

export function validateTaskComposerValues(
  values: TaskComposerValues,
  options: TaskComposerValidationOptions = {},
): TaskComposerValidationResult {
  const { minDueDate, maxDueDate } = options;
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
  if (dueDate.length > 0 && !isValidDateInput(dueDate)) {
    errors.dueDate = 'Due date must be a valid date';
  }

  if (
    !errors.dueDate &&
    dueDate.length > 0 &&
    minDueDate &&
    isValidDateInput(minDueDate) &&
    dueDate < minDueDate
  ) {
    errors.dueDate = `Due date must be on or after ${minDueDate}`;
  }

  if (
    !errors.dueDate &&
    dueDate.length > 0 &&
    maxDueDate &&
    isValidDateInput(maxDueDate) &&
    dueDate > maxDueDate
  ) {
    errors.dueDate = `Due date must be on or before ${maxDueDate}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
