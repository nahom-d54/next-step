import type { CSSProperties, ReactNode } from "react";

import { formatLabel } from "./formatLabels.js";
import type { ExportFormat, ExportPreviewData } from "./types.js";

export interface ExportPreviewProps {
  /**
   * Serialized output to show before download.
   */
  content: string;
  /**
   * Active export format (shown in the card header).
   */
  format: ExportFormat;
  /**
   * Optional heading above the preview body. Defaults to “Preview”.
   */
  heading?: ReactNode;
  /**
   * Max height of the scrollable preview area (CSS value or pixels).
   * @default "16rem"
   */
  maxHeight?: CSSProperties["maxHeight"];
  /**
   * Shown when `content` is empty or whitespace-only.
   */
  emptyMessage?: ReactNode;
}

/**
 * Read-only preview of export output in a card-style container (pairs with
 * {@link getExportAdapter} output). Intended for “preview before download” flows.
 */
export function ExportPreview({
  content,
  format,
  heading = "Preview",
  maxHeight = "16rem",
  emptyMessage = "Nothing to preview yet. Select a format and generate an export.",
}: ExportPreviewProps) {
  const trimmed = content.trim();
  const isEmpty = trimmed.length === 0;

  return (
    <section
      aria-label="Export preview"
      style={{
        borderRadius: "0.625rem",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          padding: "0.625rem 0.875rem",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb",
        }}
      >
        <span
          style={{
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {heading}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {formatLabel(format)}
        </span>
      </header>
      <div style={{ padding: "0.75rem 0.875rem" }}>
        {isEmpty ? (
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              lineHeight: 1.5,
              color: "#6b7280",
            }}
          >
            {emptyMessage}
          </p>
        ) : (
          <pre
            style={{
              margin: 0,
              maxHeight,
              overflow: "auto",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "#f3f4f6",
              color: "#111827",
              fontSize: "0.8125rem",
              lineHeight: 1.45,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {content}
          </pre>
        )}
      </div>
    </section>
  );
}

/**
 * Convenience wrapper when you already have an {@link ExportPreviewData} object.
 */
export function ExportPreviewFromData({
  data,
  ...rest
}: Omit<ExportPreviewProps, "content" | "format"> & { data: ExportPreviewData }) {
  return (
    <ExportPreview
      {...rest}
      format={data.format}
      content={data.content}
    />
  );
}
