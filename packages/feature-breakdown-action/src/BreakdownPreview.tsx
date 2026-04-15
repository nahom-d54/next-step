import type { CSSProperties, ReactElement } from "react";
import type { BreakdownTreeItem } from "./types.js";

export interface BreakdownPreviewProps {
  items: BreakdownTreeItem[];
  title?: string;
  emptyMessage?: string;
  maxHeight?: number;
  className?: string;
}

const itemStyle: CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "0.5rem",
  padding: "0.625rem 0.75rem",
  background: "#ffffff",
};

function renderTree(items: BreakdownTreeItem[], depth = 0): ReactElement {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        paddingLeft: depth === 0 ? 0 : "1rem",
        display: "grid",
        gap: "0.5rem",
      }}
    >
      {items.map((item, index) => {
        const key = item.id ?? `${item.title}-${depth}-${index}`;

        return (
          <li key={key} style={itemStyle}>
            <p style={{ margin: 0, fontWeight: 600, color: "#111827" }}>
              {item.title}
            </p>
            {item.description ? (
              <p
                style={{
                  margin: "0.375rem 0 0",
                  color: "#4b5563",
                  fontSize: "0.9rem",
                }}
              >
                {item.description}
              </p>
            ) : null}
            {item.children && item.children.length > 0 ? (
              <div style={{ marginTop: "0.625rem" }}>
                {renderTree(item.children, depth + 1)}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function BreakdownPreview({
  items,
  title = "Generated subtask preview",
  emptyMessage = "No generated subtasks yet.",
  maxHeight = 380,
  className,
}: BreakdownPreviewProps) {
  const isEmpty = items.length === 0;

  return (
    <section
      className={className}
      aria-live="polite"
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "0.75rem",
        background: "#f9fafb",
        padding: "0.875rem",
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "#111827",
        }}
      >
        {title}
      </p>

      <div
        style={{
          marginTop: "0.75rem",
          maxHeight,
          overflowY: "auto",
          paddingRight: "0.25rem",
        }}
      >
        {isEmpty ? (
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
            {emptyMessage}
          </p>
        ) : (
          renderTree(items)
        )}
      </div>
    </section>
  );
}
