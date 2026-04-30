/**
 * App.tsx — System C System entry component (assembly only)
 *
 * CBSD Rule: this file contains coordination logic only.
 * No new component logic is defined here — everything is imported
 * from packages/feature-task-analytics and packages/feature-task-history.
 *
 * Composition mechanisms used:
 *   - Containment  : features are nested inside a layout shell
 *   - Coordination : useHistory hook coordinates state across components
 */

import { useMemo, useState } from 'react';

import {
  AnalyticsDashboard,
  CompletionChart,
  ProductivityScore,
} from '@next-step/feature-task-analytics';
import {
  HistoryPanel,
  UndoRedoControls,
  VersionDiff,
  useHistory,
  type HistoryEntry,
} from '@next-step/feature-task-history';

import { analyticsConfig, historyConfig } from './config.ts';

// ─── Local types ──────────────────────────────────────────────────────────────

type DemoTask = {
  title: string;
  updatedAtIso: string;
};

// ─── System assembly ──────────────────────────────────────────────────────────

export function App() {
  // Seed the history with the configured initial task
  const initialTask = useMemo<DemoTask>(
    () => ({ ...historyConfig.initialTask }),
    [],
  );

  const { state, push, undo, redo, canUndo, canRedo } =
    useHistory<DemoTask>(initialTask, 'system-c-history');

  const [diffTarget, setDiffTarget] = useState<HistoryEntry<DemoTask> | null>(
    null,
  );

  // ── Coordination handlers ────────────────────────────────────────────────

  function handleMakeChange() {
    push(
      {
        title: `${state.present?.title ?? 'Task'} ${historyConfig.editSuffix}`,
        updatedAtIso: new Date().toISOString(),
      },
      'Rename task',
    );
  }

  function handleRestore(entry: HistoryEntry<DemoTask>) {
    push(entry.payload, `Restore: ${entry.description}`);
  }

  function handleViewDiff(entry: HistoryEntry<DemoTask>) {
    setDiffTarget(entry);
  }

  function handleCloseDiff() {
    setDiffTarget(null);
  }

  // ── Layout ───────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── Section: Analytics ── */}
      <section aria-label="Task Analytics">
        <AnalyticsDashboard />
        <div style={{ marginTop: '16px' }}>
          <CompletionChart />
        </div>
        <div style={{ marginTop: '16px' }}>
          <ProductivityScore
            dailyScore={analyticsConfig.productivity.dailyScore}
            weeklyScore={analyticsConfig.productivity.weeklyScore}
            trend={analyticsConfig.productivity.trend}
            trendValue={analyticsConfig.productivity.trendValue}
          />
        </div>
      </section>

      {/* ── Section: History ── */}
      <section aria-label="Task History">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
          <button type="button" onClick={handleMakeChange}>
            Make Change
          </button>

          <UndoRedoControls
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </div>

        <HistoryPanel
          entries={state.past}
          onRestore={handleRestore}
          onViewDiff={handleViewDiff}
        />

        <VersionDiff
          isOpen={!!diffTarget}
          onClose={handleCloseDiff}
          original={diffTarget?.payload ?? null}
          modified={state.present}
          title={`Comparing with: ${diffTarget?.description ?? ''}`}
        />
      </section>
    </div>
  );
}
