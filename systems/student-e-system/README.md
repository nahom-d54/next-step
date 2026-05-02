# `student-e-system` (Student E)

Individual assembly for **Productivity & Integration**:

- **`@next-step/feature-task-export`** — formats, previews, adapters, download wiring.
- **`@next-step/feature-task-focus`** — Pomodoro engine UI, fullscreen focus shell with session statistics.

This package follows the course constraint: **`src/` coordinates only**. Feature logic and encapsulated widgets live under `packages/`.

## Scripts

Run from repo root:

```bash
pnpm install
pnpm --filter @next-step/student-e-system dev
```

Build / typecheck:

```bash
pnpm --filter @next-step/student-e-system build
pnpm --filter @next-step/student-e-system typecheck
```

During `dev`, `vite.config.ts` aliases the two `@next-step/feature-*` packages to **`packages/*/src/index.ts`** so you do **not** need a prior `pnpm build` of those packages.

## Structure

```
systems/student-e-system/
├── README.md               # You are here
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── index.html
└── src/
    ├── main.tsx           # Boots React root
    ├── App.tsx             # Imports + orchestrates exports + timers + FocusMode gate
    ├── config.ts           # Static demo payloads + copy only (no JSX)
```

## Architecture sketch

```
App.tsx
├── ExportOptions + ExportButton + ExportPreview → getExportAdapter
├── PomodoroTimer (surface timer outside FocusMode so system shows both usages)
├── “Enter focus mode” trigger → FocusMode (embeds PomodoroTimer variant="plain")
└── SAMPLE_EXPORT_TASKS + copy from config.ts (configuration isolation)
```

## Design patterns surfaced

| Pattern      | Location (high level) |
| ----------- | ---------------------- |
| **Adapter** | `feature-task-export` serializes via interchangeable adapters orchestrated here with `getExportAdapter`. |
| **State / coordination** | `feature-task-focus` timer state machine coordinated by timers + modal shell; this system only binds UI state (`exportFormat`, `focusOpen`). |

## Next steps

- **Day 10 plan:** deepen integration touches (persist sessions, unify sample task IDs with future API payloads, tighten layout).
- Optionally point `apps/web` at this dashboard when the cohort agrees on routing.
