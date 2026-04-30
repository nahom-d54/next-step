import type { PomodoroConfig, PomodoroSegment, PomodoroState } from "./types.js";

export const DEFAULT_POMODORO_CONFIG: PomodoroConfig = {
  workSeconds: 25 * 60,
  shortBreakSeconds: 5 * 60,
  longBreakSeconds: 15 * 60,
};

/**
 * Initial timer: not running, no active segment.
 */
export function createInitialPomodoroState(): PomodoroState {
  return {
    runStatus: "idle",
    segment: null,
    secondsRemaining: 0,
    workPhasesCompleted: 0,
  };
}

/**
 * Start or resume a **work** segment from a fully idle state.
 * Does not change `workPhasesCompleted` (counters are advanced when a work block ends).
 */
export function startWork(
  _state: PomodoroState,
  config: PomodoroConfig,
): PomodoroState {
  return {
    runStatus: "running",
    segment: "work",
    secondsRemaining: config.workSeconds,
    workPhasesCompleted: _state.workPhasesCompleted,
  };
}

/**
 * Pause a running segment; preserves remaining time and segment.
 */
export function pausePomodoro(state: PomodoroState): PomodoroState {
  if (state.runStatus !== "running") {
    return state;
  }
  return { ...state, runStatus: "paused" };
}

/**
 * Resume from paused.
 */
export function resumePomodoro(state: PomodoroState): PomodoroState {
  if (state.runStatus !== "paused" || state.segment === null) {
    return state;
  }
  return { ...state, runStatus: "running" };
}

/**
 * Reset to idle and clear the active segment.
 */
export function resetPomodoro(_state: PomodoroState): PomodoroState {
  return createInitialPomodoroState();
}

function workFinishedNextSegment(
  state: PomodoroState,
  config: PomodoroConfig,
): Pick<PomodoroState, "segment" | "secondsRemaining" | "workPhasesCompleted"> {
  const nextCount = state.workPhasesCompleted + 1;
  if (nextCount > 0 && nextCount % 4 === 0) {
    return {
      segment: "longBreak",
      secondsRemaining: config.longBreakSeconds,
      workPhasesCompleted: nextCount,
    };
  }
  return {
    segment: "shortBreak",
    secondsRemaining: config.shortBreakSeconds,
    workPhasesCompleted: nextCount,
  };
}

function afterBreak(config: PomodoroConfig): Pick<PomodoroState, "segment" | "secondsRemaining"> {
  return {
    segment: "work",
    secondsRemaining: config.workSeconds,
  };
}

/**
 * When `secondsRemaining` has just reached 0, choose the next segment and duration.
 * Keeps `runStatus: "running"`.
 */
function onSegmentComplete(
  state: PomodoroState,
  config: PomodoroConfig,
): PomodoroState {
  const { segment, workPhasesCompleted } = state;
  if (segment === "work") {
    const n = workFinishedNextSegment(state, config);
    return {
      runStatus: "running",
      segment: n.segment,
      secondsRemaining: n.secondsRemaining,
      workPhasesCompleted: n.workPhasesCompleted,
    };
  }
  if (segment === "shortBreak" || segment === "longBreak") {
    const n = afterBreak(config);
    return {
      runStatus: "running",
      segment: n.segment,
      secondsRemaining: n.secondsRemaining,
      workPhasesCompleted,
    };
  }
  return state;
}

/**
 * One clock tick (1 second). No-op if not `running` or no segment.
 * When the current segment elapses, transitions to the next per Pomodoro rules.
 */
export function tickPomodoro(
  state: PomodoroState,
  config: PomodoroConfig,
): PomodoroState {
  if (state.runStatus !== "running" || state.segment === null) {
    return state;
  }
  if (state.secondsRemaining > 1) {
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
    };
  }
  if (state.secondsRemaining === 1) {
    const next: PomodoroState = {
      ...state,
      secondsRemaining: 0,
    };
    return onSegmentComplete(next, config);
  }
  return state;
}

/**
 * For UI: human-readable name for the current segment.
 */
export function labelForSegment(
  segment: PomodoroSegment | null,
): string {
  if (segment === null) {
    return "Idle";
  }
  if (segment === "work") {
    return "Focus";
  }
  if (segment === "shortBreak") {
    return "Short break";
  }
  return "Long break";
}

/**
 * Full length of the current segment (for progress UI).
 */
export function plannedDurationSeconds(
  segment: PomodoroSegment | null,
  config: PomodoroConfig,
): number {
  if (segment === null) {
    return config.workSeconds;
  }
  if (segment === "work") {
    return config.workSeconds;
  }
  if (segment === "shortBreak") {
    return config.shortBreakSeconds;
  }
  return config.longBreakSeconds;
}

/**
 * When moving from `previous` to `next` after a tick, returns the segment that
 * just finished, or `null` if no segment completed (or e.g. user reset to idle).
 */
export function detectCompletedSegment(
  previous: PomodoroState,
  next: PomodoroState,
): PomodoroSegment | null {
  if (previous.runStatus !== "running" || previous.segment === null) {
    return null;
  }
  if (next.runStatus === "idle" && next.segment === null) {
    return null;
  }
  if (previous.segment !== next.segment) {
    return previous.segment;
  }
  return null;
}
