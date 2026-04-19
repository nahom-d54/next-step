# @next-step/feature-task-composer

Task composition feature package for creating and editing tasks with title, description, priority, and due date.

## Overview

This package contains the core form-layer components for Student A's second feature:

- `TaskForm`
- `PrioritySelector`
- `DueDatePicker`
- `useTaskForm` hook
- `validateTaskComposerValues` helper

## CBSD Notes

- `TaskForm` is the command surface for create/edit task actions.
- `PrioritySelector` and `DueDatePicker` are encapsulated input components.
- `useTaskForm` coordinates state and validation without leaking implementation details.

## Development

```bash
pnpm --filter @next-step/feature-task-composer typecheck
pnpm --filter @next-step/feature-task-composer build
pnpm --filter @next-step/feature-task-composer dev
```

## Usage

```tsx
import { TaskForm } from '@next-step/feature-task-composer';

export function ComposerExample() {
  return (
    <TaskForm
      onSubmit={async (values) => {
        console.log(values);
      }}
    />
  );
}
```
