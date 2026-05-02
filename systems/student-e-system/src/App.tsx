import { useCallback, useMemo, useState } from "react";

import {
  ExportButton,
  ExportOptions,
  ExportPreview,
  formatLabel,
  getExportAdapter,
  type ExportFormat,
} from "@next-step/feature-task-export";
import {
  FocusMode,
  PomodoroTimer,
} from "@next-step/feature-task-focus";
import {
  FOCUS_MODE_TASK_TITLE,
  SAMPLE_EXPORT_TASKS,
  SYSTEM_TITLE,
} from "./config.ts";

/** ASSEMBLY ONLY — composites + coordination wiring imported from `@next-step/*`. */
export function App() {
  const [exportFormat, setExportFormat] = useState<ExportFormat>("markdown");
  const [focusOpen, setFocusOpen] = useState(false);

  const previewContent = useMemo(() => {
    return getExportAdapter(exportFormat).serialize(SAMPLE_EXPORT_TASKS);
  }, [exportFormat]);

  const coordinateDownload = useCallback(async () => {
    const adapter = getExportAdapter(exportFormat);
    const content = adapter.serialize(SAMPLE_EXPORT_TASKS);
    const blob = new Blob([content], { type: adapter.mimeType() });
    const url = URL.createObjectURL(blob);
    try {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `tasks-sample.${adapter.fileExtension()}`;
      anchor.rel = "noopener";
      anchor.click();
    } finally {
      queueMicrotask(() => {
        URL.revokeObjectURL(url);
      });
    }
  }, [exportFormat]);

  return (
    <div
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        maxWidth: "56rem",
        margin: "0 auto",
      }}
    >
      <header>
        <h1 style={{ fontSize: "1.5rem", margin: "0 0 0.35rem", fontWeight: 900 }}>
          {SYSTEM_TITLE}
        </h1>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#6b7280", lineHeight: 1.5 }}>
          Coordination demo: assemble <code>@next-step/feature-task-export</code> with{" "}
          <code>@next-step/feature-task-focus</code> inside this workspace system shell.
        </p>
      </header>

      <section
        style={{
          padding: "1.25rem",
          borderRadius: "0.75rem",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.05rem" }}>Task export</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem", alignItems: "flex-end" }}>
          <ExportOptions value={exportFormat} onChange={setExportFormat} />
          <ExportButton
            format={exportFormat}
            onExport={coordinateDownload}
            label={`Download ${formatLabel(exportFormat)}`}
          />
        </div>
        <ExportPreview format={exportFormat} content={previewContent} />
      </section>

      <section
        style={{
          padding: "1.25rem",
          borderRadius: "0.75rem",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem" }}>Pomodoro (standalone)</h2>
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
        <p style={{ margin: "0 0 0.85rem", color: "#6b7280", fontSize: "0.9rem" }}>
          Opens the bundled focus overlay (timer + session stats inside the modal).
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

      <FocusMode
        open={focusOpen}
        onClose={() => {
          setFocusOpen(false);
        }}
        taskTitle={FOCUS_MODE_TASK_TITLE}
      />
    </div>
  );
}
