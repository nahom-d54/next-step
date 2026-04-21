# Student C System (Insights & Tracking)

This is Student C’s **individual system assembly**. It composes Student C’s two feature packages using the shared group packages.

## What this system assembles

- **Feature 1**: `@next-step/feature-task-analytics`
  - `AnalyticsDashboard`, `CompletionChart`, `ProductivityScore`
- **Feature 2**: `@next-step/feature-task-history`
  - `useHistory`, `HistoryPanel`
- **Shared packages**:
  - `@next-step/ui-components`
  - `@next-step/utils`

## Architecture / Rubric notes

- This folder contains **configuration + assembly only**.
- All composites are imported from `packages/*` (feature packages + shared packages).
- The UI shown by this system is a small demo that proves cross-package composition.

## Run

From repo root:

- Install: `pnpm install`
- Dev: `pnpm --filter @next-step/student-c-system dev`
- Typecheck: `pnpm --filter @next-step/student-c-system typecheck`
- Build: `pnpm --filter @next-step/student-c-system build`

Vite will print the local URL (usually `http://localhost:5173`).
