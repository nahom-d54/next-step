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

During `dev`, `vite.config.ts` aliases the two `@next-step/feature-*` packages to **`packages/*/src/index.ts`** so you do **not** need a prior **`pnpm build`** of those packages.

## Structure

```
systems/student-e-system/
├── README.md                       # Architecture notes
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── index.html
└── src/
    ├── main.tsx                   # Boots React root
    ├── App.tsx                     # Imports + orchestrates exports + timers + FocusMode gate
    ├── config.ts                  # Seeds + persistence key (constants only)
    └── focusSessionsStorage.ts    # localStorage read/write guards (coordination helpers)
```

## Architecture sketch (Days 9–10)

```
App.tsx
├── Living task snapshot (structuredClone SAMPLE_EXPORT_TASKS)
│       ├── drives ExportPreview + Download via getExportAdapter
│       └── adjusts Focus mode headline when root milestone toggles
├── PomodoroTimer (surface lane)
├── FocusMode(initialSessions ◀ persisted JSON, onSessionsChange ▶ persistence)
└── SAMPLE_EXPORT_TASKS + storage key from config.ts
```

## Design patterns surfaced

| Pattern | Role in this assembly |
| ----------- | ----------- |
| **Adapter** | `getExportAdapter` chooses JSON/Markdown/CSV serializers for preview + filenames. |
| **State coordination** | `App` binds format pickers + download + hydration with React state—not new components. |

## Next steps (Day 11+)

Polish UX (toast on save, shorten Pomodoro for demos, unify with `apps/web` routing).
