import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { PomodoroTimer } from "./PomodoroTimer.js";
import { SessionStats } from "./SessionStats.js";
import { focusSessionFromFinished } from "./sessionUtils.js";
import type { FocusSession, PomodoroConfig, SegmentFinishedEvent } from "./types.js";

export interface FocusModeProps {
  open: boolean;
  onClose: () => void;
  /** Optional label for what the user is focusing on. */
  taskTitle?: ReactNode;
  config?: PomodoroConfig;
  /** Receives the full history whenever a segment completes. */
  onSessionsChange?: (sessions: FocusSession[]) => void;
  /** Seed rows for {@link SessionStats} before new segments arrive (optional persistence hydrate). */
  initialSessions?: FocusSession[];
  /** Passed through to embedded {@link PomodoroTimer} phase-completion tones. */
  phaseTransitionSound?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * Full-screen focus shell with the Pomodoro timer and rolling session statistics.
 */
export function FocusMode({
  open,
  onClose,
  taskTitle,
  config,
  onSessionsChange,
  initialSessions,
  phaseTransitionSound,
  style,
  className,
}: FocusModeProps) {
  const [sessions, setSessions] = useState<FocusSession[]>(
    () => initialSessions ?? [],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleFinished = useCallback(
    (event: SegmentFinishedEvent) => {
      const row = focusSessionFromFinished(event);
      setSessions((previous) => {
        const next = [...previous, row];
        onSessionsChange?.(next);
        return next;
      });
    },
    [onSessionsChange],
  );

  if (!open) {
    return null;
  }

  return (
    <div
      role="presentation"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483646,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "rgba(17, 24, 39, 0.55)",
        ...style,
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Focus mode"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          width: "min(52rem, 100%)",
          maxHeight: "min(720px, 100%)",
          overflow: "auto",
          borderRadius: "0.75rem",
          border: "1px solid #d1d5db",
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
          padding: "clamp(1rem, 3vw, 1.35rem)",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#6b7280",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              Focus mode
            </div>
            {taskTitle ? (
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1.25,
                  maxWidth: "36rem",
                }}
              >
                {taskTitle}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close focus mode"
            style={{
              borderRadius: "0.625rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#111827",
              fontWeight: 800,
              fontSize: "0.875rem",
              padding: "0.45rem 0.75rem",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Close
          </button>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "1rem",
          }}
        >
          <div
            style={{
              borderRadius: "0.625rem",
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              padding: "clamp(0.85rem, 2vw, 1rem)",
            }}
          >
            <PomodoroTimer
              variant="plain"
              config={config}
              onSegmentFinished={handleFinished}
              phaseTransitionSound={phaseTransitionSound}
              style={{ padding: 0 }}
            />
          </div>

          <SessionStats sessions={sessions} />
        </div>
      </div>
    </div>
  );
}
