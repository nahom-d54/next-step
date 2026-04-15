import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { TaskTemplate } from "./types.js";

export interface TemplateApplyProps {
  template?: TaskTemplate | null;
  onApply: (template: TaskTemplate) => void | Promise<void>;
  label?: ReactNode;
  loadingLabel?: ReactNode;
  disabled?: boolean;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
}

export function TemplateApply({
  template,
  onApply,
  label = "Apply template",
  loadingLabel = "Applying...",
  disabled,
  buttonProps,
}: TemplateApplyProps) {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    if (!template || disabled || isApplying) {
      return;
    }

    try {
      setIsApplying(true);
      await onApply(template);
    } finally {
      setIsApplying(false);
    }
  };

  return (
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
        ...buttonProps?.style,
      }}
    >
      {isApplying ? loadingLabel : label}
    </button>
  );
}
