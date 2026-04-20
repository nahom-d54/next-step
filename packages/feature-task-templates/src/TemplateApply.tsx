import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { TaskTemplate } from "./types.js";

export interface TemplateApplyProps {
  template?: TaskTemplate | null;
  onApply: (template: TaskTemplate) => void | Promise<void>;
  label?: ReactNode;
  idleLabel?: ReactNode;
  loadingLabel?: ReactNode;
  appliedLabel?: ReactNode;
  disabled?: boolean;
  onApplyError?: (error: unknown) => void;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
}

export function TemplateApply({
  template,
  onApply,
  label = "Apply template",
  idleLabel = "Select a template to apply",
  loadingLabel = "Applying...",
  appliedLabel = "Applied",
  disabled,
  onApplyError,
  buttonProps,
}: TemplateApplyProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [lastAppliedTemplateId, setLastAppliedTemplateId] = useState<
    string | null
  >(null);

  const hasTemplate = Boolean(template);
  const hasBeenApplied = Boolean(
    template && lastAppliedTemplateId === template.id,
  );

  const resolvedLabel = isApplying
    ? loadingLabel
    : !hasTemplate
      ? idleLabel
      : hasBeenApplied
        ? appliedLabel
        : label;

  const handleApply = async () => {
    if (!template || disabled || isApplying) {
      return;
    }

    try {
      setIsApplying(true);
      await onApply(template);
      setLastAppliedTemplateId(template.id);
    } catch (error) {
      onApplyError?.(error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div
      style={{
        display: "inline-grid",
        gap: "0.35rem",
      }}
    >
      <button
        type="button"
        {...buttonProps}
        disabled={disabled || !template || isApplying}
        aria-busy={isApplying}
        onClick={() => {
          void handleApply();
        }}
        style={{
          borderRadius: "0.625rem",
          border: "1px solid #111827",
          background: "#111827",
          color: "#ffffff",
          padding: "0.5rem 0.875rem",
          fontWeight: 600,
          cursor:
            disabled || !template || isApplying ? "not-allowed" : "pointer",
          opacity: disabled || !template || isApplying ? 0.75 : 1,
          transition: "all 150ms ease",
          ...buttonProps?.style,
        }}
      >
        {resolvedLabel}
      </button>

      <span
        style={{
          fontSize: "0.8rem",
          color: hasTemplate ? "#4b5563" : "#9ca3af",
          lineHeight: 1.3,
        }}
      >
        {hasTemplate
          ? `Ready to apply: ${template?.name ?? "selected template"}`
          : "Choose a template from the list to enable apply."}
      </span>
    </div>
  );
}
