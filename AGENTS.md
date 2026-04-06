# AGENTS Guide for `next-step`

This file documents the commands and coding conventions that agentic coding tools should follow in this repository.

## 1) Repository Overview

- Monorepo managed with `pnpm` workspaces and Turborepo.
- Workspace packages live under `apps/*` (currently `apps/web` and `apps/api`).
- Root task orchestration is defined in `turbo.json`.
- Package manager is pinned to `pnpm@10.14.0` (`package.json`).
- TypeScript is used in both apps.

## 2) Structure You Should Know

- `package.json` (root): shared scripts (`dev`, `build`, `lint`, `test`, `typecheck`).
- `pnpm-workspace.yaml`: workspace package globs.
- `apps/web`: Vite + React + TypeScript frontend.
- `apps/api`: Fastify + TypeScript backend.
- `apps/api/test`: Node test runner (`node:test`) integration tests.

## 3) Install and Bootstrap

- Install dependencies from repo root:
  - `pnpm install`

## 4) Build / Lint / Test Commands

### Root (all workspaces through Turbo)

- Development (all packages):
  - `pnpm dev`
- Build all packages:
  - `pnpm build`
- Lint all packages:
  - `pnpm lint`
- Test all packages:
  - `pnpm test`
- Typecheck all packages:
  - `pnpm typecheck`

### Run one workspace only (preferred for focused work)

- Web dev server:
  - `pnpm dev:web`
- API dev mode:
  - `pnpm dev:api`
- Build only API:
  - `pnpm --filter @next-step/api build`
- Build only web:
  - `pnpm --filter @next-step/web build`
- Typecheck one package:
  - `pnpm --filter @next-step/api typecheck`
  - `pnpm --filter @next-step/web typecheck`

### Package-specific commands

- Web (`apps/web`):
  - `pnpm --filter @next-step/web dev`
  - `pnpm --filter @next-step/web build`
  - `pnpm --filter @next-step/web lint`
  - `pnpm --filter @next-step/web test` (currently placeholder, no real suite)

- API (`apps/api`):
  - `pnpm --filter @next-step/api dev`
  - `pnpm --filter @next-step/api build`
  - `pnpm --filter @next-step/api test`
  - `pnpm --filter @next-step/api typecheck`
  - `pnpm --filter @next-step/api lint` (currently placeholder, no real lint)

## 5) Running a Single Test (Important)

The API tests use Node's built-in test runner + `ts-node/register`.

- Run one test file directly from repo root:
  - `pnpm --filter @next-step/api exec node --test -r ts-node/register test/routes/root.test.ts`

- Run one test file with coverage instrumentation (matches project style more closely):
  - `pnpm --filter @next-step/api exec c8 node --test -r ts-node/register test/routes/root.test.ts`

- Run tests by name pattern:
  - `pnpm --filter @next-step/api exec node --test -r ts-node/register --test-name-pattern "default root route" test/routes/root.test.ts`

- If types/build state is stale, run before targeted tests:
  - `pnpm --filter @next-step/api build:ts`
  - `pnpm --filter @next-step/api exec tsc -p test/tsconfig.json`

## 6) Code Style and Conventions

### General TypeScript rules

- Use TypeScript for all new code.
- Prefer explicit exported types/interfaces for public module contracts.
- Keep strict-null assertions (`!`) rare and justified (example exists in React root mounting code).
- Avoid `any`; use concrete types, unions, or generics.
- Keep modules small and focused.

### Imports

- Group imports by origin:
  1. Node built-ins (`node:*`)
  2. Third-party packages
  3. Local modules
  4. Side-effect/style imports (e.g., CSS)
- Use ESM import syntax consistently.
- In web app code, existing files include TS extension in local imports (e.g., `./App.tsx`); follow surrounding file style.

### Formatting

- Follow existing formatting in each package; do not introduce a different style.
- Use trailing commas where current files already use them.
- Preserve quote style used by existing files (currently single quotes).
- Keep line length readable; prefer multi-line object literals/JSX when clarity improves.

### Naming

- `camelCase`: variables, functions, parameters.
- `PascalCase`: React components, TypeScript interfaces/types intended as named entities.
- Route/plugin modules should use descriptive, domain-based names.
- Test names should describe behavior, not implementation details.

### React (`apps/web`)

- Functional components and hooks only.
- Keep component state local unless shared state is necessary.
- Prefer semantic HTML and accessible attributes (`alt`, `aria-*`, button semantics).
- Respect ESLint rules from `apps/web/eslint.config.js`:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `react-hooks` recommended
  - `react-refresh` vite config

### Fastify API (`apps/api`)

- Use Fastify plugin pattern and typed plugin signatures (`FastifyPluginAsync`).
- Keep routes in `src/routes`, reusable plugins in `src/plugins`.
- Prefer returning typed JSON objects from handlers.
- Use `fastify-plugin` for plugins that expose decorators.
- For decorators, augment Fastify types via `declare module 'fastify'`.

### Error handling

- Do not swallow errors silently.
- In route handlers, return meaningful HTTP status codes and structured payloads.
- Prefer Fastify-native mechanisms (`reply.code(...).send(...)`, sensible utilities when present).
- Validate and fail fast on invalid input.
- In tests, assert full response payloads/status codes for expected failure modes.

### Testing

- Backend tests use `node:test` + `assert`.
- Use helper builder from `apps/api/test/helper.ts` for app lifecycle setup/teardown.
- Keep tests isolated and deterministic; avoid cross-test shared mutable state.
- For new endpoints, add route-level tests under `apps/api/test/routes`.

## 7) Agent Workflow Expectations

- Prefer narrow, package-scoped commands while iterating.
- After code changes, run relevant checks for touched package(s):
  - API changes: `typecheck` + targeted/suite tests.
  - Web changes: `lint` + `typecheck` + build when needed.
- Before finishing substantial work, run root-level checks if change spans multiple apps.

## 8) Known Gaps (Current Repo State)

- Web package test script is a placeholder (`"No tests configured for web yet"`).
- API package lint script is a placeholder (`"No lint configured for api yet"`).
- Agents should not assume missing checks exist; only run configured commands.
