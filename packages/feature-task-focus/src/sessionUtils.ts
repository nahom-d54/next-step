import type { FocusSession, SegmentFinishedEvent } from "./types.js";

function newSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `focus-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Builds a {@link FocusSession} row from a completed segment notification.
 */
export function focusSessionFromFinished(
  event: SegmentFinishedEvent,
): FocusSession {
  const endedMs = Date.parse(event.endedAtIso);
  const startedIso = Number.isFinite(endedMs)
    ? new Date(endedMs - event.plannedSeconds * 1000).toISOString()
    : event.endedAtIso;

  return {
    id: newSessionId(),
    startedAt: startedIso,
    endedAt: event.endedAtIso,
    kind: event.segment,
    plannedMinutes: Math.round(event.plannedSeconds / 60),
  };
}
