# next-step

This monorepo uses a few structural patterns in the UI packages.

- Decorator Pattern (Tags)
  - The tags feature (`packages/feature-task-tags`) implements a lightweight Decorator pattern for tag presentation and management: `TagManager` provides tag lifecycle (create/delete) and exposes tag data to UI consumers; `TagCloud` and other presentational components receive tag data and enhance rendered task items with tag-specific styling and behavior. This keeps tag concerns separated from task models while allowing easy composition.

- Strategy & Coordination Patterns (Search)
  - The search feature (`packages/feature-task-search`) separates search algorithms (strategies) from coordination logic. `searchStrategies` exports multiple `SearchStrategy` implementations (title, tag, combined). `getSearchStrategy` selects the appropriate strategy. `TaskFilterCoordinator` acts as the coordinator: it wires UI inputs, debouncing, and chosen strategy to produce filtered results and emits them via a callback. This keeps algorithms testable and the coordinator focused on orchestration.

Guidelines and X-MAN model

- Do not import from another feature's internal `src` paths. Always import from the package public entry, e.g. `@next-step/feature-task-search` and `@next-step/feature-task-tags`.
- Public exports are defined in each package's `src/index.ts` and surfaced via package `package.json` `exports`/`main` fields; prefer those public exports for inter-package dependencies.

If you need help running the app, use the workspace scripts in the root `package.json` (pnpm + turbo):

```bash
pnpm install
pnpm dev:web
pnpm dev:api
```
