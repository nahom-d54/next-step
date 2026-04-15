import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * Props for the BreakdownButton component.
 */
export interface BreakdownButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> {
  /**
   * Trigger callback for the breakdown action.
   * Supports sync and async handlers.
   */
  onBreakdown: () => void | Promise<void>;
  /**
   * Optional loading state for controlled usage.
   */
  isLoading?: boolean;
  /**
   * Label shown when button is not loading.
   */
  label?: ReactNode;
  /**
   * Label shown while the action is in progress.
   */
  loadingLabel?: ReactNode;
  /**
   * Tooltip content shown on hover/focus.
   */
  tooltip?: string;
}

/**
 * BreakdownButton
 *
 * A reusable trigger button for AI task breakdown actions.
 * - Handles async click callbacks.
 * - Displays an inline loading indicator.
 * - Shows a lightweight tooltip on hover/focus.
 */
export function BreakdownButton({
  onBreakdown,
  isLoading,
  disabled,
  label = "Break down task",
  loadingLabel = "Breaking down...",
  tooltip = "Use AI to split this task into smaller subtasks.",
  style,
  ...buttonProps
}: BreakdownButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = isLoading ?? internalLoading;

  const handleClick = async () => {
    if (loading || disabled) {
      return;
    }

    try {
      setInternalLoading(true);
      await onBreakdown();
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
        title={tooltip}
        aria-busy={loading}
        aria-label={typeof label === "string" ? label : "Break down task"}
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
              animation: "breakdown-button-spin 700ms linear infinite",
            }}
          />
        ) : null}
        <span>{loading ? loadingLabel : label}</span>
      </button>
      <style>
        {`
          @keyframes breakdown-button-spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </span>
  );
}
