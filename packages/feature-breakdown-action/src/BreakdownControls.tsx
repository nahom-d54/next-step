import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

type ActionHandler = () => void | Promise<void>;
type ActionKind = "approve" | "reject" | "regenerate";

export interface BreakdownControlsProps {
  onApprove: ActionHandler;
  onReject: ActionHandler;
  onRegenerate: ActionHandler;
  disabled?: boolean;
  className?: string;
  labels?: Partial<Record<ActionKind, ReactNode>>;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
}

function getActionStyles(action: ActionKind, loading: boolean) {
  if (action === "approve") {
    return {
      background: loading ? "#bbf7d0" : "#16a34a",
      color: loading ? "#14532d" : "#ffffff",
      border: "1px solid #15803d",
    };
  }

  if (action === "reject") {
    return {
      background: loading ? "#fecaca" : "#dc2626",
      color: loading ? "#7f1d1d" : "#ffffff",
      border: "1px solid #b91c1c",
    };
  }

  return {
    background: loading ? "#e5e7eb" : "#ffffff",
    color: "#111827",
    border: "1px solid #d1d5db",
  };
}

export function BreakdownControls({
  onApprove,
  onReject,
  onRegenerate,
  disabled,
  className,
  labels,
  buttonProps,
}: BreakdownControlsProps) {
  const [runningAction, setRunningAction] = useState<ActionKind | null>(null);

  const runAction = async (kind: ActionKind, handler: ActionHandler) => {
    if (disabled || runningAction) {
      return;
    }

    try {
      setRunningAction(kind);
      await handler();
    } finally {
      setRunningAction(null);
    }
  };

  const actionLabels: Record<ActionKind, ReactNode> = {
    approve: labels?.approve ?? "Approve",
    reject: labels?.reject ?? "Reject",
    regenerate: labels?.regenerate ?? "Regenerate",
  };

  return (
    <div
      className={className}
      role="group"
      aria-label="Breakdown controls"
      style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
    >
      {(
        [
          ["approve", onApprove],
          ["reject", onReject],
          ["regenerate", onRegenerate],
        ] as const
      ).map(([kind, handler]) => {
        const loading = runningAction === kind;
        const styles = getActionStyles(kind, loading);

        return (
          <button
            key={kind}
            type="button"
            {...buttonProps}
            disabled={disabled || runningAction !== null}
            aria-busy={loading}
            onClick={() => {
              void runAction(kind, handler);
            }}
            style={{
              borderRadius: "0.625rem",
              padding: "0.45rem 0.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: disabled || runningAction ? "not-allowed" : "pointer",
              opacity: disabled || (runningAction && !loading) ? 0.75 : 1,
              transition: "all 150ms ease",
              ...styles,
              ...buttonProps?.style,
            }}
          >
            {loading ? "Working..." : actionLabels[kind]}
          </button>
        );
      })}
    </div>
  );
}
