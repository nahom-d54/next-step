import { useCallback, useMemo, useState } from "react";

import {
  ExportButton,
  ExportOptions,
  ExportPreview,
  formatLabel,
  getExportAdapter,
  type ExportFormat,
  type ExportTaskNode,
} from "@next-step/feature-task-export";
import {
  FocusMode,
  PomodoroTimer,
  type FocusSession,
} from "@next-step/feature-task-focus";
import {
  FOCUS_HISTORY_STORAGE_KEY,
  FOCUS_MODE_TASK_TITLE,
  SAMPLE_EXPORT_TASKS,
  SYSTEM_TITLE,
} from "./config.ts";
import { readFocusSessions, writeFocusSessions } from "./focusSessionsStorage.ts";

/** ASSEMBLY ONLY — composites + coordination imported from `@next-step/*`. */
export function App() {
  const [exportFormat, setExportFormat] = useState<ExportFormat>("markdown");
  const [focusOpen, setFocusOpen] = useState(false);
  const [tasks, setTasks] = useState<ExportTaskNode[]>(() =>
    structuredClone(SAMPLE_EXPORT_TASKS),
  );
  const [initialFocusSessions] = useState(() =>
    readFocusSessions(FOCUS_HISTORY_STORAGE_KEY),
  );

  const root = tasks[0];
  const focusHeadline =
    root?.completed === true ? `${FOCUS_MODE_TASK_TITLE} ✅` : FOCUS_MODE_TASK_TITLE;

  const previewContent = useMemo(() => {
    return getExportAdapter(exportFormat).serialize(tasks);
  }, [exportFormat, tasks]);

  const coordinateDownload = useCallback(async () => {
    const adapter = getExportAdapter(exportFormat);
    const content = adapter.serialize(tasks);
    const blob = new Blob([content], { type: adapter.mimeType() });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().slice(0, 10);
    try {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `task-board-${stamp}.${adapter.fileExtension()}`;
      anchor.rel = "noopener";
      anchor.click();
    } finally {
      queueMicrotask(() => {
        URL.revokeObjectURL(url);
      });
    }
  }, [exportFormat, tasks]);

  const persistFocusSessions = useCallback((sessions: FocusSession[]) => {
    writeFocusSessions(FOCUS_HISTORY_STORAGE_KEY, sessions);
  }, []);

  const toggleRootMilestone = useCallback(() => {
    setTasks((previous) => {
      if (previous.length === 0) {
        return previous;
      }
      const [head, ...tail] = previous;
      const nextCompleted = !(head.completed === true);
      return [{ ...head, completed: nextCompleted }, ...tail];
    });
  }, []);

  return (
    <div
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      <header>
        <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.35rem", fontWeight: 900 }}>
          {SYSTEM_TITLE}
        </h1>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.5 }}>
          Day 10 assembly — shared task snapshot drives{' '}
          <strong>both</strong> export adapters and contextual focus chrome. Focus timers write
          through to <code>localStorage</code> via coordination glue.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.75rem",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: "1 1 34rem",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <section
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              flex: 1,
              minHeight: 0,
            }}
          >
            <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem" }}>Living task export</h2>
            <p style={{ margin: "0 0 0.85rem", color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.5 }}>
              The preview + download payloads read from coordinated React state (seeded from{" "}
              <code>SAMPLE_EXPORT_TASKS</code> in <code>config.ts</code>), not frozen imports.
            </p>
            <div
              style={{
                padding: "0.75rem 0.875rem",
                borderRadius: "0.625rem",
                border: "1px solid #e5e7eb",
                backgroundColor: "#f9fafb",
                marginBottom: "1rem",
              }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#9ca3af", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Board snapshot
              </div>
              <div style={{ fontWeight: 800, fontSize: "0.975rem", color: "#111827" }}>
                {root?.title ?? "No seed tasks"}
              </div>
              <div style={{ marginTop: "0.65rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={toggleRootMilestone}
                  style={{
                    borderRadius: "0.625rem",
                    border: "1px solid #d1d5db",
                    padding: "0.4rem 0.75rem",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Toggle root milestone ({root?.completed === true ? "completed" : "in progress"})
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1rem",
                alignItems: "flex-end",
              }}
            >
              <ExportOptions value={exportFormat} onChange={setExportFormat} />
              <ExportButton
                format={exportFormat}
                onExport={coordinateDownload}
                label={`Download ${formatLabel(exportFormat)}`}
              />
            </div>
            <ExportPreview format={exportFormat} content={previewContent} />
          </section>
        </div>

        <div
          style={{
            flex: "1 1 20rem",
            minWidth: "min(20rem, 100%)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <section
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem" }}>Pomodoro (surface)</h2>
            <p style={{ margin: "0 0 1rem", color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.5 }}>
              Quick timer on the board for lightweight check-ins. The modal below runs a second
              embedded instance for deep focus.
            </p>
            <PomodoroTimer />
          </section>

          <section
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem" }}>Focus mode</h2>
            <p style={{ margin: "0 0 0.85rem", color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Fullscreen shell with timer + session stats. Segment history hydrates from{" "}
              <code>localStorage</code> and writes back on every finished Pomodoro segment.
            </p>
            <button
              type="button"
              onClick={() => {
                setFocusOpen(true);
              }}
              style={{
                borderRadius: "0.625rem",
                border: "1px solid #d1d5db",
                padding: "0.55rem 0.95rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                backgroundColor: "#111827",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Enter focus mode
            </button>
          </section>
        </div>
      </div>

      <FocusMode
        open={focusOpen}
        onClose={() => {
          setFocusOpen(false);
        }}
        taskTitle={focusHeadline}
        initialSessions={initialFocusSessions}
        onSessionsChange={persistFocusSessions}
      />
    </div>
  );
}
