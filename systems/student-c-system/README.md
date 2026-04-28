# Student C System (Insights & Tracking)

This is Student C's **individual system assembly**. It composes Student C's two feature packages using the shared group packages.

## What this system assembles

- **Feature 1**: `@next-step/feature-task-analytics`
  - `AnalyticsDashboard`, `CompletionChart`, `ProductivityScore`
- **Feature 2**: `@next-step/feature-task-history`
  - `useHistory`, `HistoryPanel`, `UndoRedoControls`, `VersionDiff`
- **Shared packages**:
  - `@next-step/ui-components` (Card, Badge, Progress, Button, Tooltip, Modal)
  - `@next-step/utils` (date formatting, ID generation)

## Architecture / Rubric notes

- This folder contains **configuration + assembly only**.
- All composites are imported from `packages/*` (feature packages + shared packages).
- The UI shown by this system is a small demo that proves cross-package composition.

### CBSD Principles Demonstrated

| Principle          | Implementation                                                         |
| ------------------ | ---------------------------------------------------------------------- |
| **Containment**    | Features nested inside a layout shell (`App.tsx`)                      |
| **Coordination**   | `useHistory` hook coordinates state across `UndoRedoControls`, `HistoryPanel`, and `VersionDiff` |
| **Encapsulation**  | All components are black-box imports from `packages/*`                 |
| **Configuration**  | System-level values live in `config.ts`, passed as props               |

### Design Patterns Applied

| Pattern      | Where Used                               | Purpose                                    |
| ------------ | ---------------------------------------- | ------------------------------------------ |
| **Command**  | `useHistory` hook + `UndoRedoControls`   | Undo/redo operations via command stack      |
| **Memento**  | `VersionDiff` + `HistoryPanel`           | Compare snapshots of previous task states   |
| **Observer** | `AnalyticsDashboard`, `CompletionChart`  | Reactive display of analytics data          |
| **Mediator** | `App.tsx` coordination handlers          | Central coordination between features       |

### Component Composition Diagram

```
App (assembly + coordination)
├── section: Analytics
│   ├── AnalyticsDashboard  ← feature-task-analytics
│   ├── CompletionChart     ← feature-task-analytics
│   └── ProductivityScore   ← feature-task-analytics
│
└── section: History
    ├── UndoRedoControls    ← feature-task-history
    ├── HistoryPanel        ← feature-task-history
    │   └── onViewDiff → opens VersionDiff
    └── VersionDiff (Modal) ← feature-task-history
```

## File Structure

```
systems/student-c-system/
├── src/
│   ├── App.tsx              # Assembly: imports + composes features
│   ├── config.ts            # Configuration only (no component logic)
│   ├── studentCSystem.tsx   # Legacy standalone system component
│   └── main.tsx             # Entry point
├── package.json             # Dependencies on packages/*
└── README.md                # Architecture documentation (this file)
```

## Run

From repo root:

- Install: `pnpm install`
- Dev: `pnpm --filter @next-step/student-c-system dev`
- Typecheck: `pnpm --filter @next-step/student-c-system typecheck`
- Build: `pnpm --filter @next-step/student-c-system build`

Vite will print the local URL (usually `http://localhost:5173`).
