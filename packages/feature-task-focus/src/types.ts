/**
 * Durations and rules for a Pomodoro-style sequence (work → short break → …).
 * Every 4th completed work block uses a long break.
 */
export interface PomodoroConfig {
  workSeconds: number;
  shortBreakSeconds: number;
  longBreakSeconds: number;
}

/**
 * Coarse run status for the timer (State pattern: idle / running / paused).
 */
export type PomodoroRunStatus = "idle" | "running" | "paused";

/**
 * Which segment is active, or `null` when fully idle and not mid-session.
 */
export type PomodoroSegment = "work" | "shortBreak" | "longBreak";

/**
 * Immutable snapshot of the Pomodoro engine (drives UI + SessionStats later).
 */
export interface PomodoroState {
  runStatus: PomodoroRunStatus;
  segment: PomodoroSegment | null;
  secondsRemaining: number;
  /**
   * How many work segments have finished (used so every 4th completion starts a long break).
   */
  workPhasesCompleted: number;
}

/**
 * One finished focus or break interval for history / stats.
 */
export interface FocusSession {
  id: string;
  startedAt: string;
  endedAt: string;
  kind: "work" | "shortBreak" | "longBreak";
  /** Planned length in minutes (for display). */
  plannedMinutes: number;
}

/**
 * Emitted when a Pomodoro segment completes (via tick), not on reset.
 */
export interface SegmentFinishedEvent {
  segment: PomodoroSegment;
  plannedSeconds: number;
  endedAtIso: string;
}
