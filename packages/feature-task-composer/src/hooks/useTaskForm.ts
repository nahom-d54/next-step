import { useCallback, useMemo, useState } from 'react';

import type {
  TaskComposerFieldErrors,
  TaskComposerFieldName,
  TaskComposerInitialValues,
  TaskComposerValidationResult,
  TaskComposerValues,
  UseTaskFormOptions,
  UseTaskFormReturn,
} from '../types';
import { validateTaskComposerValues } from '../validation';

const DEFAULT_VALUES: TaskComposerValues = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

function mergeInitialValues(
  initialValues?: TaskComposerInitialValues,
): TaskComposerValues {
  return {
    ...DEFAULT_VALUES,
    ...initialValues,
  };
}

function defaultValidate(values: TaskComposerValues): TaskComposerValidationResult {
  return validateTaskComposerValues(values);
}

export function useTaskForm(options: UseTaskFormOptions = {}): UseTaskFormReturn {
  const { initialValues, onSubmit, validate = defaultValidate } = options;

  const initial = useMemo(() => mergeInitialValues(initialValues), [initialValues]);
  const [values, setValues] = useState<TaskComposerValues>(initial);
  const [errors, setErrors] = useState<TaskComposerFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    <K extends TaskComposerFieldName>(field: K, value: TaskComposerValues[K]) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      setErrors((prev) => {
        if (!prev[field]) {
          return prev;
        }

        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
  }, [initial]);

  const handleSubmit: UseTaskFormReturn['handleSubmit'] = useCallback(
    async (event) => {
      event?.preventDefault();

      const result = validate(values);
      setErrors(result.errors);

      if (!result.isValid) {
        return false;
      }

      if (!onSubmit) {
        return true;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
        return true;
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, validate, values],
  );

  return {
    values,
    errors,
    isSubmitting,
    updateField,
    reset,
    handleSubmit,
  };
}
