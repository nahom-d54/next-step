/**
 * config.ts — System C System configuration
 *
 * All system-level configuration lives here.
 * Components are imported from packages/* and receive these values as props.
 * No component logic belongs in this file.
 */

// ─── Analytics feature configuration ────────────────────────────────────────

export const analyticsConfig = {
  /** Default daily task goal used by the analytics dashboard progress bar. */
  dailyGoal: 10,

  /** Productivity scores shown in the ProductivityScore widget (demo values). */
  productivity: {
    dailyScore: 72,
    weeklyScore: 64,
    trend: 'up' as const,
    trendValue: 8,
  },
} as const;

// ─── History feature configuration ───────────────────────────────────────────

export const historyConfig = {
  /**
   * Initial task used to seed the useHistory hook.
   * In a real integration this would come from the API / a shared store.
   */
  initialTask: {
    title: 'Demo Task',
    updatedAtIso: new Date().toISOString(),
  },

  /** Label used when simulating an edit action via the "Make Change" button. */
  editSuffix: '(edited)',
} as const;
