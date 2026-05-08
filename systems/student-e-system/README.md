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
├── README.md                       # This file — canonical assembly reference (Day 12)
├── package.json
├── vite.config.ts
├── tsconfig*.json
├── index.html
└── src/
    ├── main.tsx                   # Boots React root
    ├── App.tsx                    # Tasks state, export + focus coordination, a11y banners
    ├── config.ts                  # Seeds + persistence key (constants only)
    └── focusSessionsStorage.ts    # localStorage read/write guards (coordination helpers)
```

## Architecture (Days 9–12)

```
App.tsx
├── Living task snapshot (structuredClone SAMPLE_EXPORT_TASKS)
│       ├── drives ExportPreview + Download via getExportAdapter
│       ├── Copy preview + aria-live banner for outcomes
│       └── adjusts Focus mode headline when root milestone toggles
├── PomodoroTimer (surface lane; chimes respect mute + reduced-motion in feature package)
├── FocusMode(initialSessions ◀ persisted JSON, onSessionsChange ▶ persistence)
│       └── phaseTransitionSound ◀ mute-all-chimes checkbox in App
└── SAMPLE_EXPORT_TASKS + storage key from config.ts
```

## Design patterns

| Pattern | Role in this assembly |
| ------- | --------------------- |
| **Adapter** | `getExportAdapter` chooses JSON/Markdown/CSV serializers for preview + filenames. |
| **State coordination** | `App` binds format pickers, preview, clipboard, download, and hydration with React state—not new components. |
| **Hydration port** | `FocusMode.initialSessions` + `focusSessionsStorage` keep persistence keys out of the focus package. |

Deep-dive narrative (Adapter, mediator shell, completion events): **[`docs/design-patterns-student-e.md`](../../docs/design-patterns-student-e.md)**.  
Component inventory: **[`docs/component-breakdown-student-e.md`](../../docs/component-breakdown-student-e.md)**.

## Day 11–12 polish & documentation

- **Day 11:** `aria-live` status banner; Copy preview; mute chimes for surface + modal timers; shared card elevation; export preview footer (chars + UTF‑8 bytes via `Blob`).
- **Day 12:** Repo **`docs/`** tree (design patterns, component breakdown, Clean Streak week log); this README finalized as the **system architecture entry point**.

## Optional next steps (post-course)

Toast on milestone save, route alignment with `apps/web`, shorter Pomodoro presets for demos only.
