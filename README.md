# Recursive Task Breaker - Next Step

A Component-Based Software Development (CBSD) monorepo for a Recursive Task Breaker system.

## Monorepo Structure

```
next-step/
├── apps/
│   ├── web/         # Shared group web app (Vite + React)
│   └── api/         # Shared group API (Fastify + TypeScript)
├── packages/        # Shared, reusable packages (group work)
│   ├── ui-components/
│   ├── utils/
│   ├── feature-task-tree/
│   ├── feature-task-composer/
│   ├── feature-breakdown-action/
│   ├── feature-task-templates/
│   ├── feature-task-analytics/
│   ├── feature-task-history/
│   ├── feature-task-export/
│   └── feature-task-focus/
└── systems/         # Individual system assemblies (individual work)
    ├── core-task-management-system/       # task-tree + task-composer
    ├── ai-automation-system/              # breakdown-action + task-templates
    ├── insights-tracking-system/          # task-analytics + task-history
    ├── organization-discovery-system/     # task-search + task-tags
    └── productivity-integration-system/   # task-export + task-focus
```

## Setup

```bash
# Install all dependencies from repo root
pnpm install
```

## Common Commands (from repo root)

```bash
pnpm dev          # Dev servers for all workspaces
pnpm build        # Build all packages
pnpm typecheck    # Typecheck all packages
pnpm test         # Run all tests
pnpm lint         # Lint all packages
```

### Run a single workspace

```bash
pnpm dev:web      # Vite + React web app
pnpm dev:api      # Fastify API

# Run an individual system
pnpm --filter @next-step/insights-tracking-system dev
pnpm --filter @next-step/insights-tracking-system typecheck
```

## Package Overview

### `@next-step/ui-components`

Reusable, encapsulated UI primitives (CBSD encapsulated component model).

| Component  | Description                                      |
| ---------- | ------------------------------------------------ |
| `Button`   | Clickable action element with variants           |
| `Card`     | Content container with optional title/body       |
| `Badge`    | Status/tag display with variant styling          |
| `Progress` | Progress bar with label and configurable color   |
| `Modal`    | Dialog overlay with open/close control           |
| `Tooltip`  | Hover information display                        |
| `Tabs`     | Tab navigation with active state management      |

### `@next-step/utils`

Shared utility functions (pure functions / Objects pattern).

| Module      | Functions                                       |
| ----------- | ----------------------------------------------- |
| `date.ts`   | `formatDate`, `timeAgo`, `parseDate`            |
| `id.ts`     | `generateId`                                    |
| `string.ts` | `truncate`, `slugify`, `capitalize`             |
| `api.ts`    | `fetchJSON`, `handleError`, `retry`             |

### `@next-step/feature-task-analytics` — Insights & Tracking

Dashboard components for task completion and productivity metrics.

- **`AnalyticsDashboard`**: Composite overview with stat cards, progress bars, and badges.
- **`StatCard`**: Individual metric display with trend indicators.
- **`CompletionChart`**: Visual task completion over time (Recharts).
- **`ProductivityScore`**: Daily/weekly score with trend badge. *(Observer Pattern)*

### `@next-step/feature-task-history` — Insights & Tracking

State versioning, undo/redo, and version comparison.

- **`useHistory`**: Hook managing command stack for undo/redo + localStorage persistence. *(Command + Memento)*
- **`HistoryPanel`**: Chronological change log with restore actions.
- **`UndoRedoControls`**: Button controls wired to `useHistory`.
- **`VersionDiff`**: Modal component comparing two task snapshots.

### `@next-step/feature-task-tree` — Core Task Management

Recursive task tree visualization with expand/collapse. *(Composite Pattern)*

### `@next-step/feature-task-composer` — Core Task Management

Task creation and editing with validation. *(Command Form Pattern)*

### `@next-step/feature-task-export` — Productivity & Integration

Export tasks to JSON, Markdown, or CSV. *(Adapter Pattern)*

### `@next-step/feature-task-focus` — Productivity & Integration

Focus mode with Pomodoro timer and session tracking. *(State Pattern)*

