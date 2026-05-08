import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

import {
  DEFAULT_POMODORO_CONFIG,
  createInitialPomodoroState,
  detectCompletedSegment,
  labelForSegment,
  pausePomodoro,
  plannedDurationSeconds,
  resetPomodoro,
  resumePomodoro,
  startWork,
  tickPomodoro,
} from "./pomodoroState.js";
import { playPhaseTransitionChime } from "./phaseChime.js";
import type {
  PomodoroConfig,
  PomodoroState,
  SegmentFinishedEvent,
} from "./types.js";

export interface PomodoroTimerProps {
  /**
   * Pomodoro segment lengths (defaults match {@link DEFAULT_POMODORO_CONFIG}).
   */
  config?: PomodoroConfig;
  style?: CSSProperties;
  className?: string;
  /**
   * Fires when the timer advances into the next phase after a segment completes.
   * Not emitted when the timer is reset.
   */
  onSegmentFinished?: (event: SegmentFinishedEvent) => void;
  /**
   * `plain` removes the bordered card chrome for embedding (e.g. in {@link FocusMode}).
   */
  variant?: "card" | "plain";
  /**
   * Play a short tone when a phase completes (respects `prefers-reduced-motion: reduce`).
   * @default true
   */
  phaseTransitionSound?: boolean;
}

function formatMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/**
 * Live Pomodoro counter with focus / short break / long break phases, pause/resume, and reset.
 */
export function PomodoroTimer({
  config: configProp,
  style,
  className,
  onSegmentFinished,
  variant = "card",
  phaseTransitionSound = true,
}: PomodoroTimerProps) {
  const config = useMemo(
    () => configProp ?? DEFAULT_POMODORO_CONFIG,
    [configProp],
  );

  const configRef = useRef<PomodoroConfig>(config);
  configRef.current = config;

  const onFinishRef = useRef(onSegmentFinished);
  onFinishRef.current = onSegmentFinished;

  const soundEnabledRef = useRef(phaseTransitionSound);
  soundEnabledRef.current = phaseTransitionSound;

  const [state, setState] = useState<PomodoroState>(createInitialPomodoroState);

  useEffect(() => {
    if (state.runStatus !== "running") {
      return;
    }

    const id = window.setInterval(() => {
      setState((previous) => {
        const cfg = configRef.current;
        const next = tickPomodoro(previous, cfg);
        const done = detectCompletedSegment(previous, next);
        if (done !== null) {
          const event: SegmentFinishedEvent = {
            segment: done,
            plannedSeconds: plannedDurationSeconds(done, cfg),
            endedAtIso: new Date().toISOString(),
          };
          queueMicrotask(() => {
            if (soundEnabledRef.current) {
              playPhaseTransitionChime(done);
            }
            onFinishRef.current?.(event);
          });
        }
        return next;
      });
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [state.runStatus]);

  const handleStart = useCallback(() => {
    setState((previous) => startWork(previous, configRef.current));
  }, []);

  const handlePause = useCallback(() => {
    setState((previous) => pausePomodoro(previous));
  }, []);

  const handleResume = useCallback(() => {
    setState((previous) => resumePomodoro(previous));
  }, []);

  const handleReset = useCallback(() => {
    setState((previous) => resetPomodoro(previous));
  }, []);

  const total = plannedDurationSeconds(state.segment, config);
  const progress =
    state.segment !== null && total > 0
      ? Math.min(100, Math.max(0, (100 * (total - state.secondsRemaining)) / total))
      : 0;

  const segmentLabel = labelForSegment(state.segment);
  const isIdle =
    state.runStatus === "idle" && state.segment === null && state.secondsRemaining === 0;

  const isPlain = variant === "plain";

  return (
    <section
      className={className}
      style={{
        borderRadius: "0.625rem",
        border: isPlain ? "none" : "1px solid #d1d5db",
        padding: "1rem",
        backgroundColor: isPlain ? "transparent" : "#ffffff",
        maxWidth: isPlain ? "none" : "22rem",
        ...style,
      }}
      aria-label="Pomodoro timer"
    >
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#6b7280",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "0.375rem",
        }}
      >
        Pomodoro
      </div>
      <div
        style={{
          fontSize: "1.875rem",
          fontWeight: 700,
          color: "#111827",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.02em",
          marginBottom: "0.5rem",
        }}
      >
        {formatMmSs(state.secondsRemaining)}
      </div>
      <div
        style={{
          fontSize: "0.9375rem",
          fontWeight: 600,
          color: "#374151",
          marginBottom: "0.75rem",
        }}
      >
        {segmentLabel}
        {state.runStatus === "paused" ? (
          <span style={{ fontWeight: 500, color: "#9ca3af" }}> — Paused</span>
        ) : null}
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={`${segmentLabel} progress`}
        style={{
          height: "0.5rem",
          borderRadius: "9999px",
          backgroundColor: "#e5e7eb",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: "9999px",
            backgroundColor:
              state.segment === "work"
                ? "#111827"
                : state.segment === "shortBreak"
                  ? "#059669"
                  : state.segment === "longBreak"
                    ? "#2563eb"
                    : "#d1d5db",
            transition: "width 200ms linear",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        {isIdle ? (
          <button
            type="button"
            onClick={handleStart}
            style={primaryButtonStyle(false)}
          >
            Start focus
          </button>
        ) : null}

        {state.runStatus === "running" ? (
          <button
            type="button"
            onClick={handlePause}
            style={secondaryButtonStyle()}
          >
            Pause
          </button>
        ) : null}

        {state.runStatus === "paused" ? (
          <button
            type="button"
            onClick={handleResume}
            style={primaryButtonStyle(false)}
          >
            Resume
          </button>
        ) : null}

        {!isIdle ? (
          <button
            type="button"
            onClick={handleReset}
            style={ghostButtonStyle()}
          >
            Reset
          </button>
        ) : null}
      </div>
    </section>
  );
}

function primaryButtonStyle(disabled: boolean): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.625rem",
    border: "1px solid #d1d5db",
    padding: "0.5rem 0.875rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.2,
    backgroundColor: disabled ? "#f9fafb" : "#111827",
    color: disabled ? "#9ca3af" : "#ffffff",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.75 : 1,
  };
}

function secondaryButtonStyle(): CSSProperties {
  return {
    ...primaryButtonStyle(false),
    backgroundColor: "#ffffff",
    color: "#111827",
  };
}

function ghostButtonStyle(): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.625rem",
    border: "1px solid transparent",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.2,
    backgroundColor: "transparent",
    color: "#6b7280",
    cursor: "pointer",
  };
}
