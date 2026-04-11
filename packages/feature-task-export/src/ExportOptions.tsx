import type { SelectHTMLAttributes } from "react";

import { EXPORT_FORMATS, formatLabel } from "./formatLabels.js";
import type { ExportFormat } from "./types.js";

export interface ExportOptionsProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  value: ExportFormat;
  onChange: (format: ExportFormat) => void;
}

function parseFormat(raw: string): ExportFormat | undefined {
  if (raw === "json" || raw === "markdown" || raw === "csv") {
    return raw;
  }
  return undefined;
}

/**
 * Format selector (dropdown) for export. Intended to sit beside {@link ExportButton}.
 */
export function ExportOptions({
  value,
  onChange,
  disabled,
  id,
  style,
  className,
  ...selectProps
}: ExportOptionsProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "0.25rem",
        ...style,
      }}
      className={className}
    >
      <label
        htmlFor={id}
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.02em",
        }}
      >
        Format
      </label>
      <select
        id={id}
        {...selectProps}
        value={value}
        disabled={disabled}
        aria-label="Export file format"
        onChange={(e) => {
          const next = parseFormat(e.target.value);
          if (next !== undefined) {
            onChange(next);
          }
        }}
        style={{
          minWidth: "10rem",
          borderRadius: "0.625rem",
          border: "1px solid #d1d5db",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: 1.2,
          backgroundColor: "#ffffff",
          color: "#111827",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.65 : 1,
        }}
      >
        {EXPORT_FORMATS.map((format) => (
          <option key={format} value={format}>
            {formatLabel(format)}
          </option>
        ))}
      </select>
    </div>
  );
}
