import type { FocusSession } from "@next-step/feature-task-focus";

const KINDS = new Set<FocusSession["kind"]>([
  "work",
  "shortBreak",
  "longBreak",
]);

function isFocusSession(candidate: unknown): candidate is FocusSession {
  if (typeof candidate !== "object" || candidate === null) {
    return false;
  }
  const row = candidate as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.startedAt === "string" &&
    typeof row.endedAt === "string" &&
    typeof row.plannedMinutes === "number" &&
    typeof row.kind === "string" &&
    KINDS.has(row.kind as FocusSession["kind"])
  );
}

/**
 * Hydrates cached focus-session rows saved by Student E coordination (best-effort).
 */
export function readFocusSessions(storageKey: string): FocusSession[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === null || raw.length === 0) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    const rows = parsed.filter(isFocusSession);
    return rows;
  } catch {
    return [];
  }
}

/** Persists normalized focus-session history for reload continuity. */
export function writeFocusSessions(
  storageKey: string,
  sessions: FocusSession[],
): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(sessions));
  } catch {
    /* Storage may be full or unavailable; ignore silently. */
  }
}
