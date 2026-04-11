import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useState,
} from "react";

import { formatLabel } from "./formatLabels.js";
import type { ExportFormat } from "./types.js";

export interface ExportButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "children"
> {
  /**
   * Current export format (shown in default label).
   */
  format: ExportFormat;
  /**
   * Runs when the user confirms export. Supports sync and async handlers.
   */
  onExport: () => void | Promise<void>;
  /**
   * Optional loading state for controlled usage.
   */
  isLoading?: boolean;
  /**
   * Label when not loading. Default includes the human-readable format name.
   */
  label?: ReactNode;
  /**
   * Label while export is in progress.
   */
  loadingLabel?: ReactNode;
  /**
   * Tooltip for the button (native `title`).
   */
  tooltip?: string;
}

/**
 * Primary control to trigger task export for the selected format.
 * Composes Button-like behavior; pairs with {@link ExportOptions} for format selection.
 */
export function ExportButton({
  format,
  onExport,
  isLoading,
  disabled,
  label,
  loadingLabel = "Exporting…",
  tooltip,
  style,
  ...buttonProps
}: ExportButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = isLoading ?? internalLoading;
  const defaultLabel = `Export as ${formatLabel(format)}`;
  const resolvedLabel = label ?? defaultLabel;
  const resolvedTooltip =
    tooltip ?? `Download or copy tasks as ${formatLabel(format)}`;

  const handleClick = async () => {
    if (loading || disabled) {
      return;
    }
    try {
      setInternalLoading(true);
      await onExport();
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        {...buttonProps}
        disabled={disabled || loading}
        onClick={() => {
          void handleClick();
        }}
        title={resolvedTooltip}
        aria-busy={loading}
        aria-label={
          typeof resolvedLabel === "string" ? resolvedLabel : "Export tasks"
        }
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          borderRadius: "0.625rem",
          border: "1px solid #d1d5db",
          padding: "0.5rem 0.875rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          lineHeight: 1.2,
          backgroundColor: loading ? "#f9fafb" : "#111827",
          color: loading ? "#374151" : "#ffffff",
          cursor: loading || disabled ? "not-allowed" : "pointer",
          opacity: loading || disabled ? 0.75 : 1,
          transition: "all 150ms ease",
          ...style,
        }}
      >
        {loading ? (
          <span
            aria-hidden="true"
            style={{
              width: "0.9rem",
              height: "0.9rem",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "9999px",
              display: "inline-block",
              animation: "export-button-spin 700ms linear infinite",
            }}
          />
        ) : null}
        <span>{loading ? loadingLabel : resolvedLabel}</span>
      </button>
      <style>
        {`
          @keyframes export-button-spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </span>
  );
}
