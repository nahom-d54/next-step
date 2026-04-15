import type { ReactElement } from "react";
import type { TaskTemplateNode } from "./types.js";

export interface TemplatePreviewProps {
  title?: string;
  nodes: TaskTemplateNode[];
  emptyMessage?: string;
}

function renderTemplateNodes(nodes: TaskTemplateNode[]): ReactElement {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        paddingLeft: "1rem",
        borderLeft: "1px dashed #d1d5db",
        display: "grid",
        gap: "0.4rem",
      }}
    >
      {nodes.map((node) => (
        <li key={node.id}>
          <span style={{ color: "#111827", fontWeight: 600 }}>{node.title}</span>
          {node.children && node.children.length > 0 ? (
            <div style={{ marginTop: "0.4rem" }}>{renderTemplateNodes(node.children)}</div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function TemplatePreview({
  title = "Template structure",
  nodes,
  emptyMessage = "Select a template to preview its task hierarchy.",
}: TemplatePreviewProps) {
  const isEmpty = nodes.length === 0;

  return (
    <section
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        padding: "0.875rem",
        background: "#f9fafb",
      }}
    >
      <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>{title}</p>
      <div style={{ marginTop: "0.625rem" }}>
        {isEmpty ? (
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
            {emptyMessage}
          </p>
        ) : (
          renderTemplateNodes(nodes)
        )}
      </div>
    </section>
  );
}
